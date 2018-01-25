import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'

import PurchaseOrderRawTable from 'components/PurchaseOrderRawTable'
import PurchaseOrderNormalTable from 'components/PurchaseOrderNormalTable'
import PurchaseOrderWeldTable from 'components/PurchaseOrderWeldTable'
import './OrderForm.less'

class OrderForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      order: {},
      list: []
    }
  }

  componentDidMount () {
    const { bidId } = this.props
    if (!_.isUndefined(bidId)) {
      fetchAPI(apis.PurchaseAPI.getBiddingSheet, {}, { id: bidId }).then((bid) => {
        fetchAPI(apis.PurchaseAPI.getPurchaseOrder, {}, { id: bid.purchase_order }).then((order) => {
          this.setState({
            order
          })
        })
        fetchAPI(apis.PurchaseAPI.getProcurementMaterials, {
          purchase_order_uid: bid.purchase_order_uid
        }).then((materials) => {
          this.setState({
            list: materials.results
          })
        })
      })
      return
    }
  }

  componentWillReceiveProps (nextProps) {
    const { orderId, orderUid } = nextProps
    if (!_.isUndefined(orderId) && nextProps.orderId !== this.props.orderId) {
      fetchAPI(apis.PurchaseAPI.getPurchaseOrder, {}, { id: orderId }).then((order) => {
        this.setState({
          order
        })
      })
      fetchAPI(apis.PurchaseAPI.getProcurementMaterials, {
        purchase_order_uid: orderUid
      }).then((materials) => {
        this.setState({
          list: materials.results
        })
      })
    }
  }

  handleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render () {
    const { show, order, list } = this.state
    return (
      <div className='order-form'>
        <div className='check-operation-area'>
          <span onClick={this.handleShow}>
            { show ? '隐藏采购单' : '查看采购单'}
          </span>
        </div>
        { show && order.category === 0 &&
          <PurchaseOrderRawTable
            order={order}
            list={list}
          />
        }
        { show && order.category === 1 &&
          <PurchaseOrderNormalTable
            order={order}
            list={list}
          />
        }
        { show && order.category === 2 &&
          <PurchaseOrderWeldTable
            order={order}
            list={list}
          />
        }
      </div>
    )
  }
}

OrderForm.propTypes = {
  bidId: PropTypes.number,
  orderId: PropTypes.number,
  orderUid: PropTypes.string
}

export default OrderForm
