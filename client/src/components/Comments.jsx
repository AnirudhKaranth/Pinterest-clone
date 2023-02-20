import React from 'react'
import { useAppContext } from '../context/appContext'
import {AiTwotoneDelete} from 'react-icons/ai'
import ReactTimeAgo from 'react-time-ago'

const Comments = ({ comment }) => {
  
  const {user_id, DeleteComment, pin} = useAppContext()
  const {_id} = pin;
  const { UserID, commentedBy, commentBody, commentedOn, _id:cId, profileImage } = comment
  const FirstLetterOfUser = commentedBy?.split("")[0]
  
  // const createdDate = new Date(commentedOn).toLocaleDateString('en-gb')
  const commentDate = new Date(commentedOn)
  // console.log(commentDate)
  
  const deleteComment = () => {
    
    DeleteComment(_id, cId)
  }

  return (
    <div className='flex flex-col mb-5'>
      <div className='flex gap-2 items-center'>
        {profileImage && profileImage?.length !== 0 ?
          <img
          className="w-8 h-8 rounded-full object-cover"
          src={profileImage}
          alt="user-profile"
          />
          :
          <div className=' w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "20px", "backgroundColor": "#efefef" }}>{FirstLetterOfUser}</div>
        }
        <div className='flex'>
          <div >
            <div><span className='mr-1 font-medium'>{commentedBy} </span> {commentBody}</div>
          </div>
        </div>
      </div>
      <div className='flex justify-between ml-4 mr-2 mt-1'>
        <div className='text-sm'>

        <ReactTimeAgo date={commentDate} locale="en-US"/>
        </div>
        {
          UserID === user_id && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteComment();
              }}
              className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
            >
              <AiTwotoneDelete/>
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Comments