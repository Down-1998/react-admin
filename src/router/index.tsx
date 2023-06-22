import React from 'react'
import {Route,Routes,BrowserRouter, Navigate} from 'react-router-dom'
import Login from '@/views/Login/index'
import SandBox from '@/views/SandBox/index'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={localStorage.getItem("token") ?  <SandBox/> : <Navigate to="/login"/>} />
      </Routes>
     </BrowserRouter>
  )
}
