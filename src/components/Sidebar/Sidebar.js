import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
const SubMenu = Menu.SubMenu

import './Sidebar.less'

const buildMenu = (node) => (
  <Menu.Item key={String(node.code)}>
    <Link to={node.url}>{node.name}</Link>
  </Menu.Item>
)

class Sidebar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      openKeys: []
    }
    this.onOpenChange = this.onOpenChange.bind(this)
  }
  componentDidMount () {
    const { items } = this.props
    const openKeys = _.map(items, 'code')
    this.setState({
      openKeys
    })
  }
  getMenu (items = []) {
    return items.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={String(item.code)}
            title={<span><Icon type={item.icon} />{item.name}</span>}
          >
            {item.children.map((node) => {
              return buildMenu(node)
            })}
          </SubMenu>
        )
      } else {
        return buildMenu(item)
      }
    })
  }
  onOpenChange (openKeys) {
    this.setState({
      openKeys
    })
  }

  render () {
    const { items, selectedKeys } = this.props
    const { openKeys } = this.state
    return (
      <div className='sidebar'>
        <div className='menus'>
          <Menu
            mode='inline'
            selectedKeys={[String(selectedKeys)]}
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
          >
            {this.getMenu(items)}
          </Menu>
        </div>

      </div>
    )
  }
}

Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
  selectedKeys: PropTypes.string
}

Sidebar.defaultProps = {
  defaultKey: '',
  defaultOpenKey: ''
}

export default Sidebar
