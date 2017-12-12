import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import ProductionSend from '../components/ProductionSend'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.productionSend
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductionSend))
