import React, { useContext, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './login.css'
import { Context } from '../context/Context';
const Login = () => {
  const{setusername,fetchtodos}=useContext(Context)
    const navigate=useNavigate()
    
    const [login, setlogin] = useState({
      email: '',
        password: '',
    });

    
const handleinput=(e)=>{
    setlogin({...login, [e.target.name]:e.target.value })
}
const submit=async()=>{
    try {
      const response= await fetch(`${window.location.origin}/api/auth/login`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(login)
    })
        const res=await response.json()
        console.log(res)
        const token=res.AtuhToken
        localStorage.setItem('token',token)
        if(token){
          
            navigate('/')
            fetchtodos()
            setusername(res.user.name)
            toast.success(`🦄 ${res.message} !`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              

        }
        else{
          toast.warn(`🦄 ${res.message} !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });}
      //   setLogin(credentials)
      }
      catch(error){
          console.log(error,login,'error from login')
      }
   
// setlogin(initial)
}
  return (
    <div className='rounded-md flex flex-col justify-center gap-4 bg-slate-600 w-2/3 items-center mx-auto my-5 h-[300px]'>
      <h1>Login </h1>
  
      <input className='w-2/3 p-4' type="text" name="email" id="username" onChange={handleinput} value={login.username}/>
      <input className='w-2/3 p-4' type="text" name="password" id="password"  onChange={handleinput} value={login.password}/>
      <button onClick={submit}>submit</button>
      <Link to='/register'><p>don't have an account</p></Link>
    </div>
  )
}

export default Login
