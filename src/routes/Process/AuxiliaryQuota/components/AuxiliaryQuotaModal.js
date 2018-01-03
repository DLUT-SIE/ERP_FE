import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Row, Col, Form } from 'antd'

import './AuxiliaryQuotaModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  quota_coef: {
    rules: [{
      // required: true, message: '请输入定额系数！'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入有效的整数或小数！'
    }]
  },
  quota: {
    rules: [{
      // required: true, message: '请输入定额！'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入有效的整数或小数！'
    }]
  },
  stardard_code: {
    // rules: [{ required: true, message: '请输入标准代码！' }]
  },
  category: {
    // rules: [{ required: true, message: '请输入材料种类' }]
  },
  remark: {}
}

class AuxiliaryQuotaModal extends React.Component {
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
        ...values
      })
    })
  }

  render () {
    const { visible, form, fieldsValue, onCancel, onChange } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='auxiliary-quota-modal'
          title='辅材信息卡'
          width={800}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button
              key='previous'
              className='change-btn'
              data-type='previous'
              onClick={onChange}
            >
              上一条
            </Button>,
            <Button
              key='next'
              className='change-btn'
              data-type='next'
              onClick={onChange}
            >
              下一条
            </Button>,
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
          <fieldset>
            <legend>原始数据</legend>
            <Row gutter={16}>
              <Col span={3} className='original-data-label'>工作票号：</Col>
              <Col span={5} className='original-data-value'>{fieldsValue.ticket_number}</Col>
              <Col span={3} className='ant-form-item-label'>部件图号：</Col>
              <Col span={5} className='original-data-value'>{fieldsValue.unit_drawing_number}</Col>
              <Col span={3} className='ant-form-item-label'>名称：</Col>
              <Col span={5} className='original-data-value'>{fieldsValue.name}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={3} className='original-data-label'>受压标识：</Col>
              <Col span={5} className='original-data-value'>{fieldsValue.piece_weight}</Col>
              <Col span={3} className='original-data-label'>材质：</Col>
              <Col span={5} className='original-data-value'>{fieldsValue.material}</Col>
              <Col span={3} className='original-data-label'>数量：</Col>
              <Col span={5} className='original-data-value'>{fieldsValue.count}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={3} className='original-data-label'>净重：</Col>
              <Col span={5} className='original-data-value'>{fieldsValue.piece_weight}</Col>
              <Col span={3} className='original-data-label'>毛重：</Col>
              <Col span={5} className='original-data-value'>{fieldsValue.total_weight}</Col>
              <Col span={3} className='original-data-label'>规格：</Col>
              <Col span={5} className='original-data-value'>{fieldsValue.spec}</Col>
            </Row>
          </fieldset>
          <br />
          <fieldset>
            <legend>辅材定额录入</legend>
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label='定额系数' {...formItemLayout}>
                  {
                    getFieldDecorator('quota_coef', fieldsConfig['quota_coef'])(
                      <Input placeholder='请输入定额系数' />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label='定额' {...formItemLayout}>
                  {
                    getFieldDecorator('quota', fieldsConfig['quota'])(
                      <Input placeholder='请输入定额' />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label='标准代码' {...formItemLayout}>
                  {
                    getFieldDecorator('stardard_code', fieldsConfig['stardard_code'])(
                      <Input placeholder='请输入标准代码' />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label='材料种类' {...formItemLayout}>
                  {
                    getFieldDecorator('category', fieldsConfig['category'])(
                      <Input placeholder='请输入材料种类' />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label='备注' {...formItemLayout}>
                  {
                    getFieldDecorator('remark', fieldsConfig['remark'])(
                      <Input placeholder='请输入备注' />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </fieldset>
        </Modal>
      </Form>
    )
  }
}

AuxiliaryQuotaModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

let makeFileds = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = { value: value + '' }
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(AuxiliaryQuotaModal)

export default WrappedForm
