import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { MATERIAL_CATEGORY_LIST } from 'const'
import { Form, Modal, Row, Col, Input } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './QuotationModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  unit_price: {
    rules: [{ pattern: /^(\d+)(\.\d+)?$/, message: '请输入整数或小数' }]
  }
}

class QuotationModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = (e) => {
    const { onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(fieldsValue.id, {
        inventory_type: values.inventory_type ? +values.inventory_type : -1,
        name_spec: values.name_spec || '',
        material_mark: values.material_mark || '',
        unit_price: +values.unit_price || 0,
        unit: values.unit || ''
      })
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='quotation-modal'
          title='报价信息'
          width={800}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={8}>
              <FormItem label='物料类型' {...formItemLayout}>
                {
                  getFieldDecorator('inventory_type', fieldsConfig['inventory_type'])(
                    <CustomSelect
                      placeholder='请选择物料类型'
                      list={MATERIAL_CATEGORY_LIST}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='规格及名称' {...formItemLayout}>
                {
                  getFieldDecorator('name_spec', fieldsConfig['name_spec'])(
                    <Input placeholder='请输入规格及名称' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='材质' {...formItemLayout}>
                {
                  getFieldDecorator('material_mark', fieldsConfig['material_mark'])(
                    <Input placeholder='请输入材质' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <FormItem label='单价' {...formItemLayout}>
                {
                  getFieldDecorator('unit_price', fieldsConfig['unit_price'])(
                    <Input placeholder='请输入单价' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='单位' {...formItemLayout}>
                {
                  getFieldDecorator('unit', fieldsConfig['unit'])(
                    <Input placeholder='请输入单位' />
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

QuotationModal.propTypes = {
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
})(QuotationModal)

export default WrappedForm
