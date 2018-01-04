import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import TaskAllocation from '../components/TaskAllocation'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.taskAllocation
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskAllocation))
