import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Coaches = () => {
  const { speciality } = useParams()
  const { courseId } = useParams()
  const [filterCoach, setFilterCoach] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  const { coaches, setCoaches } = useContext(AppContext)


  const { backendUrl } = useContext(AppContext)
  // useEffect(() => {
  //   const fetchCoaches = async () => {
  //     try {
  //       const { data } = await axios.get(backendUrl + `/api/courses/${courseId}/coaches`);
  //       if (data.success) {
  //         setFilterCoach(data.coaches);
  //         console.log(data.coaches);

  //       } else {
  //         toast.error(data.message || "Failed to load coaches");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching coaches:", err);
  //       toast.error("Something went wrong fetching coaches");
  //     }
  //   };

  //   fetchCoaches();
  // }, [backendUrl]);

  const applyFilter = async () => {
    if (speciality) {
      setFilterCoach(coaches.filter(doc => doc.speciality === speciality))
    } else if (courseId) {
      setFilterCoach(coaches.filter(doc => doc.courseId === courseId))
      try {
        const { data } = await axios.get(backendUrl + `/api/courses/${courseId}/coaches`);
        if (data.success) {
          setFilterCoach(data.coaches);
          console.log(data.coaches);

        } else {
          toast.error(data.message || "Failed to load coaches");
        }
      } catch (err) {
        console.error("Error fetching coaches:", err);
        toast.error("Something went wrong fetching coaches");
      }
    } else {
      setFilterCoach(coaches)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [coaches, speciality])

  return (
    <div>
      <p className='text-gray-600'>Explore Our Coaches' Specialties</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-[#5f6FFF] text-white" : ""}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
          {/* <p onClick={() => speciality === 'Scratch' ? navigate('/coaches') : navigate('/coaches/Scratch')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Scratch" ? 'bg-indigo-100 text-black' : ''}`}>Scratch</p>
          <p onClick={() => speciality === 'Java' ? navigate('/coaches') : navigate('/coaches/Java')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Java" ? 'bg-indigo-100 text-black' : ''}`}>Java</p>
          <p onClick={() => speciality === 'Arduino' ? navigate('/coaches') : navigate('/coaches/Arduino')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Arduino" ? 'bg-indigo-100 text-black' : ''}`}>Arduino</p>
          <p onClick={() => speciality === 'Web Programming' ? navigate('/coaches') : navigate('/coaches/Web Programming')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Web Programming" ? 'bg-indigo-100 text-black' : ''}`}>Web Programming</p> */}



        </div>
        <div className='w-full flex flex-wrap gap-4 p-5 px-3 sm:px-0 items-center justify-center'>
          {filterCoach.map((item, index) => (
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

export default Coaches
