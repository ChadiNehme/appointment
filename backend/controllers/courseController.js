import coachModel from "../models/CoachModel.js"


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

export { getCoachesByCourseId }
