-- =============================================================================
-- GuitarPro Database Schema (SQLite)
-- =============================================================================

CREATE TABLE IF NOT EXISTS users (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL,
  skill_level     TEXT DEFAULT 'Beginner' CHECK(skill_level IN ('Beginner','Intermediate','Advanced')),
  avatar_url      TEXT,
  last_login      DATETIME,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS songs (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  title           TEXT NOT NULL,
  artist          TEXT NOT NULL,
  language        TEXT NOT NULL CHECK(language IN ('Hindi','English')),
  difficulty      TEXT NOT NULL CHECK(difficulty IN ('Beginner','Intermediate','Advanced')),
  guitar_type     TEXT NOT NULL CHECK(guitar_type IN ('Acoustic','Electric')),
  bpm             INTEGER DEFAULT 80,
  thumbnail       TEXT DEFAULT '🎵',
  view_count      INTEGER DEFAULT 0,
  rating          REAL DEFAULT 0.0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tutorials (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  song_id             INTEGER UNIQUE NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  tabs                TEXT,
  chords              TEXT,      -- JSON array: '["G","C","D"]'
  strumming_pattern   TEXT,
  tips                TEXT,      -- JSON array of tip strings
  video_url           TEXT,
  created_at          DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS practice_history (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id           INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  song_id           INTEGER NOT NULL REFERENCES songs(id),
  duration_minutes  INTEGER DEFAULT 0,
  completed         INTEGER DEFAULT 0,  -- 0 or 1
  practiced_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recommendations (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  song_id         INTEGER NOT NULL REFERENCES songs(id),
  score           REAL DEFAULT 0.0,
  generated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_songs_language ON songs(language);
CREATE INDEX IF NOT EXISTS idx_songs_difficulty ON songs(difficulty);
CREATE INDEX IF NOT EXISTS idx_songs_guitar ON songs(guitar_type);
CREATE INDEX IF NOT EXISTS idx_practice_user ON practice_history(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON recommendations(user_id);
