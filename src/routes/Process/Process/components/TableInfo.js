import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import './TableInfo.less'

class TableInfo extends React.Component {
  render () {
    const { workOrder, productionName, unit } = this.props
    return (
      <div className='table-info'>
        <Row
          type='flex'
          align='middle'
        >
          <Col span={3}>工作令：{ workOrder }</Col>
          <Col span={3}>产品名称：{ productionName }</Col>
          <Col span={3}>单位：{ unit }</Col>
          <Col span={2} offset={4}>工艺：</Col>
          <Col span={2}>定额：</Col>
          <Col span={2}>统计：</Col>
          <Col span={2}>校对：</Col>
          <Col span={3}>
            <Button
              className='trnsfercard-btn'
              type='primary'
            >
              查看流转卡列表
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

TableInfo.propTypes = {
  workOrder: PropTypes.string.isRequired,
  productionName: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired
}

export default TableInfo
