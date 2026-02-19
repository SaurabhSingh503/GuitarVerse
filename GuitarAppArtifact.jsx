
import { useState, useEffect } from "react";
const SONGS=[{id:1,title:"Tum Hi Ho",artist:"Arijit Singh",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:72,chords:["Am","F","C","G"],thumbnail:"🎵"},{id:2,title:"Kal Ho Na Ho",artist:"Sonu Nigam",language:"Hindi",difficulty:"Intermediate",guitar:"Acoustic",bpm:80,chords:["G","Em","C","D"],thumbnail:"🎸"},{id:3,title:"Ae Dil Hai Mushkil",artist:"Arijit Singh",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:68,chords:["Dm","Am","F","C"],thumbnail:"🎵"},{id:4,title:"Channa Mereya",artist:"Arijit Singh",language:"Hindi",difficulty:"Intermediate",guitar:"Acoustic",bpm:76,chords:["Em","C","G","D"],thumbnail:"🎸"},{id:5,title:"Raabta",artist:"Arijit Singh",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:64,chords:["C","G","Am","F"],thumbnail:"🎵"},{id:6,title:"Phir Le Aya Dil",artist:"Arijit Singh",language:"Hindi",difficulty:"Advanced",guitar:"Acoustic",bpm:85,chords:["Bm","G","D","A"],thumbnail:"🎸"},{id:7,title:"Kabira",artist:"Rekha Bhardwaj",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:78,chords:["G","D","Em","C"],thumbnail:"🎵"},{id:8,title:"Sooraj Dooba Hain",artist:"Arijit Singh",language:"Hindi",difficulty:"Intermediate",guitar:"Electric",bpm:88,chords:["Am","F","C","E"],thumbnail:"⚡"},{id:9,title:"Gerua",artist:"Arijit Singh",language:"Hindi",difficulty:"Advanced",guitar:"Acoustic",bpm:92,chords:["Cmaj7","Am7","Fmaj7","G"],thumbnail:"🎸"},{id:10,title:"Tere Sang Yaara",artist:"Atif Aslam",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:70,chords:["D","A","Bm","G"],thumbnail:"🎵"},{id:11,title:"Mann Bharrya",artist:"B Praak",language:"Hindi",difficulty:"Intermediate",guitar:"Acoustic",bpm:75,chords:["Em","G","C","D"],thumbnail:"🎸"},{id:12,title:"Kesariya",artist:"Arijit Singh",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:84,chords:["C","Am","F","G"],thumbnail:"🎵"},{id:13,title:"Bekhayali",artist:"Sachet Tandon",language:"Hindi",difficulty:"Advanced",guitar:"Electric",bpm:96,chords:["Em","C","G","D"],thumbnail:"⚡"},{id:14,title:"Iktara",artist:"Amitabh Bhattacharya",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:66,chords:["Am","F","C","E7"],thumbnail:"🎵"},{id:15,title:"Hawayein",artist:"Arijit Singh",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:76,chords:["C","G","Am","Em"],thumbnail:"🎸"},{id:16,title:"Kalank",artist:"Arijit Singh",language:"Hindi",difficulty:"Advanced",guitar:"Acoustic",bpm:88,chords:["Dm","Gm","Bb","F"],thumbnail:"🎵"},{id:17,title:"Khairiyat",artist:"Arijit Singh",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:72,chords:["Am","F","C","G"],thumbnail:"🎸"},{id:18,title:"Pachtaoge",artist:"Arijit Singh",language:"Hindi",difficulty:"Intermediate",guitar:"Acoustic",bpm:82,chords:["Dm","Am","F","C"],thumbnail:"🎵"},{id:19,title:"Galliyan",artist:"Ankit Tiwari",language:"Hindi",difficulty:"Intermediate",guitar:"Acoustic",bpm:80,chords:["Am","G","F","Em"],thumbnail:"🎸"},{id:20,title:"Baarish",artist:"Atif Aslam",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:76,chords:["G","D","Em","C"],thumbnail:"🎵"},{id:21,title:"Janam Janam",artist:"Arijit Singh",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:74,chords:["G","Em","C","D"],thumbnail:"🎸"},{id:22,title:"Lut Gaye",artist:"Jubin Nautiyal",language:"Hindi",difficulty:"Intermediate",guitar:"Acoustic",bpm:80,chords:["C","G","Am","F"],thumbnail:"🎵"},{id:23,title:"Hasi",artist:"Ami Mishra",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:70,chords:["G","C","D","Em"],thumbnail:"🎸"},{id:24,title:"Agar Tum Saath Ho",artist:"Arijit Singh",language:"Hindi",difficulty:"Beginner",guitar:"Acoustic",bpm:66,chords:["Dm","Gm","C","F"],thumbnail:"🎵"},{id:25,title:"Bulleya",artist:"Amit Mishra",language:"Hindi",difficulty:"Advanced",guitar:"Electric",bpm:94,chords:["Dm","Am","Bb","C"],thumbnail:"⚡"},{id:51,title:"Hotel California",artist:"Eagles",language:"English",difficulty:"Advanced",guitar:"Electric",bpm:75,chords:["Am","E7","G","D","F","C","Dm"],thumbnail:"⚡"},{id:52,title:"Wonderwall",artist:"Oasis",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:87,chords:["Em7","G","Dsus4","A7sus4"],thumbnail:"🎸"},{id:53,title:"Knocking on Heaven's Door",artist:"Bob Dylan",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:72,chords:["G","D","Am","C"],thumbnail:"🎵"},{id:54,title:"Nothing Else Matters",artist:"Metallica",language:"English",difficulty:"Advanced",guitar:"Electric",bpm:68,chords:["Em","D","C","Am","G"],thumbnail:"⚡"},{id:55,title:"Let Her Go",artist:"Passenger",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:96,chords:["G","D","Em","C"],thumbnail:"🎸"},{id:56,title:"Wish You Were Here",artist:"Pink Floyd",language:"English",difficulty:"Intermediate",guitar:"Acoustic",bpm:66,chords:["C","D","Am","G"],thumbnail:"🎵"},{id:57,title:"Sweet Home Alabama",artist:"Lynyrd Skynyrd",language:"English",difficulty:"Intermediate",guitar:"Electric",bpm:97,chords:["D","C","G"],thumbnail:"⚡"},{id:58,title:"Stairway to Heaven",artist:"Led Zeppelin",language:"English",difficulty:"Advanced",guitar:"Acoustic",bpm:82,chords:["Am","G","F","C","Em","D"],thumbnail:"🎸"},{id:59,title:"Shape of You",artist:"Ed Sheeran",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:96,chords:["C#m","F#m","A","B"],thumbnail:"🎵"},{id:60,title:"Smoke on the Water",artist:"Deep Purple",language:"English",difficulty:"Beginner",guitar:"Electric",bpm:112,chords:["Gm","F","Eb","D"],thumbnail:"⚡"},{id:61,title:"Tears in Heaven",artist:"Eric Clapton",language:"English",difficulty:"Intermediate",guitar:"Acoustic",bpm:80,chords:["A","E","F#m","D"],thumbnail:"🎸"},{id:62,title:"More Than Words",artist:"Extreme",language:"English",difficulty:"Intermediate",guitar:"Acoustic",bpm:72,chords:["G","Gsus4","Cadd9","Am7"],thumbnail:"🎵"},{id:63,title:"Zombie",artist:"The Cranberries",language:"English",difficulty:"Beginner",guitar:"Electric",bpm:85,chords:["Em","C","G","D"],thumbnail:"⚡"},{id:64,title:"Fast Car",artist:"Tracy Chapman",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:100,chords:["C","G","Am","F"],thumbnail:"🎸"},{id:65,title:"Free Fallin",artist:"Tom Petty",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:86,chords:["F","Bb","C"],thumbnail:"🎵"},{id:66,title:"Come As You Are",artist:"Nirvana",language:"English",difficulty:"Intermediate",guitar:"Electric",bpm:120,chords:["Em","Am","C","D"],thumbnail:"⚡"},{id:67,title:"Here Comes the Sun",artist:"The Beatles",language:"English",difficulty:"Intermediate",guitar:"Acoustic",bpm:130,chords:["A","G","D","E7"],thumbnail:"🎸"},{id:68,title:"Blackbird",artist:"The Beatles",language:"English",difficulty:"Advanced",guitar:"Acoustic",bpm:96,chords:["G","Am","C","D","Em"],thumbnail:"🎵"},{id:69,title:"Creep",artist:"Radiohead",language:"English",difficulty:"Beginner",guitar:"Electric",bpm:92,chords:["G","B","C","Cm"],thumbnail:"⚡"},{id:70,title:"Country Roads",artist:"John Denver",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:80,chords:["G","Em","D","C"],thumbnail:"🎸"},{id:71,title:"Hallelujah",artist:"Leonard Cohen",language:"English",difficulty:"Intermediate",guitar:"Acoustic",bpm:58,chords:["C","Am","F","G","E7"],thumbnail:"🎵"},{id:72,title:"Hey There Delilah",artist:"Plain White Ts",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:90,chords:["D","F#m","Bm","G","A"],thumbnail:"🎸"},{id:73,title:"Fix You",artist:"Coldplay",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:70,chords:["C","Em","Am","F","G"],thumbnail:"🎵"},{id:74,title:"The Scientist",artist:"Coldplay",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:75,chords:["Dm","Bb","F","C"],thumbnail:"🎸"},{id:75,title:"Yellow",artist:"Coldplay",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:88,chords:["B","Badd11","Emaj7","A"],thumbnail:"🎵"},{id:76,title:"Under the Bridge",artist:"RHCP",language:"English",difficulty:"Intermediate",guitar:"Electric",bpm:72,chords:["D","F#","E","A","G","Bm"],thumbnail:"⚡"},{id:77,title:"Californication",artist:"RHCP",language:"English",difficulty:"Intermediate",guitar:"Electric",bpm:96,chords:["Am","F","C","G","Dm"],thumbnail:"⚡"},{id:78,title:"Hurt",artist:"Johnny Cash",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:44,chords:["Am","C","D","G","F"],thumbnail:"🎸"},{id:79,title:"Perfect",artist:"Ed Sheeran",language:"English",difficulty:"Beginner",guitar:"Acoustic",bpm:95,chords:["G","Em","C","D"],thumbnail:"🎵"},{id:80,title:"Shallow",artist:"Lady Gaga",language:"English",difficulty:"Intermediate",guitar:"Acoustic",bpm:96,chords:["Em","D","G","A","Am","C"],thumbnail:"🎸"}];

