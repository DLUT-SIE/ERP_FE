import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Button, Input } from 'antd'
import './FilterBar.less'
import moment from 'moment'
import { MATERIAL_CATEGORY } from 'const/index'
import CustomSelect from 'components/CustomSelect'

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
    console.log(MATERIAL_CATEGORY)
    return (
      <Form
        className='warehouse-manage-filterbar'
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          {getFieldDecorator('name')(
            <Input className='input' placeholder='库房名称' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('location')(
            <Input className='input' placeholder='位置' />
          )}
        </FormItem>
        <FormItem >
          {
            getFieldDecorator('category')(
              <CustomSelect
                placeholder='请选择材料类型'
                list={MATERIAL_CATEGORY}
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
        <FormItem className='float-right'>
          <Button type='primary' icon='plus' onClick={this.props.onAddClick} >
            新增库房
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
    if (key === 'create_dt_start' || key === 'create_dt_end') {
      if (value) {
        result[key] = {
          value: moment(value, 'YYYY-MM-DD')
        }
      }
    }
    if (key === 'category') {
      result[key] = 0
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
