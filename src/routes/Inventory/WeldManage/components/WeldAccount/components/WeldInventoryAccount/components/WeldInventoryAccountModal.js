/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Form, Row, Col, Select } from 'antd'
import './WeldInventoryAccountModal.less'
import util from 'utils'
import moment from 'moment'

import CustomTable from 'components/CustomTable'

const FormItem = Form.Item
const columns = [
  'class_name', 'specification', 'create_dt', 'material_batch_number', 'material_code', 'factory', 'weight'
]
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const fieldsConfig = {
  weight: {
    rules:[{ required: true, message:'请输入数量（10:00）' }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  }
}
class HumitureRecordModal extends React.Component {
  constructor (props) {
    super(props)
  }
  buildColumns () {
    return util.buildColumns(columns, {
      create_dt:{
        render: (text, record, index) => {
          return moment(record.create_dt).format('YYYY-MM-DD')
        }
      }
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
          <CustomTable
            dataSource={[{
              'id': 1,
              'class_name': '焊材',
              'specification': '12312',
              'create_dt': '2017-12-19',
              'material_batch_number': '99856',
              'material_code': '111',
              'factory': '大连机车厂',
              'weight': '159'
            }]}
            columns={this._columns}
            size='middle'
            onChange={this.handleChangeTable}
          />
          <Row>
            <Col span={12}>
              <FormItem label='数量' {...formItemLayout}>
                {
                  getFieldDecorator('weight', fieldsConfig['weight'])(
                    <Input placeholder='' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='材料状态' {...formItemLayout}>
                {
                  getFieldDecorator('status')(
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder='Select a person'
                      optionFilterProp='children'
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option value='in_use'>正常使用</Option>
                      <Option value='use_up'>已用完</Option>
                      <Option value='out_of_date'>已过期</Option>
                      <Option value='out_of_use'>已报废</Option>
                    </Select>
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
HumitureRecordModal.propTypes = {
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
})(HumitureRecordModal)

export default WrappedForm
