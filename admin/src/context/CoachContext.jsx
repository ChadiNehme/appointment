import { createContext, useState } from "react";

export const CoachContext = createContext()

const CoachContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [cToken, setCToken] = useState(localStorage.getItem('cToken') ? localStorage.getItem('cToken') : '')


  const value = {
    cToken,
    setCToken,
    backendUrl,
  }

  return (
    <CoachContext.Provider value={value}>
      {children}
    </CoachContext.Provider>
  )
}


export default CoachContextProvider