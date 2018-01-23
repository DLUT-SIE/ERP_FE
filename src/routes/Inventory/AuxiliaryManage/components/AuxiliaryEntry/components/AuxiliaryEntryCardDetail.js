import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import AuxiliaryMaterialEntryCardTable from 'components/EntryCardsTable/AuxiliaryMaterialEntryCardTable'
class AuxiliaryEntryCardDetail extends React.Component {
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
        actions: {}
      }
    }
  }
  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.InventoryAPI.getAuxiliaryMaterialEntryCardDetail, {}, { id: id }).then((repos) => {
      this.setState({ entryCard: repos })
    })
  }
  changeStatus = (id, actions) => {
    fetchAPI(apis.ProductionAPI.updateAuxiliaryMaterialEntryCardStatus, { status: actions }, { id }).then((repos) => {
      this.setState({ entryCard: repos })
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><AuxiliaryMaterialEntryCardTable details={this.state.entryCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

AuxiliaryEntryCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default AuxiliaryEntryCardDetail
