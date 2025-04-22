import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'
const AddCoach = () => {


  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [degree, setDegree] = useState('')
  const [courses, setCourses] = useState([]);

  const [selectedCourses, setSelectedCourses] = useState([]);

  const { backendUrl, aToken } = useContext(AdminContext)



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/all-courses`, {
          headers: { aToken }
        });
        if (res.data.success) {
          setCourses(res.data.courses); // Adjust based on your API response shape
        }
      } catch (err) {
        toast.error("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  const handleCourseSelection = (e) => {
    const courseId = e.target.value;
    if (e.target.checked) {
      setSelectedCourses((prev) => [...prev, courseId]);
    } else {
      setSelectedCourses((prev) => prev.filter(id => id !== courseId));
    }
  };



  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('specialty', specialty)
      formData.append('degree', degree)

      selectedCourses.forEach((courseId) => {
        formData.append('course', courseId); // append multiple course IDs
      });
      // formData.forEach((value, key) => {
      //   console.log(`${key} :${value}`);

      // })

      const { data } = await axios.post(backendUrl + '/api/admin/add-coach', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setAbout('')
        setPassword('')
        setDegree('')
        setFees('')
        setExperience('')
        setSpecialty('')
        setSelectedCourses([]);
      } else {
        toast.error(data.message)
      }
    } catch (error) {

      toast.error(error.message)

    }

  }



  return (

    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Coach</p>

      <div className='bg-white px-8 py-8 border border-gray-300 rounded w-full  max-w-4xl max-h-[80vh] overflow-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="coach-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='coach-img' hidden />
          <p>Upload coach <br /> picture</p>
        </div>

        <div className='my-4'>
          <p className='mb-2'>Assign Courses</p>
          <div className='flex flex-wrap gap-4'>
            {courses.map((course) => (
              <label key={course._id} className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  value={course._id}
                  checked={selectedCourses.includes(course._id)}
                  onChange={handleCourseSelection}
                />
                <span>{course.name}</span>
              </label>
            ))}
          </div>
        </div>


        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Coach name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Coach Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-300 rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Coach Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-300 rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <input onChange={(e) => setExperience(e.target.value)} value={experience} className='border border-gray-300 rounded px-3 py-2' type="number" placeholder='Experience' required />

            </div>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border border-gray-300 rounded px-3 py-2' type="number" placeholder='Fees' required />
            </div>
          </div>


          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Specialty</p>

              <input onChange={(e) => setSpecialty(e.target.value)} value={specialty} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Specialty' required />

            </div>

            <div>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Education</p>
                <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Education' required />
              </div>
            </div>
          </div>




        </div>


        <div>
          <p className='mt-4 mb-2'>About Coach</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded border-gray-300' placeholder='write about coach' rows={5} required />
        </div>
        <button type='submit' className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Add Coach</button>
      </div>


    </form>

  )
}

export default AddCoach
