import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import BroughtInApplyCard from '../components/BroughtInApplyCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.broughtInApplyCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroughtInApplyCard))
