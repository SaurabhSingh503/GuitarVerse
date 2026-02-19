import { useState, useEffect, useRef } from "react";

// ─── SONGS DATA (50 real songs with correct chords and tabs) ──────────────────
const SONGS = [
  { id:1,  title:"Tum Hi Ho",           artist:"Arijit Singh",        language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:72,  chords:["Am","F","C","G"],          tabs:`e|--0---1---0---3--|\nB|--1---1---1---0--|\nG|--2---2---0---0--|\nD|--2---3---2---0--|\nA|--0---3---3---2--|\nE|--0---1---0---3--|` },
  { id:2,  title:"Kal Ho Na Ho",         artist:"Sonu Nigam",          language:"Hindi",   difficulty:"Intermediate", guitar:"Acoustic", bpm:80,  chords:["G","Em","C","D"],           tabs:`e|--3---0---0---2--|\nB|--0---0---1---3--|\nG|--0---0---0---2--|\nD|--0---2---2---0--|\nA|--2---2---3---0--|\nE|--3---0---0---2--|` },
  { id:3,  title:"Ae Dil Hai Mushkil",   artist:"Arijit Singh",        language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:68,  chords:["Dm","Am","F","C"],          tabs:`e|--1---0---1---0--|\nB|--3---1---1---1--|\nG|--2---2---2---0--|\nD|--0---2---3---2--|\nA|--0---0---3---3--|\nE|--1---0---1---0--|` },
  { id:4,  title:"Channa Mereya",        artist:"Arijit Singh",        language:"Hindi",   difficulty:"Intermediate", guitar:"Acoustic", bpm:76,  chords:["Em","C","G","D"],           tabs:`e|--0---0---3---2--|\nB|--0---1---0---3--|\nG|--0---0---0---2--|\nD|--2---2---0---0--|\nA|--2---3---2---0--|\nE|--0---0---3---2--|` },
  { id:5,  title:"Raabta",               artist:"Arijit Singh",        language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:64,  chords:["C","G","Am","F"],           tabs:`e|--0---3---0---1--|\nB|--1---0---1---1--|\nG|--0---0---2---2--|\nD|--2---0---2---3--|\nA|--3---2---0---3--|\nE|--0---3---0---1--|` },
  { id:6,  title:"Kabira",               artist:"Rekha Bhardwaj",      language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:78,  chords:["G","D","Em","C"],           tabs:`e|--3---2---0---0--|\nB|--0---3---0---1--|\nG|--0---2---0---0--|\nD|--0---0---2---2--|\nA|--2---0---2---3--|\nE|--3---2---0---0--|` },
  { id:7,  title:"Kesariya",             artist:"Arijit Singh",        language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:84,  chords:["C","Am","F","G"],           tabs:`e|--0---0---1---3--|\nB|--1---1---1---0--|\nG|--0---2---2---0--|\nD|--2---2---3---0--|\nA|--3---0---3---2--|\nE|--0---0---1---3--|` },
  { id:8,  title:"Sooraj Dooba Hain",    artist:"Arijit Singh",        language:"Hindi",   difficulty:"Intermediate", guitar:"Electric", bpm:88,  chords:["Am","F","C","E"],           tabs:`e|--0---1---0---0--|\nB|--1---1---1---0--|\nG|--2---2---0---1--|\nD|--2---3---2---2--|\nA|--0---3---3---2--|\nE|--0---1---0---0--|` },
  { id:9,  title:"Hawayein",             artist:"Arijit Singh",        language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:76,  chords:["C","G","Am","Em"],          tabs:`e|--0---3---0---0--|\nB|--1---0---1---0--|\nG|--0---0---2---0--|\nD|--2---0---2---2--|\nA|--3---2---0---2--|\nE|--0---3---0---0--|` },
  { id:10, title:"Khairiyat",            artist:"Arijit Singh",        language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:72,  chords:["Am","F","C","G"],           tabs:`e|--0---1---0---3--|\nB|--1---1---1---0--|\nG|--2---2---0---0--|\nD|--2---3---2---0--|\nA|--0---3---3---2--|\nE|--0---1---0---3--|` },
  { id:11, title:"Pachtaoge",            artist:"Arijit Singh",        language:"Hindi",   difficulty:"Intermediate", guitar:"Acoustic", bpm:82,  chords:["Dm","Am","F","C"],          tabs:`e|--1---0---1---0--|\nB|--3---1---1---1--|\nG|--2---2---2---0--|\nD|--0---2---3---2--|\nA|--0---0---3---3--|\nE|--1---0---1---0--|` },
  { id:12, title:"Galliyan",             artist:"Ankit Tiwari",        language:"Hindi",   difficulty:"Intermediate", guitar:"Acoustic", bpm:80,  chords:["Am","G","F","Em"],          tabs:`e|--0---3---1---0--|\nB|--1---0---1---0--|\nG|--2---0---2---0--|\nD|--2---0---3---2--|\nA|--0---2---3---2--|\nE|--0---3---1---0--|` },
  { id:13, title:"Baarish",              artist:"Atif Aslam",          language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:76,  chords:["G","D","Em","C"],           tabs:`e|--3---2---0---0--|\nB|--0---3---0---1--|\nG|--0---2---0---0--|\nD|--0---0---2---2--|\nA|--2---0---2---3--|\nE|--3---2---0---0--|` },
  { id:14, title:"Janam Janam",          artist:"Arijit Singh",        language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:74,  chords:["G","Em","C","D"],           tabs:`e|--3---0---0---2--|\nB|--0---0---1---3--|\nG|--0---0---0---2--|\nD|--0---2---2---0--|\nA|--2---2---3---0--|\nE|--3---0---0---2--|` },
  { id:15, title:"Lut Gaye",             artist:"Jubin Nautiyal",      language:"Hindi",   difficulty:"Intermediate", guitar:"Acoustic", bpm:80,  chords:["C","G","Am","F"],           tabs:`e|--0---3---0---1--|\nB|--1---0---1---1--|\nG|--0---0---2---2--|\nD|--2---0---2---3--|\nA|--3---2---0---3--|\nE|--0---3---0---1--|` },
  { id:16, title:"Hasi",                 artist:"Ami Mishra",          language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:70,  chords:["G","C","D","Em"],           tabs:`e|--3---0---2---0--|\nB|--0---1---3---0--|\nG|--0---0---2---0--|\nD|--0---2---0---2--|\nA|--2---3---0---2--|\nE|--3---0---2---0--|` },
  { id:17, title:"Agar Tum Saath Ho",    artist:"Arijit Singh",        language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:66,  chords:["Dm","Gm","C","F"],          tabs:`e|--1---3---0---1--|\nB|--3---3---1---1--|\nG|--2---3---0---2--|\nD|--0---5---2---3--|\nA|--0---5---3---3--|\nE|--1---3---0---1--|` },
  { id:18, title:"Mann Bharrya",         artist:"B Praak",             language:"Hindi",   difficulty:"Intermediate", guitar:"Acoustic", bpm:75,  chords:["Em","G","C","D"],           tabs:`e|--0---3---0---2--|\nB|--0---0---1---3--|\nG|--0---0---0---2--|\nD|--2---0---2---0--|\nA|--2---2---3---0--|\nE|--0---3---0---2--|` },
  { id:19, title:"Tera Ban Jaunga",      artist:"Akhil Sachdeva",      language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:72,  chords:["C","G","Am","F"],           tabs:`e|--0---3---0---1--|\nB|--1---0---1---1--|\nG|--0---0---2---2--|\nD|--2---0---2---3--|\nA|--3---2---0---3--|\nE|--0---3---0---1--|` },
  { id:20, title:"Bekhayali",            artist:"Sachet Tandon",       language:"Hindi",   difficulty:"Advanced",     guitar:"Electric", bpm:96,  chords:["Em","C","G","D"],           tabs:`e|--0---0---3---2--|\nB|--0---1---0---3--|\nG|--0---0---0---2--|\nD|--2---2---0---0--|\nA|--2---3---2---0--|\nE|--0---0---3---2--|` },
  { id:21, title:"Phir Le Aya Dil",      artist:"Arijit Singh",        language:"Hindi",   difficulty:"Advanced",     guitar:"Acoustic", bpm:85,  chords:["Bm","G","D","A"],           tabs:`e|--2---3---2---0--|\nB|--3---0---3---2--|\nG|--4---0---2---2--|\nD|--4---0---0---2--|\nA|--2---2---0---0--|\nE|--2---3---2---0--|` },
  { id:22, title:"Tere Sang Yaara",      artist:"Atif Aslam",          language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:70,  chords:["D","A","Bm","G"],           tabs:`e|--2---0---2---3--|\nB|--3---2---3---0--|\nG|--2---2---4---0--|\nD|--0---2---4---0--|\nA|--0---0---2---2--|\nE|--2---0---2---3--|` },
  { id:23, title:"Kalank",               artist:"Arijit Singh",        language:"Hindi",   difficulty:"Advanced",     guitar:"Acoustic", bpm:88,  chords:["Dm","Gm","Bb","F"],         tabs:`e|--1---3---1---1--|\nB|--3---3---3---1--|\nG|--2---3---3---2--|\nD|--0---5---3---3--|\nA|--0---5---1---3--|\nE|--1---3---1---1--|` },
  { id:24, title:"Iktara",               artist:"Amitabh Bhattacharya",language:"Hindi",   difficulty:"Beginner",     guitar:"Acoustic", bpm:66,  chords:["Am","F","C","E7"],          tabs:`e|--0---1---0---0--|\nB|--1---1---1---3--|\nG|--2---2---0---1--|\nD|--2---3---2---0--|\nA|--0---3---3---2--|\nE|--0---1---0---0--|` },
  { id:25, title:"Bulleya",              artist:"Amit Mishra",         language:"Hindi",   difficulty:"Advanced",     guitar:"Electric", bpm:94,  chords:["Dm","Am","Bb","C"],         tabs:`e|--1---0---1---0--|\nB|--3---1---3---1--|\nG|--2---2---3---0--|\nD|--0---2---3---2--|\nA|--0---0---1---3--|\nE|--1---0---1---0--|` },
  { id:51, title:"Wonderwall",           artist:"Oasis",               language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:87,  chords:["Em7","G","Dsus4","A7sus4"], tabs:`e|--0---3---3---0--|\nB|--0---0---3---3--|\nG|--0---0---2---0--|\nD|--2---0---0---2--|\nA|--2---2---0---0--|\nE|--0---3---3---0--|` },
  { id:52, title:"Knocking on Heavens Door", artist:"Bob Dylan",       language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:72,  chords:["G","D","Am","C"],           tabs:`e|--3---2---0---0--|\nB|--0---3---1---1--|\nG|--0---2---2---0--|\nD|--0---0---2---2--|\nA|--2---0---0---3--|\nE|--3---2---0---0--|` },
  { id:53, title:"Let Her Go",           artist:"Passenger",           language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:96,  chords:["G","D","Em","C"],           tabs:`e|--3---2---0---0--|\nB|--0---3---0---1--|\nG|--0---2---0---0--|\nD|--0---0---2---2--|\nA|--2---0---2---3--|\nE|--3---2---0---0--|` },
  { id:54, title:"Wish You Were Here",   artist:"Pink Floyd",          language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:66,  chords:["C","D","Am","G"],           tabs:`e|--0---2---0---3--|\nB|--1---3---1---0--|\nG|--0---2---2---0--|\nD|--2---0---2---0--|\nA|--3---0---0---2--|\nE|--0---2---0---3--|` },
  { id:55, title:"Hotel California",     artist:"Eagles",              language:"English", difficulty:"Advanced",     guitar:"Electric", bpm:75,  chords:["Am","E7","G","D","F","C"],  tabs:`e|--0---0---3---2---1---0--|\nB|--1---3---0---3---1---1--|\nG|--2---1---0---2---2---0--|\nD|--2---2---0---0---3---2--|\nA|--0---2---2---0---3---3--|\nE|--0---0---3---2---1---0--|` },
  { id:56, title:"Nothing Else Matters", artist:"Metallica",           language:"English", difficulty:"Advanced",     guitar:"Electric", bpm:68,  chords:["Em","D","C","Am","G"],      tabs:`e|--0---0---0---0---3--|\nB|--0---0---1---1---0--|\nG|--0---0---0---2---0--|\nD|--2---0---2---2---0--|\nA|--2---0---3---0---2--|\nE|--0---2---0---0---3--|` },
  { id:57, title:"Sweet Home Alabama",   artist:"Lynyrd Skynyrd",      language:"English", difficulty:"Intermediate", guitar:"Electric", bpm:97,  chords:["D","C","G"],               tabs:`e|--2---0---3--|\nB|--3---1---0--|\nG|--2---0---0--|\nD|--0---2---0--|\nA|--0---3---2--|\nE|--2---0---3--|` },
  { id:58, title:"Shape of You",         artist:"Ed Sheeran",          language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:96,  chords:["C#m","F#m","A","B"],        tabs:`e|--4---2---0---2--|\nB|--5---2---2---4--|\nG|--6---2---2---4--|\nD|--6---4---2---4--|\nA|--4---4---0---2--|\nE|--4---2---0---2--|` },
  { id:59, title:"Smoke on the Water",   artist:"Deep Purple",         language:"English", difficulty:"Beginner",     guitar:"Electric", bpm:112, chords:["Gm","F","Eb","D"],          tabs:`e|--3---1---3---2--|\nB|--3---1---4---3--|\nG|--3---2---3---2--|\nD|--5---3---5---4--|\nA|--5---3---6---5--|\nE|--3---1---3---2--|` },
  { id:60, title:"Tears in Heaven",      artist:"Eric Clapton",        language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:80,  chords:["A","E","F#m","D"],          tabs:`e|--0---0---2---2--|\nB|--2---0---2---3--|\nG|--2---1---2---2--|\nD|--2---2---4---0--|\nA|--0---2---4---0--|\nE|--0---0---2---2--|` },
  { id:61, title:"Creep",                artist:"Radiohead",           language:"English", difficulty:"Beginner",     guitar:"Electric", bpm:92,  chords:["G","B","C","Cm"],           tabs:`e|--3---2---0---0--|\nB|--0---4---1---4--|\nG|--0---4---0---5--|\nD|--0---4---2---5--|\nA|--2---2---3---3--|\nE|--3---2---0---3--|` },
  { id:62, title:"Country Roads",        artist:"John Denver",         language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:80,  chords:["G","Em","D","C"],           tabs:`e|--3---0---2---0--|\nB|--0---0---3---1--|\nG|--0---0---2---0--|\nD|--0---2---0---2--|\nA|--2---2---0---3--|\nE|--3---0---2---0--|` },
  { id:63, title:"Hallelujah",           artist:"Leonard Cohen",       language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:58,  chords:["C","Am","F","G","E7"],      tabs:`e|--0---0---1---3---0--|\nB|--1---1---1---0---3--|\nG|--0---2---2---0---1--|\nD|--2---2---3---0---0--|\nA|--3---0---3---2---2--|\nE|--0---0---1---3---0--|` },
  { id:64, title:"Hey There Delilah",    artist:"Plain White Ts",      language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:90,  chords:["D","F#m","Bm","G","A"],     tabs:`e|--2---2---2---3---0--|\nB|--3---2---3---0---2--|\nG|--2---2---4---0---2--|\nD|--0---4---4---0---2--|\nA|--0---4---2---2---0--|\nE|--2---2---2---3---0--|` },
  { id:65, title:"Fix You",              artist:"Coldplay",            language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:70,  chords:["C","Em","Am","F","G"],      tabs:`e|--0---0---0---1---3--|\nB|--1---0---1---1---0--|\nG|--0---0---2---2---0--|\nD|--2---2---2---3---0--|\nA|--3---2---0---3---2--|\nE|--0---0---0---1---3--|` },
  { id:66, title:"The Scientist",        artist:"Coldplay",            language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:75,  chords:["Dm","Bb","F","C"],          tabs:`e|--1---1---1---0--|\nB|--3---3---1---1--|\nG|--2---3---2---0--|\nD|--0---3---3---2--|\nA|--0---1---3---3--|\nE|--1---1---1---0--|` },
  { id:67, title:"Zombie",               artist:"The Cranberries",     language:"English", difficulty:"Beginner",     guitar:"Electric", bpm:85,  chords:["Em","C","G","D"],           tabs:`e|--0---0---3---2--|\nB|--0---1---0---3--|\nG|--0---0---0---2--|\nD|--2---2---0---0--|\nA|--2---3---2---0--|\nE|--0---0---3---2--|` },
  { id:68, title:"Fast Car",             artist:"Tracy Chapman",       language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:100, chords:["C","G","Am","F"],           tabs:`e|--0---3---0---1--|\nB|--1---0---1---1--|\nG|--0---0---2---2--|\nD|--2---0---2---3--|\nA|--3---2---0---3--|\nE|--0---3---0---1--|` },
  { id:69, title:"Come As You Are",      artist:"Nirvana",             language:"English", difficulty:"Intermediate", guitar:"Electric", bpm:120, chords:["Em","Am","C","D"],          tabs:`e|--0---0---0---2--|\nB|--0---1---1---3--|\nG|--0---2---0---2--|\nD|--2---2---2---0--|\nA|--2---0---3---0--|\nE|--0---0---0---2--|` },
  { id:70, title:"More Than Words",      artist:"Extreme",             language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:72,  chords:["G","Gsus4","Cadd9","Am7"],  tabs:`e|--3---3---0---0--|\nB|--0---3---3---1--|\nG|--0---2---0---0--|\nD|--0---0---2---2--|\nA|--2---2---3---0--|\nE|--3---3---0---0--|` },
  { id:71, title:"Here Comes the Sun",   artist:"The Beatles",         language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:130, chords:["A","G","D","E7"],           tabs:`e|--0---3---2---0--|\nB|--2---0---3---3--|\nG|--2---0---2---1--|\nD|--2---0---0---0--|\nA|--0---2---0---2--|\nE|--0---3---2---0--|` },
  { id:72, title:"Blackbird",            artist:"The Beatles",         language:"English", difficulty:"Advanced",     guitar:"Acoustic", bpm:96,  chords:["G","Am","C","D","Em"],      tabs:`e|--3---0---0---2---0--|\nB|--0---1---1---3---0--|\nG|--0---2---0---2---0--|\nD|--0---2---2---0---2--|\nA|--2---0---3---0---2--|\nE|--3---0---0---2---0--|` },
  { id:73, title:"Perfect",              artist:"Ed Sheeran",          language:"English", difficulty:"Beginner",     guitar:"Acoustic", bpm:95,  chords:["G","Em","C","D"],           tabs:`e|--3---0---0---2--|\nB|--0---0---1---3--|\nG|--0---0---0---2--|\nD|--0---2---2---0--|\nA|--2---2---3---0--|\nE|--3---0---0---2--|` },
  { id:74, title:"Shallow",              artist:"Lady Gaga",           language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:96,  chords:["Em","D","G","A","Am","C"],  tabs:`e|--0---2---3---0---0---0--|\nB|--0---3---0---2---1---1--|\nG|--0---2---0---2---2---0--|\nD|--2---0---0---2---2---2--|\nA|--2---0---2---0---0---3--|\nE|--0---2---3---0---0---0--|` },
  { id:75, title:"Stairway to Heaven",   artist:"Led Zeppelin",        language:"English", difficulty:"Advanced",     guitar:"Acoustic", bpm:82,  chords:["Am","G","F","C","Em","D"],  tabs:`e|--0---3---1---0---0---2--|\nB|--1---0---1---1---0---3--|\nG|--2---0---2---0---0---2--|\nD|--2---0---3---2---2---0--|\nA|--0---2---3---3---2---0--|\nE|--0---3---1---0---0---2--|` },
];

