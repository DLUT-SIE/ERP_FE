import React from 'react'
import PropTypes from 'prop-types'
import util from 'utils'
import _ from 'lodash'
import moment from 'moment'
import { Form, Modal, Row, Col, Input, DatePicker } from 'antd'

const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD'

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
}
const fieldsConfig = {
}

class DetailModal extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSave = (e) => {
    const { onOk, form, fieldsValue } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const params = {
        count: +values.count || 0,
        weight: +values.weight || 0,
        total_weight: +values.total_weight || 0,
        model: values.model || '',
        batch_number: values.batch_number || '',
        factory: values.factory || '',
        remark: values.remark || ''
      }
      if (!_.isUndefined(values.production_dt)) {
        params.production_dt = moment(values.delivery_dt).format('YYYY-MM-DDThh:mm')
      }
      onOk && onOk(fieldsValue.id, params)
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='weld-entry-detail-modal'
          title='焊材入库单明细修改'
          width={1300}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label='件数' {...formItemLayout}>
                {
                  getFieldDecorator('count', fieldsConfig['count'])(
                    <Input placeholder='请输入件数' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='单件重量' {...formItemLayout}>
                {
                  getFieldDecorator('weight', fieldsConfig['weight'])(
                    <Input placeholder='请输入单件重量' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='公斤数' {...formItemLayout}>
                {
                  getFieldDecorator('total_weight', fieldsConfig['total_weight'])(
                    <Input placeholder='请输入公斤数' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='型号' {...formItemLayout}>
                {
                  getFieldDecorator('model', fieldsConfig['model'])(
                    <Input placeholder='请输入型号' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <FormItem label='材料批号' {...formItemLayout}>
                {
                  getFieldDecorator('batch_number', fieldsConfig['batch_number'])(
                    <Input placeholder='请输入材料批号' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='出厂日期' {...formItemLayout}>
                {
                  getFieldDecorator('production_dt', fieldsConfig['production_dt'])(
                    <DatePicker
                      format={dateFormat}
                      placeholder='请选择交货日期'
                      disabledDate={util.disabledDate}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='厂家' {...formItemLayout}>
                {
                  getFieldDecorator('factory', fieldsConfig['factory'])(
                    <Input placeholder='请输入厂家' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='备注' {...formItemLayout}>
                {
                  getFieldDecorator('remark', fieldsConfig['remark'])(
                    <Input placeholder='请输入备注' />
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

DetailModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const makeFields = (fieldsValue) => {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = Form.createFormField({ value })
    if (key === 'production_dt') {
      if (value) {
        result[key] = Form.createFormField({
          value: moment(value, 'YYYY-MM-DD')
        })
      }
    }
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(DetailModal)

export default WrappedForm
