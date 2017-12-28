import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { actions } from '../modules'
import MenuPanel from '../components/MenuPanel'

// const mapDispatchToProps = {
//   ...actions
// }
//
// const mapStateToProps = (state) => ({
//   status: state.pendingOrder
// })

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuPanel))
export default withRouter(connect()(MenuPanel))
