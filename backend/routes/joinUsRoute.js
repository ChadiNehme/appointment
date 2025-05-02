import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { submitJoinUsRequest } from "../controllers/joinUsController.js";

const joinUsRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/cvs";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// Route
joinUsRouter.post("/submit-request", upload.single("cv"), submitJoinUsRequest);

export default joinUsRouter;
