import React, { useContext, useEffect, useState } from 'react'
import { CoachContext } from '../../context/CoachContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const CoachProfile = () => {
  const { cToken, getProfileData, profileData, setProfileData, backendUrl } = useContext(CoachContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [newImage, setNewImage] = useState(null)

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0])
  }

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData()
    formData.append('image', imageFile)
    const imgbbApiKey = import.meta.env.VITE_IMGBB_KEY

    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData)
    return response.data.data.url
  }

  const updateProfile = async () => {
    try {
      const formData = new FormData()
      formData.append("fees", profileData.fees)
      formData.append("available", profileData.available)
      formData.append("coachId", profileData._id)  // Pass coachId if needed
      if (newImage) {
        formData.append("image", newImage)
      }
  
      const { data } = await axios.post(`${backendUrl}/api/coach/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ctoken: cToken
        }
      })
  
      if (data.success) {
        toast.success(data.message)
        await getProfileData()
        setIsEdit(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  

  useEffect(() => {
    if (cToken) {
      getProfileData()
    }
  }, [cToken])

  return profileData && (
    <div className='flex flex-col gap-4 m-5'>
      <div>
        <img className='w-full sm:max-w-46 rounded-lg' src={newImage ? URL.createObjectURL(newImage) : profileData.image} alt="profile" />
        {isEdit && (
          <input type="file" onChange={handleImageChange} className="mt-2" />
        )}
      </div>

      <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white shadow-md'>
        <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
        <div className='flex items-center gap-2 mt-1 text-gray-500'>
          <p>{profileData.degree} - {profileData.specialty}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
        </div>

        <div>
          <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
          <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
        </div>

        <p className='text-gray-600 font-medium mt-4'>Appointment fees :
          <span className='text-gray-800'>
            {currency} {isEdit ? <input value={profileData.fees} type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} /> : profileData.fees}
          </span>
        </p>

        <div className='flex gap-1 pt-2'>
          <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" />
          <label>Available</label>
        </div>

        {
          isEdit
            ? <button onClick={updateProfile} className='px-4 py-1 border border-[#5F6FFF] text-sm rounded-full mt-5 hover:bg-[#5F6FFF] hover:text-white transition-all'>Save</button>
            : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-[#5F6FFF] text-sm rounded-full mt-5 hover:bg-[#5F6FFF] hover:text-white transition-all'>Edit</button>
        }

      </div>
    </div>
  )
}

export default CoachProfile
