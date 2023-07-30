import React,{useEffect} from 'react'
import SideMenu from '@/components/SandBox/SideMenu'
import TopHeader from '@/components/SandBox/TopHeader'
import './index.scss'
import NewsRouter from '@/components/SandBox/NewsRouter'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Layout, theme } from 'antd'
const { Content } = Layout;

export default function NewsSandBox() {
  NProgress.start()
  useEffect(() => {
    NProgress.done()
  }, [])
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
