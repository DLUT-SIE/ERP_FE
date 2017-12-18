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
  quota_coefficient: {
    rules: [{ required: true, message: '请输入定额系数！' }]
  },
  quota: {
    rules: [{
      required: true, message: '请输入定额！'
    }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  },
  norm_code: {
    rules: [{ required: true, message: '请输入标准代码！' }]
  },
  category: {
    rules: [{ required: true, message: '请输入材料种类' }]
  },
  remark: {}
}

class PrincipalQuotaModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleChangeProcessMaterials = (e) => {
    const type = e.target.dataset.type
    const { onChange } = this.props
    onChange & onChange(type)
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
      onOk && onOk({
        ...values,
        material: +values.material,
        count: +values.count
      })
    })
  }

  render () {
    const { visible, form, onCancel, onChange } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='principal-quota-modal'
          title='编辑辅材定额'
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
              <Col span={8}>工作票号：{}</Col>
              <Col span={8}>图号：{}</Col>
              <Col span={8}>名称：{}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>受压标识：{}</Col>
              <Col span={8}>材质：{}</Col>
              <Col span={8}>数量：{}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>净重：{}</Col>
              <Col span={8}>毛重：{}</Col>
              <Col span={8}>规格：{}</Col>
            </Row>
          </fieldset>
          <br />
          <fieldset>
            <legend>辅材定额录入</legend>
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label='定额系数' {...formItemLayout}>
                  {
                    getFieldDecorator('quota_coefficient', fieldsConfig['quota_coefficient'])(
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
                    getFieldDecorator('norm_code', fieldsConfig['norm_code'])(
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

PrincipalQuotaModal.propTypes = {
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
})(PrincipalQuotaModal)

export default WrappedForm
