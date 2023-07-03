import React, { useState, useCallback, useEffect } from 'react'
import {
  UserOutlined, HomeOutlined, CrownOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
const { Sider } = Layout;
import style from './index.module.scss'
import { useNavigate, useLocation } from "react-router";
// import axios from '@/http/request'
import axios from 'axios'
import SubMenu from 'antd/es/menu/SubMenu';
type MenuItem = Required<MenuProps>['items'][number];

const iconList = {
  "/home": <HomeOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <CrownOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />
  //.......
}

export default function SideMenu() {

  const location = useLocation();
  // console.log(location, 'location');
  const openKeys = [`/${location.pathname.split('/')[1]}`]

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('1');
  const [menus, setMenus] = useState([
    
  ])
  useEffect(() => {
    axios.get('http://localhost:53000/rights?_embed=children').then((res: any) => {
      console.log(res,'res');
      const data = res.data;
      // data.forEach((item, index) => {
      //   delete item.rightId;
      //   item.label = item.title;
      //   item.icon = iconList[item.key]
      //   if (item.children?.length > 0) {
      //     let filterChildren = []
      //     filterChildren = item.children.filter((it) => {
      //       delete it.rightId;
      //       it.label = it.title;
      //       return it.pagepermisson === 1
      //     })
      //     item.children = filterChildren
      //   } else {
      //     delete item.children
      //   }
      // });
      // console.log(data, 'menusData');
      // setMenus(data.filter(item => item.pagepermisson === 1))

      setMenus(res.data)
    })
  }, [])
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location])

  const {rights} = JSON.parse(localStorage.getItem("tokenRole"))
  const checkPagePermission = (item)=>{
    return item.pagepermisson && rights.includes(item.key)
  }
  const renderMenu = (menuList)=>{
    return menuList.map(item=>{
      if(item.children?.length>0 && checkPagePermission(item)){
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
           { renderMenu(item.children) }
        </SubMenu>
      }

      return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]}  onClick={()=>{
        //  console.log(props)
        navigate(item.key)
      }}>{item.title}</Menu.Item>
    })
  }

  const onClick: MenuProps['onClick'] = useCallback((e) => {
    console.log('click ', e);
    navigate(e.key)
    setCurrent(e.key);
  }, [navigate])



  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: 'flex', height: '100%', 'flexDirection': 'column' }}>
        <div className={style['demo-logo-vertical']}>react-admin</div>
        <div style={{ flex: '1' }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/home']}
            defaultOpenKeys={openKeys}
            selectedKeys={[current]}
            onClick={onClick}
          >
            {renderMenu(menus)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