const s={
  root:{fontFamily:"'Poppins',sans-serif",background:"linear-gradient(135deg,#000 0%,#0a0010 40%,#0d001f 70%,#000510 100%)",minHeight:"100vh",color:"#e0e0e0"},
  orbitron:{fontFamily:"'Orbitron',monospace"},
  neon:{color:"#00f5ff",textShadow:"0 0 10px #00f5ff,0 0 20px #00f5ff55"},
  glass:{background:"rgba(255,255,255,0.04)",backdropFilter:"blur(12px)",border:"1px solid rgba(0,245,255,0.15)",borderRadius:"16px"},
  glowBtn:{background:"linear-gradient(135deg,#00f5ff22,#7c00ff22)",border:"1px solid #00f5ff",color:"#00f5ff",padding:"10px 24px",borderRadius:"8px",fontFamily:"'Orbitron',monospace",fontSize:"12px",letterSpacing:"2px",cursor:"pointer",boxShadow:"0 0 15px #00f5ff44",transition:"all 0.25s",textTransform:"uppercase"},
  solidBtn:{background:"linear-gradient(135deg,#00f5ff,#7c00ff)",border:"none",color:"#000",padding:"12px 32px",borderRadius:"8px",fontFamily:"'Orbitron',monospace",fontSize:"12px",letterSpacing:"2px",cursor:"pointer",boxShadow:"0 0 25px #00f5ff66",fontWeight:"bold",textTransform:"uppercase"},
  inp:{background:"rgba(0,245,255,0.05)",border:"1px solid rgba(0,245,255,0.3)",borderRadius:"8px",padding:"10px 14px",color:"#e0e0e0",outline:"none",width:"100%",fontFamily:"'Poppins',sans-serif",fontSize:"14px"},
};

