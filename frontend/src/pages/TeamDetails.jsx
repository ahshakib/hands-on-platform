import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const TeamDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinLoading, setJoinLoading] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`/api/teams/${id}`);
        setTeam(res.data);
      } catch (err) {
        setError("Failed to load team details. Please try again later.");
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  const handleJoinTeam = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setJoinLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      await axios.post(`/api/teams/${id}/join`);
      // Refresh team data
      const res = await axios.get(`/api/teams/${id}`);
      setTeam(res.data);
      setSuccessMessage("You have successfully joined this team!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to join team. Please try again."
      );
    } finally {
      setJoinLoading(false);
    }
  };

  const handleLeaveTeam = async () => {
    if (!window.confirm("Are you sure you want to leave this team?")) {
      return;
    }

    setLeaveLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      await axios.post(`/api/teams/${id}/leave`);
      // Refresh team data
      const res = await axios.get(`/api/teams/${id}`);
      setTeam(res.data);
      setSuccessMessage("You have successfully left this team.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to leave team. Please try again."
      );
    } finally {
      setLeaveLoading(false);
    }
  };

  const isCreator = user && team && user._id === team.createdBy._id;
  const isMember =
    user && team && team.members.some((member) => member._id === user._id);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading team details...</p>
      </div>
    );
  }

  if (error && !team) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <Link
          to="/teams"
          className="text-red-700 font-medium underline mt-2 inline-block"
        >
          Back to Teams
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/teams"
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
        Back to Teams
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
                  team.isPrivate
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {team.isPrivate ? "Private" : "Public"}
              </span>
              <h1 className="text-3xl font-bold mt-2 mb-4">{team.name}</h1>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {team.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Team Leader</h2>
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                {team.createdBy.name.charAt(0)}
              </div>
              <span>{team.createdBy.name}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Members ({team.members.length})
            </h2>
            {team.members.length === 0 ? (
              <p className="text-gray-600">
                No members yet. Be the first to join!
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {team.members.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                  >
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs mr-2">
                      {member.name.charAt(0)}
                    </div>
                    <span className="text-sm">{member.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {user && !isCreator && !isMember && (
            <button
              onClick={handleJoinTeam}
              disabled={joinLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {joinLoading ? "Joining..." : "Join Team"}
            </button>
          )}

          {user && !isCreator && isMember && (
            <button
              onClick={handleLeaveTeam}
              disabled={leaveLoading}
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {leaveLoading ? "Leaving..." : "Leave Team"}
            </button>
          )}

          {!user && (
            <div className="text-center">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Log in to join this team
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
