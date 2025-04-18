import courseModel from "../models/CourseModel.js"
import pathModel from "../models/pathModel.js"


//get all paths
const allPaths = async (req, res) => {
  try {
    const paths = await pathModel.find({})
    res.json({ success: true, paths })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
// Get courses by path ID
const coursesByPathId = async (req, res) => {
  try {
    const { pathId } = req.params
    const courses = await courseModel.find({ path: pathId })
    res.json({ success: true, courses })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export { allPaths, coursesByPathId }