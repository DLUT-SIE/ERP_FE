/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form } from 'antd'
import './ProductionUserModal.less'
import CustomSelect from 'components/CustomSelect'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
}

class ProductionUserModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    let groups = this.props.groups
    groups = groups.map((item) => {
      return { label: item.name, value: item.id }
    })
    this.setState({ groups: groups, first_name: this.props.fieldsValue.user.first_name })
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
      if (values.work_group_name) {
        values.work_group = values.work_group_name
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
          className='production-user-modal'
          title='编辑工作组'
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
          <FormItem label='用户名'{...formItemLayout} >
            {
              <Input disabled value={this.state.first_name}/>
            }
          </FormItem>
          <FormItem label='所属工作组' {...formItemLayout}>
            {
              getFieldDecorator('work_group_name')(
                <CustomSelect placeholder='请选择所属工作组' list={this.state.groups}
                />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
ProductionUserModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired
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
})(ProductionUserModal)

export default WrappedForm
