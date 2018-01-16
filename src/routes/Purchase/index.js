import React from 'react'
import { Redirect } from 'react-router-dom'
import MaterialSummary from './MaterialSummary'
import PendingOrder from './PendingOrder'
import PurchaseOrderManagement from './PurchaseOrderManagement'
import PurchaseOrder from './PurchaseOrder'
import MaterialSubApply from './MaterialSubApply'
import MaterialSubApplyDetail from './MaterialSubApplyDetail'
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
    path: 'material_sub_apply/material_sub_apply_detail',
    breadcrumbName: '材料代用申请单',
    component: MaterialSubApplyDetail
  },
  {
    path: 'material_sub_apply',
    breadcrumbName: '材料代用',
    component: MaterialSubApply
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
