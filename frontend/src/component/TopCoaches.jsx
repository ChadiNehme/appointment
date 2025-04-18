import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopCoaches = () => {
  const { coaches } = useContext(AppContext)

  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium '>Meet Our Expert Coaches</h1>
      <div className='w-full flex flex-wrap gap-4 p-5 px-3 sm:px-0 items-center justify-center'>
        {coaches.slice(0, 10).map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='w-80 md:w-96 h-[450px] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 sm:w-1/2 md:w-1/3  lg:w-1/4' key={index}>
            <img className='bg-blue-50 w-full h-80  rounded-t-xl object-cover' src={item.image} alt="" />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm text-center ${item.available?'text-green-500':'text-gray-500'} `}>
                <p className={`size-2 ${item.available ?'bg-green-500':'bg-gray-500'}  rounded-full`}></p><p>{item.available?'Available':'Not Available'}</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TopCoaches
