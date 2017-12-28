import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import SteelRefund from '../components/SteelRefund'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.steelRefund
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SteelRefund))
