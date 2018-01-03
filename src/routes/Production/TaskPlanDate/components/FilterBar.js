import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Button, Input } from 'antd'
import './FilterBar.less'
import CustomSelect from 'components/CustomSelect'
import { PROCESS_ROUTE_LIST, TASK_PLAN_STATUS } from 'const/index'
import util from 'utils'
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
      console.log(fieldsValue, fieldsValue)
      fieldsValue.plan_status = util.str2bool(fieldsValue.plan_status)
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
        className='task-plan-date-filterbar'
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          {getFieldDecorator('work_order_uid')(
            <Input className='input' placeholder='工作令' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('material_index')(
            <Input className='input' placeholder='工作票号' />
          )}
        </FormItem>
        <FormItem >
          {
            getFieldDecorator('process_name')(
              <CustomSelect
                placeholder='工序'
                list={PROCESS_ROUTE_LIST}
              />
            )
          }
        </FormItem>
        <FormItem >
          {
            getFieldDecorator('plan_status')(
              <CustomSelect
                placeholder='任务计划状态'
                list={TASK_PLAN_STATUS}
              />
            )
          }
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
