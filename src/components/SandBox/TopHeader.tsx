import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Button,theme, Dropdown, MenuProps, Avatar } from 'antd';
import { useState } from 'react';
const { Header } = Layout;
import style from './index.module.scss'

export default function TopHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed,setCollapsed] = useState(false)
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>超级管理员</div>
      ),
    },
    {
      key: '2',
      danger: true,
      label: (
        <div>推出登录</div>
      ),
    },
  ];
  return (
    <Header style={{ padding: 0,background: colorBgContainer }}>
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: '16px',
        width: 64,
        height: 64,
      }}
    />
    <div className={style['user']}>
      <span>欢迎admin回来</span>
      <Dropdown menu={{ items }}>
      <Avatar size="large" icon={<UserOutlined />} />
    </Dropdown>
    </div>
  </Header>
  )
}
