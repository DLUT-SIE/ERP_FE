import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import ProcessTrack from '../components/ProcessTrack'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.processTrack
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessTrack))
