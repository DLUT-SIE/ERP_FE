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
  uid: {
    rules: [{ required: true, message: '请输入单据编号' }]
  },
  work_order: {
    rules: [{ required: true, message: '请输入工作令' }]
  },
  figure_code: {
    rules: [{ required: true, message: '请输入图号' }]
  },
  production: {
    rules: [{ required: true, message: '请输入产品名称' }]
  }
}

class MaterialSubApplyModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = (e) => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(values)
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='material-sub-apply-edit-modal'
          title='材料代用申请单'
          width={1300}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label='单据编号' {...formItemLayout}>
                {
                  getFieldDecorator('uid', fieldsConfig['uid'])(
                    <Input placeholder='请输入单据编号' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='工作令' {...formItemLayout}>
                {
                  getFieldDecorator('work_order', fieldsConfig['work_order'])(
                    <Input placeholder='请输入工作令' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='图号' {...formItemLayout}>
                {
                  getFieldDecorator('figure_code', fieldsConfig['figure_code'])(
                    <Input placeholder='请输入图号' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='产品名称' {...formItemLayout}>
                {
                  getFieldDecorator('production', fieldsConfig['production'])(
                    <Input placeholder='请输入产品名称' />
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

MaterialSubApplyModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(MaterialSubApplyModal)

export default WrappedForm
