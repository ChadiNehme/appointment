import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets_admin/assets"; // Ensure this has upload_area

const AddPathForm = () => {
  const [form, setForm] = useState({ name: "", description: "", image: null });
  const { backendUrl, aToken } = useContext(AdminContext);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      return toast.error("Image not selected");
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("image", form.image);

    try {
      const { data } = await axios.post(backendUrl + "/api/admin/add-path", formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        setForm({ name: "", description: "", image: null });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 m-2">
      <h2 className="text-xl font-semibold text-gray-700">Add New Path</h2>

      {/* Image Upload */}
      <div className="flex items-center gap-4 text-gray-500">
        <label htmlFor="path-img">
          <img
            className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
            src={form.image ? URL.createObjectURL(form.image) : assets.upload_area}
            alt="Upload Preview"
          />
        </label>
        <input
          type="file"
          id="path-img"
          hidden
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <p>Upload path <br /> image</p>
      </div>

      {/* Name & Description */}
      <input
        type="text"
        placeholder="Path Name"
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

      <button
        className="bg-[#5f6FFF] text-white px-4 py-2 rounded hover:opacity-90"
        type="submit"
      >
        Add Path
      </button>
    </form>
  );
};

export default AddPathForm;
