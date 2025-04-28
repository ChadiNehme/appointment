import coachModel from "../models/CoachModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
const changeAvailability = async (req, res) => {
  try {
    const { coachId } = req.body

    const coachData = await coachModel.findById(coachId)
    await coachModel.findByIdAndUpdate(coachId, { available: !coachData.available })
    res.json({ success: true, message: 'Availability Changed' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

const coachList = async (req, res) => {
  try {
    const coaches = await coachModel.find({}).select(['-password', '-email'])
    
    
    res.json({ success: true, coaches })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// coach login

const loginCoach = async (req, res) => {
  try {
    const { email, password } = req.body
    const coach = await coachModel.findOne({ email })
    if (!coach) {
      res.json({ success: false, message: 'Invalid Credentials' })
    }
    const isMatch = await bcrypt.compare(password, coach.password)
    if (!isMatch) {
      res.json({ success: false, message: 'Invalid Credentials' })
    } else {
      const token = jwt.sign({ id: coach._id }, process.env.JWT_SECRET)

      res.json({ success: true, token })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })

  }
}

// get coach appointment 

const appointmentCoach = async (req, res) => {
  try {
    const { coachId } = req.body
    const appointments = await appointmentModel.find({ coachId })
    res.json({ success: true, appointments })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//mark appointment as done
const appointmentComplete = async (req, res) => {
  try {
    const { coachId, appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData && appointmentData.coachId === coachId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
      return res.json({ success: true, message: 'Appointment Completed' })
    } else {
      return res.json({ success: false, message: 'Appointment not found' })
    }


  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { coachId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.coachId === coachId) {
      
      // Mark the appointment as cancelled
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

      // Remove the slot from coach's available slots
      const { slotDate, slotTime } = appointmentData;
      const coachData = await coachModel.findById(coachId).select('-password');

      // Update the coach's booked slots
      let slots_booked = coachData.slots_booked;
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
        await coachModel.findByIdAndUpdate(coachId, { slots_booked: slots_booked });
      }

      return res.json({ success: true, message: 'Appointment Cancelled and Slot Updated' });

    } else {
      return res.json({ success: false, message: 'Appointment not found or not authorized' });
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//dashboard data
const coachDashboard = async (req, res) => {
  try {
    const { coachId } = req.body
    const appointments = await appointmentModel.find({ coachId })
    let earning = 0
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount
      }
    })

    let student = []
    appointments.map((item) => {
      if (!student.includes(item.userId)) {
        student.push(item.userId)
      }
    })
    const dashData = {
      earning,
      appointments: appointments.length,
      students: student.length,
      latestAppointments: appointments.slice(-5).reverse()
    }
    res.json({ success: true, dashData })
  } catch (error) {
    res.json({ success: false, message: error.message })

  }
}

//coach profile
const coachProfile = async (req, res) => {
  try {
    const { coachId } = req.body
    const profileData = await coachModel.findById(coachId).select('-password')
    res.json({ success: true, profileData })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//update coach profile
const updateCoachProfile = async (req, res) => {
  try {
    const { coachId, fees, available } = req.body
    await coachModel.findByIdAndUpdate(coachId, { fees, available })
    res.json({ success: true, message: 'Profile Updated' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
const updateAvailability = async (req, res) => {
  try {
    
    const { coachId,availability } = req.body;

    const coach = await coachModel.findByIdAndUpdate(coachId, { availability }, { new: true });

    res.json({ success: true, message: "Availability updated", coach });
    console.log(coach);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const getCoachAvailability = async (req, res) => {
  try {
    // Get coach ID from the request, assuming coach is authenticated and stored in req.user
    const {coachId} = req.body; // You should set this up using authentication (JWT, etc.)

    // Find coach by ID and populate the availability field
    const coach = await coachModel.findById(coachId);

    if (!coach) {
      return res.status(404).json({ success: false, message: 'Coach not found' });
    }

    // Send availability data to the client
    return res.status(200).json({ success: true, availability: coach.availability });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteCoachAvailability = async (req, res) => {
  try {
    const { coachId,day, startTime, endTime } = req.body;

    // Get coach ID from the request (ensure authentication is done)
    

    // Find the coach and update the availability
    const coach = await coachModel.findById(coachId);
    if (!coach) {
      return res.status(404).json({ success: false, message: 'Coach not found' });
    }

    // Find the index of the slot to remove
    const slotIndex = coach.availability.findIndex(slot => 
      slot.day === day && slot.startTime === startTime && slot.endTime === endTime
    );

    if (slotIndex === -1) {
      return res.status(400).json({ success: false, message: 'Slot not found' });
    }

    // Remove the slot from the availability array
    coach.availability.splice(slotIndex, 1);

    // Save the updated coach
    await coach.save();

    return res.status(200).json({ success: true, message: 'Availability slot removed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


export {
  updateAvailability,
  changeAvailability,
  coachList,
  loginCoach,
  appointmentCoach,
  appointmentComplete,
  appointmentCancel,
  coachDashboard,
  coachProfile,
  updateCoachProfile
}