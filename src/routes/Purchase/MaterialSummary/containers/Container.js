import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import MaterialSummary from '../components/MaterialSummary'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.pendingOrder
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialSummary))
