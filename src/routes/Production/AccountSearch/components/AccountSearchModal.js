/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Button, Form } from 'antd'
import './AccountSearchModal.less'
import AccountSearchTable from './AccountSearchTable'

class AccountSearchModal extends React.Component {
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
      onOk && onOk({
        ...fieldsValue,
        count: +values.count
      })
    })
  }

  render () {
    const { visible, onCancel } = this.props
    return (
      <Form>
        <Modal
          className='account-search-modal'
          title='编辑工作组焊接零件工作票'
          visible={visible}
          width={'74%'}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button key='submit' type='primary' onClick={this.handleSave}>更改计划日期</Button>,
            <Button key='back' onClick={this.props.onCancel}>关闭</Button>
          ]}
        >
          <AccountSearchTable ledgerInfo={this.props.fieldsValue} />
        </Modal>
      </Form>
    )
  }
}
AccountSearchModal.propTypes = {
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
})(AccountSearchModal)

export default WrappedForm
