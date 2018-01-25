import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import SupplierSelect from '../components/SupplierSelect'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.supplierSelect
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierSelect))
