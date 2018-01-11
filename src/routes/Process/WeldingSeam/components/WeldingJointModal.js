import React from 'react'
import PropTypes from 'prop-types'
import { makeFields } from 'utils'
import _ from 'lodash'
import { PROC_QUAL_INDEX_LIST } from 'const'
import { Modal, Input, Row, Col, Form } from 'antd'

import CustomSelect from 'components/CustomSelect'
import './WeldingJointModal.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
}
const formItemLayoutWeldCert = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 }
}

const fieldsConfig = {
  proc_qual_index: {
    rules: [{ required: true, message: '请选择焊接工艺评定编号！' }]
  },
  weld_cert_1: {
    rules: [{ required: true, message: '请选择焊工持证项目1，可多选！' }]
  },
  weld_cert_2: {
    rules: [{ required: true, message: '请选择焊工持证项目2，可多选！' }]
  }
}

class WeldingJointModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleSave = () => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const params = {
        joint_index: values.joint_index,
        remark: values.remark || '',
        weld_cert_1: values.weld_cert_1,
        weld_cert_2: values.weld_cert_2
      }
      if (!_.isUndefined(values.proc_qual_index)) {
        params.proc_qual_index = +values.proc_qual_index
      }
      if (!_.isUndefined(values.weld_cert_1)) {
        params.weld_cert_1 = _.map(values.weld_cert_1, (item) => (+item))
      }
      if (!_.isUndefined(values.weld_cert_2)) {
        params.weld_cert_2 = _.map(values.weld_cert_2, (item) => (+item))
      }
      onOk && onOk(params)
    })
  }

  render () {
    const { visible, onCancel, form, weldCertifiList } = this.props
    const { getFieldDecorator } = form
    return (
      <Form>
        <Modal
          className='welding-joint-modal'
          title='焊接接头工艺'
          visible={visible}
          width={1300}
          onOk={this.handleSave}
          onCancel={onCancel}
        >
          <Row>
            <Col span={6}>
              <FormItem label='母材材质1' {...formItemLayout}>
                {
                  getFieldDecorator('bm_1', fieldsConfig['bm_1'])(
                    <Input disabled />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='母材厚度1' {...formItemLayout}>
                {
                  getFieldDecorator('bm_thick_1', fieldsConfig['bm_thick_1'])(
                    <Input disabled />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='母材材质2' {...formItemLayout}>
                {
                  getFieldDecorator('bm_2', fieldsConfig['bm_2'])(
                    <Input disabled />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='母材厚度2' {...formItemLayout}>
                {
                  getFieldDecorator('bm_thick_2', fieldsConfig['bm_thick_2'])(
                    <Input disabled />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label='焊接工艺评定编号' {...formItemLayout}>
                {
                  getFieldDecorator('proc_qual_index', fieldsConfig['proc_qual_index'])(
                    <CustomSelect
                      placeholder='请选择焊接工艺评定编号'
                      list={PROC_QUAL_INDEX_LIST}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊接位置' {...formItemLayout}>
                {
                  getFieldDecorator('weld_position', fieldsConfig['weld_position'])(
                    <Input disabled />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='编号' {...formItemLayout}>
                {
                  getFieldDecorator('joint_index', fieldsConfig['joint_index'])(
                    <Input disabled />
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
          <Row>
            <Col span={6}>
              <FormItem label='焊接方法1' {...formItemLayout}>
                {
                  getFieldDecorator('weld_method_1', fieldsConfig['weld_method_1'])(
                    <Input disabled />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label='焊接方法2' {...formItemLayout}>
                {
                  getFieldDecorator('weld_method_2', fieldsConfig['weld_method_2'])(
                    <Input disabled />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='焊工持证项目1' {...formItemLayoutWeldCert}>
                {
                  getFieldDecorator('weld_cert_1', fieldsConfig['weld_cert_1'])(
                    <CustomSelect
                      mode='multiple'
                      placeholder='请选择焊工持证项目1'
                      list={weldCertifiList}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='焊工持证项目2' {...formItemLayoutWeldCert}>
                {
                  getFieldDecorator('weld_cert_2', fieldsConfig['weld_cert_2'])(
                    <CustomSelect
                      mode='multiple'
                      placeholder='请选择焊工持证项目2'
                      list={weldCertifiList}
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

WeldingJointModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  weldCertifiList: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(WeldingJointModal)

export default WrappedForm
