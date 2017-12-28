import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import './TableInfo.less'

class TableInfo extends React.Component {
  render () {
    const { fieldsValue } = this.props
    const { workOrder, productionName, unit } = fieldsValue
    return (
      <div className='table-info'>
        <Row
          type='flex'
          align='middle'
        >
          <Col span={3}>工作令：{ workOrder }</Col>
          <Col span={3}>产品名称：{ productionName }</Col>
          <Col span={3}>单位：{ unit }</Col>
          <Col span={2} offset={7}>工艺：</Col>
          <Col span={2}>定额：</Col>
          <Col span={2}>统计：</Col>
          <Col span={2}>校对：</Col>
        </Row>
      </div>
    )
  }
}

TableInfo.propTypes = {
  fieldsValue: PropTypes.object.isRequired
}

export default TableInfo
