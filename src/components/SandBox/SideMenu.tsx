import React, { useState, useCallback, useEffect } from 'react'
import {
  UserOutlined, HomeOutlined, CrownOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
const { Sider } = Layout;
import style from './index.module.scss'
import { useNavigate, useLocation } from "react-router";
import axios from '@/http/request'
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

export default function SideMenu(props) {

  const location = useLocation();
  // console.log(location, 'location');
  const openKeys = [`/${location.pathname.split('/')[1]}`]

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('1');
  const [menus, setMenus] = useState([
    // {
    //   key: '/user-manage',
    //   label: '用户管理',
    //   icon: <UserOutlined />,
    //   children: [
    //     {
    //       key: '/user-manage/list',
    //       label: '用户列表',
    //       icon: <UserOutlined />,
    //     }
    //   ]
    // },
  ])
  useEffect(() => {
    axios.get('/rights?_embed=children').then((res: any) => {
      const data = res;
      data.forEach((item, index) => {
        delete item.rightId;
        item.label = item.title;
        item.icon = iconList[item.key]
        if (item.children.length > 0) {
          let filterChildren = []
          filterChildren = item.children.filter((it) => {
            delete it.rightId;
            it.label = it.title;
            return it.pagepermisson === 1
          })
          item.children = filterChildren
        } else {
          delete item.children
        }
      });
      // console.log(data, 'menusData');
      setMenus(data.filter(item => item.pagepermisson === 1))
    })
  }, [])
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location])

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
            items={menus}
          />
        </div>
      </div>
    </Sider>
  )
}
