import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import WeldMaterialRefundCardTable from 'components/RefundCardTable/WeldMaterialRefundCardTable'
class WeldRefundCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refundCard: {
        id: '',
        department: '',
        create_dt: null,
        uid: '',
        sub_order_uid: '',
        apply_card_create_dt: null,
        apply_card_uid: '',
        model: '',
        specification: '',
        weight: '',
        count: '',
        refunder: null,
        keeper: null,
        status: '',
        pretty_status: '',
        actions: {}
      }
    }
  }

  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.ProductionAPI.getWeldingMaterialRefundCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ refundCard: repos })
    })
  }
  changeStatus = (type, id, actions) => {
    fetchAPI(apis.ProductionAPI.updateWeldMaterialRefundcardStatus, { status: actions }, { id }).then((repos) => {
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><WeldMaterialRefundCardTable details={this.state.refundCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

WeldRefundCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default WeldRefundCardDetail
