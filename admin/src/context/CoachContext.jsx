import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const CoachContext = createContext()

const CoachContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [cToken, setCToken] = useState(localStorage.getItem('cToken') ? localStorage.getItem('cToken') : '')

  const [appointments, setAppointments] = useState([])

  const [dashData, setDashData] = useState(false)
  const [profileData, setProfileData] = useState(false)

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/coach/appointments', { headers: { cToken } })

      if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments);

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")

    }
  }

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/coach/appointment-complete', { appointmentId }, { headers: { cToken } })
      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")

    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/coach/appointment-cancel', { appointmentId }, { headers: { cToken } })
      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")

    }
  }

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/coach/dashboard', { headers: { cToken } })
      if (data.success) {
        setDashData(data.dashData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")

    }
  }

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/coach/profile', { headers: { cToken } })
      if (data.success) {
        setProfileData(data.profileData)
        console.log(data.profileData);
        
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")
    }
  }

  const value = {
    cToken,
    setCToken,
    backendUrl,
    appointments,
    getAppointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    getDashboardData,
    dashData,
    setDashData,
    getProfileData,
    profileData,
    setProfileData

  }

  return (
    <CoachContext.Provider value={value}>
      {children}
    </CoachContext.Provider>
  )
}


export default CoachContextProvider