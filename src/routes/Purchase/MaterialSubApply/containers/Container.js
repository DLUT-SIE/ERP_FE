import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import MaterialSubApply from '../components/MaterialSubApply'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.materialSubApply
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialSubApply))
