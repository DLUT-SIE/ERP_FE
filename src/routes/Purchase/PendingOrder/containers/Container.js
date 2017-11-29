import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import PendingOrder from '../components/PendingOrder'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.pendingOrder
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingOrder))
