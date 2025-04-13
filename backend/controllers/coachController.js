import coachModel from "../models/CoachModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const changeAvailability = async (req, res) => {
  try {
    const { coachId } = req.body

    const coachData = await coachModel.findById(coachId)
    await coachModel.findByIdAndUpdate(coachId, { available: !coachData.available })
    res.json({ success: true, message: 'Availability Changed' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

const coachList = async (req, res) => {
  try {
    const coaches = await coachModel.find({}).select(['-password', '-email'])
    res.json({ success: true, coaches })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// coach login

const loginCoach = async (req, res) => {
  try {
    const { email, password } = req.body
    const coach = await coachModel.findOne({ email })
    if (!coach) {
      res.json({ success: false, message: 'Invalid Credentials' })
    }
    const isMatch = await bcrypt.compare(password, coach.password)
    if (!isMatch) {
      res.json({ success: false, message: 'Invalid Credentials' })
    } else {
      const token = jwt.sign({ id: coach._id }, process.env.JWT_SECRET)

      res.json({ success: true, token })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })

  }
}

export { changeAvailability, coachList, loginCoach }