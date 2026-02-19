const express = require('express');
const { getDB } = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/songs
router.get('/', async (req, res) => {
  try {
    const db = await getDB();
    const { language, difficulty, guitar, search, page = 1, limit = 20 } = req.query;

    let where = 'WHERE 1=1';
    const params = [];

    if (language)   { where += ' AND language = ?';                    params.push(language); }
    if (difficulty) { where += ' AND difficulty = ?';                  params.push(difficulty); }
    if (guitar)     { where += ' AND guitar_type = ?';                 params.push(guitar); }
    if (search)     { where += ' AND (title LIKE ? OR artist LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }

    const countRow = await db.get(`SELECT COUNT(*) AS c FROM songs ${where}`, params);
    const total = countRow.c;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const songs = await db.all(
      `SELECT * FROM songs ${where} LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    res.json({ songs, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/songs/:id
router.get('/:id', async (req, res) => {
  try {
    const db = await getDB();
    const song = await db.get(
      `SELECT s.*, t.tabs, t.chords, t.strumming_pattern, t.tips
       FROM songs s LEFT JOIN tutorials t ON s.id = t.song_id
       WHERE s.id = ?`,
      req.params.id
    );
    if (!song) return res.status(404).json({ error: 'Song not found' });
    if (song.chords) {
      try { song.chords = JSON.parse(song.chords); } catch { song.chords = []; }
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/songs
router.post('/', authenticate, async (req, res) => {
  try {
    const db = await getDB();
    const { title, artist, language, difficulty, guitar_type, bpm, chords, tabs, strumming_pattern, tips } = req.body;

    const result = await db.run(
      'INSERT INTO songs (title, artist, language, difficulty, guitar_type, bpm) VALUES (?, ?, ?, ?, ?, ?)',
      [title, artist, language, difficulty, guitar_type, bpm]
    );
    if (tabs || chords) {
      await db.run(
        'INSERT INTO tutorials (song_id, tabs, chords, strumming_pattern, tips) VALUES (?, ?, ?, ?, ?)',
        [result.lastID, tabs || null, JSON.stringify(chords || []), strumming_pattern || null, tips || null]
      );
    }
    res.status(201).json({ id: result.lastID, message: 'Song created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/songs/:id
router.put('/:id', authenticate, async (req, res) => {
  try {
    const db = await getDB();
    const { title, artist, language, difficulty, guitar_type, bpm } = req.body;
    await db.run(
      'UPDATE songs SET title=?, artist=?, language=?, difficulty=?, guitar_type=?, bpm=? WHERE id=?',
      [title, artist, language, difficulty, guitar_type, bpm, req.params.id]
    );
    res.json({ message: 'Song updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/songs/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const db = await getDB();
    await db.run('DELETE FROM songs WHERE id = ?', req.params.id);
    res.json({ message: 'Song deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;