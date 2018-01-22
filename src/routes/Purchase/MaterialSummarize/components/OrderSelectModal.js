import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './OrderSelectModal.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}
const fieldsConfig = {
  purchase_order: {
    rules: [{ required: true, message: '请选择要加入的订购单！' }]
  }
}
class OrderSelectModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleChange = (value, item) => {
    this.setState({
      id: +value,
      uid: item.label
    })
  }

  handleSave = (e) => {
    const { onOk, form } = this.props
    const { id, uid } = this.state
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(id, uid)
    })
  }

  render () {
    const { visible, list, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='order-select-modal'
          title='创建中订购单'
          width={600}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <FormItem label='要加入的订购单' {...formItemLayout}>
            {
              getFieldDecorator('purchase_order', fieldsConfig['purchase_order'])(
                <CustomSelect
                  list={list}
                  placeholder='请选择要加入的订购单'
                  onChange={this.handleChange}
                />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

OrderSelectModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

const WrappedForm = Form.create()(OrderSelectModal)

export default WrappedForm
