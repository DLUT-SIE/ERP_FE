/**
 * Created by lh on 2017/12/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal, Button, Form } from 'antd'
import './MaterialApplyCardModal.less'
import WeldMaterialApplyCardTable from 'components/ApplyCardsTable/WeldMaterialApplyCardTable'
import SteelMaterialApplyCardTable from 'components/ApplyCardsTable/SteelMaterialApplyCardTable'
import BroughtInMaterialApplyCardTable from 'components/ApplyCardsTable/BroughtInMaterialApplyCardTable'
import AuxiliaryMaterialApplyCardTable from 'components/ApplyCardsTable/AuxiliaryMaterialApplyCardTable'
import { MATERIAL_APPLY_CARD_TYPE } from 'const'

class MaterialApplyCardModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { visible, onCancel } = this.props
    return (
      <Form>
        <Modal
          className='production-user-modal'
          title='领用单信息'
          visible={visible}
          width={'70%'}
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
          {this.props.category === MATERIAL_APPLY_CARD_TYPE.WELD ? (<WeldMaterialApplyCardTable details={this.props.details} changeStatus={this.props.changeStatus} />) : ''}
          {this.props.category === MATERIAL_APPLY_CARD_TYPE.STEEL ? (<SteelMaterialApplyCardTable details={this.props.details} changeStatus={this.props.changeStatus} />) : ''}
          {this.props.category === MATERIAL_APPLY_CARD_TYPE.BROUGHT_IN ? (<BroughtInMaterialApplyCardTable details={this.props.details} changeStatus={this.props.changeStatus} />) : ''}
          {this.props.category === MATERIAL_APPLY_CARD_TYPE.AUXILIARY ? (<AuxiliaryMaterialApplyCardTable details={this.props.details} changeStatus={this.props.changeStatus} />) : ''}
        </Modal>
      </Form>
    )
  }
}
MaterialApplyCardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired
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
