import coachModel from "../models/CoachModel.js"


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

export { changeAvailability, coachList }