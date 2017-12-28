import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import SteelApplyCardAccount from '../components/SteelApplyCardAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.steelApplycardAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SteelApplyCardAccount))
