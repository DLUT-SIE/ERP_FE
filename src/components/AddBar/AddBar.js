import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

import './AddBar.less'

const FormItem = Form.Item

class AddBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { onAdd, form } = this.props
    form.validateFields(() => {
      let fieldsValue = form.getFieldsValue()
      onAdd && onAdd({
        ...fieldsValue
      })
    })
  }

  render () {
    const { form } = this.props
    return (
      <Form
        layout='inline'
        className='addbar'
      >
        <FormItem label='票号'>
          {
            form.getFieldDecorator('ticket_number', {})(
              <Input placeholder='请输入票号' />
            )
          }
        </FormItem>
        <FormItem>
          <Button
            type='success'
            htmlType='submit'
            onClick={this.handleSubmit}
          >
            添加
          </Button>
        </FormItem>
      </Form>
    )
  }
}

AddBar.propTypes = {
  form: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired
}

const WrappedForm = Form.create()(AddBar)

export default WrappedForm
