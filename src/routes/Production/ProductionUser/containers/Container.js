import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import ProductionUsers from '../components/ProductionUsers'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.productionUsers
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductionUsers))
