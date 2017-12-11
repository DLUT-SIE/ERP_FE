import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import ProcessImport from '../components/ProcessImport'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.processImport
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessImport))
