import React from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
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
const fieldsConfig = {
  seam_type: {
    rules: [{ required: true, message: '请输入焊缝类型！' }]
  },
  weld_position: {
    rules: [{ required: true, message: '请选择焊接位置！' }]
  },
  length: {
    rules: [{
      required: true, message: '请输入焊缝长度！'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入整数或小数！'
    }]
  },
  bm_thick_1: {
    rules: [{
      required: true, message: '请输入母材厚度1！'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入整数或小数！'
    }]
  },
  weight_1: {
    rules: [{
      required: true, message: '请输入焊材重量1！'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入整数或小数！'
    }]
  },
  wf_weight_1: {
    rules: [{
      required: true, message: '请输入焊剂重量1！'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入整数或小数！'
    }]
  },
  bm_thick_2: {
    rules: [{
      required: true, message: '请输入母材厚度2！'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入整数或小数！'
    }]
  },
  weight_2: {
    rules: [{
      required: true, message: '请输入焊材重量1！'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入整数或小数！'
    }]
  },
  wf_weight_2: {
    rules: [{
      required: true, message: '请输入焊剂重量1！'
    }, {
      pattern: /^(\d+)(\.\d+)?$/, message: '请输入整数或小数！'
    }]
  }
}

class WeldingSeamModal extends React.Component {
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
      const params = {
        uid: values.uid || '',
        seam_type: values.seam_type || '',
        length: values.length || 0,
        bm_1: values.bm_1 || '',
        bm_thick_1: values.bm_thick_1 || 0,
        ws_1: values.ws_1 || '',
        wt_1: values.wt_1 || '',
        weight_1: values.weight_1 || '',
        wf_weight_1: values.wf_weight_1 || '',
        bm_2: values.bm_2 || '',
        bm_thick_2: values.bm_thick_2 || 0,
        ws_2: values.ws_2 || '',
        wt_2: values.wt_2 || '',
        weight_2: values.weight_2 || '',
        wf_weight_2: values.wf_weight_2 || ''
      }
      if (values.weld_position) {
        params.weld_position = +values.weld_position
      }
      if (values.weld_method_1) {
        params.weld_method_1 = +values.weld_method_1
      }
      if (values.weld_method_2) {
        params.weld_position = +values.weld_method_2
      }
      if (values.wm_1) {
        params.wm_1 = +values.wm_1
      }
      if (values.wm_2) {
        params.wm_2 = +values.wm_2
      }
      if (values.wf_1) {
        params.wf_1 = +values.wf_1
      }
      if (values.wf_2) {
        params.wf_2 = +values.wf_2
      }
      onOk && onOk(fieldsValue.id, params)
    })
  }

  render () {
    const { visible, onCancel, form, weldingMaterials, fluxMaterials, fieldsValue, onChange } = this.props
    const { getFieldDecorator } = form
    const { id } = fieldsValue
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
              style={{ display: id ? 'block' : 'none' }}
              key='previous'
              className='change-btn'
              data-type='previous'
              onClick={onChange}
            >
              上一条
            </Button>,
            <Button
              style={{ display: id ? 'block' : 'none' }}
              key='next'
              className='change-btn'
              data-type='next'
              onClick={onChange}
            >
              下一条
            </Button>,
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
              <FormItem label='焊缝类型' {...formItemLayout}>
                {
                  getFieldDecorator('seam_type', fieldsConfig['seam_type'])(
                    <Input placeholder='请输入焊缝类型' />
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
                      placeholder='请选择焊接方法1'
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
                      placeholder='请选择焊丝/焊条1'
                      list={weldingMaterials}
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
                      list={fluxMaterials}
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label='焊剂重量1' {...formItemLayout}>
                {
                  getFieldDecorator('wf_weight_1', fieldsConfig['wf_weight_1'])(
                    <Input placeholder='请输入焊剂重量1' />
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
                      placeholder='请选择焊接方法2'
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
                      list={weldingMaterials}
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
                      placeholder='请选择焊剂2'
                      list={fluxMaterials}
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label='焊剂重量2' {...formItemLayout}>
                {
                  getFieldDecorator('wf_weight_2', fieldsConfig['wf_weight_2'])(
                    <Input placeholder='请输入焊剂重量2' />
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

WeldingSeamModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fieldsValue: PropTypes.object.isRequired,
  weldingMaterials: PropTypes.array.isRequired,
  fluxMaterials: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  form: PropTypes.object.isRequired
}

let makeFileds = function (fieldsValue) {
  let result = {}
  for (let key in fieldsValue) {
    result[key] = { value: fieldsValue[key] + '' }
  }
  // _.forEach(fieldsValue, (value, key) => {
  //   result[key] = { value: value + '' }
  // })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(WeldingSeamModal)

export default WrappedForm
