import React from 'react'
import { assets } from '../../assets/assets_admin/assets'

const AddCoach = () => {
  return (
    <div>
      <form action="">
        <p>Add Coach</p>

        <div>
          <div>
            <label htmlFor="coach-img">
              <img src={assets.upload_area} alt="" />
            </label>
            <input type="file" id='coach-img' hidden />
            <p>Upload coach <br /> picture</p>
          </div>
        </div>

        <div>
          <div>
            <div>
              <p>Your name</p>
              <input type="text" placeholder='Name' required />
            </div>

            <div>
              <p>Coach Email</p>
              <input type="email" placeholder='Email' required />
            </div>


            <div>
              <p>Coach Password</p>
              <input type="password" placeholder='Password' required />
            </div>

            <div>
              <p>Experience</p>
              <select name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
              </select>
            </div>
            <div>
              <p>Fees</p>
              <input type="number" placeholder='Fees' required />
            </div>


            <div>
              
            </div>

            <div>
              <p>Specialty</p>
              <select name="" id="">
                <option value="Robotics">Robotics</option>
                <option value="Programming">Programming</option>
                <option value="">Education</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCoach
