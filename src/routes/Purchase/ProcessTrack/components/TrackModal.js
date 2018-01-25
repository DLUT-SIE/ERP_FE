import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import { Form, Modal, Input, Upload, Button, Checkbox } from 'antd'

// import './TrackModal.less'

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}
const fieldsConfig = {
  following_method: {
    rules: [{ required: true, message: '请输入跟踪方式！' }]
  },
  following_feedback: {
    rules: [{ required: true, message: '请输入跟踪反馈！' }]
  }
}

class TrackModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = (e) => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk({
        following_method: values.following_method || '',
        following_feedback: values.following_feedback || '',
        inform_process: values.inform_process || '',
        path: values.path.file
      })
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='track-modal'
          title='添加跟踪记录'
          width={800}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <FormItem label='跟踪方式' {...formItemLayout}>
            {
              getFieldDecorator('following_method', fieldsConfig['following_method'])(
                <Input placeholder='请输入跟踪方式' />
              )
            }
          </FormItem>
          <FormItem label='跟踪反馈' {...formItemLayout}>
            {
              getFieldDecorator('following_feedback', fieldsConfig['following_feedback'])(
                <TextArea rows={4} placeholder='请输入跟踪反馈' />
              )
            }
          </FormItem>
          <FormItem label='相关文件' {...formItemLayout}>
            {
              getFieldDecorator('path', fieldsConfig['path'])(
                <Upload
                  name='file'
                >
                  <Button
                    type='primary'
                    size='small'
                  >
                    上传相关文件
                  </Button>
                </Upload>
              )
            }
          </FormItem>
          <FormItem label='是否通知工艺部门' {...formItemLayout}>
            {
              getFieldDecorator('inform_process', fieldsConfig['inform_process'])(
                <Checkbox />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

TrackModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(TrackModal)

export default WrappedForm
