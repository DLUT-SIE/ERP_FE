import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import TaskConfirm from '../components/TaskConfirm'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.taskConfirm
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskConfirm))
