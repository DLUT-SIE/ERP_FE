import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { MATERIAL_CATEGORY } from 'const'
import { Form, Button } from 'antd'

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
    const { getFieldDecorator } = this.props.form

    return (
      <Form
        className='entry-confirm-filterbar'
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          {getFieldDecorator('category')(
            <CustomSelect
              placeholder='入库单类别'
              list={MATERIAL_CATEGORY}
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            icon='search'
            htmlType='submit'
            onClick={this.handleSubmit}
          >
            入库单查询
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
