import express from 'express'
import { coachList, loginCoach, appointmentCoach } from '../controllers/coachController.js'
import authCoach from '../middlewares/authCoach.js'

const coachRouter = express.Router()

coachRouter.get('/list', coachList)
coachRouter.post('/login', loginCoach)
coachRouter.get('/appointments', authCoach, appointmentCoach)
export default coachRouter