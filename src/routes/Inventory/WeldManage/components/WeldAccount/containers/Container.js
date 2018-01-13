import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MenuPanel from '../components/MenuPanel'

export default withRouter(connect()(MenuPanel))
