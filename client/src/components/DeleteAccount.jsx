import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [password, setpassword] = useState("")
  const navigate = useNavigate();
  const { deleteUser } = useAppContext()

  const DeleteUser = (e) => {
    e.preventDefault();
    let del = deleteUser(password)
    if (del) {
      navigate("/landing")
    }
  }

  return (
    <div className='h-screen w-full flex items-start justify-center ' style={{ "backgroundColor": "#efefef" }}>
      <form className='w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-60 border-2 bg-white border-gray-200 rounded-lg shadow-md flex items-center justify-around flex-col mt-24' onSubmit={DeleteUser}>
        <div className='text-2xl font-medium mt-3'>Delete Account</div>
        <input type="text" value={password} placeholder='Enter the password' className='w-3/4 h-10 border-2 border-gray-300 rounded-lg p-2' onChange={(e) => setpassword(e.target.value)} style={{ "backgroundColor": "#efefef" }} />
        <div className='w-full flex items-center justify-center'>
          <div className='bg-red-400 w-16 h-9 rounded-lg mr-2 '>
            <button type='submit' className='w-full h-full rounded-lg hover:bg-red-500'>Delete</button>
          </div>
          <div className='bg-green-400 w-16 h-9 rounded-lg ml-2'>
            <button type='button' className='w-full h-full rounded-lg hover:bg-green-500' onClick={()=> navigate("/")}>cancel</button>
          </div>

        </div>
      </form>

    </div>
  )
}

export default DeleteAccount