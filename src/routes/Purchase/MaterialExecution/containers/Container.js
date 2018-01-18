import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import MaterialExecution from '../components/MaterialExecution'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.materialExecution
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialExecution))
