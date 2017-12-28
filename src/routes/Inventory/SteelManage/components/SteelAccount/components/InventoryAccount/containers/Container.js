import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import SteelInventoryAccount from '../components/InventoryAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.steelInventoryAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SteelInventoryAccount))
