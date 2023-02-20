import React from 'react'
import { useAppContext } from '../context/appContext'

const Alert = () => {
    const {alertMsg, alertColor} = useAppContext()
  
    let alertClass;
    if(alertColor==='danger'){
        alertClass='h-16 w-full bg-red-300 flex justify-center items-center'
    }
    else{
        alertClass='h-16 w-full bg-green-300 flex justify-center items-center'
    }
  return (
    <div className={alertClass}>
        {alertMsg}
    </div>
  )
}

export default Alert