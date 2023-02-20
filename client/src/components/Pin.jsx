import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { useAppContext } from '../context/appContext';


const Pin = ({ pin }) => {
  const { user_id, saveThePin, DeletePin } = useAppContext()
  const { image, createdBy, _id, destination, userName, profile} = pin
  const navigate = useNavigate();
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  let alreadySaved = !!pin?.savedBy?.filter((Pin) => Pin._id === user_id).length
  const FirstLetterOfCreator = userName.split("")[0]

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true)
      saveThePin(id)
      setSavingPost(false)
    }
  }

  const deletePin = (id) => {

    DeletePin(id)
  }

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pinDetail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
        {image && <img src={image} alt="userPost" className='rounded-lg w-full' />}
        {postHovered &&
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'>
            <div className="flex items-center justify-between">
              <div className='flex gap-2'>
                <a
                  href={`${destination}`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin({ _id });
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {' '}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {
                createdBy === user_id && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                    className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                  >
                    <AiTwotoneDelete />
                  </button>
                )
              }
            </div>
          </div>}

      </div>
      <Link to={`/creatorProfile/${createdBy}`} className="flex gap-2 mt-2 items-center">
        {profile.length === 0?
        <div className=' w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "20px", "backgroundColor": "#efefef" }}>{FirstLetterOfCreator}</div>
        :
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={profile}
          alt="user-profile"
        />
        }
        <p className="font-semibold capitalize">{userName}</p>
      </Link>
    </div>
  )
}

export default Pin