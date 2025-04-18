import { useNavigate } from "react-router-dom";

const PathCard = ({ path }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 w-full max-w-sm">
      <img
        src={path.image} // fallback image
        alt={path.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{path.name}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {path.description?.slice(0, 100)}...
        </p>
        <button
          onClick={() => navigate(`/paths/${path._id}/courses`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          View Courses
        </button>
      </div>
    </div>
  );
};

export default PathCard;
