import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import BroughtInEntryAccount from '../components/BroughtInEntryAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.broughtInEntryAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroughtInEntryAccount))
