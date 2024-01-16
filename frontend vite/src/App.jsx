import { useState } from 'react'


import { ToastContainer, toast } from 'react-toastify';

import './App.css'
import { BrowserRouter, Navigate, Route, Routes, redirect, useNavigate } from "react-router-dom";
import Protected from './components/Protected';

import Login from './components/login/Login';


import TodoList from './components/TodoList';
import Register from './components/register/Register';
import 'react-toastify/dist/ReactToastify.css';
import ContextApi from './components/context/Context';
ContextApi
function App() {
  const token = localStorage.getItem('token')

  return (
    <>

<ContextApi>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<TodoList />} />
          <Route path='/login' element={<Login />} />
       
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
      </ContextApi>
    </>
  )
}

export default App
