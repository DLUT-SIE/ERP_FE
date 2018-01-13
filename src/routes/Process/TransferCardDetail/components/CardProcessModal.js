import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Modal, Button, Input, Form } from 'antd'

import './CardProcessModal.less'

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
const fieldsConfig = {
  name: {},
  detail: {}
}

class CardProcessModal extends React.Component {
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
        index: +values.index,
        name: values.name,
        detail: values.detail
      })
    })
  }

  render () {
    const { visible, form, type, onCancel, onChange } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='transfer-card-process-modal'
          title='流转卡工序'
          visible={visible}
          width={600}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button
              style={{ display: type === 'add' ? 'none' : 'display' }}
              key='previous'
              className='change-btn'
              data-type='previous'
              onClick={onChange}
            >
              上一条
            </Button>,
            <Button
              style={{ display: type === 'add' ? 'none' : 'display' }}
              key='next'
              className='change-btn'
              data-type='next'
              onClick={onChange}
            >
              下一条
            </Button>,
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
          <FormItem label='序号' {...formItemLayout}>
            {
              getFieldDecorator('index', fieldsConfig['index'])(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='工序' {...formItemLayout}>
            {
              getFieldDecorator('name', fieldsConfig['name'])(
                <Input placeholder='请输入工序' />
              )
            }
          </FormItem>
          <FormItem label='工艺过程及技术要求' {...formItemLayout}>
            {
              getFieldDecorator('detail', fieldsConfig['detail'])(
                <TextArea rows={10} placeholder='请输入工艺过程及技术要求' />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

CardProcessModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(CardProcessModal)

export default WrappedForm
