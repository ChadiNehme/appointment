import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { CoachContext } from '../context/CoachContext'
import { SidebarContext } from '../context/SidebarContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'

const SideBar = () => {
  const { aToken } = useContext(AdminContext)
  const { cToken } = useContext(CoachContext)
  const { showSidebar, setShowSidebar } = useContext(SidebarContext)

  const closeSidebar = () => setShowSidebar(false)

  return (
    <>
     
      {/* {showSidebar && <div onClick={closeSidebar} className='fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden'></div>} */}

      <div className={`
  fixed top-0 left-0 z-50 bg-white border-r border-gray-300 min-h-screen
  w-1/2 min-w-[220px] max-w-[400px] overflow-hidden
  transition-transform duration-300 ease-in-out
  ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
  md:translate-x-0 md:static md:block md:w-[260px]
`}>
        <ul className='text-[#515151] mt-5'>
          {aToken && adminLinks(closeSidebar)}
          {cToken && coachLinks(closeSidebar)}
        </ul>
      </div>
    </>
  )
}

const adminLinks = (onClick) => (
  <>
    {navLink('/admin-dashboard', 'Dashboard', onClick)}
    {navLink('/all-appointment', 'Appointment', onClick)}
    {navLink('/add-coach', 'Add Coach', onClick)}
    {navLink('/add-path', 'Add Path', onClick)}
    {navLink('/add-course', 'Add Course', onClick)}
    {navLink('/coach-list', 'Coach List', onClick)}
    {navLink('/join-requests', 'Requests', onClick)}
  </>
)

const coachLinks = (onClick) => (
  <>
    {navLink('/coach-dashboard', 'Dashboard', onClick)}
    {navLink('/coach-appointment', 'Appointment', onClick)}
    {navLink('/coach-profile', 'Profile', onClick)}
    {navLink('/availability-form', 'Availability', onClick)}
  </>
)

const navLink = (to, label, onClick) => (
  <NavLink
    key={to}
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 py-3.5 px-5 w-full overflow-hidden
      ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}
      md:px-9 md:min-w-0`
    }
  >
    <img src={assets.home_icon} alt="" />
    <p className='truncate'>{label}</p>
  </NavLink>
)

export default SideBar
