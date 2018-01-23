import React from 'react'
import fetchAPI from 'api'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { apis } from 'api/config'
import BroughtInMaterialRefundCardTable from 'components/RefundCardTable/BroughtInMaterialRefundCardTable'
class BroughtInRefundCardDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refundCard: {
        id: '',
        sub_order_uid: '',
        department: '',
        uid: '',
        refunder: '',
        keeper: '',
        status: '',
        pretty_status: '',
        details:[],
        actions: {}
      }
    }
  }

  componentWillMount () {
    const id = this.props.match.params.id
    this.setState({ id: id })
    fetchAPI(apis.ProductionAPI.getBroughtInMaterialRefundCardDetails, {}, { id: id }).then((repos) => {
      this.setState({ refundCard: repos })
    })
  }
  changeStatus = (type, id, actions) => {
    fetchAPI(apis.ProductionAPI.updateBroughtInMaterialRefundcardStatus, { status: actions }, { id }).then((repos) => {
      message.success('修改成功！')
    })
  }
  render () {
    return (
      <div><BroughtInMaterialRefundCardTable details={this.state.refundCard} changeStatus={this.changeStatus} /></div>
    )
  }
}

BroughtInRefundCardDetail.propTypes = {
  match: PropTypes.object.isRequired
}
export default BroughtInRefundCardDetail
