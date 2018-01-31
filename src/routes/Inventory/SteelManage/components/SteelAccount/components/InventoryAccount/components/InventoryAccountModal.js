/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form, Row, Col } from 'antd'
import CustomSelect from 'components/CustomSelect'
import './InventoryAccountModal.less'
import { makeFields } from 'utils'
import { apis } from 'api/config'
import fetchAPI from 'api'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const fieldsConfig = {
  /* weight: {
    rules:[{ required: true, message:'请输入数量' }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  } */
}
class InventoryAccountModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      wareHouse: []
    }
  }
  componentWillMount () {
    fetchAPI(apis.InventoryAPI.getWarehouseRecords).then((repos) => {
      const results = repos.results
      const list = results.map((item) => {
        return { value: item.id, label: item.location }
      })
      this.setState({ wareHouse: list })
    })
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
  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }
  render () {
    const { visible, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          title='查看材料库存信息'
          visible={visible}
          width={800}
          onOk={this.handleSave}
          onCancel={onCancel}
          className='steel-inventory-account-modal'
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
          <Row>
            <Col span={12}>
              <FormItem label='名称及规格' {...formItemLayout}>
                {
                  getFieldDecorator('specification', fieldsConfig['specification'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='长度' {...formItemLayout}>
                {
                  getFieldDecorator('length', fieldsConfig['length'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='数量' {...formItemLayout}>
                {
                  getFieldDecorator('count', fieldsConfig['count'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='重量' {...formItemLayout}>
                {
                  getFieldDecorator('weight', fieldsConfig['weight'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='库房位置' {...formItemLayout}>
                {
                  getFieldDecorator('location')(
                    <CustomSelect
                      list={this.state.wareHouse}
                      placeholder='请选择库房'
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Modal>
      </Form>
    )
  }
}
InventoryAccountModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(InventoryAccountModal)

export default WrappedForm
