import React from 'react'
import { Link } from 'react-router-dom'
import './Header.less'

export const Header = () => (
  <header className='header'>
    <Link className='logo' to={{ pathname:'/' }}>太重滨海煤化工生产管理系统</Link>
    <div className='inner'>
      <span className='user-name header-item'>{window.erpConfig.employeeName || ''}</span>
      <a className='logout header-item' href='/logout'>登出</a>
    </div>
  </header>
)

export default Header
