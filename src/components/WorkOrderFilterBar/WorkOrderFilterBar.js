import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Form, Input, Button } from 'antd'
import './WorkOrderFilterBar.less'

const FormItem = Form.Item

class WorkOrderFilterBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { onSearch, form } = this.props
    form.validateFields(() => {
      let fieldsValue = form.getFieldsValue()
      onSearch && onSearch({
        ...fieldsValue
      })
    })
  }

  render () {
    const { form, className } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={className}>
        <Form
          className='work-order-filterbar'
          layout='inline'
          onSubmit={this.handleSubmit}
        >
          <FormItem>
            {getFieldDecorator('work_order_uid')(
              <Input className='input' placeholder='工作令' />
            )}
          </FormItem>
          <FormItem>
            <Button
              type='primary'
              icon='search'
              htmlType='submit'
              onClick={this.handleSubmit}
            >
              工作令查询
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

WorkOrderFilterBar.propTypes = {
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  onSearch: PropTypes.func.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(WorkOrderFilterBar)

export default WrappedForm
