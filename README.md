# 🚀 TalentMatch AI – Intelligent Recruitment & Career Copilot

> An AI-powered recruitment ecosystem that connects candidates and recruiters through intelligent skill analysis, resume parsing, career guidance, job matching, application tracking, and scam job detection.

🌐 **Live Demo:** https://skillmatch-gamma.vercel.app/

---

# 📌 Overview

TalentMatch AI is a full-stack MERN application designed to modernize the recruitment process by leveraging Artificial Intelligence. The platform helps candidates discover opportunities aligned with their skills while enabling recruiters to efficiently identify qualified applicants.

By combining AI-powered resume analysis, intelligent job matching, career guidance, application management, and scam detection, TalentMatch AI delivers a complete career development and recruitment solution.

---

# 🎯 Problem Statement

Traditional job portals focus primarily on job listings and applications, offering limited career guidance and skill analysis. Candidates often struggle to identify skill gaps, discover suitable opportunities, and avoid fraudulent job postings.

TalentMatch AI bridges this gap by integrating AI-powered career assistance, skill matching, recruiter tools, and scam detection into a single platform, improving both hiring efficiency and candidate success.

---

# ✨ Key Features

## 👨‍💼 Candidate Portal

### 📄 Resume Analysis & Skill Mapping

* Upload PDF resumes for AI-powered analysis
* Automatic skill extraction and categorization
* Resume-based career recommendations
* Personalized learning roadmaps
* Interactive skill visualization dashboard

### 🤖 AI Career Assistant

* AI-powered career guidance chatbot
* Technology learning recommendations
* Interview preparation assistance
* Career planning support
* Personalized skill development suggestions

### 💼 Job Discovery & Applications

* Browse available opportunities
* Apply directly through the platform
* Track application status
* Personalized job recommendations
* Skill-based opportunity matching

### 👤 Profile Management

* Secure user authentication
* Candidate dashboard
* Resume management
* Skills tracking and visualization

---

## 🏢 Recruiter Portal

### 📢 Job Posting Management

* Recruiter registration and authentication
* Create and manage job postings
* Define required skills and qualifications
* Publish opportunities to candidates
* Track candidate applications

### 📊 Applicant Management

* View candidate applications
* Analyze applicant skills
* Evaluate candidate-job compatibility
* Streamline recruitment workflows

---

# 🤖 AI-Powered Features

## 📄 Resume Parsing & Skill Extraction

* Automated resume analysis
* Technical skill identification
* Technology stack extraction
* Candidate profile generation

## 🎯 Intelligent Job Matching

* Match candidate skills with job requirements
* Recommend relevant opportunities
* Improve hiring efficiency
* Reduce recruiter screening effort

## 💬 AI Career Guidance Chatbot

* Career counseling assistance
* Learning roadmap generation
* Interview preparation support
* Industry-specific recommendations

## 🛡️ Scam Job Detection

* Detect suspicious job postings
* Analyze job descriptions for fraud indicators
* Improve platform trust and safety
* Prevent fake recruitment activities

---

# 📊 Project Statistics

* 👥 2 User Roles (Candidate & Recruiter)
* 🔐 JWT-Based Authentication System
* 🤖 4 AI-Powered Modules
* 📄 Resume Parsing Engine
* 🎯 Intelligent Skill Matching System
* 🛡️ Scam Detection Module
* 📡 15+ REST API Endpoints
* 💼 End-to-End Recruitment Workflow
* 🌐 Full-Stack MERN Architecture

---

# 🏗️ System Architecture

```text
                    ┌───────────────────┐
                    │   React Frontend  │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Express.js Backend│
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼

 ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
 │ MongoDB     │      │ Gemini AI   │      │ JWT Auth    │
 │ Atlas       │      │ Services    │      │ Security    │
 └─────────────┘      └─────────────┘      └─────────────┘
                              │
                              ▼
          Resume Analysis • Career Guidance
          Skill Matching • Scam Detection
```

