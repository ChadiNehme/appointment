import express from 'express'

import { addCoach,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-coach',authAdmin,upload.single('image'),addCoach)
adminRouter.post('/login',loginAdmin)



export default adminRouter