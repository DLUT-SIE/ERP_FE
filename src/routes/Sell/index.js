import React from 'react'
import { Redirect } from 'react-router-dom'
import Production from './Production'
import _ from 'lodash'

const childRoutes = [
  {
    path: 'production',
    breadcrumbName: '产品',
    component: Production
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
