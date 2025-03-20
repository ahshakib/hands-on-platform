import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from token on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get("/api/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/users/register", userData);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/users/login", userData);
      // After login, fetch user profile
      await loadUserProfile();
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load user profile
  const loadUserProfile = async () => {
    try {
      const res = await axios.get("/api/profile");
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.error("Error loading profile:", err);
      return null;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // Clear cookies by making a request to a logout endpoint
      // Note: Backend would need to implement this
      // await axios.post('/api/users/logout');
      setUser(null);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.patch("/api/profile", profileData);
      setUser(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        loadUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
