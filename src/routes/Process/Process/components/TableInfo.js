import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import './TableInfo.less'

const TableInfo = (props) => {
  const { work_order_uid: workOrder, name, writer, quota_clerk: quotaClerk, statistician, proofreader } = props.fieldsValue
  return (
    <div className='table-info'>
      <Row
        type='flex'
        align='middle'
      >
        <Col span={4}>工作令：{ workOrder }</Col>
        <Col span={4}>产品名称：{ name }</Col>
        <Col span={3}>单位：公斤</Col>
        <Col span={2} offset={5}>
          工艺：
          { writer ||
            <Button
              type='primary'
              size='small'
            >
              签字
            </Button>
          }
        </Col>
        <Col span={2}>
          定额：
          { quotaClerk ||
            <Button
              type='primary'
              size='small'
            >
              签字
            </Button>
          }
        </Col>
        <Col span={2}>
          统计：
          { statistician ||
            <Button
              type='primary'
              size='small'
            >
              签字
            </Button>
          }
        </Col>
        <Col span={2}>
          校对：
          { proofreader ||
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

TableInfo.propTypes = {
  fieldsValue: PropTypes.object.isRequired
}

export default TableInfo
