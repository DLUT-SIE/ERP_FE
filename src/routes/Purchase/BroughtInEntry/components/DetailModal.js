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
  count: {
    rules: [{ pattern: /^(\d+)(\.\d+)?$/, message: '请输入正确的整数或小数！' }]
  },
  weight: {
    rules: [{ pattern: /^(\d+)(\.\d+)?$/, message: '请输入正确的整数或小数！' }]
  }
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
        sign: values.sign || '',
        count: values.count ? +values.count : 0,
        batch_number: values.batch_number || '',
        smelt_number: values.smelt_number || '',
        unit: values.unit || '',
        factory: values.factory || '',
        weight: values.weight ? +values.weight : 0,
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
          className='brought-in-entry-detail-modal'
          title='外购件入库单明细修改'
          width={1300}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
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
              <FormItem label='数量' {...formItemLayout}>
                {
                  getFieldDecorator('count', fieldsConfig['count'])(
                    <Input placeholder='请输入数量' />
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
            <Col span={6}>
              <FormItem label='熔炼号' {...formItemLayout}>
                {
                  getFieldDecorator('smelt_number', fieldsConfig['smelt_number'])(
                    <Input placeholder='请输入熔炼号' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
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
              <FormItem label='生产厂家' {...formItemLayout}>
                {
                  getFieldDecorator('factory', fieldsConfig['factory'])(
                    <Input placeholder='请输入生产厂家' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='净重' {...formItemLayout}>
                {
                  getFieldDecorator('weight', fieldsConfig['weight'])(
                    <Input placeholder='请输入净重' />
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

// const makeFields = (fieldsValue) => {
//   let result = {}
//   for (let key in fieldsValue) {
//     result[key] = Form.createFormField({ value: fieldsValue[key] })
//   }
//   return result
// }

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(DetailModal)

export default WrappedForm
