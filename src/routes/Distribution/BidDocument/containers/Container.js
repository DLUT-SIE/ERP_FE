import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import BidDocument from '../components/BidDocument'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.bidDocument
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BidDocument))
