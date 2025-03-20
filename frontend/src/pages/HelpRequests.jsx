import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HelpRequests = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const res = await axios.get("/api/help-requests");
        setHelpRequests(res.data);
      } catch (err) {
        setError("Failed to load help requests. Please try again later.");
        console.error("Error fetching help requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpRequests();
  }, []);

  // Filter help requests by urgency
  const filteredHelpRequests = helpRequests.filter((request) => {
    if (filter === "urgent") {
      return request.urgency === "urgent";
    } else if (filter === "medium") {
      return request.urgency === "medium";
    } else if (filter === "low") {
      return request.urgency === "low";
    }
    return true; // 'all' filter
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading help requests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Help Requests</h1>
        <Link
          to="/help-requests/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Help Request
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All Requests
        </button>
        <button
          onClick={() => setFilter("urgent")}
          className={`px-4 py-2 rounded-md ${
            filter === "urgent" ? "bg-red-600 text-white" : "bg-gray-200"
          }`}
        >
          Urgent
        </button>
        <button
          onClick={() => setFilter("medium")}
          className={`px-4 py-2 rounded-md ${
            filter === "medium" ? "bg-yellow-600 text-white" : "bg-gray-200"
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => setFilter("low")}
          className={`px-4 py-2 rounded-md ${
            filter === "low" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Low Priority
        </button>
      </div>

      {filteredHelpRequests.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No help requests found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHelpRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      request.urgency === "urgent"
                        ? "bg-red-100 text-red-800"
                        : request.urgency === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {request.urgency.charAt(0).toUpperCase() +
                      request.urgency.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(request.createdAt)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{request.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {request.description}
                </p>
                <div className="flex items-center text-gray-500 mb-4">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span>{request.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs mr-2">
                      {request.createdBy.name.charAt(0)}
                    </div>
                    <span className="text-sm">{request.createdBy.name}</span>
                  </div>
                  <Link
                    to={`/help-requests/${request._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpRequests;
