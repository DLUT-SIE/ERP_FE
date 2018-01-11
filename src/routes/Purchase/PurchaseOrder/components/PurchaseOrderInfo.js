import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import './PurchaseOrderInfo.less'

const PurchaseOrderInfo = (props) => {
  const { uid, status_name: statusName, revised_number: revisedNumber } = props.fieldsValue
  return (
    <div className='purchase-order-info'>
      <Row>
        <Col span={2} className='order-info-label'>订购单编号：</Col>
        <Col span={3} className='order-info-value'>{ uid }</Col>
        <Col span={2} className='order-info-label'>订购单状态：</Col>
        <Col span={3} className='order-info-value'>{ statusName }</Col>
        <Col span={4} className='order-info-label'>采购技术条件号/修订号：</Col>
        <Col span={3} className='order-info-value'>{ revisedNumber }</Col>
      </Row>
    </div>
  )
}

PurchaseOrderInfo.propTypes = {
  fieldsValue: PropTypes.object.isRequired
}

export default PurchaseOrderInfo
