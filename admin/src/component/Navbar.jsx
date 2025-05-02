import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { CoachContext } from '../context/CoachContext'
import { SidebarContext } from '../context/SidebarContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { cToken, setCToken } = useContext(CoachContext)
  const { setShowSidebar } = useContext(SidebarContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
    if (cToken) {
      setCToken('')
      localStorage.removeItem('cToken')
    }
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white z-50 relative'>
      {/* Left side: Logo & Role */}
      <div className='flex items-center gap-2'>
        <img className='size-[40px] cursor-pointer' src={assets.taktiklablogo} alt="" loading='lazy' />
        <div>
          <h3 className='text-lg font-bold'>Taktik<span className='text-[#5f6FFF]'>Lab</span></h3>
          <p className='text-xs border px-2 py-0.5 rounded-full border-gray-500 w-fit'>
            {aToken ? 'Admin' : 'Coach'}
          </p>
        </div>
      </div>

      {/* Menu Icon (mobile) */}
      <img
        className='w-6 block md:hidden cursor-pointer'
        src={assets.menu_icon}
        alt="menu"
        onClick={() => setShowSidebar(prev => !prev)}
      />

      {/* Logout Button */}
      <button
        onClick={logout}
        className='hidden sm:block bg-[#5F6FFF] text-white text-sm px-6 py-2 rounded-full cursor-pointer'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
