import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Button, Input, DatePicker } from 'antd'
import './FilterBar.less'
import moment from 'moment'
import CustomSelect from 'components/CustomSelect'
import { PRODUCTION_STATUS } from 'const/index'
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
      fieldsValue.plan_start_time = fieldsValue.plan_start_time && moment(fieldsValue.plan_start_time).format('YYYY-MM-DD')
      fieldsValue.plan_end_time = fieldsValue.plan_end_time && moment(fieldsValue.plan_end_time).format('YYYY-MM-DD')
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
        className='production-plan-manage-filterbar'
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          {getFieldDecorator('work_order')(
            <Input className='input' placeholder='工作令' />
          )}
        </FormItem>
        <FormItem >
          {
            getFieldDecorator('status')(
              <CustomSelect
                placeholder='状态'
                list={PRODUCTION_STATUS}
              />
            )
          }
        </FormItem>
        <FormItem>
          {getFieldDecorator('plan_start_time')(
            <DatePicker className='input' placeholder='计划年月开始' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('plan_end_time')(
            <DatePicker className='input' placeholder='计划年月终止' />
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
        <FormItem className='float-right'>
          <Button type='primary' icon='plus' onClick={this.props.onAddClick} >
            添加生产计划
          </Button>
        </FormItem>
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
    result[key] = { value }
    if (key === 'plan_start_time' || key === 'plan_end_time') {
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
