import path from "path";
import fs from "fs";
import requestModel from "../models/requestModel.js";
import pathModel from "../models/pathModel.js";      // Import path model
import courseModel from "../models/CourseModel.js";

// POST /api/joinus/submit-request
export const submitJoinUsRequest = async (req, res) => {
  try {
    const { name, email, about, fee, courseId, courseName, pathId, experience, specialty, degree } = req.body;
    const cvPath = req.file ? `/uploads/cvs/${req.file.filename}` : "";

    // Fetch the course name from the database if needed
    let course = courseName;
    if (courseId) {
      const courseData = await courseModel.findById(courseId);
      course = courseData ? courseData.name : courseName;
    }

    const newRequest = new requestModel({
      name,
      email,
      about,
      fee,
      course:courseId, 
      path: pathId, 
      cvUrl: cvPath,
      status: "pending",
      experience,
      specialty,
      degree,
    });

    await newRequest.save();
    res.status(200).json({ success: true, message: "Request submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

