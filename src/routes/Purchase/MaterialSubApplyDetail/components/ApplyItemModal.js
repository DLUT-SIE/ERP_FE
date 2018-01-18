import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Form, Modal, Row, Col, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
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

class ApplyItemModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = (e) => {
    const { onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(fieldsValue.id, values)
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='material-sub-apply-item-modal'
          title='材料代用申请条目'
          width={1300}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label='部件图号' {...formItemLayout}>
                {
                  getFieldDecorator('part_figure_code', fieldsConfig['part_figure_code'])(
                    <Input placeholder='请输入部件图号' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='原材料名称' {...formItemLayout}>
                {
                  getFieldDecorator('old_name', fieldsConfig['old_name'])(
                    <Input placeholder='请输入原材料名称' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='原材料标准' {...formItemLayout}>
                {
                  getFieldDecorator('old_standard', fieldsConfig['old_standard'])(
                    <Input placeholder='请输入原材料标准' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='原材料规格和尺寸' {...formItemLayout}>
                {
                  getFieldDecorator('old_size', fieldsConfig['old_size'])(
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
                  getFieldDecorator('part_ticket_code', fieldsConfig['part_ticket_code'])(
                    <Input placeholder='请输入零件图号或票号' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='拟用材料名称' {...formItemLayout}>
                {
                  getFieldDecorator('new_name', fieldsConfig['new_name'])(
                    <Input placeholder='请输入拟用材料名称' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='拟用材料标准' {...formItemLayout}>
                {
                  getFieldDecorator('new_standard', fieldsConfig['new_standard'])(
                    <Input placeholder='请输入拟用材料标准' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='拟用材料规格和尺寸' {...formItemLayout}>
                {
                  getFieldDecorator('new_size', fieldsConfig['new_size'])(
                    <Input placeholder='请输入拟用材料规格和尺寸' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Modal>
      </Form>
    )
  }
}

ApplyItemModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(ApplyItemModal)

export default WrappedForm
