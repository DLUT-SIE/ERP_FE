import React from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

import Production from './Production'
import DepartmentSend from './DepartmentSend'
import BidDocument from './BidDocument'

const childRoutes = [
  {
    path: 'production',
    breadcrumbName: '产品',
    component: Production
  },
  {
    path: 'production_send',
    breadcrumbName: '生产科下发',
    component: DepartmentSend
  },
  {
    path: 'process_send',
    breadcrumbName: '工艺科下发',
    component: DepartmentSend
  },
  {
    path: 'procurement_send',
    breadcrumbName: '采购科下发',
    component: DepartmentSend
  },
  {
    path: 'bid_document',
    breadcrumbName: '招标文件审核',
    component: BidDocument
  }
]

export default (path) => {
  return _.map(childRoutes, (child) => ({
    path: `/${path}/${child.path}`,
    component: child.component,
    breadcrumbName: child.breadcrumbName
  })).concat({
    path: `/${path}`,
    breadcrumbName: '经销管理',
    component: () => (
      <Redirect to={`/${path}/production`} />
    )
  })
}
