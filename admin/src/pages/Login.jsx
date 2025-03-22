//#5F6FFF
import { assets } from '../assets/assets_admin/assets'
import { useState } from 'react'
const Login = () => {

  const [state, setState] = useState('Admin')

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-[#5F6FFF]'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input  className='border border-[#DADADA] rounded w-full p-2 mt-1'  type="password" required />
        </div>

        <button className='bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state === 'Admin'
          ? <p>Coach Login? <span className='cursor-pointer text-[#5F6FFF] underline' onClick={()=>setState('Coache')}>Click here</span></p>
          : <p>Admin Login? <span className='cursor-pointer text-[#5F6FFF] underline' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
