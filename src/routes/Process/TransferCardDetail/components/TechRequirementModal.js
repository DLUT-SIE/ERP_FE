import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Form } from 'antd'

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}
const fieldsConfig = {
  tech_requirement: {}
}

class TechRequirementModal extends React.Component {
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
          className='tech-requirement-modal'
          title='技术要求'
          visible={visible}
          width={600}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <FormItem label='技术要求' {...formItemLayout}>
            {
              getFieldDecorator('tech_requirement', fieldsConfig['tech_requirement'])(
                <TextArea rows={10} placeholder='请输入技术要求' />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

TechRequirementModal.propTypes = {
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
})(TechRequirementModal)

export default WrappedForm
