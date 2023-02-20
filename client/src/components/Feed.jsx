import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
    const {pins, getAllPins,isLoading } = useAppContext()
 
    useEffect(() => {
      getAllPins()
     
    }, [])
    
  return (
    <div>
      {isLoading && <Spinner message="Loading"/>}
        <MasonryLayout Pins={pins}/>
    </div>
  )
}

export default Feed