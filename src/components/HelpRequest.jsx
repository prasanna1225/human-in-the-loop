import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import database from './firebase'; // Import your initialized Firebase database

function HelpRequest() {
  const [question, setQuestion] = useState('');
  const [helpRequestStatus, setHelpRequestStatus] = useState('');

  const triggerHelpRequest = async () => {
    if (!question.trim()) {
      setHelpRequestStatus('❌ Please enter a question.');
      return;
    }

    try {
      const helpRequestsRef = ref(database, 'helpRequests');
      await push(helpRequestsRef, {
        question,
        customerInfo: "Customer details", // You can replace this with dynamic data
        timestamp: Date.now(),
        status: "pending"
      });
      setHelpRequestStatus('✅ Help request sent successfully.');
      setQuestion(''); // Clear input after sending
    } catch (error) {
      console.error('Error triggering help request:', error);
      setHelpRequestStatus('❌ Failed to send help request.');
    }
  };

  return (
    <div>
      <h2 className="header-helpRequest">Human-in-the-Loop - AI Failure</h2>
      <p>Trigger Help Request on AI Failure</p>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="input"
      />
      <br />
      <button className="button" onClick={triggerHelpRequest}>Send Help Request</button>
      <p>{helpRequestStatus}</p>
    </div>
  );
}

export default HelpRequest;

