import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Modal, Row, Col, Input, Button } from 'antd'

import MaterialSubApplyItem from './MaterialSubApplyItem'
import './MaterialSubApplyModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
}
const fieldsConfig = {
  uid: {
    rules: [{ required: true, message: '请输入单据编号' }]
  },
  work_order: {
    rules: [{ required: true, message: '请输入工作令' }]
  },
  figure_code: {
    rules: [{ required: true, message: '请输入图号' }]
  },
  production: {
    rules: [{ required: true, message: '请输入产品名称' }]
  }
}

class MaterialSubApplyModal extends React.Component {
  constructor (props) {
    super(props)
  }

  getItemValues () {
    let { form } = this.props
    const values = form.getFieldsValue()
    let itemList = []
    let apply = {}
    _.map(values, (value, key) => {
      const keySplit = key.split('_')
      const index = +keySplit[keySplit.length - 1]
      if (!isNaN(index)) {
        keySplit.pop()
        const newKey = keySplit.join('_')
        if (_.isUndefined(itemList[index])) {
          itemList[index] = {}
        }
        itemList[index][newKey] = value
      } else {
        apply[key] = value
      }
    })
    return {
      apply,
      itemList
    }
  }

  handleAddItem = (e) => {
    const { onChange } = this.props
    let { apply, itemList } = this.getItemValues()
    itemList.push({})
    onChange && onChange(apply, itemList)
  }

  handleDeleteItem = (index) => {
    const { onChange } = this.props
    let { apply, itemList } = this.getItemValues()
    itemList = _.filter(itemList, (item, key) => {
      return key !== index
    })
    onChange && onChange(apply, itemList)
  }

  getMaterialSubApplyItems = () => {
    const { form, itemList } = this.props
    let result = []
    for (let i = 0; i < itemList.length; i++) {
      result.push(
        <MaterialSubApplyItem
          key={i}
          fieldsValue={itemList[i]}
          onDelete={this.handleDeleteItem}
          onChange={this.handleChangeValue}
          form={form}
          index={i}
        />
      )
    }
    return result
  }

  handleSave = (e) => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const { apply, itemList } = this.getItemValues()
      onOk && onOk(apply, itemList)
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='material-sub-apply-modal'
          title='材料代用申请单'
          width={1300}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <fieldset>
            <legend>基本信息</legend>
            <Row gutter={16}>
              <Col span={6}>
                <FormItem label='单据编号' {...formItemLayout}>
                  {
                    getFieldDecorator('uid', fieldsConfig['uid'])(
                      <Input placeholder='请输入单据编号' />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label='工作令' {...formItemLayout}>
                  {
                    getFieldDecorator('work_order', fieldsConfig['work_order'])(
                      <Input placeholder='请输入工作令' />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label='图号' {...formItemLayout}>
                  {
                    getFieldDecorator('figure_code', fieldsConfig['figure_code'])(
                      <Input placeholder='请输入图号' />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label='产品名称' {...formItemLayout}>
                  {
                    getFieldDecorator('production', fieldsConfig['production'])(
                      <Input placeholder='请输入产品名称' />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </fieldset>
          <fieldset>
            <legend>申请明细</legend>
            <Button
              className='add-btn'
              type='success'
              size='small'
              onClick={this.handleAddItem}
            >
              添加明细
            </Button>
            <div className='material-sub-apply-items'>
              {
                this.getMaterialSubApplyItems()
              }
            </div>
          </fieldset>
        </Modal>
      </Form>
    )
  }
}

MaterialSubApplyModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  itemList: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const makeFields = (apply, itemList) => {
  let result = {}
  _.map(apply, (value, key) => {
    result[key] = Form.createFormField({ value })
  })
  _.forEach(itemList, (item, index) => {
    _.map(item, (value, key) => {
      result[`${key}_${index}`] = Form.createFormField({ value })
    })
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.apply, props.itemList)
  }
})(MaterialSubApplyModal)

export default WrappedForm
