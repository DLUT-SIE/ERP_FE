import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import SteelBoardMaterialRefundCardTable from 'components/RefundCardTable/SteelBoardMaterialRefundCardTable'
import SteelBarMaterialRefundCardTable from 'components/RefundCardTable/SteelBarMaterialRefundCardTable'
class SteelRefundCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refundCard: {
        id: '',
        sub_order_uid: '',
        create_dt: '',
        uid: '',
        steel_type: '',
        refunder: '',
        inspector: null,
        keeper: '',
        status: '',
        pretty_status: '',
        board_details: [],
        bar_details: [],
        actions: {},
        pretty_steel_type: ''
      }
    }
  }

  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.ProductionAPI.getSteelMaterialRefundCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ refundCard: repos })
    })
  }
  changeStatus = (type, id, actions) => {
    fetchAPI(apis.ProductionAPI.updatSteelMaterialRefundcardStatus, { status: actions }, { id }).then((repos) => {
      message.success('修改成功！')
    })
  }
  getTables = () => {
    if (this.state.refundCard && this.state.refundCard.steel_type === 0) {
      return (
        <div><SteelBoardMaterialRefundCardTable details={this.state.refundCard} changeStatus={this.changeStatus} /></div>
      )
    } else if (this.state.refundCard && this.state.refundCard.steel_type === 1) {
      return (
        <div><SteelBarMaterialRefundCardTable details={this.state.refundCard} changeStatus={this.changeStatus} /></div>
      )
    } else {
      return null
    }
  }
  render () {
    return this.getTables()
  }
}

SteelRefundCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default SteelRefundCardDetail
