import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Button, DatePicker } from 'antd'
import './FilterBar.less'
import moment from 'moment'

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
      fieldsValue.create_dt_start = fieldsValue.create_dt_start && moment(fieldsValue.create_dt_start).format('YYYY-MM-DD')
      fieldsValue.create_dt_end = fieldsValue.create_dt_end && moment(fieldsValue.create_dt_end).format('YYYY-MM-DD')
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
          {
            getFieldDecorator('create_dt_start')(
              <DatePicker placeholder='起始日期' />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('create_dt_end')(
              <DatePicker placeholder='结束日期' />
            )
          }
        </FormItem>
        <FormItem>
          {getFieldDecorator('uid')(
            <Input className='input' placeholder='入库单编号' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('source')(
            <Input className='input' placeholder='货物来源' />
          )}
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            icon='search'
            htmlType='submit'
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
    result[key] = { value }
    if ((key === 'create_dt_start' || key === 'create_dt_end')) {
      if (value) {
        result[key] = {
          value: moment(value, 'YYYY-MM-DD')
        }
      }
    }
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(FilterBar)

export default WrappedForm
