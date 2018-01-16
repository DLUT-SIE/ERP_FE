import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Button, Input } from 'antd'
import './FilterBar.less'
import { MATERIAL_REFUND_CARD_TYPE, MATERIAL_REFUND_CARD } from 'const'
import CustomSelect from 'components/CustomSelect'
const FormItem = Form.Item

class FilterBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    /* let detailsType = []
    _.mapKeys(DETAILED_TYPE, (value, key) => {
      detailsType.push({ label: key, value: value })
    })
    this.setState({ detailsTypes: detailsType }) */
  }

  handleAddApplyCards = (e) => {
    e.preventDefault()
    const { onSearch, form } = this.props
    form.validateFields(() => {
      let fieldsValue = form.getFieldsValue()
      onSearch && onSearch({
        ...fieldsValue
      })
    })
  }
  onSelectChange = (value) => {
    const { onRefundTypeChange } = this.props
    onRefundTypeChange(value)
  }
  handleSearch = (e) => {
    e.preventDefault()
    const { onSearch, form } = this.props
    form.validateFields(() => {
      let fieldsValue = form.getFieldsValue()
      fieldsValue.status = 4
      fieldsValue.fields = 'id,uid,specification,actual_count,material_mark'
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
        className='add-apply-card-filterbar'
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          {getFieldDecorator('uid')(
            <Input className='input' placeholder='领用卡编号' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('category', {
            initialValue: MATERIAL_REFUND_CARD_TYPE.WELD,
            rules:[{ required: true, message:'请选择材料类型' }] })(
              <CustomSelect list={MATERIAL_REFUND_CARD} placeholder='请选择材料类型' onChange={this.onSelectChange} />
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
      </Form>
    )
  }
}

FilterBar.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onRefundTypeChange: PropTypes.func.isRequired
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
