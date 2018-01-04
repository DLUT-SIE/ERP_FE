import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { Modal, Row, Col, Form, DatePicker } from 'antd'

// import './EditModal.less'

const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  delivery_dt: {
    rules: [{
      required: true, message: '请选择交货日期！'
    }]
  }
}

class EditModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = () => {
    const { onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(fieldsValue.id, {
        delivery_dt: values.delivery_dt && moment(fieldsValue.delivery_dt).format('YYYY-MM-DD')
      })
    })
  }

  render () {
    const { visible, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='purchase-order-edit-modal'
          title='订购单信息修改'
          width={800}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={8}>
              <FormItem label='交货日期' {...formItemLayout}>
                {
                  getFieldDecorator('delivery_dt', fieldsConfig['delivery_dt'])(
                    <DatePicker format={dateFormat} placeholder='请选择交货日期' />
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

EditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const makeFields = (fieldsValue) => {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = Form.createFormField({ value })
    if (key === 'delivery_dt') {
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
})(EditModal)

export default WrappedForm
