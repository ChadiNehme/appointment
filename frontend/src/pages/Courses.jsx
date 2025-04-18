import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CourseCard from "../component/CourseCard";
import { assets } from "../assets/assets_frontend/assets";

const Courses = () => {
  const { pathId } = useParams();
  const [courses, setCourses] = useState([
    {
      _id: "1",
      name: "Java",
      description: "Learn Java from scratch.",
      image: `${assets.scratch}`,
      pathId: 2,
    },
    {
      _id: "2",
      name: "Python",
      description: "Start coding with Python.",
      image: "https://via.placeholder.com/400x200",
      pathId: 2,
    },
    {
      _id: "3",
      name: "Physics Basics",
      description: "Understand motion, force, and energy.",
      image: "https://via.placeholder.com/400x200",
      pathId: 3,
    },
    {
      _id: "4",
      name: "Scratch",
      description: "Scratch is a visual programming language where you create code by snapping colorful blocks together. It's perfect for beginners to learn logic, problem-solving, and creativity—without writing any text code.",
      image: `${assets.scratch}`,
      pathId: 1,
    },
    // Add more courses as needed
  ]);

  // useEffect(() => {
  //   fetch(`/api/paths/${pathId}/courses`)
  //     .then((res) => res.json())
  //     .then((data) => setCourses(data));
  // }, [pathId]);
  const courseFilttered = courses.filter((course) => course.pathId === Number(pathId));


  return (
    <div>
      <h2>Courses Under This Path</h2>
      <div className="flex items-center justify-center flex-wrap gap-3">
        {courseFilttered.map((course) => (
          <CourseCard key={course._id} course={course} pathId={pathId} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
