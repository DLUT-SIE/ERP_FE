import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'antd'
import './TableInfo.less'

class TableInfo extends React.Component {
  render () {
    const { fieldsValue } = this.props
    const { work_order_uid: workOrder, product_name: productionName, writer, reviewer } = fieldsValue
    return (
      <div className='table-info'>
        <Row
          type='flex'
          align='middle'
        >
          <Col span={4}>工作令：{ workOrder }</Col>
          <Col span={4}>产品名称：{ productionName }</Col>
          <Col span={3}>单位：公斤</Col>
          <Col span={3} offset={7}>
            编制人：
            { writer ||
              <Button
                type='primary'
                size='small'
              >
                签字
              </Button>
            }
          </Col>
          <Col span={3}>
            审核人：
            { reviewer ||
              <Button
                type='primary'
                size='small'
              >
                签字
              </Button>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

TableInfo.propTypes = {
  fieldsValue: PropTypes.object.isRequired
}

export default TableInfo
