import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import StatusHistory from '../components/StatusHistory'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.statusHistory
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatusHistory))
