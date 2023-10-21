import React, { useEffect, useState, useRef } from 'react'
import { Steps, Button, Form, Input, Select, message, notification } from 'antd'
import style from './News.module.css'
import service from '@/http/request'
import NewsEditor from '@/components/newsManage/NewsEditor';
import { useParams,useNavigate } from "react-router";
const { Step } = Steps;
const { Option } = Select;

export default function NewsUpdate(props) {
    const params = useParams();
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)
    const [categoryList, setCategoryList] = useState([])

    const [formInfo, setformInfo] = useState({})
    const [content, setContent] = useState("")
    const itemArr = [
        {
            title: '基本信息',
            description:'活动标题，活动分类',
        },
        {
            title: '活动内容',
            description:'活动主体内容',
        },
        {
            title: '活动提交',
            description:'保存草稿或者提交审核',
        }
    ]

    const handleNext = () => {
        if (current === 0) {
            NewsForm.current.validateFields().then(res => {
                setformInfo(res)
                setCurrent(current + 1)
            }).catch(error => {
                console.log(error)
            })
        } else {
            if (content === "" || content.trim() === "<p></p>") {
                message.error("活动内容不能为空")
            } else {
                setCurrent(current + 1)
            }
        }
    }
    const handlePrevious = () => {
        setCurrent(current - 1)
    }

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    const NewsForm = useRef(null)

    useEffect(() => {
        service.get("service/categories").then(res => {
            // console.log(res.data)
            setCategoryList(res.data)
        })
    }, [])

    useEffect(() => {
        service.get(`service/news/${params.id}?_expand=category&_expand=role`).then((res) => {
            const { title, categoryId, content } = res.data as any
            NewsForm.current.setFieldsValue({
                title,
                categoryId
            })
            setContent(content)
        })
    }, [params.id])


    const handleSave = (auditState) => {
        service.patch(`service/news/${params.id}`, {
            ...formInfo,
            "content": content,
            "auditState": auditState,
        }).then(res => {
            navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')

            notification.info({
                message: `通知`,
                description:
                    `您可以到${auditState === 0 ? '草稿箱' : '审核列表'}中查看您的活动`,
                placement: "bottomRight"
            });
        })
    }

    return (
        <div>
            {/* <PageHeader
                className="site-page-header"
                title="更新活动"
                onBack={()=>props.history.goBack()}
                subTitle="This is a subtitle"
            /> */}

            <Steps current={current} items={itemArr}></Steps>


            <div style={{ marginTop: "50px" }}>
                <div className={current === 0 ? '' : style.active}>

                    <Form
                        {...layout}
                        name="basic"
                        ref={NewsForm}
                    >
                        <Form.Item
                            label="活动标题"
                            name="title"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="活动分类"
                            name="categoryId"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select>
                                {
                                    categoryList.map(item =>
                                        <Option value={item.id} key={item.id}>{item.title}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>

                    </Form>
                </div>

                <div className={current === 1 ? '' : style.active}>
                    <NewsEditor getContent={(value) => {
                        // console.log(value)
                        setContent(value)
                    }} content={content}></NewsEditor>
                </div>
                <div className={current === 2 ? '' : style.active}></div>

            </div>
            <div style={{ marginTop: "50px" }}>
                {
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
                }
            </div>
        </div>
    )
}
