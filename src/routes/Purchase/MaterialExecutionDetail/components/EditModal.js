import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Modal, Input, Row, Col, Form } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  quota: {
    rules: [{
      // required: true, message: '请输入定额！'
    }, {
      // pattern: /^(\d+)(\.\d+)?$/, message: '请输入有效的整数或小数！'
    }]
  },
  part: {
    rules: [{
      // required: true, message: '请输入零件！'
    }]
  },
  oddments: {
    // rules: [{ required: true, message: '请输入余料！' }]
  },
  remark: {
    // rules: [{ required: true, message: '请输入备注' }]
  }
}

class EditModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = () => {
    const { onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(fieldsValue.id, {
        quota: values.quota || '',
        part: values.part || '',
        oddments: values.oddments || '',
        remark: values.remark || ''
      })
    })
  }

  render () {
    const { visible, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='edit-modal'
          title='材料执行明细修改'
          width={800}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label='定额' {...formItemLayout}>
                {
                  getFieldDecorator('quota', fieldsConfig['quota'])(
                    <Input placeholder='请输入定额' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='零件' {...formItemLayout}>
                {
                  getFieldDecorator('part', fieldsConfig['part'])(
                    <Input placeholder='请输入零件' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label='余料' {...formItemLayout}>
                {
                  getFieldDecorator('oddments', fieldsConfig['oddments'])(
                    <Input placeholder='请输入余料' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='备注' {...formItemLayout}>
                {
                  getFieldDecorator('remark', fieldsConfig['remark'])(
                    <Input placeholder='请输入备注' />
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

EditModal.propTypes = {
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
})(EditModal)

export default WrappedForm