const badge=(c,t)=>{
  const m={blue:{bg:"rgba(0,245,255,0.12)",color:"#00f5ff",bdr:"#00f5ff33"},green:{bg:"rgba(0,255,100,0.12)",color:"#00ff64",bdr:"#00ff6433"},orange:{bg:"rgba(255,165,0,0.12)",color:"#ffa500",bdr:"#ffa50033"},red:{bg:"rgba(255,60,60,0.12)",color:"#ff4444",bdr:"#ff444433"},purple:{bg:"rgba(168,85,247,0.12)",color:"#a855f7",bdr:"#a855f733"}};
  const x=m[c]||{bg:"rgba(255,255,255,0.08)",color:"#aaa",bdr:"#fff2"};
  return <span style={{padding:"2px 9px",borderRadius:"20px",fontSize:"10px",fontWeight:700,background:x.bg,color:x.color,border:`1px solid ${x.bdr}`,letterSpacing:"0.5px"}}>{t}</span>;
};
const dc=(d)=>d==="Beginner"?"green":d==="Intermediate"?"orange":"red";

function Navbar({page,setPage,user,setUser}){
  const nav=user?[["Dashboard","dash"],["Songs","lib"],["Acoustic","lib"],["Electric","lib"],["Admin","admin"]]:[["Home","land"],["Songs","lib"]];
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:999,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,245,255,0.18)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",height:"58px"}}>
      <div onClick={()=>setPage("land")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"}}>
        <span style={{fontSize:"22px"}}>🎸</span>
        <span style={{...s.orbitron,...s.neon,fontSize:"15px",fontWeight:900}}>GUITARPRO</span>
      </div>
      <div style={{display:"flex",gap:"4px"}}>
        {nav.map(([l,p])=><button key={l} onClick={()=>setPage(p)} style={{background:page===p?"rgba(0,245,255,0.12)":"transparent",border:page===p?"1px solid rgba(0,245,255,0.4)":"1px solid transparent",color:page===p?"#00f5ff":"#666",padding:"5px 13px",borderRadius:"6px",cursor:"pointer",fontSize:"12px",transition:"all 0.2s"}}>{l}</button>)}
      </div>
      <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
        {user?<>
          <span style={{color:"#00f5ff",fontSize:"13px"}}>👤 {user.name}</span>
          <button onClick={()=>{setUser(null);setPage("land");}} style={{...s.glowBtn,padding:"5px 14px",fontSize:"11px"}}>Logout</button>
        </>:<>
          <button onClick={()=>setPage("login")} style={{...s.glowBtn,padding:"5px 14px",fontSize:"11px"}}>Login</button>
          <button onClick={()=>setPage("signup")} style={{...s.solidBtn,padding:"5px 14px",fontSize:"11px"}}>Sign Up</button>
        </>}
      </div>
    </div>
  );
}

