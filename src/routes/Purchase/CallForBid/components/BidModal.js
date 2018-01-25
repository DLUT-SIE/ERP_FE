import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Form, Modal, Row, Col, Input, DatePicker } from 'antd'

const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD'

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
}
const fieldsConfig = {}

class BidModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = (e) => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const params = {
        uid: values.uid || '',
        requestor: values.requestor || '',
        content: values.content || '',
        accept_dt: values.accept_dt || 0,
        accept_money: values.accept_money || '',
        contact: values.contact || '',
        contact_phone: values.contact_phone || ''
      }
      onOk && onOk(params)
    })
  }

  render () {
    const { visible, type, onCancel, form } = this.props
    const { getFieldDecorator } = form
    const disabled = type === 'check'
    return (
      <Form>
        <Modal
          className='calling-modal'
          title='标书填写'
          width={1300}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label='标书编号' {...formItemLayout}>
                {
                  getFieldDecorator('uid', fieldsConfig['uid'])(
                    <Input placeholder='请输入标书编号' disabled={disabled} />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='招(议)标单位' {...formItemLayout}>
                {
                  getFieldDecorator('requestor', fieldsConfig['requestor'])(
                    <Input placeholder='请输入招(议)标单位' disabled={disabled} />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='招(议)标内容' {...formItemLayout}>
                {
                  getFieldDecorator('content', fieldsConfig['content'])(
                    <Input placeholder='请输入招(议)标内容' disabled={disabled} />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='数量' {...formItemLayout}>
                {
                  getFieldDecorator('amount', fieldsConfig['amount'])(
                    <Input placeholder='请输入数量' disabled={disabled} />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label='中标日期' {...formItemLayout}>
                {
                  getFieldDecorator('accept_dt', fieldsConfig['accept_dt'])(
                    <DatePicker
                      format={dateFormat}
                      placeholder='请选择中标日期'
                      disabled={disabled}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='中标金额' {...formItemLayout}>
                {
                  getFieldDecorator('accept_money', fieldsConfig['accept_money'])(
                    <Input placeholder='请输入中标金额' disabled={disabled} />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='中标单位' {...formItemLayout}>
                {
                  getFieldDecorator('batch_number', fieldsConfig['batch_number'])(
                    <Input placeholder='请输入中标单位' disabled={disabled} />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label='联系人' {...formItemLayout}>
                {
                  getFieldDecorator('contact', fieldsConfig['contact'])(
                    <Input placeholder='请输入联系人' disabled={disabled} />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='联系电话' {...formItemLayout}>
                {
                  getFieldDecorator('contact_phone', fieldsConfig['contact_phone'])(
                    <Input placeholder='请输入联系电话' disabled={disabled} />
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

BidModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(BidModal)

export default WrappedForm
