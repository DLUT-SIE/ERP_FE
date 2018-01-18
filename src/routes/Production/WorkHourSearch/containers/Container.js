import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WorkHourSearch from '../components/WorkHourSearch'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.workHourSearch
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkHourSearch))
