import React, { useState, useEffect } from 'react'
import { Button, Table, Modal,notification} from 'antd'
import service from '@/http/request'
import { useNavigate, useLocation } from "react-router";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined,UploadOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function NewsDraft(props) {
    const navigate = useNavigate();
    const [dataSource, setdataSource] = useState([])

    const {username}  = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        service.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
            const list = res.data
            setdataSource(list)
        })
    }, [username])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '活动标题',
            dataIndex: 'title',
            render:(title,item)=>{
                return <a onClick={() => navigate(`/news-manage/preview/${item.id}`)}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author'
        },
        {
            title: '分类',
            dataIndex: 'category',
            render:(category)=>{
                return category.title
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                    
                    <Button shape="circle" icon={<EditOutlined />} onClick={()=>{
                        navigate(`/news-manage/update/${item.id}`)
                    }}/>

                    <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={()=>handleCheck(item.id)}/>
                </div>
            }
        }
    ];


    const handleCheck = (id)=>{
        service.patch(`/news/${id}`,{
            auditState:1
        }).then(res=>{
          navigate('/audit-manage/list')
            notification.info({
                message: `通知`,
                description:
                  `您可以到${'审核列表'}中查看您的活动`,
                placement:"bottomRight"
            });
        })
    }

    const confirmMethod = (item) => {
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
        });

    }
    //删除
    const deleteMethod = (item) => {
        // console.log(item)
        // 当前页面同步状态 + 后端同步
      
        setdataSource(dataSource.filter(data => data.id !== item.id))
        service.delete(`/news/${item.id}`)
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }} 
                rowKey={item=>item.id}
                />
        </div>
    )
}
