import React from 'react'
import PropTypes from 'prop-types'
import { TRANSFERCARD_CATEGORY_LIST } from 'const'
import { Modal, Form } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './CreateTransferCardModal.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  category: {
    rules: [{ required: true, message: '请选择流转卡类型！' }]
  }
}

class CreateTransferCardModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = () => {
    const { id, onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk({
        id,
        category: +values.category
      })
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    return (
      <Form>
        <Modal
          className='card-modal'
          title='创建流转卡'
          visible={visible}
          width={500}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <FormItem label='流转卡类型' {...formItemLayout}>
            {
              form.getFieldDecorator('category', fieldsConfig['category'])(
                <CustomSelect
                  placeholder='请选择流转卡类型'
                  list={TRANSFERCARD_CATEGORY_LIST}
                />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

CreateTransferCardModal.propTypes = {
  id: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create()(CreateTransferCardModal)

export default WrappedForm
