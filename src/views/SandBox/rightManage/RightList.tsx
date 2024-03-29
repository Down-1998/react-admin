import React, { useState, useEffect, useCallback } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd'
import service from '@/http/request'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function RightList() {
  const [dataSource, setdataSource] = useState([])

  useEffect(() => {
    service.get("/rights?_embed=children").then((res: any) => {
      const list = res.data

      list.forEach(item => {
        if (item.children.length === 0) {
          item.children = ""
        }
      })
      setdataSource(list)
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id: string) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title'
    },
    {
      title: "权限路径",
      dataIndex: 'key',
      render: (key: string) => {
        return <Tag color="orange">{key}</Tag>

      }
    },
    {
      title: "操作",
      render: (item) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />

          <Popover content={<div style={{ textAlign: "center" }}>
            <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}></Switch>
          </div>} title="页面配置项" trigger={item.pagepermisson === undefined ? '' : 'click'}>
            <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson === undefined} style={{ 'marginLeft': '10px' }} />
          </Popover>
        </div>
      }
    }
  ];

  const switchMethod = useCallback((item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    // console.log(item)
    setdataSource([...dataSource])
    if (item.grade === 1) {
      service.patch(`/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    } else {
      service.patch(`/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }, [dataSource])

  const confirmMethod = useCallback((item) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        //   console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        //   console.log('Cancel');
      },
    })
  }, [])

  //删除
  const deleteMethod = useCallback((item) => {
    // console.log(item)
    // 当前页面同步状态 + 后端同步
    if (item.grade === 1) {
      setdataSource(dataSource.filter(data => data.id !== item.id))
      service.delete(`/rights/${item.id}`)
    } else {
      const list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setdataSource([...dataSource])
      service.delete(`/children/${item.id}`)
    }
  }, [dataSource])

  return (
    <div>
      <Table dataSource={dataSource} columns={columns}
        pagination={{
          pageSize: 5
        }} />
    </div>
  )
}
