import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: [],
    causes: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [causeInput, setCauseInput] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load user data into form when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        skills: user.skills || [],
        causes: user.causes || []
      });
    }
  }, [user]);

  const { name, email, skills, causes } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setFormData({ ...formData, skills: [...skills, skillInput] });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addCause = () => {
    if (causeInput && !causes.includes(causeInput)) {
      setFormData({ ...formData, causes: [...causes, causeInput] });
      setCauseInput('');
    }
  };

  const removeCause = (causeToRemove) => {
    setFormData({
      ...formData,
      causes: causes.filter(cause => cause !== causeToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    
    try {
      await updateProfile({
        name,
        skills,
        causes
      });
      setSuccessMessage('Profile updated successfully');
    } catch (err) {
      setFormError(error || 'Profile update failed. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {formError}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                disabled
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            
            <div className="mb-4">
              <label className="form-label">Skills</label>
              <div className="flex">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a skill"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-blue-800 hover:text-blue-900"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="form-label">Causes You Care About</label>
              <div className="flex">
                <input
                  type="text"
                  value={causeInput}
                  onChange={(e) => setCauseInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a cause you care about"
                />
                <button
                  type="button"
                  onClick={addCause}
                  className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {causes.map((cause, index) => (
                  <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                    {cause}
                    <button
                      type="button"
                      onClick={() => removeCause(cause)}
                      className="ml-2 text-green-800 hover:text-green-900"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;