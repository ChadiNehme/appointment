import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, pathId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 w-full max-w-sm">
      <img
        src={course.image || "https://via.placeholder.com/400x200"}
        alt={course.name}
        className="w-full h-48 object-fill"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {course.description?.slice(0, 100)}...
        </p>
        <button
          onClick={() => navigate(`/paths/${pathId}/courses/${course.name}/coaches`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          View Coaches
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
