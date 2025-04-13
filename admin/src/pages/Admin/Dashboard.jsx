import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, cancelAppointment, dashboardData, getDashboardData } = useContext(AdminContext)

  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashboardData()
    }
  }, [aToken])

  return dashboardData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>


        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.coaches}</p>
            <p className='text-gray-400 '>Coaches </p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.appointments}</p>
            <p className='text-gray-400 '>Appointments </p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.users}</p>
            <p className='text-gray-400 '>Users </p>
          </div>
        </div>

      </div>

      <div className='bg-white '>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashboardData.latestAppointment.map((appointment, index) => {
              return (
                <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
                  <img className='size-14 rounded-full object-cover' src={appointment.coachData.image} alt="" />
                  <div className='flex-1 text-sm'>
                    <p className='text-gray-600 font-semibold'>{appointment.coachData.name}</p>
                    <p className='text-gray-400 text-sm'>{slotDateFormat(appointment.slotDate)}</p>

                  </div>
                  {
                    appointment.cancelled
                      ? <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                      : <img onClick={() => cancelAppointment(appointment._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
