import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import './TableInfo.less'

const TableInfo = (props) => {
  const { work_order_uid: workOrder, name } = props.fieldsValue
  return (
    <div className='table-info'>
      <Row
        type='flex'
        align='middle'
      >
        <Col span={3}>工作令：{ workOrder }</Col>
        <Col span={3}>产品名称：{ name }</Col>
      </Row>
    </div>
  )
}

TableInfo.propTypes = {
  fieldsValue: PropTypes.object.isRequired
}

export default TableInfo
