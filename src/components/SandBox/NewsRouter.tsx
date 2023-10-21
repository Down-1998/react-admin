import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import { connect } from 'react-redux'
import service from '@/http/request'
import {Spin } from 'antd'
import Home from '@/views/SandBox/Home'
import UserList from '@/views/SandBox/userManage'
import RightList from '@/views/SandBox/rightManage/RightList'
import RoleList from '@/views/SandBox/rightManage/RoleList'
import NoPermission from '@/views/SandBox/NoPermission'
import NewsAdd from '@/views/SandBox/newsManage/newsAdd'
import NewsCategory from '@/views/SandBox/newsManage/newsCategory'
import NewsDraft from '@/views/SandBox/newsManage/newsDraft'
import Audit from '@/views/SandBox/auditManage/Audit'
import AuditList from '@/views/SandBox/auditManage/List'
import Unpublished from '@/views/SandBox/publishManage/Unpublished'
import Published from '@/views/SandBox/publishManage/Published'
import Sunset from '@/views/SandBox/publishManage/Sunset'
import NewsPreview from '@/views/SandBox/newsManage/newsPreview'
import NewsUpdate from '@/views/SandBox/newsManage/newsUpdate'

const LocalRouterMap = {
    "/home": Home,
    "/user-manage/list": UserList,
    "/right-manage/role/list": RoleList,
    "/right-manage/right/list": RightList,
    "/news-manage/add": NewsAdd,//新增
    "/news-manage/draft": NewsDraft,//草稿
    "/news-manage/category": NewsCategory,//分类
    "/news-manage/preview/:id": NewsPreview,
    "/news-manage/update/:id": NewsUpdate,
    "/audit-manage/audit": Audit,//审核新闻
    "/audit-manage/list": AuditList,//审核列表
    "/publish-manage/unpublished": Unpublished,//待发布
    "/publish-manage/published": Published,//已发布
    "/publish-manage/sunset": Sunset//已下线
}

const NewsRouter = (props) => {
    const [BackRouteList, setBackRouteList] = useState([])
    useEffect(() => {
        Promise.all([
            service.get("/rights"),
            service.get("/children"),
        ]).then(res  => {
            setBackRouteList([...(res[0] as any).data, ...(res[1] as any).data])
        })


    }, [])
    const { rights } = JSON.parse(localStorage.getItem("tokenRole"))
    const checkRoute = useCallback((item) => {
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    }, [])

    const checkUserPermission = useCallback((item) => {
        return rights.includes(item.key)
    }, [rights])

    const renderRoutes = useMemo(() => {
        return BackRouteList.map((item) => {
            if (checkRoute(item) && checkUserPermission(item)) {
                return <Route path={item.key} key={item.key} Component={LocalRouterMap[item.key]} />
            } else {
                return null
            }

        })
    }, [BackRouteList, checkRoute, checkUserPermission])

    return (
        <Spin ize="large" spinning={props.loadingCount > 0}>
            <Routes>
                {renderRoutes}
                <Route path="/" element={<Navigate replace to="home" />} />
                {/* <Route path="*" element={<NoPermission />} /> */}
                {
                    BackRouteList.length > 0 && <Route path="*" element={<NoPermission />} />
                }
                {/* <Route path="home" element={<Home />} />
                <Route path="user-manage/list" element={<UserList />} />
                <Route path="right-manage/role/list" element={<RoleList />} />
                <Route path="right-manage/right/list" element={<RightList />} />
                <Route path="/" element={<Navigate replace to="home" />} />
                <Route path="/*" element={<NoPermission />} /> */}
            </Routes>
        </Spin>
        
    )
}

const mapStateToProps = ({LoadingReducer:{loadingCount}})=>({
    loadingCount
  })

const  NewsRouterCom = connect(mapStateToProps)(NewsRouter)
export default NewsRouterCom

