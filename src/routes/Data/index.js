import React from 'react'
import { Redirect } from 'react-router-dom'
import ProcessImport from './ProcessImport'
import Process from './Process'
import _ from 'lodash'

const childRoutes = [
  {
    path: 'processImport',
    breadcrumbName: '工艺库导入',
    component: ProcessImport
  },
  {
    path: 'process',
    breadcrumbName: '工艺库',
    component: Process
  }
]

export default (path) => {
  return _.map(childRoutes, (child) => ({
    path: `/${path}/${child.path}`,
    component: child.component,
    breadcrumbName: child.breadcrumbName
  })).concat({
    path: `/${path}`,
    breadcrumbName: '技术资料管理',
    component: () => (
      <Redirect to={`/${path}/processImport`} />
    )
  })
}
