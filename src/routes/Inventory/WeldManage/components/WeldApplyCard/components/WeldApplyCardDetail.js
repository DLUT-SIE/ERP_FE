import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import WeldMaterialApplyCardTable from 'components/ApplyCardsTable/WeldMaterialApplyCardTable'
class WeldApplyCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      applyCard: {
        department: '',
        create_dt: null,
        uid: '',
        sub_order_uid: '',
        welding_seam_uid: '',
        material_mark: '',
        model: '',
        specification: '',
        apply_weight: '',
        apply_count: '',
        material_code: '',
        actual_weight: '',
        actual_count: ''
      }
    }
  }

  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.InventoryAPI.getWeldingMaterialApplyCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ applyCard: repos })
    })
  }
  changeStatus = (id, actions) => {
    fetchAPI(apis.ProductionAPI.updateWeldingMaterialApplyCardsStatus, { status: actions }, { id }).then((repos) => {
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><WeldMaterialApplyCardTable details={this.state.applyCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

WeldApplyCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default WeldApplyCardDetail
