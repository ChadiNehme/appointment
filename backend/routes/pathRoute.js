import express from 'express'
import { allPaths, coursesByPathId } from '../controllers/pathController.js'



const pathRouter = express.Router()
pathRouter.get('/all-paths', allPaths)
pathRouter.get('/:pathId/courses', coursesByPathId)

export default pathRouter