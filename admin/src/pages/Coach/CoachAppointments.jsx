import React, { useContext, useEffect } from 'react'
import { CoachContext } from '../../context/CoachContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const CoachAppointments = () => {
  const { backendUrl, cToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(CoachContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  useEffect(() => {
    if (cToken) {
      getAppointments()
    }
  }, [cToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Student</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>

        </div>

        {appointments.reverse().map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='size-8 rounded-full object-cover' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
            </div>
            <div>
              <p className='text-xs inline border border-[#5F6FFF] px-2 rounded-full '>
                {item.payment ? 'Online' : 'Cash'}
              </p>
            </div>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled
                ?
                <p className='text-red-500'>Cancelled</p>
                :
                item.isCompleted ?
                  <p className='text-green-500'>Completed</p>
                  :
                  <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
            }

          </div>
        ))}
      </div>
    </div>
  )
}

export default CoachAppointments
