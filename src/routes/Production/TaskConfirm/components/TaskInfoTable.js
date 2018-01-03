import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import './TaskInfoTable.less'
import { PROCESS_DETAIL_STATUS } from 'const'

class TaskInfoTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  handleChange = (e) => {
    console.log(111111111)
    this.setState({ remark: e.target.value })
    this.props.onChange(this.state.remark)
  }
  getRemarkInfo (status, confirmStatus, remark) {
    if (/* confirmStatus && */ status === PROCESS_DETAIL_STATUS.CONFIRMED) {
      return (
        <Input placeholder='请输入检查内容' type='text' value={this.state.remark} onChange={this.handleChange} />
      )
    } else {
      return remark
    }
  }
  render () {
    const { taskInfo } = this.props
    return (
      <table className='task-info-table'>
        <tbody>
          <tr>
            <td colSpan={2} className='work-order-uid-label'>
              工作令
            </td>
            <td colSpan={8} className='work-order-uid-value' >
              {taskInfo.work_order_uid}
            </td>
            <td colSpan={2} className='material-index-label'>
              工作票号
            </td>
            <td colSpan={2} className='material-index-value' >
              {taskInfo.material_index}
            </td>
          </tr>
          <tr>
            <td colSpan={2} className='process-id-label' >
              工序号
            </td>
            <td colSpan={3} className='process-id-value' >
              {taskInfo.process_id}
            </td>
            <td colSpan={2} className='process-name-label'>
              工序
            </td>
            <td colSpan={3} className='process-name-value' >
              {taskInfo.process_name}
            </td>
            <td colSpan={2} className='work-hour-label' >
              工时
            </td>
            <td colSpan={2} className='work-hour-value' >
              {taskInfo.work_hour}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className='estimated-start-dt-label'>
              计划开始时间
            </td>
            <td colSpan={4} className='estimated-start-dt-value'>
              {moment(taskInfo.estimated_start_dt).format('YYYY-MM-DD')}
            </td>
            <td colSpan={3} className='estimated-end-dt-label'>
              计划完成时间
            </td>
            <td colSpan={4} className='estimated-end-dt-value'>
              {moment(taskInfo.estimated_finish_dt).format('YYYY-MM-DD')}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className='work-group-label'>
              操作组
            </td>
            <td colSpan={4} className='work-group-value'>
              {taskInfo.work_group}
            </td>
            <td colSpan={3} className='actual-finish-dt-label'>
              实际完成时间
            </td>
            <td colSpan={4} className='actual-finish-dt-value'>
              {taskInfo.actual_finish_dt && moment(taskInfo.actual_finish_dt).format('YYYY-MM-DD')}
            </td>
          </tr>
          <tr className='remark-tr'>
            <td colSpan={1} className='remark-label'>
              检查内容
            </td>
            <td id='td_check_content' colSpan={13} className='remark-value'>
              {this.getRemarkInfo(taskInfo.status, taskInfo.confirm_status, taskInfo.remark)}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className='inspector-name-label'>
              检查者
            </td>
            <td colSpan={4} className='inspector-name-value'>
              {taskInfo.inspector_name}
            </td>
            <td colSpan={3} className='inspection-dt-label'>
              检查时间
            </td>
            <td colSpan={4} className='actual-finish-dt-value'>
              {taskInfo.inspection_dt && moment(taskInfo.inspection_dt).format('YYYY-MM-DD')}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

TaskInfoTable.propTypes = {
  taskInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TaskInfoTable