const STRUMMING = {
  Beginner:     "↓  ↓  ↑  ↓  ↑",
  Intermediate: "↓  ↑  ↓  ↓  ↑  ↓  ↑",
  Advanced:     "↓  ↑  ↑  ↓  ↑  ↓  ↑  ↓",
};

// ─── ANIMATED BACKGROUND CANVAS ───────────────────────────────────────────────
function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Music note characters
    const NOTE_CHARS = ["♩","♪","♫","♬","𝅗𝅥"];

    // Particles: flowing notes + glowing dots
    const particles = Array.from({ length: 55 }, (_, i) => ({
      x:    Math.random() * window.innerWidth,
      y:    Math.random() * window.innerHeight,
      size: Math.random() * 18 + 8,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: -(Math.random() * 0.8 + 0.3),
      opacity: Math.random() * 0.5 + 0.1,
      color: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#7c00ff" : "#ff00aa",
      char:  NOTE_CHARS[Math.floor(Math.random() * NOTE_CHARS.length)],
      isNote: i < 35,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Guitar strings (horizontal wavy lines)
    const strings = Array.from({ length: 6 }, (_, i) => ({
      y: window.innerHeight * (0.2 + i * 0.12),
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
      amplitude: Math.random() * 8 + 4,
      color: i % 2 === 0 ? "rgba(0,245,255,0.07)" : "rgba(124,0,255,0.05)",
    }));

    const draw = () => {
      // Dark gradient background
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0,   "#000000");
      grad.addColorStop(0.3, "#05000f");
      grad.addColorStop(0.6, "#0a0020");
      grad.addColorStop(1,   "#000510");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Draw guitar strings
      strings.forEach(str => {
        str.phase += str.speed;
        ctx.beginPath();
        ctx.strokeStyle = str.color;
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 3) {
          const y = str.y + Math.sin(x * 0.005 + str.phase) * str.amplitude;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw music note particles
      particles.forEach(p => {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.4;
        p.y += p.speedY;

        // Reset when off screen
        if (p.y < -30)  { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -30)  { p.x = W + 10; }
        if (p.x > W+30) { p.x = -10; }

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (p.isNote) {
          // Glowing music note
          ctx.shadowColor  = p.color;
          ctx.shadowBlur   = 12;
          ctx.fillStyle    = p.color;
          ctx.font         = `${p.size}px serif`;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          // Glowing dot
          const dotGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 0.6);
          dotGrad.addColorStop(0, p.color);
          dotGrad.addColorStop(1, "transparent");
          ctx.fillStyle = dotGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none",
    }}/>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = {
  root:     { fontFamily:"'Poppins',sans-serif", background:"#000", minHeight:"100vh", color:"#e0e0e0" },
  orbitron: { fontFamily:"'Orbitron',monospace" },
  neon:     { color:"#00f5ff", textShadow:"0 0 12px #00f5ff, 0 0 24px #00f5ff55" },
  glass:    { background:"rgba(255,255,255,0.05)", backdropFilter:"blur(14px)", border:"1px solid rgba(0,245,255,0.18)", borderRadius:"16px" },
  glowBtn:  { background:"linear-gradient(135deg,#00f5ff22,#7c00ff22)", border:"1px solid #00f5ff", color:"#00f5ff", padding:"12px 28px", borderRadius:"8px", fontFamily:"'Orbitron',monospace", fontSize:"13px", letterSpacing:"2px", cursor:"pointer", boxShadow:"0 0 18px #00f5ff44", transition:"all 0.25s", textTransform:"uppercase" },
  solidBtn: { background:"linear-gradient(135deg,#00f5ff,#7c00ff)", border:"none", color:"#000", padding:"14px 36px", borderRadius:"8px", fontFamily:"'Orbitron',monospace", fontSize:"13px", letterSpacing:"2px", cursor:"pointer", boxShadow:"0 0 28px #00f5ff66", fontWeight:"bold", textTransform:"uppercase" },
  inp:      { background:"rgba(0,245,255,0.05)", border:"1px solid rgba(0,245,255,0.3)", borderRadius:"8px", padding:"12px 16px", color:"#e0e0e0", outline:"none", width:"100%", fontFamily:"'Poppins',sans-serif", fontSize:"15px" },
};

const badge = (c, t) => {
  const m = {
    blue:   { bg:"rgba(0,245,255,0.12)",   color:"#00f5ff", bdr:"#00f5ff33" },
    green:  { bg:"rgba(0,255,100,0.12)",   color:"#00ff64", bdr:"#00ff6433" },
    orange: { bg:"rgba(255,165,0,0.12)",   color:"#ffa500", bdr:"#ffa50033" },
    red:    { bg:"rgba(255,60,60,0.12)",   color:"#ff4444", bdr:"#ff444433" },
    purple: { bg:"rgba(168,85,247,0.12)",  color:"#a855f7", bdr:"#a855f733" },
  };
  const x = m[c] || { bg:"rgba(255,255,255,0.08)", color:"#aaa", bdr:"#fff2" };
  return (
    <span style={{padding:"3px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:700,
      background:x.bg, color:x.color, border:`1px solid ${x.bdr}`, letterSpacing:"0.5px"}}>
      {t}
    </span>
  );
};
const dc = d => d==="Beginner"?"green" : d==="Intermediate"?"orange" : "red";

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, user, setUser }) {
  const nav = user
    ? [["Dashboard","dash"],["Songs","lib"],["Acoustic","acoustic"],["Electric","electric"],
       ...(user.isAdmin ? [["Admin","admin"]] : [])]
    : [["Home","land"],["Songs","lib"]];

  return (
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:999,
      background:"rgba(0,0,0,0.85)", backdropFilter:"blur(20px)",
      borderBottom:"1px solid rgba(0,245,255,0.2)",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 32px", height:"64px"}}>

      <div onClick={()=>setPage("land")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"10px"}}>
        <span style={{fontSize:"26px"}}>🎸</span>
        <span style={{...s.orbitron,...s.neon, fontSize:"18px", fontWeight:900}}>GUITARPRO</span>
      </div>

      <div style={{display:"flex",gap:"6px"}}>
        {nav.map(([l,p])=>(
          <button key={l} onClick={()=>setPage(p)} style={{
            background: page===p?"rgba(0,245,255,0.14)":"transparent",
            border:     page===p?"1px solid rgba(0,245,255,0.45)":"1px solid transparent",
            color:      page===p?"#00f5ff":"#777",
            padding:"6px 16px", borderRadius:"6px", cursor:"pointer",
            fontSize:"14px", transition:"all 0.2s", fontFamily:"'Poppins',sans-serif"
          }}>{l}</button>
        ))}
      </div>

      <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
        {user ? <>
          <span style={{color:"#00f5ff",fontSize:"14px"}}>
            👤 {user.name}
            {user.isAdmin && <span style={{color:"#ffa500",fontSize:"11px",marginLeft:"8px"}}>[ADMIN]</span>}
          </span>
          <button onClick={()=>{setUser(null);setPage("land");}}
            style={{...s.glowBtn, padding:"7px 18px", fontSize:"12px"}}>Logout</button>
        </> : <>
          <button onClick={()=>setPage("login")}
            style={{...s.glowBtn, padding:"7px 18px", fontSize:"12px"}}>Login</button>
          <button onClick={()=>setPage("signup")}
            style={{...s.solidBtn, padding:"7px 18px", fontSize:"12px"}}>Sign Up</button>
        </>}
      </div>
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ setPage }) {
  const feats = [
    { ic:"🤖", t:"AI Recommendations",  d:"ML engine recommends songs based on your level and practice history." },
    { ic:"🎵", t:"50 Songs & Growing",  d:"25 Hindi + 25 English with real tabs, correct chords, and BPM." },
    { ic:"🎬", t:"Video Generation",     d:"Run the ML backend to auto-generate voice-guided video tutorials." },
    { ic:"📅", t:"Practice Plans",       d:"7-day personalized plans adapting from beginner to advanced." },
    { ic:"📱", t:"Fully Responsive",     d:"Works on mobile, tablet, and desktop. Practice anywhere." },
    { ic:"🏆", t:"Progress Tracking",    d:"Track your chords, songs, and hours as you grow." },
  ];

  return (
    <div style={{paddingTop:"64px"}}>
      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",textAlign:"center",
        padding:"80px 32px",position:"relative"}}>

        <div style={{display:"inline-block",padding:"5px 16px",borderRadius:"20px",
          fontSize:"12px",fontWeight:700,background:"rgba(0,245,255,0.12)",
          color:"#00f5ff",border:"1px solid #00f5ff44",marginBottom:"28px",
          letterSpacing:"3px"}}>
          🎸 YOUR GUITAR JOURNEY STARTS HERE
        </div>

        <h1 style={{...s.orbitron,
          fontSize:"clamp(44px,8vw,90px)",
          fontWeight:900, lineHeight:1.05, marginBottom:"24px",
          background:"linear-gradient(135deg,#ffffff 0%,#00f5ff 50%,#7c00ff 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
          MASTER GUITAR<br/>LIKE A PRO
        </h1>

        <p style={{fontSize:"18px",color:"#888",maxWidth:"560px",
          lineHeight:1.8,marginBottom:"40px"}}>
          Real tabs, correct chords, and AI-powered practice plans.
          Built for guitarists who are serious about learning.
        </p>

        <div style={{display:"flex",gap:"16px",flexWrap:"wrap",justifyContent:"center"}}>
          <button onClick={()=>setPage("signup")}
            style={{...s.solidBtn,padding:"16px 44px",fontSize:"15px"}}>
            🚀 Start Free
          </button>
          <button onClick={()=>setPage("lib")}
            style={{...s.glowBtn,padding:"16px 44px",fontSize:"15px"}}>
            🎵 Explore Songs
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{padding:"100px 32px",position:"relative",zIndex:1}}>
        <h2 style={{...s.orbitron,...s.neon,textAlign:"center",
          fontSize:"36px",marginBottom:"56px",fontWeight:700}}>
          WHY GUITARPRO?
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:"24px",maxWidth:"1100px",margin:"0 auto"}}>
          {feats.map(f=>(
            <div key={f.t} style={{...s.glass,padding:"32px",transition:"all 0.3s",cursor:"default"}}
              onMouseEnter={e=>{
                e.currentTarget.style.background="rgba(0,245,255,0.08)";
                e.currentTarget.style.borderColor="rgba(0,245,255,0.4)";
                e.currentTarget.style.transform="translateY(-4px)";
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.background="rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor="rgba(0,245,255,0.18)";
                e.currentTarget.style.transform="translateY(0)";
              }}>
              <div style={{fontSize:"36px",marginBottom:"14px"}}>{f.ic}</div>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"14px",marginBottom:"10px"}}>{f.t}</div>
              <div style={{color:"#777",fontSize:"14px",lineHeight:1.7}}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{padding:"40px",textAlign:"center",
        borderTop:"1px solid rgba(0,245,255,0.1)",position:"relative",zIndex:1}}>
        <div style={{...s.orbitron,...s.neon,fontSize:"18px",marginBottom:"10px"}}>🎸 GUITARPRO</div>
        <div style={{color:"#333",fontSize:"13px"}}>
          © 2025 GuitarPro. Built for guitarists who mean business.
        </div>
      </footer>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function Auth({ mode, setPage, setUser }) {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const go = () => {
    if (!form.email || !form.password) { setErr("Please fill all fields."); return; }
    setErr("");
    setLoading(true);
    setTimeout(() => {
      const isAdmin = form.email === "admin@guitarpro.com";
      setUser({
        name: form.name || form.email.split("@")[0],
        email: form.email,
        isAdmin,
        // Brand new user — everything starts at zero
        songsLearned:  0,
        chordsLearned: 0,
        practiceHours: 0,
      });
      setPage("dash");
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",
      justifyContent:"center",paddingTop:"64px",position:"relative",zIndex:1}}>
      <div style={{...s.glass,padding:"48px",width:"100%",maxWidth:"420px"}}>
        <h2 style={{...s.orbitron,...s.neon,fontSize:"22px",textAlign:"center",marginBottom:"8px"}}>
          {mode==="login"?"WELCOME BACK":"JOIN GUITARPRO"}
        </h2>
        <p style={{color:"#555",textAlign:"center",marginBottom:"32px",fontSize:"14px"}}>
          {mode==="login"?"Continue your guitar journey":"Create your free account — it takes 10 seconds"}
        </p>

        {mode==="signup" && (
          <div style={{marginBottom:"16px"}}>
            <div style={{color:"#666",fontSize:"12px",letterSpacing:"1px",marginBottom:"6px"}}>FULL NAME</div>
            <input style={s.inp} placeholder="Your name"
              value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          </div>
        )}
        <div style={{marginBottom:"16px"}}>
          <div style={{color:"#666",fontSize:"12px",letterSpacing:"1px",marginBottom:"6px"}}>EMAIL</div>
          <input style={s.inp} placeholder="your@email.com" type="email"
            value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        </div>
        <div style={{marginBottom:"10px"}}>
          <div style={{color:"#666",fontSize:"12px",letterSpacing:"1px",marginBottom:"6px"}}>PASSWORD</div>
          <input style={s.inp} placeholder="••••••••" type="password"
            value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        </div>

        {err && <div style={{color:"#ff4444",fontSize:"13px",marginBottom:"14px"}}>⚠ {err}</div>}

        <button onClick={go}
          style={{...s.solidBtn,width:"100%",marginTop:"16px",marginBottom:"20px"}}>
          {loading ? "⏳ Loading..." : mode==="login" ? "🔓 Login" : "🚀 Create Account"}
        </button>

        <p style={{textAlign:"center",color:"#555",fontSize:"14px"}}>
          {mode==="login"?"New here? ":"Already a member? "}
          <span onClick={()=>setPage(mode==="login"?"signup":"login")}
            style={{color:"#00f5ff",cursor:"pointer",textDecoration:"underline"}}>
            {mode==="login"?"Sign Up":"Login"}
          </span>
        </p>

        {mode==="signup" && (
          <div style={{marginTop:"20px",...s.glass,padding:"12px 16px",
            borderColor:"rgba(255,165,0,0.3)",fontSize:"12px",color:"#666",textAlign:"center"}}>
            Admin login: <span style={{color:"#ffa500"}}>admin@guitarpro.com</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dash({ user, setPage, setSong }) {
  const isNew = user.songsLearned === 0;
  const recs  = SONGS.filter(s=>s.difficulty==="Beginner").slice(0,4);

  const prog = [
    { l:"Chords Learned",  v:user.chordsLearned, m:20,  c:"#00f5ff" },
    { l:"Songs Completed", v:user.songsLearned,  m:50,  c:"#7c00ff" },
    { l:"Practice Hours",  v:user.practiceHours, m:100, c:"#00ff64" },
  ];

  const weekPlan = [
    { d:"Mon", t:"Learn G, C, D chord shapes" },
    { d:"Tue", t:"Practice chord transitions G→C→D" },
    { d:"Wed", t:"Wonderwall intro — slow tempo" },
    { d:"Thu", t:"Strumming patterns with metronome" },
    { d:"Fri", t:"Play your first full song" },
    { d:"Sat", t:"Review weak spots" },
    { d:"Sun", t:"Rest or light play" },
  ];

  return (
    <div style={{paddingTop:"88px",padding:"88px 32px 40px",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>

        <h1 style={{...s.orbitron,fontSize:"30px",color:"#fff",marginBottom:"8px"}}>
          Welcome, <span style={s.neon}>{user.name} 🎸</span>
        </h1>
        <p style={{color:"#555",marginBottom:"32px",fontSize:"15px"}}>
          {isNew
            ? "You just joined — pick a beginner song below and start your journey!"
            : "Here is your personalized dashboard."}
        </p>

        {/* New user welcome banner */}
        {isNew && (
          <div style={{...s.glass,padding:"22px",marginBottom:"28px",
            borderColor:"rgba(0,255,100,0.35)",display:"flex",alignItems:"center",gap:"18px"}}>
            <span style={{fontSize:"42px"}}>🌱</span>
            <div>
              <div style={{...s.orbitron,color:"#00ff64",fontSize:"15px",marginBottom:"5px"}}>
                FRESH START — ZERO PROGRESS YET
              </div>
              <div style={{color:"#777",fontSize:"14px",lineHeight:1.6}}>
                That is completely normal! Pick any beginner song, open its tab, and play for 15 minutes.
                Your progress will grow as you practice.
              </div>
            </div>
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:"28px"}}>
          <div>
            {/* Progress bars — honest zeros for new users */}
            <div style={{...s.glass,padding:"28px",marginBottom:"24px"}}>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"14px",marginBottom:"20px"}}>
                YOUR PROGRESS
              </div>
              {prog.map(p=>(
                <div key={p.l} style={{marginBottom:"18px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"7px"}}>
                    <span style={{fontSize:"14px",color:"#aaa"}}>{p.l}</span>
                    <span style={{fontSize:"14px",color:p.c,fontWeight:600}}>{p.v} / {p.m}</span>
                  </div>
                  <div style={{background:"rgba(255,255,255,0.08)",borderRadius:"100px",height:"6px"}}>
                    <div style={{
                      width: p.v===0 ? "0%" : `${(p.v/p.m)*100}%`,
                      height:"100%",borderRadius:"100px",
                      background:p.c,boxShadow:`0 0 8px ${p.c}`,transition:"width 1s ease"
                    }}/>
                  </div>
                  {p.v===0 && (
                    <div style={{color:"#333",fontSize:"11px",marginTop:"4px"}}>
                      Start practicing to fill this bar
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Recommended songs */}
            <div style={{...s.orbitron,color:"#00f5ff",fontSize:"14px",marginBottom:"16px"}}>
              🤖 GOOD SONGS TO START WITH
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",
              gap:"14px",marginBottom:"24px"}}>
              {recs.map(song=>(
                <div key={song.id}
                  onClick={()=>{setSong(song);setPage("tut");}}
                  style={{...s.glass,padding:"18px",cursor:"pointer",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,245,255,0.08)";e.currentTarget.style.transform="translateY(-3px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.transform="translateY(0)"}}>
                  <div style={{fontWeight:600,fontSize:"14px",marginBottom:"4px"}}>{song.title}</div>
                  <div style={{color:"#555",fontSize:"12px",marginBottom:"10px"}}>{song.artist}</div>
                  <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                    {badge(dc(song.difficulty),song.difficulty)}
                    {badge(song.language==="Hindi"?"purple":"blue",song.language)}
                  </div>
                  <div style={{color:"#333",fontSize:"11px",marginTop:"6px"}}>{song.bpm} BPM</div>
                </div>
              ))}
            </div>

            <button onClick={()=>setPage("lib")}
              style={{...s.solidBtn,padding:"12px 32px",fontSize:"13px"}}>
              Browse All {SONGS.length} Songs →
            </button>
          </div>

          {/* Sidebar */}
          <div>
            <div style={{...s.glass,padding:"24px",marginBottom:"18px"}}>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"18px"}}>
                📅 SUGGESTED FIRST WEEK
              </div>
              {weekPlan.map(item=>(
                <div key={item.d} style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px"}}>
                  <div style={{width:"36px",height:"36px",borderRadius:"8px",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    background:"rgba(0,245,255,0.08)",border:"1px solid rgba(0,245,255,0.2)",
                    ...s.orbitron,fontSize:"9px",color:"#00f5ff",flexShrink:0}}>
                    {item.d}
                  </div>
                  <div style={{fontSize:"12px",color:"#aaa",lineHeight:1.4}}>{item.t}</div>
                </div>
              ))}
            </div>

            <div style={{...s.glass,padding:"24px",textAlign:"center"}}>
              <div style={{...s.orbitron,color:"#7c00ff",fontSize:"12px",marginBottom:"14px"}}>
                🎯 YOUR LEVEL
              </div>
              <div style={{fontSize:"48px",marginBottom:"10px"}}>🌱</div>
              <div style={{...s.orbitron,color:"#00ff64",fontSize:"18px"}}>BEGINNER</div>
              <div style={{color:"#444",fontSize:"12px",marginTop:"6px",marginBottom:"16px"}}>
                Just starting out — welcome!
              </div>
              <button onClick={()=>setPage("lib")}
                style={{...s.solidBtn,padding:"10px 24px",fontSize:"12px"}}>
                Pick a Song
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LIBRARY ──────────────────────────────────────────────────────────────────
function Lib({ setPage, setSong, gFilter }) {
  const [search, setSearch] = useState("");
  const [lang,   setLang]   = useState("All");
  const [diff,   setDiff]   = useState("All");
  const [guitar, setGuitar] = useState(gFilter || "All");

  const filtered = SONGS.filter(song =>
    (song.title.toLowerCase().includes(search.toLowerCase()) ||
     song.artist.toLowerCase().includes(search.toLowerCase())) &&
    (lang==="All"   || song.language===lang)   &&
    (diff==="All"   || song.difficulty===diff) &&
    (guitar==="All" || song.guitar===guitar)
  );

  const Fb = ({ l, a, o }) => (
    <button onClick={o} style={{
      background: a?"rgba(0,245,255,0.18)":"transparent",
      border:     a?"1px solid #00f5ff66":"1px solid #222",
      color:      a?"#00f5ff":"#555",
      padding:"6px 14px", borderRadius:"6px", cursor:"pointer", fontSize:"13px",
      transition:"all 0.2s"
    }}>{l}</button>
  );

  return (
    <div style={{paddingTop:"88px",padding:"88px 32px 40px",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <h2 style={{...s.orbitron,...s.neon,fontSize:"28px",marginBottom:"8px"}}>
          {gFilter==="Acoustic"?"🎸 ACOUSTIC GUITAR":
           gFilter==="Electric"?"⚡ ELECTRIC GUITAR":"🎵 SONG LIBRARY"}
        </h2>
        <p style={{color:"#444",marginBottom:"28px",fontSize:"14px"}}>
          {filtered.length} of {SONGS.length} songs
        </p>

        {/* Filters */}
        <div style={{display:"flex",gap:"14px",marginBottom:"24px",flexWrap:"wrap",alignItems:"center"}}>
          <input style={{...s.inp,maxWidth:"260px"}}
            placeholder="🔍 Search songs or artists..."
            value={search} onChange={e=>setSearch(e.target.value)}/>
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
            {["All","Hindi","English"].map(l=><Fb key={l} l={l} a={lang===l} o={()=>setLang(l)}/>)}
            <span style={{color:"#333",alignSelf:"center",padding:"0 4px"}}>|</span>
            {["All","Beginner","Intermediate","Advanced"].map(d=><Fb key={d} l={d} a={diff===d} o={()=>setDiff(d)}/>)}
            <span style={{color:"#333",alignSelf:"center",padding:"0 4px"}}>|</span>
            {["All","Acoustic","Electric"].map(g=><Fb key={g} l={g} a={guitar===g} o={()=>setGuitar(g)}/>)}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:"16px"}}>
          {filtered.map(song=>(
            <div key={song.id}
              onClick={()=>{setSong(song);setPage("tut");}}
              style={{...s.glass,padding:"18px",cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,245,255,0.08)";e.currentTarget.style.transform="translateY(-3px)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.transform="translateY(0)"}}>
              <div style={{fontWeight:600,fontSize:"14px",marginBottom:"4px",lineHeight:1.3}}>{song.title}</div>
              <div style={{color:"#555",fontSize:"12px",marginBottom:"12px"}}>{song.artist}</div>
              <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                {badge(dc(song.difficulty),song.difficulty)}
                {badge(song.language==="Hindi"?"purple":"blue",song.language)}
              </div>
              <div style={{color:"#333",fontSize:"11px",marginTop:"8px"}}>{song.bpm} BPM · {song.guitar}</div>
            </div>
          ))}
          {!filtered.length && (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"80px",color:"#333"}}>
              <div style={{fontSize:"48px",marginBottom:"16px"}}>🎸</div>
              <div style={{fontSize:"16px"}}>No songs found. Try different filters.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TUTORIAL ─────────────────────────────────────────────────────────────────
function Tutorial({ song, setPage }) {
  const [tab, setTab] = useState("tabs");
  const [videoStatus, setVideoStatus] = useState("idle"); // idle | loading | done | error

  if (!song) return (
    <div style={{paddingTop:"120px",textAlign:"center",position:"relative",zIndex:1}}>
      <div style={{fontSize:"56px",marginBottom:"20px"}}>🎸</div>
      <h2 style={{...s.orbitron,...s.neon,fontSize:"24px"}}>No song selected</h2>
      <button onClick={()=>setPage("lib")} style={{...s.solidBtn,marginTop:"24px"}}>Browse Songs</button>
    </div>
  );

  const tips = [
    { ic:"🐢", t:"Start Slow",         d:`Begin at ${Math.floor(song.bpm*0.5)} BPM. Only speed up when it sounds clean.` },
    { ic:"🔄", t:"Chord Transitions",  d:`Drill: ${song.chords.join(" → ")}. Slow transitions beat fast, sloppy ones.` },
    { ic:"🤚", t:"Finger Placement",   d:"Press just behind the fret — not on it, not far from it. Each string must ring clear." },
    { ic:"⏱️", t:"Use a Metronome",    d:`Start at ${Math.floor(song.bpm*0.5)} BPM. Add 5 BPM each session until you hit ${song.bpm}.` },
    { ic:"📅", t:"Practice Daily",     d:"15 focused minutes every day is far better than 2 hours once a week." },
  ];

  const generateVideo = async () => {
    setVideoStatus("loading");
    try {
      const res = await fetch("http://localhost:8000/video/generate", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          song_id:    song.id,
          song_title: song.title,
          artist:     song.artist,
          tabs:       song.tabs,
          chords:     song.chords,
          bpm:        song.bpm,
        }),
      });
      if (res.ok) setVideoStatus("done");
      else        setVideoStatus("error");
    } catch {
      setVideoStatus("error");
    }
  };

  return (
    <div style={{paddingTop:"88px",padding:"88px 32px 40px",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"900px",margin:"0 auto"}}>

        <button onClick={()=>setPage("lib")}
          style={{...s.glowBtn,padding:"8px 20px",fontSize:"12px",marginBottom:"24px"}}>
          ← Back to Library
        </button>

        {/* Header */}
        <div style={{...s.glass,padding:"28px",marginBottom:"20px",
          display:"flex",gap:"24px",alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1}}>
            <h1 style={{...s.orbitron,fontSize:"26px",color:"#fff",marginBottom:"8px"}}>{song.title}</h1>
            <p style={{color:"#888",marginBottom:"14px",fontSize:"16px"}}>{song.artist}</p>
            <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
              {badge(dc(song.difficulty), song.difficulty)}
              {badge(song.language==="Hindi"?"purple":"blue", song.language)}
              {badge("default", song.guitar)}
              {badge("blue", `🎵 ${song.bpm} BPM`)}
            </div>
          </div>
        </div>

        {/* Tab nav */}
        <div style={{display:"flex",gap:"8px",marginBottom:"18px",flexWrap:"wrap"}}>
          {[["tabs","🎸 Tabs"],["chords","🎵 Chords"],["tips","💡 Tips"],["video","🎬 Video"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{
              ...s.glowBtn, padding:"10px 20px", fontSize:"12px",
              background:  tab===k?"rgba(0,245,255,0.2)":"rgba(0,245,255,0.04)",
              color:       tab===k?"#00f5ff":"#555",
              borderColor: tab===k?"#00f5ff":"#00f5ff22",
            }}>{l}</button>
          ))}
        </div>

        <div style={{...s.glass,padding:"32px"}}>

          {/* TABS */}
          {tab==="tabs" && (
            <div>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"14px",marginBottom:"18px"}}>
                GUITAR TABS — {song.title.toUpperCase()}
              </div>
              <pre style={{background:"rgba(0,0,0,0.6)",borderRadius:"10px",
                padding:"24px",fontFamily:"'Courier New',monospace",
                fontSize:"16px",lineHeight:"2.2",color:"#00f5ff",
                border:"1px solid rgba(0,245,255,0.15)",overflowX:"auto",
                boxShadow:"inset 0 0 20px rgba(0,245,255,0.05)"}}>
{song.tabs}
              </pre>
              <div style={{marginTop:"18px",color:"#444",fontSize:"13px",lineHeight:1.7}}>
                📖 Strings top→bottom: <span style={{color:"#666"}}>e (thinnest) → B → G → D → A → E (thickest)</span><br/>
                Numbers = fret to press &nbsp;|&nbsp; 0 = open string &nbsp;|&nbsp; — = sustain / silence
              </div>
            </div>
          )}

          {/* CHORDS */}
          {tab==="chords" && (
            <div>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"14px",marginBottom:"18px"}}>
                CHORDS IN {song.title.toUpperCase()}
              </div>
              <div style={{display:"flex",gap:"14px",flexWrap:"wrap",marginBottom:"28px"}}>
                {song.chords.map(c=>(
                  <div key={c} style={{...s.glass,padding:"22px 28px",textAlign:"center",minWidth:"80px"}}>
                    <div style={{...s.orbitron,fontSize:"24px",color:"#00f5ff"}}>{c}</div>
                    <div style={{fontSize:"11px",color:"#444",marginTop:"4px"}}>chord</div>
                  </div>
                ))}
              </div>
              <div style={{...s.glass,padding:"20px",marginBottom:"18px"}}>
                <div style={{color:"#888",marginBottom:"10px",fontSize:"14px",fontWeight:600}}>🥁 Strumming Pattern</div>
                <div style={{fontFamily:"monospace",fontSize:"24px",color:"#ffd700",letterSpacing:"8px"}}>
                  {STRUMMING[song.difficulty]}
                </div>
                <div style={{color:"#444",fontSize:"12px",marginTop:"8px"}}>↓ = downstroke &nbsp;&nbsp; ↑ = upstroke</div>
              </div>
              <div style={{...s.glass,padding:"20px"}}>
                <div style={{color:"#888",marginBottom:"8px",fontSize:"14px",fontWeight:600}}>⏱ Tempo</div>
                <div style={{...s.orbitron,color:"#00f5ff",fontSize:"22px"}}>{song.bpm} BPM</div>
                <div style={{color:"#444",fontSize:"12px",marginTop:"6px"}}>
                  Practice at {Math.floor(song.bpm*0.5)} → {Math.floor(song.bpm*0.75)} → {song.bpm} BPM
                </div>
              </div>
            </div>
          )}

          {/* TIPS */}
          {tab==="tips" && (
            <div>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"14px",marginBottom:"18px"}}>PRACTICE TIPS</div>
              {tips.map(t=>(
                <div key={t.t} style={{...s.glass,padding:"18px 22px",marginBottom:"12px",display:"flex",gap:"16px"}}>
                  <span style={{fontSize:"24px",flexShrink:0}}>{t.ic}</span>
                  <div>
                    <div style={{fontWeight:600,marginBottom:"4px",color:"#ddd",fontSize:"15px"}}>{t.t}</div>
                    <div style={{color:"#777",fontSize:"13px",lineHeight:1.6}}>{t.d}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIDEO */}
{tab==="video" && (
  <div style={{textAlign:"center"}}>
    <div style={{...s.orbitron,color:"#00f5ff",fontSize:"14px",marginBottom:"18px"}}>
      AI VIDEO TUTORIAL
    </div>
    <div style={{background:"rgba(0,0,0,0.7)",borderRadius:"14px",aspectRatio:"16/9",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      border:"2px solid rgba(0,245,255,0.18)",padding:"40px"}}>

      {videoStatus==="idle" && <>
        <div style={{fontSize:"64px",marginBottom:"18px"}}>🎬</div>
        <div style={{...s.orbitron,color:"#00f5ff",fontSize:"16px",marginBottom:"10px"}}>
          GENERATE VIDEO TUTORIAL
        </div>
        <div style={{color:"#666",fontSize:"14px",maxWidth:"400px",lineHeight:1.7,marginBottom:"28px"}}>
          Click the button below to auto-generate a voice-guided video tutorial
          for <strong style={{color:"#aaa"}}>{song.title}</strong>.
          The video will include the tabs, chords, and spoken instructions.
        </div>
        <button onClick={generateVideo}
          style={{...s.solidBtn,padding:"14px 36px",fontSize:"14px"}}>
          🤖 Generate Video Tutorial
        </button>
      </>}

      {videoStatus==="loading" && <>
        <div style={{fontSize:"56px",marginBottom:"20px"}}>⏳</div>
        <div style={{...s.orbitron,color:"#ffa500",fontSize:"18px",marginBottom:"10px"}}>
          GENERATING VIDEO...
        </div>
        <div style={{color:"#555",fontSize:"14px",lineHeight:1.7}}>
          Creating voice narration and combining with tabs image.<br/>
          This usually takes 20 to 60 seconds. Please wait.
        </div>
      </>}

      {videoStatus==="done" && <>
        <div style={{fontSize:"56px",marginBottom:"20px"}}>✅</div>
        <div style={{...s.orbitron,color:"#00ff64",fontSize:"18px",marginBottom:"10px"}}>
          VIDEO READY!
        </div>
        <div style={{color:"#888",fontSize:"14px",marginBottom:"20px"}}>
          Your tutorial video for <strong style={{color:"#aaa"}}>{song.title}</strong> has been generated.
        </div>
        <div style={{...s.glass,padding:"12px 20px",fontSize:"13px",color:"#00f5ff",marginBottom:"20px"}}>
          📁 Saved to: <code>ml/generated/videos/tutorial_{song.id}.mp4</code>
        </div>
        <button onClick={()=>setVideoStatus("idle")}
          style={{...s.glowBtn,padding:"10px 24px",fontSize:"12px"}}>
          Generate Again
        </button>
      </>}

      {videoStatus==="error" && <>
        <div style={{fontSize:"56px",marginBottom:"20px"}}>❌</div>
        <div style={{...s.orbitron,color:"#ff4444",fontSize:"18px",marginBottom:"10px"}}>
          GENERATION FAILED
        </div>
        <div style={{color:"#666",fontSize:"14px",lineHeight:1.7,marginBottom:"20px",maxWidth:"420px"}}>
          The video could not be generated. This usually means either the
          ML service is not running, or FFmpeg is not installed on your computer.
        </div>
        <div style={{...s.glass,padding:"16px 24px",marginBottom:"20px",textAlign:"left",maxWidth:"440px"}}>
          <div style={{color:"#ffa500",fontSize:"12px",marginBottom:"10px",fontWeight:600}}>HOW TO FIX:</div>
          <div style={{color:"#777",fontSize:"12px",lineHeight:1.9}}>
            1. Install FFmpeg: <a href="https://ffmpeg.org/download.html" target="_blank"
              style={{color:"#00f5ff"}}>ffmpeg.org/download.html</a><br/>
            2. Open a terminal and go to your ml folder<br/>
            3. Activate your Python environment<br/>
            4. Run: <code style={{color:"#00f5ff",background:"rgba(0,245,255,0.08)",
              padding:"2px 6px",borderRadius:"4px"}}>uvicorn main:app --reload --port 8000</code>
          </div>
        </div>
        <button onClick={()=>setVideoStatus("idle")}
          style={{...s.glowBtn,padding:"10px 24px",fontSize:"12px"}}>
          Try Again
        </button>
      </>}

    </div>
    <p style={{color:"#333",fontSize:"12px",marginTop:"14px"}}>
      Video is generated locally using Python + gTTS voice + FFmpeg. No data leaves your computer.
    </p>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function Admin() {
  const [activeTab, setActiveTab] = useState("songs");
  const [toast,     setToast]     = useState("");
  const showToast = m => { setToast(m); setTimeout(()=>setToast(""),2500); };

  const stats = [
    [SONGS.length,                              "Total Songs",   "🎵"],
    [SONGS.filter(s=>s.language==="Hindi").length,   "Hindi Songs",   "🎤"],
    [SONGS.filter(s=>s.language==="English").length, "English Songs", "🎸"],
    [SONGS.filter(s=>s.difficulty==="Beginner").length, "Beginner",  "🌱"],
  ];

  return (
    <div style={{paddingTop:"88px",padding:"88px 32px 40px",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <h2 style={{...s.orbitron,...s.neon,fontSize:"26px",marginBottom:"6px"}}>⚙️ ADMIN PANEL</h2>
        <div style={{...s.glass,padding:"10px 16px",marginBottom:"28px",
          display:"inline-block",borderColor:"rgba(255,165,0,0.35)"}}>
          <span style={{color:"#ffa500",fontSize:"13px"}}>
            🔒 Restricted — admin accounts only
          </span>
        </div>

        {/* Real stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px",marginBottom:"32px"}}>
          {stats.map(([v,l,ic])=>(
            <div key={l} style={{...s.glass,padding:"20px",textAlign:"center"}}>
              <div style={{fontSize:"28px",marginBottom:"8px"}}>{ic}</div>
              <div style={{...s.orbitron,...s.neon,fontSize:"26px"}}>{v}</div>
              <div style={{color:"#555",fontSize:"12px",marginTop:"4px"}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:"8px",marginBottom:"22px"}}>
          {["songs","add"].map(t=>(
            <button key={t} onClick={()=>setActiveTab(t)} style={{
              ...s.glowBtn, padding:"8px 20px", fontSize:"12px",
              background: activeTab===t?"rgba(0,245,255,0.2)":"rgba(0,245,255,0.04)",
              color:      activeTab===t?"#00f5ff":"#555",
            }}>
              {t==="songs"?"📋 All Songs":"➕ Add Song"}
            </button>
          ))}
        </div>

        {activeTab==="songs" && (
          <div style={{...s.glass,padding:"22px",overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px",minWidth:"640px"}}>
              <thead>
                <tr style={{borderBottom:"1px solid rgba(0,245,255,0.18)"}}>
                  {["#","Title","Artist","Language","Difficulty","Guitar","BPM","Actions"].map(h=>(
                    <th key={h} style={{...s.orbitron,color:"#00f5ff",padding:"12px 10px",
                      textAlign:"left",fontSize:"11px"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SONGS.map(song=>(
                  <tr key={song.id}
                    style={{borderBottom:"1px solid rgba(255,255,255,0.04)"}}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(0,245,255,0.04)"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{padding:"10px",color:"#333"}}>{song.id}</td>
                    <td style={{padding:"10px",color:"#ddd",fontWeight:500}}>{song.title}</td>
                    <td style={{padding:"10px",color:"#666"}}>{song.artist}</td>
                    <td style={{padding:"10px"}}>{badge(song.language==="Hindi"?"purple":"blue",song.language)}</td>
                    <td style={{padding:"10px"}}>{badge(dc(song.difficulty),song.difficulty)}</td>
                    <td style={{padding:"10px",color:"#666"}}>{song.guitar}</td>
                    <td style={{padding:"10px",color:"#444"}}>{song.bpm}</td>
                    <td style={{padding:"10px"}}>
                      <button onClick={()=>showToast(`✏️ Edit: ${song.title}`)}
                        style={{background:"none",border:"1px solid #333",color:"#777",
                          padding:"3px 10px",borderRadius:"4px",cursor:"pointer",fontSize:"11px",marginRight:"6px"}}>
                        Edit
                      </button>
                      <button onClick={()=>showToast(`🗑️ Deleted: ${song.title}`)}
                        style={{background:"none",border:"1px solid #ff444444",color:"#ff4444",
                          padding:"3px 10px",borderRadius:"4px",cursor:"pointer",fontSize:"11px"}}>
                        Del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab==="add" && (
          <div style={{...s.glass,padding:"32px",maxWidth:"500px"}}>
            <div style={{...s.orbitron,color:"#00f5ff",fontSize:"14px",marginBottom:"22px"}}>ADD NEW SONG</div>
            {[["Song Title","text"],["Artist Name","text"],["BPM","number"]].map(([l,t])=>(
              <div key={l} style={{marginBottom:"16px"}}>
                <div style={{color:"#666",fontSize:"12px",letterSpacing:"1px",marginBottom:"6px"}}>{l.toUpperCase()}</div>
                <input type={t} style={s.inp} placeholder={l}/>
              </div>
            ))}
            <button onClick={()=>showToast("✅ Song added! Connect to backend API to persist.")}
              style={{...s.solidBtn,width:"100%",marginTop:"10px"}}>
              ➕ Add Song
            </button>
          </div>
        )}

        {toast && (
          <div style={{position:"fixed",bottom:"32px",right:"32px",...s.glass,
            padding:"14px 24px",color:"#00f5ff",
            boxShadow:"0 0 20px rgba(0,245,255,0.3)",fontSize:"14px"}}>
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("land");
  const [user, setUser] = useState(null);
  const [song, setSong] = useState(null);

  const go = p => {
    if (["dash","admin"].includes(p) && !user)            { setPage("login"); return; }
    if (p==="admin" && user && !user.isAdmin)             { alert("⛔ Admin access only."); return; }
    setPage(p);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #00f5ff33; border-radius: 3px; }
      `}</style>

      <div style={s.root}>
        {/* Animated canvas background — always visible */}
        <AnimatedBackground />

        <div style={{position:"relative", zIndex:1}}>
          <Navbar page={page} setPage={go} user={user} setUser={setUser}/>

          {page==="land"     && <Landing setPage={go}/>}
          {page==="login"    && <Auth mode="login"  setPage={setPage} setUser={setUser}/>}
          {page==="signup"   && <Auth mode="signup" setPage={setPage} setUser={setUser}/>}
          {page==="dash"     && user && <Dash user={user} setPage={go} setSong={setSong}/>}
          {page==="lib"      && <Lib setPage={go} setSong={setSong} gFilter={null}/>}
          {page==="acoustic" && <Lib setPage={go} setSong={setSong} gFilter="Acoustic"/>}
          {page==="electric" && <Lib setPage={go} setSong={setSong} gFilter="Electric"/>}
          {page==="tut"      && <Tutorial song={song} setPage={setPage}/>}
          {page==="admin"    && user?.isAdmin && <Admin/>}
        </div>
      </div>
    </>
  );
}