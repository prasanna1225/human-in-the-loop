import express from 'express';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { AccessToken } = require('livekit-server-sdk');
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
const port = 3001;

app.get('/token', async (req, res) => {  // <-- add async here
    const { identity, room } = req.query;
    console.log('API_KEY:', process.env.API_KEY);
    console.log('API_SECRET:', process.env.API_SECRET);
    console.log('identity:', identity);
    console.log('room:', room);

    const at = new AccessToken(process.env.API_KEY, process.env.API_SECRET, {
        identity: identity,
    });
    at.addGrant({ roomJoin: true, room: room });

    const token = await at.toJwt(); // <-- add await here
    console.log('Generated token:', token);

    res.json({ token });
});
app.post('/request-help', async (req, res) => {
    const { question, userId } = req.body;
  
    // Save the request to Firebase
    await db.collection('helpRequests').add({
      question,
      userId,
      status: 'pending',
      timestamp: new Date(),
    });
    res.status(200).send({ message: 'Help request submitted' });
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
