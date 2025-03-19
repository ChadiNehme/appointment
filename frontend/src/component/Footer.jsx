import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            At Taktik Lab, we believe in the power of community and innovation. Join us to connect with
            like-minded creative individuals, gain new skills, and transform your ideas into reality.
          </p>
        </div>

        <div >
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>

        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>78927501</li>
            <li>chadi@gmail.com</li>
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
