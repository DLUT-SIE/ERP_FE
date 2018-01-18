import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import CompDepartment from '../components/CompDepartment'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.compDepartment
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompDepartment))
