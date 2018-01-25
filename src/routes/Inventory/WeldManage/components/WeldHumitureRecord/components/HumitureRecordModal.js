/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form, Row, Col } from 'antd'
import './HumitureRecordModal.less'
import { makeFields } from 'utils'
const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
}
const formItemLayout2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
const { TextArea } = Input
const fieldsConfig = {
  actual_temp_1: {
    rules:[{ required: true, message:'请输入温度（10:00）' }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  },
  actual_humid_1: {
    rules:[{ required: true, message:'请输入湿度（10:00）' }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  },
  actual_temp_2: {
    rules:[{ required: true, message:'请输入温度（16:00）' }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  },
  actual_humid_2: {
    rules:[{ required: true, message:'请输入湿度（16:00）' }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  }
}
class HumitureRecordModal extends React.Component {
  constructor (props) {
    super(props)
  }
  handleSave = () => {
    const { onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (fieldsValue.id) {
        values.id = fieldsValue.id
      }
      if (_.isUndefined(values.remark)) {
        values.remark = ''
      }
      if (!_.isUndefined(values.keeper)) {
        delete values.keeper
      }
      onOk && onOk({
        ...values,
        count: +values.count
      })
    })
  }
  render () {
    const { visible, fieldsValue, form, onCancel, requireHumid, requireTemp } = this.props
    const { getFieldDecorator } = form
    const id = fieldsValue && fieldsValue.id
    return (
      <Form>
        <Modal
          title={id ? '编辑温湿度记录' : '添加温湿度记录'}
          visible={visible}
          width={800}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button
              key='submit'
              type='primary'
              onClick={this.handleSave}
            >
              保存
            </Button>,
            <Button
              key='back'
              onClick={onCancel}
            >
              返回
            </Button>
          ]}
        >
          <Row>
            <Col span={12}>
              <FormItem label='要求温度' {...formItemLayout}>
                {
                  <Input placeholder='请输入要求温度'value={requireTemp} disabled />
            }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='要求湿度' {...formItemLayout}>
                {
                  <Input placeholder='请输入要求湿度' value={requireHumid} disabled />
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='实际温度(10:00)' {...formItemLayout}>
                {
                  getFieldDecorator('actual_temp_1', fieldsConfig['actual_temp_1'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='实际湿度(10:00)' {...formItemLayout}>
                {
                  getFieldDecorator('actual_humid_1', fieldsConfig['actual_humid_1'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='实际温度(16:00)' {...formItemLayout}>
                {
                  getFieldDecorator('actual_temp_2', fieldsConfig['actual_temp_2'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='实际湿度(16:00)' {...formItemLayout}>
                {
                  getFieldDecorator('actual_humid_2', fieldsConfig['actual_humid_2'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label='备注' {...formItemLayout2} >
                {
                  getFieldDecorator('remark', fieldsConfig['remark'])(
                    <TextArea />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='记录员' {...formItemLayout}>
                {
                  getFieldDecorator('keeper', fieldsConfig['keeper'])(
                    <Input placeholder='' disabled />
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
HumitureRecordModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  requireHumid: PropTypes.number.isRequired,
  requireTemp: PropTypes.number.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(HumitureRecordModal)

export default WrappedForm
