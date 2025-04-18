import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

  const currency = "$"

  const months = ["", 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-')
    return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
  }

  const value = {
    slotDateFormat,
    currency,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}


export default AppContextProvider