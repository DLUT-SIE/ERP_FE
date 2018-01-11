import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import PurchaseOrderManagement from '../components/PurchaseOrderManagement'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.purchaseOrderManagement
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderManagement))
