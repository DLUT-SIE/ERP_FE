import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import MaterialSub from '../components/MaterialSub'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.materialSub
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialSub))
