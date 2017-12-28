import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AuxiliaryInventoryAccount from '../components/InventoryAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.auxiliaryInventoryAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuxiliaryInventoryAccount))
