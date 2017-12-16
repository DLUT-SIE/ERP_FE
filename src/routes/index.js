import React from 'react'
import _ from 'lodash'
import { Route, Link, Switch, withRouter } from 'react-router-dom'
import { formatMenu } from './menus'
import { Breadcrumb } from 'antd'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import Process from './Process'
import Distribution from './Distribution'
import Purchase from './Purchase'
import Inventory from './Inventory'
import NotFound from './NotFound'
import Home from './Home'
import './index.less'

function getSidebarMenus (menus) {
  const items = formatMenu(menus)
  let defaultKey
  items.some((menu) => {
    if (menu.children) {
      menu.children.some((sub) => {
        if (sub.url === location.pathname) {
          defaultKey = sub.code
          return true
        }
        return false
      })
    } else {
      if (menu.url === location.pathname) {
        defaultKey = menu.code
        return true
      }
      return false
    }
  })
  return { defaultKey, items }
}

// 只需将新模块路由添加到这里
const moduleRoutes = [

  ...Distribution('distribution'),
  ...Process('process'),
  ...Purchase('purchase'),
  ...Inventory('inventory')

]

const breadcrumbNameMap = {}

_.forEach(moduleRoutes, (route) => {
  breadcrumbNameMap[route.path] = route.breadcrumbName
})

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  ...moduleRoutes,
  {
    component: NotFound
  }
]
const Routes = withRouter((props) => {
  const { location } = props
  console.log('props', props)
  /* 这里可否通过match找到当前路径匹配的path */
  const menus = window.erpConfig.menus ? JSON.parse(window.erpConfig.menus) : []
  console.log('breadcrumbNameMap', breadcrumbNameMap)
  const { defaultKey, items } = getSidebarMenus(menus)
  const pathSnippets = location.pathname.split('/').filter(i => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    )
  })
  const breadcrumbItems = [(
    <Breadcrumb.Item key='home'>
      <Link to='/'>首页</Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems)
  return (
    <div className='container'>
      <Header />
      <div className='bd'>
        <aside className='aside'>
          <Sidebar
            items={items}
            selectedKeys={defaultKey}
          />
        </aside>
        <div className='main' id='content'>
          <div className='content'>
            <Breadcrumb>
              {breadcrumbItems}
            </Breadcrumb>
            <Switch>
              {_.map(routes, (route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                )
              })}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Routes
