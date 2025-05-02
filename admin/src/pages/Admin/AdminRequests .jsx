import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const AdminRequests = () => {
  const { backendUrl } = useContext(AdminContext);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/join-requests`);
      if (data.success) {
        setRequests(data.requests);
      }
    } catch (err) {
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/join-requests/${id}/status`,
        { status: newStatus }
      );
      if (data.success) {
        toast.success(`Request ${newStatus}`);
        fetchRequests();
      }
    } catch (err) {
      toast.error("Failed to update request");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-[#5f6FFF]">Coach Applications</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="p-4 border rounded shadow bg-white">
              <div className="flex justify-between">
                <div>
                  <p><strong>Name:</strong> {req.name}</p>
                  <p><strong>Email:</strong> {req.email}</p>
                  <p><strong>About:</strong> {req.about}</p>
                  <p><strong>Fee:</strong> ${req.fee}</p>
                  <p><strong>Path:</strong> {req.path?.name || "N/A"}</p>
                  <p><strong>Course:</strong> {req.course?.name || "N/A"}</p>
                  <p><strong>Status:</strong> <span className={
                    req.status === "pending" ? "text-yellow-500" :
                    req.status === "accepted" ? "text-green-600" :
                    "text-red-600"
                  }>{req.status}</span></p>
                  {req.cvUrl && (
                    <a
                      href={`${backendUrl}${req.cvUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View CV
                    </a>
                  )}
                </div>
                <div className="space-x-2">
                  {req.status === "pending" && (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => updateStatus(req._id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => updateStatus(req._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
