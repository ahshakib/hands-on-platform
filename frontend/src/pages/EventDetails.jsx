import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinLoading, setJoinLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError("Failed to load event details. Please try again later.");
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleJoinEvent = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setJoinLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      await axios.post(`/api/events/${id}/join`);
      // Refresh event data
      const res = await axios.get(`/api/events/${id}`);
      setEvent(res.data);
      setSuccessMessage("You have successfully joined this event!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to join event. Please try again."
      );
    } finally {
      setJoinLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this event? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeleteLoading(true);
    setError(null);

    try {
      await axios.delete(`/api/events/${id}`);
      navigate("/events");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete event. Please try again."
      );
      setDeleteLoading(false);
    }
  };

  const isCreator = user && event && user._id === event.createdBy._id;
  const hasJoined =
    user &&
    event &&
    event.attendees.some((attendee) => attendee._id === user._id);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading event details...</p>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <Link
          to="/events"
          className="text-red-700 font-medium underline mt-2 inline-block"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/events"
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
        Back to Events
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
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {event.category}
              </span>
              <h1 className="text-3xl font-bold mt-2 mb-4">{event.title}</h1>
            </div>
            {isCreator && (
              <button
                onClick={handleDeleteEvent}
                disabled={deleteLoading}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Delete Event"}
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-6">
            <div className="flex items-center mr-6 mb-2 md:mb-0">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center mr-6 mb-2 md:mb-0">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
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
              <span>{event.location}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Organizer</h2>
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                {event.createdBy.name.charAt(0)}
              </div>
              <span>{event.createdBy.name}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Attendees ({event.attendees.length})
            </h2>
            {event.attendees.length === 0 ? (
              <p className="text-gray-600">
                No attendees yet. Be the first to join!
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {event.attendees.map((attendee) => (
                  <div
                    key={attendee._id}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                  >
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs mr-2">
                      {attendee.name.charAt(0)}
                    </div>
                    <span className="text-sm">{attendee.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {user && !isCreator && !hasJoined && (
            <button
              onClick={handleJoinEvent}
              disabled={joinLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {joinLoading ? "Joining..." : "Join Event"}
            </button>
          )}

          {user && hasJoined && (
            <div className="bg-green-100 text-green-800 px-4 py-3 rounded text-center">
              You are attending this event!
            </div>
          )}

          {!user && (
            <div className="text-center">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Log in to join this event
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
