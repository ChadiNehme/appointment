import { createContext } from "react";

export const CoachContext = createContext()

const CoachContextProvider = ({ children }) => {
  const value = {}

  return (
    <CoachContext.Provider value={value}>
      {children}
    </CoachContext.Provider>
  )
}


export default CoachContextProvider