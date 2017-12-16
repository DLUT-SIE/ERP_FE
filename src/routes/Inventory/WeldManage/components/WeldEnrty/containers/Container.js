import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldEntry from '../components/WeldEntry'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.weldEntry
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldEntry))
