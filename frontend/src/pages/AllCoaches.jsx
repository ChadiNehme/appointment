import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
const AllCoaches = () => {
  const navigate = useNavigate()
  const [filterCoach, setFilterCoach] = useState([])
  const { coaches, setCoaches, courses } = useContext(AppContext)
  const [showFilter, setShowFilter] = useState(false)
  const { backendUrl } = useContext(AppContext)

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCourseId = searchParams.get('course')

  const handleCourseClick = (id) => {
    if (selectedCourseId === id) {
      // If the same course is clicked again, clear the filter
      setSearchParams({})
    } else {
      setSearchParams({ course: id })
    }
  }
  useEffect(() => {
    console.log(coaches);


  }, [])

  const filteredCoaches = selectedCourseId
    ? coaches.filter(coach =>
      coach.course?.includes(selectedCourseId)
    )
    : coaches
  return (
    <div>
      <p className='text-gray-600'>Explore Our Coaches' Specialties</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-[#5f6FFF] text-white" : ""}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
        

          <h2 className="text-lg font-semibold text-gray-700 mb-2">Courses</h2>
          <div className="flex sm:flex-col flex-wrap gap-2">
            {courses.map(course => (
              <button
                key={course._id}
                onClick={() => handleCourseClick(course._id)}
                className={`px-4 py-1.5 rounded-full border text-sm transition-all duration-300
        ${selectedCourseId === course._id
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-100'
                  }`}
              >
                {course.name}
              </button>
            ))}
          </div>



        </div>
        <div className='w-full flex flex-wrap gap-4 p-5 px-3 sm:px-0 items-center justify-center'>
          {filteredCoaches.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='w-80 md:w-96 h-[450px] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 sm:w-1/2 md:w-1/3  lg:w-1/4' key={index}>
              <img className='bg-blue-50 w-full h-80  rounded-t-xl object-cover' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                  <p className={`size-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}  rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.specialty}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllCoaches
