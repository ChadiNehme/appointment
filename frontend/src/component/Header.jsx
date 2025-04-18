import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate,Link } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-[#5f6FFF] rounded-2xl px-6 md:px-10 lg:px-16 py-12 md:py-20 flex items-center justify-center text-white text-center md:text-left">
  <div className="max-w-3xl w-full flex flex-col gap-6 items-center md:items-start">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
      Discover Your Learning Journey <br /> One Path at a Time
    </h1>
    <p className="text-sm md:text-base font-light max-w-xl">
      Explore paths, dive into courses, and connect with expert coaches to master new skills.
    </p>
    <Link
      to="/paths"
      className="flex items-center gap-2 bg-white px-6 py-3 rounded-full text-black text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300"
    >
      Explore Paths
      <img className="w-3" src={assets.arrow_icon} alt="" />
    </Link>
  </div>
</div>

  )
}

export default Header
