import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import HelpRequests from './pages/HelpRequests';
import HelpRequestDetails from './pages/HelpRequestDetails';
import CreateHelpRequest from './pages/CreateHelpRequest';
import Teams from './pages/Teams';
import TeamDetails from './pages/TeamDetails';
import CreateTeam from './pages/CreateTeam';
import Impact from './pages/Impact';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/create" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
          <Route path="/help-requests" element={<HelpRequests />} />
          <Route path="/help-requests/:id" element={<HelpRequestDetails />} />
          <Route path="/help-requests/create" element={<PrivateRoute><CreateHelpRequest /></PrivateRoute>} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/teams/create" element={<PrivateRoute><CreateTeam /></PrivateRoute>} />
          <Route path="/impact" element={<PrivateRoute><Impact /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;