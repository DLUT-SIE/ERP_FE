import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form, Row, Col } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './PrincipalQuotaModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  size: {
    rules: [{ required: true, message: '请输入规格！' }]
  },
  count: {
    rules: [{
      required: true, message: '请输入数量！'
    }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  },
  weight: {
    rules: [{ required: true, message: '请输入单重！' }]
  },
  material: {
    rules: [{ required: true, message: '请选择材质！' }]
  },
  operative_norm: {
    rules: [{ required: true, message: '请输入执行标准！' }]
  },
  status: {
    rules: [{ required: true, message: '请输入供货状态！' }]
  }
}

class PrincipalQuotaModal extends React.Component {
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
      onOk && onOk({
        ...values,
        material: +values.material,
        count: +values.count
      })
    })
  }

  render () {
    const { visible, fieldsValue, materials, form, onCancel, onChange } = this.props
    const { getFieldDecorator } = form
    const { id } = fieldsValue
    return (
      <Form>
        <Modal
          className='principal-quota-modal'
          title='主材信息卡'
          visible={visible}
          width={800}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button
              style={{ display: id ? 'block' : 'none' }}
              key='previous'
              className='change-btn'
              data-type='previous'
              onClick={onChange}
            >
              上一条
            </Button>,
            <Button
              style={{ display: id ? 'block' : 'none' }}
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
          <Row gutter={16}>
            <Col span={8}>
              <FormItem label='规格' {...formItemLayout}>
                {
                  getFieldDecorator('size', fieldsConfig['size'])(
                    <Input placeholder='请输入规格' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='数量' {...formItemLayout}>
                {
                  getFieldDecorator('count', fieldsConfig['count'])(
                    <Input placeholder='请输入数量' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='单重' {...formItemLayout}>
                {
                  getFieldDecorator('weight', fieldsConfig['weight'])(
                    <Input placeholder='请输入单重' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <FormItem label='材质' {...formItemLayout}>
                {
                  getFieldDecorator('material', fieldsConfig['material'])(
                    <CustomSelect
                      placeholder='请选择材质'
                      list={materials}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='执行标准' {...formItemLayout}>
                {
                  getFieldDecorator('operative_norm', fieldsConfig['operative_norm'])(
                    <Input placeholder='请输入执行标准' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='供货状态' {...formItemLayout}>
                {
                  getFieldDecorator('status', fieldsConfig['status'])(
                    <Input placeholder='请输入供货状态' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
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
        </Modal>
      </Form>
    )
  }
}

PrincipalQuotaModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  materials: PropTypes.array.isRequired,
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
  console.log('result', result)
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(PrincipalQuotaModal)

export default WrappedForm
