import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import SteelApplyCard from '../components/SteelApplyCard'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.steelApplyCard
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SteelApplyCard))
