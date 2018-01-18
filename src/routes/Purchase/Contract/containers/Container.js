import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import Contract from '../components/Contract'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.contract
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contract))