---

# 🔐 Security Features

## Authentication & Authorization

* JWT Authentication
* Role-Based Access Control
* Protected Routes
* Secure Session Management

## Data Protection

* Password Hashing using bcrypt
* Secure API Communication
* Protected User Information
* Authentication Middleware

---

# 🛠 Tech Stack

## Frontend

| Technology       | Purpose           |
| ---------------- | ----------------- |
| React.js         | User Interface    |
| JavaScript       | Application Logic |
| CSS3             | Styling           |
| React Router DOM | Routing           |
| Axios            | API Communication |
| React Icons      | UI Components     |

---

## Backend

| Technology | Purpose              |
| ---------- | -------------------- |
| Node.js    | Runtime Environment  |
| Express.js | REST API Development |

---

## Database

| Technology    | Purpose           |
| ------------- | ----------------- |
| MongoDB Atlas | Database          |
| Mongoose      | Database Modeling |

---

## Artificial Intelligence

| Technology       | Purpose          |
| ---------------- | ---------------- |
| Google Gemini AI | Resume Analysis  |
| Google Gemini AI | Career Guidance  |
| Google Gemini AI | Skill Extraction |
| Google Gemini AI | Scam Detection   |

---

## Security

| Technology | Purpose             |
| ---------- | ------------------- |
| JWT        | Authentication      |
| bcrypt     | Password Encryption |

---

## Deployment

| Technology       | Purpose          |
| ---------------- | ---------------- |
| Vercel           | Frontend Hosting |
| Render / Railway | Backend Hosting  |

---

# 📁 Project Structure

```bash
TalentMatchAI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── chatbot_ai/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .env
```

---

# 📱 Application Routes

| Route         | Description           |
| ------------- | --------------------- |
| /             | Landing Page          |
| /auth         | Login & Registration  |
| /candidate    | Candidate Dashboard   |
| /recruiter    | Recruiter Dashboard   |
| /profile      | User Profile          |
| /jobs         | Available Jobs        |
| /applied-jobs | Applied Jobs          |
| /post-job     | Recruiter Job Posting |
| /applicants   | Applicant Management  |

---

# 🚀 Getting Started

## Prerequisites

* Node.js 18+
* MongoDB Atlas
* Google Gemini API Key

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/TalentMatchAI.git
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

### Backend Setup

```bash
cd backend

npm install

npm start
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

# 🏆 Key Accomplishments

✔ Developed a full-stack MERN recruitment platform with role-based authentication.

✔ Integrated Google Gemini AI for resume analysis, career guidance, skill extraction, and scam detection.

✔ Built an intelligent skill-matching system to connect candidates with relevant opportunities.

✔ Implemented secure JWT authentication and protected API architecture.

✔ Designed recruiter and candidate dashboards for end-to-end hiring workflows.

✔ Deployed a production-ready application using modern cloud hosting solutions.

---

# 📸 Screenshots

### Landing Page

(Add Screenshot)

### Candidate Dashboard

(Add Screenshot)

### Resume Analysis & Skill Mapping

(Add Screenshot)

### AI Career Assistant

(Add Screenshot)

### Recruiter Dashboard

(Add Screenshot)

### Job Posting Module

(Add Screenshot)

---

# 🔮 Future Enhancements

* AI Mock Interviews
* ATS Resume Scoring
* Resume Builder
* Email Notifications
* Real-Time Recruiter Chat
* Learning Platform Integration
* Advanced Fraud Detection
* Skill Gap Analytics
* Voice-Based Career Assistant
* AI Interview Feedback System

---

# 📈 Resume Highlights

* Developed an AI-powered recruitment and career guidance platform using React, Node.js, Express.js, MongoDB Atlas, and Google Gemini AI.
* Implemented resume parsing, skill extraction, intelligent job matching, and scam detection modules.
* Built secure authentication and recruiter management systems supporting end-to-end hiring workflows.


