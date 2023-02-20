import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext';
import Navbar from './Navbar'
import Alert from './Alert'
import FileBase64 from 'react-file-base64'
import './createPin.css'

const EditProfile = () => {
  const { user, updateUser, currentPerson, getCurrentUser, showAlert } = useAppContext();
  const Profile = currentPerson?.profile ? currentPerson?.profile : "";
  const About = currentPerson?.about ? currentPerson?.about : "";
  const Website = currentPerson?.website ? currentPerson?.website : "";

  const [profile, setProfile] = useState(Profile)
  const [name, setName] = useState(user)
  const [about, setAbout] = useState(About)
  const [website, setWebsite] = useState(Website)

  const FirstLetterOfUser = user?.split("")[0];

  const handleEditProfile = (e) => {
    e.preventDefault();
    const updatedUser = { profile, name, about, website }
    updateUser(updatedUser)
  }
  useEffect(() => {
    getCurrentUser()

  }, [])


  return (
    <div className='h-screen relative'>
      <Navbar />
      {showAlert &&
        <div className='w-full absolute '>
          <Alert />
        </div>}
      <div className='h-full flex  items-start justify-center '>
        <div className='h-auto w-full sm:w-3/5 md:w-1/2 lg:w-5/12 border-2 sm:border-gray-300 sm:rounded-xl sm:shadow-md mt-5 flex items-center justify-center py-4'>
          <form className=' w-11/12 ' style={{ "height": "90%" }} onSubmit={handleEditProfile}>
            <div className='text-3xl font-semibold mb-8'>
              Public profile
            </div>
            <div className='flex flex-col'>
              <div className='text-sm mb-1'>
                Photo
              </div>
              <div className='flex flex-row items-center'>
                {profile.length === 0 ?
                  <div className=' w-20 mx-2 h-20 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "38px", "backgroundColor": "#efefef" }}>
                    {FirstLetterOfUser}
                  </div>
                  :
                  <div className=' w-20 mx-2 h-20 rounded-full flex justify-center items-center hover:bg-gray-300'>
                    <img src={profile} alt="profile" className='rounded-full' style={{ "maxHeight": "100%", "maxWidth": "100%" }} />
                  </div>}
                <div className='w-auto h-10 rounded-3xl ml-2 cursor-pointer' style={{ "backgroundColor": "#efefef" }}>
                  <label className='w-full flex flex-col items-center justify-center cursor-pointer'>
                    <div className='input-file'>
                      <div className=' py-2 px-3 rounded-3xl hover:bg-gray-300 font-medium'>Change</div>
                      <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setProfile(base64)} />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className='flex flex-col mt-5'>
              <div className='flex flex-col my-2'>
                <label htmlFor="name" className='ml-1'>Name</label>
                <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-gray-300 rounded-lg my-1 mx-0 p-2' />
              </div>

              <div className='flex flex-col my-2'>
                <label htmlFor="about" className='ml-1'>About</label>
                <textarea name="about" id="about" rows="3" placeholder='Tell us about yourself' value={about} onChange={(e) => setAbout(e.target.value)} className='border-2 border-gray-300 rounded-lg my-1 mx-0 p-2'></textarea>
              </div>

              <div className='flex flex-col my-2'>
                <label htmlFor="website" className='ml-1'>Website</label>
                <input type="text" name='website' value={website} placeholder='Add a link to drive traffic to your site' onChange={(e) => setWebsite(e.target.value)} className='border-2 border-gray-300 rounded-lg my-1 mx-0 p-2' />
              </div>
            </div>

            <div className="flex items-center justify-center my-3">
              <div className='w-11/12 border-2 border-green-200 rounded-xl bg-green-300'>
                <button type="submit" className='w-full h-full hover:bg-green-400 p-2 rounded-xl'>Update</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile