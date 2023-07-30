import React, { useEffect, useState, useCallback } from 'react'
import { Button, Input, Form } from 'antd';
import axios from '@/http/request'
import { useMemo } from 'react';
import style from './index.module.css'
type Data = Array<DataItem>;
interface DataItem {
  age: string
  id?: number
}
export default function Home() {
  const [data, setData] = useState([
  
  ]);
  useEffect(() => {
    const fetchData = async() =>{
      const res = await axios.get('http://localhost:53000/test')
      res.forEach((item)=> {
          item.id = Math.random()*100 +  new Date().getTime()
      });
      setData(res);
      console.log(res);
    }
    fetchData();
  }, [])

  const deleteItem = (dataItem: DataItem, index: number) => {
    const arr = data.filter((item) => item.id !== dataItem.id);
    setData(arr);
  }
  const addItem = useCallback(() => {
    data.push({
      age: '',
      id:data.length + 1
    })
    setData([...data])
  }, [data])
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {
          data.map((item,index) => {
            return (
              <Form.Item
                label="Username"
                name="username"
                key={item.id}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <div className={style['input-content']}>
                <Input />
                <Button onClick={() =>{deleteItem(item,index)}}>delete</Button>
                </div>
              </Form.Item>
              
            )
          })
        }
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={addItem}>
            add
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
