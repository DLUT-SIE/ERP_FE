import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Row, Col, Form, Message } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './RouteModal.less'

const FormItem = Form.Item
const { TextArea } = Input

class RouteModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  componentWillReceiveProps () {
    console.log('componentWillReceiveProps')
  }

  getFormItems = () => {
    const { number, prefix, list } = this.props
    const { getFieldDecorator } = this.props.form
    const items = []
    for (let i = 1; i <= number; i++) {
      items.push(
        <Col span={2} key={i}>
          <FormItem label={`${prefix}${i}`}>
            {getFieldDecorator(`route${i}`)(
              <CustomSelect
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
    // const labelList = _.map(list, (item) => {
    //   return item.label
    // })
    inputValue = inputValue.replace(/；/g, ';')
    const values = inputValue.split(';')
    for (let i = 0; i < values.length; i++) {
      const item = _.find(list, (item) => {
        return item.label === values[i]
      })
      if (!item) {
        Message.error('请输入正确的路线！')
        this.setState({
          inputValue: ''
        })
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
      fieldsValue[`route${index + 1}`] = value
    })
    this.props.form.setFieldsValue(fieldsValue)
  }

  handleSave = () => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('values', values)
      onOk && onOk({

      })
    })
  }

  render () {
    const { inputValue } = this.state
    const { title, visible, label, onCancel } = this.props
    return (
      <Form>
        <Modal
          className='route-modal'
          title={title}
          visible={visible}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button key='previous' className='previous-btn' onClick={this.handlePrevious}>
              上一条
            </Button>,
            <Button key='next' className='previous-btn' onClick={this.handleNext}>
              下一条
            </Button>,
            <Button key='submit' type='primary' onClick={this.handleSave}>
              保存
            </Button>,
            <Button key='back' onClick={onCancel}>
              返回
            </Button>
          ]}
        >
          <div>
            <div className='quick-edit'>
              <label htmlFor='routeInput'>{label}</label>
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
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  prefix: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

let makeFileds = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, index) => {
    result[`route${index + 1}`] = { value: value + '' }
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(RouteModal)

export default WrappedForm
