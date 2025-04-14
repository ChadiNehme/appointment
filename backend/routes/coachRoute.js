import express from 'express'
import { coachList, loginCoach, appointmentCoach,appointmentCancel,appointmentComplete,coachDashboard } from '../controllers/coachController.js'
import authCoach from '../middlewares/authCoach.js'

const coachRouter = express.Router()

coachRouter.get('/list', coachList)
coachRouter.post('/login', loginCoach)
coachRouter.get('/appointments', authCoach, appointmentCoach)
coachRouter.post('/appointment-complete', authCoach, appointmentComplete)
coachRouter.post('/appointment-cancel', authCoach, appointmentCancel)
coachRouter.get('/dashboard', authCoach, coachDashboard)
export default coachRouter