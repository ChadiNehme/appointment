import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "../component/CourseCard";

import { toast } from "react-toastify";
import axios from 'axios'
import { AppContext } from "../context/AppContext";
const Courses = () => {
  const { pathId } = useParams();
  const { backendUrl } = useContext(AppContext)

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/paths/${pathId}/courses`);
        if (data.success) {
          setCourses(data.courses);
        } else {
          toast.error(data.message || "Failed to load courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Something went wrong fetching courses");
      }
    };

    fetchCourses();
  }, [pathId, backendUrl]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-[#5F6FFF] mb-8">Courses Under This Path</h2>
      <div className="flex items-center justify-center flex-wrap gap-3">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} pathId={pathId} />
          ))
        ) : (
          <p className="text-gray-500">No courses found for this path.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
