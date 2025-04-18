import validator from 'validator'
import bcrypt from 'bcrypt'
import axios from 'axios'
import coachModel from '../models/CoachModel.js';
import dotenv from 'dotenv'
import fs from 'fs';
import FormData from 'form-data';
import jwt from "jsonwebtoken"
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';
import pathModel from '../models/pathModel.js';
import courseModel from '../models/CourseModel.js';
dotenv.config()

const addCoach = async (req, res) => {
  const imgKey = process.env.IMGBB_API_KEY;

  try {
    const { name, email, password, specialty, degree, experience, about, fees } = req.body;
    const imageFile = req.file;  // Handle image upload via multer



    // Check if all required fields are provided
    if (!name || !email || !password || !specialty || !degree || !experience || !about || !fees) {
      return res.json({ success: false, message: "Enter all fields" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a Valid Email" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

      timeout: 10000,
    });

    // Get the URL of the uploaded image
    const imageUrl = response.data.data.display_url;

    // Create a new coach
    const newCoach = new coachModel({
      name,
      email,
      password: hashedPassword,
      image: imageUrl, // Store the image URL
      specialty,
      degree,
      experience,
      about,
      fees,
      available: true, // Assuming default availability
      date: Date.now(), // Timestamp for the date
      slots_booked: {}, // Default empty slots
    });

    // Save the coach to the database
    await newCoach.save();

    return res.status(201).json({ success: true, message: "Coach added successfully", coach: newCoach });

  } catch (error) {
    console.error("Error adding coach:", error);
    return res.json({ success: false, message: "Server error" });
  }
};

//admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)

      res.json({ success: true, token })

    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }

  } catch (error) {

  }
}
//get all coach list
const allCoaches = async (req, res) => {
  try {
    const coaches = await coachModel.find({}).select('-password')
    res.json({ success: true, coaches })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//get all appointments
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)


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

//get dashboard data

const adminDashboard = async (req, res) => {
  try {
    const coaches = await coachModel.find({}).select('-password')
    const users = await userModel.find({}).select('-password')
    const appointments = await appointmentModel.find({})

    const dashData = {
      coaches: coaches.length,
      users: users.length,
      appointments: appointments.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    }
    res.json({ success: true, dashData })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//add new path
const addPath = async (req, res) => {
  const imgKey = process.env.IMGBB_API_KEY;
  try {
    const { pathName, pathDescription } = req.body
    const imageFile = req.file;
    if (!pathName || !pathDescription) {
      return res.json({ success: false, message: "Enter all fields" })
    }
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

      timeout: 10000,
    });

    // Get the URL of the uploaded image
    const imageUrl = response.data.data.display_url;
    const newPath = new pathModel({
      pathName,
      pathDescription,
      image: imageUrl
    })
    await newPath.save()
    res.json({ success: true, message: "Path added successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
//Add a new Course under a Path
const addCourse = async (req, res) => {
  try {
    const { pathId, courseName, courseDescription } = req.body
    const imageFile = req.file;
    if (!pathId || !courseName || !courseDescription) {
      return res.json({ success: false, message: "Enter all fields" })
    }
    const imageUrl = await uploadImage(imageFile)
    const newCourse = new courseModel({
      pathId,
      courseName,
      courseDescription,
      image: imageUrl
    })
    await newCourse.save()
    res.json({ success: true, message: "Course added successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}







export { addCoach, loginAdmin, allCoaches, appointmentsAdmin, appointmentCancel, adminDashboard }