import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import './TableInfo.less'

class TableInfo extends React.Component {
  render () {
    const { workOrder, productionName, unit, writer, proofreader, handleClick } = this.props
    return (
      <div className='table-info'>
        <Row
          type='flex'
          align='middle'
        >
          <Col span={3}>工作令：{ workOrder }</Col>
          <Col span={3}>产品名称：{ productionName }</Col>
          <Col span={3}>单位：{ unit }</Col>
          <Col span={2} offset={8}>编制人：{writer}</Col>
          <Col span={2}>审核人：{proofreader}</Col>
          <Col span={3}>
            <Button
              className='add-btn'
              type='primary'
              onClick={handleClick}
            >
              添加
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
  unit: PropTypes.string.isRequired,
  writer: PropTypes.string.isRequired,
  proofreader: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default TableInfo
