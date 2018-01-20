import React from 'react'
import PropTypes from 'prop-types'
import { MATERIAL_EXECUTION_CATEGORY_LIST } from 'const'
import { Form, Row, Col, Input } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './ExecutionForm.less'

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const formItemLayoutRequirement = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}
const fieldsConfig = {
  uid: {
    rules: [{ required: true, message: '请输入单据编号' }]
  },
  material_type: {
    rules: [{ required: true, message: '请选择材料类型' }]
  },
  process_requirement: {
    rules: [{ required: true, message: '请输入技术要求' }]
  }
}

class DetailForm extends React.Component {
  constructor (props) {
    super(props)
  }

  handleChange = (e) => {
    const { value } = e.target
    const { field } = e.target.dataset
    const { onChange } = this.props
    onChange && onChange(field, value)
  }

  handleChangeSelect = (value, item) => {
    const { onChange } = this.props
    onChange && onChange('material_type', +value)
  }

  render () {
    const { form, disabled } = this.props
    const { getFieldDecorator } = form
    return (
      <div className='detail-form'>
        <Row gutter={16}>
          <Col span={8}>
            <FormItem label='单据编号' {...formItemLayout}>
              {
                getFieldDecorator('uid', fieldsConfig['uid'])(
                  <Input
                    placeholder='单据编号'
                    disabled={disabled}
                    data-field='uid'
                    onChange={this.handleChange}
                  />
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='材料类型' {...formItemLayout}>
              {
                getFieldDecorator('material_type', { ...fieldsConfig['material_type'], initialValue: 0 })(
                  <CustomSelect
                    placeholder='请选择材料类型'
                    list={MATERIAL_EXECUTION_CATEGORY_LIST}
                    disabled={disabled}
                    onChange={this.handleChangeSelect}
                  />
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <FormItem label='技术要求' {...formItemLayoutRequirement}>
              {
                getFieldDecorator('process_requirement', fieldsConfig['process_requirement'])(
                  <TextArea
                    placeholder='请输入技术要求'
                    disabled={disabled}
                    rows={4}
                    data-field='process_requirement'
                    onChange={this.handleChange}
                  />
                )
              }
            </FormItem>
          </Col>
        </Row>
      </div>
    )
  }
}

DetailForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

export default DetailForm
