import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AccountSearch from '../components/AccountSearch'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.accountSearch
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountSearch))
