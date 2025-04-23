import express from 'express';
import {getCoachesByCourseId,getAllCourses} from '../controllers/courseController.js';
const courseRouter = express.Router();

// Get coaches by course ID
courseRouter.get('/:courseId/coaches', getCoachesByCourseId);
courseRouter.get('/all-courses', getAllCourses);
export default courseRouter;

