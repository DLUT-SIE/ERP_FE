import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AuxiliaryEntry from '../components/AuxiliaryEntry'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.auxiliaryEntry
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuxiliaryEntry))
