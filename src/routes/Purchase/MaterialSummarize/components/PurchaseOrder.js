import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, message } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './PurchaseOrder.less'

class PurchaseOrder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      purchaseOrderId: undefined,
      purchaseOrderUid: undefined
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      purchaseOrderId: undefined,
      purchaseOrderUid: undefined
    })
  }

  handleChange = (value, item) => {
    this.setState({
      purchaseOrderId: +value,
      purchaseOrderUid: item.label
    })
  }

  handleCheck = (e) => {
    const { purchaseOrderId, purchaseOrderUid } = this.state
    const { onOk } = this.props
    if (_.isUndefined(purchaseOrderId)) {
      message.warning('请先选择一个订购单编号！')
      return
    }
    onOk && onOk(purchaseOrderId, purchaseOrderUid)
  }

  handleAdd = (e) => {
    const { onOk } = this.props
    onOk && onOk()
  }

  render () {
    const { list } = this.props
    const { purchaseOrderUid } = this.state
    return (
      <div className='material-summarize-purchase-order'>
        <CustomSelect
          list={list}
          value={purchaseOrderUid}
          placeholder='请选择采购单编号'
          onChange={this.handleChange}
        />
        <Button
          type='primary'
          onClick={this.handleCheck}
        >
          查看订购单
        </Button>
        <Button
          type='success'
          onClick={this.handleAdd}
        >
          新建订购单
        </Button>
      </div>
    )
  }
}

PurchaseOrder.propTypes = {
  list: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired
}

export default PurchaseOrder
