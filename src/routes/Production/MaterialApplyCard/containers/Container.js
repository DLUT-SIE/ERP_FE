import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import MaterialApplyCard from '../components/MaterialApplyCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.materialApplyCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialApplyCard))
