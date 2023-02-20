import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import logo from '../assests/logo.png'
import { useAppContext } from '../context/appContext';
import './Navbar.css'


const Navbar = () => {
    const [search, setSearch] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const { getAllPins, user, currentPerson, getCurrentUser, logoutUser } = useAppContext();

    const FirstLetterOfUser = user?.split("")[0];

    const handleSearch = (e) => {
        e.preventDefault()
        getAllPins(search)
    }

    const toggleProfile = () => {
        setIsClicked(!isClicked)
    }

    const toggleSearch = ()=>{
        setIsSearch(!isSearch)
    }

    const logout = () => {
        logoutUser()
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className='h-20 w-full flex justify-evenly items-center relative'>
            {!isSearch &&<Link to='/' className='sm:hidden'>
                <img src={logo} alt="logo"  className='rounded-full ml-1 w-9 h-9' />
            </Link>}
            <Link to='/' className='hidden sm:inline-block'>
                <img src={logo} alt="logo"  className='rounded-full ml-1 w-9 h-9' />
            </Link>
            <div >
                <Link to='/' className='hidden sm:text-lg sm:font-medium sm:p-2 sm:rounded-3xl sm:w-20 sm:flex sm:justify-center sm:items-center hover:bg-black hover:text-white cursor-pointer'>Home</Link>

               {!isSearch&& <Link to='/' className='sm:hidden text-lg font-medium p-2 rounded-3xl  flex justify-center items-center  cursor-pointer'><AiFillHome fontSize={30}/></Link>}
            </div>
            <div >
                <Link to='/today' className='hidden text-lg font-medium p-2 rounded-3xl w-20 sm:flex justify-center items-center hover:bg-black hover:text-white cursor-pointer'>Today</Link>
            </div>
            <button type='button' className='p-1 sm:hidden' onClick={toggleSearch}><FaSearch fontSize={25} /></button>

            {isSearch && <form className='sm:hidden w-3/5 h-12 rounded-3xl border-2 border-gray-200 flex justify-start pl-1' onSubmit={handleSearch} style={{ "backgroundColor": "#efefef" }}>
                <label className='w-full h-full'>
                    <input type="text" value={search} className='h-full w-full px-3 rounded-3xl outline-none' onChange={(e) => setSearch(e.target.value)} style={{ "backgroundColor": "#efefef" }} />
                </label>
            </form>}

            <form className='hidden sm:w-3/5 sm:h-12 sm:rounded-3xl sm:border-2 sm:border-gray-200 sm:flex sm:justify-start sm:pl-1' onSubmit={handleSearch} style={{ "backgroundColor": "#efefef" }}>
                <button type='submit' className='p-1'><FaSearch fontSize={25} /></button>
                <label className='w-full h-full'>
                    <input type="text" value={search} className='h-full w-full px-3 rounded-3xl outline-none' onChange={(e) => setSearch(e.target.value)} style={{ "backgroundColor": "#efefef" }} />
                </label>
            </form>



            <Link to='/createPin' className='p-3 hidden sm:inline-block'><GrAdd fontSize={25} /></Link>
            {!isSearch&&<Link to='/createPin' className='p-3 sm:hidden'><GrAdd fontSize={25} /></Link>}


            <div onClick={toggleProfile} className='p-3 cursor-pointer'>
                {currentPerson?.profile && currentPerson?.profile?.length !== 0 ?
                    <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={currentPerson?.profile}
                        alt="user-profile"
                    />
                    :
                    <div className=' w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "20px", "backgroundColor": "#efefef" }}>{FirstLetterOfUser}</div>
                }
            </div>

            {isClicked && <div className='absolute right-1 top-16 flex flex-col rounded-lg  border-2 border-gray-300 shadow-md z-30' style={{ "backgroundColor": "#fbf6f6" }}>
                <Link to='/userProfile' className='p-2 hover:bg-gray-300 rounded-t-lg'>Your Profile</Link>
                <div className="line"></div>
                <Link to='/delete-account' className='p-2 hover:bg-gray-300' >Delete Account</Link>
                <div className="line"></div>
                <button type='button' className='p-2 hover:bg-gray-300 rounded-b-lg' onClick={logout}>Logout</button>
            </div>}
        </div>
    )
}

export default Navbar