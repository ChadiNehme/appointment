import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const CoachList = () => {
  const { coaches, aToken, getAllCoaches,changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllCoaches()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll '>
      <h1 className='text-lg font-medium'>All Coaches</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6 '>
        {
          coaches.map((item, index) => (
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-56 sm:h-64 md:h-72 lg:h-80 object-cover' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm '>{item.specialty}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CoachList
