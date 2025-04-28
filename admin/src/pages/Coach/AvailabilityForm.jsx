import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CoachContext } from '../../context/CoachContext';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AvailabilityForm = () => {
  const { cToken, backendUrl } = useContext(CoachContext);
  const [availability, setAvailability] = useState([
    { day: '', startTime: '', endTime: '' }
  ]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/coach/get-availability`, {
          headers: { cToken }
        });
        if (data.success) {
          setAvailability(data.availability || [{ day: '', startTime: '', endTime: '' }]);
        } else {
          toast.error('Failed to load availability');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching availability');
      }
    };

    fetchAvailability();
  }, [cToken, backendUrl]);
// update the index availability of field field(day,start time,end time) whit value
  const handleChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;
    setAvailability(updatedAvailability);
  };

  const addSlot = () => {
    setAvailability([...availability, { day: '', startTime: '', endTime: '' }]);
  };

  const removeSlot = async (index) => {
    const slotToDelete = availability[index];
  
    // If the slot is empty (new slot not saved yet)
    if (!slotToDelete.day || !slotToDelete.startTime || !slotToDelete.endTime) {
      const updatedAvailability = [...availability];
      updatedAvailability.splice(index, 1);
      setAvailability(updatedAvailability);
      toast.info('Unsaved slot removed');
      return;
    }
  
    // Otherwise, try to delete from the backend
    try {
      const { data } = await axios.delete(`${backendUrl}/api/coach/delete-availability`, {
        headers: {
          cToken,
        },
        data: {
          day: slotToDelete.day,
          startTime: slotToDelete.startTime,
          endTime: slotToDelete.endTime,
        },
      });
  
      if (data.success) {
        toast.success('Slot removed successfully');
        const updatedAvailability = [...availability];
        updatedAvailability.splice(index, 1);
        setAvailability(updatedAvailability);
      } else {
        toast.error('Failed to delete slot');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting slot');
    }
  };
  

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/coach/update-availability`,
        { availability },
        { headers: { cToken } }
      );

      if (data.success) {
        toast.success('Availability updated successfully!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Set Your Availability</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {availability.map((slot, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 items-center">
            <select
              className="border border-gray-300 rounded p-2 w-full"
              value={slot.day}
              onChange={(e) => handleChange(index, 'day', e.target.value)}
              required
            >
              <option value="">Select Day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>

            <input
              type="time"
              className="border border-gray-300 rounded p-2 w-full"
              value={slot.startTime}
              onChange={(e) => handleChange(index, 'startTime', e.target.value)}
              required
            />

            <input
              type="time"
              className="border border-gray-300 rounded p-2 w-full"
              value={slot.endTime}
              onChange={(e) => handleChange(index, 'endTime', e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => removeSlot(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addSlot}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Another Slot
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded mt-4"
        >
          Save Availability
        </button>
      </form>
    </div>
  );
};

export default AvailabilityForm;
