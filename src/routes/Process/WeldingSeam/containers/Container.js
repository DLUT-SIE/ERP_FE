import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WeldingSeam from '../components/WeldingSeam'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.weldingSeam
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeldingSeam))
