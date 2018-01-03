/**
 * Created by lh on 2017/12/29.
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import ProductionPlan from './ProductionPlan'
import TaskPlanDate from './TaskPlanDate'
import TaskAllocation from './TaskAllocation'
import TaskConfirm from './TaskConfirm'

const childRoutes = [
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
