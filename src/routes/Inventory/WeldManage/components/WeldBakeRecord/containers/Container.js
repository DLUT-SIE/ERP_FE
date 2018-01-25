import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldBakeRecord from '../components/WeldBakeRecord'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.weldBakeRecord
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldBakeRecord))
