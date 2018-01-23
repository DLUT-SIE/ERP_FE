import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import DetailTable from '../components/DetailTable'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.detailTable
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailTable))
