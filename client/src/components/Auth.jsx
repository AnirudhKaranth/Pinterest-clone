import React, { useEffect, useState } from 'react'
import logo from '../assests/logo.png'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert'
import Spinner from './Spinner'

const Auth = () => {
    const { signUp, login, user, showAlert, isLoading } = useAppContext();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUp, setisSignUp] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            const currentuser = { name, email, password }
            signUp(currentuser)
        }
        else {
            const currentuser = { email, password }
            login(currentuser)
        }
    }

    const toggleMember = () => {
        setisSignUp(!isSignUp)
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/")
            }, 1000);
        }

    }, [user, navigate])

    return (
        <div className='
        h-screen w-full flex flex-col justify-center items-center relative'>
            {showAlert&&
            <div className='w-full absolute top-0'>
                <Alert/>
                {isLoading && <Spinner message={"Loading"}/>}
            </div>}
            <form className='flex flex-col justify-center p-2 items-center shadow-lg border-2 border-gray-100 rounded-sm 
            h-full sm:h-5/6 w-full m-3  sm:w-3/4  md:w-2/3 lg:w-2/4'
             onSubmit={handleSubmit}>
                <div className='flex flex-row justify-center items-center m-5'>
                    <img src={logo} alt="logo" width={40} height={40} className='rounded-full' />
                    <div className='text-3xl font-medium font-serif'>Pinterest</div>
                </div>
                <div className='text-3xl font-medium m-2 mb-5'>{isSignUp ? "Signup" : "Login"}</div>
                {isSignUp&&<div className='border-2 border-gray-200 w-4/5 h-12 my-6 rounded-md shadow-sm'>
                    <label className='w-full h-full'>
                        <input type="text" name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className='w-full h-full p-2' required />
                    </label>
                </div>}
                <div className='border-2 border-gray-200 w-4/5 h-12 my-6 rounded-md shadow-sm'>
                    <label>
                        <input type="email" name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full h-full p-2' required />
                    </label>
                </div>
                <div className='border-2 border-gray-200 w-4/5 h-12 my-6 rounded-md shadow-sm'>
                    <label>
                        <input type="password" name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full h-full p-2' required />
                    </label>
                </div>
                <div className='border-2 border-blue-400  w-4/5 m-4 h-12 rounded-md flex flex-col justify-around items-center' style={{"backgroundColor":"#73b2ff"}}>
                    <button type='submit' className='w-full h-full hover:bg-blue-400'>submit</button>
                </div>
                <div className="w-auto flex flex-row items-center justify-center" style={{"color":"#70b7f9"}}>
                    <p>{isSignUp ? "Already a member? " : "Don't have an account? "}</p>
                    <button type='button' onClick={toggleMember} className='hover:text-blue-600 p-1' >{isSignUp ? "Login" : " Signup"}</button>
                </div>
            </form>

        </div>
    )
}

export default Auth
