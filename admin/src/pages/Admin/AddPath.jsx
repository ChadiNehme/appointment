import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const AddPathForm = () => {
  const [form, setForm] = useState({ name: "", description: "", image: false });
  const { backendUrl, aToken } = useContext(AdminContext)
  const fileInputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("image", form.image);

    try {
      const { data } = await axios.post(backendUrl + "/api/admin/add-path", formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        setForm({ name: "", description: "", image: null });

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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 m-2 ">
      <h2 className="text-xl font-semibold text-gray-700">Add New Path</h2>
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
      <input
        type="file"
        accept="image/*"
        className="w-full"
        ref={fileInputRef}

        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        required
      />
      <button className="bg-[#5f6FFF] text-white px-4 py-2 rounded hover:opacity-90" type="submit">
        Add Path
      </button>
    </form>
  );
};

export default AddPathForm;
