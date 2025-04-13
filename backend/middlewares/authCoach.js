import jwt from "jsonwebtoken"

//coach auth middleware

const authCoach = async (req, res, next) => {
  try {
    const { ctoken } = req.headers
    if (!ctoken) {
      return res.json({ success: false, message: "not Authorized" })
    }
    const token_decode = jwt.verify(ctoken, process.env.JWT_SECRET)

    req.body.coachId = token_decode.id

    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export default authCoach