import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AuxiliaryApplycardAccount from '../components/AuxiliaryApplyCardAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.auxiliaryApplycardAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuxiliaryApplycardAccount))
