import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PathCard from "../component/PathCard";
import { assets } from "../assets/assets_frontend/assets";

const Paths = () => {
  const [paths, setPaths] = useState([
    { _id: 1, name: "Robotics", image: `${assets.roro}`, description: "Learn how to design, build, and program robots using real-world tools and sensors. This path combines creativity with technology to bring machines to life." },
    { _id: 2, name: "Programming", image: `${assets.Coding}`,description:"Dive into the world of code! Learn popular languages like Python, Java, and JavaScript to build apps, games, websites, and more." },
    { _id: 3, name: "Academic Learning", image: `${assets.edu}`,description:"Strengthen your knowledge in essential school subjects like Math, Physics, Chemistry, and more. This path helps students master academic topics through guided learning." }]); // Dummy data for paths



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
