import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import dotenv from "dotenv"
import { Connect } from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js'
import coachRouter from './routes/coachRoute.js'

dotenv.config()
//app config
const app = express()
const port = process.env.port || 4000 
 Connect()
//middlewares
app.use(express.json())
app.use(cors())

//api endpoint

app.use('/api/admin',adminRouter)
app.use('/api/coach/',coachRouter)
app.get('/',(req,res)=>{
    res.send("API Working")
})
app.listen(port, ()=>{
   
    console.log("Server Started",port)
})