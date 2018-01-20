import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import MaterialExecutionDetail from '../components/MaterialExecutionDetail'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.materialExecutionDetail
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialExecutionDetail))
