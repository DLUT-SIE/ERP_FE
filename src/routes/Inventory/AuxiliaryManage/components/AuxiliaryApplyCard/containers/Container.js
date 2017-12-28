import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import AuxiliaryApplyCard from '../components/AuxiliaryApplyCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.auxiliaryApplyCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuxiliaryApplyCard))
