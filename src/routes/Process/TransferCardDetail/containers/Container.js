import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import TransferCardDetail from '../components/TransferCardDetail'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.transferCardDetail
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferCardDetail))
