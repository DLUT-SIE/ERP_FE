import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AddWeldApplyCard from '../components/AddApplyCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.addWeldApplyCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddWeldApplyCard))
