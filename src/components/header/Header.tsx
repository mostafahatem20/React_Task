import React from 'react'
import { Layout, Typography } from 'antd'
import './Header.css'
const { Header } = Layout

const HeaderX: React.FC = () => {
  return (
    <Header className="site-layout-header">
      <Typography className="header-text">SpaceX Launches</Typography>
    </Header>
  )
}

export default HeaderX
