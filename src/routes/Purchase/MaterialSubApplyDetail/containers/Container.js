import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import MaterialSubApplyDetail from '../components/MaterialSubApplyDetail'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.materialSubApplyDetail
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialSubApplyDetail))
