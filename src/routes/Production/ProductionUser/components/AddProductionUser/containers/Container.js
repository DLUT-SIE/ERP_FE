import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AddProductionUser from '../components/AddProductionUser'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.addProductionUser
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProductionUser))
