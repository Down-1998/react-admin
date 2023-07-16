import React from 'react'
import SideMenu from '@/components/SandBox/SideMenu'
import TopHeader from '@/components/SandBox/TopHeader'
import './index.scss'
import NewsRouter from '@/components/SandBox/NewsRouter'
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
          <NewsRouter />
        </Content>

      </Layout>

    </Layout>
  )
}
