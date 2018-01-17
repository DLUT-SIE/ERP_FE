import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import './AccountSearchTable.less'

class AccountSearchTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  getProcessRoute = (processRoute) => {
    if (processRoute.length !== 12) {
      processRoute.length = 12
    }
    processRoute = [...processRoute]
    let processList = processRoute.map((item, i) => {
      return (
        <td className='td-middle process1' key={i}>{processRoute[i] && processRoute[i].step}</td>
      )
    })
    return processList
  }
  getProcessHours = (processRoute) => {
    if (processRoute.length !== 12) {
      processRoute.length = 12
    }
    processRoute = [...processRoute]
    let processList = processRoute.map((item, i) => {
      return (
        <td className='td-middle process1' key={i}>{processRoute[i] && processRoute[i].man_hours}</td>
      )
    })
    return processList
  }
  getProcessInspectors = (inspectors) => {
    if (inspectors.length !== 12) {
      inspectors.length = 12
    }
    inspectors = [...inspectors]
    let processList = inspectors.map((item, i) => {
      return (
        <td className='td-middle process1' key={i}>{inspectors[i] === undefined ? '' : inspectors[i]}</td>
      )
    })
    return processList
  }
  render () {
    const { ledgerInfo } = this.props
    return (
      <table className='ledger-info-table'>
        <tbody>
          <tr className='tr-title'>
            <td className='title-1'colSpan={10} >
               焊接零件工作票
            </td>
            <td colSpan={3} className='title-2'>
               工作票号：
            </td>
            <td colSpan={2} className='title-2-value'>
              {ledgerInfo.process_material.ticket_number}
            </td>
          </tr>
          <tr className='tr-title-normal' >
            <td colSpan={2} className='td-left work-order-label'>
              工作令
            </td>
            <td colSpan={9} className='td-middle work-order-value'>
              {ledgerInfo.sub_order}
            </td>
            <td colSpan={2} className='td-middle pass-number-label'>
              传递编号
            </td>
            <td colSpan={2} className='td-middle pass-number-value' />
          </tr>
          <tr className='tr-title-normal' >
            <td colSpan={2} className='td-left parent-drawing-number-label'>
              部件图号
            </td>
            <td colSpan={5} className='td-middle work-order-value'>
              {ledgerInfo.process_material.parent_drawing_number}
            </td>
            <td colSpan={3} className='td-middle circulation-route-label'>
              传递路线
            </td>
            <td colSpan={5} className='td-middle circulation-route-value'>
              {ledgerInfo.circulation_route.circulation_routes}
            </td>
          </tr>
          <tr className='tr-title-normal'>
            <td colSpan={3} className='td-left drawing-number'>
              图号
            </td>
            <td className='td-middle part-number'>
              件号
            </td>
            <td colSpan={2} className='td-middle steel-number'>
              钢号
            </td>
            <td colSpan={3} className='td-middle material-spec'>
              材料规格
            </td>
            <td colSpan={2} className='td-middle count'>
              数量
            </td>
            <td colSpan={4} className='td-middle route'>
              路线
            </td>
          </tr>
          <tr className='tr-title-normal'>
            <td colSpan={3} className='td-left drawing-number'>
              {ledgerInfo.process_material.drawing_number}
            </td>
            <td className='td-middle part-number'>
              {ledgerInfo.process_material.part_number}
            </td>
            <td colSpan={2} className='td-middle steel-number' />
            <td colSpan={3} className='td-middle material-spec'>
              {ledgerInfo.process_material.spec}
            </td>
            <td colSpan={2} className='td-middle count'>
              {ledgerInfo.process_material.count}
            </td>
            <td colSpan={4} className='td-middle route' />
          </tr>
          <tr className='tr-title-normal'>
            <td colSpan={15} className='td-left col-span' />
          </tr>
          <tr className='tr-title-normal'>
            <td colSpan={2} className='td-left material-mark'>
              材质标记
            </td>
            <td colSpan={2} className='td-middle keeper'>
              保管员
            </td>
            <td colSpan={2} className='td-middle date1'>
              日期
            </td>
            <td colSpan={2} className='td-middle operator'>
              操作者
            </td>
            <td colSpan={2} className='td-middle date2'>
              日期
            </td>
            <td colSpan={2} className='td-middle inspector ' >
              检查者
            </td>
            <td colSpan={2} className='td-middle date3' >
              日期
            </td>
            <td className='td-middle blank' />
          </tr>
          <tr className='tr-title-normal'>
            <td colSpan={2} className='td-left material-mark' />
            <td colSpan={2} className='td-middle keeper' />
            <td colSpan={2} className='td-middle date1' />
            <td colSpan={2} className='td-middle operator' />
            <td colSpan={2} className='td-middle date2' />
            <td colSpan={2} className='td-middle inspector ' />
            <td colSpan={2} className='td-middle date3' />
            <td className='td-middle blank' />
          </tr>
          <tr className='tr-title-normal'>
            <td colSpan={2} className='td-left material-mark' />
            <td colSpan={2} className='td-middle keeper' />
            <td colSpan={2} className='td-middle date1' />
            <td colSpan={2} className='td-middle operator' />
            <td colSpan={2} className='td-middle date2' />
            <td colSpan={2} className='td-middle inspector ' />
            <td colSpan={2} className='td-middle date3' />
            <td className='td-middle blank' />
          </tr>
          <tr className='tr-title-normal'>
            <td colSpan={15} className='td-left col-span' />
          </tr>
          <tr className='tr-title-normal'>
            <td rowSpan={2} className='td-left process-title'>
              工序
            </td>
            <td className='td-middle process1'>1</td>
            <td className='td-middle process2'>2</td>
            <td className='td-middle process3'>3</td>
            <td className='td-middle process2'>4</td>
            <td className='td-middle process2'>5</td>
            <td className='td-middle process2'>6</td>
            <td className='td-middle process2'>7</td>
            <td className='td-middle process2'>8</td>
            <td className='td-middle process2'>9</td>
            <td className='td-middle process3'>10</td>
            <td className='td-middle process3'>11</td>
            <td className='td-middle process3'>12</td>
            <td className='td-middle process4'>单重量（kg）</td>
            <td className='td-middle blank' />
          </tr>
          <tr className='tr-title-normal'>
            {this.getProcessRoute(ledgerInfo.process_route)}
            <td className='td-middle process4' />
            <td className='td-middle blank' />
          </tr>
          <tr className='tr-title-normal'>
            <td className='td-left process-title'>
              工时
            </td>
            {this.getProcessHours(ledgerInfo.process_route)}
            <td className='td-middle process4'>计划日期</td>
            <td className='td-middle blank' />
          </tr>
          <tr className='tr-title-normal'>
            <td className='td-left process-title'>
              检查
            </td>
            {this.getProcessInspectors(ledgerInfo.inspectors)}
            <td className='td-middle process4'>{ledgerInfo.estimated_finish_dt && moment(ledgerInfo.estimated_finish_dt).format('YYYY-MM-DD')}</td>
            <td className='td-middle blank' />
          </tr>
          <tr className='tr-title-normal'>
            <td className='td-left process-title'>备注</td>
            <td colSpan={14} className='td-middle'>{ledgerInfo.process_material.remark}</td>
          </tr>
          <tr className='tr-remark'>
            <td colSpan={15} className='td-remark'>
              <p>
                <span>说明：1&nbsp;在第一道工序（下料或数控）前，请做好标记检验与移植工作；</span>
                <br />
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;检验员对零件在本车间制造全过程材质的正确性负责，并签字；</span>
                <br />
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;零件完成入库，该卡片随图纸一同转质控中心存档；</span>
                <br />
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;同时执行公司TYHI/R.QMP7.13&#60;生产过程控制程序&#62;.TYHI/R.QMP7.13&#60;产品标识控制程序&#62;</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

AccountSearchTable.propTypes = {
  ledgerInfo: PropTypes.object.isRequired
}

export default AccountSearchTable
