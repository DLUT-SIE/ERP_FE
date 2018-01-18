import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AddProductionPlan from '../components/AddProductionPlan'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.addProductionPlan
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProductionPlan))
