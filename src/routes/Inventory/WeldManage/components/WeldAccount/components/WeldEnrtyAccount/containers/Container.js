import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldEntryAccount from '../components/WeldEntryAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.weldEntryAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldEntryAccount))
