import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Button,theme, Dropdown, MenuProps, Avatar } from 'antd';
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router";
import { connect } from 'react-redux'
const { Header } = Layout;
import style from './index.module.scss'
import { useEffect } from 'react';

const TopHeader = (props) => {
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
  useEffect(() =>{
    console.log(props,'props');
  },[])
  const changeCollapsed = () => {
    //改变state的isCollapsed
    // console.log(props)
    props.changeCollapsed()
}
  return (
    <Header style={{ padding: '0 16px',background: colorBgContainer }}>
    {/* <Button
      type="text"
      icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: '16px',
        width: 64,
        height: 64,
      }}
    /> */}
    {
      props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
    }
    <div className={style['user']}>
      <div className={style['user-content']}>欢迎<span className={style['username']}>{username}</span>回来</div>
      <Dropdown menu={{ items }}>
      <Avatar size="large" icon={<UserOutlined />} />
    </Dropdown>
    </div>
  </Header>
  )
}
/*
 connect(
  // mapStateToProps  
  // mapDispatchToProps
 )(被包装的组件)
*/

const mapStateToProps = ({CollApsedReducer:{isCollapsed}})=>{
  // console.log(state)
  return {
      isCollapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed(){
      return {
          type: "change_collapsed"
          // payload:
      }//action 
  }
}
const TopHeaderComp =  connect(mapStateToProps,mapDispatchToProps)(TopHeader)
export default TopHeaderComp
