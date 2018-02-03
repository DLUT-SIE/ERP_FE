/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form, DatePicker } from 'antd'
import moment from 'moment'
import './TaskPlanDateModal.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
}

class ProductionPlanModal extends React.Component {
  constructor (props) {
    super(props)
  }
  handleSave = () => {
    const { onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (fieldsValue.id) {
        values.id = fieldsValue.id
      }
      values.estimated_start_dt = values.estimated_start_dt && moment(values.estimated_start_dt).format('YYYY-MM-DDThh:mm')
      values.estimated_finish_dt = values.estimated_finish_dt && moment(values.estimated_finish_dt).format('YYYY-MM-DDThh:mm')
      onOk && onOk({
        ...values,
        count: +values.count
      })
    })
  }
  render () {
    const { visible, fieldsValue, form, onCancel } = this.props
    const { getFieldDecorator } = form
    const estimatedStartDt = fieldsValue && fieldsValue.estimated_start_dt
    return (
      <Form>
        <Modal
          className='task-plan-date-modal'
          title={estimatedStartDt ? '修改工序计划时间' : '添加工序计划时间'}
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
          <FormItem label='工作票号'{...formItemLayout} >
            {
              getFieldDecorator('material_index')(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='工作令'{...formItemLayout} >
            {
              getFieldDecorator('work_order_uid')(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='工序号'{...formItemLayout} >
            {
              getFieldDecorator('process_id')(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='计划开始时间' {...formItemLayout}>
            {
              getFieldDecorator('estimated_start_dt')(
                <DatePicker placeholder='请输入计划开始时间' />
              )
            }
          </FormItem>
          <FormItem label='计划结束时间' {...formItemLayout}>
            {
              getFieldDecorator('estimated_finish_dt')(
                <DatePicker placeholder='请输入计划结束时间' />
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
let makeFields = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = Form.createFormField({ value })
    if (key === 'estimated_start_dt' || key === 'estimated_finish_dt') {
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
    return makeFields(props.fieldsValue)
  }
})(ProductionPlanModal)

export default WrappedForm
