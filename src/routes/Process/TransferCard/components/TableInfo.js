import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import './TableInfo.less'

class TableInfo extends React.Component {
  render () {
    const { fieldsValue } = this.props
    const { workOrder, productionName } = fieldsValue
    return (
      <div className='table-info'>
        <Row
          type='flex'
          align='middle'
        >
          <Col span={3}>工作令：{ workOrder }</Col>
          <Col span={3}>产品名称：{ productionName }</Col>
        </Row>
      </div>
    )
  }
}

TableInfo.propTypes = {
  fieldsValue: PropTypes.object.isRequired
}

export default TableInfo
