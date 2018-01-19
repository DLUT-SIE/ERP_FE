import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Row, Col, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
}
const fieldsConfig = {
  weight: {
    rules: [{ pattern: /^(\d+)(\.\d+)?$/, message: '请输入正确的整数或小数！' }]
  }
}

class DetailModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = (e) => {
    const { isBar, onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const params = {
        weight: values.weight ? +values.weight : 0,
        unit: values.unit || '',
        sign: values.sign || '',
        batch_number: values.batch_number || ''
      }
      if (isBar) {
        params.length = +values.length
      }
      onOk && onOk(fieldsValue.id, params)
    })
  }

  render () {
    const { visible, isBar, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='steel-entry-detail-modal'
          title='钢材入库单明细修改'
          width={1300}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label='重量' {...formItemLayout}>
                {
                  getFieldDecorator('weight', fieldsConfig['weight'])(
                    <Input placeholder='请输入重量' />
                  )
                }
              </FormItem>
            </Col>
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
              <FormItem label='标记号' {...formItemLayout}>
                {
                  getFieldDecorator('sign', fieldsConfig['sign'])(
                    <Input placeholder='请输入标记号' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='炉批号' {...formItemLayout}>
                {
                  getFieldDecorator('batch_number', fieldsConfig['batch_number'])(
                    <Input placeholder='请输入炉批号' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          { isBar &&
            <Row gutter={16}>
              <Col span={6}>
                <FormItem label='长度' {...formItemLayout}>
                  {
                    getFieldDecorator('length', fieldsConfig['length'])(
                      <Input placeholder='请输入长度' />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          }
        </Modal>
      </Form>
    )
  }
}

DetailModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  isBar: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const makeFields = (fieldsValue) => {
  let result = {}
  for (let key in fieldsValue) {
    result[key] = Form.createFormField({ value: fieldsValue[key] })
  }
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(DetailModal)

export default WrappedForm
