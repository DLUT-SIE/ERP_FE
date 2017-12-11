import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import Production from '../components/Production'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.production
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Production))
