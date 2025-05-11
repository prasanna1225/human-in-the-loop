import { ref, get } from 'firebase/database';
import database from './firebase'; // Import Firebase database

const getAnswerFromKnowledgeBase = async (question) => {
  try {
    const knowledgeBaseRef = ref(database, 'knowledgeBase');
    const snapshot = await get(knowledgeBaseRef);

    if (snapshot.exists()) {
      const knowledgeData = snapshot.val();
      // Check if the question exists in the knowledge base
      for (let key in knowledgeData) {
        if (knowledgeData[key].question === question) {
          return knowledgeData[key].answer;
        }
      }
    }
  } catch (error) {
    console.error('Error checking knowledge base:', error);
  }

  return null; // Return null if not found
};

const handleAIQuestion = async (question) => {
  const answer = await getAnswerFromKnowledgeBase(question);
  
  if (answer) {
    console.log('AI responding with answer:', answer);
    // Respond with the answer from the knowledge base
    return answer;
  } else {
    console.log('AI escalating question:', question);
    // Escalate to supervisor if no answer is found
  }
};
