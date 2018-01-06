import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Button, Input } from 'antd'
import './FilterBar.less'
const FormItem = Form.Item

class FilterBar extends React.Component {
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
        className='add-production-user-filterbar'
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          {getFieldDecorator('first_name')(
            <Input className='input' placeholder='用户姓名' />
          )}
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            size='small'
            icon='search'
            onClick={this.handleSubmit}
          >
            查询
          </Button>
        </FormItem>
      </Form>
    )
  }
}

FilterBar.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired
}

let makeFields = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = Form.createFormField({ value })
    // todo: 需要增加一个过滤器
    if (key === 'first_name') {
      result[key] = Form.createFormField({ value })
    }
  })
  // result.first_name = fieldsValue.user.first_name
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(FilterBar)

export default WrappedForm
