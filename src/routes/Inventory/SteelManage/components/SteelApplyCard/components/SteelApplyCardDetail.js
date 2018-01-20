import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import SteelMaterialApplyCardTable from 'components/ApplyCardsTable/SteelMaterialApplyCardTable'
class SteelApplyCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      applyCard: {
        id: '',
        department: '',
        create_dt: null,
        uid: null,
        applicant: null,
        auditor: null,
        inspector: null,
        keeper: null,
        details: [
          {
            id: '',
            create_dt: null,
            uid: '',
            applicant: '',
            department: '',
            status: '',
            pretty_status: ''
          }
        ],
        status: 4,
        actions: {}
      }
    }
  }
  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.InventoryAPI.getSteelMaterialApplyCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ applyCard: repos })
    })
  }
  changeStatus = (id, actions) => {
    fetchAPI(apis.ProductionAPI.updateSteelMaterialApplyCardsStatus, { status: actions }, { id }).then((repos) => {
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><SteelMaterialApplyCardTable details={this.state.applyCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

SteelApplyCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default SteelApplyCardDetail
