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
import { CoachContext } from "./context/CoachContext";
import CoachDashboard from "./pages/Coach/CoachDashboard";
import CoachAppointments from "./pages/Coach/CoachAppointments";
import CoachProfile from "./pages/Coach/CoachProfile";
import AddPathForm from "./pages/Admin/AddPath";
import AddCourseForm from "./pages/Admin/AddCourse";
import AvailabilityForm from "./pages/Coach/AvailabilityForm";
import AdminRequests from "./pages/Admin/AdminRequests ";

function App() {

  const { aToken } = useContext(AdminContext)
  const { cToken } = useContext(CoachContext)


  return aToken || cToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          {/* admin route */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllAppointments />} />
          <Route path="/add-coach" element={<AddCoach />} />
          <Route path="/add-path" element={<AddPathForm />} />
          <Route path="/add-course" element={<AddCourseForm />} />
          <Route path="/coach-list" element={<CoachList />} />
          <Route path="/join-requests" element={<AdminRequests />} />
          {/* coach route */}
          <Route path="/coach-dashboard" element={<CoachDashboard />} />
          <Route path="/coach-appointment" element={<CoachAppointments />} />
          <Route path="/coach-profile" element={<CoachProfile />} />
          <Route path="/availability-form" element={<AvailabilityForm />} />



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
