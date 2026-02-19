# 🎸 GuitarPro – AI Powered Guitar Learning Platform

GuitarPro is a full-stack AI-powered guitar learning platform designed to provide structured, interactive, and intelligent guitar education.

Instead of searching randomly on YouTube, learners can follow organized tutorials, practice plans, and AI-based recommendations in one place.

---

## 🌟 Vision

To build a modern AI-driven guitar learning ecosystem where users can:

- Learn Acoustic & Electric Guitar
- Access 100+ structured song tutorials (Hindi & English)
- View professional guitar tabs
- Follow guided practice plans
- Get AI-powered recommendations
- Track their learning progress

---

## 🚀 Features

### 🎨 Modern UI
- Premium dark theme
- Black → Dark Purple gradient background
- Electric blue accent (#00f5ff)
- Neon glow buttons
- Glassmorphism cards
- Smooth animations
- Fully responsive (Mobile + Tablet + Desktop)

---

### 🔐 Authentication
- User Signup & Login
- JWT Authentication
- Password hashing
- Protected Dashboard

---

### 🎵 Song Library
- 100+ Songs (50 Hindi + 50 English)
- Filter by:
  - Language (Hindi / English)
  - Difficulty (Beginner / Intermediate / Advanced)
  - Guitar Type (Acoustic / Electric)
- Search functionality
- Song thumbnails

---

### 🎸 Song Tutorial Page

Each tutorial includes:

- 🎥 Video tutorial placeholder
- 📖 6-line Guitar Tab format:

```
e|----------------|
B|----------------|
G|-------0--------|
D|----0-----0-----|
A|--2-------------|
E|----------------|
```

- 🎼 Chords (G, C, D, Em, etc.)
- 🥁 Strumming patterns
- 🎶 Tempo
- 📝 Practice tips

---

### 📊 Dashboard
- AI Recommended Songs
- Continue Learning section
- Practice Progress Tracking
- Recently Viewed Songs

---

### 🛠️ Admin Panel
- Add new songs
- Edit existing songs
- Delete songs
- Manage tutorials

---

### 🤖 AI & ML Integration

- Recommendation model based on:
  - User difficulty level
  - Practice history
  - Viewed songs
- Practice Plan Generator
- gTTS integration for voice tutorials
- FFmpeg pipeline for video generation
- FastAPI ML microservice

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- SQLite Database
- JWT Authentication

### AI / ML Service
- Python
- FastAPI
- Scikit-learn
- gTTS
- FFmpeg

---

## 📁 Project Structure

```
project-root/
│
├── frontend/        # React app (Runs on port 6969)
├── backend/         # Express API server (Runs on port 0969)
├── ml-service/      # FastAPI AI service
├── database/        # SQLite schema & seed data
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd project-root
```

---

## 🖥️ Backend Setup (Port 0969)

```bash
cd backend
npm install
node server.js
```

Server runs at:

```
http://localhost:0969
```

---

## 🎨 Frontend Setup (Port 6969)

```bash
cd frontend
npm install
npm run dev -- --port 6969
```

Frontend runs at:

```
http://localhost:6969
```

---

## 🤖 ML Service Setup

```bash
cd ml-service
pip install -r requirements.txt
uvicorn main:app --reload
```

ML Service runs at:

```
http://localhost:8000
```

---

## 🗄️ Database Setup

1. Navigate to `/database`
2. Run `schema.sql` in SQLite
3. Seed sample song data

---

## 📊 Database Tables

- Users
- Songs
- Tutorials
- PracticeHistory
- Recommendations

---

## 📈 Future Improvements

- Real-time chord detection
- Audio pitch recognition
- AI-based practice scoring
- Cloud deployment
- Mobile App version
- Social sharing system

---

## 👨‍💻 Creator

**Created by Saurabh Singh**  
2nd Year B.Tech CSE Student  
KIIT University  

GuitarPro is independently conceptualized, architected, and developed as a full-stack AI-powered system demonstrating:

- Full-Stack Development
- System Architecture Design
- AI/ML Integration
- Database Design
- Scalable Project Structuring

---

## 📜 License

This project is created for educational and portfolio purposes.

---

## 💡 Inspiration

Most learners depend on YouTube for guitar tutorials, which often lack structure and personalization.

GuitarPro aims to solve that problem by providing:

- Structured learning
- AI recommendations
- Practice tracking
- Clean, distraction-free interface
