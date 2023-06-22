import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SideMenu from '@/components/SandBox/SideMenu'
import TopHeader from '@/components/SandBox/TopHeader'
import Home from './Home'
import UserList from './userManage'
import RightList from './rightManage/RightList'
import RoleList from './rightManage/RoleList'
import NoPermission from './NoPermission'
import './index.scss'
import { Layout, theme } from 'antd'
const { Content } = Layout;

export default function NewsSandBox() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow:'auto'
          }}
        >
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="user-manage/list" element={<UserList />} />
            <Route path="right-manage/role/list" element={<RoleList />} />
            <Route path="right-manage/right/list" element={<RightList />} />
            <Route path="/" element={<Navigate replace to="home" />} />
            <Route path="/*" element={<NoPermission />} />
          </Routes>
        </Content>

      </Layout>

    </Layout>
  )
}
