import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Button,theme, Dropdown, MenuProps, Avatar } from 'antd';
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router";
const { Header } = Layout;
import style from './index.module.scss'

export default function TopHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [collapsed,setCollapsed] = useState(false)
  const {username} = JSON.parse(localStorage.getItem("token"))
  const {roleName} = JSON.parse(localStorage.getItem("tokenRole"))
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>{roleName}</div>
      ),
    },
    {
      key: '2',
      danger: true,
      label: (
        <div onClick={()=>{
          localStorage.removeItem("token")
          localStorage.removeItem("tokenRole")
          localStorage.removeItem("otherInfo")
          // console.log(props.history)
          // props.history.replace("/login")
          navigate('/login')
      }}>推出登录</div>
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
      <div className={style['user-content']}>欢迎<span className={style['username']}>{username}</span>回来</div>
      <Dropdown menu={{ items }}>
      <Avatar size="large" icon={<UserOutlined />} />
    </Dropdown>
    </div>
  </Header>
  )
}
