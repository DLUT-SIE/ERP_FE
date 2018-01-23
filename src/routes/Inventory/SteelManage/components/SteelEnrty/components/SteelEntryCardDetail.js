import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import SteelMaterialEntryCardTable from 'components/EntryCardsTable/SteelMaterialEntryCardTable'
class SteelEntryCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      entryCard: {
        id: '',
        uid: '',
        bidding_sheet: '',
        source: '',
        create_dt: '',
        purchaser: null,
        inspector: null,
        keeper: null,
        status: '',
        pretty_status: '',
        details: [],
        actions: {},
        steel_type: '',
        pretty_steel_type: ''
      }
    }
  }
  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.InventoryAPI.getSteelMaterialEntryCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ entryCard: repos })
    })
  }
  changeStatus = (id, actions) => {
    fetchAPI(apis.ProductionAPI.updateSteelMaterialEntryCardStatus, { status: actions }, { id }).then((repos) => {
      this.setState({ entryCard: repos })
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><SteelMaterialEntryCardTable details={this.state.entryCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

SteelEntryCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default SteelEntryCardDetail
