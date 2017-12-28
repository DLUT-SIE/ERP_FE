import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AuxiliaryEntryAccount from '../components/AuxiliaryEntryAccount'

const mapDispatchToProps = {
  ...actions
}
const mapStateToProps = (state) => ({
  status: state.auxiliaryEntryAccount
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuxiliaryEntryAccount))
