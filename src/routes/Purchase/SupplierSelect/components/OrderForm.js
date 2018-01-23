import React from 'react'
import PropTypes from 'prop-types'

import PurchaseOrderRawTable from './PurchaseOrderRawTable'
import PurchaseOrderNormalTable from './PurchaseOrderNormalTable'
import PurchaseOrderWeldTable from './PurchaseOrderWeldTable'
import './OrderForm.less'

class OrderForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }

  handleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render () {
    const { show } = this.state
    const { order, list } = this.props
    return (
      <div className='supplier-select-order-form'>
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
  order: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
}

export default OrderForm
