import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldingQuota from '../components/WeldingQuota'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.weldingQuota
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldingQuota))
