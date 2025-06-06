import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken,userData } = useContext(AppContext)



  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }


  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <div onClick={() => navigate('/')} className='flex items-center cursor-pointer'>
        <img className='size-[50px] cursor-pointer' src={assets.taktiklablogo} alt="" loading='lazy' />
        <h3 className='text-2xl font-bold'>Taktik<span className='text-[#5f6FFF]'>Lab</span></h3>
      </div>

      <ul className='hidden md:flex items-start gap-5 font-medium '>
        <NavLink to='/'>
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden ' />
        </NavLink>
        <NavLink to='/paths'>
          <li className='py-1'>Paths</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden ' />
        </NavLink>
        <NavLink to='/coaches'>
          <li className='py-1'>Coaches</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>About</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/join-us'>
          <li className='py-1'>Join Us</li>
          <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token && userData 
            ?
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='size-8 object-cover rounded-full ' src={userData.image} alt="" />
              <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointment</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            :
            <button onClick={() => navigate('/login')} className='bg-[#5f6FFF] cursor-pointer text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* mobile menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className="px-4 py-2 rounded inline-block ">HOME</p> </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/coaches'><p className="px-4 py-2 rounded inline-block "> ALL Coaches</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/paths'><p className="px-4 py-2 rounded inline-block ">PATHS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className="px-4 py-2 rounded inline-block ">ABOUT</p> </NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
