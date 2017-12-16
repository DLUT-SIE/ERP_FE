import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import PrincipalQuota from '../components/PrincipalQuota'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.principalQuota
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrincipalQuota))
