import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate(); 
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
      {/* <----------left side banner-----------> */}
        <div className='flex-1 py-6 sm:py-8 md:py-10 lg:py-12 lg:p1-5'>
             <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-emibold text-white'>
                <p>Book Appointment</p>
                <p className='mt-4'>Get the care you deserve with certified and compassionate doctors</p>
             </div>
             <button onClick={()=>{navigate('/login'); scrollTo(0,0);}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition'>Create Acount</button>
        </div>
        {/* <----------right side banner-----------> */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner
