import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import SupplierDocument from '../components/SupplierDocument'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.supplierDocument
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierDocument))
