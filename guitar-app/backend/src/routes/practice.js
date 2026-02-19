// =============================================================================
// backend/src/routes/practice.js — Practice history tracking
// =============================================================================
const express = require('express');
const { getDB } = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/practice/history — Get user's practice history
router.get('/history', authenticate, (req, res) => {
  try {
    const db = getDB();
    const history = db.prepare(`
      SELECT ph.*, s.title, s.artist, s.difficulty 
      FROM practice_history ph 
      JOIN songs s ON ph.song_id = s.id 
      WHERE ph.user_id = ? 
      ORDER BY ph.practiced_at DESC 
      LIMIT 50
    `).all(req.user.id);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/practice/log — Log a practice session
router.post('/log', authenticate, (req, res) => {
  try {
    const db = getDB();
    const { song_id, duration_minutes, completed } = req.body;
    db.prepare(
      'INSERT INTO practice_history (user_id, song_id, duration_minutes, completed) VALUES (?, ?, ?, ?)'
    ).run(req.user.id, song_id, duration_minutes || 0, completed ? 1 : 0);
    res.status(201).json({ message: 'Practice logged' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/practice/plan — Get AI-powered daily practice plan
router.get('/plan', authenticate, (req, res) => {
  try {
    const db = getDB();
    const user = db.prepare('SELECT skill_level FROM users WHERE id = ?').get(req.user.id);
    const level = user?.skill_level || 'Beginner';
    
    const plans = {
      Beginner: [
        { day: 'Mon', task: 'Learn G, C, D chords', duration: 20 },
        { day: 'Tue', task: 'Practice chord transitions (G→C→D)', duration: 25 },
        { day: 'Wed', task: 'Wonderwall intro strumming', duration: 30 },
        { day: 'Thu', task: 'Em and Am chords', duration: 20 },
        { day: 'Fri', task: 'Play first full song', duration: 35 },
        { day: 'Sat', task: 'Review and consolidate', duration: 30 },
        { day: 'Sun', task: 'Rest or light play', duration: 15 },
      ],
      Intermediate: [
        { day: 'Mon', task: 'Barre chords (F, Bm)', duration: 30 },
        { day: 'Tue', task: 'Fingerpicking patterns', duration: 35 },
        { day: 'Wed', task: 'Blues scale basics', duration: 40 },
        { day: 'Thu', task: 'Intermediate song tutorial', duration: 45 },
        { day: 'Fri', task: 'Chord inversions', duration: 30 },
        { day: 'Sat', task: 'Play-along with backing track', duration: 40 },
        { day: 'Sun', task: 'Record yourself and review', duration: 30 },
      ],
      Advanced: [
        { day: 'Mon', task: 'Sweep picking exercises', duration: 45 },
        { day: 'Tue', task: 'Modal scales (Dorian, Mixolydian)', duration: 50 },
        { day: 'Wed', task: 'Advanced fingerstyle piece', duration: 60 },
        { day: 'Thu', task: 'Improvisation over backing track', duration: 45 },
        { day: 'Fri', task: 'Tapping techniques', duration: 40 },
        { day: 'Sat', task: 'Full song performance', duration: 60 },
        { day: 'Sun', task: 'Music theory study + light practice', duration: 30 },
      ],
    };

    res.json({ level, plan: plans[level] || plans.Beginner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
