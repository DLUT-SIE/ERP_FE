/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Button, Form } from 'antd'
import './MaterialRefundCardModal.less'
import WeldMaterialApplyCardTable from './WeldMaterialRefundCardTable'
/* import SteelMaterialApplyCardTable from './WeldMaterialApplyCardTable'
import BroughtInMaterialApplyCardTable from './WeldMaterialApplyCardTable'
import AuxiliaryMaterialApplyCardTable from './WeldMaterialApplyCardTable' */
import { MATERIAL_APPLY_CARD_TYPE } from 'const'

class MaterialApplyCardModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  // todo: 确认按钮有什么作用？
  handleSave = () => {
    const { onOk, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onOk && onOk({
        ...values,
        count: +values.count
      })
    })
  }
  changeStatus = () => {
    console.log(1)
  }
  render () {
    const { visible, onCancel } = this.props
    return (
      <Form>
        <Modal
          className='production-user-modal'
          title='领用单信息'
          visible={visible}
          width={900}
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
        >{/* 这里根据category来显示不同的table */}
          {this.props.category === MATERIAL_APPLY_CARD_TYPE.WELD ? (<WeldMaterialApplyCardTable details={this.props.details} changeStatus={this.changeStatus} />) : ''}
          {/* {this.props.category === MATERIAL_APPLY_CARD_TYPE.STEEL ? (<SteelMaterialApplyCardTable details={this.props.details} changeStatus={this.changeStatus} />) : ''}
          {this.props.category === MATERIAL_APPLY_CARD_TYPE.BROUGHT_IN ? (<BroughtInMaterialApplyCardTable details={this.props.details} changeStatus={this.changeStatus} />) : ''}
          {this.props.category === MATERIAL_APPLY_CARD_TYPE.AUXILIARY ? (<AuxiliaryMaterialApplyCardTable details={this.props.details} changeStatus={this.changeStatus} />) : ''} */}
        </Modal>
      </Form>
    )
  }
}
MaterialApplyCardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired
}
let makeFileds = function (fieldsValue) {
  let result = {}
  _.forEach(fieldsValue, (value, key) => {
    result[key] = Form.createFormField({ value })
  })
  return result
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFileds(props.fieldsValue)
  }
})(MaterialApplyCardModal)

export default WrappedForm
