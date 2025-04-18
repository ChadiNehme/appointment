import express from 'express';
import {getCoachesByCourseId} from '../controllers/courseController.js';
const courseRouter = express.Router();

// Get coaches by course ID
courseRouter.get('/:courseId/coaches', getCoachesByCourseId);

export default courseRouter;

