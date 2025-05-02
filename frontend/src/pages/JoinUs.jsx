import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const JoinUs = () => {
  const { backendUrl } = useContext(AppContext);
  const [paths, setPaths] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedPath, setSelectedPath] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseName, setCourseName] = useState("");
  const [fee, setFee] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [name, setName] = useState("");           // New field
  const [email, setEmail] = useState("");         // New field
  const [about, setAbout] = useState("");         // New field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [experience, setExperience] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [degree, setDegree] = useState("");
 

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/paths/all-paths`);
        if (data.success) {
          setPaths(data.paths);
        } else {
          toast.error("Failed to load learning paths");
        }
      } catch (err) {
        toast.error("Error loading paths");
      }
    };

    fetchPaths();
  }, [backendUrl]);

  useEffect(() => {
    if (selectedPath) {
      const fetchCourses = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}/api/paths/${selectedPath}/courses`);
          if (data.success) {
            setCourses(data.courses);
          } else {
            toast.error("Failed to load courses");
          }
        } catch (err) {
          toast.error("Error loading courses");
        }
      };

      fetchCourses();
    }
  }, [selectedPath, backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile || !fee || (!selectedCourse && !courseName) || !name || !email || !about) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("fee", fee);
    formData.append("courseId", selectedCourse || courseName);  // if no course selected, use courseName
    formData.append("name", name);      // Append name
    formData.append("email", email);    // Append email
    formData.append("about", about);    // Append about
    formData.append("pathId", selectedPath);
    formData.append("experience", experience);
    formData.append("specialty", specialty);
    formData.append("degree", degree);

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`${backendUrl}/api/joinus/submit-request`, formData);
      if (data.success) {
        toast.success("Request submitted successfully");
        setFee("");
        setCvFile(null);
        setSelectedCourse("");
        setCourseName("");
        setSelectedPath("");
        setCourses([]);
        setName("");    // Reset name field
        setEmail("");   // Reset email field
        setAbout("");   // Reset about field
        setExperience("");
        setSpecialty("");
        setDegree("");
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      toast.error("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-[#5f6FFF] mb-6">Apply to Join as a Coach</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Your full name"
            required
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block mb-2 font-medium">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Your email address"
            required
          />
        </div>

        {/* About You */}
        <div>
          <label className="block mb-2 font-medium">About You</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Tell us a bit about yourself"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Experience (in years)</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. 3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Specialty</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. Web Development"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Highest Degree</label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. BSc Computer Science"
            required
          />
        </div>

        {/* Choose a Learning Path */}
        <div>
          <label className="block mb-2 font-medium">Choose a Learning Path</label>
          <select
            value={selectedPath}
            onChange={(e) => {
              setSelectedPath(e.target.value);
              setSelectedCourse(""); // reset course when path changes
              setCourseName(""); // reset course name input
            }}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Path --</option>
            {paths.map((path) => (
              <option key={path._id} value={path._id}>
                {path.name}
              </option>
            ))}
          </select>
        </div>

        {/* Choose a Course */}
        {courses.length > 0 && (
          <div>
            <label className="block mb-2 font-medium">Choose a Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={() => setSelectedCourse("")}
                className="mr-2"
              />
              <span>If your course is not listed, type the name below</span>
            </div>
          </div>
        )}

        {/* If no course selected, allow user to type their own */}
        {!selectedCourse && (
          <div>
            <label className="block mb-2 font-medium">Course Name (If Not Listed)</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter course name"
            />
          </div>
        )}

        {/* Coaching Fee */}
        <div>
          <label className="block mb-2 font-medium">Your Coaching Fee (USD)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. 25"
            required
          />
        </div>

        {/* Upload CV */}
        <div>
          <label className="block mb-2 font-medium">Upload Your CV</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCvFile(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#5f6FFF] text-white py-2 px-4 rounded hover:bg-[#4e58f7] transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default JoinUs;
