import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Form, Modal, Row, Col, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  uid: {
    rules: [{ required: true, message: '请输入供应商编号' }]
  },
  name: {
    rules: [{ required: true, message: '请选择供应商名称' }]
  }
}

class SupplierModal extends React.Component {
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
          className='supplier-modal'
          title='供应商信息编辑'
          width={800}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label='供应商编号' {...formItemLayout}>
                {
                  getFieldDecorator('uid', fieldsConfig['uid'])(
                    <Input placeholder='请输入供应商编号' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='供应商名称' {...formItemLayout}>
                {
                  getFieldDecorator('name', fieldsConfig['name'])(
                    <Input placeholder='请选择供应商名称' />
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

SupplierModal.propTypes = {
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
})(SupplierModal)

export default WrappedForm
