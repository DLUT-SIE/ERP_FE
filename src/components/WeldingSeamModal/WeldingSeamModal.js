import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Input, Button, Row, Col, Form } from 'antd'
import { WELD_POSITION_LIST, WELD_METHOD_LIST } from 'const'

import CustomSelect from 'components/CustomSelect'
import './WeldingSeamModal.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const remarkFormItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
}
const fieldsConfig = {}

class WeldModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleSave = () => {
    const { id, onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk({
        process_material: id,
        ...values
      })
    })
  }

  render () {
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='weld-modal'
          title='焊缝信息卡'
          visible={visible}
          width={1000}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button
              key='quota'
              className='quota-btn'
            >
              定额计算
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
          <Row>
            <Col span={6}>
              <FormItem label='焊缝编号' {...formItemLayout}>
                {
                  getFieldDecorator('uid', fieldsConfig['uid'])(
                    <Input placeholder='请输入焊缝编号' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊缝形式' {...formItemLayout}>
                {
                  getFieldDecorator('seam_type', fieldsConfig['seam_type'])(
                    <CustomSelect
                      placeholder='请选择焊缝形式'
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊接位置' {...formItemLayout}>
                {
                  getFieldDecorator('weld_position', fieldsConfig['weld_position'])(
                    <CustomSelect
                      placeholder='请选择焊接位置'
                      list={WELD_POSITION_LIST}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊缝长度' {...formItemLayout}>
                {
                  getFieldDecorator('length', fieldsConfig['length'])(
                    <Input placeholder='请输入焊缝长度' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label='母材材质1' {...formItemLayout}>
                {
                  getFieldDecorator('bm_1', fieldsConfig['bm_1'])(
                    <Input placeholder='请输入母材材质1' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='母材厚度1' {...formItemLayout}>
                {
                  getFieldDecorator('bm_thick_1', fieldsConfig['bm_thick_1'])(
                    <Input placeholder='请输入母材厚度1' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊接方法1' {...formItemLayout}>
                {
                  getFieldDecorator('weld_method_1', fieldsConfig['weld_method_1'])(
                    <CustomSelect
                      placeholder='请输入焊接方法1'
                      list={WELD_METHOD_LIST}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊丝/焊条1' {...formItemLayout}>
                {
                  getFieldDecorator('wm_1', fieldsConfig['wm_1'])(
                    <CustomSelect
                      placeholder='请输入焊丝/焊条1'
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label='规格1' {...formItemLayout}>
                {
                  getFieldDecorator('ws_1', fieldsConfig['ws_1'])(
                    <Input placeholder='请输入规格1' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊材厚度1' {...formItemLayout}>
                {
                  getFieldDecorator('wt_1', fieldsConfig['wt_1'])(
                    <Input placeholder='请输入焊材厚度1' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='重量1' {...formItemLayout}>
                {
                  getFieldDecorator('weight_1', fieldsConfig['weight_1'])(
                    <Input placeholder='请输入重量1' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊剂1' {...formItemLayout}>
                {
                  getFieldDecorator('wf_1', fieldsConfig['wf_1'])(
                    <CustomSelect
                      placeholder='请输入焊剂1'
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label='焊剂1重量' {...formItemLayout}>
                {
                  getFieldDecorator('wf_weight_1', fieldsConfig['wf_weight_1'])(
                    <Input placeholder='请输入焊剂1重量' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label='母材材质2' {...formItemLayout}>
                {
                  getFieldDecorator('bm_2', fieldsConfig['bm_2'])(
                    <Input placeholder='请输入母材材质2' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='母材厚度2' {...formItemLayout}>
                {
                  getFieldDecorator('bm_thick_2', fieldsConfig['bm_thick_2'])(
                    <Input placeholder='请输入母材厚度2' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊接方法2' {...formItemLayout}>
                {
                  getFieldDecorator('weld_method_2', fieldsConfig['weld_method_2'])(
                    <CustomSelect
                      placeholder='请输入焊剂1'
                      list={WELD_METHOD_LIST}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊丝/焊条2' {...formItemLayout}>
                {
                  getFieldDecorator('wm_2', fieldsConfig['wm_2'])(
                    <CustomSelect
                      placeholder='请输入焊丝/焊条2'
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label='规格2' {...formItemLayout}>
                {
                  getFieldDecorator('ws_2', fieldsConfig['ws_2'])(
                    <Input placeholder='请输入规格2' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊材厚度2' {...formItemLayout}>
                {
                  getFieldDecorator('wt_2', fieldsConfig['wt_2'])(
                    <Input placeholder='请输入焊材厚度2' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='重量2' {...formItemLayout}>
                {
                  getFieldDecorator('weight_2', fieldsConfig['weight_2'])(
                    <Input placeholder='请输入重量2' />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊剂2' {...formItemLayout}>
                {
                  getFieldDecorator('wf_2', fieldsConfig['wf_2'])(
                    <CustomSelect
                      placeholder='请输入焊剂2'
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label='焊剂2重量' {...formItemLayout}>
                {
                  getFieldDecorator('wf_weight_2', fieldsConfig['wf_weight_2'])(
                    <Input placeholder='请输入焊剂2重量' />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label='备注' {...remarkFormItemLayout}>
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

WeldModal.propTypes = {
  id: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
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
})(WeldModal)

export default WrappedForm
