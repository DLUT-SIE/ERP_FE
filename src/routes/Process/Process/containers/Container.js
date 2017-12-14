import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import Process from '../components/Process'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.process
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Process))
