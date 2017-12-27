import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Modal } from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
const fieldsConfig = {
  remark: {
    rules: [{ required: true, message: '请输入备注！' }]
  }
}

class EditModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = () => {
    const { id, onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(id, {
        ...values
      })
    })
  }

  render () {
    const { visible, onCancel, form, type } = this.props
    return (
      <Form>
        <Modal
          className='detailed-list-modal'
          title='物料信息卡'
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <FormItem
            label={type !== 'cooperant_items' ? '备注' : '协作内容'}
            {...formItemLayout}
          >
            {
              form.getFieldDecorator('remark', fieldsConfig['remark'])(
                <Input
                  placeholder={type !== 'cooperant_items' ? '请输入备注' : '请输入协作内容'}
                />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

EditModal.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
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
})(EditModal)

export default WrappedForm
