import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import SteelEntryAccount from '../components/SteelEntryAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.steelEntryAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SteelEntryAccount))
