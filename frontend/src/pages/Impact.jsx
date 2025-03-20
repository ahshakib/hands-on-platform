import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Impact = () => {
  const { user } = useContext(AuthContext);
  const [userPoints, setUserPoints] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    hours: '',
    description: '',
    date: new Date().toISOString().split('T')[0] // Today's date as default
  });
  const [logLoading, setLogLoading] = useState(false);
  const [logSuccess, setLogSuccess] = useState(false);
  const [logError, setLogError] = useState(null);

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        // Fetch user points
        const pointsRes = await axios.get('/api/impact/points');
        setUserPoints(pointsRes.data);
        
        // Fetch leaderboard
        const leaderboardRes = await axios.get('/api/impact/leaderboard');
        setLeaderboard(leaderboardRes.data);
      } catch (err) {
        setError('Failed to load impact data. Please try again later.');
        console.error('Error fetching impact data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImpactData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogLoading(true);
    setLogSuccess(false);
    setLogError(null);

    try {
      await axios.post('/api/impact/log-hours', formData);
      
      // Refresh user points
      const pointsRes = await axios.get('/api/impact/points');
      setUserPoints(pointsRes.data);
      
      // Reset form
      setFormData({
        hours: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      setLogSuccess(true);
    } catch (err) {
      setLogError(err.response?.data?.message || 'Failed to log volunteer hours. Please try again.');
    } finally {
      setLogLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading impact data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Impact</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Total Points</h2>
          <p className="text-4xl font-bold text-blue-600">{userPoints?.totalPoints || 0}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Hours Volunteered</h2>
          <p className="text-4xl font-bold text-green-600">{userPoints?.totalHours || 0}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Events Attended</h2>
          <p className="text-4xl font-bold text-purple-600">{userPoints?.eventsAttended || 0}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">Log Volunteer Hours</h2>
          </div>
          
          <div className="p-6">
            {logSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Volunteer hours logged successfully!
              </div>
            )}
            
            {logError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {logError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="hours" className="block text-gray-700 font-medium mb-2">Hours</label>
                <input
                  type="number"
                  id="hours"
                  name="hours"
                  min="0.5"
                  step="0.5"
                  value={formData.hours}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hours volunteered"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your volunteer activity"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={logLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {logLoading ? 'Submitting...' : 'Log Hours'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">Leaderboard</h2>
          </div>
          
          <div className="p-6">
            {leaderboard.length === 0 ? (
              <p className="text-gray-600 text-center">No data available</p>
            ) : (
              <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                  <div key={entry._id} className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{entry.name}</span>
                        <span className="font-bold text-blue-600">{entry.points} pts</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(entry.points / leaderboard[0].points) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;