import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

const PurchaseOrderInfo = (props) => {
  const { order_uid: orderUid, order_status: OrderStatus, revised_number: revisedNumber } = props.fieldsValue
  return (
    <div>
      <Row>
        <Col span={3} className='order-info-label'>订购单编号：</Col>
        <Col span={3} className='order-info-value'>{ orderUid }</Col>
        <Col span={3} className='order-info-label'>订购单状态：</Col>
        <Col span={3} className='order-info-value'>{ OrderStatus }</Col>
        <Col span={3} className='order-info-label'>采购技术条件号/修订号：</Col>
        <Col span={3} className='order-info-value'>{ revisedNumber }</Col>
      </Row>
    </div>
  )
}

PurchaseOrderInfo.propTypes = {
  fieldsValue: PropTypes.object.isRequired
}

export default PurchaseOrderInfo
