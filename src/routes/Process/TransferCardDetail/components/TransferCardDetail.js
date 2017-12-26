import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import QueryString from 'query-string'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message, Upload } from 'antd'
import './TransferCardDetail.less'

import TransferCardTable from './TransferCardTable'
import CardInfoModal from './CardInfoModal'

const FIRST_PAGE_SIZE = 5
const PAGE_SIZE = 10

class TransferCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this._id = +QueryString.parse(this.props.location.search).id
  }

  componentDidMount () {
    this.props.getCardDataAction({
      id: this._id
    })
    this.props.getProcessDataAction({
      params: {
        offset: 0,
        limit: FIRST_PAGE_SIZE,
        transfer_card: this._id
      }
    })
  }

  handleChangePage = (e) => {
    const { type } = e.target.dataset
    const { status, getProcessDataAction } = this.props
    const mydata = status.toJS()
    const pagination = _.get(mydata, 'pagination', {})
    const { current, totalPage } = pagination
    if (type === 'next') {
      if (current + 1 > totalPage) {
        message.warning('当前为最后一页！')
        return
      }
      getProcessDataAction({
        params: {
          offset: FIRST_PAGE_SIZE + (current - 1) * PAGE_SIZE,
          limit: PAGE_SIZE,
          current: current + 1,
          transfer_card: this._id
        }
      })
      return
    }
    if (current === 1) {
      message.warning('当前为第一页！')
      return
    } else if (current === 2) {
      getProcessDataAction({
        params: {
          offset: 0,
          limit: FIRST_PAGE_SIZE,
          current: 1,
          transfer_card: this._id
        }
      })
    } else {
      getProcessDataAction({
        params: {
          offset: FIRST_PAGE_SIZE + (current - 3) * PAGE_SIZE,
          limit: PAGE_SIZE,
          current: current - 1,
          transfer_card: this._id
        }
      })
    }
  }

  handlePrint = () => {
    console.log('handlePrint')
    window.print()
  }

  uploadImage = (file) => {
    const { url, method } = apis.ProcessAPI.updateTransferCard
    const api = {
      url: url(this._id),
      method
    }
    fetchAPI(api, {
      path: file.file
    }).then(() => {
      message.success('上传成功')
      this.getCardDataAction()
    })
  }

  handleOpenCardModal = () => {
    const { status, changeCardModalAction } = this.props
    const mydata = status.toJS()
    const cardInfo = _.get(mydata, 'cardInfo', {})
    changeCardModalAction({
      visible: true,
      fieldsValue: {
        container_category: cardInfo.container_category,
        parent_drawing_number: cardInfo.parent_drawing_number,
        material_index: cardInfo.material_index,
        welding_plate_idx: cardInfo.welding_plate_idx,
        parent_plate_idx: cardInfo.parent_plate_idx
      }
    })
  }

  handleCloseCardModal = () => {
    this.props.changeCardModalAction({
      visible: false
    })
  }

  handleEditCard = (fieldsValue) => {
    console.log('handleEditCard', fieldsValue)
    const { url, method } = apis.ProcessAPI.updateTransferCard
    const api = {
      url: url(this._id),
      method
    }
    fetchAPI(api, fieldsValue).then((repos) => {
      message.success('修改成功！')
      this.handleCloseCardModal()
      this.props.getCardDataAction({
        id: this._id
      })
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const cardInfo = _.get(mydata, 'cardInfo', [])
    const processList = _.get(mydata, 'processList')
    const pagination = _.get(mydata, 'pagination', {})
    const cardModal = _.get(mydata, 'cardModal', {})
    return (
      <div className='transfer-card-detail'>
        <div className='btn-group'>
          <Button
            icon='left'
            data-type='previous'
            onClick={this.handleChangePage}
          >
            上一页
          </Button>
          <Button
            icon='printer'
            onClick={this.handlePrint}
          >
            打印
          </Button>
          <Upload
            name='file'
            customRequest={this.uploadImage}
          >
            <Button
              icon='upload'
            >
              上传简图
            </Button>
          </Upload>
          <Button
            icon='edit'
            onClick={this.handleOpenCardModal}
          >
            编辑流转卡信息
          </Button>
          <Button
            icon='right'
            data-type='next'
            onClick={this.handleChangePage}
          >
            下一页
          </Button>
        </div>
        <TransferCardTable
          cardInfo={cardInfo}
          pagination={pagination}
          processList={processList}
        />
        { cardModal.visible &&
          <CardInfoModal
            {...cardModal}
            onOk={this.handleEditCard}
            onCancel={this.handleCloseCardModal}
          />
        }
      </div>
    )
  }
}

TransferCardDetail.propTypes = {
  location: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getCardDataAction: PropTypes.func.isRequired,
  getProcessDataAction: PropTypes.func.isRequired,
  changeCardModalAction: PropTypes.func.isRequired
}

export default TransferCardDetail
