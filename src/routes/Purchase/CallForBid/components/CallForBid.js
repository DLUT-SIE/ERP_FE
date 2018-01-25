import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { BID_STATUS_MAP } from 'const'
import { Button } from 'antd'

import OrderForm from 'components/OrderForm'
import ApplySelectModal from './ApplySelectModal'
import ApplyWriteModal from './ApplyWriteModal'
import BidModal from './BidModal'
import './CallForBid.less'

class CallForBid extends React.Component {
  constructor (props) {
    super(props)
    const query = QueryString.parse(this.props.location.search)
    this._id = +query.id
  }

  componentDidMount () {
    if (!_.isUndefined(this._id)) {
      this.fetchBidData()
    }
  }

  fetchBidData () {
    this.props.getBidDataAction({
      params: {
        id: this._id
      }
    })
  }

  getBtnType = (name) => {
    const mydata = this.props.status.toJS()
    const bid = _.get(mydata, 'bid', {})
    const status = BID_STATUS_MAP[name]
    let btnType
    if (bid.status > status) {
      btnType = 'success'
    } else if (bid.status === status) {
      btnType = 'primary'
    } else {
      btnType = 'default'
    }
    return btnType
  }

  handleOpenApplySelectModal = () => {
    this.props.changeApplySelectModalAction({
      visible: true
    })
  }

  handleCloseApplySelectModal = () => {
    this.props.changeApplySelectModalAction({
      visible: false
    })
  }

  handleSaveApplySelect = (category) => {
    fetchAPI(apis.PurchaseAPI.updateBiddingSheet, { category, status: 3 }, { id: this._id }).then((repos) => {
      this.handleCloseApplySelectModal()
      this.fetchBidData()
    })
  }

  handleOpenApplyWriteModal = () => {
    this.props.changeApplyWriteModalAction({
      visible: true
    })
  }

  handleCloseApplyWriteModal = () => {
    this.props.changeApplyWriteModalAction({
      visible: false
    })
  }

  handleOpenBidModal = (e) => {
    const { type } = e.target.dataset
    this.props.changeBidModalAction({
      visible: true,
      type
    })
  }

  handleCloseBidModal = () => {
    this.props.changeBidModalAction({
      visible: false
    })
  }

  handleSaveBid = (fieldsValue) => {
    // 保存招标书
    fetchAPI(apis.PurchaseAPI.updateBiddingSheet, { status: 5 }, { id: this._id }).then((repos) => {
      this.handleCloseBidModal()
      this.fetchBidData()
    })
  }

  handleBidConfirm = () => {
    fetchAPI(apis.PurchaseAPI.updateBiddingSheet, { status: 6 }, { id: this._id }).then((repos) => {
      this.handleCloseBidModal()
      this.props.history.push({
        pathname: '/purchase/purchase_track/'
      })
    })
  }

  render () {
    const mydata = this.props.status.toJS()
    const bid = _.get(mydata, 'bid', {})
    const applySelectModal = _.get(mydata, 'applySelectModal', [])
    const applyWriteModal = _.get(mydata, 'applyWriteModal', [])
    const bidModal = _.get(mydata, 'bidModal', [])
    const status = bid.status
    return (
      <div className='call-for-bid'>
        <OrderForm
          orderId={bid.purchase_order}
          orderUid={bid.purchase_order_uid}
        />
        <div className='btn-group'>
          <Button
            type={this.getBtnType('招标申请选择')}
            disabled={status !== BID_STATUS_MAP['招标申请选择']}
            onClick={this.handleOpenApplySelectModal}
          >
            招标申请选择
          </Button>
          <Button
            type={this.getBtnType('招标申请填写')}
            disabled={status !== BID_STATUS_MAP['招标申请填写']}
            onClick={this.handleOpenApplyWriteModal}
          >
            招标申请填写
          </Button>
          <Button
            type={this.getBtnType('招标中')}
            disabled={status !== BID_STATUS_MAP['招标中']}
            data-type='edit'
            onClick={this.handleOpenBidModal}
          >
            招标中
          </Button>
          <Button
            type={this.getBtnType('中标确认')}
            disabled={status !== BID_STATUS_MAP['中标确认']}
            data-type='check'
            onClick={this.handleOpenBidModal}
          >
            中标确认
          </Button>
        </div>
        { applySelectModal.visible &&
          <ApplySelectModal
            {...applySelectModal}
            onOk={this.handleSaveApplySelect}
            onCancel={this.handleCloseApplySelectModal}
          />
        }
        { applyWriteModal.visible &&
          <ApplyWriteModal
            {...applyWriteModal}
            bid={bid}
            onOk={this.handleSaveWriteSelect}
            onCancel={this.handleCloseApplyWriteModal}
          />
        }
        { bidModal.visible &&
          <BidModal
            {...bidModal}
            bid={bid}
            onOk={bidModal.type === 'edit' ? this.handleSaveBid : this.handleBidConfirm}
            onCancel={this.handleCloseBidModal}
          />
        }
      </div>
    )
  }
}

CallForBid.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getBidDataAction: PropTypes.func.isRequired,
  changeApplySelectModalAction: PropTypes.func.isRequired,
  changeApplyWriteModalAction: PropTypes.func.isRequired,
  changeBidModalAction: PropTypes.func.isRequired
}

export default CallForBid
