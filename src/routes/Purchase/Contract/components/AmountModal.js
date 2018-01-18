import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Form, Modal, Row, Col, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = (prepaidAmounts) => ({
  amount: {
    rules: [{
      validator: (rule, value, cb) => {
        if (!value) {
          cb('请输入金额')
          return
        }
        const reg = /^(\d+)(\.\d+)?$/
        if (!reg.test(value)) {
          cb('请输入正整数或小数！')
          return
        }
        value = +value
        if (value < 0 || value > prepaidAmounts) {
          cb('输入金额应大于0且小于应付金额！')
          return
        }
        cb()
      }
    }]
  }
})

class AmountModal extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this._fieldsConfig = fieldsConfig(this.props.prepaidAmounts)
  }

  handleSave = (e) => {
    const { onOk, form, id } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(id, {
        amount: +values.amount
      })
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='amount-modal'
          title='合同金额添加'
          width={600}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label='金额' {...formItemLayout}>
                {
                  getFieldDecorator('amount', this._fieldsConfig['amount'])(
                    <Input placeholder='请输入金额' />
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

AmountModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  prepaidAmounts: PropTypes.number.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(AmountModal)

export default WrappedForm
