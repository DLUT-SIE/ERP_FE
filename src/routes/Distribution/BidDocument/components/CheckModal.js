import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './CheckModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}
const fieldsConfig = {
  status: {
    rules: [{ required: true, message: '请选择审核结果！' }]
  }
}

class CheckModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleSubmit = (e) => {
    const { onOk, form, documentId } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk({
        id: documentId,
        fieldsValue: {
          status: +values.status
        }
      })
    })
  }

  render () {
    const { visible, checkList, form, onCancel } = this.props
    return (
      <Form layout='horizontal'>
        <Modal
          className='check-modal'
          title='招标文件审核'
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={onCancel}
        >
          <FormItem label='审核' {...formItemLayout}>
            {
              form.getFieldDecorator('status', fieldsConfig['status'])(
                <CustomSelect
                  placeholder='----'
                  list={checkList}
                />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

CheckModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  documentId: PropTypes.number.isRequired,
  checkList: PropTypes.array.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object
}

const WrappedForm = Form.create({})(CheckModal)

export default WrappedForm
