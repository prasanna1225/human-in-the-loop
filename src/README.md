# 🧠 Human-in-the-Loop AI Receptionist System

A web-based system designed for **Frontdesk.ai** to seamlessly integrate human supervisors into AI receptionist workflows. This system allows escalation of uncertain queries, supervisor responses, and management of learned answers.

## 🚀 Features

- 🎧 **LiveKit integration** for real-time communication between AI agents and supervisors
- 👨‍💼 **Supervisor Dashboard** to review, handle, and escalate requests
- 📚 **Learned Answers** page to manage and update responses to escalated queries
- ✅ **Human-in-the-loop control** for reliable AI-human handoff
- ⚡ Built with **React + Vite** for fast development

---

## 📂 Project Structure
human-in-loop/
├── public/
│ └── vite.svg
├── src/
│ ├── components/
│ │ ├── SupervisorDashboard.jsx
│ │ ├── LearnedAnswers.jsx
│ │ ├── HelpRequest.jsx
│ │ └── AnswerCard.jsx
│ ├── App.jsx
│ ├── App.css
│ └── main.jsx
├── screenshots/
│ ├── supervisor-dashboard.png
│ └── learned-answers.png
├── index.html
└── vite.config.js



## ⚙️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Real-time Comm**: LiveKit
- **Backend/AI Integration**: Simulated (can be extended to connect to LLMs or backend APIs)

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/human-in-loop.git
cd human-in-loop

# Install dependencies
npm install

# Run the development server
npm run dev

🧠 How It Works
AI agents escalate requests they can’t handle to a LiveKit room.

A supervisor joins the room via the dashboard and assists.

Supervisor marks whether it’s a known query or a new one.

New answers get stored on the Learned Answers page for future use.

✅ Future Improvements
Integrate real LLM-based receptionists

Add authentication for supervisors

Webhook support for saving learned answers to a database

Real-time notification for escalated requests

🙌 Acknowledgments
Built as part of the Frontdesk.ai Engineering Test
Thanks to LiveKit for the WebRTC infrastructure

📧 Contact
Developed by Prasanna
GitHub: @prasanna1225
Email: prasannadonga1357@gmail.com


