import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import CallForBid from '../components/CallForBid'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.callForBid
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CallForBid))
