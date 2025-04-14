import coachModel from "../models/CoachModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
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

// get coach appointment 

const appointmentCoach = async (req, res) => {
  try {
    const { coachId } = req.body
    const appointments = await appointmentModel.find({ coachId })
    res.json({ success: true, appointments })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//mark appointment as done
const appointmentComplete = async (req, res) => {
  try {
    const { coachId, appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData && appointmentData.coachId === coachId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
      return res.json({ success: true, message: 'Appointment Completed' })
    } else {
      return res.json({ success: false, message: 'Appointment not found' })
    }


  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { coachId, appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData && appointmentData.coachId === coachId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
      return res.json({ success: true, message: 'Appointment Cancelled' })
    } else {
      return res.json({ success: false, message: 'Appointment not found' })
    }


  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//dashboard data
const coachDashboard = async (req, res) => {
  try {
    const { coachId } = req.body
    const appointments = await appointmentModel.find({ coachId })
    let earning = 0
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount
      }
    })

    let student = []
    appointments.map((item) => {
      if (!student.includes(item.userId)) {
        student.push(item.userId)
      }
    })
    const dashData = {
      earning,
      appointments: appointments.length,
      students: student.length,
      latestAppointments: appointments.slice(-5).reverse()
    }
    res.json({ success: true, dashData })
  } catch (error) {
    res.json({ success: false, message: error.message })

  }
}

//coach profile
const coachProfile = async (req, res) => {
  try {
    const { coachId } = req.body
    const profileData = await coachModel.findById(coachId).select('-password')
    res.json({ success: true, profileData })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//update coach profile
const updateCoachProfile = async (req, res) => {
  try {
    const { coachId, fees, available } = req.body
    await coachModel.findByIdAndUpdate(coachId, { fees, available })
    res.json({ success: true, message: 'Profile Updated' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
export {
  changeAvailability,
  coachList,
  loginCoach,
  appointmentCoach,
  appointmentComplete,
  appointmentCancel,
  coachDashboard,
  coachProfile,
  updateCoachProfile
}