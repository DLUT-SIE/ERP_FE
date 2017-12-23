import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input } from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  remark: {
    rules: [{ required: true, message: '请输入备注！' }]
  }
}

class Modal extends React.Component {
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
    const { visible, onCancel, form } = this.props
    return (
      <Form>
        <Modal
          className='detailed-list-modal'
          title='物料信息卡'
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <FormItem label='备注' {...formItemLayout}>
            {
              form.getFieldDecorator('remark', fieldsConfig['remark'])(
                <Input placeholder='请输入备注' />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

Modal.propTypes = {
  id: PropTypes.number.isRequired,
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
})(Modal)

export default WrappedForm
