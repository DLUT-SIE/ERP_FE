import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import DepartmentSend from '../components/DepartmentSend'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.departmentSend
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DepartmentSend))
