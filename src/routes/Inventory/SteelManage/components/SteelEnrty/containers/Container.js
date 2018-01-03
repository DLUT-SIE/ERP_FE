import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import SteelEntry from '../components/SteelEntry'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.steelEntry
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SteelEntry))
