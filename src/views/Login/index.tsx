import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.modules.scss'
// import Particles from 'react-particles-js';
import { useNavigate, useLocation } from "react-router";
import axios from '@/http/request'
export default function Login() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log(values, 'values')
        axios.get(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
            if (Array.isArray(res) && res.length === 0) {
                message.error("用户名或密码不匹配")
            } else {
                console.log(res, 'res');
                const role = res[0].role
                const userInfo = {
                    username: res[0].username,
                    password: res[0].password
                }
                const otherInfo = {
                    default: res[0].default,
                    id: res[0].id,
                    region: res[0].region,
                    roleId: res[0].roleId,
                    roleState: res[0].roleState,
                }
                localStorage.setItem("token", JSON.stringify(userInfo))
                localStorage.setItem("tokenRole", JSON.stringify(role))
                localStorage.setItem("otherInfo", JSON.stringify(otherInfo))
                navigate('/home')

            }
        })
    }
    return (
        <div className="login-container">
            <div id='login_box'>
                <div className="logintitle">全球活动发布管理系统</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
