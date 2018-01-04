/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Button, Form } from 'antd'
import './TaskConfirmModal.less'
import TaskInfoTable from './TaskInfoTable'
import { PROCESS_DETAIL_STATUS } from 'const'

class ProductionPlanModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
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
      values.remark = this.state.remark
      values.status = PROCESS_DETAIL_STATUS.INSPECTED
      console.log('remark', fieldsValue)
      onOk && onOk({
        ...values,
        count: +values.count
      })
      console.log('values', values)
    })
  }
  getFooter = (status) => {
    if (status === PROCESS_DETAIL_STATUS.INSPECTED) {
      return [
        <Button
          key='back'
          onClick={this.props.onCancel}
        >
          返回
        </Button>
      ]
    } else if (status === PROCESS_DETAIL_STATUS.CONFIRMED) {
      return [
        <Button
          key='submit'
          type='primary'
          onClick={this.handleSave}
        >
          保存
        </Button>,
        <Button
          key='back'
          onClick={this.props.onCancel}
        >
          返回
        </Button>
      ]
    }
  }
  onChange = (remark) => {
    this.state.remark = remark
    console.log('onchange', remark)
  }
  render () {
    const { visible, onCancel } = this.props
    return (
      <Form>
        <Modal
          className='task-confirm-modal'
          title='编辑工作组'
          visible={visible}
          width={750}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={this.getFooter(this.props.fieldsValue.status)}
        >
          <TaskInfoTable taskInfo={this.props.fieldsValue} onChange={this.onChange} />
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
    result[key] = Form.createFormField({ value })
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(ProductionPlanModal)

export default WrappedForm
