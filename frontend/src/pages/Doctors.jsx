import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Explore Our Coaches' Specialties</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-[#5f6FFF] text-white" : ""}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
          <p onClick={() => speciality === 'Scratch' ? navigate('/coaches') : navigate('/coaches/Scratch')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Scratch" ? 'bg-indigo-100 text-black' : ''}`}>Scratch</p>
          <p onClick={() => speciality === 'Java' ? navigate('/coaches') : navigate('/coaches/Java')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Java" ? 'bg-indigo-100 text-black' : ''}`}>Java</p>
          <p onClick={() => speciality === 'Arduino' ? navigate('/coaches') : navigate('/coaches/Arduino')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Arduino" ? 'bg-indigo-100 text-black' : ''}`}>Arduino</p>
         
          <p onClick={() => speciality === 'Web Programming' ? navigate('/coaches') : navigate('/coaches/Web Programming')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Web Programming" ? 'bg-indigo-100 text-black' : ''}`}>Web Programming</p>
         
          </div>
        <div className='w-full flex flex-wrap gap-4 p-5 px-3 sm:px-0 items-center justify-center'>
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='w-80 md:w-96 h-[450px] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 sm:w-1/2 md:w-1/3  lg:w-1/4' key={index}>
            <img className='bg-blue-50 w-full h-80  rounded-t-xl object-cover' src={item.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <p className='size-2 bg-green-500 rounded-full'></p><p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>

            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
