import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import BroughtInInventoryAccount from '../components/InventoryAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.broughtInInventoryAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroughtInInventoryAccount))
