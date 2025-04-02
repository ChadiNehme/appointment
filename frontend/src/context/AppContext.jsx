
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const AppContext = createContext()


const AppContextProvider = ({ children }) => {

  const [coaches, setCoaches] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const getCoachesData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/coach/list')
      if (data.success) {
        setCoaches(data.coaches)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)


    }
  }

  const value = {
    coaches,
    currencySymbol,
    token,
    setToken,
    backendUrl
  }

  useEffect(() => {
    getCoachesData()
  }, [])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )


}

export default AppContextProvider