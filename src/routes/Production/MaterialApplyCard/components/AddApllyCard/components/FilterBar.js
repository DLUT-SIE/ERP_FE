import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Button, Input } from 'antd'
import { DETAILED_TYPE } from 'const'
import CustomSelect from 'components/CustomSelect'
import './FilterBar.less'
const FormItem = Form.Item
const applyCardsType = {
  4: [{ value: 'welding_material_apply_cards', label: '焊材' }],
  1: [{ value: 'auxiliary_material_apply_cards', label: '辅材' }],
  3: [{ value: 'bought_in_component_apply_cards', label: '外购件' }]
}

class FilterBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      apply_types: applyCardsType[DETAILED_TYPE[0].value] }
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
    const { onAddClick, form } = this.props
    form.validateFields(() => {
      let fieldsValue = form.getFieldsValue()
      onAddClick && onAddClick({
        ...fieldsValue
      })
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    const { onSearch, form } = this.props
    form.validateFields(() => {
      let fieldsValue = form.getFieldsValue()
      onSearch && onSearch({
        ...fieldsValue
      })
    })
  }
  handleDetailChange = (value) => {
    this.setState({
      apply_types: applyCardsType[value]
    })
    this.props.form.setFieldsValue({
      apply_card_type:  applyCardsType[value][0].value
    })
  }
  handleApplyCardTypeChange = (value) => {
    this.setState({
      apply_card: value
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
          {getFieldDecorator('work_order_uid', {
            rules:[{ required: true, message:'请输入工作令' }]
          })(
            <Input className='input' placeholder='工作令' />
          )}
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('detail_type',
              {
                initialValue: '4',
                rules:[{ required: true, message:'请选择明细表类型' }]
              }
            )(
              <CustomSelect
                placeholder='请选择明细表类型'
                list={DETAILED_TYPE}
                onChange={this.handleDetailChange}
              />
            )
          }
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
        <span className='float-right'>
          <FormItem label='领用单类型' >
            {
              getFieldDecorator('apply_card_type',
                {
                  rules:[{ required: true, message:'请选择要新建的领用单类型' }]
                })(
                  <CustomSelect
                    placeholder='请选择材料类型'
                    list={this.state.apply_types}
                    onChange={this.handleApplyCardTypeChange}
                />
            )
            }
          </FormItem>
          <FormItem>
            <Button
              type='success'
              size='small'
              onClick={this.handleAddApplyCards}
            >
            新建领用单
            </Button>
          </FormItem>
        </span>
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
