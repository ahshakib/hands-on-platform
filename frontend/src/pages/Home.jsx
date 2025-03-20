import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Make a Difference in Your Community
          </h1>
          <p className="text-xl mb-8">
            Connect with volunteer opportunities and help requests in your area.
            Join teams and track your impact.
          </p>

          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="btn bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-md font-medium text-lg"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-lg"
              >
                Find Events
              </Link>
              <Link
                to="/help-requests"
                className="btn bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-md font-medium text-lg"
              >
                Help Someone
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-3">Find Opportunities</h3>
            <p className="text-gray-600">
              Browse volunteer events and help requests in your community that
              match your skills and interests.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-3">Join or Create Teams</h3>
            <p className="text-gray-600">
              Volunteer with friends or meet new people by joining existing
              teams or creating your own.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-3">Track Your Impact</h3>
            <p className="text-gray-600">
              See the difference you're making with impact tracking for
              volunteer hours and contributions.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to make an impact?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our community of volunteers and organizations working together to
          make a difference.
        </p>

        {!user ? (
          <Link to="/register" className="btn-primary btn px-6 py-3 text-lg">
            Create Your Account
          </Link>
        ) : (
          <Link
            to="/events/create"
            className="btn-primary btn px-6 py-3 text-lg"
          >
            Create an Event
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;
