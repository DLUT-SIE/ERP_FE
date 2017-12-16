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
      console.log(fieldsValue)
      fieldsValue.start_date = fieldsValue.start_date && moment(fieldsValue.start_date).format('YYYY-MM-DD')
      fieldsValue.end_date = fieldsValue.end_date && moment(fieldsValue.end_date).format('YYYY-MM-DD')
      console.log(fieldsValue)
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
            getFieldDecorator('start_date')(
              <DatePicker placeholder='起始日期' />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('end_date')(
              <DatePicker placeholder='结束日期' />
            )
          }
        </FormItem>
        <FormItem>
          {getFieldDecorator('order_id')(
            <Input className='input' placeholder='工作令' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('material_mark')(
            <Input className='input' placeholder='焊材牌号' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('model_number')(
            <Input className='input' placeholder='型号' />
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
    if (key === 'start_date' || key === 'end_date') {
      result[key] = {
        value: moment(value, 'YYYY-MM-DD')
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
