import React, { useState } from 'react'
import Navbar from './Navbar'
import { GrUploadOption } from "react-icons/gr";
import FileBase64 from 'react-file-base64'
import './createPin.css'
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';
import Alert from './Alert';
import Spinner from './Spinner'

const CreatePin = () => {
  const { user, user_id, createPin, showAlert, isLoading } = useAppContext();

  const [image, setImage] = useState("")
  const [title, setTitle] = useState("")
  const [about, setAbout] = useState("")
  const [altText, setAltText] = useState("")
  const [isAltText, setIsAltText] = useState(false)
  const [destination, setDestination] = useState("")

  const FirstLetterOfUser = user.split("")[0]

  const toggleAltText = () => {
    setIsAltText(!isAltText)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const Pin = { title, about, image, altText, destination, createdBy: user_id }

    let pinCreated = createPin(Pin);
    if (pinCreated) {
      setAbout("")
      setTitle("")
      setImage("")
      setDestination("")
      setAltText("")
    }
    else {
      return;
    }

  }
  return (
    <div className='h-screen relative' >
      <Navbar />
      {showAlert &&
        <div className='w-full absolute'>
          <Alert/>
          {isLoading && <Spinner message={"Loading"} />}
        </div>}
      <div className=' h-full w-full flex  items-start justify-center ' style={{ "backgroundColor": "#efefef" }}>

        <form className='flex flex-col h-full w-full my-1 mx-1 sm:hidden  bg-white rounded-sm' onSubmit={handleSubmit}>
          <div className=' h-1/2 rounded-l-xl flex flex-col items-center justify-center'>
            <div className='rounded-xl h-full m-1 flex items-center justify-center' style={{ "backgroundColor": "#efefef" }}>
              {image.length === 0 ?
                <div className='flex justify-center mx-4 items-center flex-col border-2  border-dotted border-gray-300 p-3 rounded-xl w-full' style={{ "height": "94%" }}>
                  <div className='w-full h-full flex flex-col items-center justify-center'>
                    <label className='w-full h-full flex flex-col items-center justify-center'>
                      <div className='input-file'>
                        <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setImage(base64)} />
                      </div>
                      <div>
                        <GrUploadOption fontSize={30} />
                      </div>
                      <div className='text-xl px-10 flex items-center justify-center text-center mt-4'>
                        Click to upload
                      </div>
                    </label>
                  </div>
                </div>
                :
                <img src={image} alt={altText} style={{ "minHeight": "100%", "minWidth": "100%", "maxWidth": "100%", "maxHeight": "100%" }} />
              }
            </div>
          </div>
          <div className='w-full h-1/2 flex flex-col justify-evenly'>
            <div className='text-xl font-semibold w-4/5 m-1'>
              <label htmlFor="title" className='px-2 text-lg'>Title</label>
              <input type="text" name="title" placeholder='Add your title' className=' w-full outline-none px-2  text-black ' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='w-full m-1 mt-2'>
              <label htmlFor="about" className='px-2 font-medium '>About</label>
              <input type="text" name="about" placeholder='Say more about your Pin' className='mx-1 w-full outline-none px-1 text-black ' value={about} onChange={(e) => setAbout(e.target.value)} />
            </div>
            <div className='w-full m-1 mt-2'>
              <label htmlFor="altText" className='px-1 font-medium '>Alt text</label>
              <input type="text" name="altText" placeholder="Describe your Pin's visual details" className=' w-full outline-none px-1 text-black ' value={altText} onChange={(e) => setAltText(e.target.value)} />
            </div>
            <div className='w-full m-1 mt-2 '>
              <label htmlFor="altText" className='px-1 font-medium '>Destination link</label>
              <input type="text" name="destination" placeholder='Add a destination link' className='mb-2 px-1 w-full outline-none text-black' value={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className='w-full flex justify-center items-center'>
              <div className='mt-1 h-10 rounded-3xl' style={{ "backgroundColor": "#efefef", "width": "75%" }}>
                <button type='submit' className='w-full h-full hover:bg-gray-300 rounded-3xl '>Submit</button>
              </div>
            </div>
          </div>
        </form>







        <form className='hidden h-5/6  mt-10 sm:flex lg:hidden  bg-white rounded-xl' style={{ "width": "95%" }} onSubmit={handleSubmit}>
          <div className='w-1/2 h-full rounded-l-xl flex flex-col items-center justify-center'>
            <div className='rounded-xl flex items-center justify-center' style={{ "height": "80%", "width": "75%", "backgroundColor": "#efefef" }}>
              {image.length === 0 ?
                <div className='flex justify-center mx-4 items-center flex-col border-2  border-dotted border-gray-300 p-3 rounded-xl w-full' style={{ "height": "94%" }}>
                  <div className='w-full h-full flex flex-col items-center justify-center'>
                    <label className='w-full h-full flex flex-col items-center justify-center'>
                      <div className='input-file'>
                        <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setImage(base64)} />
                      </div>
                      <div>
                        <GrUploadOption fontSize={30} />
                      </div>
                      <div className='text-xl px-10 flex items-center justify-center text-center mt-4'>
                        Drag and drop or click to upload
                      </div>
                    </label>
                  </div>
                </div>
                :
                <img src={image} alt={altText} style={{ "minHeight": "100%", "minWidth": "100%", "maxWidth": "100%", "maxHeight": "100%" }} />
              }
            </div>
            <div className='mt-2 rounded-3xl' style={{ "backgroundColor": "#efefef", "width": "75%" }}>
              <button type='submit' className='w-full h-full hover:bg-gray-300 rounded-3xl py-3'>Submit</button>
            </div>
          </div>
          <div className='w-1/2 h-full flex flex-col'>
            <div className='w-full h-3/5 mt-16'>
              <div className='text-4xl font-bold w-4/5 mb-4'>
                <input type="text" name="title" placeholder='Add your title' className='mb-2 w-full outline-none p-2 pb-2 text-black h-full' value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="line-1 "></div>
              </div>
              <div className='flex mt-10 items-center '>
                <Link to='/userProfile' className=' w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "22px", "backgroundColor": "#efefef" }}>{FirstLetterOfUser}</Link>
                <div className='ml-3 font-medium'>{user}</div>
              </div>
              <div className='w-4/5 mt-10'>
                <input type="text" name="about" placeholder='Tell everyone what your Pin is about' className='mb-2 w-full outline-none p-2 pb-2 text-black h-full' value={about} onChange={(e) => setAbout(e.target.value)} />
                <div className="line-1 "></div>
                {!isAltText ?
                  <div className='mt-5 w-28 h-10 rounded-3xl' style={{ "backgroundColor": "#efefef" }}>
                    <button type='button' className='w-full h-full rounded-3xl hover:bg-gray-300' onClick={toggleAltText}>Add alt text</button>
                  </div>
                  :
                  <div className='w-full mt-8'>
                    <input type="text" name="altText" placeholder='Explain what people can see in the pin' className='mb-2 w-full outline-none py-2 pb-2 text-black h-full' value={altText} onChange={(e) => setAltText(e.target.value)} />
                    <div className="line-1 "></div>
                  </div>}
              </div>
            </div>
            <div className='mt-14 w-full'>
              <div className='text-xl w-4/5 mb-4'>
                <input type="text" name="destination" placeholder='Add a destination link' className='mb-2 w-full outline-none py
                -2 pb-2 text-black h-full' value={destination} onChange={(e) => setDestination(e.target.value)} />
                <div className="line-1 "></div>
              </div>
            </div>
          </div>
        </form>


        <form className='hidden h-5/6 w-3/5 mt-10 lg:flex  bg-white rounded-xl' onSubmit={handleSubmit}>
          <div className='w-1/2 h-full rounded-l-xl flex flex-col items-center justify-center'>
            <div className='rounded-xl flex items-center justify-center' style={{ "height": "80%", "width": "75%", "backgroundColor": "#efefef" }}>
              {image.length === 0 ?
                <div className='flex justify-center mx-4 items-center flex-col border-2  border-dotted border-gray-300 p-3 rounded-xl w-full' style={{ "height": "94%" }}>
                  <div className='w-full h-full flex flex-col items-center justify-center'>
                    <label className='w-full h-full flex flex-col items-center justify-center'>
                      <div className='input-file'>
                        <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setImage(base64)} />
                      </div>
                      <div>
                        <GrUploadOption fontSize={30} />
                      </div>
                      <div className='text-xl px-10 flex items-center justify-center text-center mt-4'>
                        Drag and drop or click to upload
                      </div>
                    </label>
                  </div>
                </div>
                :
                <img src={image} alt={altText} style={{ "minHeight": "100%", "minWidth": "100%", "maxWidth": "100%", "maxHeight": "100%" }} />
              }
            </div>
            <div className='mt-2 rounded-3xl' style={{ "backgroundColor": "#efefef", "width": "75%" }}>
              <button type='submit' className='w-full h-full hover:bg-gray-300 rounded-3xl py-3'>Submit</button>
            </div>
          </div>
          <div className='w-1/2 h-full flex flex-col'>
            <div className='w-full h-3/5 mt-16'>
              <div className='text-4xl font-bold w-4/5 mb-4'>
                <input type="text" name="title" placeholder='Add your title' className='mb-2 w-full outline-none p-2 pb-2 text-black h-full' value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="line-1 "></div>
              </div>
              <div className='flex mt-10 items-center '>
                <Link to='/userProfile' className=' w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "22px", "backgroundColor": "#efefef" }}>{FirstLetterOfUser}</Link>
                <div className='ml-3 font-medium'>{user}</div>
              </div>
              <div className='w-4/5 mt-10'>
                <input type="text" name="about" placeholder='Tell everyone what your Pin is about' className='mb-2 w-full outline-none p-2 pb-2 text-black h-full' value={about} onChange={(e) => setAbout(e.target.value)} />
                <div className="line-1 "></div>
                {!isAltText ?
                  <div className='mt-5 w-28 h-10 rounded-3xl' style={{ "backgroundColor": "#efefef" }}>
                    <button type='button' className='w-full h-full rounded-3xl hover:bg-gray-300' onClick={toggleAltText}>Add alt text</button>
                  </div>
                  :
                  <div className='w-full mt-8'>
                    <input type="text" name="altText" placeholder='Explain what people can see in the pin' className='mb-2 w-full outline-none py-2 pb-2 text-black h-full' value={altText} onChange={(e) => setAltText(e.target.value)} />
                    <div className="line-1 "></div>
                  </div>}
              </div>
            </div>
            <div className='mt-14 w-full'>
              <div className='text-xl w-4/5 mb-4'>
                <input type="text" name="destination" placeholder='Add a destination link' className='mb-2 w-full outline-none py
                -2 pb-2 text-black h-full' value={destination} onChange={(e) => setDestination(e.target.value)} />
                <div className="line-1 "></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePin