/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Input, Button, Form } from 'antd'
import _ from 'lodash'
import './InventoryAccountModal.less'
import { makeFields } from 'utils'
import { MATERIAL_STATUS } from 'const'
import CustomSelect from 'components/CustomSelect'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const fieldsConfig = {
  weight: {
    rules:[{ required: true, message:'请输入数量（10:00）' }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  }
}
class BroughtInInventoryAccountModal extends React.Component {
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
      if (_.isUndefined(values.remark)) {
        values.remark = ''
      }
      onOk && onOk({
        ...values,
        count: +values.count
      })
    })
  }

  render () {
    const { visible, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          title='查看材料库存信息'
          className='brought-in-inventory-account-modal'
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
          <FormItem label='数量' {...formItemLayout}>
            {
              getFieldDecorator('count', fieldsConfig['count'])(
                <Input placeholder='' />
              )
            }
          </FormItem>
          <FormItem label='材料状态' {...formItemLayout}>
            {
              getFieldDecorator('status', fieldsConfig['status'])(
                <CustomSelect
                  list={MATERIAL_STATUS}
                  placeholder='请选择材料状态'
                />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
BroughtInInventoryAccountModal.propTypes = {
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
})(BroughtInInventoryAccountModal)

export default WrappedForm
