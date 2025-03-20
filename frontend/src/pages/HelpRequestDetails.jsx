import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const HelpRequestDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [helpRequest, setHelpRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [volunteerLoading, setVolunteerLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchHelpRequest = async () => {
      try {
        const res = await axios.get(`/api/help-requests/${id}`);
        setHelpRequest(res.data);
      } catch (err) {
        setError(
          "Failed to load help request details. Please try again later."
        );
        console.error("Error fetching help request:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpRequest();
  }, [id]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleVolunteer = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setVolunteerLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      await axios.post(`/api/help-requests/${id}/volunteer`);
      // Refresh help request data
      const res = await axios.get(`/api/help-requests/${id}`);
      setHelpRequest(res.data);
      setSuccessMessage(
        "You have successfully volunteered for this help request!"
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to volunteer. Please try again."
      );
    } finally {
      setVolunteerLoading(false);
    }
  };

  const handleDeleteHelpRequest = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this help request? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeleteLoading(true);
    setError(null);

    try {
      await axios.delete(`/api/help-requests/${id}`);
      navigate("/help-requests");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete help request. Please try again."
      );
      setDeleteLoading(false);
    }
  };

  const isCreator =
    user && helpRequest && user._id === helpRequest.createdBy._id;
  const hasVolunteered =
    user &&
    helpRequest &&
    helpRequest.volunteers.some((volunteer) => volunteer._id === user._id);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading help request details...</p>
      </div>
    );
  }

  if (error && !helpRequest) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <Link
          to="/help-requests"
          className="text-red-700 font-medium underline mt-2 inline-block"
        >
          Back to Help Requests
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/help-requests"
        className="text-blue-600 hover:text-blue-800 flex items-center mb-6"
      >
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Help Requests
      </Link>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {successMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  helpRequest.urgency === "urgent"
                    ? "bg-red-100 text-red-800"
                    : helpRequest.urgency === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {helpRequest.urgency.charAt(0).toUpperCase() +
                  helpRequest.urgency.slice(1)}
              </span>
              <h1 className="text-3xl font-bold mt-2 mb-4">
                {helpRequest.title}
              </h1>
            </div>
            {isCreator && (
              <button
                onClick={handleDeleteHelpRequest}
                disabled={deleteLoading}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Delete Request"}
              </button>
            )}
          </div>

          <div className="flex items-center text-gray-600 mb-6">
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
            <span>{helpRequest.location}</span>
            <span className="mx-2">•</span>
            <span>Posted on {formatDate(helpRequest.createdAt)}</span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {helpRequest.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Requested By</h2>
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                {helpRequest.createdBy.name.charAt(0)}
              </div>
              <span>{helpRequest.createdBy.name}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Volunteers ({helpRequest.volunteers.length})
            </h2>
            {helpRequest.volunteers.length === 0 ? (
              <p className="text-gray-600">
                No volunteers yet. Be the first to help!
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {helpRequest.volunteers.map((volunteer) => (
                  <div
                    key={volunteer._id}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                  >
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs mr-2">
                      {volunteer.name.charAt(0)}
                    </div>
                    <span className="text-sm">{volunteer.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {user && !isCreator && !hasVolunteered && (
            <button
              onClick={handleVolunteer}
              disabled={volunteerLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {volunteerLoading ? "Volunteering..." : "Volunteer to Help"}
            </button>
          )}

          {user && hasVolunteered && (
            <div className="bg-green-100 text-green-800 px-4 py-3 rounded text-center">
              You are volunteering for this request!
            </div>
          )}

          {!user && (
            <div className="text-center">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Log in to volunteer for this request
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpRequestDetails;
