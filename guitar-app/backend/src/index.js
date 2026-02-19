const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes     = require('./routes/auth');
const songsRoutes    = require('./routes/songs');
const practiceRoutes = require('./routes/practice');
const { initDB }     = require('./db');

const app = express();
const PORT = 969;

app.use(helmet());
app.use(cors({ origin: 'http://localhost:6969', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth',     authRoutes);
app.use('/api/songs',    songsRoutes);
app.use('/api/practice', practiceRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'GuitarPro API running 🎸' });
});

// ML proxy — works only when ML service is running, safe to skip
app.get('/api/recommendations/:userId', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`http://localhost:8000/recommend/${req.params.userId}`);
    const data = await response.json();
    res.json(data);
  } catch {
    res.json({ recommendations: [], fallback: true });
  }
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

async function start() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`\n🎸 GuitarPro Backend → http://localhost:${PORT}`);
    console.log(`📋 Health check   → http://localhost:${PORT}/api/health\n`);
  });
}
start();