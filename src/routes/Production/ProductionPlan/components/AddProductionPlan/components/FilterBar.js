import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Button, Input } from 'antd'
import './FilterBar.less'
const FormItem = Form.Item

class FilterBar extends React.Component {
  constructor (props) {
    super(props)
  }

  handleAddProductionPlans = (e) => {
    e.preventDefault()
    const { onAddClick, form } = this.props
    form.validateFields(() => {
      let fieldsValue = form.getFieldsValue()
      onAddClick && onAddClick({
        ...fieldsValue
      })
    })
  }

  handleSearch = (e) => {
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
        className='add-production-plan-filterbar'
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
            size='small'
            icon='search'
            onClick={this.handleSearch}
          >
            查询
          </Button>
        </FormItem>
        <span className='float-right'>
          <FormItem>
            <Button
              type='success'
              size='small'
              onClick={this.handleAddProductionPlans}
            >
            添加生产计划
            </Button>
          </FormItem>
        </span>
      </Form>
    )
  }
}

FilterBar.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
}

let makeFields = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = Form.createFormField({ value })
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(FilterBar)

export default WrappedForm
