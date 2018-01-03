import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import TransferCard from '../components/TransferCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.transferCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferCard))
