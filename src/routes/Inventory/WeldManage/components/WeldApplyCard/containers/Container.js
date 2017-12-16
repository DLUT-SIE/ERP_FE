import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldApplyCard from '../components/WeldApplyCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.weldApplyCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldApplyCard))
