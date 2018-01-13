import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'
import './PurchaseOrderWeldTable.less'

const getProcurementMaterialsTrs = (list) => {
  const materialTrs = _.map(list, (item, index) => {
    const { process_material: processMaterial } = item
    return (
      <tr className='material-tr' key={index}>
        <td className='name-td'>
          { processMaterial && processMaterial.name }
        </td>
        <td className='spec-td'>
          { processMaterial && processMaterial.spec }
        </td>
        <td className='material-td'>
          { processMaterial && processMaterial.material }
        </td>
        <td className='weight-td'>
          { item.total_weight }
        </td>
        <td className='delivery-dt-td'>
          { item.delivery_dt }
        </td>
        <td className='remark-td'>
          { processMaterial && processMaterial.remark }
        </td>
      </tr>
    )
  })
  return materialTrs
}

const PurchaseOrderWeldTable = (props) => {
  const { purchaseOrderInfo, list } = props
  const { status } = purchaseOrderInfo
  return (
    <div className='purchase-order-weld'>
      <p className='title-p'><b>太重天津（滨海）煤化工分公司</b></p>
      <p className='title-order-p'><b>焊 材 采 购 单</b></p>
      <table className='purchase-order-weld-table' cellSpacing={0} cellPadding={0}>
        <thead>
          <tr className='delivery-tr'>
            <td className='delivery-td' colSpan={3}>
              采购技术条件号/修订号
            </td>
            <td className='delivery-value-td' colSpan={4}>
              { purchaseOrderInfo.revised_number }
            </td>
            <td className='number-td' colSpan={3}>
              采购单编号
            </td>
            <td className='number-value-td' colSpan={3}>
              { purchaseOrderInfo.uid }
            </td>
          </tr>
          <tr className='work-order-tr'>
            <td className='work-order-td' colSpan={3}>
              工作令号：
            </td>
            <td className='work-order-value-td' colSpan={4}>
              {purchaseOrderInfo.work_order}
            </td>
            <td className='list-dt-td' colSpan={3}>
              编制日期：
            </td>
            <td className='list-dt-value-td' colSpan={3}>
              {purchaseOrderInfo.list_dt}
            </td>
          </tr>
          <tr className='purchase-order-info-tr'>
            <td className='name-td' colSpan={3}>
              <b>名称</b>
            </td>
            <td className='spec-td' colSpan={2}>
              <b>规格</b>
            </td>
            <td className='material-td' colSpan={2}>
              <b>牌号</b>
            </td>
            <td className='weight-td' colSpan={2}>
              <b>采购重量(Kg)</b>
            </td>
            <td className='delivery-dt-td' colSpan={2}>
              <b>交货期</b>
            </td>
            <td className='remark-td' colSpan={2}>
              <b>备注</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {
            getProcurementMaterialsTrs(list)
          }
          <tr className='writer-tr'>
            <td className='writer-td' colSpan={3}>
              编制：
            </td>
            <td className='writer-value-td' colSpan={2}>
              { purchaseOrderInfo.lister }
            </td>
            <td className='review-td' colSpan={2}>
              审核：
            </td>
            <td className='review-value-td' colSpan={2}>
              { status < 2
                ? <Button
                  type='primary'
                  size='small'
                >
                  审核
                </Button>
                : purchaseOrderInfo.chief
              }
            </td>
            <td className='approve-td' colSpan={2}>
              批准：
            </td>
            <td className='approve-value-td' colSpan={2}>
              { status < 3
                ? <Button
                  type='primary'
                  size='small'
                >
                  批准
                </Button>
                : purchaseOrderInfo.approver
              }
            </td>
          </tr>
        </tbody>
      </table>
      <p className='tech-requirement'>
        技术要求：{purchaseOrderInfo.tech_requirement}
      </p>
    </div>
  )
}

PurchaseOrderWeldTable.propTypes = {
  purchaseOrderInfo: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
}

export default PurchaseOrderWeldTable
