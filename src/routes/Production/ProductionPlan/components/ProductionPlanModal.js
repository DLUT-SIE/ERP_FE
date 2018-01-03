/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form, DatePicker } from 'antd'
import moment from 'moment'
import './ProductionPlanModal.less'
import { PRODUCTION_STATUS } from 'const/index'
import CustomSelect from 'components/CustomSelect'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
}

const fieldsConfig = {
  status: {
    rules:[{ required: true, message:'请输入生产计划状态' }]
  },
  plan_dt: {
    rules:[{ required: true, message:'请输计划年月' }, { type: 'date', message:'请选择一个日期' }]
  }
}
class ProductionPlanModal extends React.Component {
  constructor (props) {
    super(props)
  }
  handleSave = () => {
    const { onOk, form, fieldsValue } = this.props
    console.log(fieldsValue)
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (fieldsValue.id) {
        values.id = fieldsValue.id
      }
      if (_.isUndefined(values.remark)) {
        values.remark = ''
      }
      fieldsValue.plan_dt = fieldsValue.plan_dt && moment(fieldsValue.plan_dt).format('YYYY-MM-DD')
      onOk && onOk({
        ...values,
        count: +values.count
      })
    })
  }
  render () {
    const { visible, fieldsValue, form, onCancel } = this.props
    const { getFieldDecorator } = form
    const id = fieldsValue && fieldsValue.id
    return (
      <Form>
        <Modal
          className='warehouse-modal'
          title={id ? '修改生产计划' : '添加生产计划'}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button
              key='submit'
              type='primary'
              onClick={this.handleSave}
            >
              保存
            </Button>,
            <Button
              key='back'
              onClick={onCancel}
            >
              返回
            </Button>
          ]}
        >
          <FormItem label='生产计划状态'{...formItemLayout} >
            {
              getFieldDecorator('status', fieldsConfig['status'])(
                <CustomSelect
                  placeholder='请选择生产计划状态'
                  list={PRODUCTION_STATUS}
                />
              )
            }
          </FormItem>
          <FormItem label='计划年月' {...formItemLayout}>
            {
              getFieldDecorator('plan_dt')(
                <DatePicker placeholder='请输入计划年月' />
              )
            }
          </FormItem>
          <FormItem label='备注' {...formItemLayout}>
            {
              getFieldDecorator('remark')(
                <Input placeholder='请输入备注' />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
ProductionPlanModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}
let makeFileds = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = Form.createFormField({ value })
    if (key === 'plan_dt') {
      if (value) {
        result[key] = Form.createFormField({
          value: moment(value, 'YYYY-MM-DD')
        })
      }
    }
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(ProductionPlanModal)

export default WrappedForm
