/**
 * Created by lh on 2017/12/29.
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import ProductionPlan from './ProductionPlan'
import CreateProductionPlan from './ProductionPlan/components/AddProductionPlan'
import TaskPlanDate from './TaskPlanDate'
import TaskAllocation from './TaskAllocation'
import TaskConfirm from './TaskConfirm'
import ProductionUsers from './ProductionUser'
import AddProductionUser from './ProductionUser/components/AddProductionUser'
import MaterialApplyCard from './MaterialApplyCard'
import AddWeldingApplyCard from './MaterialApplyCard/components/AddApllyCard'
import MaterialRefundCard from './MaterialRefundCard'
import AddMaterialRefundCard from './MaterialRefundCard/components/AddRefundCard'
import AccoutSearch from './AccountSearch'
import CompDepartment from './CompDepartment'
import WorkHourSearch from './WorkHourSearch'

const childRoutes = [
  {
    path: 'production_plan/create_production_plan',
    breadcrumbName: '添加生产计划',
    component: CreateProductionPlan
  },
  {
    path: 'production_plan',
    breadcrumbName: '生产计划',
    component: ProductionPlan
  },
  {
    path: 'task_plan_date',
    breadcrumbName: '任务计划时间',
    component: TaskPlanDate
  },
  {
    path: 'task_allocation',
    breadcrumbName: '任务分配',
    component: TaskAllocation
  },
  {
    path: 'task_confirm',
    breadcrumbName: '任务完成确认',
    component: TaskConfirm
  },
  {
    path: 'production_users',
    breadcrumbName: '生产人员管理',
    component: ProductionUsers
  },
  {
    path: 'create_production_user',
    breadcrumbName: '添加生产人员',
    component: AddProductionUser
  },
  {
    path: 'material_apply_card/create_material_apply_card',
    breadcrumbName: '领用卡新建',
    component: AddWeldingApplyCard
  },
  {
    path: 'material_apply_card',
    breadcrumbName: '材料领用卡',
    component: MaterialApplyCard
  },
  {
    path: 'material_refund_card/create_material_refund_card',
    breadcrumbName: '退库卡新建',
    component: AddMaterialRefundCard
  },
  {
    path: 'material_refund_card',
    breadcrumbName: '材料退库卡',
    component: MaterialRefundCard
  },
  {
    path: 'ledgers',
    breadcrumbName: '台账查询',
    component: AccoutSearch
  },
  {
    path: 'departments',
    breadcrumbName: '综合工部',
    component: CompDepartment
  },
  {
    path: 'query_work_hours',
    breadcrumbName: '工时信息查询',
    component: WorkHourSearch
  }
]

export default (path) => {
  return _.map(childRoutes, (child) => ({
    path: `/${path}/${child.path}`,
    component: child.component,
    breadcrumbName: child.breadcrumbName
  })).concat({
    path: `/${path}`,
    breadcrumbName: '生产管理',
    component: () => (
      <Redirect to={`/${path}/production_plan`} />
    )
  })
}
