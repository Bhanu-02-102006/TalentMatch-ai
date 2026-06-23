# TalentMatch AI 🚀

### AI-Powered Recruitment, Career Guidance & Skill Matching Platform

TalentMatch AI is a full-stack recruitment ecosystem that connects candidates and recruiters through AI-driven skill analysis, intelligent job matching, resume parsing, career guidance, application tracking, and scam job detection. The platform enables candidates to discover opportunities aligned with their skills while helping recruiters identify qualified applicants efficiently.

🌐 **Live Demo:** https://skillmatch-gamma.vercel.app/

---

# ✨ Key Features

## 👨‍💼 Candidate Portal

### Resume Analysis & Skill Mapping

* Upload PDF resumes for AI-powered analysis
* Automatic skill extraction and categorization
* Interactive skill mapping dashboard
* Resume-based career recommendations
* Personalized learning roadmaps

### AI Career Assistant

* AI-powered career guidance chatbot
* Technology learning paths
* Interview preparation assistance
* Career planning recommendations
* Skill development suggestions

### Job Discovery & Applications

* Browse available opportunities
* Apply directly through the platform
* Track applied jobs
* Personalized job recommendations
* Skill-based job matching

### Profile Management

* Secure user authentication
* Candidate profile dashboard
* Resume management
* Skills visualization and tracking

---

## 🏢 Recruiter Portal

### Job Posting Management

* Recruiter registration and authentication
* Create and manage job postings
* Define required skills and qualifications
* Publish opportunities to candidates
* Track applications

### Applicant Management

* View candidate applications
* Analyze candidate skills
* Evaluate applicant-job compatibility
* Manage recruitment workflow

---

## 🤖 AI-Powered Features

### Resume Parsing & Skill Extraction

* Automated resume analysis
* Technical skill identification
* Technology stack extraction
* Candidate profile generation

### Intelligent Job Matching

* Match candidate skills with job requirements
* Recommend suitable opportunities
* Improve hiring efficiency

### AI Career Guidance Chatbot

* Career counseling assistance
* Learning roadmap generation
* Interview preparation support
* Industry-specific recommendations

### Scam Job Detection

* Detect suspicious job postings
* Analyze job descriptions for fraud indicators
* Improve platform trust and safety
* Prevent fake recruitment activities

---

# 🔐 Security Features

### Authentication & Authorization

* JWT Authentication
* Role-Based Access Control
* Protected Routes
* Secure Session Management

### Data Protection

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

## Backend

| Technology | Purpose              |
| ---------- | -------------------- |
| Node.js    | Runtime Environment  |
| Express.js | REST API Development |

## Database

| Technology    | Purpose           |
| ------------- | ----------------- |
| MongoDB Atlas | Database          |
| Mongoose      | Database Modeling |

## Artificial Intelligence

| Technology       | Purpose          |
| ---------------- | ---------------- |
| Google Gemini AI | Resume Analysis  |
| Google Gemini AI | Career Guidance  |
| Google Gemini AI | Skill Extraction |
| Google Gemini AI | Scam Detection   |

## Security

| Technology | Purpose             |
| ---------- | ------------------- |
| JWT        | Authentication      |
| bcrypt     | Password Encryption |

## Deployment

| Technology       | Purpose          |
| ---------------- | ---------------- |
| Vercel           | Frontend Hosting |
| Render / Railway | Backend Hosting  |

---

# 📁 Project Structure

```text
TalentMatchAI/
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx
│   │   │   ├── CandidateDashboard.jsx
│   │   │   ├── RecruiterDashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── AppliedJobs.jsx
│   │   │   ├── PostJob.jsx
│   │   │   └── Applicants.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── jobService.js
│   │   │   ├── geminiService.js
│   │   │   └── scamDetection.js
│   │   │
│   │   ├── styles/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── resumeParser.js
│   │   ├── skillMatching.js
│   │   └── scamDetection.js
│   │
│   ├── config/
│   │   └── db.js
│   │
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

# 🔌 API Endpoints

## Authentication

| Method | Endpoint           | Description    | Auth Required |
| ------ | ------------------ | -------------- | ------------- |
| POST   | /api/auth/register | Register User  | No            |
| POST   | /api/auth/login    | Login User     | No            |
| GET    | /api/auth/profile  | Get Profile    | Yes           |
| PUT    | /api/auth/profile  | Update Profile | Yes           |

---

## Resume & Skills

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | /api/resume/upload | Upload Resume   |
| POST   | /api/resume/parse  | Extract Skills  |
| GET    | /api/skills        | Get User Skills |

---

## Jobs

| Method | Endpoint          | Description  |
| ------ | ----------------- | ------------ |
| GET    | /api/jobs         | Get Jobs     |
| POST   | /api/jobs/create  | Create Job   |
| POST   | /api/jobs/apply   | Apply Job    |
| GET    | /api/jobs/applied | Applied Jobs |
| DELETE | /api/jobs/remove  | Remove Job   |

---

## AI Services

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | /api/chat        | AI Career Guidance |
| POST   | /api/job-match   | Skill Matching     |
| POST   | /api/scam-detect | Scam Detection     |
| POST   | /api/roadmap     | Learning Roadmap   |

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

# 📸 Screenshots

## Landing Page

(Add Screenshot)

## Candidate Dashboard

(Add Screenshot)

## Resume Skill Mapping

(Add Screenshot)

## AI Career Assistant

(Add Screenshot)

## Recruiter Dashboard

(Add Screenshot)

## Job Posting Module

(Add Screenshot)

---

# 🎯 Future Enhancements

* AI Mock Interviews
* ATS Resume Scoring
* Resume Builder
* Email Notifications
* Real-Time Recruiter Chat
* Learning Platform Integration
* Advanced Fraud Detection
* Skill Gap Analytics

---

# 📊 Project Highlights

* AI-Powered Recruitment Platform
* Resume Parsing & Skill Extraction
* Intelligent Job Matching
* AI Career Guidance Chatbot
* Scam Job Detection
* Recruiter & Candidate Dashboards
* Role-Based Authentication
* Full-Stack MERN Architecture
* Responsive Modern UI
* Secure JWT Authentication

---

