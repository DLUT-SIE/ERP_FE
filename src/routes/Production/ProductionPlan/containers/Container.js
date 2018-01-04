import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import ProductionPlan from '../components/ProductionPlan'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.productionPlan
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductionPlan))
