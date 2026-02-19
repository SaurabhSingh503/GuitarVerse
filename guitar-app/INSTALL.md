# =============================================================================
# GuitarPro — Complete Installation & Setup Guide
# =============================================================================

## PREREQUISITES
- Node.js >= 18.0.0
- Python >= 3.9
- FFmpeg (for video generation)
- npm or yarn

---

## STEP 1: CLONE / SETUP PROJECT STRUCTURE

mkdir guitarpro && cd guitarpro
# Copy all provided files into respective folders (see STRUCTURE.md)

---

## STEP 2: SETUP FRONTEND (React + Vite → localhost:6969)

cd frontend

# Create the Vite project structure:
npm create vite@latest . -- --template react

# Install dependencies
npm install
npm install framer-motion

# Copy the provided GuitarApp.jsx into src/App.jsx
# Update src/main.jsx (see config-files.js)
# Update index.html (see config-files.js)

# Add to vite.config.js:
# server: { port: 6969 }

# Start frontend
npm run dev
# → Running at http://localhost:6969

---

## STEP 3: SETUP BACKEND (Node.js + Express → localhost:0969)

cd ../backend

# Install dependencies
npm install

# Create database directory
mkdir -p database

# Initialize the SQLite database (auto-runs on first start)
npm run dev
# → Running at http://localhost:969

---

## STEP 4: SETUP ML BACKEND (Python + FastAPI → localhost:8000)

cd ../ml

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install Python dependencies
pip install fastapi uvicorn numpy scikit-learn gtts Pillow requests python-multipart

# Install FFmpeg (for video generation)
# Ubuntu/Debian:  sudo apt install ffmpeg
# macOS:          brew install ffmpeg
# Windows:        Download from https://ffmpeg.org/download.html

# Create output directories
mkdir -p generated/audio generated/videos

# Start ML server
uvicorn main:app --reload --port 8000
# → Running at http://localhost:8000
# → API docs at http://localhost:8000/docs

---

## STEP 5: VERIFY ALL SERVICES

Open three terminal tabs:

Terminal 1 (Frontend):
  cd frontend && npm run dev
  ✅ http://localhost:6969

Terminal 2 (Backend):
  cd backend && npm run dev
  ✅ http://localhost:969/api/health

Terminal 3 (ML):
  cd ml && source venv/bin/activate && uvicorn main:app --reload --port 8000
  ✅ http://localhost:8000

---

## API ENDPOINTS REFERENCE

### Authentication
POST /api/auth/register    → { name, email, password }
POST /api/auth/login       → { email, password }

### Songs
GET  /api/songs            → ?language=Hindi&difficulty=Beginner&guitar=Acoustic&search=&page=1
GET  /api/songs/:id        → Song with tutorial data
POST /api/songs            → Create (auth required)
PUT  /api/songs/:id        → Update (auth required)
DEL  /api/songs/:id        → Delete (auth required)

### Practice
GET  /api/practice/history → User practice history (auth required)
POST /api/practice/log     → { song_id, duration_minutes, completed }
GET  /api/practice/plan    → AI practice plan

### AI / ML (FastAPI)
GET  /recommend/{user_id}  → ?skill_level=Beginner&limit=6
POST /recommend/personalized → { user_id, song_ids, skill_level }
GET  /practice-plan/{skill} → 7-day plan for Beginner/Intermediate/Advanced
POST /tts/generate         → { text, lang, filename }
POST /video/generate       → { song_id, song_title, artist, tabs, chords, bpm }
GET  /analyze/difficulty   → ?tabs=...

---

## ENVIRONMENT VARIABLES (backend/.env)

PORT=969
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
ML_API_URL=http://localhost:8000

---

## PRODUCTION DEPLOYMENT NOTES

1. Set JWT_SECRET to a strong random string in production
2. Use PostgreSQL instead of SQLite for production (schema is compatible)
3. Serve frontend static files via Nginx or deploy to Vercel/Netlify
4. Deploy Node backend to Railway, Render, or AWS EC2
5. Deploy Python ML to a GPU instance for faster model inference
6. Use Redis for caching recommendations
7. Set up CDN for generated videos

---

🎸 GuitarPro — The coolest guitar learning platform ever built.
