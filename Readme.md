# 🎯 AI Interview Platform

An **AI-driven interview preparation platform** built using the **MERN stack** to help users practice mock interviews, receive instant AI feedback, and track improvement over time.

This project focuses on **real-world interview workflows**, **cost-efficient AI usage**, and **clean scalable architecture**.

---

## 🚀 Features

### 👤 User Features
- Secure authentication (Login / Signup)
- Role-based interviews (Fresher / Experienced)
- AI-powered mock interviews
- Real-time AI feedback on answers
- Performance summary dashboard
- Before vs After improvement comparison
- Fully responsive UI

### 🤖 AI Features
- Single AI model (cost optimized)
- Skill-based question generation
- Structured evaluation and scoring
- One AI call per question and answer

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Custom Hooks

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### AI Layer
- LLM API
- Controlled API usage
- Performance-focused responses

---

## 🔄 Project Workflow

### 1️⃣ Authentication Flow
User → Login / Signup → JWT Token → Protected Routes

- User credentials validated by backend
- JWT token issued for session management

---

### 2️⃣ Dashboard Flow
Login → Dashboard → View History → Start Interview

- Displays previous interviews
- Shows performance summary
- Option to start a new interview

---

### 3️⃣ Interview Setup Flow
Select Interview Type → Role → Experience Level → Skills

4️⃣ AI Question Generation
Frontend → Backend → AI Model → Question


AI generates role-specific interview questions

One AI call per question

5️⃣ Answer Evaluation Flow
User Answer → Backend → AI Evaluation → Feedback


AI evaluates:

Technical correctness

Communication clarity

Structure of response

Confidence level

6️⃣ Interview Loop
Question → Answer → Feedback → Next Question


Repeats for a fixed number of questions

Each response stored independently

7️⃣ Interview Summary
Interview End → Summary Generation → Dashboard Update


Overall score

Strengths and weaknesses

Improvement suggestions
📁 Project Structure
Ai-Interview/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── utils/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── index.js
│
├── README.md
└── package.json

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/ai-interview-platform.git
cd ai-interview-platform

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🧪 Interview Flow Example

User logs in

Selects interview type and role

AI generates interview questions

User submits answers

AI evaluates responses

Dashboard displays performance insights

User compares improvement over time