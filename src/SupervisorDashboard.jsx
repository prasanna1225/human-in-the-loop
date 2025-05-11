// src/SupervisorDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, get, update, push } from 'firebase/database';
import database from './components/firebase';

function SupervisorDashboard() {
  const [helpRequests, setHelpRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const helpRequestsRef = ref(database, 'helpRequests');
        const snapshot = await get(helpRequestsRef);
        if (snapshot.exists()) {
          const requestsData = snapshot.val();
          const requestsList = Object.keys(requestsData).map((key) => ({
            id: key,
            ...requestsData[key],
          }));
          setHelpRequests(requestsList);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching help requests:', error);
      }
    };

    fetchHelpRequests();
  }, []);

  const resolveRequest = async () => {
    if (selectedRequest && answer) {
      try {
        const requestRef = ref(database, `helpRequests/${selectedRequest.id}`);
        await update(requestRef, {
          status: 'resolved',
          answer: answer,
        });

        const knowledgeBaseRef = ref(database, 'knowledgeBase');
        await push(knowledgeBaseRef, {
          question: selectedRequest.question,
          answer: answer,
        });

        setHelpRequests(helpRequests.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: 'resolved', answer } : req
        ));

        setSelectedRequest(null);
        setAnswer('');
      } catch (error) {
        console.error('Error resolving help request:', error);
      }
    }
  };

  return (
    <div>
      <h2>Supervisor Dashboard</h2>
      <div>
        <h3>Pending Help Requests</h3>
        <ol>
          {helpRequests.filter(req => req.status === 'pending').map(request => (
            <li key={request.id}>
              <p><strong>Question:</strong> {request.question}</p>
              <button className="resolve" onClick={() => setSelectedRequest(request)}>Resolve</button>
            </li>
          ))}
        </ol>
      </div>

      {selectedRequest && (
        <div>
          <h3>Resolve Help Request</h3>
          <p><strong>Question:</strong> {selectedRequest.question}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button className="submit-answer" onClick={resolveRequest}>Submit Answer</button>
        </div>
      )}

      <div>
        <h3>View Knowledge Base</h3>
        {/* Link to the LearnedPage */}
        <Link to="/learned" className="link-learned">View Learned Q&A</Link>
      </div>
    </div>
  );
}

export default SupervisorDashboard;
