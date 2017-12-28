import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import './TableInfo.less'

class TableInfo extends React.Component {
  render () {
    const { fieldsValue } = this.props
    const { workOrder, productionName, unit, writer, proofreader } = fieldsValue
    return (
      <div className='table-info'>
        <Row
          type='flex'
          align='middle'
        >
          <Col span={3}>工作令：{ workOrder }</Col>
          <Col span={3}>产品名称：{ productionName }</Col>
          <Col span={3}>单位：{ unit }</Col>
          <Col span={2} offset={11}>编制人：{writer}</Col>
          <Col span={2}>审核人：{proofreader}</Col>
        </Row>
      </div>
    )
  }
}

TableInfo.propTypes = {
  fieldsValue: PropTypes.object.isRequired
}

export default TableInfo
