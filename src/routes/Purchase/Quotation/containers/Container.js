import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import Quotation from '../components/Quotation'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.quotation
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quotation))
