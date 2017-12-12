import React from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

import Production from './Production'
import ProductionSend from './ProductionSend'

const childRoutes = [
  {
    path: 'production',
    breadcrumbName: '产品',
    component: Production
  },
  {
    path: 'productionSend',
    breadcrumbName: '生产科下发',
    component: ProductionSend
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
