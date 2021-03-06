import React from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

import ProcessImport from './ProcessImport'
import Process from './Process'
import TransferCardDetail from './TransferCardDetail'
import TransferCard from './TransferCard'
import WeldingSeam from './WeldingSeam'
import DetailedList from './DetailedList'
import PrincipalQuota from './PrincipalQuota'
import AuxiliaryQuota from './AuxiliaryQuota'
import WeldingQuota from './WeldingQuota'

const childRoutes = [
  {
    path: 'process/transfer_card/transfer_card_detail',
    breadcrumbName: '流转卡详情',
    component: TransferCardDetail
  },
  {
    path: 'process/transfer_card',
    breadcrumbName: '流转卡列表',
    component: TransferCard
  },
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
    path: 'welding_seam',
    breadcrumbName: '焊缝明细',
    component: WeldingSeam
  },
  {
    path: 'bought_in_items',
    breadcrumbName: '外购件明细',
    component: DetailedList
  },
  {
    path: 'first_feeding_items',
    breadcrumbName: '先投件明细',
    component: DetailedList
  },
  {
    path: 'cooperant_items',
    breadcrumbName: '工序性协作件明细',
    component: DetailedList
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
