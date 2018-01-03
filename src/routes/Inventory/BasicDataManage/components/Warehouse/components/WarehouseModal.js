/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form } from 'antd'
import './WarehouseModal.less'
import { MATERIAL_CATEGORY } from 'const/index'
import CustomSelect from 'components/CustomSelect'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
}

const fieldsConfig = {
  name: {
    rules:[{ required: true, message:'请输入库房名称' }]
  },
  location: {
    rules:[{ required: true, message:'请输入库房名称' }]
  },
  category: {
    rules:[{ required: true, message:'请输入库房名称' }]
  }
}
class WarehouseModal extends React.Component {
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
    const { visible, fieldsValue, form, onCancel } = this.props
    const { getFieldDecorator } = form
    const id = fieldsValue && fieldsValue.id
    return (
      <Form>
        <Modal
          className='warehouse-modal'
          title={id ? '修改库房记录' : '增加库房记录'}
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
          <FormItem label='库房名称' {...formItemLayout}>
            {
              getFieldDecorator('name', fieldsConfig['name'])(
                <Input placeholder='请输入库房名称' />
              )
            }
          </FormItem>
          <FormItem label='位置' {...formItemLayout}>
            {
              getFieldDecorator('location', fieldsConfig['location'])(
                <Input placeholder='请输入位置' />
              )
            }
          </FormItem>
          <FormItem label='材料类型'{...formItemLayout} >
            {
              getFieldDecorator('category', fieldsConfig['category'])(
                <CustomSelect
                  placeholder='请选择材料类型'
                  list={MATERIAL_CATEGORY}
                />
              )
            }
          </FormItem>
        </Modal>
      </Form>
    )
  }
}
WarehouseModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}
let makeFileds = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = { value: value + '' }
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(WarehouseModal)

export default WrappedForm
