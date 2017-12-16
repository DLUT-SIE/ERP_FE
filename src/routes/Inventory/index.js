import React from 'react'
import { Redirect } from 'react-router-dom'
import SteelManage from './SteelManage'
import WeldManage from './WeldManage'
import WeldEntry from './WeldManage/components/WeldEnrty'
import WeldDetail from './WeldManage/components/WeldEnrty/WeldDetail'
import WeldApplyCard from './WeldManage/components/WeldApplyCard'
import WeldHumitureRecord from './WeldManage/components/WeldHumitureRecord'
import _ from 'lodash'

const childRoutes = [
  {
    path: `weld/weld_entry/:uid`,
    breadcrumbName: '焊材入库单',
    component: WeldDetail,
    exact: true
  },
  {
    path: 'weld/weld_entry',
    breadcrumbName: '焊材入库管理',
    component: WeldEntry,
    exact: true
  },
  {
    path: `weld/weld_apply_card/:uid`,
    breadcrumbName: '焊材领用卡',
    component: WeldDetail,
    exact: true
  },
  {
    path: 'weld/weld_apply_card',
    breadcrumbName: '焊材领用管理',
    component: WeldApplyCard,
    exact: true
  },
  {
    path: 'weld/weld_humiture_record',
    breadcrumbName: '焊材温湿度记录',
    component: WeldHumitureRecord,
    exact: true
  },
  {
    path: 'weld',
    breadcrumbName: '焊材库存管理',
    component: WeldManage,
    exact: true
  },
  {
    path: 'steel',
    breadcrumbName: '钢材库存管理',
    component: SteelManage,
    exact: true
  }
]

export default (path) => {
  return _.map(childRoutes, (child) => ({
    path: `/${path}/${child.path}`,
    component: child.component,
    breadcrumbName: child.breadcrumbName,
    exact: child.exact
  })).concat({
    path: `/${path}`,
    breadcrumbName: '库存管理',
    // redirect: `/${path}/pendingorder`
    component: () => (
      <Redirect to={`/${path}/weld`} />
    )
  })
}
