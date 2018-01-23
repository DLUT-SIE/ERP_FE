import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import WeldMaterialEntryCardTable from 'components/EntryCardsTable/WeldMaterialEntryCardTable'
class WeldEntryCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      entryCard: {
        keeper: null,
        id: 8,
        inspector: null,
        bidding_sheet: '',
        details: [],
        source: '',
        create_dt: '',
        pretty_status: '',
        purchaser: null,
        actions: {},
        uid: '',
        status: ''
      }
    }
  }
  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.InventoryAPI.getWeldingMaterialEntryCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ entryCard: repos })
    })
  }
  changeStatus = (id, actions) => {
    fetchAPI(apis.ProductionAPI.updateWeldingMaterialEntryCardStatus, { status: actions }, { id }).then((repos) => {
      this.setState({ entryCard: repos })
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><WeldMaterialEntryCardTable details={this.state.entryCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

WeldEntryCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default WeldEntryCardDetail
