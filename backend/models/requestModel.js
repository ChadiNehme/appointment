import mongoose from "mongoose";

const joinUsRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: false,
    },
    specialty: {
      type: String,
      required: false,
    },
    degree: {
      type: String,
      required: false,
    },
    fee: {
      type: Number,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,  // Changed to ObjectId
      ref: 'Course',  // Reference to the Course model
      required: true,
    },
    path: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Path",
      required: true,
    },
    cvUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const requestModel = mongoose.model("JoinUsRequest", joinUsRequestSchema);
export default requestModel;


