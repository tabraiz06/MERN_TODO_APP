import React, { useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

const Protected = ({Compennt}) => {
    const navigate=useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
    })
  return (
    <div>
       
      <Compennt/>
    </div>
  )
}

export default Protected
