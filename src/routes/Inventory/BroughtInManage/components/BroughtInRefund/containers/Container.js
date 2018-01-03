import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import BroughtInRefund from '../components/BroughtInRefund'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.BroughtInRefund
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroughtInRefund))
