import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import MasonryLayout from './MasonryLayout'
import Navbar from './Navbar'
import { WhatsappIcon, WhatsappShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, EmailIcon, EmailShareButton, TwitterIcon, TwitterShareButton, LinkedinIcon, LinkedinShareButton } from 'react-share'
import './userProfile.css'
import Spinner from './Spinner'

const CreatorProfile = () => {
  const { pins, getAllPins, pinCreator, getPinCreator, isLoading } = useAppContext()
  const { id } = useParams()
  const [isShare, setIsShare] = useState(false)
  const [isSaved, setIsSaved] = useState(true)

  const FirstLetterOfUser = pinCreator?.name?.split("")[0];

  const savedPins = pins.filter((pin) => {
    for (let i = 0; i < pin?.savedBy?.length; i++) {
      return pin?.savedBy[i]._id === id
    }
  })

  const createdPins = pins.filter((pin) => { return pin.createdBy === id })

  const toggleShare = () => {
    setIsShare(!isShare)
  }

  const toggleCreated = () => {
    setIsSaved(false)
  }

  const toggleSaved = () => {
    setIsSaved(true)
  }
  console.log(pinCreator)

  useEffect(() => {
    getAllPins()
    getPinCreator(id)
  }, [])


  return (
    <div className='h-screen'>
      <Navbar />
      {isLoading && <Spinner message={"message"}/>}
      <div className='flex flex-col justify-start items-center w-full h-full relative '>
        <div className=' w-full flex flex-col items-center px-4 pt-4'>
          {pinCreator?.profile && pinCreator?.profile?.length !== 0 ?
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={pinCreator?.profile}
              alt="user-profile"
            />
            :
            <div className=' w-28 h-28 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "40px", "backgroundColor": "#efefef" }}>{FirstLetterOfUser}</div>}
          <div className='text-4xl font-medium m-3'>{pinCreator?.name}</div>
          <div className='flex flex-col items-center justify-center'>
            <a href={`${pinCreator?.website}`} target="_blank" rel="noreferrer">{pinCreator?.website}</a>
            <div>{pinCreator?.about}</div>
          </div>
          <div className='flex items-center justify-around my-3'>
            <div className=' flex items-center justify-center w-20 h-12 rounded-3xl mx-2' style={{ "backgroundColor": "#efefef" }}>
              <button type='button' className='w-full h-full hover:bg-gray-300 rounded-3xl' onClick={toggleShare}>Share</button>
            </div>

          </div>
        </div>

        <div className='middle-One flex items-center justify-center w-full'>
          <div className='m-3'>
            <div className='font-semibold cursor-pointer' onClick={toggleCreated}>Created</div>
            {!isSaved && <div className='line-one'></div>}
          </div>
          <div>
            <div className='font-semibold cursor-pointer' onClick={toggleSaved}>Saved</div>
            {isSaved && <div className='line-one'></div>}
          </div>
        </div>


        <div className='w-full mt-12'>
          {
            isSaved ?
              <div className='w-full '>
                {savedPins.length === 0 ?
                  <div className='text-3xl font-medium flex items-center justify-center'>
                    No Pins has been saved!
                  </div>
                  :
                  <MasonryLayout Pins={savedPins} />
                }
              </div>
              :
              <div className='w-full flex items-center justify-center'>
                {createdPins.length === 0 ?
                  <div className='text-3xl font-medium'>
                    No Pins has been created
                  </div>
                  :
                  <MasonryLayout Pins={createdPins} />
                }
              </div>
          }
        </div>

        {isShare && <div className='absolute top-64  bg-white w-80 flex justify-around p-2 rounded-xl shadow-lg border-2 border-gray-100 '>
          <WhatsappShareButton url={`https://pinterest-clone-ani.netlify.app/creatorProfile/${id}`}>
            <WhatsappIcon size={42} round={true} />
          </WhatsappShareButton>

          <TwitterShareButton url={`https://pinterest-clone-ani.netlify.app/creatorProfile/${id}`}>
            <TwitterIcon size={42} round={true} />
          </TwitterShareButton>

          <FacebookShareButton url={`https://pinterest-clone-ani.netlify.app/creatorProfile/${id}`}>
            <FacebookIcon size={42} round={true} />
          </FacebookShareButton>

          <EmailShareButton url={`https://pinterest-clone-ani.netlify.app/creatorProfile/${id}`}>
            <EmailIcon size={42} round={true} />
          </EmailShareButton>

          <LinkedinShareButton url={`https://pinterest-clone-ani.netlify.app/creatorProfile/${id}`}>
            <LinkedinIcon size={42} round={true} />
          </LinkedinShareButton>

          <TelegramShareButton url={`https://pinterest-clone-ani.netlify.app/creatorProfile/${id}`}>
            <TelegramIcon size={42} round={true} />
          </TelegramShareButton>

        </div>}
      </div>
    </div>
  )
}

export default CreatorProfile