// src/LearnedAnswers.jsx
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import database from './firebase';

function LearnedPage() {
  const [knowledgeBase, setKnowledgeBase] = useState([]);

  useEffect(() => {
    const fetchKnowledgeBase = async () => {
      try {
        const knowledgeBaseRef = ref(database, 'knowledgeBase');
        const snapshot = await get(knowledgeBaseRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const knowledgeList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setKnowledgeBase(knowledgeList);
        } else {
          console.log('No knowledge base data available');
        }
      } catch (error) {
        console.error('Error fetching knowledge base:', error);
      }
    };

    fetchKnowledgeBase();
  }, []);

  return (
    <div>
      <h2>Learned Knowledge Base</h2>
      <ul>
        {knowledgeBase.map((entry) => (
          <li key={entry.id}>
            <p><strong>Question:</strong> {entry.question}</p>
            <p><strong>Answer:</strong> {entry.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LearnedPage;
