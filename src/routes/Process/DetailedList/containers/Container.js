import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import DetailedList from '../components/DetailedList'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.detailedList
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedList))
