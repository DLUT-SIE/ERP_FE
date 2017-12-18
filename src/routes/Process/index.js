import React from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

import ProcessImport from './ProcessImport'
import Process from './Process'
import PrincipalQuota from './PrincipalQuota'
import AuxiliaryQuota from './AuxiliaryQuota'
import WeldingQuota from './WeldingQuota'

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
  },
  {
    path: 'principal_quota',
    breadcrumbName: '主材定额',
    component: PrincipalQuota
  },
  {
    path: 'auxiliary_quota',
    breadcrumbName: '辅材定额',
    component: AuxiliaryQuota
  },
  {
    path: 'welding_quota',
    breadcrumbName: '焊材定额',
    component: WeldingQuota
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
