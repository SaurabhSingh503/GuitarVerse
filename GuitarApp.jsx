import { useState, useEffect, useRef } from "react";

// ─── SONG DATA (100 songs: 50 Hindi + 50 English) ───────────────────────────
const SONGS = [
  // HINDI SONGS
  { id:1, title:"Tum Hi Ho", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:72, chords:["Am","F","C","G"], thumbnail:"🎵" },
  { id:2, title:"Kal Ho Na Ho", artist:"Sonu Nigam", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:80, chords:["G","Em","C","D"], thumbnail:"🎸" },
  { id:3, title:"Ae Dil Hai Mushkil", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:68, chords:["Dm","Am","F","C"], thumbnail:"🎵" },
  { id:4, title:"Channa Mereya", artist:"Arijit Singh", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:76, chords:["Em","C","G","D"], thumbnail:"🎸" },
  { id:5, title:"Raabta", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:64, chords:["C","G","Am","F"], thumbnail:"🎵" },
  { id:6, title:"Phir Le Aya Dil", artist:"Arijit Singh", language:"Hindi", difficulty:"Advanced", guitar:"Acoustic", bpm:85, chords:["Bm","G","D","A"], thumbnail:"🎸" },
  { id:7, title:"Kabira", artist:"Rekha Bhardwaj", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:78, chords:["G","D","Em","C"], thumbnail:"🎵" },
  { id:8, title:"Sooraj Dooba Hain", artist:"Arijit Singh", language:"Hindi", difficulty:"Intermediate", guitar:"Electric", bpm:88, chords:["Am","F","C","E"], thumbnail:"⚡" },
  { id:9, title:"Gerua", artist:"Arijit Singh", language:"Hindi", difficulty:"Advanced", guitar:"Acoustic", bpm:92, chords:["Cmaj7","Am7","Fmaj7","G"], thumbnail:"🎸" },
  { id:10, title:"Tere Sang Yaara", artist:"Atif Aslam", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:70, chords:["D","A","Bm","G"], thumbnail:"🎵" },
  { id:11, title:"Mann Bharrya", artist:"B Praak", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:75, chords:["Em","G","C","D"], thumbnail:"🎸" },
  { id:12, title:"Kesariya", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:84, chords:["C","Am","F","G"], thumbnail:"🎵" },
  { id:13, title:"Dooba Dooba", artist:"Silk Route", language:"Hindi", difficulty:"Intermediate", guitar:"Electric", bpm:90, chords:["G","Em","C","D"], thumbnail:"⚡" },
  { id:14, title:"Iktara", artist:"Amitabh Bhattacharya", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:66, chords:["Am","F","C","E7"], thumbnail:"🎵" },
  { id:15, title:"Jeena Jeena", artist:"Atif Aslam", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:72, chords:["C","G","Am","F"], thumbnail:"🎸" },
  { id:16, title:"Saware", artist:"Arijit Singh", language:"Hindi", difficulty:"Advanced", guitar:"Acoustic", bpm:82, chords:["Bm","G","D","A"], thumbnail:"🎵" },
  { id:17, title:"Teri Meri", artist:"Rahat Fateh Ali", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:68, chords:["G","D","Em","C"], thumbnail:"🎸" },
  { id:18, title:"Dil Dhadakne Do", artist:"Arijit Singh", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:86, chords:["Am","Em","F","G"], thumbnail:"🎵" },
  { id:19, title:"Bulleya", artist:"Amit Mishra", language:"Hindi", difficulty:"Advanced", guitar:"Electric", bpm:94, chords:["Dm","Am","Bb","C"], thumbnail:"⚡" },
  { id:20, title:"Janam Janam", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:74, chords:["G","Em","C","D"], thumbnail:"🎵" },
  { id:21, title:"Zindagi Na Milegi Dobara", artist:"Shankar Ehsaan Loy", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:80, chords:["D","A","Bm","G"], thumbnail:"🎸" },
  { id:22, title:"Hawayein", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:76, chords:["C","G","Am","Em"], thumbnail:"🎵" },
  { id:23, title:"Kalank", artist:"Arijit Singh", language:"Hindi", difficulty:"Advanced", guitar:"Acoustic", bpm:88, chords:["Dm","Gm","Bb","F"], thumbnail:"🎸" },
  { id:24, title:"Woh Ladki", artist:"Kishor Kumar", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:70, chords:["C","F","G","Am"], thumbnail:"🎵" },
  { id:25, title:"Mere Naam Tu", artist:"Abhay Jodhpurkar", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:78, chords:["G","D","Em","Bm"], thumbnail:"🎸" },
  { id:26, title:"Khairiyat", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:72, chords:["Am","F","C","G"], thumbnail:"🎵" },
  { id:27, title:"Bekhayali", artist:"Sachet Tandon", language:"Hindi", difficulty:"Advanced", guitar:"Electric", bpm:96, chords:["Em","C","G","D"], thumbnail:"⚡" },
  { id:28, title:"Pachtaoge", artist:"Arijit Singh", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:82, chords:["Dm","Am","F","C"], thumbnail:"🎸" },
  { id:29, title:"Aithey Aa", artist:"Akasa Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:74, chords:["G","C","D","Em"], thumbnail:"🎵" },
  { id:30, title:"Lut Gaye", artist:"Jubin Nautiyal", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:80, chords:["C","G","Am","F"], thumbnail:"🎸" },
  { id:31, title:"Roja", artist:"AR Rahman", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:78, chords:["Am","Em","F","G"], thumbnail:"🎵" },
  { id:32, title:"Agar Tum Saath Ho", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:66, chords:["Dm","Gm","C","F"], thumbnail:"🎸" },
  { id:33, title:"Mast Magan", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:76, chords:["G","D","C","Em"], thumbnail:"🎵" },
  { id:34, title:"Tujh Mein Rab Dikhta Hai", artist:"Roop Kumar Rathod", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:72, chords:["C","F","Am","G"], thumbnail:"🎸" },
  { id:35, title:"Yeh Tune Kya Kiya", artist:"Zeb and Haniya", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:70, chords:["Am","G","F","E"], thumbnail:"🎵" },
  { id:36, title:"Enna Sona", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:74, chords:["C","G","Am","F"], thumbnail:"🎸" },
  { id:37, title:"Tere Bina", artist:"AR Rahman", language:"Hindi", difficulty:"Advanced", guitar:"Acoustic", bpm:84, chords:["Dm","Am","Bb","F"], thumbnail:"🎵" },
  { id:38, title:"Galliyan", artist:"Ankit Tiwari", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:80, chords:["Am","G","F","Em"], thumbnail:"🎸" },
  { id:39, title:"Ilahi", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:68, chords:["G","Em","C","D"], thumbnail:"🎵" },
  { id:40, title:"Banjaara", artist:"Mohammad Irfan", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:76, chords:["D","G","A","Bm"], thumbnail:"🎸" },
  { id:41, title:"Main Phir Bhi Tumko Chahhunga", artist:"Arijit Singh", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:78, chords:["Am","F","C","G"], thumbnail:"🎵" },
  { id:42, title:"Meherbaan", artist:"Arijit Singh", language:"Hindi", difficulty:"Advanced", guitar:"Electric", bpm:90, chords:["Em","Am","D","G"], thumbnail:"⚡" },
  { id:43, title:"Tu Hi Haqeeqat", artist:"Javed Ali", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:72, chords:["C","G","Am","F"], thumbnail:"🎸" },
  { id:44, title:"Ae Watan", artist:"Arijit Singh", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:84, chords:["D","G","A","Em"], thumbnail:"🎵" },
  { id:45, title:"Hasi", artist:"Ami Mishra", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:70, chords:["G","C","D","Em"], thumbnail:"🎸" },
  { id:46, title:"Ek Villain Title", artist:"Mustafa Zahid", language:"Hindi", difficulty:"Intermediate", guitar:"Electric", bpm:88, chords:["Am","F","C","E"], thumbnail:"⚡" },
  { id:47, title:"Chahun Main Ya Naa", artist:"Arijit Singh", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:74, chords:["G","Em","C","D"], thumbnail:"🎵" },
  { id:48, title:"Phir Mohabbat", artist:"Arijit Singh", language:"Hindi", difficulty:"Intermediate", guitar:"Acoustic", bpm:78, chords:["Dm","Am","F","C"], thumbnail:"🎸" },
  { id:49, title:"Meri Aashiqui", artist:"Jubin Nautiyal", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:72, chords:["C","G","Am","F"], thumbnail:"🎵" },
  { id:50, title:"Baarish", artist:"Atif Aslam", language:"Hindi", difficulty:"Beginner", guitar:"Acoustic", bpm:76, chords:["G","D","Em","C"], thumbnail:"🎸" },

  // ENGLISH SONGS
  { id:51, title:"Hotel California", artist:"Eagles", language:"English", difficulty:"Advanced", guitar:"Electric", bpm:75, chords:["Am","E7","G","D","F","C","Dm","E"], thumbnail:"⚡" },
  { id:52, title:"Wonderwall", artist:"Oasis", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:87, chords:["Em7","G","Dsus4","A7sus4"], thumbnail:"🎸" },
  { id:53, title:"Knockin on Heaven's Door", artist:"Bob Dylan", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:72, chords:["G","D","Am","C"], thumbnail:"🎵" },
  { id:54, title:"Nothing Else Matters", artist:"Metallica", language:"English", difficulty:"Advanced", guitar:"Electric", bpm:68, chords:["Em","D","C","Am","G"], thumbnail:"⚡" },
  { id:55, title:"Let Her Go", artist:"Passenger", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:96, chords:["G","D","Em","C"], thumbnail:"🎸" },
  { id:56, title:"Wish You Were Here", artist:"Pink Floyd", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:66, chords:["C","D","Am","G"], thumbnail:"🎵" },
  { id:57, title:"Sweet Home Alabama", artist:"Lynyrd Skynyrd", language:"English", difficulty:"Intermediate", guitar:"Electric", bpm:97, chords:["D","C","G"], thumbnail:"⚡" },
  { id:58, title:"Stairway to Heaven", artist:"Led Zeppelin", language:"English", difficulty:"Advanced", guitar:"Acoustic", bpm:82, chords:["Am","G","F","C","Em","D"], thumbnail:"🎸" },
  { id:59, title:"Shape of You", artist:"Ed Sheeran", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:96, chords:["C#m","F#m","A","B"], thumbnail:"🎵" },
  { id:60, title:"Smoke on the Water", artist:"Deep Purple", language:"English", difficulty:"Beginner", guitar:"Electric", bpm:112, chords:["Gm","F","Eb","D"], thumbnail:"⚡" },
  { id:61, title:"Tears in Heaven", artist:"Eric Clapton", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:80, chords:["A","E","F#m","D"], thumbnail:"🎸" },
  { id:62, title:"More Than Words", artist:"Extreme", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:72, chords:["G","Gsus4","Cadd9","Am7","D7"], thumbnail:"🎵" },
  { id:63, title:"Zombie", artist:"The Cranberries", language:"English", difficulty:"Beginner", guitar:"Electric", bpm:85, chords:["Em","C","G","D"], thumbnail:"⚡" },
  { id:64, title:"Fast Car", artist:"Tracy Chapman", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:100, chords:["C","G","Am","F"], thumbnail:"🎸" },
  { id:65, title:"Free Fallin", artist:"Tom Petty", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:86, chords:["F","Bb","C"], thumbnail:"🎵" },
  { id:66, title:"Come As You Are", artist:"Nirvana", language:"English", difficulty:"Intermediate", guitar:"Electric", bpm:120, chords:["Em","Am","C","D"], thumbnail:"⚡" },
  { id:67, title:"Behind Blue Eyes", artist:"The Who", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:72, chords:["Em","G","D","Dsus4","C","E"], thumbnail:"🎸" },
  { id:68, title:"House of the Rising Sun", artist:"The Animals", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:76, chords:["Am","C","D","F","E"], thumbnail:"🎵" },
  { id:69, title:"Here Comes the Sun", artist:"The Beatles", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:130, chords:["A","G","D","Dsus4","E7"], thumbnail:"🎸" },
  { id:70, title:"Blackbird", artist:"The Beatles", language:"English", difficulty:"Advanced", guitar:"Acoustic", bpm:96, chords:["G","Am","C","D","Em"], thumbnail:"🎵" },
  { id:71, title:"Creep", artist:"Radiohead", language:"English", difficulty:"Beginner", guitar:"Electric", bpm:92, chords:["G","B","C","Cm"], thumbnail:"⚡" },
  { id:72, title:"Country Roads", artist:"John Denver", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:80, chords:["G","Em","D","C"], thumbnail:"🎸" },
  { id:73, title:"Jolene", artist:"Dolly Parton", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:164, chords:["Am","C","G"], thumbnail:"🎵" },
  { id:74, title:"Purple Rain", artist:"Prince", language:"English", difficulty:"Advanced", guitar:"Electric", bpm:58, chords:["Bb","F","C","Gm"], thumbnail:"⚡" },
  { id:75, title:"Hallelujah", artist:"Leonard Cohen", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:58, chords:["C","Am","F","G","E7"], thumbnail:"🎸" },
  { id:76, title:"Brown Eyed Girl", artist:"Van Morrison", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:148, chords:["G","C","D","Em"], thumbnail:"🎵" },
  { id:77, title:"Hey There Delilah", artist:"Plain White T's", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:90, chords:["D","F#m","Bm","G","A"], thumbnail:"🎸" },
  { id:78, title:"With or Without You", artist:"U2", language:"English", difficulty:"Beginner", guitar:"Electric", bpm:113, chords:["D","A","Bm","G"], thumbnail:"⚡" },
  { id:79, title:"Losing My Religion", artist:"REM", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:131, chords:["Am","Em","F","G","Dm"], thumbnail:"🎵" },
  { id:80, title:"Stand By Me", artist:"Ben E. King", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:119, chords:["A","F#m","D","E"], thumbnail:"🎸" },
  { id:81, title:"Ain't No Sunshine", artist:"Bill Withers", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:76, chords:["Am","Em","G","Dm"], thumbnail:"🎵" },
  { id:82, title:"Dust in the Wind", artist:"Kansas", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:96, chords:["C","Am","Asus2","G","D"], thumbnail:"🎸" },
  { id:83, title:"Mad World", artist:"Tears for Fears", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:88, chords:["Dm","F","C","G"], thumbnail:"🎵" },
  { id:84, title:"The Sound of Silence", artist:"Simon & Garfunkel", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:96, chords:["Am","G","F","C","E"], thumbnail:"🎸" },
  { id:85, title:"Clocks", artist:"Coldplay", language:"English", difficulty:"Intermediate", guitar:"Electric", bpm:131, chords:["Eb","Bbm","Fm"], thumbnail:"⚡" },
  { id:86, title:"Yellow", artist:"Coldplay", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:88, chords:["B","Badd11","Emaj7","A","Aadd9"], thumbnail:"🎸" },
  { id:87, title:"The Scientist", artist:"Coldplay", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:75, chords:["Dm","Bb","F","C"], thumbnail:"🎵" },
  { id:88, title:"Knockin Me Off My Feet", artist:"Donell Jones", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:78, chords:["C","G","Am","F"], thumbnail:"🎸" },
  { id:89, title:"Californication", artist:"RHCP", language:"English", difficulty:"Intermediate", guitar:"Electric", bpm:96, chords:["Am","F","C","G","Dm"], thumbnail:"⚡" },
  { id:90, title:"Under the Bridge", artist:"RHCP", language:"English", difficulty:"Intermediate", guitar:"Electric", bpm:72, chords:["D","F#","E","A","G","Bm"], thumbnail:"⚡" },
  { id:91, title:"Fix You", artist:"Coldplay", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:70, chords:["C","Em","Am","F","G"], thumbnail:"🎸" },
  { id:92, title:"Every Rose Has Thorn", artist:"Poison", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:108, chords:["G","C","D"], thumbnail:"🎵" },
  { id:93, title:"Love of My Life", artist:"Queen", language:"English", difficulty:"Advanced", guitar:"Acoustic", bpm:76, chords:["F","Bb","C","Am","Dm","Gm"], thumbnail:"🎸" },
  { id:94, title:"Sultans of Swing", artist:"Dire Straits", language:"English", difficulty:"Advanced", guitar:"Electric", bpm:146, chords:["Dm","C","Bb","A","F"], thumbnail:"⚡" },
  { id:95, title:"Hurt", artist:"Johnny Cash", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:44, chords:["Am","C","D","G","F"], thumbnail:"🎵" },
  { id:96, title:"When the Party's Over", artist:"Billie Eilish", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:86, chords:["G","Bm","C","D"], thumbnail:"🎸" },
  { id:97, title:"Perfect", artist:"Ed Sheeran", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:95, chords:["G","Em","C","D"], thumbnail:"🎵" },
  { id:98, title:"Photograph", artist:"Ed Sheeran", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:107, chords:["E","C#m","A","B"], thumbnail:"🎸" },
  { id:99, title:"Stay With Me", artist:"Sam Smith", language:"English", difficulty:"Beginner", guitar:"Acoustic", bpm:84, chords:["Am","F","C","G"], thumbnail:"🎵" },
  { id:100, title:"Shallow", artist:"Lady Gaga", language:"English", difficulty:"Intermediate", guitar:"Acoustic", bpm:96, chords:["Em","D","G","A","Am","C"], thumbnail:"🎸" },
];

// ─── GUITAR TABS DATA ─────────────────────────────────────────────────────────
const TABS = {
  default: `e|--0--0-----0-----|--1--1-----1-----|
B|-----1--1--1-----|-----1--1--1-----|
G|--------0-----0--|--------0-----0--|
D|-2---------------|-----------------|
A|-----------------|--3--------------|
E|-----------------|-----------------|`,
  advanced: `e|--12-12-10-12----|--12-10-8-10-----|
B|-------------12--|--------10-8-----|
G|-----------------|--------10-------|
D|-----------------|-----------------|
A|-----------------|-----------------|
E|-----------------|-----------------|`,
};

// ─── STRUMMING PATTERNS ───────────────────────────────────────────────────────
const STRUM_PATTERNS = {
  Beginner: "↓ ↓ ↑ ↓ ↑  (D D U D U)",
  Intermediate: "↓ ↑ ↓ ↓ ↑ ↓ ↑  (D U D D U D U)",
  Advanced: "↓ ↑ ↑ ↓ ↑ ↓ ↑ ↓  (Complex pattern)",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = {
  root: {
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #000000 0%, #0a0010 40%, #0d001f 70%, #000510 100%)",
    minHeight: "100vh",
    color: "#e0e0e0",
    position: "relative",
    overflow: "hidden",
  },
  orbitron: { fontFamily: "'Orbitron', monospace" },
  neon: { color: "#00f5ff", textShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff55" },
  glass: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(0,245,255,0.15)",
    borderRadius: "16px",
  },
  glassHover: {
    background: "rgba(0,245,255,0.08)",
    border: "1px solid rgba(0,245,255,0.4)",
  },
  neonBtn: {
    background: "linear-gradient(135deg, #00f5ff22, #7c00ff22)",
    border: "1px solid #00f5ff",
    color: "#00f5ff",
    padding: "12px 32px",
    borderRadius: "8px",
    fontFamily: "'Orbitron', monospace",
    fontSize: "14px",
    letterSpacing: "2px",
    cursor: "pointer",
    boxShadow: "0 0 15px #00f5ff44, inset 0 0 15px #00f5ff11",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
  },
  neonBtnFull: {
    background: "linear-gradient(135deg, #00f5ff, #7c00ff)",
    border: "none",
    color: "#000",
    padding: "14px 36px",
    borderRadius: "8px",
    fontFamily: "'Orbitron', monospace",
    fontSize: "14px",
    letterSpacing: "2px",
    cursor: "pointer",
    boxShadow: "0 0 25px #00f5ff88",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  input: {
    background: "rgba(0,245,255,0.05)",
    border: "1px solid rgba(0,245,255,0.3)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#e0e0e0",
    outline: "none",
    width: "100%",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
  },
  badge: (color) => ({
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    ...(color === "blue" ? { background: "rgba(0,245,255,0.15)", color: "#00f5ff", border: "1px solid #00f5ff44" } :
        color === "green" ? { background: "rgba(0,255,100,0.15)", color: "#00ff64", border: "1px solid #00ff6444" } :
        color === "orange" ? { background: "rgba(255,165,0,0.15)", color: "#ffa500", border: "1px solid #ffa50044" } :
        color === "red" ? { background: "rgba(255,50,50,0.15)", color: "#ff3232", border: "1px solid #ff323244" } :
        color === "purple" ? { background: "rgba(124,0,255,0.15)", color: "#a855f7", border: "1px solid #a855f744" } :
        { background: "rgba(255,255,255,0.1)", color: "#ccc", border: "1px solid #ccc4" }),
  }),
};

const diffColor = (d) => d === "Beginner" ? "green" : d === "Intermediate" ? "orange" : "red";
const langColor = (l) => l === "Hindi" ? "purple" : "blue";

// ─── AMBIENT PARTICLES ────────────────────────────────────────────────────────
function Particles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: Math.random() * 3 + 1 + "px",
          height: Math.random() * 3 + 1 + "px",
          background: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#7c00ff" : "#ff00aa",
          borderRadius: "50%",
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
          opacity: Math.random() * 0.6 + 0.1,
          animation: `pulse ${Math.random() * 4 + 2}s ease-in-out infinite`,
          animationDelay: Math.random() * 5 + "s",
        }} />
      ))}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, user, setUser }) {
  const navItems = user
    ? [["Dashboard", "dashboard"], ["Songs", "library"], ["Acoustic", "acoustic"], ["Electric", "electric"], ["Admin", "admin"]]
    : [["Home", "landing"], ["Songs", "library"]];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,245,255,0.2)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: "64px",
    }}>
      <div onClick={() => setPage("landing")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "28px" }}>🎸</span>
        <span style={{ ...styles.orbitron, ...styles.neon, fontSize: "18px", fontWeight: "900" }}>GUITARPRO</span>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        {navItems.map(([label, p]) => (
          <button key={p} onClick={() => setPage(p)} style={{
            background: page === p ? "rgba(0,245,255,0.15)" : "transparent",
            border: page === p ? "1px solid rgba(0,245,255,0.5)" : "1px solid transparent",
            color: page === p ? "#00f5ff" : "#888",
            padding: "6px 16px", borderRadius: "6px", cursor: "pointer",
            fontFamily: "'Poppins', sans-serif", fontSize: "13px", transition: "all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ color: "#00f5ff", fontSize: "14px" }}>👤 {user.name}</span>
            <button onClick={() => setUser(null)} style={{ ...styles.neonBtn, padding: "6px 16px", fontSize: "12px" }}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage("login")} style={{ ...styles.neonBtn, padding: "6px 18px", fontSize: "12px" }}>Login</button>
            <button onClick={() => setPage("signup")} style={{ ...styles.neonBtnFull, padding: "6px 18px", fontSize: "12px" }}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ setPage }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 100);
    return () => clearInterval(t);
  }, []);

  const features = [
    { icon: "🤖", title: "AI Recommendations", desc: "Smart ML engine learns your style and recommends the perfect next song to master." },
    { icon: "📊", title: "100+ Song Library", desc: "50 Hindi + 50 English classics with full tabs, chords, and strumming patterns." },
    { icon: "🎬", title: "Video Tutorials", desc: "AI-generated video lessons with voice guidance and animated fretboard." },
    { icon: "📅", title: "Practice Plans", desc: "Personalized daily plans adapting to your skill level from beginner to advanced." },
    { icon: "📱", title: "Mobile Ready", desc: "Practice anywhere, anytime. Fully responsive across all devices." },
    { icon: "🏆", title: "Progress Tracking", desc: "Visualize your journey with detailed analytics and milestone achievements." },
  ];

  const testimonials = [
    { name: "Arjun Mehta", role: "Hobbyist", text: "Learned my first 20 songs in just 2 months! The AI suggestions are incredibly accurate.", stars: 5 },
    { name: "Sarah Wilson", role: "Music Student", text: "The tab viewer is the cleanest I've seen anywhere. Finally an app that looks as good as it works.", stars: 5 },
    { name: "Priya Sharma", role: "Beginner", text: "Started with zero knowledge. Now I'm playing Tum Hi Ho and my family can't believe it!", stars: 5 },
  ];

  // Animated guitar string effect
  const strings = [0,1,2,3,4,5];

  return (
    <div style={{ paddingTop: "64px" }}>
      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "80px 40px", position: "relative",
      }}>
        {/* Guitar strings decoration */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          {strings.map((_, i) => (
            <div key={i} style={{
              position: "absolute", left: 0, right: 0,
              height: "1px",
              top: (i - 2.5) * 60 + "px",
              background: `linear-gradient(90deg, transparent, rgba(0,245,255,${0.05 + i * 0.02}), transparent)`,
              boxShadow: `0 0 ${3 + i}px rgba(0,245,255,0.3)`,
            }} />
          ))}
        </div>

        <div style={{
          display: "inline-block", ...styles.badge("blue"),
          marginBottom: "24px", fontSize: "12px", letterSpacing: "3px",
        }}>🎸 THE FUTURE OF GUITAR LEARNING</div>

        <h1 style={{
          ...styles.orbitron, fontSize: "clamp(40px, 8vw, 88px)",
          fontWeight: "900", lineHeight: "1.1", marginBottom: "24px",
          background: "linear-gradient(135deg, #ffffff 0%, #00f5ff 50%, #7c00ff 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          MASTER GUITAR<br />LIKE A PRO
        </h1>

        <p style={{ fontSize: "18px", color: "#aaa", maxWidth: "560px", lineHeight: "1.7", marginBottom: "40px" }}>
          AI-powered tutorials, 100+ songs, personalized practice plans. 
          From your first chord to your first solo — we've got you covered.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => setPage("signup")} style={{ ...styles.neonBtnFull, padding: "16px 44px", fontSize: "15px" }}>
            🚀 Start Learning Free
          </button>
          <button onClick={() => setPage("library")} style={{ ...styles.neonBtn, padding: "16px 44px", fontSize: "15px" }}>
            🎵 Explore Songs
          </button>
        </div>

        <div style={{ display: "flex", gap: "40px", marginTop: "60px", flexWrap: "wrap", justifyContent: "center" }}>
          {[["100+", "Songs"], ["50K+", "Students"], ["4.9★", "Rating"], ["Free", "Forever"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ ...styles.orbitron, ...styles.neon, fontSize: "28px", fontWeight: "900" }}>{val}</div>
              <div style={{ color: "#666", fontSize: "13px", letterSpacing: "2px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ ...styles.orbitron, fontSize: "36px", ...styles.neon, fontWeight: "700" }}>WHY GUITARPRO?</h2>
          <p style={{ color: "#666", marginTop: "12px" }}>Everything you need to become the guitarist you were born to be.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {features.map(f => (
            <div key={f.title} style={{ ...styles.glass, padding: "32px", transition: "all 0.3s", cursor: "default" }}
              onMouseEnter={e => Object.assign(e.currentTarget.style, styles.glassHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, styles.glass)}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ ...styles.orbitron, color: "#00f5ff", fontSize: "15px", marginBottom: "10px" }}>{f.title}</h3>
              <p style={{ color: "#888", lineHeight: "1.6", fontSize: "14px" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 40px", background: "rgba(0,245,255,0.02)" }}>
        <h2 style={{ ...styles.orbitron, textAlign: "center", fontSize: "32px", ...styles.neon, marginBottom: "50px" }}>WHAT PLAYERS SAY</h2>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ ...styles.glass, padding: "32px", maxWidth: "340px" }}>
              <div style={{ color: "#ffd700", fontSize: "18px", marginBottom: "16px" }}>{"★".repeat(t.stars)}</div>
              <p style={{ color: "#ccc", lineHeight: "1.7", fontSize: "14px", fontStyle: "italic", marginBottom: "20px" }}>"{t.text}"</p>
              <div style={{ color: "#00f5ff", fontWeight: "600" }}>{t.name}</div>
              <div style={{ color: "#666", fontSize: "12px" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px", borderTop: "1px solid rgba(0,245,255,0.1)", textAlign: "center" }}>
        <div style={{ ...styles.orbitron, ...styles.neon, fontSize: "20px", marginBottom: "12px" }}>🎸 GUITARPRO</div>
        <p style={{ color: "#444", fontSize: "13px" }}>© 2025 GuitarPro. Built with ❤️ for guitarists everywhere.</p>
      </footer>
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function AuthPage({ mode, setPage, setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = () => {
    if (!form.email || !form.password) { setErr("Please fill all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      setUser({ name: form.name || form.email.split("@")[0], email: form.email });
      setPage("dashboard");
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "64px" }}>
      <div style={{ ...styles.glass, padding: "48px", width: "100%", maxWidth: "420px" }}>
        <h2 style={{ ...styles.orbitron, ...styles.neon, fontSize: "24px", textAlign: "center", marginBottom: "8px" }}>
          {mode === "login" ? "WELCOME BACK" : "JOIN GUITARPRO"}
        </h2>
        <p style={{ color: "#666", textAlign: "center", marginBottom: "32px", fontSize: "14px" }}>
          {mode === "login" ? "Continue your guitar journey" : "Start your guitar journey today"}
        </p>

        {mode === "signup" && (
          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#888", fontSize: "12px", letterSpacing: "1px" }}>FULL NAME</label>
            <input style={{ ...styles.input, marginTop: "6px" }} placeholder="Your name"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
        )}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ color: "#888", fontSize: "12px", letterSpacing: "1px" }}>EMAIL</label>
          <input style={{ ...styles.input, marginTop: "6px" }} placeholder="your@email.com" type="email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div style={{ marginBottom: "24px" }}>
          <label style={{ color: "#888", fontSize: "12px", letterSpacing: "1px" }}>PASSWORD</label>
          <input style={{ ...styles.input, marginTop: "6px" }} placeholder="••••••••" type="password"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>

        {err && <div style={{ color: "#ff4444", fontSize: "13px", marginBottom: "16px" }}>⚠ {err}</div>}

        <button onClick={handleSubmit} style={{ ...styles.neonBtnFull, width: "100%", marginBottom: "20px" }} disabled={loading}>
          {loading ? "⏳ Processing..." : mode === "login" ? "🔓 Login" : "🚀 Create Account"}
        </button>

        <p style={{ textAlign: "center", color: "#666", fontSize: "13px" }}>
          {mode === "login" ? "New here? " : "Already have an account? "}
          <span onClick={() => setPage(mode === "login" ? "signup" : "login")}
            style={{ color: "#00f5ff", cursor: "pointer", textDecoration: "underline" }}>
            {mode === "login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, setPage, setSelectedSong }) {
  const recommended = SONGS.filter(s => s.difficulty === "Beginner").slice(0, 4);
  const recent = SONGS.slice(5, 9);

  const progress = [
    { label: "Chords Learned", val: 12, max: 20, color: "#00f5ff" },
    { label: "Songs Completed", val: 7, max: 100, color: "#7c00ff" },
    { label: "Practice Hours", val: 23, max: 50, color: "#00ff64" },
  ];

  const plan = [
    { day: "Mon", task: "Basic Chords (G, C, D)", done: true },
    { day: "Tue", task: "Chord Transitions", done: true },
    { day: "Wed", task: "Wonderwall - Intro", done: false },
    { day: "Thu", task: "Strumming Patterns", done: false },
    { day: "Fri", task: "Barre Chord Intro", done: false },
  ];

  return (
    <div style={{ paddingTop: "88px", padding: "88px 40px 40px" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ ...styles.orbitron, fontSize: "32px", color: "#fff" }}>
          Welcome back, <span style={styles.neon}>{user?.name} 🎸</span>
        </h1>
        <p style={{ color: "#666", marginTop: "8px" }}>Ready to shred? Here's your personalized dashboard.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", maxWidth: "1200px" }}>
        <div>
          {/* Progress */}
          <div style={{ ...styles.glass, padding: "28px", marginBottom: "28px" }}>
            <h3 style={{ ...styles.orbitron, color: "#00f5ff", marginBottom: "20px" }}>YOUR PROGRESS</h3>
            {progress.map(p => (
              <div key={p.label} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#aaa" }}>{p.label}</span>
                  <span style={{ fontSize: "13px", color: p.color }}>{p.val}/{p.max}</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "100px", height: "6px" }}>
                  <div style={{
                    width: `${(p.val / p.max) * 100}%`, height: "100%", borderRadius: "100px",
                    background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
                    boxShadow: `0 0 8px ${p.color}`,
                    transition: "width 1s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* AI Recommended */}
          <div style={{ marginBottom: "28px" }}>
            <h3 style={{ ...styles.orbitron, color: "#00f5ff", marginBottom: "16px" }}>🤖 AI RECOMMENDED FOR YOU</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {recommended.map(song => (
                <SongCard key={song.id} song={song} setPage={setPage} setSelectedSong={setSelectedSong} compact />
              ))}
            </div>
          </div>

          {/* Recently Viewed */}
          <div>
            <h3 style={{ ...styles.orbitron, color: "#00f5ff", marginBottom: "16px" }}>🕐 RECENTLY VIEWED</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recent.map(song => (
                <div key={song.id} onClick={() => { setSelectedSong(song); setPage("tutorial"); }}
                  style={{ ...styles.glass, padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, styles.glassHover)}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, styles.glass)}>
                  <span style={{ fontSize: "24px" }}>{song.thumbnail}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600" }}>{song.title}</div>
                    <div style={{ color: "#666", fontSize: "12px" }}>{song.artist}</div>
                  </div>
                  <span style={styles.badge(diffColor(song.difficulty))}>{song.difficulty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Practice Plan */}
        <div>
          <div style={{ ...styles.glass, padding: "28px", marginBottom: "20px" }}>
            <h3 style={{ ...styles.orbitron, color: "#00f5ff", marginBottom: "20px", fontSize: "13px" }}>📅 THIS WEEK'S PLAN</h3>
            {plan.map(item => (
              <div key={item.day} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                  background: item.done ? "rgba(0,255,100,0.15)" : "rgba(255,255,255,0.05)",
                  border: item.done ? "1px solid #00ff64" : "1px solid #333",
                  fontSize: "11px", fontWeight: "700", color: item.done ? "#00ff64" : "#666",
                  ...styles.orbitron,
                }}>{item.day}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "12px", color: item.done ? "#aaa" : "#ddd", textDecoration: item.done ? "line-through" : "none" }}>{item.task}</div>
                </div>
                {item.done && <span style={{ color: "#00ff64" }}>✓</span>}
              </div>
            ))}
          </div>

          <div style={{ ...styles.glass, padding: "24px" }}>
            <h3 style={{ ...styles.orbitron, color: "#7c00ff", fontSize: "13px", marginBottom: "12px" }}>🎯 SKILL LEVEL</h3>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>🌱</div>
              <div style={{ ...styles.orbitron, color: "#00ff64", fontSize: "18px" }}>BEGINNER</div>
              <div style={{ color: "#666", fontSize: "12px", marginTop: "4px" }}>Keep practicing daily!</div>
              <button onClick={() => setPage("library")} style={{ ...styles.neonBtnFull, marginTop: "16px", padding: "10px 24px", fontSize: "12px" }}>
                Find Next Song
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SONG CARD ────────────────────────────────────────────────────────────────
function SongCard({ song, setPage, setSelectedSong, compact }) {
  return (
    <div onClick={() => { setSelectedSong(song); setPage("tutorial"); }}
      style={{ ...styles.glass, padding: compact ? "16px" : "20px", cursor: "pointer", transition: "all 0.2s" }}
      onMouseEnter={e => { Object.assign(e.currentTarget.style, styles.glassHover); e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { Object.assign(e.currentTarget.style, styles.glass); e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ fontSize: compact ? "28px" : "36px", marginBottom: "10px" }}>{song.thumbnail}</div>
      <div style={{ fontWeight: "600", fontSize: compact ? "13px" : "15px", marginBottom: "4px", lineHeight: "1.3" }}>{song.title}</div>
      <div style={{ color: "#666", fontSize: "12px", marginBottom: "10px" }}>{song.artist}</div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        <span style={styles.badge(diffColor(song.difficulty))}>{song.difficulty}</span>
        <span style={styles.badge(langColor(song.language))}>{song.language}</span>
        {!compact && <span style={styles.badge("default")}>{song.guitar}</span>}
      </div>
      {!compact && <div style={{ color: "#444", fontSize: "11px", marginTop: "8px" }}>{song.bpm} BPM</div>}
    </div>
  );
}

// ─── SONG LIBRARY ─────────────────────────────────────────────────────────────
function Library({ setPage, setSelectedSong, filterMode }) {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");
  const [guitarFilter, setGuitarFilter] = useState(filterMode || "All");

  const filtered = SONGS.filter(s =>
    (s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase())) &&
    (langFilter === "All" || s.language === langFilter) &&
    (diffFilter === "All" || s.difficulty === diffFilter) &&
    (guitarFilter === "All" || s.guitar === guitarFilter)
  );

  const FilterBtn = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{
      background: active ? "rgba(0,245,255,0.2)" : "transparent",
      border: active ? "1px solid #00f5ff" : "1px solid rgba(255,255,255,0.1)",
      color: active ? "#00f5ff" : "#666",
      padding: "6px 14px", borderRadius: "6px", cursor: "pointer",
      fontSize: "13px", transition: "all 0.2s",
    }}>{label}</button>
  );

  return (
    <div style={{ paddingTop: "88px", padding: "88px 40px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ ...styles.orbitron, ...styles.neon, fontSize: "28px", marginBottom: "8px" }}>
          {filterMode === "Acoustic" ? "🎸 ACOUSTIC GUITAR" : filterMode === "Electric" ? "⚡ ELECTRIC GUITAR" : "🎵 SONG LIBRARY"}
        </h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>{filtered.length} songs found</p>

        {/* Search + Filters */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
          <input style={{ ...styles.input, maxWidth: "300px" }} placeholder="🔍 Search songs or artists..."
            value={search} onChange={e => setSearch(e.target.value)} />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["All", "Hindi", "English"].map(l => <FilterBtn key={l} label={l} active={langFilter === l} onClick={() => setLangFilter(l)} />)}
            <div style={{ width: "1px", background: "#333" }} />
            {["All", "Beginner", "Intermediate", "Advanced"].map(d => <FilterBtn key={d} label={d} active={diffFilter === d} onClick={() => setDiffFilter(d)} />)}
            <div style={{ width: "1px", background: "#333" }} />
            {["All", "Acoustic", "Electric"].map(g => <FilterBtn key={g} label={g} active={guitarFilter === g} onClick={() => setGuitarFilter(g)} />)}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
          {filtered.map(song => (
            <SongCard key={song.id} song={song} setPage={setPage} setSelectedSong={setSelectedSong} />
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px", color: "#444" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎸</div>
              <div>No songs found. Try different filters.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TUTORIAL PAGE ────────────────────────────────────────────────────────────
function TutorialPage({ song, setPage }) {
  const [tab, setTab] = useState("tabs");
  const [playing, setPlaying] = useState(false);
  const [metronome, setMetronome] = useState(false);

  if (!song) return (
    <div style={{ paddingTop: "88px", textAlign: "center", padding: "120px 40px" }}>
      <div style={{ fontSize: "64px", marginBottom: "24px" }}>🎸</div>
      <h2 style={{ ...styles.orbitron, ...styles.neon }}>No song selected</h2>
      <button onClick={() => setPage("library")} style={{ ...styles.neonBtnFull, marginTop: "20px" }}>Browse Songs</button>
    </div>
  );

  const tabData = song.difficulty === "Advanced" ? TABS.advanced : TABS.default;

  const tabs_nav = [
    ["tabs", "🎸 Tabs"], ["chords", "🎵 Chords"], ["tips", "💡 Tips"], ["video", "🎬 Video"],
  ];

  return (
    <div style={{ paddingTop: "88px", padding: "88px 40px 40px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Back button */}
        <button onClick={() => setPage("library")} style={{ ...styles.neonBtn, padding: "8px 20px", fontSize: "12px", marginBottom: "24px" }}>
          ← Back to Library
        </button>

        {/* Song Header */}
        <div style={{ ...styles.glass, padding: "32px", marginBottom: "24px", display: "flex", gap: "24px", alignItems: "center" }}>
          <div style={{ fontSize: "64px" }}>{song.thumbnail}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ ...styles.orbitron, fontSize: "28px", color: "#fff", marginBottom: "8px" }}>{song.title}</h1>
            <p style={{ color: "#aaa", fontSize: "16px", marginBottom: "16px" }}>{song.artist}</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <span style={styles.badge(diffColor(song.difficulty))}>{song.difficulty}</span>
              <span style={styles.badge(langColor(song.language))}>{song.language}</span>
              <span style={styles.badge("default")}>{song.guitar}</span>
              <span style={styles.badge("blue")}>🎵 {song.bpm} BPM</span>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => setPlaying(!playing)}
              style={{ ...styles.neonBtnFull, padding: "14px 28px", fontSize: "18px", marginBottom: "10px", display: "block" }}>
              {playing ? "⏸ Pause" : "▶ Play"}
            </button>
            <button onClick={() => setMetronome(!metronome)}
              style={{ ...styles.neonBtn, padding: "8px 16px", fontSize: "11px", background: metronome ? "rgba(255,165,0,0.2)" : undefined, borderColor: metronome ? "#ffa500" : undefined, color: metronome ? "#ffa500" : undefined }}>
              {metronome ? "🔔 Metronome ON" : "🔕 Metronome"}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {tabs_nav.map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              ...styles.neonBtn,
              padding: "10px 20px", fontSize: "13px",
              background: tab === key ? "rgba(0,245,255,0.2)" : "rgba(0,245,255,0.05)",
              borderColor: tab === key ? "#00f5ff" : "rgba(0,245,255,0.2)",
              color: tab === key ? "#00f5ff" : "#666",
            }}>{label}</button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ ...styles.glass, padding: "32px" }}>
          {tab === "tabs" && (
            <div>
              <h3 style={{ ...styles.orbitron, color: "#00f5ff", marginBottom: "20px" }}>GUITAR TABS</h3>
              <div style={{
                background: "rgba(0,0,0,0.5)", borderRadius: "8px", padding: "24px",
                fontFamily: "monospace", fontSize: "15px", lineHeight: "2",
                color: "#00f5ff", border: "1px solid rgba(0,245,255,0.15)",
                whiteSpace: "pre", overflowX: "auto",
              }}>
                {tabData}
              </div>
              <div style={{ marginTop: "24px" }}>
                <div style={{ color: "#888", fontSize: "13px", marginBottom: "8px" }}>📝 STRING GUIDE</div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {["e (1st)", "B (2nd)", "G (3rd)", "D (4th)", "A (5th)", "E (6th)"].map((s, i) => (
                    <span key={s} style={{ ...styles.badge("default"), fontSize: "12px" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
                <button style={{ ...styles.neonBtn, padding: "10px 20px", fontSize: "12px" }}>📄 Download PDF</button>
                <button style={{ ...styles.neonBtn, padding: "10px 20px", fontSize: "12px" }}>🔗 Share</button>
              </div>
            </div>
          )}

          {tab === "chords" && (
            <div>
              <h3 style={{ ...styles.orbitron, color: "#00f5ff", marginBottom: "20px" }}>CHORDS USED</h3>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
                {song.chords.map(chord => (
                  <div key={chord} style={{ ...styles.glass, padding: "24px 28px", textAlign: "center", minWidth: "80px" }}>
                    <div style={{ ...styles.orbitron, fontSize: "22px", color: "#00f5ff", marginBottom: "4px" }}>{chord}</div>
                    <div style={{ fontSize: "11px", color: "#666" }}>chord</div>
                  </div>
                ))}
              </div>
              <div style={{ ...styles.glass, padding: "20px" }}>
                <div style={{ color: "#aaa", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>🥁 Strumming Pattern</div>
                <div style={{ fontFamily: "monospace", fontSize: "20px", color: "#ffd700", letterSpacing: "4px" }}>
                  {STRUM_PATTERNS[song.difficulty]}
                </div>
              </div>
            </div>
          )}

          {tab === "tips" && (
            <div>
              <h3 style={{ ...styles.orbitron, color: "#00f5ff", marginBottom: "20px" }}>PRACTICE TIPS</h3>
              {[
                { icon: "🐢", title: "Start Slow", tip: "Practice at 50% tempo first. Speed comes naturally after mastering the shapes." },
                { icon: "🔄", title: "Chord Transitions", tip: `Focus on smooth transitions between: ${song.chords.join(" → ")}` },
                { icon: "🤚", title: "Finger Placement", tip: "Press firmly just behind the fret. Avoid touching adjacent strings." },
                { icon: "⏱️", title: "Use a Metronome", tip: `Set metronome to ${Math.floor(song.bpm * 0.6)} BPM and gradually increase to ${song.bpm} BPM.` },
                { icon: "📅", title: "Daily Practice", tip: "Even 15 minutes daily is more effective than 2 hours once a week." },
              ].map(t => (
                <div key={t.title} style={{ ...styles.glass, padding: "16px 20px", marginBottom: "12px", display: "flex", gap: "16px" }}>
                  <span style={{ fontSize: "24px" }}>{t.icon}</span>
                  <div>
                    <div style={{ fontWeight: "600", marginBottom: "4px", color: "#ddd" }}>{t.title}</div>
                    <div style={{ color: "#888", fontSize: "13px", lineHeight: "1.5" }}>{t.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "video" && (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ ...styles.orbitron, color: "#00f5ff", marginBottom: "20px" }}>VIDEO TUTORIAL</h3>
              <div style={{
                background: "rgba(0,0,0,0.6)", borderRadius: "12px",
                aspectRatio: "16/9", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                border: "2px solid rgba(0,245,255,0.2)",
              }}>
                <div style={{ fontSize: "80px", marginBottom: "20px" }}>🎬</div>
                <div style={{ ...styles.orbitron, color: "#00f5ff", fontSize: "18px", marginBottom: "8px" }}>AI TUTORIAL VIDEO</div>
                <div style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>
                  AI-generated tutorial for {song.title}
                </div>
                <button style={{ ...styles.neonBtnFull, padding: "12px 32px" }}>🤖 Generate AI Tutorial</button>
              </div>
              <p style={{ color: "#444", fontSize: "12px", marginTop: "16px" }}>
                Videos are generated using Python FastAPI + gTTS + FFmpeg on the ML backend.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel() {
  const [activeTab, setActiveTab] = useState("songs");
  const [newSong, setNewSong] = useState({ title: "", artist: "", language: "Hindi", difficulty: "Beginner", guitar: "Acoustic", bpm: 80 });
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div style={{ paddingTop: "88px", padding: "88px 40px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ ...styles.orbitron, ...styles.neon, fontSize: "28px", marginBottom: "8px" }}>⚙️ ADMIN PANEL</h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>Manage your guitar learning platform</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[["100", "Total Songs", "🎵"], ["50K", "Students", "👥"], ["1.2M", "Lessons Played", "▶"], ["4.9", "Avg Rating", "⭐"]].map(([v, l, ic]) => (
            <div key={l} style={{ ...styles.glass, padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{ic}</div>
              <div style={{ ...styles.orbitron, ...styles.neon, fontSize: "22px" }}>{v}</div>
              <div style={{ color: "#666", fontSize: "12px" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["songs", "add", "analytics"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              ...styles.neonBtn, padding: "8px 20px", fontSize: "12px",
              background: activeTab === t ? "rgba(0,245,255,0.2)" : undefined,
              color: activeTab === t ? "#00f5ff" : "#666",
            }}>{t === "songs" ? "📋 Songs" : t === "add" ? "➕ Add Song" : "📊 Analytics"}</button>
          ))}
        </div>

        {activeTab === "songs" && (
          <div style={{ ...styles.glass, padding: "24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,245,255,0.2)" }}>
                  {["#", "Title", "Artist", "Lang", "Difficulty", "Guitar", "BPM", "Actions"].map(h => (
                    <th key={h} style={{ ...styles.orbitron, color: "#00f5ff", padding: "12px 8px", textAlign: "left", fontSize: "11px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SONGS.slice(0, 20).map(s => (
                  <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(0,245,255,0.03)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "10px 8px", color: "#444" }}>{s.id}</td>
                    <td style={{ padding: "10px 8px", color: "#ddd", fontWeight: "500" }}>{s.title}</td>
                    <td style={{ padding: "10px 8px", color: "#888" }}>{s.artist}</td>
                    <td style={{ padding: "10px 8px" }}><span style={styles.badge(langColor(s.language))}>{s.language}</span></td>
                    <td style={{ padding: "10px 8px" }}><span style={styles.badge(diffColor(s.difficulty))}>{s.difficulty}</span></td>
                    <td style={{ padding: "10px 8px", color: "#888" }}>{s.guitar}</td>
                    <td style={{ padding: "10px 8px", color: "#666" }}>{s.bpm}</td>
                    <td style={{ padding: "10px 8px" }}>
                      <button onClick={() => showToast("✏️ Edit mode for: " + s.title)} style={{ background: "none", border: "1px solid #333", color: "#888", padding: "3px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "11px", marginRight: "6px" }}>Edit</button>
                      <button onClick={() => showToast("🗑️ Deleted: " + s.title)} style={{ background: "none", border: "1px solid #ff444444", color: "#ff4444", padding: "3px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}>Del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ color: "#444", fontSize: "12px", marginTop: "16px" }}>Showing first 20 of {SONGS.length} songs</p>
          </div>
        )}

        {activeTab === "add" && (
          <div style={{ ...styles.glass, padding: "32px", maxWidth: "560px" }}>
            <h3 style={{ ...styles.orbitron, color: "#00f5ff", marginBottom: "24px" }}>ADD NEW SONG</h3>
            {[["title", "Song Title", "text"], ["artist", "Artist Name", "text"], ["bpm", "BPM", "number"]].map(([key, label, type]) => (
              <div key={key} style={{ marginBottom: "16px" }}>
                <label style={{ color: "#888", fontSize: "12px", letterSpacing: "1px" }}>{label.toUpperCase()}</label>
                <input type={type} style={{ ...styles.input, marginTop: "6px" }} placeholder={label}
                  value={newSong[key]} onChange={e => setNewSong({ ...newSong, [key]: e.target.value })} />
              </div>
            ))}
            {[["language", ["Hindi", "English"]], ["difficulty", ["Beginner", "Intermediate", "Advanced"]], ["guitar", ["Acoustic", "Electric"]]].map(([key, opts]) => (
              <div key={key} style={{ marginBottom: "16px" }}>
                <label style={{ color: "#888", fontSize: "12px", letterSpacing: "1px" }}>{key.toUpperCase()}</label>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  {opts.map(o => (
                    <button key={o} onClick={() => setNewSong({ ...newSong, [key]: o })} style={{
                      ...styles.neonBtn, padding: "6px 14px", fontSize: "12px",
                      background: newSong[key] === o ? "rgba(0,245,255,0.2)" : undefined,
                      color: newSong[key] === o ? "#00f5ff" : "#666",
                    }}>{o}</button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => showToast("✅ Song '" + newSong.title + "' added successfully!")} style={{ ...styles.neonBtnFull, width: "100%", marginTop: "8px" }}>
              ➕ Add Song to Library
            </button>
          </div>
        )}

        {activeTab === "analytics" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {[["Hindi vs English", [["Hindi", 50, "#a855f7"], ["English", 50, "#00f5ff"]]], ["By Difficulty", [["Beginner", 42, "#00ff64"], ["Intermediate", 36, "#ffa500"], ["Advanced", 22, "#ff4444"]]]].map(([title, data]) => (
              <div key={title} style={{ ...styles.glass, padding: "24px" }}>
                <h4 style={{ ...styles.orbitron, color: "#00f5ff", fontSize: "13px", marginBottom: "20px" }}>{title.toUpperCase()}</h4>
                {data.map(([label, val, color]) => (
                  <div key={label} style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", color: "#aaa" }}>{label}</span>
                      <span style={{ fontSize: "13px", color }}>{val}%</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "4px", height: "8px" }}>
                      <div style={{ width: val + "%", height: "100%", borderRadius: "4px", background: color, boxShadow: `0 0 8px ${color}` }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {toast && (
          <div style={{
            position: "fixed", bottom: "32px", right: "32px",
            ...styles.glass, padding: "14px 24px", color: "#00f5ff",
            boxShadow: "0 0 20px rgba(0,245,255,0.3)", fontSize: "14px",
            animation: "fadeIn 0.3s ease",
          }}>{toast}</div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  // Redirect if not logged in
  const goToPage = (p) => {
    if (["dashboard", "admin"].includes(p) && !user) { setPage("login"); return; }
    setPage(p);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #00f5ff44; border-radius: 3px; }
        @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 10px #00f5ff44} 50%{box-shadow:0 0 30px #00f5ff88} }
      `}</style>

      <div style={styles.root}>
        <Particles />

        {/* Ambient glow orbs */}
        <div style={{ position: "fixed", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)", top: "-200px", right: "-200px", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "fixed", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,0,255,0.05) 0%, transparent 70%)", bottom: "-100px", left: "-100px", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar page={page} setPage={goToPage} user={user} setUser={setUser} />

          {page === "landing" && <LandingPage setPage={goToPage} />}
          {page === "login" && <AuthPage mode="login" setPage={setPage} setUser={setUser} />}
          {page === "signup" && <AuthPage mode="signup" setPage={setPage} setUser={setUser} />}
          {page === "dashboard" && user && <Dashboard user={user} setPage={goToPage} setSelectedSong={setSelectedSong} />}
          {page === "library" && <Library setPage={goToPage} setSelectedSong={setSelectedSong} />}
          {page === "acoustic" && <Library setPage={goToPage} setSelectedSong={setSelectedSong} filterMode="Acoustic" />}
          {page === "electric" && <Library setPage={goToPage} setSelectedSong={setSelectedSong} filterMode="Electric" />}
          {page === "tutorial" && <TutorialPage song={selectedSong} setPage={setPage} />}
          {page === "admin" && user && <AdminPanel />}
        </div>
      </div>
    </>
  );
}
