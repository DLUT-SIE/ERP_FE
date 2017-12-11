import React from 'react'
import _ from 'lodash'
import { Route, Link, Switch, withRouter } from 'react-router-dom'
import { formatMenu } from './menus'
import { Breadcrumb } from 'antd'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import Data from './Data'
import Purchase from './Purchase'
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
  ...Data('data'),
  ...Purchase('purchase')
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
  const menus = window.erpConfig.menus ? JSON.parse(window.erpConfig.menus) : []
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
