import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldHumitureRecord from '../components/WeldHumitureRecord'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.weldHumitureRecord
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldHumitureRecord))
