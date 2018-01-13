import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AddRefundCard from '../components/AddRefundCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.addRefundCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddRefundCard))
