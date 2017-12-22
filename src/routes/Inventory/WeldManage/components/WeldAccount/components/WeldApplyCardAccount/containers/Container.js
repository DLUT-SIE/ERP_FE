import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldApplyCardAccount from '../components/WeldApplyCardAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.weldApplycardAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldApplyCardAccount))
