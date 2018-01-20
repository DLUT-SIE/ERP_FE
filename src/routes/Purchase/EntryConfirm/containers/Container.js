import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import EntryConfirm from '../components/EntryConfirm'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.entryConfirm
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryConfirm))
