import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import BasicDataHumitureRecord from '../components/BasicDataHumitureRecord'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.basicDatatempHumitureRecord
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicDataHumitureRecord))
