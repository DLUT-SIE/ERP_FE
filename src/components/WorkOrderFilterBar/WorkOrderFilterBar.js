import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
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
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Form
        className='pendingorder-filterbar'
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          {getFieldDecorator('order_id')(
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
    )
  }
}

WorkOrderFilterBar.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired
}

let makeFileds = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = { value }
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(WorkOrderFilterBar)

export default WrappedForm
