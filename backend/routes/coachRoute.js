import express from 'express'
import { coachList, loginCoach, appointmentCoach, appointmentCancel, appointmentComplete, coachDashboard, coachProfile, updateCoachProfile,updateAvailability,getCoachAvailability,deleteCoachAvailability } from '../controllers/coachController.js'
import authCoach from '../middlewares/authCoach.js'
import upload from '../middlewares/multer.js'

const coachRouter = express.Router()

coachRouter.get('/list', coachList)
coachRouter.post('/login', loginCoach)
coachRouter.get('/appointments', authCoach, appointmentCoach)
coachRouter.post('/appointment-complete', authCoach, appointmentComplete)
coachRouter.post('/appointment-cancel', authCoach, appointmentCancel)
coachRouter.get('/dashboard', authCoach, coachDashboard)
coachRouter.get('/profile', authCoach, coachProfile)
coachRouter.post('/update-profile', authCoach, upload.single('image'), updateCoachProfile);

coachRouter.put('/update-availability', authCoach, updateAvailability)
coachRouter.get('/get-availability', authCoach, getCoachAvailability)
coachRouter.delete('/delete-availability', authCoach, deleteCoachAvailability)

export default coachRouter