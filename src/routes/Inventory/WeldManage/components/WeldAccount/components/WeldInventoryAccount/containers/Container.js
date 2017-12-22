import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldInventoryAccount from '../components/WeldInventoryAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.weldInventoryAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldInventoryAccount))
