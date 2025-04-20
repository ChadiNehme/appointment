import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { useRef } from "react";

const AddCourseForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: false,
    path: "",
  });

  const [paths, setPaths] = useState([]);
  const { backendUrl, aToken } = useContext(AdminContext);
  const fileInputRef = useRef(null);
  // Fetch all paths for the dropdown
  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/paths/all-paths`);
        setPaths(data.paths || []);
      } catch (error) {
        console.error("Error fetching paths:", error.message);
      }
    };
    fetchPaths();
  }, [backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("image", form.image);
    formData.append("path", form.path);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-course`,
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setForm({ name: "", description: "", image: false, path: "" });
        // Reset file input manually
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 m-2">
      <h2 className="text-xl font-semibold text-gray-700">Add New Course</h2>

      <select
        value={form.path}
        onChange={(e) => setForm({ ...form, path: e.target.value })}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Path</option>
        {paths.map((path) => (
          <option key={path._id} value={path._id}>
            {path.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Course Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        type="file"
        accept="image/*"
        className="w-full"
        ref={fileInputRef}
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        required
      />

      <button
        className="bg-[#5f6FFF] text-white px-4 py-2 rounded hover:opacity-90"
        type="submit"
      >
        Add Course
      </button>
    </form>
  );
};

export default AddCourseForm;
