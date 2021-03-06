import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, DatePicker } from 'antd'
import './FilterBar.less'
import moment from 'moment'
import { makeFields } from 'utils'

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
          <Button type='success' icon='plus' onClick={this.props.onAddClick} >
            新建记录
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

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(FilterBar)

export default WrappedForm
