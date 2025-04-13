import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const CoachContext = createContext()

const CoachContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [cToken, setCToken] = useState(localStorage.getItem('cToken') ? localStorage.getItem('cToken') : '')

  const [appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl +'/api/coach/appointments', { headers: { cToken } })
    
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);

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
    setAppointments

  }

  return (
    <CoachContext.Provider value={value}>
      {children}
    </CoachContext.Provider>
  )
}


export default CoachContextProvider