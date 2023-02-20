import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import MasonryLayout from './MasonryLayout'
import Navbar from './Navbar'
import Spinner from './Spinner'

const Today = () => {
    const { pins, getAllPins, isLoading} = useAppContext()

    const updatedPins = pins?.map((pin) => {
        let created = pin?.createdAt?.slice(0,10)
        pin.createdDate = created
        return pin
    })

    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()+1 < 10 ? `${"0"+(today.getMonth()+1)}` :`${(today.getMonth()+1)} `
    const year = today.getFullYear();

    const TodayDate = year+"-"+month+"-"+day
   
    const TodayPins = updatedPins?.filter((pin)=> pin?.createdDate === TodayDate)
    
    useEffect(() => {
        getAllPins()
    }, [])
    return (
        <div className='h-screen'>
            <Navbar />
            <div className='h-full w-full'>
            {isLoading && <Spinner message={"Loading"}/>}
                {TodayPins.length !==0?
                 <MasonryLayout Pins={TodayPins} />
                :
                <div className='w-full flex items-center text-4xl font-medium justify-center mt-10'>
                    <div>
                         No pins today!
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Today