import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenue = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='specialty'>
      <h1 className='text-3xl font-medium'>Choose Your Next Adventure</h1>
      <div className='flex items-center justify-center gap-4 pt-5 w-full overflow-scroll'>
        {specialityData.map((item, index) => (
          <Link onClick={()=>scrollTo(0,0)} key={index} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' to={`/coaches/${item.speciality}`}>
            <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenue
