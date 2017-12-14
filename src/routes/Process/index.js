import React from 'react'
import { Redirect } from 'react-router-dom'
import ProcessImport from './ProcessImport'
import Process from './Process'
import _ from 'lodash'

const childRoutes = [
  {
    path: 'process_import',
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
    breadcrumbName: '工艺管理',
    component: () => (
      <Redirect to={`/${path}/process_import`} />
    )
  })
}
