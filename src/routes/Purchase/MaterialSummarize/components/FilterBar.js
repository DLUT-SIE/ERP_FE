import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Form, Input, Button } from 'antd'
import { MATERIAL_CATEGORY_LIST } from 'const'

import CustomSelect from 'components/CustomSelect'
import './FilterBar.less'

const FormItem = Form.Item

class FilterBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    MATERIAL_CATEGORY_LIST.shift()
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
        className='material-summarize-filterbar'
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          {getFieldDecorator('inventory_type', { initialValue: 0 })(
            <CustomSelect
              placeholder='请选择材料类型状态'
              list={MATERIAL_CATEGORY_LIST}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('process_material_name')(
            <Input className='input' placeholder='请输入物料名称' />
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

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(FilterBar)

export default WrappedForm
