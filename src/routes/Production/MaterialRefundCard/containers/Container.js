import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import MaterialRefundCard from '../components/MaterialRefundCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.materialRefundCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialRefundCard))
