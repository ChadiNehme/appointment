

import express from 'express'
import { coachList,loginCoach } from '../controllers/coachController.js'

const coachRouter = express.Router()

coachRouter.get('/list',coachList)
coachRouter.post('/login',loginCoach)

export default coachRouter