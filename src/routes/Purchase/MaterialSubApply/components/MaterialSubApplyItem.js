import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input } from 'antd'

import './MaterialSubApplyItem.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 11 },
  wrapperCol: { span: 13 }
}
const fieldsConfig = {
  part_figure_code: {
    rules: [{ required: true, message: '请输入部件图号' }]
  },
  old_name: {
    rules: [{ required: true, message: '请输入原材料名称' }]
  },
  old_standard: {
    rules: [{ required: true, message: '请输入原材料标准' }]
  },
  old_size: {
    rules: [{ required: true, message: '请输入原材料规格和尺寸' }]
  },
  part_ticket_code: {
    rules: [{ required: true, message: '请输入零件图号或票号' }]
  },
  new_name: {
    rules: [{ required: true, message: '请输入拟用材料名称' }]
  },
  new_standard: {
    rules: [{ required: true, message: '请输入拟用材料标准' }]
  },
  new_size: {
    rules: [{ required: true, message: '请输入拟用材料规格和尺寸' }]
  }
}

class MaterialSubApplyItem extends React.Component {
  constructor (props) {
    super(props)
  }

  handleDelete = (e) => {
    const { index, onDelete } = this.props
    onDelete && onDelete(index)
  }

  render () {
    const { form, index } = this.props
    const { getFieldDecorator } = form
    return (
      <div className='material-sub-apply-item'>
        <span
          className='delete-btn'
          onClick={this.handleDelete}
        >
          X
        </span>
        <Row gutter={16}>
          <Col span={6}>
            <FormItem label='部件图号' {...formItemLayout}>
              {
                getFieldDecorator(`part_figure_code_${index}`, fieldsConfig['part_figure_code'])(
                  <Input placeholder='请输入部件图号' />
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='原材料名称' {...formItemLayout}>
              {
                getFieldDecorator(`old_name_${index}`, fieldsConfig['old_name'])(
                  <Input placeholder='请输入原材料名称' />
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='原材料标准' {...formItemLayout}>
              {
                getFieldDecorator(`old_standard_${index}`, fieldsConfig['old_standard'])(
                  <Input placeholder='请输入原材料标准' />
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='原材料规格和尺寸' {...formItemLayout}>
              {
                getFieldDecorator(`old_size_${index}`, fieldsConfig['old_size'])(
                  <Input placeholder='请输入原材料规格和尺寸' />
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <FormItem label='零件图号或票号' {...formItemLayout}>
              {
                getFieldDecorator(`part_ticket_code_${index}`, fieldsConfig['part_ticket_code'])(
                  <Input placeholder='请输入零件图号或票号' />
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='拟用材料名称' {...formItemLayout}>
              {
                getFieldDecorator(`new_name_${index}`, fieldsConfig['new_name'])(
                  <Input placeholder='请输入拟用材料名称' />
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='拟用材料标准' {...formItemLayout}>
              {
                getFieldDecorator(`new_standard_${index}`, fieldsConfig['new_standard'])(
                  <Input placeholder='请输入拟用材料标准' />
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='拟用材料规格和尺寸' {...formItemLayout}>
              {
                getFieldDecorator(`new_size_${index}`, fieldsConfig['new_size'])(
                  <Input placeholder='请输入拟用材料规格和尺寸' />
                )
              }
            </FormItem>
          </Col>
        </Row>
      </div>
    )
  }
}

MaterialSubApplyItem.propTypes = {
  form: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default MaterialSubApplyItem
