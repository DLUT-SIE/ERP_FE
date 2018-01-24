import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './PurchaseOrderRawTable.less'

const getProcurementMaterialsTrs = (list) => {
  const materialTrs = _.map(list, (item, index) => {
    const { process_material: processMaterial } = item
    return (
      <tr className='material-tr' key={index}>
        <td className='name-td' colSpan={3}>
          { processMaterial && processMaterial.name }
        </td>
        <td className='material-td' colSpan={3}>
          { processMaterial && processMaterial.material}
        </td>
        <td className='spec-td' colSpan={3}>
          { processMaterial && processMaterial.spec}
        </td>
        <td className='count-td' colSpan={2}>
          { processMaterial && processMaterial.count}
        </td>
        <td className='purchase-td' colSpan={3}>
          { item.total_weight}
        </td>
        <td className='finished-td' colSpan={2}>
          { item.finished ? '已结束' : '未结束' }
        </td>
        <td className='remark-td' colSpan={3}>
          { processMaterial && processMaterial.remark}
        </td>
      </tr>
    )
  })
  return materialTrs
}

const PurchaseOrderRawTable = (props) => {
  const { order, list } = props
  return (
    <div className='supplier-select-purchase-order-raw'>
      <p className='title-p'><b>太重天津（滨海）煤化工分公司</b></p>
      <p className='title-order-p'><b>订 购 单</b></p>
      <table className='purchase-order-raw-table' cellSpacing={0} cellPadding={0}>
        <thead>
          <tr className='revised-number-tr'>
            <td colSpan={5} className='revised-number-td'>
              采购技术条件号/修订号
            </td>
            <td colSpan={4} className='revised-number-value-td'>
              { order.revised_number }
            </td>
            <td colSpan={5} className='order-number-td'>
              订购单编号
            </td>
            <td colSpan={4} className='order-number-value-td'>
              { order.uid }
            </td>
          </tr>
          <tr className='info-tr'>
            <td className='name-td' colSpan={3}>
              <b>名称</b>
            </td>
            <td className='material-td' colSpan={3}>
              <b>材质</b>
            </td>
            <td className='spec-td' colSpan={3}>
              <b>规格</b>
            </td>
            <td className='count-td' colSpan={2}>
              <b>数量</b>
            </td>
            <td className='purchase-td' colSpan={3}>
              <b>采购（KG）</b>
            </td>
            <td className='finished-td' colSpan={2}>
              <b>是否结束</b>
            </td>
            <td className='remark-td' colSpan={3}>
              <b>备注</b>
            </td>
          </tr>
        </thead>
        <tbody>
          { getProcurementMaterialsTrs(list) }
          <tr className='work-order-tr'>
            <td className='work-order-td'>
              工作令号
            </td>
            <td className='work-order-value-td'>
              { order.work_order }
            </td>
            <td className='writer-td' colSpan={6}>
              编制日期: {`${order.lister} ${order.list_dt}`}
            </td>
            <td className='foreign-purchasing-td' colSpan={5}>
              外采科长：{order.chief} {order.audit_date}
              }
            </td>
            <td className='approve-td' colSpan={5}>
              批准：{order.approver} {order.approve_dt}
              }
            </td>
          </tr>
        </tbody>
      </table>
      <p className='tech-requirement'>
        技术要求：{ order.tech_requirement}
      </p>
    </div>
  )
}

PurchaseOrderRawTable.propTypes = {
  order: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
}

export default PurchaseOrderRawTable
