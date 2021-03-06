import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AddApplyCard from '../components/AddApplyCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.addApplyCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddApplyCard))
