import React from 'react'
import {  useNavigate } from 'react-router-dom';
import logo from '../assests/logo.png'

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen w-full flex flex-col gap-1 items-center justify-center' style={{"backgroundColor":"#eef6f8"}}>
      <img src={logo} alt="logo" className=' w-20 h-20'/>
      <div className='text-3xl my-2'>Pinterest-clone</div>
      <div className='mb-2'>~by Anirudh_Karanth</div>
      <button type='button' className='mt-2 bg-blue-200 rounded-md shadow-md py-1 px-4 z-20' onClick={()=> navigate("/auth")}>Login</button>
      
    </div>
  )
}

export default Landing