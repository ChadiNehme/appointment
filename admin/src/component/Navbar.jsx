import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { CoachContext } from '../context/CoachContext'
const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { cToken, setCToken } = useContext(CoachContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    cToken && setCToken('')
    cToken && localStorage.removeItem('cToken')
    
  }



  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='size-[50px] cursor-pointer' src={assets.taktiklablogo} alt="" loading='lazy' />
        <h3 className='text-2xl font-bold'>Taktik<span className='text-[#5f6FFF]'>Lab</span></h3>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500'>{aToken ? 'Admin' : 'Coach'}</p>
      </div>
      <button onClick={logout} className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
