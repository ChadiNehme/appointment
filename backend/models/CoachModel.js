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
}, { minimize: false })

const coachModel = mongoose.models.coach || mongoose.model("coach", coachSchema)

export default coachModel