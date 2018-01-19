import React from 'react'
import { Redirect } from 'react-router-dom'
import MaterialSummary from './MaterialSummary'
import PendingOrder from './PendingOrder'
import PurchaseOrderManagement from './PurchaseOrderManagement'
import PurchaseOrder from './PurchaseOrder'
import WeldEntry from './WeldEntry'
import SteelEntry from './SteelEntry'
import EntryConfirm from './EntryConfirm'
import MaterialSubApply from './MaterialSubApply'
import MaterialSubApplyDetail from './MaterialSubApplyDetail'
import StatusBackTrack from './StatusBackTrack'
import StatusHistory from './StatusHistory'
import MaterialExecution from './MaterialExecution'
import Supplier from './Supplier'
import Quotation from './Quotation'
import SupplierDocument from './SupplierDocument'
import Contract from './Contract'
import ContractDetail from './ContractDetail'
import _ from 'lodash'

const childRoutes = [
  {
    path: 'purchase_order_management/purchase_order',
    breadcrumbName: '订购单',
    component: PurchaseOrder
  },
  {
    path: 'material',
    breadcrumbName: '物料汇总',
    component: MaterialSummary
  },
  {
    path: 'pending_order',
    breadcrumbName: '待处理工作令',
    component: PendingOrder
  },
  {
    path: 'purchase_order_management',
    breadcrumbName: '订购单管理',
    component: PurchaseOrderManagement
  },
  {
    path: 'entry_confirm/weld_entry',
    breadcrumbName: '焊材入库单',
    component: WeldEntry
  },
  {
    path: 'entry_confirm/steel_entry',
    breadcrumbName: '钢材入库单',
    component: SteelEntry
  },
  {
    path: 'entry_confirm',
    breadcrumbName: '入库确认',
    component: EntryConfirm
  },
  {
    path: 'material_sub_apply/material_sub_apply_detail',
    breadcrumbName: '材料代用申请单',
    component: MaterialSubApplyDetail
  },
  {
    path: 'material_sub_apply',
    breadcrumbName: '材料代用',
    component: MaterialSubApply
  },
  {
    path: 'status_back_track/status_history',
    breadcrumbName: '状态更改历史',
    component: StatusHistory
  },
  {
    path: 'status_back_track',
    breadcrumbName: '状态回溯',
    component: StatusBackTrack
  },
  {
    path: 'material_execution',
    breadcrumbName: '材料执行',
    component: MaterialExecution
  },
  {
    path: 'supplier/quotation',
    breadcrumbName: '报价管理',
    component: Quotation
  },
  {
    path: 'supplier/supplier_document',
    breadcrumbName: '供应商文件',
    component: SupplierDocument
  },
  {
    path: 'supplier',
    breadcrumbName: '供应商管理',
    component: Supplier
  },
  {
    path: 'contract/contract_detail',
    breadcrumbName: '已付金额明细',
    component: ContractDetail
  },
  {
    path: 'contract',
    breadcrumbName: '合同财务管理',
    component: Contract
  }
]

export default (path) => {
  return _.map(childRoutes, (child) => ({
    path: `/${path}/${child.path}`,
    component: child.component,
    breadcrumbName: child.breadcrumbName
  })).concat({
    path: `/${path}`,
    breadcrumbName: '采购管理',
    component: () => (
      <Redirect to={`/${path}/pending_order`} />
    )
  })
}
