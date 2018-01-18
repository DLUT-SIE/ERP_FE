import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import Supplier from '../components/Supplier'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.supplier
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Supplier))
