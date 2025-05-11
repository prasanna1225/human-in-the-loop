
import { ref, set } from "firebase/database";
import database from "./firebase"; 

function createKnowledgeBaseNode() {
  const knowledgeBaseRef = ref(database, 'knowledgeBase');
  set(knowledgeBaseRef, {})
    .then(() => {
      console.log('✅ knowledgeBase node created!');
    })
    .catch((error) => {
      console.error('❌ Error creating knowledgeBase:', error);
    });
}

export default createKnowledgeBaseNode;
