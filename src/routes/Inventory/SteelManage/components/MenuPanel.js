/**
 * Created by lh on 2017/12/11.
 */
import React from 'react'
import { SteelSubMenus } from '../../components/SubMenus'
import { Row, Col } from 'antd'
import MenuItem from '../../components/MenuItem'
import './MenuPanel.less'

class MenuPanel extends React.Component {
  render () {
    const listItems = SteelSubMenus.map((menu, index) => {
      return (
        <Col span={12} key={index} className='MenuPanel'>
          <MenuItem icon={menu.icon} path={menu.path} breadcrumbName={menu.breadcrumbName} />
        </Col>)
    }
    )
    return (
      <div>
        <Row>
          {listItems}
        </Row>
      </div>
    )
  }
}

export default MenuPanel
