import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Modal, Input, Form, Row, Col } from 'antd'

// import './CardInfoModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  container_category: {
    // rules: [{ required: true, message: '请输入容器类别！' }]
  },
  parent_drawing_number: {
    // rules: [{ required: true, message: '请输入所属部件名称！' }]
  },
  material_index: {
    // rules: [{ required: true, message: '请输入材质标记！' }]
  },
  welding_plate_idx: {
    // rules: [{ required: true, message: '请选择产品试板图号！' }]
  },
  parent_plate_idx: {
    // rules: [{ required: true, message: '请输入母材试板图号！' }]
  }
}

class CardInfoModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = () => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk({
        ...values
      })
    })
  }

  render () {
    const { visible, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='card-info-modal'
          title='流转卡信息'
          visible={visible}
          width={800}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label='容器类别' {...formItemLayout}>
                {
                  getFieldDecorator('container_category', fieldsConfig['container_category'])(
                    <Input placeholder='请输入容器类别' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='所属部件名称' {...formItemLayout}>
                {
                  getFieldDecorator('parent_drawing_number', fieldsConfig['parent_drawing_number'])(
                    <Input placeholder='请输入所属部件名称' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label='材质标记' {...formItemLayout}>
                {
                  getFieldDecorator('material_index', fieldsConfig['material_index'])(
                    <Input placeholder='请输入材质标记' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='产品试板图号' {...formItemLayout}>
                {
                  getFieldDecorator('welding_plate_idx', fieldsConfig['welding_plate_idx'])(
                    <Input placeholder='请输入产品试板图号' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label='母材试板图号' {...formItemLayout}>
                {
                  getFieldDecorator('parent_plate_idx', fieldsConfig['parent_plate_idx'])(
                    <Input placeholder='请输入母材试板图号' />
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

CardInfoModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(CardInfoModal)

export default WrappedForm
