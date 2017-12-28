import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from '../modules'
import WarehouseManage from '../components/WarehouseManage'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  status: state.warehouseManage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WarehouseManage))
