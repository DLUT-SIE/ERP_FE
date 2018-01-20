import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import AuxiliaryMaterialApplyCardTable from 'components/ApplyCardsTable/AuxiliaryMaterialApplyCardTable'
class AuxiliaryApplyCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      applyCard:  [
        {
          create_dt: '',
          actions: {},
          department: '',
          inspector: null,
          apply_inventory: '',
          sub_order_uid: '',
          auditor: null,
          keeper: null,
          actual_inventory: null,
          actual_inventory_name: '',
          actual_count: null,
          status: '',
          applicant: null,
          uid: '',
          pretty_status: '',
          apply_inventory_name: '',
          apply_count: null,
          remark: '',
          id: ''
        }
      ]
    }
  }
  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.InventoryAPI.getAuxiliaryMaterialApplyCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ applyCard: repos })
    })
  }
  changeStatus = (id, actions) => {
    fetchAPI(apis.ProductionAPI.updateAuxiliaryMaterialApplyCardsStatus, { status: actions }, { id }).then((repos) => {
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><AuxiliaryMaterialApplyCardTable details={this.state.applyCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

AuxiliaryApplyCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default AuxiliaryApplyCardDetail
