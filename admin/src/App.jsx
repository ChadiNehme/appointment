import { useContext } from "react";
import Login from "./pages/Login"
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./component/Navbar";
import SideBar from "./component/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddCoach from "./pages/Admin/AddCoach";
import CoachList from "./pages/Admin/CoachList";

function App() {

  const { aToken } = useContext(AdminContext)



  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllAppointments />} />
          <Route path="/add-coach" element={<AddCoach />} />
          <Route path="/coach-list" element={<CoachList />} />



        </Routes>
      </div>

    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