function Landing({setPage}){
  const feats=[
    {ic:"🤖",t:"AI Recommendations",d:"ML engine learns your style and suggests the perfect next song."},
    {ic:"📊",t:"100+ Songs",d:"50 Hindi classics + 50 English anthems with full tabs and chords."},
    {ic:"🎬",t:"Video Tutorials",d:"AI-generated lessons with voice guidance and animated tabs."},
    {ic:"📅",t:"Practice Plans",d:"Personalized 7-day plans from beginner to advanced."},
    {ic:"📱",t:"Fully Responsive",d:"Practice anywhere — works flawlessly on mobile and desktop."},
    {ic:"🏆",t:"Progress Tracking",d:"Visual milestones, stats, and achievement system."},
  ];
  return(
    <div style={{paddingTop:"58px"}}>
      <section style={{minHeight:"95vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"60px 24px",position:"relative"}}>
        {/* Background strings */}
        {[...Array(5)].map((_,i)=><div key={i} style={{position:"absolute",left:0,right:0,height:"1px",top:`${20+i*15}%`,background:`linear-gradient(90deg,transparent,rgba(0,245,255,${0.04+i*0.015}),transparent)`,pointerEvents:"none"}}/>)}
        
        <div style={{display:"inline-block",...badge("blue","🎸 THE FUTURE OF GUITAR LEARNING"),marginBottom:"22px"}}></div>
        
        <h1 style={{...s.orbitron,fontSize:"clamp(36px,7vw,76px)",fontWeight:900,lineHeight:1.05,marginBottom:"20px",background:"linear-gradient(135deg,#fff 0%,#00f5ff 50%,#7c00ff 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          MASTER GUITAR<br/>LIKE A PRO
        </h1>
        <p style={{fontSize:"16px",color:"#888",maxWidth:"500px",lineHeight:1.7,marginBottom:"36px"}}>
          AI-powered tutorials, 100+ songs with full tabs, and personalized practice plans. From first chord to first solo.
        </p>
        <div style={{display:"flex",gap:"14px",flexWrap:"wrap",justifyContent:"center"}}>
          <button onClick={()=>setPage("signup")} style={{...s.solidBtn,padding:"14px 40px",fontSize:"13px"}}>🚀 Start Free</button>
          <button onClick={()=>setPage("lib")} style={{...s.glowBtn,padding:"14px 40px",fontSize:"13px"}}>🎵 Explore Songs</button>
        </div>
        <div style={{display:"flex",gap:"36px",marginTop:"52px",flexWrap:"wrap",justifyContent:"center"}}>
          {[["100+","Songs"],["50K+","Students"],["4.9★","Rating"],["Free","Forever"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{...s.orbitron,...s.neon,fontSize:"24px",fontWeight:900}}>{v}</div>
              <div style={{color:"#555",fontSize:"11px",letterSpacing:"2px"}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"80px 24px"}}>
        <h2 style={{...s.orbitron,...s.neon,textAlign:"center",fontSize:"28px",marginBottom:"48px"}}>WHY GUITARPRO?</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"20px",maxWidth:"1000px",margin:"0 auto"}}>
          {feats.map(f=>(
            <div key={f.t} style={{...s.glass,padding:"26px",transition:"all 0.25s",cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,245,255,0.07)";e.currentTarget.style.borderColor="rgba(0,245,255,0.35)";e.currentTarget.style.transform="translateY(-3px)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(0,245,255,0.15)";e.currentTarget.style.transform="translateY(0)"}}>
              <div style={{fontSize:"30px",marginBottom:"12px"}}>{f.ic}</div>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"8px"}}>{f.t}</div>
              <div style={{color:"#777",fontSize:"13px",lineHeight:1.6}}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"60px 24px",borderTop:"1px solid rgba(0,245,255,0.08)"}}>
        <div style={{display:"flex",gap:"20px",justifyContent:"center",flexWrap:"wrap"}}>
          {[{n:"Arjun M.",r:"Hobbyist",t:"Learned 20 songs in 2 months. The AI suggestions are spot-on!"},
            {n:"Sarah W.",r:"Music Student",t:"Cleanest tab viewer I've seen. Looks incredible and works great."},
            {n:"Priya S.",r:"Beginner",t:"Started with zero knowledge. Now playing Tum Hi Ho for my family!"}].map(x=>(
            <div key={x.n} style={{...s.glass,padding:"24px",maxWidth:"300px"}}>
              <div style={{color:"#ffd700",fontSize:"14px",marginBottom:"12px"}}>★★★★★</div>
              <p style={{color:"#bbb",lineHeight:1.65,fontSize:"13px",fontStyle:"italic",marginBottom:"16px"}}>"{x.t}"</p>
              <div style={{color:"#00f5ff",fontWeight:600,fontSize:"14px"}}>{x.n}</div>
              <div style={{color:"#555",fontSize:"11px"}}>{x.r}</div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{padding:"32px",textAlign:"center",borderTop:"1px solid rgba(0,245,255,0.08)"}}>
        <div style={{...s.orbitron,...s.neon,fontSize:"16px",marginBottom:"8px"}}>🎸 GUITARPRO</div>
        <div style={{color:"#333",fontSize:"12px"}}>© 2025 GuitarPro. Built with ❤️ for guitarists everywhere.</div>
      </footer>
    </div>
  );
}

function Auth({mode,setPage,setUser}){
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [loading,setLoading]=useState(false);
  const go=()=>{
    if(!form.email)return;
    setLoading(true);
    setTimeout(()=>{setUser({name:form.name||form.email.split("@")[0],email:form.email});setPage("dash");setLoading(false);},1000);
  };
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"58px"}}>
      <div style={{...s.glass,padding:"44px",width:"100%",maxWidth:"400px"}}>
        <h2 style={{...s.orbitron,...s.neon,fontSize:"20px",textAlign:"center",marginBottom:"6px"}}>
          {mode==="login"?"WELCOME BACK":"JOIN GUITARPRO"}
        </h2>
        <p style={{color:"#555",textAlign:"center",marginBottom:"28px",fontSize:"13px"}}>
          {mode==="login"?"Continue your guitar journey":"Start learning guitar today"}
        </p>
        {mode==="signup"&&<div style={{marginBottom:"14px"}}>
          <div style={{color:"#666",fontSize:"11px",letterSpacing:"1px",marginBottom:"5px"}}>FULL NAME</div>
          <input style={s.inp} placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        </div>}
        <div style={{marginBottom:"14px"}}>
          <div style={{color:"#666",fontSize:"11px",letterSpacing:"1px",marginBottom:"5px"}}>EMAIL</div>
          <input style={s.inp} placeholder="your@email.com" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        </div>
        <div style={{marginBottom:"22px"}}>
          <div style={{color:"#666",fontSize:"11px",letterSpacing:"1px",marginBottom:"5px"}}>PASSWORD</div>
          <input style={s.inp} placeholder="••••••••" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        </div>
        <button onClick={go} style={{...s.solidBtn,width:"100%",marginBottom:"18px"}}>
          {loading?"⏳ Loading...":(mode==="login"?"🔓 Login":"🚀 Create Account")}
        </button>
        <p style={{textAlign:"center",color:"#555",fontSize:"13px"}}>
          {mode==="login"?"New here? ":"Already a member? "}
          <span onClick={()=>setPage(mode==="login"?"signup":"login")} style={{color:"#00f5ff",cursor:"pointer"}}>
            {mode==="login"?"Sign Up":"Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

function Dash({user,setPage,setSong}){
  const recs=SONGS.filter(s=>s.difficulty==="Beginner").slice(0,4);
  const recent=SONGS.slice(6,10);
  const prog=[{l:"Chords Learned",v:12,m:20,c:"#00f5ff"},{l:"Songs Completed",v:7,m:100,c:"#7c00ff"},{l:"Practice Hours",v:23,m:50,c:"#00ff64"}];
  const plan=[{d:"Mon",t:"G, C, D chord shapes",ok:true},{d:"Tue",t:"Chord transitions",ok:true},{d:"Wed",t:"Wonderwall intro",ok:false},{d:"Thu",t:"Strumming patterns",ok:false},{d:"Fri",t:"Barre chord intro",ok:false}];
  return(
    <div style={{paddingTop:"78px",padding:"78px 24px 40px"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <h1 style={{...s.orbitron,fontSize:"26px",color:"#fff",marginBottom:"6px"}}>
          Welcome back, <span style={s.neon}>{user?.name} 🎸</span>
        </h1>
        <p style={{color:"#555",marginBottom:"32px"}}>Here's your personalized dashboard.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:"24px"}}>
          <div>
            <div style={{...s.glass,padding:"24px",marginBottom:"22px"}}>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"18px"}}>YOUR PROGRESS</div>
              {prog.map(p=>(
                <div key={p.l} style={{marginBottom:"14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
                    <span style={{fontSize:"12px",color:"#aaa"}}>{p.l}</span>
                    <span style={{fontSize:"12px",color:p.c}}>{p.v}/{p.m}</span>
                  </div>
                  <div style={{background:"rgba(255,255,255,0.08)",borderRadius:"100px",height:"5px"}}>
                    <div style={{width:`${(p.v/p.m)*100}%`,height:"100%",borderRadius:"100px",background:p.c,boxShadow:`0 0 6px ${p.c}`}}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"14px"}}>🤖 AI RECOMMENDED</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"12px",marginBottom:"22px"}}>
              {recs.map(song=>(
                <div key={song.id} onClick={()=>{setSong(song);setPage("tut");}}
                  style={{...s.glass,padding:"14px",cursor:"pointer",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,245,255,0.07)";e.currentTarget.style.transform="translateY(-2px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="translateY(0)"}}>
                  <div style={{fontSize:"24px",marginBottom:"8px"}}>{song.thumbnail}</div>
                  <div style={{fontWeight:600,fontSize:"13px",marginBottom:"3px"}}>{song.title}</div>
                  <div style={{color:"#555",fontSize:"11px",marginBottom:"8px"}}>{song.artist}</div>
                  {badge(dc(song.difficulty),song.difficulty)}
                </div>
              ))}
            </div>
            <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"14px"}}>🕐 RECENTLY VIEWED</div>
            {recent.map(song=>(
              <div key={song.id} onClick={()=>{setSong(song);setPage("tut");}}
                style={{...s.glass,padding:"14px 18px",display:"flex",alignItems:"center",gap:"14px",marginBottom:"8px",cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,245,255,0.07)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)"}}>
                <span style={{fontSize:"22px"}}>{song.thumbnail}</span>
                <div style={{flex:1}}><div style={{fontWeight:600,fontSize:"13px"}}>{song.title}</div><div style={{color:"#555",fontSize:"11px"}}>{song.artist}</div></div>
                {badge(dc(song.difficulty),song.difficulty)}
              </div>
            ))}
          </div>
          <div>
            <div style={{...s.glass,padding:"22px",marginBottom:"16px"}}>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"12px",marginBottom:"16px"}}>📅 THIS WEEK</div>
              {plan.map(item=>(
                <div key={item.d} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                  <div style={{width:"32px",height:"32px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",background:item.ok?"rgba(0,255,100,0.12)":"rgba(255,255,255,0.04)",border:item.ok?"1px solid #00ff64":"1px solid #222",...s.orbitron,fontSize:"9px",color:item.ok?"#00ff64":"#444"}}>{item.d}</div>
                  <div style={{flex:1,fontSize:"11px",color:item.ok?"#666":"#ccc",textDecoration:item.ok?"line-through":"none"}}>{item.t}</div>
                  {item.ok&&<span style={{color:"#00ff64",fontSize:"12px"}}>✓</span>}
                </div>
              ))}
            </div>
            <div style={{...s.glass,padding:"22px",textAlign:"center"}}>
              <div style={{...s.orbitron,color:"#7c00ff",fontSize:"12px",marginBottom:"12px"}}>🎯 SKILL LEVEL</div>
              <div style={{fontSize:"40px",marginBottom:"8px"}}>🌱</div>
              <div style={{...s.orbitron,color:"#00ff64",fontSize:"16px"}}>BEGINNER</div>
              <div style={{color:"#444",fontSize:"11px",marginTop:"4px",marginBottom:"14px"}}>Keep practicing daily!</div>
              <button onClick={()=>setPage("lib")} style={{...s.solidBtn,padding:"8px 20px",fontSize:"11px"}}>Find Songs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lib({setPage,setSong,gFilter}){
  const [search,setSearch]=useState("");
  const [lang,setLang]=useState("All");
  const [diff,setDiff]=useState("All");
  const [guitar,setGuitar]=useState(gFilter||"All");
  const filtered=SONGS.filter(s=>
    (s.title.toLowerCase().includes(search.toLowerCase())||s.artist.toLowerCase().includes(search.toLowerCase()))&&
    (lang==="All"||s.language===lang)&&(diff==="All"||s.difficulty===diff)&&(guitar==="All"||s.guitar===guitar)
  );
  const Fb=({l,a,o})=><button onClick={o} style={{background:a?"rgba(0,245,255,0.15)":"transparent",border:a?"1px solid #00f5ff55":"1px solid #222",color:a?"#00f5ff":"#555",padding:"5px 12px",borderRadius:"5px",cursor:"pointer",fontSize:"12px"}}>{l}</button>;
  return(
    <div style={{paddingTop:"78px",padding:"78px 24px 40px"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <h2 style={{...s.orbitron,...s.neon,fontSize:"24px",marginBottom:"6px"}}>
          {gFilter==="Acoustic"?"🎸 ACOUSTIC":gFilter==="Electric"?"⚡ ELECTRIC":"🎵 SONG LIBRARY"}
        </h2>
        <p style={{color:"#444",marginBottom:"24px"}}>{filtered.length} songs found</p>
        <div style={{display:"flex",gap:"12px",marginBottom:"20px",flexWrap:"wrap",alignItems:"center"}}>
          <input style={{...s.inp,maxWidth:"240px"}} placeholder="🔍 Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
            {["All","Hindi","English"].map(l=><Fb key={l} l={l} a={lang===l} o={()=>setLang(l)}/>)}
            <span style={{color:"#333",alignSelf:"center"}}>|</span>
            {["All","Beginner","Intermediate","Advanced"].map(d=><Fb key={d} l={d} a={diff===d} o={()=>setDiff(d)}/>)}
            <span style={{color:"#333",alignSelf:"center"}}>|</span>
            {["All","Acoustic","Electric"].map(g=><Fb key={g} l={g} a={guitar===g} o={()=>setGuitar(g)}/>)}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",gap:"14px"}}>
          {filtered.map(song=>(
            <div key={song.id} onClick={()=>{setSong(song);setPage("tut");}}
              style={{...s.glass,padding:"16px",cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,245,255,0.07)";e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.transform="translateY(0)"}}>
              <div style={{fontSize:"28px",marginBottom:"10px"}}>{song.thumbnail}</div>
              <div style={{fontWeight:600,fontSize:"13px",marginBottom:"3px",lineHeight:1.3}}>{song.title}</div>
              <div style={{color:"#555",fontSize:"11px",marginBottom:"10px"}}>{song.artist}</div>
              <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
                {badge(dc(song.difficulty),song.difficulty)}
                {badge(song.language==="Hindi"?"purple":"blue",song.language)}
              </div>
              <div style={{color:"#333",fontSize:"10px",marginTop:"6px"}}>{song.bpm} BPM · {song.guitar}</div>
            </div>
          ))}
          {!filtered.length&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px",color:"#333"}}>
            <div style={{fontSize:"40px",marginBottom:"12px"}}>🎸</div>No songs found.
          </div>}
        </div>
      </div>
    </div>
  );
}

function Tutorial({song,setPage}){
  const [tab,setTab]=useState("tabs");
  if(!song)return<div style={{paddingTop:"120px",textAlign:"center"}}><div style={{fontSize:"48px"}}>🎸</div><h2 style={{...s.orbitron,...s.neon,marginTop:"16px"}}>No song selected</h2><button onClick={()=>setPage("lib")} style={{...s.solidBtn,marginTop:"20px"}}>Browse Songs</button></div>;
  const tabData=`e|--0---0---0---0---|\nB|--1---1---3---3---|\nG|--2---2---0---0---|\nD|--2---2---0---2---|\nA|--0---0---2---3---|\nE|------0---3-------|\n     ${song.chords.slice(0,4).join("   ")}`;
  const strum={Beginner:"↓  ↓  ↑  ↓  ↑",Intermediate:"↓  ↑  ↓  ↓  ↑  ↓  ↑",Advanced:"↓  ↑  ↑  ↓  ↑  ↓  ↑  ↓"};
  const tips=[{ic:"🐢",t:"Start Slow",d:`Practice at ${Math.floor(song.bpm*0.6)} BPM first, then build to ${song.bpm} BPM.`},{ic:"🔄",t:"Transitions",d:`Focus on: ${song.chords.join(" → ")}`},{ic:"🤚",t:"Finger Placement",d:"Press firmly just behind the fret. Keep thumb relaxed."},{ic:"⏱️",t:"Metronome",d:`Use a metronome. Start at ${Math.floor(song.bpm*0.5)} BPM and increase weekly.`},{ic:"📅",t:"Daily Practice",d:"15 minutes daily beats 2 hours once a week. Consistency wins."}];
  return(
    <div style={{paddingTop:"78px",padding:"78px 24px 40px"}}>
      <div style={{maxWidth:"860px",margin:"0 auto"}}>
        <button onClick={()=>setPage("lib")} style={{...s.glowBtn,padding:"6px 16px",fontSize:"11px",marginBottom:"20px"}}>← Library</button>
        <div style={{...s.glass,padding:"24px",marginBottom:"18px",display:"flex",gap:"20px",alignItems:"center",flexWrap:"wrap"}}>
          <div style={{fontSize:"52px"}}>{song.thumbnail}</div>
          <div style={{flex:1}}>
            <h1 style={{...s.orbitron,fontSize:"22px",color:"#fff",marginBottom:"6px"}}>{song.title}</h1>
            <p style={{color:"#888",marginBottom:"12px"}}>{song.artist}</p>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {badge(dc(song.difficulty),song.difficulty)}
              {badge(song.language==="Hindi"?"purple":"blue",song.language)}
              {badge("default",song.guitar)}
              {badge("blue",`🎵 ${song.bpm} BPM`)}
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:"6px",marginBottom:"16px",flexWrap:"wrap"}}>
          {[["tabs","🎸 Tabs"],["chords","🎵 Chords"],["tips","💡 Tips"],["video","🎬 Video"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{...s.glowBtn,padding:"8px 16px",fontSize:"11px",background:tab===k?"rgba(0,245,255,0.18)":"rgba(0,245,255,0.04)",color:tab===k?"#00f5ff":"#555",borderColor:tab===k?"#00f5ff":"#00f5ff22"}}>{l}</button>
          ))}
        </div>
        <div style={{...s.glass,padding:"26px"}}>
          {tab==="tabs"&&<div>
            <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"16px"}}>GUITAR TABS</div>
            <pre style={{background:"rgba(0,0,0,0.5)",borderRadius:"8px",padding:"20px",fontFamily:"monospace",fontSize:"14px",lineHeight:"1.9",color:"#00f5ff",border:"1px solid rgba(0,245,255,0.12)",overflowX:"auto"}}>{tabData}</pre>
            <button style={{...s.glowBtn,padding:"8px 18px",fontSize:"11px",marginTop:"16px"}}>📄 Download PDF</button>
          </div>}
          {tab==="chords"&&<div>
            <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"16px"}}>CHORDS USED</div>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"24px"}}>
              {song.chords.map(c=>(
                <div key={c} style={{...s.glass,padding:"18px 22px",textAlign:"center",minWidth:"72px"}}>
                  <div style={{...s.orbitron,fontSize:"20px",color:"#00f5ff"}}>{c}</div>
                  <div style={{fontSize:"10px",color:"#444",marginTop:"3px"}}>chord</div>
                </div>
              ))}
            </div>
            <div style={{...s.glass,padding:"18px"}}>
              <div style={{color:"#888",marginBottom:"8px",fontSize:"13px",fontWeight:600}}>🥁 Strumming Pattern</div>
              <div style={{fontFamily:"monospace",fontSize:"22px",color:"#ffd700",letterSpacing:"6px"}}>{strum[song.difficulty]}</div>
            </div>
          </div>}
          {tab==="tips"&&<div>
            <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"16px"}}>PRACTICE TIPS</div>
            {tips.map(t=>(
              <div key={t.t} style={{...s.glass,padding:"14px 18px",marginBottom:"10px",display:"flex",gap:"14px"}}>
                <span style={{fontSize:"20px"}}>{t.ic}</span>
                <div><div style={{fontWeight:600,marginBottom:"3px",color:"#ddd",fontSize:"14px"}}>{t.t}</div><div style={{color:"#777",fontSize:"12px",lineHeight:1.5}}>{t.d}</div></div>
              </div>
            ))}
          </div>}
          {tab==="video"&&<div style={{textAlign:"center"}}>
            <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"16px"}}>AI VIDEO TUTORIAL</div>
            <div style={{background:"rgba(0,0,0,0.6)",borderRadius:"12px",aspectRatio:"16/9",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"2px solid rgba(0,245,255,0.15)"}}>
              <div style={{fontSize:"64px",marginBottom:"16px"}}>🎬</div>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"16px",marginBottom:"6px"}}>AI TUTORIAL VIDEO</div>
              <div style={{color:"#555",fontSize:"13px",marginBottom:"20px"}}>Auto-generated for: {song.title}</div>
              <button style={{...s.solidBtn,padding:"10px 28px",fontSize:"12px"}}>🤖 Generate Tutorial</button>
            </div>
            <p style={{color:"#333",fontSize:"11px",marginTop:"12px"}}>Powered by Python FastAPI + gTTS + FFmpeg on the ML backend</p>
          </div>}
        </div>
      </div>
    </div>
  );
}

