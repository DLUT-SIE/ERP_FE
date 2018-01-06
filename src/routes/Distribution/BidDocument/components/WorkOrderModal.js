import React from 'react'
import PropTypes from 'prop-types'
import { SELL_TYPE_LIST } from 'const'
import { Form, Modal, Input } from 'antd'
import { makeFields } from 'utils'

import CustomSelect from 'components/CustomSelect'
import './WorkOrderModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}

const fieldsConfig = {
  id: {
    rules: [{ required: true, message: '请输入工作令编号！' }]
  },
  sell_type: {
    rules: [{ required: true, message: '请选择销售类型！' }]
  },
  client: {
    rules: [{ required: true, message: '请输入客户名称！' }]
  },
  project_name: {
    rules: [{ required: true, message: '请输入项目名称！' }]
  },
  count: {
    rules: [{
      required: true, message: '请输入数量！'
    }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  }
}

class WorkOrderModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleSubmit = (e) => {
    const { onOk, form, productionId } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk({
        product: productionId,
        uid: values.uid,
        sell_type: +values.sell_type,
        client: values.client,
        project: values.project,
        count: +values.count
      })
    })
  }

  render () {
    const { visible, form, onCancel } = this.props
    return (
      <Form layout='horizontal'>
        <Modal
          className='work-order-modal'
          title='生成工作令'
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={onCancel}
        >
          <FormItem label='工作令编号' {...formItemLayout}>
            {
              form.getFieldDecorator('uid', fieldsConfig['id'])(
                <Input />
              )
            }
          </FormItem>
          <FormItem label='销售类型' {...formItemLayout}>
            {
              form.getFieldDecorator('sell_type', fieldsConfig['sell_type'])(
                <CustomSelect
                  placeholder='----'
                  list={SELL_TYPE_LIST}
                />
              )
            }
          </FormItem>
          <FormItem label='客户名称' {...formItemLayout}>
            {
              form.getFieldDecorator('client', fieldsConfig['client'])(
                <Input />
              )
            }
          </FormItem>
          <FormItem label='项目名称' {...formItemLayout} >
            {
              form.getFieldDecorator('project', fieldsConfig['project_name'])(
                <Input />
              )
            }
          </FormItem>
          <FormItem label='数量' {...formItemLayout} >
            {
              form.getFieldDecorator('count', fieldsConfig['count'])(
                <Input />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

WorkOrderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  productionId: PropTypes.number.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(WorkOrderModal)

export default WrappedForm
