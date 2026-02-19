# =============================================================================
# GuitarPro - Complete Backend Package
# =============================================================================
# 
#  FOLDER STRUCTURE:
#
#  guitarpro/
#  ├── frontend/              (React + Vite → localhost:6969)
#  │   ├── src/
#  │   │   ├── App.jsx        ← Main React app (provided separately)
#  │   │   └── main.jsx
#  │   ├── index.html
#  │   ├── vite.config.js
#  │   ├── tailwind.config.js
#  │   └── package.json
#  │
#  ├── backend/               (Node.js + Express → localhost:0969)
#  │   ├── src/
#  │   │   ├── index.js       ← Entry point
#  │   │   ├── db.js          ← SQLite connection
#  │   │   ├── routes/
#  │   │   │   ├── auth.js
#  │   │   │   ├── songs.js
#  │   │   │   ├── users.js
#  │   │   │   └── practice.js
#  │   │   └── middleware/
#  │   │       └── auth.js
#  │   ├── database/
#  │   │   ├── schema.sql
#  │   │   └── seed.sql
#  │   └── package.json
#  │
#  └── ml/                    (Python + FastAPI → localhost:8000)
#      ├── main.py            ← FastAPI app
#      ├── model.py           ← ML recommendation model
#      ├── train.py           ← Training script
#      ├── tts.py             ← gTTS voice generation
#      ├── video_gen.py       ← FFmpeg video generation
#      └── requirements.txt

