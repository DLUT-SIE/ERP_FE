import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import StatusBackTrack from '../components/StatusBackTrack'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.statusBackTrack
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatusBackTrack))
