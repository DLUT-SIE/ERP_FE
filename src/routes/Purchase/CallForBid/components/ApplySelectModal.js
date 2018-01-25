import React from 'react'
import PropTypes from 'prop-types'
import { CALL_FOR_BID_CATEGORY_LIST } from 'const'
import { Modal, Form } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './ApplySelectModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}
const fieldsConfig = {
  category: {
    rules: [{ required: true, message: '请选择招标方式！' }]
  }
}

class ApplySelectModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = () => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(+values.category)
    })
  }

  render () {
    const { visible, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='apply-select-modal'
          title='招标方式'
          width={600}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <FormItem label='招标方式选择' {...formItemLayout}>
            {
              getFieldDecorator('category', fieldsConfig['category'])(
                <CustomSelect
                  list={CALL_FOR_BID_CATEGORY_LIST}
                  placeholder='请选择招标方式'
                />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}

ApplySelectModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create()(ApplySelectModal)

export default WrappedForm
