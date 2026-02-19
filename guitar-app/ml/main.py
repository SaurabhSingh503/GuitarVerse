# =============================================================================
# ml/main.py — GuitarPro AI Backend (FastAPI + Python)
# Runs on: localhost:8000
# =============================================================================

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from typing import Optional, List
import json

from model import RecommendationModel
from tts import generate_voice
from video_gen import generate_tutorial_video

app = FastAPI(
    title="GuitarPro ML API",
    description="AI-powered guitar recommendation and content generation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:6969", "http://localhost:969"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the recommendation model
model = RecommendationModel()

# ─── REQUEST MODELS ───────────────────────────────────────────────────────────

class PracticeHistory(BaseModel):
    user_id: int
    song_ids: List[int]
    skill_level: str = "Beginner"

class TTSRequest(BaseModel):
    text: str
    lang: str = "en"
    filename: str = "output"

class VideoRequest(BaseModel):
    song_id: int
    song_title: str
    artist: str
    tabs: str
    chords: List[str]
    bpm: int = 80

# ─── ENDPOINTS ────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "GuitarPro ML API 🎸", "status": "running"}

@app.get("/recommend/{user_id}")
async def recommend(user_id: int, skill_level: str = "Beginner", limit: int = 6):
    """
    Returns AI-recommended song IDs for a user.
    Uses collaborative filtering + difficulty matching.
    """
    try:
        recommendations = model.recommend(user_id=user_id, skill_level=skill_level, limit=limit)
        return {
            "user_id": user_id,
            "skill_level": skill_level,
            "recommendations": recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend/personalized")
async def personalized_recommend(data: PracticeHistory):
    """
    Returns personalized recommendations based on practice history.
    """
    recommendations = model.personalized_recommend(
        user_id=data.user_id,
        practiced_songs=data.song_ids,
        skill_level=data.skill_level,
        limit=8
    )
    return {"recommendations": recommendations}

@app.get("/practice-plan/{skill_level}")
def practice_plan(skill_level: str):
    """
    Returns a 7-day AI-generated practice plan.
    """
    plans = {
        "Beginner": {
            "focus": "Building foundational chord shapes and basic strumming",
            "weekly_goal": "Learn G, C, D, Em, Am chords + play 1 full song",
            "days": [
                {"day": "Monday", "focus": "G and C chord shapes", "duration": 20, "exercises": ["G chord 100 times", "C chord 100 times", "G→C transition"]},
                {"day": "Tuesday", "focus": "D and Em chords", "duration": 25, "exercises": ["D chord practice", "Em chord practice", "Basic strum pattern"]},
                {"day": "Wednesday", "focus": "Wonderwall practice", "duration": 30, "exercises": ["Chord progression", "Strumming pattern", "Full song attempt"]},
                {"day": "Thursday", "focus": "Am chord + chord transitions", "duration": 20, "exercises": ["Am chord", "Am→G→C progression", "Smooth transitions"]},
                {"day": "Friday", "focus": "First full song", "duration": 35, "exercises": ["Full song run-through", "Slow practice sections", "Record yourself"]},
                {"day": "Saturday", "focus": "Review and consolidation", "duration": 30, "exercises": ["All 5 chords review", "New song exploration", "Finger exercises"]},
                {"day": "Sunday", "focus": "Light practice / rest", "duration": 15, "exercises": ["Gentle strumming", "Listen to music analytically", "Relax fingers"]},
            ]
        },
        "Intermediate": {
            "focus": "Barre chords, fingerpicking, and music theory basics",
            "weekly_goal": "Master F barre chord + learn fingerpicking pattern",
            "days": [
                {"day": "Monday", "focus": "F barre chord", "duration": 35, "exercises": ["E shape barre", "A shape barre", "Barre chord exercises"]},
                {"day": "Tuesday", "focus": "Fingerpicking patterns", "duration": 35, "exercises": ["PIMA exercises", "Travis picking", "Applied to song"]},
                {"day": "Wednesday", "focus": "Blues scale", "duration": 40, "exercises": ["A blues scale positions", "Scale sequences", "Blues licks"]},
                {"day": "Thursday", "focus": "Intermediate song", "duration": 45, "exercises": ["Wish You Were Here", "Tears in Heaven intro", "Full song practice"]},
                {"day": "Friday", "focus": "Chord inversions", "duration": 30, "exercises": ["G inversions", "C inversions", "Apply to song"]},
                {"day": "Saturday", "focus": "Backing track jam", "duration": 40, "exercises": ["Play over Am blues", "Improvise with scale", "Record and review"]},
                {"day": "Sunday", "focus": "Music theory", "duration": 30, "exercises": ["Understand key signatures", "Learn intervals", "Apply to guitar"]},
            ]
        },
        "Advanced": {
            "focus": "Technical mastery, solos, and advanced techniques",
            "weekly_goal": "Learn a full guitar solo + improve picking speed",
            "days": [
                {"day": "Monday", "focus": "Alternate picking speed", "duration": 45, "exercises": ["Metronome at 100 BPM", "Chromatic exercises", "Scale runs"]},
                {"day": "Tuesday", "focus": "Modal scales", "duration": 50, "exercises": ["Dorian mode", "Mixolydian mode", "Modal vamps"]},
                {"day": "Wednesday", "focus": "Advanced fingerstyle", "duration": 60, "exercises": ["Blackbird arrangement", "Baroque piece", "Percussive elements"]},
                {"day": "Thursday", "focus": "Improvisation", "duration": 45, "exercises": ["Pentatonic over backing track", "Phrasing concepts", "Call and response"]},
                {"day": "Friday", "focus": "Tapping", "duration": 40, "exercises": ["Basic two-hand tap", "Eddie Van Halen lick", "Apply to solo"]},
                {"day": "Saturday", "focus": "Full performance", "duration": 60, "exercises": ["Record full set", "Self-critique", "Polish weak spots"]},
                {"day": "Sunday", "focus": "Theory + ear training", "duration": 30, "exercises": ["Transcribe a riff by ear", "Chord analysis", "Music theory study"]},
            ]
        }
    }
    
    level = skill_level.capitalize()
    if level not in plans:
        raise HTTPException(status_code=400, detail="Invalid skill level")
    
    return plans[level]

@app.post("/tts/generate")
async def text_to_speech(req: TTSRequest):
    """
    Generates voice audio using gTTS.
    """
    try:
        filepath = generate_voice(req.text, req.lang, req.filename)
        return {"status": "success", "file": filepath, "message": "Audio generated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS error: {str(e)}")

@app.post("/video/generate")
async def generate_video(req: VideoRequest):
    """
    Generates a tutorial video combining tabs image + TTS audio using FFmpeg.
    """
    try:
        video_path = generate_tutorial_video(
            song_id=req.song_id,
            song_title=req.song_title,
            artist=req.artist,
            tabs=req.tabs,
            chords=req.chords,
            bpm=req.bpm
        )
        return {"status": "success", "video": video_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Video gen error: {str(e)}")

@app.get("/analyze/difficulty")
def analyze_difficulty(tabs: str):
    """
    Uses ML to analyze tab complexity and suggest a difficulty level.
    """
    score = model.analyze_tab_difficulty(tabs)
    if score < 0.33:
        level = "Beginner"
    elif score < 0.66:
        level = "Intermediate"
    else:
        level = "Advanced"
    return {"score": score, "difficulty": level}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
