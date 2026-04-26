# 🚀 TalentPulse AI

### AI-Powered Talent Scouting & Engagement Agent

---

## 📌 Overview

TalentPulse AI is an AI-powered recruitment assistant that automates candidate discovery, evaluation, and engagement.

Recruiters often spend hours filtering profiles and assessing candidate interest. This system simplifies that workflow by:

* Parsing job descriptions
* Matching candidates based on skills
* Simulating candidate interest
* Generating AI insights & suggestions
* Producing a ranked shortlist

---

## ✨ Features

### 🔍 Smart Candidate Matching

* Skill-based matching from Job Description
* Match Score (0–100)
* Explainability (matched & missing skills)

---

### 💬 Interest Simulation

* Simulates candidate responses
* Generates:

  * Interest Score
  * Status (Interested / Neutral / Not Interested)

---

### 🤖 AI Layer (Groq API)

* Generates:

  * Recruiter Insight
  * Improvement Suggestions
  * Chat Responses

---

### 📊 Ranking System

Final Score is calculated as:

```text
Final Score = (0.7 × Match Score) + (0.3 × Interest Score)
```

Candidates are ranked in descending order and the top recommendation is highlighted.

---

### 💻 UI

* Clean and interactive interface
* Job Description input
* Ranked candidate list
* Chat interaction

---

## 🧠 Architecture

### 🔄 Flow

1. Recruiter inputs Job Description
2. Frontend fetches candidates from Firebase
3. Scoring Engine calculates Match Score
4. Interest Simulation generates Interest Score
5. AI Layer generates insights & suggestions
6. Ranked output displayed

---

## ⚙️ Tech Stack

| Layer    | Technology         |
| -------- | ------------------ |
| Frontend | React (Vite)       |
| Backend  | Firebase Firestore |
| AI       | Groq API (LLM)     |
| Styling  | CSS                |
| Diagram  | Draw.io            |

---

## 🧮 Scoring Logic

### Match Score

```
Matched Skills / Total Skills × 100
```

### Interest Score

Simulated based on match strength.

### Final Score

```
Final = (Match × 0.7) + (Interest × 0.3)
```

---

## 🧪 Sample Input

```
react, firebase with 2 years of experience
```

---

## 📤 Sample Output

```
#1 Riya Sharma
Match: 77
Interest: 84
Final: 79.1
Status: Interested

Strengths: React, Firebase
Missing: JavaScript

Insight: Strong fit with high engagement
Suggestion: Improve backend skills
```

---

## ▶️ How to Run Locally

```bash
git clone https://github.com/Ridhima-bhardwaj/TALENT-IMPULSE-AI.git
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🌐 Live Project

👉 https://talent-impulse-ai.vercel.app/

---

 

---

## 📁 Project Structure

```
frontend/
│
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│
├── docs/
│   ├── architecture.png
│
├── .env (ignored)
└── README.md
```

---

## 🔒 Security

* API keys stored in `.env`
* `.env` excluded via `.gitignore`
* Firestore rules:

  * Read allowed
  * Write restricted

---

## 📩 Submission Details

* GitHub Repo: https://github.com/Ridhima-bhardwaj/TALENT-IMPULSE-AI
* Live URL: https://talent-impulse-ai.vercel.app/
* Demo Video: 

---

## 👩‍💻 Author

**Ridhima Bhardwaj**

---

## 🏁 Conclusion

TalentPulse AI demonstrates how AI can:

* Automate candidate screening
* Provide explainable insights
* Improve recruiter decision-making

---
