import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BsShareFill } from "react-icons/bs";
import Navbar from './Navbar'
import { useAppContext } from '../context/appContext';
import { MdDownloadForOffline } from 'react-icons/md';
import { WhatsappIcon, WhatsappShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, EmailIcon, EmailShareButton, TwitterIcon, TwitterShareButton, LinkedinIcon, LinkedinShareButton } from 'react-share'
import { IoMdSend } from "react-icons/io";
import Comments from './Comments';
import Spinner from './Spinner';

const PinDetails = () => {
  const { id } = useParams();
  const { pin, getPinDetails, saveThePin, user_id, currentPerson, getCurrentUser, AddComment, isLoading } = useAppContext()
  const { image, createdBy, about, _id, destination, userName, profile, title, comments } = pin
  const [isShare, setIsShare] = useState(false)
  const [savingPost, setSavingPost] = useState(false);
  const [commentBody, setCommentBody] = useState("");


  let alreadySaved = !!pin?.savedBy?.filter((Pin) => Pin._id === user_id).length
  const FirstLetterOfCreator = userName?.split("")[0]

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true)
      saveThePin(id)
      setSavingPost(false)
    }
  }

  const toggleShare = () => {
    setIsShare(!isShare)
  }

  const handleComment = (e) => {
    e.preventDefault()
    const comment = { commentBody, profileImage: currentPerson?.profile }
    AddComment(comment, id)

    setCommentBody("")
  }

  useEffect(() => {
    getPinDetails(id);
    getCurrentUser()
  }, [])


  return (
    <div className='h-screen'>
      <Navbar />
      {isLoading && <Spinner message={"Loading"}/>}
      <div className="h-full w-full  flex justify-center items-start">

        <div className=" border-2 border-gray-200 rounded-2xl shadow-lg mt-8 sm:hidden flex flex-col relative" style={{ "height": "100%", "width": "100%" }}>
          <div className="w-full h-1/2  flex justify-center items-center">
            <div className=' ' style={{ "height": "98%", "width": "97%" }}>
              <img src={pin?.image} alt={pin?.altText} style={{ "minHeight": "100%", "minWidth": "100%", "maxHeight": "100%", "maxWidth": "100%" }} className=' ' />
            </div>
          </div>

          <div className="w-full h-1/2 ">
            <div className=' flex items-end h-12 shadow-sm'>
              <div className='w-full flex justify-between ml-2 mb-2'>
                <div className='flex gap-3'>
                  <div className='flex '>
                    <a
                      href={`${image}`}
                      download
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className=" rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                    ><MdDownloadForOffline fontSize={30} />
                    </a>
                  </div>
                  <button type='button' onClick={toggleShare}><BsShareFill fontSize={25} /></button>
                </div>

                <div className='mx-2'>
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
              </div>
            </div>


            <div className='flex  pl-2 items-center justify-center overflow-auto scroll-auto' style={{ "height": "67%", "widows": "100%" }}>
              <div className='flex flex-col' style={{ "height": "100%", "width": "95%" }}>
                <div className='mb-2'>
                  {destination?.slice(8).length > 0 ? (
                    <a
                      href={destination}
                      target="_blank"
                      className=" flex items-center hover:underline text-black "
                      rel="noreferrer"
                    >
                      {' '}
                      {destination}...
                    </a>
                  ) : undefined}
                </div>
                <div className='text-4xl font-semibold mb-5'>
                  {title}
                </div>
                <div className='mb-5'>
                  {about}
                </div>
                <div className='flex items-center gap-3 justify-start mb-3'>
                  {profile?.length === 0 ?
                    <div className=' w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "20px", "backgroundColor": "#efefef" }}>{FirstLetterOfCreator}</div>
                    :
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={profile}
                      alt="user-profile"
                    />
                  }
                  <div className="font-semibold capitalize">{userName}</div>
                </div>
                <div className='mt-2 flex flex-col'>
                  <div className=' mb-4 text-xl font-medium'>
                    {comments?.length} comments
                  </div>
                  {comments?.length === 0 ?
                    <div className='mt-2 ml-1'>
                      No comments yet. Add one to start the conversation.
                    </div>
                    :
                    <div className='mt-2 ml-1'>
                      {
                        comments?.map((comment) => {
                          return <Comments key={comment?._id} comment={comment} />
                        })
                      }
                    </div>}
                </div>

              </div>
            </div>



            <div className='flex items-center justify-center' >
              <div className='flex gap-2 items-center h-12' style={{ "width": "97%" }}>
                {currentPerson?.profile?.length === 0 ?
                  <div className=' w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "20px", "backgroundColor": "#efefef" }}>{FirstLetterOfCreator}</div>
                  :
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={currentPerson?.profile}
                    alt="user-profile"
                  />
                }
                <form className='h-full flex items-center gap-2' style={{ width: "85%" }} onSubmit={handleComment}>
                  <input type="text" value={commentBody} className="rounded-3xl outline-none p-3 border-2 border-gray-200" onChange={(e) => setCommentBody(e.target.value)} style={{ "width": "90%", "height": "100%", backgroundColor: "#efefef" }} />
                  <button type="submit" className='w-12 h-12 flex items-center justify-center rounded-full' style={{ "backgroundColor": "#efefef" }}><IoMdSend fontSize={25} /> </button>
                </form>
              </div>
            </div>



          </div>
          {isShare && <div className='absolute top-96 bg-white w-80 flex justify-around p-2 rounded-xl shadow-lg border-2 border-gray-100 '>
          <WhatsappShareButton url={`https://pinterest-clone-ani.netlify.app/pinDetail/${id}`}>
            <WhatsappIcon size={42} round={true} />
          </WhatsappShareButton>

          <TwitterShareButton url={`https://pinterest-clone-ani.netlify.app/pinDetail/${id}`}>
            <TwitterIcon size={42} round={true} />
          </TwitterShareButton>

          <FacebookShareButton url={`https://pinterest-clone-ani.netlify.app/pinDetail/${id}`}>
            <FacebookIcon size={42} round={true} />
          </FacebookShareButton>

          <EmailShareButton url={`https://pinterest-clone-ani.netlify.app/pinDetail/${id}`}>
            <EmailIcon size={42} round={true} />
          </EmailShareButton>

          <LinkedinShareButton url={`https://pinterest-clone-ani.netlify.app/pinDetail/${id}`}>
            <LinkedinIcon size={42} round={true} />
          </LinkedinShareButton>

          <TelegramShareButton url={`https://pinterest-clone-ani.netlify.app/pinDetail/${id}`}>
            <TelegramIcon size={42} round={true} />
          </TelegramShareButton>

        </div>}
        </div>























































        <div className=" border-2 border-gray-200 rounded-2xl shadow-lg mt-8 hidden sm:flex relative" style={{ "height": "91%", "width": "70%" }}>
          <div className="w-1/2 h-full rounded-l-2xl flex justify-center items-center">
            <div className='rounded-2xl ' style={{ "height": "98%", "width": "97%" }}>
              <img src={pin?.image} alt={pin?.altText} style={{ "minHeight": "100%", "minWidth": "100%", "maxHeight": "100%", "maxWidth": "100%" }} className=' rounded-2xl' />
            </div>
          </div>



          <div className="w-1/2 h-full rounded-r-2xl">
            <div className=' flex items-end h-24 rounded-tr-2xl shadow-sm'>
              <div className='w-full flex justify-between ml-2 mb-2'>
                <div className='flex gap-3'>
                  <div className='flex '>
                    <a
                      href={`${image}`}
                      download
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className=" rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                    ><MdDownloadForOffline fontSize={30} />
                    </a>
                  </div>
                  <button type='button' onClick={toggleShare}><BsShareFill fontSize={25} /></button>
                </div>

                <div className='mx-2'>
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
              </div>
            </div>


            <div className='flex  pl-2 items-center justify-center overflow-auto scroll-auto' style={{ "height": "67%", "widows": "100%" }}>
              <div className='flex flex-col' style={{ "height": "100%", "width": "95%" }}>
                <div className='mb-2'>
                  {destination?.slice(8).length > 0 ? (
                    <a
                      href={destination}
                      target="_blank"
                      className=" flex items-center hover:underline text-black "
                      rel="noreferrer"
                    >
                      {' '}
                      {destination}...
                    </a>
                  ) : undefined}
                </div>
                <div className='text-4xl font-semibold mb-5'>
                  {title}
                </div>
                <div className='mb-5'>
                  {about}
                </div>
                <div className='flex items-center gap-3 justify-start mb-3'>
                  {profile?.length === 0 ?
                    <div className=' w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "20px", "backgroundColor": "#efefef" }}>{FirstLetterOfCreator}</div>
                    :
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={profile}
                      alt="user-profile"
                    />
                  }
                  <div className="font-semibold capitalize">{userName}</div>
                </div>
                <div className='mt-2 flex flex-col'>
                  <div className=' mb-4 text-xl font-medium'>
                    {comments?.length} comments
                  </div>
                  {comments?.length === 0 ?
                    <div className='mt-2 ml-1'>
                      No comments yet. Add one to start the conversation.
                    </div>
                    :
                    <div className='mt-2 ml-1'>
                      {
                        comments?.map((comment) => {
                          return <Comments key={comment?._id} comment={comment} />
                        })
                      }
                    </div>}
                </div>

              </div>
            </div>



            <div className='flex items-center justify-center rounded-br-2xl' style={{ "height": "17%" }}>
              <div className='flex gap-2 items-center h-12' style={{ "width": "97%" }}>
                {currentPerson?.profile?.length === 0 ?
                  <div className=' w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "20px", "backgroundColor": "#efefef" }}>{FirstLetterOfCreator}</div>
                  :
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={currentPerson?.profile}
                    alt="user-profile"
                  />
                }
                <form className='h-full flex items-center gap-2' style={{ width: "85%" }} onSubmit={handleComment}>
                  <input type="text" value={commentBody} className="rounded-3xl outline-none p-3 border-2 border-gray-200" onChange={(e) => setCommentBody(e.target.value)} style={{ "width": "90%", "height": "100%", backgroundColor: "#efefef" }} />
                  <button type="submit" className='w-12 h-12 flex items-center justify-center rounded-full' style={{ "backgroundColor": "#efefef" }}><IoMdSend fontSize={25} /> </button>
                </form>
              </div>
            </div>



          </div>
          {isShare && <div className='absolute top-24 left-1/2 bg-white w-80 flex justify-around p-2 rounded-xl shadow-lg border-2 border-gray-100 '>
          <WhatsappShareButton url=''>
            <WhatsappIcon size={42} round={true} />
          </WhatsappShareButton>

          <TwitterShareButton url=''>
            <TwitterIcon size={42} round={true} />
          </TwitterShareButton>

          <FacebookShareButton url=''>
            <FacebookIcon size={42} round={true} />
          </FacebookShareButton>

          <EmailShareButton url=''>
            <EmailIcon size={42} round={true} />
          </EmailShareButton>

          <LinkedinShareButton url=''>
            <LinkedinIcon size={42} round={true} />
          </LinkedinShareButton>

          <TelegramShareButton url=''>
            <TelegramIcon size={42} round={true} />
          </TelegramShareButton>

        </div>}
        </div>
      </div>
    </div>
  )
}

export default PinDetails