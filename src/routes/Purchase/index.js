import React from 'react'
import { Redirect } from 'react-router-dom'
import MaterialSummary from './MaterialSummary'
import PendingOrder from './PendingOrder'
import PurchaseOrder from './PurchaseOrder'
import _ from 'lodash'

const childRoutes = [
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
    path: 'purchase_order',
    breadcrumbName: '订购单管理',
    component: PurchaseOrder
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
