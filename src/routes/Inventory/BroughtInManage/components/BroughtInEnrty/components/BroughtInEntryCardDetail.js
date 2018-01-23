import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import BroughtInMaterialEntryCardTable from 'components/EntryCardsTable/BroughtInMaterialEntryCardTable'
class BroughtInEntryCardDetail extends React.Component {
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
        pretty_category: ''
      }
    }
  }
  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.InventoryAPI.getBroughtInMaterialEntryCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ entryCard: repos })
    })
  }
  changeStatus = (id, actions) => {
    fetchAPI(apis.ProductionAPI.updateBroughtInMaterialEntryCardStatus, { status: actions }, { id }).then((repos) => {
      this.setState({ entryCard: repos })
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><BroughtInMaterialEntryCardTable details={this.state.entryCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

BroughtInEntryCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default BroughtInEntryCardDetail
