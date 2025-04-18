import mongoose from "mongoose";

const pathSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  
})

const pathModel = mongoose.models.path || mongoose.model('Path', pathSchema)
export default pathModel