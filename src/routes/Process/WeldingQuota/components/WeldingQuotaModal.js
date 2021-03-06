import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Modal, Input, Button, Form, Row, Col } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './WeldingQuotaModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  category: {
    // rules: [{ required: true, message: '请输入类别！' }]
  },
  material: {
    rules: [{ required: true, message: '请选择牌号！' }]
  },
  size: {
    rules: [{ required: true, message: '请输入规格！' }]
  },
  operative_norm: {
    rules: [{ required: true, message: '请输入执行标注' }]
  },
  quota: {
    rules: [{
      required: true, message: '请输入定额'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入有效的整数或小数！'
    }]
  },
  remark: {}
}

class WeldingQuotaModal extends React.Component {
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
        material: +values.material,
        size: values.size || '',
        operative_norm: values.operative_norm || '',
        quota: values.quota ? +values.quota : 0,
        remark: values.remark || ''
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
          className='welding-quota-modal'
          title='焊材信息卡'
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
              <FormItem label='类别' {...formItemLayout}>
                {
                  getFieldDecorator('category', fieldsConfig['category'])(
                    <Input placeholder='请输入类别' disabled />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='牌号' {...formItemLayout}>
                {
                  getFieldDecorator('material', fieldsConfig['material'])(
                    <CustomSelect
                      placeholder='请选择牌号'
                      list={materials}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='规格' {...formItemLayout}>
                {
                  getFieldDecorator('size', fieldsConfig['size'])(
                    <Input placeholder='请输入规格' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
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
              <FormItem label='定额' {...formItemLayout}>
                {
                  getFieldDecorator('quota', fieldsConfig['quota'])(
                    <Input placeholder='请输入定额' />
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
        </Modal>
      </Form>
    )
  }
}

WeldingQuotaModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  materials: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(WeldingQuotaModal)

export default WrappedForm
