import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Coaches from "./pages/Coaches"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyProfile from "./pages/MyProfile"
import MyAppointment from "./pages/MyAppointments"
import Appointment from "./pages/Appointment"
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"

import { ToastContainer, toast } from 'react-toastify';
import Paths from "./pages/Paths"
import Courses from "./pages/Courses"
function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path='/coaches/:speciality' element={<Coaches />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointment/:coachId" element={<Appointment />} />

        <Route path="/paths" element={<Paths />} />
        <Route path="/paths/:pathId/courses" element={<Courses />} />
        <Route path="/paths/:pathId/courses/:courseId/coaches" element={<Coaches />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
