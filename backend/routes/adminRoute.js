import express from 'express'

import { addCoach, allCoaches, loginAdmin,appointmentsAdmin,appointmentCancel,adminDashboard,addPath,addCourse } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/coachController.js'

const adminRouter = express.Router()

adminRouter.post('/add-coach', authAdmin, upload.single('image'), addCoach)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-coaches', authAdmin, allCoaches)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
adminRouter.post('/add-path', authAdmin, upload.single('image'), addPath)
adminRouter.post('/add-course', authAdmin, upload.single('image'), addCourse)






export default adminRouter