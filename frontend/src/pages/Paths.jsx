import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PathCard from "../component/PathCard";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import {toast}from 'react-toastify'
const Paths = () => {
  const [paths, setPaths] = useState([]); // Dummy data for paths

  const { backendUrl } = useContext(AppContext)
  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/paths/all-paths"); // assuming public path endpoint
        if (data.success) {
          setPaths(data.paths);
        } else {
          toast.error(data.message || "Failed to load paths");
        }
      } catch (err) {
        console.error("Error fetching paths:", err);
        toast.error("Something went wrong fetching paths");
      }
    };

    fetchPaths();
  }, [backendUrl]);

  return (
    <div>
      <h2 className="flex items-center justify-center text-4xl font-bold mb-8 text-[#5f6FFF]">Choose a Learning Path</h2>
      <div className="flex items-center justify-center flex-wrap gap-3">
        {paths.map((path) => (
          <PathCard key={path._id} path={path} />
        ))}
      </div>


    </div>
  );
};

export default Paths;
