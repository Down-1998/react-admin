import { Form, Button, Input, message } from 'antd'
import { useEffect } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.modules.scss'
// import Particles from 'react-particles-js';
import { useNavigate } from "react-router";
// import axios from '@/http/request'
import axios from 'axios'

export default function Login() {
    const[form] = Form.useForm()
    const navigate = useNavigate();
    // useEffect(() => {
    //     if(localStorage.getItem('token')){
    //         navigate('/')
    //     }
    // }, [])
    

    const onFinish = () => {
        form.validateFields().then(values =>{
            console.log(values, 'values')
            axios.get(`http://localhost:53000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
                if (Array.isArray(res.data) && res.data.length === 0) {
                    message.error("用户名或密码不匹配")
                } else {
                    
                    console.log(res, 'res');
                    const role = res.data[0].role
                    const userInfo = {
                        username:  res.data[0].username,
                        password:  res.data[0].password
                    }
                    const otherInfo = {
                        default: res.data[0].default,
                        id: res.data[0].id,
                        region: res.data[0].region,
                        roleId: res.data[0].roleId,
                        roleState: res.data[0].roleState,
                    }
                    localStorage.setItem("token", JSON.stringify(userInfo))
                    localStorage.setItem("tokenRole", JSON.stringify(role))
                    localStorage.setItem("otherInfo", JSON.stringify(otherInfo))
                    navigate('/')
    
                }
            })
        })
        
        
    }
    return (
        <div className="login-container">
            <div id='login_box'>
                <div className="logintitle">全球活动发布管理系统</div>
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"onClick={onFinish} className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
