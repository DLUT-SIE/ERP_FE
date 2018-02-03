import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Form, Button, Input } from 'antd'
import { MATERIAL_APPLY_CARD } from 'const'
import CustomSelect from 'components/CustomSelect'
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
        className='production-user-filterbar'
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          {getFieldDecorator('uid')(
            <Input className='input' placeholder='领用单编号' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('category', {
            initialValue: 'welding_material_apply_cards',
            rules:[{ required: true, message:'请选择材料类型' }] })(
              <CustomSelect list={MATERIAL_APPLY_CARD} placeholder='请选择材料类型' />
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
          <Button type='success' >
            <Link to='/production/material_apply_card/create_material_apply_card'>添加领用材料</Link>
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
    if (key === 'category' && _.isNull(value)) {
      result[key] = Form.createFormField({ value: 'welding_material_apply_cards' })
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
