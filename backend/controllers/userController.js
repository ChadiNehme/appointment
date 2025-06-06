import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios'
import coachModel from '../models/CoachModel.js';
import appointmentModel from '../models/appointmentModel.js';
import courseModel from '../models/CourseModel.js';
//api to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" })
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" })

    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" })
    }

    //hash pass
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const userData = {
      name,
      email,
      password: hashedPassword
    }
    const newUser = new userModel(userData)

    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ success: true, token })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "user not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    }
    else {
      res.json({ success: false, message: "invalid credential" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//get

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body
    const userData = await userModel.findById(userId).select('-password')

    res.json({ success: true, userData })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//update user profile
const updateProfile = async (req, res) => {
  const imgKey = process.env.IMGBB_API_KEY;
  try {
    const { userId, name, phone } = req.body
    const imageFile = req.file

    if (!name || !phone) {
      return res.json({ success: false, message: "Missing Details" })
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,

    })


    if (imageFile) {
      // Create a new FormData instance and append the image to it
      const formData = new FormData();
      formData.append('image', fs.createReadStream(imageFile.path)); // Use file path to upload

      // Make the POST request to ImgBB
      const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
        headers: {
          ...formData.getHeaders(),
        },
        params: {
          key: imgKey,
        },
      });


      // Get the URL of the uploaded image
      const imageUrl = response.data.data.display_url;

      await userModel.findByIdAndUpdate(userId, {
        image: imageUrl
      })
    }
    res.json({ success: true, message: "Profile Updated" })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, coachId, slotDate, slotTime } = req.body
    const coachData = await coachModel.findById(coachId).select('-password')

    if (!coachData.available) {
      return res.json({ success: false, message: "Coach not available" })

    }

    let slots_booked = coachData.slots_booked
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot already booked" })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')
    delete coachData.slots_booked
    const appointmentData = {
      userId,
      coachId,
      slotDate,
      slotTime,
      userData,
      coachData,
      amount: coachData.fees,
      date: Date.now()
    }
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    //save new slots data in coachData

    await coachModel.findByIdAndUpdate(coachId, {
      slots_booked: slots_booked
    })
    res.json({ success: true, message: "Appointment booked" })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//get all appointments
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body

    const appointments = await appointmentModel.find({ userId })
    res.json({ success: true, appointments })


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })

  }
}

//cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "You are not authorized to cancel this appointment" })
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    //remove slots from coachData
    const { coachId, slotDate, slotTime } = appointmentData

    const coachData = await coachModel.findById(coachId).select('-password')
    let slots_booked = coachData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime)
    await coachModel.findByIdAndUpdate(coachId, {
      slots_booked: slots_booked
    })
    res.json({ success: true, message: "Appointment cancelled" })


  } catch (error) {
    console.log(error);
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




export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment}  // Export the functions