function Admin(){
  const [activeTab,setActiveTab]=useState("songs");
  const [toast,setToast]=useState("");
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(""),2500);};
  return(
    <div style={{paddingTop:"78px",padding:"78px 24px 40px"}}>
      <div style={{maxWidth:"1050px",margin:"0 auto"}}>
        <h2 style={{...s.orbitron,...s.neon,fontSize:"22px",marginBottom:"6px"}}>⚙️ ADMIN PANEL</h2>
        <p style={{color:"#444",marginBottom:"28px"}}>Manage songs, users, and analytics</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px",marginBottom:"28px"}}>
          {[["100","Songs","🎵"],["50K","Students","👥"],["1.2M","Plays","▶"],["4.9","Rating","⭐"]].map(([v,l,ic])=>(
            <div key={l} style={{...s.glass,padding:"18px",textAlign:"center"}}>
              <div style={{fontSize:"22px",marginBottom:"6px"}}>{ic}</div>
              <div style={{...s.orbitron,...s.neon,fontSize:"20px"}}>{v}</div>
              <div style={{color:"#555",fontSize:"11px"}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:"6px",marginBottom:"20px"}}>
          {["songs","add","analytics"].map(t=><button key={t} onClick={()=>setActiveTab(t)} style={{...s.glowBtn,padding:"7px 16px",fontSize:"11px",background:activeTab===t?"rgba(0,245,255,0.18)":"rgba(0,245,255,0.04)",color:activeTab===t?"#00f5ff":"#555"}}>{t==="songs"?"📋 Songs":t==="add"?"➕ Add":"📊 Analytics"}</button>)}
        </div>
        {activeTab==="songs"&&<div style={{...s.glass,padding:"20px",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"12px",minWidth:"600px"}}>
            <thead>
              <tr style={{borderBottom:"1px solid rgba(0,245,255,0.15)"}}>
                {["#","Title","Artist","Lang","Difficulty","Guitar","BPM","Actions"].map(h=><th key={h} style={{...s.orbitron,color:"#00f5ff",padding:"10px 8px",textAlign:"left",fontSize:"10px"}}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {SONGS.slice(0,15).map(song=>(
                <tr key={song.id} style={{borderBottom:"1px solid rgba(255,255,255,0.03)"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(0,245,255,0.03)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{padding:"9px 8px",color:"#333"}}>{song.id}</td>
                  <td style={{padding:"9px 8px",color:"#ddd",fontWeight:500}}>{song.title}</td>
                  <td style={{padding:"9px 8px",color:"#666"}}>{song.artist}</td>
                  <td style={{padding:"9px 8px"}}>{badge(song.language==="Hindi"?"purple":"blue",song.language)}</td>
                  <td style={{padding:"9px 8px"}}>{badge(dc(song.difficulty),song.difficulty)}</td>
                  <td style={{padding:"9px 8px",color:"#666"}}>{song.guitar}</td>
                  <td style={{padding:"9px 8px",color:"#444"}}>{song.bpm}</td>
                  <td style={{padding:"9px 8px"}}>
                    <button onClick={()=>showToast("✏️ Editing: "+song.title)} style={{background:"none",border:"1px solid #333",color:"#777",padding:"2px 8px",borderRadius:"4px",cursor:"pointer",fontSize:"10px",marginRight:"5px"}}>Edit</button>
                    <button onClick={()=>showToast("🗑️ Deleted: "+song.title)} style={{background:"none",border:"1px solid #ff444444",color:"#ff4444",padding:"2px 8px",borderRadius:"4px",cursor:"pointer",fontSize:"10px"}}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{color:"#333",fontSize:"11px",marginTop:"12px"}}>Showing 15 of {SONGS.length} songs</div>
        </div>}
        {activeTab==="add"&&<div style={{...s.glass,padding:"28px",maxWidth:"480px"}}>
          <div style={{...s.orbitron,color:"#00f5ff",fontSize:"13px",marginBottom:"20px"}}>ADD NEW SONG</div>
          {[["Song Title","text"],["Artist Name","text"],["BPM","number"]].map(([l,t])=>(
            <div key={l} style={{marginBottom:"14px"}}>
              <div style={{color:"#666",fontSize:"11px",letterSpacing:"1px",marginBottom:"5px"}}>{l.toUpperCase()}</div>
              <input type={t} style={s.inp} placeholder={l}/>
            </div>
          ))}
          <button onClick={()=>showToast("✅ Song added to library!")} style={{...s.solidBtn,width:"100%",marginTop:"8px"}}>➕ Add Song</button>
        </div>}
        {activeTab==="analytics"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"18px"}}>
          {[["Language Split",[["Hindi",50,"#a855f7"],["English",50,"#00f5ff"]]],["By Difficulty",[["Beginner",42,"#00ff64"],["Intermediate",36,"#ffa500"],["Advanced",22,"#ff4444"]]]].map(([title,data])=>(
            <div key={title} style={{...s.glass,padding:"22px"}}>
              <div style={{...s.orbitron,color:"#00f5ff",fontSize:"12px",marginBottom:"18px"}}>{title.toUpperCase()}</div>
              {data.map(([l,v,c])=>(
                <div key={l} style={{marginBottom:"12px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"5px"}}>
                    <span style={{fontSize:"12px",color:"#aaa"}}>{l}</span>
                    <span style={{fontSize:"12px",color:c}}>{v}%</span>
                  </div>
                  <div style={{background:"rgba(255,255,255,0.07)",borderRadius:"4px",height:"7px"}}>
                    <div style={{width:v+"%",height:"100%",borderRadius:"4px",background:c,boxShadow:`0 0 6px ${c}`}}/>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>}
        {toast&&<div style={{position:"fixed",bottom:"28px",right:"28px",...s.glass,padding:"12px 22px",color:"#00f5ff",boxShadow:"0 0 18px rgba(0,245,255,0.25)",fontSize:"13px"}}>{toast}</div>}
      </div>
    </div>
  );
}

export default function App(){
  const [page,setPage]=useState("land");
  const [user,setUser]=useState(null);
  const [song,setSong]=useState(null);
  
  const go=(p)=>{
    if(["dash","admin"].includes(p)&&!user){setPage("login");return;}
    setPage(p);
  };
  
  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#000;}
        ::-webkit-scrollbar-thumb{background:#00f5ff33;border-radius:3px;}
        span[style*="padding:2px"]:not(.btn){pointer-events:none;}
      `}</style>
      <div style={s.root}>
        {/* Ambient orbs */}
        <div style={{position:"fixed",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,245,255,0.03) 0%,transparent 70%)",top:"-150px",right:"-150px",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"fixed",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,rgba(124,0,255,0.04) 0%,transparent 70%)",bottom:"-80px",left:"-80px",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"relative",zIndex:1}}>
          <Navbar page={page} setPage={go} user={user} setUser={setUser}/>
          {page==="land"&&<Landing setPage={go}/>}
          {page==="login"&&<Auth mode="login" setPage={setPage} setUser={setUser}/>}
          {page==="signup"&&<Auth mode="signup" setPage={setPage} setUser={setUser}/>}
          {page==="dash"&&user&&<Dash user={user} setPage={go} setSong={setSong}/>}
          {page==="lib"&&<Lib setPage={go} setSong={setSong} gFilter={null}/>}
          {page==="tut"&&<Tutorial song={song} setPage={setPage}/>}
          {page==="admin"&&user&&<Admin/>}
        </div>
      </div>
    </>
  );
}
