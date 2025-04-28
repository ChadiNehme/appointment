import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  image: { type: String, require: true },
  specialty: { type: String, require: true },
  degree: { type: String, require: true },
  experience: { type: String, require: true },
  about: { type: String, require: true },
  available: { type: Boolean, default: true },
  fees: { type: Number, require: true },
  date: { type: Number, required: true },
  slots_booked: { type: Object, default: {} },
  course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  availability: [
    {
      day: { type: String, required: true },    // e.g., 'Monday'
      startTime: { type: String, required: true }, // e.g., '16:00'
      endTime: { type: String, required: true },   // e.g., '17:00'
    }
  ]
}, { minimize: false })

const coachModel = mongoose.models.coach || mongoose.model("Coach", coachSchema)

export default coachModel