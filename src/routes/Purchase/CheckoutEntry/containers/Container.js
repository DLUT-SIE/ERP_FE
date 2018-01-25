import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import CheckoutEntry from '../components/CheckoutEntry'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.checkoutEntry
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutEntry))
