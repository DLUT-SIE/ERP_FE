/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Button, Form } from 'antd'
import './MaterialRefundCardModal.less'
import WeldMaterialRefundCardTable from 'components/RefundCardTable/WeldMaterialRefundCardTable'
import SteelBoardMaterialRefundCardTable from 'components/RefundCardTable/SteelBoardMaterialRefundCardTable'
import SteelBarMaterialRefundCardTable from 'components/RefundCardTable/SteelBarMaterialRefundCardTable'
import BroughtInMaterialRefundCardTable from 'components/RefundCardTable/BroughtInMaterialRefundCardTable'
import { MATERIAL_REFUND_CARD_TYPE } from 'const'

class MaterialRefundCardModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
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
          title='退库单信息'
          visible={visible}
          width={'74%'}
          onOk={this.handleSave}
          onCancel={onCancel}
          footer={[
            <Button
              key='back'
              onClick={onCancel}
            >
              返回
            </Button>
          ]}
        >
          {this.props.category === MATERIAL_REFUND_CARD_TYPE.WELD ? (<WeldMaterialRefundCardTable details={this.props.details} changeStatus={this.changeStatus} />) : ''}
          {(this.props.category === MATERIAL_REFUND_CARD_TYPE.STEEL &&
          this.props.details.steel_type === 0) ? (<SteelBoardMaterialRefundCardTable details={this.props.details} changeStatus={this.changeStatus} />) : ''}
          {(this.props.category === MATERIAL_REFUND_CARD_TYPE.STEEL &&
          this.props.details.steel_type === 1) ? (<SteelBarMaterialRefundCardTable details={this.props.details} changeStatus={this.changeStatus} />) : ''}
          {this.props.category === MATERIAL_REFUND_CARD_TYPE.BROUGHT_IN ? (<BroughtInMaterialRefundCardTable details={this.props.details} changeStatus={this.changeStatus} />) : ''}
        </Modal>
      </Form>
    )
  }
}
MaterialRefundCardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
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
})(MaterialRefundCardModal)

export default WrappedForm
