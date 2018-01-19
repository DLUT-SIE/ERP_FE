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
}

class DetailModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = (e) => {
    const { onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const params = {
        unit: values.unit || '',
        supplier: values.supplier || '',
        factory: +values.factory || '',
        remark: values.remark || ''
      }
      onOk && onOk(fieldsValue.id, params)
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='auxiliary-entry-detail-modal'
          title='辅材入库单明细修改'
          width={1300}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label='单位' {...formItemLayout}>
                {
                  getFieldDecorator('unit', fieldsConfig['unit'])(
                    <Input placeholder='请输入单位' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='供应商' {...formItemLayout}>
                {
                  getFieldDecorator('supplier', fieldsConfig['supplier'])(
                    <Input placeholder='请输入供应商' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='厂家' {...formItemLayout}>
                {
                  getFieldDecorator('factory', fieldsConfig['factory'])(
                    <Input placeholder='请输入厂家' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
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

DetailModal.propTypes = {
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
})(DetailModal)

export default WrappedForm
