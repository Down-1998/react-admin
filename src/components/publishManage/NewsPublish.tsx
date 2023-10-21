import React from 'react'
import { Table} from 'antd'
import { useNavigate, useLocation } from "react-router";

export default function NewsPublish(props) {
    const navigate = useNavigate()
    const columns = [
        {
            title: '活动标题',
            dataIndex: 'title',
            render: (title,item) => {
                return <a onClick={() => navigate(`/news-manage/preview/${item.id}`)}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author'
        },
        {
            title: "活动分类",
            dataIndex: 'category',
            render: (category) => {
                return <div>{category.title}</div>
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    {props.button(item.id)}
                </div>
            }
        }
    ];

    return (
        <div>
            <Table dataSource={props.dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }} 
                rowKey={item=>item.id}
                />
        </div>
    )
}
