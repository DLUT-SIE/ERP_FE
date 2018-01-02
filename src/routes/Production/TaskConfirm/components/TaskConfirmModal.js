/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form } from 'antd'
import './TaskConfirmModal.less'
import CustomSelect from 'components/CustomSelect'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
}

class ProductionPlanModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    console.log('props', this.props.fieldsValue)
    // this.getGroupsByProcessName()
    let groups = this.props.fieldsValue.select_work_groups
    groups = groups.map((item) => {
      return { label: item.name, value: item.id }
    })
    this.setState({ groups: groups })
    console.log('props', this.props.fieldsValue)
  }
  handleSave = () => {
    const { onOk, form, fieldsValue } = this.props
    console.log(fieldsValue)
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
      console.log('values.work_group', values.work_group)
      onOk && onOk({
        ...values,
        count: +values.count
      })
      console.log('values', values)
    })
  }
  render () {
    const { visible, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='task-allocation-modal'
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
          <FormItem label='工作票号'{...formItemLayout} >
            {
              getFieldDecorator('material_index')(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='工作令'{...formItemLayout} >
            {
              getFieldDecorator('work_order_uid')(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='工序号'{...formItemLayout} >
            {
              getFieldDecorator('process_id')(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label='分配组' {...formItemLayout}>
            {
              getFieldDecorator('work_group_name')(
                <CustomSelect placeholder='请选择分配的工作组' list={this.state.groups}
                />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
ProductionPlanModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}
let makeFileds = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = { value }
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(ProductionPlanModal)

export default WrappedForm
