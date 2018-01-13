import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'
import './PurchaseOrderNormalTable.less'

const getProcurementMaterialsTrs = (list) => {
  const materialTrs = _.map(list, (item, index) => {
    const { process_material: processMaterial } = item
    return (
      <tr className='material-tr' key={index}>
        <td className='name-spec-td' colSpan={4}>
          { processMaterial && `${processMaterial.name} ${processMaterial.spec}` }
        </td>
        <td className='schematic-index-td' colSpan={2}>
          { processMaterial && processMaterial.drawing_number }
        </td>
        <td className='material-td' colSpan={2}>
          { processMaterial && processMaterial.material }
        </td>
        <td className='count-td'>
          { processMaterial && processMaterial.count }
        </td>
        <td className='finished-td'>
          { item.finished ? '已结束' : '未结束' }
        </td>
        <td className='delivery-dt-td' colSpan={3}>
          { item.delivery_dt }
        </td>
        <td className='remark-td' colSpan={2}>
          { processMaterial && processMaterial.remark }
        </td>
      </tr>
    )
  })
  return materialTrs
}

const PurchaseOrderNormalTable = (props) => {
  const { purchaseOrderInfo, list } = props
  const { status } = purchaseOrderInfo
  return (
    <div className='purchase-order-normal'>
      <p className='title-p'><b>太重（天津）滨海重型机械有限公司</b></p>
      <p className='title-order-p'><b>采 购 单</b></p>
      <p className='number-p'>订购单编号：{ purchaseOrderInfo.uid }</p>
      <table className='purchase-order-normal-table' cellSpacing={0} cellPadding={0}>
        <thead>
          <tr className='delivery-tr'>
            <td className='delivery-td' colSpan={4}>
              采购技术条件号/修订号
            </td>
            <td className='delivery-value-td' colSpan={11}>
              { purchaseOrderInfo.revised_number }
            </td>
          </tr>
          <tr className='purchase-order-info-tr'>
            <td className='name-spec-td' colSpan={4}>
              名称及规格
            </td>
            <td className='schematic-index-td' colSpan={2}>
              标准号
            </td>
            <td className='material-td' colSpan={2}>
              材料牌号
            </td>
            <td className='count-td'>
              数量
            </td>
            <td className='finished-td'>
              是否结束
            </td>
            <td className='delivery-dt-td' colSpan={3}>
              交货期
            </td>
            <td className='remark-td' colSpan={2} >
              备注
            </td>
          </tr>
        </thead>
        <tbody>
          {
            getProcurementMaterialsTrs(list)
          }
          <tr className='work-order-tr'>
            <td className='work-order-td' colSpan={2}>
              工作令号
            </td>
            <td className='work-order-value-td'>
              { purchaseOrderInfo.work_order }
            </td>
            <td className='writer-date-td' colSpan={2}>
              编制
              <br />
              日期
            </td>
            <td className='writer-date-value-td' colSpan={2}>
              { `${purchaseOrderInfo.lister} ${purchaseOrderInfo.list_dt}` }
            </td>
            <td className='review-date-td' colSpan={2}>
              审核
              <br />
              日期
            </td>
            <td className='review-date-value-td' colSpan={2}>
              { status < 2
                ? <Button type='primary'>审核</Button>
                : `${purchaseOrderInfo.chief} ${purchaseOrderInfo.audit_date}`
              }
            </td>
            <td className='approve-date-td' colSpan={2}>
              批准
              <br />
              日期
            </td>
            <td className='approve-date-value-td' colSpan={2}>
              { status < 3
                ? <Button type='primary'>批准</Button>
                : `${purchaseOrderInfo.approver} ${purchaseOrderInfo.approve_dt}`
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

PurchaseOrderNormalTable.propTypes = {
  purchaseOrderInfo: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
}

export default PurchaseOrderNormalTable
