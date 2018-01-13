/**
 * Created by lh on 2017/12/11.
 */
import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import './MenuItem.less'
import { Link } from 'react-router-dom'

class MenuItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { icon, path, breadcrumbName } = this.props
    return (
      <span className='menuItem'>
        <Icon type={icon} style={{ fontSize: `1.2em` }} />
        <Link to={path} >{breadcrumbName}</Link>
      </span>
    )
  }
}
MenuItem.propTypes = {
  icon : PropTypes.string,
  path : PropTypes.string,
  breadcrumbName : PropTypes.string
}
export default MenuItem
