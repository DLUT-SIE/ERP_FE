import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import BroughtInMaterialApplyCardTable from 'components/ApplyCardsTable/BroughtInMaterialApplyCardTable'
class BroughtInApplyCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      applyCard:  {
        id: '',
        revised_number: '',
        sample_report: '',
        sub_order_uid: '',
        department: '',
        create_dt: '',
        uid: '',
        applicant: '',
        auditor: '',
        inspector: '',
        keeper: '',
        status: '',
        pretty_status: '',
        details: [],
        actions: {}
      }
    }
  }
  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.InventoryAPI.getBroughtInMaterialApplyCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ applyCard: repos })
    })
  }
  changeStatus = (id, actions) => {
    fetchAPI(apis.ProductionAPI.updateBroughtInMaterialApplyCardsStatus, { status: actions }, { id }).then((repos) => {
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><BroughtInMaterialApplyCardTable details={this.state.applyCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

BroughtInApplyCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default BroughtInApplyCardDetail
