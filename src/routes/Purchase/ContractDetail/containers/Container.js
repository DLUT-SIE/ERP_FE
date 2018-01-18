import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import ContractDetail from '../components/ContractDetail'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.contractDetail
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractDetail))
