
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const AppContext = createContext()


const AppContextProvider = ({ children }) => {

  const [coaches, setCoaches] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
  const [userData, setUserData] = useState(false)
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

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
        headers: {token}
      })
      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const value = {
    coaches,getCoachesData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  }

  useEffect(() => {
    getCoachesData()
  }, [])

  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  }, [token])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )


}

export default AppContextProvider