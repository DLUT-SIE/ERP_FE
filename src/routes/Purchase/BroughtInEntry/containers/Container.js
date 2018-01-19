import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import BroughtInEntry from '../components/BroughtInEntry'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.broughtInEntry
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroughtInEntry))
