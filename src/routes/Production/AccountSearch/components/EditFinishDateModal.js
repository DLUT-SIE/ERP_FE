/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Button, Form, Input, DatePicker } from 'antd'
import './AccountSearchModal.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
}
class EditFinishDateModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
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
      values.estimated_finish_dt = fieldsValue.estimated_finish_dt
      onOk && onOk({
        ...values,
        count: +values.count
      })
    })
  }

  render () {
    console.log(this.props)
    const { editDateVisible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='account-search-modal'
          title='更改计划完成时间'
          visible={editDateVisible}
          width={'25%'}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button key='submit' type='primary' onClick={this.handleSave}>确认</Button>,
            <Button key='back' onClick={this.props.onCancel}>关闭</Button>
          ]}
        >
          <FormItem label='工作票'{...formItemLayout} >
            {
              getFieldDecorator('process_material.ticket_number')(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='所属工作令'{...formItemLayout} >
            {
              getFieldDecorator('sub_order')(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='计划完成时间' {...formItemLayout}>
            {
              getFieldDecorator('estimated_finish_dt')(
                <DatePicker placeholder='计划完成时间' />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
EditFinishDateModal.propTypes = {
  editDateVisible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}
let makeFileds = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = Form.createFormField({ value })
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(EditFinishDateModal)

export default WrappedForm
