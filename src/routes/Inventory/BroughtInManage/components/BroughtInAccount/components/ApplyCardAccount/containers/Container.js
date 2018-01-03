import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import BroughtInApplycardAccount from '../components/BroughtInApplyCardAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.broughtInApplycardAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroughtInApplycardAccount))
