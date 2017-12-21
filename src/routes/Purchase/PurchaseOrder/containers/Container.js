import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import PurchaseOrder from '../components/PurchaseOrder'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.purchaseOrder
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder))
