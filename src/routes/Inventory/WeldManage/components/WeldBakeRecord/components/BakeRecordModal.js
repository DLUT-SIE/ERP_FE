/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form, Row, Col, DatePicker } from 'antd'
import moment from 'moment'
import './BakeRecordModal.less'
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
  float_pat: {
    rules:[{
      pattern: /^[0-9]+(\.[0-9]+)?$/, message: '请输入数值！'
    }]
  },
  heat_num: {
    rules: [{
      required: true, message: '请输入炉批号'
    }]
  },
  class_num: {
    rules: [{
      required: true, message: '请输入牌号'
    }]
  }
}
class BakeRecordModal extends React.Component {
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
    const { visible, fieldsValue, form, onCancel } = this.props
    const { getFieldDecorator } = form
    const id = fieldsValue && fieldsValue.id
    return (
      <Form>
        <Modal
          title={id ? '编辑烘焙记录' : '添加烘焙记录'}
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
              <FormItem label='日期' {...formItemLayout}>
                {
                  getFieldDecorator('create_dt')(
                    <DatePicker placeholder='请输入日期' />
                  )
            }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='编号' {...formItemLayout}>
                {
                  getFieldDecorator('uid')(
                    <Input placeholder='请输入编号' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='标准号' {...formItemLayout}>
                {
                  getFieldDecorator('standard_num', fieldsConfig['standard_num'])(
                    <Input placeholder='请输入标准号' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='规格' {...formItemLayout}>
                {
                  getFieldDecorator('size', fieldsConfig['size'])(
                    <Input placeholder='请输入规格' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='牌号' {...formItemLayout}>
                {
                  getFieldDecorator('class_num', fieldsConfig['class_num'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='炉批号' {...formItemLayout}>
                {
                  getFieldDecorator('heat_num', fieldsConfig['heat_num'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='编码标记' {...formItemLayout}>
                {
                  getFieldDecorator('codedmark', fieldsConfig['codedmark'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='数量' {...formItemLayout}>
                {
                  getFieldDecorator('quantity', fieldsConfig['float_pat'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='进炉时间' {...formItemLayout}>
                {
                  getFieldDecorator('furnace_time', fieldsConfig['furnace_time'])(
                    <DatePicker placeholder='' format='YYYY-MM-DD HH:mm' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='烘焙温度' {...formItemLayout}>
                {
                  getFieldDecorator('baking_temp', fieldsConfig['float_pat'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='到达温度时间' {...formItemLayout}>
                {
                  getFieldDecorator('heating_time', fieldsConfig['heating_time'])(
                    <DatePicker placeholder='' format='YYYY-MM-DD HH:mm' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='降温时间' {...formItemLayout}>
                {
                  getFieldDecorator('cooling_time', fieldsConfig['cooling_time'])(
                    <DatePicker placeholder='' format='YYYY-MM-DD HH:mm' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='进保湿炉时间' {...formItemLayout}>
                {
                  getFieldDecorator('holding_time', fieldsConfig['holding_time'])(
                    <DatePicker placeholder='' format='YYYY-MM-DD HH:mm' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='保温温度' {...formItemLayout}>
                {
                  getFieldDecorator('holding_temp', fieldsConfig['float_pat'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='领用时间' {...formItemLayout}>
                {
                  getFieldDecorator('apply_time', fieldsConfig['apply_time'])(
                    <DatePicker placeholder='' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='库管员' {...formItemLayout}>
                {
                  getFieldDecorator('keeper', fieldsConfig['keeper'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='焊接工程师' {...formItemLayout}>
                {
                  getFieldDecorator('welding_engineer', fieldsConfig['welding_engineer'])(
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
        </Modal>
      </Form>
    )
  }
}
BakeRecordModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const makeFields = (fieldsValue) => {
  let result = {}
  let dateArray = [
    'create_dt', 'furnace_time', 'heating_time', 'cooling_time', 'holding_time', 'apply_time'
  ]
  _.forEach(fieldsValue, (value, key) => {
    result[key] = Form.createFormField({ value })
    let k = dateArray.find((k) => {
      return k === key
    })
    if (!_.isUndefined(k)) {
      if (value) {
        result[key] = Form.createFormField({
          value: moment(value, 'YYYY-MM-DD hh:mm')
        })
      }
    }
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(BakeRecordModal)

export default WrappedForm
