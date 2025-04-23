import coachModel from "../models/CoachModel.js"
import courseModel from "../models/CourseModel.js"


//Get coaches by course ID
const getCoachesByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params
    const coaches = await coachModel.find({ course: courseId })
    res.json({ success: true, coaches })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
  }

  export const getAllCourses = async (req, res) => {
    try {
      const courses = await courseModel.find({}); // Optional: populate path name
      res.status(200).json({ success: true, courses });
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ success: false, message: "Failed to fetch courses" });
    }
  };

export { getCoachesByCourseId }
