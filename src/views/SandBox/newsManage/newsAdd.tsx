import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Steps, Button, Form, Input, Select, message, notification } from 'antd'
import service from '@/http/request'
import style from './News.module.css'
import NewsEditor from '@/components/newsManage/NewsEditor';
import { useNavigate, useLocation } from "react-router";

export default function NewsAdd(props) {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0)
    const [categoryList, setCategoryList] = useState([])

    const [formInfo, setformInfo] = useState({})
    const [content, setContent] = useState("")

    const otherInfo = JSON.parse(localStorage.getItem("otherInfo"))
    const UserInfo = JSON.parse(localStorage.getItem("token"))
    const handleNext = useCallback(() => {
        if (current === 0) {
            NewsForm.current.validateFields().then(res => {
                // console.log(res)
                setformInfo(res)
                setCurrent(current + 1)
            }).catch(error => {
                console.log(error)
            })
        } else {
            // console.log(content)
            if (content === "" || content.trim() === "<p></p>") {
                message.error("新闻内容不能为空")
            } else {
                setCurrent(current + 1)
            }
        }
    },[content,current])
    const handlePrevious = useCallback(() => {
        setCurrent(current - 1)
    },[current])

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    const NewsForm = useRef(null)

    useEffect(() => {
        service.get("/categories").then(res => {
            // console.log(res.data)
            setCategoryList(res.data)
        })
    }, [])


    const handleSave = useCallback((auditState) => {
        service.post('/news', {
            ...formInfo,
            "content": content,
            "region": otherInfo.region ? otherInfo.region : "全球",
            "author": UserInfo.username,
            "roleId": otherInfo.roleId,
            "auditState": auditState,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
            // "publishTime": 0
        }).then(res => {
            navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')

            notification.info({
                message: `通知`,
                description:
                    `您可以到${auditState === 0 ? '草稿箱' : '审核列表'}中查看您的新闻`,
                placement: "bottomRight"
            });
        })
    }, [otherInfo.region, otherInfo.roleId, content, UserInfo.username, formInfo, navigate])
    const buttonShow = useMemo(() => {
        if (current === 2) {
            return <span>
                <Button type="primary" onClick={() => handleSave(0)}>保存草稿箱</Button>
                <Button danger onClick={() => handleSave(1)}>提交审核</Button>
                <Button onClick={handlePrevious}>上一步</Button>
            </span>
        } else if (current < 2 && current > 0) {
            return <div>
                <Button type="primary" onClick={handleNext}>下一步</Button>
                <Button onClick={handlePrevious}>上一步</Button>
            </div>
        }else if(current === 0){
            return <Button type="primary" onClick={handleNext}>下一步</Button>
        }
    }, [current, handleNext, handlePrevious, handleSave])

    return (
        <div>
            <Steps
                current={0}
                items={[
                    {
                        title: '基本信息',
                        description: '新闻标题，新闻分类',
                    },
                    {
                        title: '新闻内容',
                        description: '新闻主体内容',
                    },
                    {
                        title: '新闻提交',
                        description: '保存草稿或者提交审核',
                    },
                ]}
            />
            <div style={{ marginTop: "50px" }}>
                <div className={current === 0 ? '' : style.active}>

                    <Form
                        {...layout}
                        name="basic"
                        ref={NewsForm}
                    >
                        <Form.Item
                            label="新闻标题"
                            name="title"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="新闻分类"
                            name="categoryId"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select>
                                {
                                    categoryList.map(item =>
                                        <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
                                    )
                                }
                            </Select>
                        </Form.Item>

                    </Form>
                </div>

                <div className={current === 1 ? '' : style.active}>
                    <NewsEditor getContent={(value) => {
                        console.log(value)
                        setContent(value)
                    }}></NewsEditor>
                </div>
                <div className={current === 2 ? '' : style.active}></div>

            </div>
            <div style={{ marginTop: "50px" }}>
                {/* {
                    current === 2 && <span>
                        <Button type="primary" onClick={() => handleSave(0)}>保存草稿箱</Button>
                        <Button danger onClick={() => handleSave(1)}>提交审核</Button>
                    </span>
                }
                {
                    current < 2 && <Button type="primary" onClick={handleNext}>下一步</Button>
                }
                {
                    current > 0 && <Button onClick={handlePrevious}>上一步</Button>
                } */}
                {buttonShow}
            </div>
        </div>
    )
}
