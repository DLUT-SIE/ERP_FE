import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Row, Col, Form, Message } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './RouteModal.less'

const FormItem = Form.Item
const { TextArea } = Input
const routePrefix = 'route-'

class RouteModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  getFormItems = () => {
    const { number, prefix, list } = this.props
    const { getFieldDecorator } = this.props.form
    const items = []
    for (let i = 1; i <= number; i++) {
      items.push(
        <Col span={2} key={i}>
          <FormItem label={`${prefix}${i}`}>
            {getFieldDecorator(`${routePrefix}${i}`)(
              <CustomSelect
                allowClear
                style={{ width: 60 }}
                list={list}
                placeholder='----'
              />
            )}
          </FormItem>
        </Col>
      )
    }
    return items
  }

  handleInputChange = (e) => {
    const value = e.target.value
    this.setState({
      inputValue: value
    })
  }

  handleQuickEdit = () => {
    let { inputValue } = this.state
    if (!inputValue) {
      return
    }
    const { list } = this.props
    inputValue = inputValue.replace(/；/g, ';').toUpperCase()
    const values = inputValue.split(';')
    for (let i = 0; i < values.length; i++) {
      const item = _.find(list, (item) => {
        return item.label === values[i]
      })
      if (!item) {
        Message.error('请输入正确的路线！')
        return
      } else {
        values[i] = item.value
      }
    }
    this.setRouteValue(values)
  }

  setRouteValue = (values) => {
    const { number } = this.props
    for (let i = values.length; i < number; i++) {
      values[i] = undefined
    }
    const fieldsValue = {}
    _.forEach(values, (value, index) => {
      fieldsValue[`${routePrefix}${index + 1}`] = value
    })
    this.props.form.setFieldsValue(fieldsValue)
  }

  handleChangeProcessMaterials = (e) => {
    const type = e.target.dataset.type
    const { onChange } = this.props
    onChange & onChange(type)
  }

  handleSave = () => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk(values)
    })
  }

  render () {
    const { inputValue } = this.state
    const { processMaterial, title, visible, label, onCancel } = this.props
    return (
      <Form>
        <Modal
          className='route-modal'
          title={title}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button
              key='previous'
              className='previous-btn'
              data-type='previous'
              onClick={this.handleChangeProcessMaterials}
            >
              上一条
            </Button>,
            <Button
              key='next'
              className='previous-btn'
              data-type='next'
              onClick={this.handleChangeProcessMaterials}
            >
              下一条
            </Button>,
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
          <div className='process-material-info'>
            <Row gutter={16} key={0}>
              <Col span={6} key={0}>
                票号：{processMaterial.ticket_number}
              </Col>
              <Col span={6} key={1}>
                图号：{processMaterial.drawing_number}
              </Col>
              <Col span={6} key={2}>
                名称：{processMaterial.name}
              </Col>
              <Col span={6} key={3}>
                规格：{processMaterial.spec}
              </Col>
            </Row>
            <Row gutter={16} key={1}>
              <Col span={6} key={0}>
                部件号：{processMaterial.part_number}
              </Col>
              <Col span={6} key={1}>
                材质：{processMaterial.material}
              </Col>
              <Col span={6} key={2}>
                数量：{processMaterial.count}
              </Col>
              <Col span={6} key={3}>
                备注：{processMaterial.remark}
              </Col>
            </Row>
          </div>
          <div>
            <div className='quick-edit'>
              <b htmlFor='routeInput'>{label}</b>
              <TextArea
                className='text-input'
                id='routeInput'
                type='large'
                value={inputValue}
                onChange={this.handleInputChange}
              />
              <Button
                type='primary'
                onClick={this.handleQuickEdit}
              >
                快速编辑
              </Button>
            </div>
            <Row>
              {this.getFormItems()}
            </Row>
          </div>
        </Modal>
      </Form>
    )
  }
}

RouteModal.propTypes = {
  processMaterial: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  prefix: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

let makeFields = function (props) {
  const { number, fieldsValue } = props
  let result = {}
  for (let i = 0; i < number; i++) {
    result[`${routePrefix}${i + 1}`] = Form.createFormField({ value: undefined })
  }
  _.forEach(fieldsValue, (value, index) => {
    result[`${routePrefix}${index + 1}`] = Form.createFormField({ value: value + '' })
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props)
  }
})(RouteModal)

export default WrappedForm
