import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import TaskPlanDate from '../components/TaskPlanDate'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.taskPlanDate
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskPlanDate))
