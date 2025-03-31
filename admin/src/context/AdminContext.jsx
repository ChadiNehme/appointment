import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = ({ children }) => {

  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
  const [coaches, setCoaches] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL


  const getAllCoaches = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/all-coaches', {}, { headers: { aToken } })


      if (data.success) {
        setCoaches(data.coaches)
        console.log(data.coaches);

      } else {
        toast.error("data.message")
      }
    } catch (error) {
      toast.error("error.message")
    }
  }

  const changeAvailability = async (coachId) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { coachId }, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        getAllCoaches()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error("error.message")
    }

  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    coaches,
    getAllCoaches,
    changeAvailability
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}


export default AdminContextProvider