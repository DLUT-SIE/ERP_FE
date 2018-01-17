import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { BIDDING_SHEET_STATUS_LIST } from 'const'
import { Form, Modal, Row, Col, Input } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './StatusModal.less'

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const formItemLayoutReason = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
}
const fieldsConfig = {
  new_status: {
    rules: [{ required: true, message: '请选择新状态' }]
  },
  reason: {
    rules: [{ required: true, message: '请输入回溯原因' }]
  }
}

class StatusModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = (e) => {
    const { onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk({
        new_status: +values.new_status,
        bidding_sheet: fieldsValue.bidding_sheet_id,
        original_status: fieldsValue.original_status_id,
        reason: values.reason
      })
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='bidding-sheet-status-modal'
          title='标单状态更改'
          width={800}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={8}>
              <FormItem label='新状态' {...formItemLayout}>
                {
                  getFieldDecorator('new_status', fieldsConfig['new_status'])(
                    <CustomSelect
                      placeholder='请选择新状态'
                      list={BIDDING_SHEET_STATUS_LIST}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='标单编号' {...formItemLayout}>
                {
                  getFieldDecorator('bidding_sheet', fieldsConfig['bidding_sheet'])(
                    <Input disabled />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='当前状态' {...formItemLayout}>
                {
                  getFieldDecorator('original_status', fieldsConfig['original_status'])(
                    <Input disabled />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label='回溯原因' {...formItemLayoutReason}>
                {
                  getFieldDecorator('reason', fieldsConfig['reason'])(
                    <TextArea placeholder='请输入回溯原因' rows={4} />
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Modal>
      </Form>
    )
  }
}

StatusModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(StatusModal)

export default WrappedForm
