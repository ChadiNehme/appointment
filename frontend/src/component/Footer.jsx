import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { PiFacebookLogoBold } from "react-icons/pi";
const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-40 text-sm'>

        <div>
          {/* <img className='mb-5 w-40' src={assets.taktiklablogo} alt="" /> */}
          <div onClick={() => { navigate('/'); scrollTo(0, 0) }} className='flex items-center cursor-pointer'>
            <img className='size-[50px] cursor-pointer' src={assets.taktiklablogo} alt="" loading='lazy' />
            <h3 className='text-2xl font-bold'>Taktik<span className='text-[#5f6FFF]'>Lab</span></h3>
          </div>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            At Taktik Lab, we believe in the power of community and innovation. Join us to connect with
            like-minded creative individuals, gain new skills, and transform your ideas into reality.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://www.facebook.com/share/1L1k4cU4wZ/?mibextid=wwXIfr" target='_blank' rel='noopner noreferrer'><PiFacebookLogoBold cursor="pointer" size="40px" /></a>
            <a href="https://www.instagram.com/taktiklablb?igsh=aTFuaHV2c2Z0aGRr" target='_blank' rel='noopner noreferrer'> <FaInstagram cursor="pointer" size="40px" /></a>
            <a href="https://www.linkedin.com/company/taktiklablb/" target='_blank' rel='noopner noreferrer'><PiLinkedinLogoBold cursor="pointer" size="40px" /></a>

          </div>
        </div>

        <div >
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
            <li onClick={() => { navigate('/'); scrollTo(0, 0) }}>Home</li>
            <li onClick={() => { navigate('/about'); scrollTo(0, 0) }}>About us</li>

          </ul>

        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><a href="tel:96171201299">96171201299</a></li>
            <li><a href="mailto:taktiklablb@gmail.com" target="_blank">taktiklablb@gmail.com</a>
            </li>
          </ul>

        </div>



      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright {new Date().getFullYear()} ©  ALL Right Reserved.</p>
      </div>
    </div>

  )
}

export default Footer
