// src/App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Room } from 'livekit-client';
import HelpRequest from './components/HelpRequest';
import createKnowledgeBaseNode from './components/createKnowledgeBaseNode';
import './App.css';
import SupervisorDashboard from './SupervisorDashboard';
import LearnedPage from './components/LearnedPage';

function App() {
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // Run Firebase knowledge base node creation once
    createKnowledgeBaseNode();

    // Fetch token and connect to LiveKit
    fetch('http://localhost:3001/token?identity=testuser&room=room1')
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
        connectToRoom(data.token);
      })
      .catch((error) => {
        console.error('Error fetching token:', error);
      });
  }, []);

  const connectToRoom = async (token) => {
    try {
      const livekitUrl = import.meta.env.VITE_LIVEKIT_URL;
      if (!livekitUrl) {
        throw new Error('LiveKit URL is missing');
      }

      const options = { audio: true };

      const room = await Room.connect(livekitUrl, token, options);
      setRoom(room);
      console.log('Successfully connected to room:', room);
    } catch (error) {
      console.error('Failed to connect to LiveKit room:', error);
    }
  };

  return (
    <Router>
      <div>
        <h1 className="header">Human-in-the-Loop AI Supervisor</h1>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <ul>
            <li>
              <Link to="/" className="tab-link">Help Request</Link>
            </li>
            <li>
              <Link to="/dashboard" className="tab-link">Dashboard</Link>
            </li>
            <li>
              <Link to="/learned" className="tab-link">Learned Q&A</Link>
            </li>
          </ul>
        </nav>

        {/* Define the routes */}
        <Routes>
          <Route path="/" element={<HelpRequest />} />
          <Route path="/dashboard" element={<SupervisorDashboard />} />
          <Route path="/learned" element={<LearnedPage />} />  {/* Add LearnedPage Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
