import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Hands-On Platform
          </Link>

          <div className="flex space-x-6 items-center">
            <Link to="/events" className="hover:text-blue-200">
              Events
            </Link>
            <Link to="/help-requests" className="hover:text-blue-200">
              Help Requests
            </Link>
            <Link to="/teams" className="hover:text-blue-200">
              Teams
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/impact" className="hover:text-blue-200">
                  My Impact
                </Link>
                <Link to="/profile" className="hover:text-blue-200">
                  <span className="mr-2">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
