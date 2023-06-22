import React, { useEffect, useState, useCallback } from 'react'
import { Button } from 'antd';
import axios from '@/http/request'

export default function Home() {
  const [data, setData] = useState(1);
  useEffect(() => {
    // const fetchData = async() =>{
    //   const res = await axios.get('/course')
    //   // setData(res);
    //   console.log(res);
    // }
    // fetchData();
  }, [])

  const getData = useCallback(() => {
     setData((prev:number) => prev + 1);
     console.log(data,'data');
  }, [data])
  const getTest = useCallback(async () =>{
    const data = await axios.get('/rights?_embed=children');
    console.log(data,'data');
    
  },[])
  return (
    <div>
      <Button type="primary" onClick={getTest}>Primary Button</Button>
    </div>
  )
}
