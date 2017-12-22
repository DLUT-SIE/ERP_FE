import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldRefund from '../components/WeldRefund'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.weldRefund
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldRefund))
