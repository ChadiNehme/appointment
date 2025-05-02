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
import requestModel from '../models/requestModel.js';
dotenv.config()

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({}); // Optional: populate path name
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Failed to fetch courses" });
  }
};
export const allPaths = async (req, res) => {
  try {
    const paths = await pathModel.find({})
    res.json({ success: true, paths })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


const addCoach = async (req, res) => {
  const imgKey = process.env.IMGBB_API_KEY;

  try {
    const {
      name,
      email,
      password,
      specialty,
      degree,
      experience,
      about,
      fees,
      course,
    } = req.body;

    const imageFile = req.file;

    if (!name || !email || !password || !specialty || !degree || !experience || !about || !fees || !course) {
      return res.json({ success: false, message: "Enter all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a Valid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const formData = new FormData();
    formData.append('image', fs.createReadStream(imageFile.path));

    const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
      headers: {
        ...formData.getHeaders(),
      },
      params: {
        key: imgKey,
      },
      timeout: 20000,
    });

    const imageUrl = response.data.data.display_url;

    const newCoach = new coachModel({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      specialty,
      degree,
      experience,
      about,
      fees,
      available: true,
      date: Date.now(),
      slots_booked: {},
      course: Array.isArray(course) ? course : [course], // Ensure it’s always an array
    });

    await newCoach.save();

    return res.status(201).json({ success: true, message: "Coach added successfully", coach: newCoach });

  } catch (error) {
    // console.error("Error adding coach:", error);
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
    const { name, description } = req.body
    const imageFile = req.file;
    if (!name || !description) {
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

      timeout: 20000,
    });

    // Get the URL of the uploaded image
    const imageUrl = response.data.data.display_url;
    const newPath = new pathModel({
      name,
      description,
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
  const imgKey = process.env.IMGBB_API_KEY;
  try {
    const { path, name, description } = req.body
    const imageFile = req.file;
    if (!path || !name || !description) {
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

      timeout: 20000,
    });

    // Get the URL of the uploaded image
    const imageUrl = response.data.data.display_url;
    const newCourse = new courseModel({
      path,
      name,
      description,
      image: imageUrl
    })
    await newCourse.save()
    res.json({ success: true, message: "Course added successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// GET all join requests
export const getAllJoinRequests = async (req, res) => {
  try {
    const requests = await requestModel.find()
    .populate('path')      // Populate the path field
    .populate('course')    // Populate the course field
    .sort({ createdAt: -1 });
  
  res.status(200).json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch requests" });
  }
};

// PUT update status
// export const updateJoinRequestStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!["accepted", "rejected"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const request = await requestModel.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     res.status(200).json({ success: true, updatedRequest: request });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to update status" });
//   }
// };

export const updateJoinRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const request = await requestModel.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    // If already accepted or rejected, prevent further processing
    if (request.status !== "pending") {
      return res.status(400).json({ success: false, message: "Request already processed" });
    }

    // Update request status
    request.status = status;
    await request.save();

    // If status is "accepted", create coach
    if (status === "accepted") {
      const course = await courseModel.findById(request.course); // Assuming request.course stores the course ID
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found for coach" });
      }

      const defaultPassword = "12345678";
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      const newCoach = new coachModel({
        name: request.name,
        email: request.email,
        password: hashedPassword,
        image: "https://example.com/default-profile.jpg", // change if needed
        specialty: request.specialty || "Not specified",
        degree: request.degree || "Not specified",
        experience: request.experience || "Not specified",
        about: request.about,
        fees: request.fee,
        available: true,
        date: Date.now(),
        slots_booked: {},
        course: [course._id],  // This associates the coach with the course
      });

      await newCoach.save();
    }

    res.status(200).json({ success: true, message: "Request processed", updatedRequest: request });
  } catch (error) {
    console.error("Error processing join request:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};







export { addCoach, loginAdmin, allCoaches, appointmentsAdmin, appointmentCancel, adminDashboard, addCourse, addPath }
