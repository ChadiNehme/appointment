

import express from 'express'
import { coachList } from '../controllers/coachController.js'

const coachRouter = express.Router()

coachRouter.get('/list',coachList)


export default coachRouter