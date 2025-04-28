import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { coachId } = useParams()
  const { coaches, currencySymbol, backendUrl, token, getCoachesData } = useContext(AppContext)

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };
  const fetchDocInfo = async () => {
    const doc = await coaches.find(coach => coach._id === coachId)
    setDocInfo(doc)
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);
    if (!docInfo || !docInfo.availability) return;

    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dayName = daysOfWeek[currentDate.getDay()];

      // Find all availabilities for that day
      const dayAvailabilities = docInfo.availability.filter(avail => avail.day === dayName);

      if (dayAvailabilities.length > 0) {
        let slotList = dayAvailabilities.map((avail) => ({
          startTime: avail.startTime,
          endTime: avail.endTime
        }));

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}-${month}-${year}`;

        // 👉 Check if this date has booked slots
        const bookedTimes = docInfo.slots_booked?.[slotDate] || [];

        // 👉 Remove the booked times
        slotList = slotList.filter(slot => {
          const slotString = `${slot.startTime}-${slot.endTime}`;
          return !bookedTimes.includes(slotString);
        });

        if (slotList.length > 0) {
          setDocSlots(prev => [...prev, {
            date: slotDate,
            displayDate: currentDate.toDateString(),
            slots: slotList
          }]);
        }
      }
    }
  };



  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.warn('Please select a time');
      return;
    }

    try {
      const slotDate = docSlots[slotIndex].date;

      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, {
        coachId,
        slotDate,
        slotTime
      }, {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        await getCoachesData();

        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [coaches, coachId])

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo])

  return docInfo && (
    <div>
      {/* Coach details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700'>
        <p>Select Date</p>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.map((item, index) => (
            <p
              onClick={() => {
                setSlotIndex(index);
                setSlotTime(''); // reset time when date changes
              }}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5f6FFF] text-white' : 'text-gray-400 border border-gray-300'}`}
              key={index}
            >
              {item.displayDate}
            </p>
          ))}
        </div>

        <p className='mt-6'>Select Time</p>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots[slotIndex]?.slots.map((slotItem, idx) => (
            <p
              onClick={() => setSlotTime(`${slotItem.startTime}-${slotItem.endTime}`)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === `${slotItem.startTime}-${slotItem.endTime}` ? 'bg-[#5f6FFF] text-white' : 'text-gray-400 border border-gray-300'}`}
              key={idx}
            >
              {formatTime(slotItem.startTime)} - {formatTime(slotItem.endTime)}
            </p>
          ))}
        </div>

        <button onClick={bookAppointment} className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>
          Book a Session
        </button>
      </div>
    </div>
  )
}

export default Appointment;

























