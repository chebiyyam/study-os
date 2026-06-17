import { useState, useEffect, useRef } from "react";

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const FALL_ORDER   = ["MATH251","PHYS206","ENGR102","STAT211","POLS207"];
const SPRING_ORDER = ["MATH308","PHYS207","MEEN221","ENGR216","ENGL103"];

// ── COURSES ───────────────────────────────────────────────────────────────────
const COURSES = {
  MATH251: {
    id:"MATH251", code:"MATH 251", name:"Calculus III",
    color:"#7C6FCD", sem:"Fall 2026", credits:3,
    resource:{ label:"Paul's Online Math Notes", url:"https://tutorial.math.lamar.edu/" },
    exams:[
      { label:"Exam 1 (Ch 12–13)", week:"Week 4 (≈ Sep 22)" },
      { label:"Exam 2 (Ch 14)",    week:"Week 8 (≈ Oct 20)" },
      { label:"Exam 3 (Ch 15)",    week:"Week 12 (≈ Nov 17)" },
      { label:"Final (Ch 14–16)",  week:"Finals week" },
    ],
    weeks:[
      { n:1,  sections:["12.1","12.2","12.3"] },
      { n:2,  sections:["12.4","12.5","12.6"] },
      { n:3,  sections:["13.1","13.2","13.3"] },
      { n:4,  sections:["13.4","14.1"], exam:"Exam I (through 13.4)" },
      { n:5,  sections:["14.3","14.4","14.5"] },
      { n:6,  sections:["14.6","14.7"] },
      { n:7,  sections:["14.8","15.1"] },
      { n:8,  sections:["15.2"], exam:"Exam 2 (Chapter 14)" },
      { n:9,  sections:["15.3","15.4","15.5"] },
      { n:10, sections:["15.6","15.7","15.8"] },
      { n:11, sections:["15.9","16.1"] },
      { n:12, sections:["16.2","16.3"], exam:"Exam 3 (Chapter 15)" },
      { n:13, sections:["16.4","16.5"] },
      { n:14, sections:["16.6","16.7"] },
      { n:15, sections:["16.8","16.9"], note:"Final review (Ch 16 + 14.7)" },
    ],
    hw:{
      "12.1":[1,5,7,9,11,13,15,17,19,22,23,25,27,29,31,33,35,37,39,41],
      "12.2":[1,5,9,11,13,15,17,19,21,23,25,27,29,31],
      "12.3":[1,3,5,7,9,11,15,17,19,21,23,25,27,39,41,43,47],
      "12.4":[1,3,5,13,14,15,17,19,21,29,31,33,35],
      "12.5":"1–55 odd",
      "12.6":[3,5,9,11,13,15,17,19,"21–28"],
      "13.1":["1–13 odd","21–26"],
      "13.2":[3,5,7,9,11,13,17,19,21,23,25,27,35,37,39,41,42],
      "13.3":[1,3,5,7,9,13,17,19,21,23,25],
      "13.4":[3,5,7,9,11,13,15,23,25,37,39,41],
      "14.1":[5,9,11,13,17,18,21,22,25,29,45,51,53,"61–67",69],
      "14.2":[1,5,7,9,13,17,19,29,31,33,35,37],
      "14.3":[10,15,17,19,21,29,33,41,51,53,57,61,63,65,71,75,77,82,99],
      "14.4":[1,5,7,17,21,25,26,33,35],
      "14.5":[1,5,9,11,17,19,21,23,27,39,43,49],
      "14.6":[5,7,9,11,15,17,19,21,25,29,31,41,43,45,55,63],
      "14.7":[5,7,9,15,17,23,31,33,35,37,43,47,49,53],
      "14.8":[10,15,17,19,21,29,33,41,51,53,57,61,63,65,71,75,77,82,99],
      "15.1":[3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,39],
      "15.2":["1–31 odd",39,45,47,49,51,53,55],
      "15.3":["1–13 odd",17,19,21,25,27,29,31],
      "15.4":[3,5,7,9,11,21,23],
      "15.5":[1,3,5,7],
      "15.6":["1–21 odd",33],
      "15.7":[1,3,5,7,9,17,19,21,23,25,29,30],
      "15.8":[1,3,5,7,9,11,13,21,23,25,29,35],
      "15.9":[1,3,5,7,9,11,13,15,17,23,25],
      "16.1":[1,3,5,11,12,13,14,17,18,19,21,23,24],
      "16.2":[1,3,7,8,11,15,17,18,21,25,34,35,39,41],
      "16.3":[1,3,7,11,13,15,17,19,21,23,25,29,31,33,35],
      "16.4":[1,3,7,9,13,14,17,21,27,29],
      "16.5":[3,4,7,11,13,17,19,21,22,25,31,37,39],
      "16.6":[1,3,4,5,"13–18",19,21,23,25,33,36],
      "16.7":[3,4,5,7,9,11,13,15,17,21,23,27,31,43],
      "16.8":[1,3,5,7,9,13,15,17,19],
      "16.9":[1,3,5,7,9,11,13,17,19,20,25,31,32],
    }
  },
  PHYS206:{
    id:"PHYS206", code:"PHYS 206", name:"Mechanics",
    color:"#E07C54", sem:"Fall 2026", credits:3,
    resource:{ label:"Professor Leonard YouTube", url:"https://www.youtube.com/@ProfessorLeonard" },
    exams:[
      { label:"Exam 1", week:"Week 3–4" },
      { label:"Exam 2", week:"Week 7–8" },
      { label:"Final",  week:"Finals week" },
    ],
    weeks:[
      { n:1, sections:["1D / 2D motion"] },
      { n:2, sections:["Newton's Laws"] },
      { n:3, sections:["Work & Energy"] },
      { n:4, sections:["Potential Energy / Conservation"] },
      { n:5, sections:["Linear Momentum"] },
      { n:6, sections:["Rotational Motion / Torque"] },
      { n:7, sections:["Angular Momentum"] },
      { n:8, sections:["Harmonic Motion"] },
    ],
    hw:{}
  },
  ENGR102:{
    id:"ENGR102", code:"ENGR 102", name:"Python Programming",
    color:"#4CAF8A", sem:"Fall 2026", credits:2,
    resource:{ label:"Python Docs", url:"https://docs.python.org/3/" },
    exams:[
      { label:"Midterm", week:"Week 7–8" },
      { label:"Final",   week:"Finals week" },
    ],
    weeks:[
      { n:1, sections:["Python basics / syntax"] },
      { n:2, sections:["Loops / functions / conditionals"] },
      { n:3, sections:["Lists / dicts"] },
      { n:4, sections:["File I/O / modules"] },
      { n:5, sections:["OOP basics"] },
      { n:6, sections:["Debugging / testing"] },
      { n:7, sections:["NumPy / data arrays"] },
      { n:8, sections:["Plotting / matplotlib"] },
    ],
    hw:{}
  },
  STAT211:{
    id:"STAT211", code:"STAT 211", name:"Statistics",
    color:"#D4A843", sem:"Fall 2026", credits:3,
    resource:{ label:"Crawford YouTube Series", url:"https://www.youtube.com/results?search_query=crawford+stat+211+tamu" },
    exams:[
      { label:"Exam 1", week:"Week 4" },
      { label:"Exam 2", week:"Week 8" },
      { label:"Final",  week:"Finals week" },
    ],
    weeks:[
      { n:1, sections:["Basic probability"] },
      { n:2, sections:["Random variables"] },
      { n:3, sections:["Distributions"] },
      { n:4, sections:["Sampling distributions"] },
      { n:5, sections:["Confidence intervals"] },
      { n:6, sections:["Hypothesis testing"] },
    ],
    hw:{}
  },
  POLS207:{
    id:"POLS207", code:"POLS 207", name:"American Government",
    color:"#C47AB5", sem:"Fall 2026", credits:3,
    resource:{ label:"Khan Academy Gov", url:"https://www.khanacademy.org/humanities/ap-us-government-and-politics" },
    exams:[
      { label:"Midterm", week:"Week 7–8" },
      { label:"Final",   week:"Finals week" },
    ],
    weeks:[
      { n:1, sections:["Constitutional foundations"] },
      { n:2, sections:["Federalism"] },
      { n:3, sections:["Civil liberties"] },
      { n:4, sections:["Civil rights"] },
      { n:5, sections:["Congress"] },
      { n:6, sections:["The Presidency"] },
      { n:7, sections:["The Judiciary"] },
      { n:8, sections:["Public opinion / elections"] },
    ],
    hw:{}
  },
  MATH308:{
    id:"MATH308", code:"MATH 308", name:"Differential Equations",
    color:"#9B8FE0", sem:"Spring 2027", credits:3,
    resource:{ label:"Paul's Online Math Notes", url:"https://tutorial.math.lamar.edu/" },
    exams:[
      { label:"Exam 1", week:"Week 4" },
      { label:"Exam 2", week:"Week 8" },
      { label:"Final",  week:"Finals week" },
    ],
    weeks:[
      { n:1, sections:["1.1","1.2","1.3","2.1"] },
      { n:2, sections:["2.2","2.3","2.4","2.5","2.6"] },
      { n:3, sections:["3.1","3.2","3.3","3.4"] },
      { n:4, sections:["3.5","3.6","3.7"] },
    ],
    hw:{}
  },
  PHYS207:{
    id:"PHYS207", code:"PHYS 207", name:"Electricity & Magnetism",
    color:"#E07C54", sem:"Spring 2027", credits:3,
    resource:{ label:"Professor Leonard YouTube", url:"https://www.youtube.com/@ProfessorLeonard" },
    exams:[
      { label:"Exam 1", week:"Week 4" },
      { label:"Exam 2", week:"Week 8" },
      { label:"Final",  week:"Finals week" },
    ],
    weeks:[
      { n:1, sections:["Coulomb's Law / Electric Field"] },
      { n:2, sections:["Electric Potential"] },
      { n:3, sections:["Flux / Gauss's Law"] },
      { n:4, sections:["Capacitors"] },
      { n:5, sections:["Ohm's Law / circuits"] },
      { n:6, sections:["Magnetic forces"] },
    ],
    hw:{}
  },
  MEEN221:{
    id:"MEEN221", code:"MEEN 221", name:"Statics",
    color:"#5BA4C8", sem:"Spring 2027", credits:3,
    resource:{ label:"Engineer4Free", url:"https://www.engineer4free.com/" },
    exams:[
      { label:"Exam 1", week:"Week 4" },
      { label:"Exam 2", week:"Week 8" },
      { label:"Final",  week:"Finals week" },
    ],
    weeks:[
      { n:1, sections:["Free body diagrams / equilibrium"] },
      { n:2, sections:["Trusses / method of joints"] },
      { n:3, sections:["Frames / distributed loads / friction"] },
      { n:4, sections:["Centroids"] },
    ],
    hw:{}
  },
  ENGR216:{
    id:"ENGR216", code:"ENGR 216", name:"Engineering Computation",
    color:"#4CAF8A", sem:"Spring 2027", credits:2,
    resource:{ label:"MATLAB Docs", url:"https://www.mathworks.com/help/matlab/" },
    exams:[
      { label:"Midterm", week:"Week 7–8" },
      { label:"Final",   week:"Finals week" },
    ],
    weeks:[
      { n:1, sections:["MATLAB basics"] },
      { n:2, sections:["Vectors / matrices"] },
      { n:3, sections:["Plotting / visualization"] },
      { n:4, sections:["Numerical methods"] },
      { n:5, sections:["ODE solvers"] },
      { n:6, sections:["Data analysis"] },
    ],
    hw:{}
  },
  ENGL103:{
    id:"ENGL103", code:"ENGL 103", name:"Composition & Rhetoric",
    color:"#A87C5B", sem:"Spring 2027", credits:3,
    resource:{ label:"Purdue OWL", url:"https://owl.purdue.edu/" },
    exams:[
      { label:"Paper 1 due",  week:"Week 5" },
      { label:"Paper 2 due",  week:"Week 10" },
      { label:"Final paper",  week:"Finals week" },
    ],
    weeks:[
      { n:1, sections:["Rhetorical analysis"] },
      { n:2, sections:["Argument structure"] },
      { n:3, sections:["Research strategies"] },
      { n:4, sections:["Source evaluation"] },
      { n:5, sections:["Draft & revision"] },
      { n:6, sections:["Final essay"] },
    ],
    hw:{}
  },
};

// ── SUMMER PLAN ───────────────────────────────────────────────────────────────
const SUMMER_PLAN = [
  { week:1,  dates:"May 24–30",   focus:"MATH 251: 12.1–12.3 · ENGR 102: Python basics/syntax" },
  { week:2,  dates:"May 31–Jun 6",focus:"MATH 251: 12.4–12.6 · ENGR 102: loops/functions/conditionals" },
  { week:3,  dates:"Jun 7–13",    focus:"MATH 251: 13.1–13.3 · ENGR 102: lists/dicts, finish Python" },
  { week:4,  dates:"Jun 14–20",   focus:"MATH 251: 13.4, 14.1 · PHYS 206: 1D/2D motion" },
  { week:5,  dates:"Jun 21–27",   focus:"MATH 251: 14.3–14.5 · PHYS 206: Newton's Laws, Work & Energy" },
  { week:6,  dates:"Jun 28–Jul 4",focus:"MATH 251: 14.6–14.7 · PHYS 206: Potential Energy, Conservation (NSC Jun 30–Jul 1)" },
  { week:7,  dates:"Jul 5–11",    focus:"MATH 251: 14.8, 15.1–15.2 · PHYS 206: Torque, Angular Momentum, Rotational Motion" },
  { week:8,  dates:"Jul 12–18",   focus:"MATH 251: 15.3, 15.5–15.6 · PHYS 206: Torque, Harmonic Motion · STAT 211: basic probability" },
  { week:9,  dates:"Jul 19–25",   focus:"MATH 251: 15.7–15.9, 16.1 · STAT 211: random variables/distributions · MEEN 221: FBDs, equilibrium" },
  { week:10, dates:"Jul 26–Aug 1",focus:"MATH 251: 16.2–16.4 · MATH 308: 1.1–1.3, 2.1 · MEEN 221: trusses, method of joints" },
  { week:11, dates:"Aug 2–8",     focus:"MATH 308: 2.2–2.6 · PHYS 207: Coulomb's Law, E-Field, Electric Potential · MEEN 221: frames, friction" },
  { week:12, dates:"Aug 9–15",    focus:"MATH 308: 3.1–3.4 · PHYS 207: Flux, Gauss's Law, Capacitors · STAT 211: hypothesis testing" },
  { week:13, dates:"Aug 16–24",   focus:"MATH 308: 3.5–3.7 · PHYS 207: Ohm's Law, circuits, magnetic forces · MEEN 221: centroids · General review" },
];

// ── WORKOUT ───────────────────────────────────────────────────────────────────
const WORKOUT_PLAN = [
  { day:"Day 1", title:"Rotational Power", exercises:[
    { name:"Dumbbell woodchops (standing)",                sets:"4", reps:"12 each side" },
    { name:"Single-arm dumbbell swing (explosive hip hinge)",sets:"3",reps:"15 each side" },
    { name:"Rotational dumbbell press (lunge stance)",      sets:"3", reps:"10 each side" },
    { name:"Plank with dumbbell drag",                      sets:"3", reps:"10 each side" },
  ]},
  { day:"Day 2", title:"Lower Body + Hip Drive", exercises:[
    { name:"Goblet squat (both dumbbells)",                 sets:"4", reps:"12" },
    { name:"Reverse lunge with rotation (1 DB)",            sets:"3", reps:"10 each side" },
    { name:"Romanian deadlift",                             sets:"4", reps:"12" },
    { name:"Lateral lunge",                                 sets:"3", reps:"10 each side" },
    { name:"Glute bridge with dumbbell on hips",            sets:"3", reps:"15" },
  ]},
  { day:"Day 3", title:"Core + Upper Body", exercises:[
    { name:"Dumbbell renegade row",                         sets:"3", reps:"8 each side" },
    { name:"Single-arm dumbbell row (rotational finish)",   sets:"3", reps:"12 each side" },
    { name:"Dumbbell lateral raise",                        sets:"3", reps:"15" },
    { name:"Hollow body hold",                              sets:"3", reps:"30 sec" },
    { name:"Russian twists (one dumbbell)",                 sets:"4", reps:"20" },
  ]},
];

// ── STORAGE ───────────────────────────────────────────────────────────────────
function load(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ── CURRENT SUMMER WEEK ───────────────────────────────────────────────────────
function getCurrentSummerWeek() {
  const base = new Date("2026-05-24T00:00:00");
  const now  = new Date();
  const diff = Math.floor((now - base) / (7 * 24 * 60 * 60 * 1000)) + 1;
  return Math.max(1, Math.min(diff, 13));
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = ({ n, size = 16 }) => {
  const s = { width: size, height: size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.5", strokeLinecap:"round", strokeLinejoin:"round" };
  const icons = {
    book:    <svg {...s}><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    timer:   <svg {...s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    calc:    <svg {...s}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="10" y2="16"/><line x1="14" y1="16" x2="16" y2="16"/></svg>,
    tasks:   <svg {...s}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    external:<svg {...s}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    plus:    <svg {...s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    trash:   <svg {...s}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
    cal:     <svg {...s}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    gpa:     <svg {...s}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    gym:     <svg {...s}><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  };
  return icons[n] || null;
};

// ── CHECKBOX ──────────────────────────────────────────────────────────────────
function Checkbox({ checked, onChange, color = "#7C6FCD" }) {
  return (
    <button onClick={onChange} style={{
      width:18, height:18, minWidth:18,
      border: checked ? "none" : "1.5px solid #3A3A40",
      borderRadius:4, background: checked ? color : "transparent",
      display:"flex", alignItems:"center", justifyContent:"center",
      cursor:"pointer", transition:"all 0.15s", flexShrink:0,
    }}>
      {checked && <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
    </button>
  );
}

// ── COURSE HUB ────────────────────────────────────────────────────────────────
function CourseHub() {
  const [selected,     setSelected]     = useState("MATH251");
  const [weekStatus,   setWeekStatus]   = useState(() => load("weekStatus", {}));
  const [hwStatus,     setHwStatus]     = useState(() => load("hwStatus", {}));
  const [notes,        setNotes]        = useState(() => load("courseNotes", {}));
  const [expandedWeek, setExpandedWeek] = useState(null);

  const setWS  = (k,v) => { const n={...weekStatus,[k]:v};  setWeekStatus(n);  save("weekStatus",n); };
  const setHS  = (k,v) => { const n={...hwStatus,[k]:v};    setHwStatus(n);    save("hwStatus",n); };
  const setNote= (k,v) => { const n={...notes,[k]:v};       setNotes(n);       save("courseNotes",n); };

  const STATUS_CYCLE = ["","in-progress","done"];
  const STATUS_LABEL = { "":"Not started", "in-progress":"In progress", "done":"Done" };
  const STATUS_COLOR = { "":"#3A3A40", "in-progress":"#D4A843", "done":"#4CAF8A" };

  const course = COURSES[selected];
  const color  = course.color;

  function hwProblems(sec) {
    const raw = course.hw[sec];
    if (!raw) return [];
    if (typeof raw === "string") return [raw];
    return raw.map(String);
  }

  const fallCourses   = FALL_ORDER.map(id => COURSES[id]);
  const springCourses = SPRING_ORDER.map(id => COURSES[id]);

  return (
    <div style={{ display:"flex", gap:24, height:"100%" }}>
      {/* sidebar */}
      <div style={{ width:200, flexShrink:0 }}>
        <div style={{ fontSize:10, fontFamily:"JetBrains Mono,monospace", color:"#6B6B70", letterSpacing:"0.08em", marginBottom:8, textTransform:"uppercase" }}>Fall 2026</div>
        {fallCourses.map(c => (
          <button key={c.id} onClick={() => { setSelected(c.id); setExpandedWeek(null); }} style={{
            display:"block", width:"100%", textAlign:"left", padding:"8px 12px",
            borderRadius:8, border:"none", background: selected===c.id ? "#1E1E22" : "transparent",
            cursor:"pointer", marginBottom:2,
          }}>
            <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color:c.color, display:"block" }}>{c.code}</span>
            <span style={{ fontSize:12, color: selected===c.id ? "#E8E8ED" : "#6B6B70" }}>{c.name}</span>
          </button>
        ))}
        <div style={{ fontSize:10, fontFamily:"JetBrains Mono,monospace", color:"#6B6B70", letterSpacing:"0.08em", margin:"16px 0 8px", textTransform:"uppercase" }}>Spring 2027</div>
        {springCourses.map(c => (
          <button key={c.id} onClick={() => { setSelected(c.id); setExpandedWeek(null); }} style={{
            display:"block", width:"100%", textAlign:"left", padding:"8px 12px",
            borderRadius:8, border:"none", background: selected===c.id ? "#1E1E22" : "transparent",
            cursor:"pointer", marginBottom:2,
          }}>
            <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color:c.color, display:"block" }}>{c.code}</span>
            <span style={{ fontSize:12, color: selected===c.id ? "#E8E8ED" : "#6B6B70" }}>{c.name}</span>
          </button>
        ))}
      </div>

      {/* main */}
      <div style={{ flex:1, overflowY:"auto", paddingRight:4 }}>
        {/* header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          <div>
            <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color:color, marginBottom:4 }}>{course.code} · {course.sem} · {course.credits} cr</div>
            <h2 style={{ margin:0, fontSize:22, fontWeight:600, color:"#E8E8ED" }}>{course.name}</h2>
          </div>
          {course.resource && (
            <a href={course.resource.url} target="_blank" rel="noreferrer" style={{
              display:"flex", alignItems:"center", gap:6, fontSize:12, color:color,
              textDecoration:"none", border:`1px solid ${color}30`, borderRadius:8, padding:"6px 12px", background:`${color}10`,
            }}>{course.resource.label} <Icon n="external" size={12}/></a>
          )}
        </div>

        {/* exams strip */}
        {course.exams && (
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
            {course.exams.map((e,i) => (
              <div key={i} style={{ padding:"5px 12px", borderRadius:6, background:"#1A1510", border:"1px solid #F0A42940", fontSize:11 }}>
                <span style={{ color:"#F0A429", fontWeight:600 }}>{e.label}</span>
                <span style={{ color:"#6B6B70", marginLeft:6 }}>{e.week}</span>
              </div>
            ))}
          </div>
        )}

        {/* week rail */}
        <div style={{ marginBottom:6 }}>
          <div style={{ fontSize:11, color:"#6B6B70", marginBottom:10 }}>Weekly Progress — click a week to expand</div>
          <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
            {course.weeks.map(w => {
              const st = weekStatus[`${course.id}-w${w.n}`] || "";
              const bg = st==="done" ? color : st==="in-progress" ? "#D4A843" : "#1E1E22";
              const isOpen = expandedWeek===w.n;
              return (
                <button key={w.n} onClick={() => setExpandedWeek(isOpen ? null : w.n)} style={{
                  width:38, height:38, borderRadius:8, background:bg,
                  border:`1px solid ${st ? "transparent" : "#2A2A2E"}`,
                  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", position:"relative", transition:"all 0.15s",
                  outline: isOpen ? `2px solid ${color}` : "none", outlineOffset:2,
                }}>
                  <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, fontWeight:600, color: st ? "#fff" : "#6B6B70", lineHeight:1 }}>{String(w.n).padStart(2,"0")}</span>
                  {w.exam && <span style={{ position:"absolute", top:-3, right:-3, width:7, height:7, borderRadius:"50%", background:"#F0A429", border:"1.5px solid #0D0D0F" }}/>}
                </button>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:16, marginTop:10, fontSize:11, color:"#6B6B70" }}>
            {Object.entries(STATUS_COLOR).map(([k,v]) => (
              <span key={k} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:10, height:10, borderRadius:3, background: k ? v : "#1E1E22", border: k ? "none" : "1px solid #2A2A2E", display:"inline-block" }}/>
                {STATUS_LABEL[k]}
              </span>
            ))}
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:7, height:7, borderRadius:"50%", background:"#F0A429", display:"inline-block" }}/> Exam week</span>
          </div>
        </div>

        {/* expanded week panel */}
        {expandedWeek !== null && (() => {
          const w = course.weeks.find(x => x.n===expandedWeek);
          if (!w) return null;
          const wKey = `${course.id}-w${w.n}`;
          const st = weekStatus[wKey] || "";
          return (
            <div style={{ background:"#141416", border:"1px solid #252528", borderRadius:12, padding:20, marginTop:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                <div>
                  <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"#6B6B70", marginBottom:4 }}>WEEK {String(w.n).padStart(2,"0")}</div>
                  <div style={{ fontSize:14, color:"#E8E8ED", fontWeight:500 }}>{w.sections.join(" · ")}</div>
                  {w.exam && <div style={{ fontSize:11, color:"#F0A429", marginTop:4 }}>⚠ {w.exam}</div>}
                  {w.note && <div style={{ fontSize:11, color:"#6B6B70", marginTop:4 }}>{w.note}</div>}
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  {STATUS_CYCLE.map(s => (
                    <button key={s} onClick={() => setWS(wKey, s)} style={{
                      padding:"4px 10px", borderRadius:6,
                      border:`1px solid ${st===s ? STATUS_COLOR[s] : "#2A2A2E"}`,
                      background: st===s ? `${STATUS_COLOR[s]}20` : "transparent",
                      color: st===s ? STATUS_COLOR[s] : "#6B6B70", fontSize:11, cursor:"pointer",
                    }}>{STATUS_LABEL[s]}</button>
                  ))}
                </div>
              </div>

              {w.sections.map(sec => {
                const probs = hwProblems(sec);
                if (!probs.length) return null;
                return (
                  <div key={sec} style={{ marginBottom:16 }}>
                    <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color:color, marginBottom:8 }}>§{sec} Problems</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {probs.map(p => {
                        const hkey = `${course.id}-${sec}-${p}`;
                        const done = hwStatus[hkey];
                        return (
                          <button key={p} onClick={() => setHS(hkey, !done)} style={{
                            padding:"4px 10px", borderRadius:6, fontSize:12,
                            fontFamily:"JetBrains Mono,monospace",
                            border:`1px solid ${done ? color : "#2A2A2E"}`,
                            background: done ? `${color}25` : "transparent",
                            color: done ? color : "#A8A8B0", cursor:"pointer",
                            textDecoration: done ? "line-through" : "none",
                          }}>{p}</button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div>
                <div style={{ fontSize:11, color:"#6B6B70", marginBottom:6 }}>Notes</div>
                <textarea value={notes[wKey]||""} onChange={e => setNote(wKey, e.target.value)}
                  placeholder="Add notes for this week…"
                  style={{ width:"100%", minHeight:80, background:"#0D0D0F", border:"1px solid #252528", borderRadius:8, padding:12, color:"#E8E8ED", fontSize:13, resize:"vertical", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}/>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ── CALENDAR ──────────────────────────────────────────────────────────────────
function CalendarView() {
  const [sem, setSem] = useState("Fall 2026");

  const courses = (sem === "Fall 2026" ? FALL_ORDER : SPRING_ORDER).map(id => COURSES[id]);

  // Build a flat list of all exam events
  const events = [];
  courses.forEach(c => {
    (c.exams || []).forEach(e => {
      events.push({ course: c, label: e.label, week: e.week });
    });
  });

  // Semester week grid — Fall 2026 starts ~Aug 26, Spring 2027 ~Jan 20
  const semStart = sem === "Fall 2026" ? new Date("2026-08-26") : new Date("2027-01-20");
  const WEEKS = 16;

  const weekRanges = Array.from({ length: WEEKS }, (_, i) => {
    const start = new Date(semStart);
    start.setDate(start.getDate() + i * 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    const fmt = d => d.toLocaleDateString("en-US", { month:"short", day:"numeric" });
    return { n: i + 1, label: `${fmt(start)}–${fmt(end)}` };
  });

  // Map each course's exam weeks — we do a rough mapping by name
  const getWeekN = (weekStr) => {
    const m = weekStr.match(/Week\s*(\d+)/i);
    if (m) return parseInt(m[1]);
    if (/final/i.test(weekStr)) return 16;
    return null;
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:600, color:"#E8E8ED" }}>Exam Calendar</h2>
        <div style={{ display:"flex", gap:8 }}>
          {["Fall 2026","Spring 2027"].map(s => (
            <button key={s} onClick={() => setSem(s)} style={{
              padding:"6px 14px", borderRadius:8, border:`1px solid ${sem===s ? "#7C6FCD" : "#2A2A2E"}`,
              background: sem===s ? "#7C6FCD20" : "transparent",
              color: sem===s ? "#7C6FCD" : "#6B6B70", fontSize:12, cursor:"pointer",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* legend */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
        {courses.map(c => (
          <div key={c.id} style={{ display:"flex", alignItems:"center", gap:6, fontSize:11 }}>
            <span style={{ width:10, height:10, borderRadius:3, background:c.color, display:"inline-block" }}/>
            <span style={{ fontFamily:"JetBrains Mono,monospace", color:c.color }}>{c.code}</span>
          </div>
        ))}
      </div>

      {/* week grid */}
      <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
        {weekRanges.map(w => {
          const weekEvents = [];
          courses.forEach(c => {
            (c.exams || []).forEach(e => {
              const wn = getWeekN(e.week);
              if (wn === w.n) weekEvents.push({ course: c, label: e.label });
            });
          });
          const isFinal = w.n === 16;

          return (
            <div key={w.n} style={{
              display:"flex", alignItems:"flex-start", gap:16, padding:"10px 0",
              borderBottom:"1px solid #141416",
              background: isFinal ? "#1A1510" : "transparent",
            }}>
              <div style={{ width:130, flexShrink:0 }}>
                <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, color: isFinal ? "#F0A429" : "#4A4A52" }}>
                  W{String(w.n).padStart(2,"0")} {isFinal ? "· FINALS" : ""}
                </div>
                <div style={{ fontSize:11, color:"#3A3A40", marginTop:2 }}>{w.label}</div>
              </div>
              <div style={{ flex:1, display:"flex", gap:8, flexWrap:"wrap" }}>
                {weekEvents.length === 0
                  ? <span style={{ fontSize:11, color:"#252528" }}>—</span>
                  : weekEvents.map((e, i) => (
                    <div key={i} style={{
                      padding:"4px 12px", borderRadius:6, fontSize:12, fontWeight:500,
                      background:`${e.course.color}18`,
                      border:`1px solid ${e.course.color}40`,
                      color: e.course.color,
                    }}>
                      <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, opacity:0.7, marginRight:6 }}>{e.course.code}</span>
                      {e.label}
                    </div>
                  ))
                }
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop:20, fontSize:11, color:"#4A4A52" }}>
        Exam weeks are approximate — update once you have your actual syllabus.
      </div>
    </div>
  );
}

// ── OVERALL GPA ───────────────────────────────────────────────────────────────
function OverallGPA() {
  const [configs, setConfigs] = useState(() => load("gpaConfigs", {}));
  const [sem, setSem] = useState("Fall 2026");

  const courses = (sem === "Fall 2026" ? FALL_ORDER : SPRING_ORDER).map(id => COURSES[id]);

  const gradeToGPA = pct => pct >= 90 ? 4.0 : pct >= 80 ? 3.0 : pct >= 70 ? 2.0 : pct >= 60 ? 1.0 : 0.0;
  const letterGrade = pct => pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F";
  const gradeColor = pct => pct >= 90 ? "#4CAF8A" : pct >= 80 ? "#7C6FCD" : pct >= 70 ? "#D4A843" : "#E07C54";

  const getCourseGrade = (id) => {
    const cfg = configs[id];
    if (!cfg) return null;
    let earned = 0, totalWeight = 0;
    cfg.categories.forEach(cat => {
      if (cat.scores && cat.scores.length) {
        const avg = cat.scores.reduce((a,b) => a+b,0) / cat.scores.length;
        earned += (avg/100) * cat.weight;
        totalWeight += cat.weight;
      }
    });
    if (!totalWeight) return null;
    return (earned / totalWeight) * 100;
  };

  // Semester GPA weighted by credits
  const semGPA = (() => {
    let totalPoints = 0, totalCredits = 0;
    courses.forEach(c => {
      const g = getCourseGrade(c.id);
      if (g !== null) {
        totalPoints += gradeToGPA(g) * c.credits;
        totalCredits += c.credits;
      }
    });
    return totalCredits ? (totalPoints / totalCredits) : null;
  })();

  // Cumulative across both sems
  const allCourses = [...FALL_ORDER, ...SPRING_ORDER].map(id => COURSES[id]);
  const cumulativeGPA = (() => {
    let totalPoints = 0, totalCredits = 0;
    allCourses.forEach(c => {
      const g = getCourseGrade(c.id);
      if (g !== null) {
        totalPoints += gradeToGPA(g) * c.credits;
        totalCredits += c.credits;
      }
    });
    return totalCredits ? (totalPoints / totalCredits) : null;
  })();

  return (
    <div style={{ maxWidth:640 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:600, color:"#E8E8ED" }}>GPA Overview</h2>
        <div style={{ display:"flex", gap:8 }}>
          {["Fall 2026","Spring 2027"].map(s => (
            <button key={s} onClick={() => setSem(s)} style={{
              padding:"6px 14px", borderRadius:8,
              border:`1px solid ${sem===s ? "#7C6FCD" : "#2A2A2E"}`,
              background: sem===s ? "#7C6FCD20" : "transparent",
              color: sem===s ? "#7C6FCD" : "#6B6B70", fontSize:12, cursor:"pointer",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* GPA summary cards */}
      <div style={{ display:"flex", gap:12, marginBottom:28 }}>
        <div style={{ flex:1, background:"#141416", border:"1px solid #252528", borderRadius:12, padding:20 }}>
          <div style={{ fontSize:11, color:"#6B6B70", marginBottom:6 }}>{sem} GPA</div>
          <div style={{ fontSize:36, fontWeight:700, fontFamily:"JetBrains Mono,monospace", color: semGPA ? gradeColor(semGPA*25) : "#3A3A40" }}>
            {semGPA ? semGPA.toFixed(2) : "—"}
          </div>
          <div style={{ fontSize:11, color:"#4A4A52", marginTop:4 }}>based on grades entered</div>
        </div>
        <div style={{ flex:1, background:"#141416", border:"1px solid #252528", borderRadius:12, padding:20 }}>
          <div style={{ fontSize:11, color:"#6B6B70", marginBottom:6 }}>Cumulative GPA</div>
          <div style={{ fontSize:36, fontWeight:700, fontFamily:"JetBrains Mono,monospace", color: cumulativeGPA ? gradeColor(cumulativeGPA*25) : "#3A3A40" }}>
            {cumulativeGPA ? cumulativeGPA.toFixed(2) : "—"}
          </div>
          <div style={{ fontSize:11, color:"#4A4A52", marginTop:4 }}>both semesters combined</div>
        </div>
        <div style={{ flex:1, background:"#141416", border:"1px solid #252528", borderRadius:12, padding:20 }}>
          <div style={{ fontSize:11, color:"#6B6B70", marginBottom:6 }}>Target</div>
          <div style={{ fontSize:36, fontWeight:700, fontFamily:"JetBrains Mono,monospace", color:"#4CAF8A" }}>4.00</div>
          <div style={{ fontSize:11, color:"#4A4A52", marginTop:4 }}>Transfer goal</div>
        </div>
      </div>

      {/* Per-course table */}
      <div style={{ background:"#141416", border:"1px solid #252528", borderRadius:12, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 60px 80px 80px 80px", padding:"10px 16px", borderBottom:"1px solid #1E1E22" }}>
          {["Course","Cr","Grade","Letter","GPA pts"].map(h => (
            <div key={h} style={{ fontSize:10, color:"#4A4A52", fontFamily:"JetBrains Mono,monospace", textTransform:"uppercase" }}>{h}</div>
          ))}
        </div>
        {courses.map(c => {
          const g = getCourseGrade(c.id);
          const gpa = g !== null ? gradeToGPA(g) : null;
          return (
            <div key={c.id} style={{ display:"grid", gridTemplateColumns:"1fr 60px 80px 80px 80px", padding:"12px 16px", borderBottom:"1px solid #141416", alignItems:"center" }}>
              <div>
                <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color:c.color }}>{c.code}</div>
                <div style={{ fontSize:11, color:"#6B6B70" }}>{c.name}</div>
              </div>
              <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:12, color:"#6B6B70" }}>{c.credits}</div>
              <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:13, color: g ? gradeColor(g) : "#3A3A40" }}>
                {g ? `${g.toFixed(1)}%` : "—"}
              </div>
              <div style={{ fontSize:13, fontWeight:600, color: g ? gradeColor(g) : "#3A3A40" }}>
                {g ? letterGrade(g) : "—"}
              </div>
              <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:13, color: gpa !== null ? gradeColor(gpa*25) : "#3A3A40" }}>
                {gpa !== null ? gpa.toFixed(1) : "—"}
              </div>
            </div>
          );
        })}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 60px 80px 80px 80px", padding:"12px 16px", background:"#1A1A1E" }}>
          <div style={{ fontSize:12, color:"#A8A8B0", fontWeight:500 }}>Semester total</div>
          <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:12, color:"#E8E8ED" }}>
            {courses.reduce((a,c)=>a+c.credits,0)}
          </div>
          <div/>
          <div/>
          <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:14, fontWeight:700, color: semGPA ? gradeColor(semGPA*25) : "#3A3A40" }}>
            {semGPA ? semGPA.toFixed(2) : "—"}
          </div>
        </div>
      </div>

      <div style={{ marginTop:14, fontSize:11, color:"#4A4A52" }}>
        Enter grades in Grade Calculator → they'll appear here automatically.
      </div>
    </div>
  );
}

// ── GPA CALC ──────────────────────────────────────────────────────────────────
function GpaCalc() {
  const [configs,  setConfigs]  = useState(() => load("gpaConfigs", {}));
  const [selected, setSelected] = useState("MATH251");
  const [target,   setTarget]   = useState(90);

  const course = COURSES[selected];
  const cfg = configs[selected] || { categories:[
    { name:"Exams",    weight:60, scores:[] },
    { name:"Homework", weight:20, scores:[] },
    { name:"Quizzes",  weight:20, scores:[] },
  ]};

  const saveCfg = newCfg => {
    const n = { ...configs, [selected]: newCfg };
    setConfigs(n); save("gpaConfigs", n);
  };

  const gradeToGPA = pct => pct >= 90 ? 4.0 : pct >= 80 ? 3.0 : pct >= 70 ? 2.0 : pct >= 60 ? 1.0 : 0.0;
  const letterGrade = pct => pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F";

  const currentGrade = (() => {
    let earned = 0, totalWeight = 0;
    cfg.categories.forEach(cat => {
      if (cat.scores && cat.scores.length) {
        const avg = cat.scores.reduce((a,b)=>a+b,0)/cat.scores.length;
        earned += (avg/100)*cat.weight;
        totalWeight += cat.weight;
      }
    });
    if (!totalWeight) return null;
    return (earned/totalWeight)*100;
  })();

  const updateCat  = (i,field,val) => saveCfg({ ...cfg, categories: cfg.categories.map((c,j) => j===i ? {...c,[field]:val} : c) });
  const addScore   = (i,val)       => saveCfg({ ...cfg, categories: cfg.categories.map((c,j) => j===i ? {...c,scores:[...c.scores,val]} : c) });
  const removeScore= (i,si)        => saveCfg({ ...cfg, categories: cfg.categories.map((c,j) => j===i ? {...c,scores:c.scores.filter((_,k)=>k!==si)} : c) });
  const addCat     = ()            => saveCfg({ ...cfg, categories:[...cfg.categories,{name:"New",weight:0,scores:[]}] });
  const removeCat  = i             => saveCfg({ ...cfg, categories: cfg.categories.filter((_,j)=>j!==i) });

  const totalW = cfg.categories.reduce((a,b)=>a+(parseFloat(b.weight)||0),0);

  const fallCourses   = FALL_ORDER.map(id => COURSES[id]);
  const springCourses = SPRING_ORDER.map(id => COURSES[id]);

  return (
    <div style={{ maxWidth:600 }}>
      <h2 style={{ margin:"0 0 20px", fontSize:20, fontWeight:600, color:"#E8E8ED" }}>Grade Calculator</h2>

      <div style={{ marginBottom:8, fontSize:10, color:"#4A4A52", fontFamily:"JetBrains Mono,monospace", textTransform:"uppercase", letterSpacing:"0.06em" }}>Fall 2026</div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>
        {fallCourses.map(c => (
          <button key={c.id} onClick={()=>setSelected(c.id)} style={{
            padding:"6px 12px", borderRadius:8,
            border:`1px solid ${selected===c.id ? c.color : "#2A2A2E"}`,
            background: selected===c.id ? `${c.color}20` : "transparent",
            color: selected===c.id ? c.color : "#6B6B70", fontSize:12, cursor:"pointer", fontFamily:"JetBrains Mono,monospace",
          }}>{c.code}</button>
        ))}
      </div>
      <div style={{ marginBottom:8, fontSize:10, color:"#4A4A52", fontFamily:"JetBrains Mono,monospace", textTransform:"uppercase", letterSpacing:"0.06em" }}>Spring 2027</div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
        {springCourses.map(c => (
          <button key={c.id} onClick={()=>setSelected(c.id)} style={{
            padding:"6px 12px", borderRadius:8,
            border:`1px solid ${selected===c.id ? c.color : "#2A2A2E"}`,
            background: selected===c.id ? `${c.color}20` : "transparent",
            color: selected===c.id ? c.color : "#6B6B70", fontSize:12, cursor:"pointer", fontFamily:"JetBrains Mono,monospace",
          }}>{c.code}</button>
        ))}
      </div>

      {currentGrade !== null && (
        <div style={{ background:"#141416", border:"1px solid #252528", borderRadius:12, padding:20, marginBottom:20, display:"flex", alignItems:"center", gap:24 }}>
          <div>
            <div style={{ fontSize:11, color:"#6B6B70", marginBottom:4 }}>Current grade</div>
            <div style={{ fontSize:36, fontWeight:700, color:course.color, fontFamily:"JetBrains Mono,monospace" }}>{currentGrade.toFixed(1)}%</div>
          </div>
          <div style={{ width:1, height:48, background:"#252528" }}/>
          <div>
            <div style={{ fontSize:11, color:"#6B6B70", marginBottom:4 }}>Letter / GPA</div>
            <div style={{ fontSize:24, fontWeight:700, color:"#E8E8ED" }}>{letterGrade(currentGrade)} · {gradeToGPA(currentGrade).toFixed(1)}</div>
          </div>
        </div>
      )}

      <div style={{ marginBottom:16 }}>
        {cfg.categories.map((cat,i) => {
          const ScoreRow = () => {
            const [scoreInput, setScoreInput] = useState("");
            const avg = cat.scores && cat.scores.length ? cat.scores.reduce((a,b)=>a+b,0)/cat.scores.length : null;
            return (
              <div style={{ background:"#141416", border:"1px solid #1E1E22", borderRadius:12, padding:16, marginBottom:10 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12 }}>
                  <input value={cat.name} onChange={e=>updateCat(i,"name",e.target.value)}
                    style={{ flex:1, background:"transparent", border:"none", color:"#E8E8ED", fontSize:14, fontWeight:500, outline:"none" }}/>
                  <input type="number" value={cat.weight} onChange={e=>updateCat(i,"weight",parseFloat(e.target.value)||0)}
                    style={{ width:56, background:"#0D0D0F", border:"1px solid #252528", borderRadius:6, color:"#E8E8ED", fontSize:13, padding:"4px 8px", outline:"none", textAlign:"right", fontFamily:"JetBrains Mono,monospace" }}/>
                  <span style={{ fontSize:12, color:"#6B6B70" }}>%</span>
                  {avg !== null && <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:13, color:course.color }}>{avg.toFixed(1)}%</span>}
                  <button onClick={()=>removeCat(i)} style={{ background:"none", border:"none", color:"#6B6B70", cursor:"pointer", padding:4 }}><Icon n="trash" size={14}/></button>
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                  {(cat.scores||[]).map((sc,si) => (
                    <button key={si} onClick={()=>removeScore(i,si)} title="click to remove" style={{
                      padding:"3px 10px", borderRadius:6, border:"1px solid #252528", background:"#1E1E22",
                      color:"#E8E8ED", fontSize:12, cursor:"pointer", fontFamily:"JetBrains Mono,monospace",
                    }}>{sc}</button>
                  ))}
                  <input value={scoreInput} onChange={e=>setScoreInput(e.target.value)}
                    onKeyDown={e=>{ if(e.key==="Enter"){ const v=parseFloat(scoreInput); if(!isNaN(v)){ addScore(i,v); setScoreInput(""); }}}}
                    placeholder="add score…"
                    style={{ width:90, background:"transparent", border:"1px dashed #2A2A2E", borderRadius:6, padding:"3px 8px", color:"#E8E8ED", fontSize:12, outline:"none" }}/>
                </div>
              </div>
            );
          };
          return <ScoreRow key={i}/>;
        })}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <button onClick={addCat} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"1px dashed #2A2A2E", borderRadius:8, padding:"8px 14px", color:"#6B6B70", fontSize:12, cursor:"pointer" }}>
            <Icon n="plus" size={14}/> Add category
          </button>
          <div style={{ fontSize:12, color: totalW===100 ? "#4CAF8A" : "#E07C54" }}>
            {totalW.toFixed(0)}% {totalW!==100 ? "(must sum to 100)" : "✓"}
          </div>
        </div>
      </div>

      <div style={{ background:"#141416", border:"1px solid #252528", borderRadius:12, padding:16 }}>
        <div style={{ fontSize:12, color:"#6B6B70", marginBottom:12 }}>What score do I need?</div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:13, color:"#A8A8B0" }}>Target:</span>
          <input type="number" value={target} onChange={e=>setTarget(parseFloat(e.target.value)||0)}
            style={{ width:64, background:"#0D0D0F", border:"1px solid #252528", borderRadius:6, padding:"4px 8px", color:"#E8E8ED", fontSize:13, outline:"none", fontFamily:"JetBrains Mono,monospace" }}/>
          <span style={{ fontSize:13, color:"#6B6B70" }}>% ({letterGrade(target)})</span>
        </div>
        {currentGrade !== null && (
          <div style={{ marginTop:12, fontSize:13, color:"#E8E8ED" }}>
            {currentGrade >= target
              ? <span style={{ color:"#4CAF8A" }}>Already at {currentGrade.toFixed(1)}% — above target.</span>
              : <span>Need to average <span style={{ color:course.color, fontWeight:600 }}>{Math.min(((target - currentGrade*(totalW/100)) / (1 - totalW/100)),100).toFixed(1)}%+</span> on remaining work.</span>
            }
          </div>
        )}
      </div>
    </div>
  );
}

// ── FOCUS TIMER ───────────────────────────────────────────────────────────────
function FocusTimer() {
  const PRESETS = [{ label:"Pomodoro", mins:25 }, { label:"Deep Work", mins:50 }];
  const [preset,    setPreset]    = useState(0);
  const [custom,    setCustom]    = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [course,    setCourse]    = useState("MATH251");
  const [running,   setRunning]   = useState(false);
  const [remaining, setRemaining] = useState(null);
  const [log,       setLog]       = useState(() => load("timerLog", []));
  const interval = useRef(null);

  const totalSecs = useCustom ? (parseInt(custom)||0)*60 : PRESETS[preset].mins*60;

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            clearInterval(interval.current);
            setRunning(false);
            const entry = {
              id: Date.now(), date: new Date().toLocaleDateString(), course,
              duration: useCustom ? parseInt(custom) : PRESETS[preset].mins,
              label: useCustom ? "Custom" : PRESETS[preset].label,
            };
            setLog(l => { const nl=[entry,...l]; save("timerLog",nl); return nl; });
            return 0;
          }
          return r-1;
        });
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [running]);

  const start = () => { setRemaining(totalSecs); setRunning(true); };
  const stop  = () => { clearInterval(interval.current); setRunning(false); setRemaining(null); };

  const pct  = remaining !== null ? (1-remaining/totalSecs)*100 : 0;
  const mins = remaining !== null ? Math.floor(remaining/60) : (useCustom ? (parseInt(custom)||0) : PRESETS[preset].mins);
  const secs = remaining !== null ? remaining%60 : 0;
  const R=80, C=2*Math.PI*R;

  const allCourses = [...FALL_ORDER,...SPRING_ORDER].map(id=>COURSES[id]);

  return (
    <div style={{ maxWidth:560 }}>
      <h2 style={{ margin:"0 0 24px", fontSize:20, fontWeight:600, color:"#E8E8ED" }}>Focus Timer</h2>

      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {PRESETS.map((p,i) => (
          <button key={i} onClick={() => { setPreset(i); setUseCustom(false); if(!running) setRemaining(null); }} style={{
            padding:"8px 16px", borderRadius:8,
            border:`1px solid ${!useCustom && preset===i ? "#7C6FCD" : "#2A2A2E"}`,
            background: !useCustom && preset===i ? "#7C6FCD20" : "transparent",
            color: !useCustom && preset===i ? "#7C6FCD" : "#6B6B70", fontSize:13, cursor:"pointer",
          }}>{p.label} · {p.mins}m</button>
        ))}
        <div style={{ display:"flex", border:`1px solid ${useCustom ? "#7C6FCD" : "#2A2A2E"}`, borderRadius:8, overflow:"hidden" }}>
          <button onClick={() => { setUseCustom(true); if(!running) setRemaining(null); }} style={{
            padding:"8px 12px", border:"none", background: useCustom ? "#7C6FCD20" : "transparent",
            color: useCustom ? "#7C6FCD" : "#6B6B70", fontSize:13, cursor:"pointer",
          }}>Custom</button>
          {useCustom && <input value={custom} onChange={e=>{setCustom(e.target.value.replace(/\D/,"")); setRemaining(null);}}
            placeholder="min" style={{ width:48, background:"transparent", border:"none", borderLeft:"1px solid #252528", padding:"0 8px", color:"#E8E8ED", fontSize:13, outline:"none" }}/>}
        </div>
      </div>

      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:11, color:"#6B6B70", marginBottom:8 }}>Tag to course</div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {allCourses.map(c => (
            <button key={c.id} onClick={()=>setCourse(c.id)} style={{
              padding:"6px 12px", borderRadius:6, fontSize:12,
              border:`1px solid ${course===c.id ? c.color : "#2A2A2E"}`,
              background: course===c.id ? `${c.color}20` : "transparent",
              color: course===c.id ? c.color : "#6B6B70", cursor:"pointer", fontFamily:"JetBrains Mono,monospace",
            }}>{c.code}</button>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:28 }}>
        <svg width={200} height={200} style={{ transform:"rotate(-90deg)" }}>
          <circle cx={100} cy={100} r={R} fill="none" stroke="#1E1E22" strokeWidth={8}/>
          <circle cx={100} cy={100} r={R} fill="none" stroke={COURSES[course].color} strokeWidth={8}
            strokeDasharray={C} strokeDashoffset={C*(1-pct/100)} strokeLinecap="round"
            style={{ transition:"stroke-dashoffset 0.5s linear" }}/>
        </svg>
        <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:40, fontWeight:700, color:"#E8E8ED", marginTop:-110, letterSpacing:"-0.02em" }}>
          {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
        </div>
        <div style={{ fontSize:12, color:"#6B6B70", marginTop:54 }}>
          {running ? COURSES[course].code : useCustom ? `${custom||0}m custom` : PRESETS[preset].label}
        </div>
      </div>

      <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
        {!running
          ? <button onClick={start} disabled={totalSecs===0} style={{ padding:"12px 32px", borderRadius:10, background:"#7C6FCD", border:"none", color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer" }}>Start</button>
          : <button onClick={stop} style={{ padding:"12px 32px", borderRadius:10, background:"#252528", border:"none", color:"#E8E8ED", fontSize:14, cursor:"pointer" }}>Stop</button>
        }
      </div>

      {log.length > 0 && (
        <div style={{ marginTop:32 }}>
          <div style={{ fontSize:11, color:"#6B6B70", marginBottom:12 }}>Session log</div>
          {log.slice(0,10).map(s => (
            <div key={s.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", background:"#141416", borderRadius:8, border:"1px solid #1E1E22", marginBottom:6 }}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color:COURSES[s.course]?.color||"#7C6FCD" }}>{COURSES[s.course]?.code||s.course}</span>
                <span style={{ fontSize:12, color:"#A8A8B0" }}>{s.label}</span>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:12, color:"#E8E8ED" }}>{s.duration}m</span>
                <span style={{ fontSize:11, color:"#6B6B70" }}>{s.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── WEEKLY TASKS ──────────────────────────────────────────────────────────────
function WeeklyTasks() {
  const [tasks,     setTasks]     = useState(() => load("weeklyTasks", generateInitialTasks()));
  const [newTask,   setNewTask]   = useState("");
  const [newCourse, setNewCourse] = useState("MATH251");
  const [filterWeek,setFilterWeek]= useState(null);

  const nowWeek = getCurrentSummerWeek();

  function generateInitialTasks() {
    const out = [];
    SUMMER_PLAN.forEach(w => {
      const parts = w.focus.split("·").map(s => s.trim());
      parts.forEach(p => {
        out.push({ id:`seed-w${w.week}-${p}`, week:w.week, dates:w.dates, text:p, done:false, course:null });
      });
      out.push({
        id:`email-w${w.week}`,
        week:w.week, dates:w.dates,
        text:"📧 Email 100 professors — research cold outreach (track in spreadsheet)",
        done:false, course:null, pinned:true,
      });
    });
    return out;
  }

  const toggle = id => { const n=tasks.map(t=>t.id===id?{...t,done:!t.done}:t); setTasks(n); save("weeklyTasks",n); };
  const del    = id => { const n=tasks.filter(t=>t.id!==id); setTasks(n); save("weeklyTasks",n); };

  const addTask = () => {
    if (!newTask.trim()) return;
    const t = { id:Date.now(), week:filterWeek||nowWeek, dates:"Custom", text:newTask.trim(), done:false, course:newCourse };
    const n = [...tasks,t]; setTasks(n); save("weeklyTasks",n); setNewTask("");
  };

  const weeks = [...new Set(tasks.map(t=>t.week))].sort((a,b)=>a-b);
  const displayed = filterWeek ? tasks.filter(t=>t.week===filterWeek) : tasks;

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:600, color:"#E8E8ED" }}>Summer Pre-Study Plan</h2>
        <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color:"#7C6FCD" }}>
          ▶ Week {nowWeek} of 13
        </div>
      </div>

      <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:20 }}>
        <button onClick={()=>setFilterWeek(null)} style={{
          padding:"5px 12px", borderRadius:6,
          border:`1px solid ${filterWeek===null ? "#7C6FCD" : "#2A2A2E"}`,
          background: filterWeek===null ? "#7C6FCD20" : "transparent",
          color: filterWeek===null ? "#7C6FCD" : "#6B6B70", fontSize:12, cursor:"pointer",
        }}>All</button>
        {weeks.map(w => (
          <button key={w} onClick={()=>setFilterWeek(filterWeek===w ? null : w)} style={{
            padding:"5px 12px", borderRadius:6,
            border:`1px solid ${filterWeek===w ? "#7C6FCD" : w===nowWeek ? "#7C6FCD60" : "#1E1E22"}`,
            background: filterWeek===w ? "#7C6FCD20" : w===nowWeek ? "#7C6FCD0D" : "transparent",
            color: filterWeek===w ? "#7C6FCD" : w===nowWeek ? "#C8B8FF" : "#6B6B70",
            fontSize:12, cursor:"pointer", fontFamily:"JetBrains Mono,monospace",
          }}>{w===0 ? "Custom" : `W${w}`}{w===nowWeek ? " ◀" : ""}</button>
        ))}
      </div>

      {(() => {
        const grouped = {};
        displayed.forEach(t => {
          if (!grouped[t.week]) grouped[t.week] = { dates:t.dates, tasks:[] };
          grouped[t.week].tasks.push(t);
        });
        return Object.entries(grouped).sort(([a],[b])=>parseInt(a)-parseInt(b)).map(([wk,g]) => {
          const done = g.tasks.filter(t=>t.done).length;
          const isCurrent = parseInt(wk)===nowWeek;
          return (
            <div key={wk} style={{ marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:8, paddingBottom:8, borderBottom:`1px solid ${isCurrent ? "#7C6FCD30" : "#1E1E22"}` }}>
                <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, fontWeight:700, color: isCurrent ? "#7C6FCD" : "#6B6B70" }}>
                  {wk==="0" ? "Custom" : `Week ${wk}`}{isCurrent ? " · NOW" : ""}
                </span>
                {g.dates!=="Custom" && <span style={{ fontSize:11, color:"#4A4A52" }}>{g.dates}</span>}
                <span style={{ fontSize:11, color: done===g.tasks.length ? "#4CAF8A" : "#6B6B70", marginLeft:"auto", fontFamily:"JetBrains Mono,monospace" }}>
                  {done}/{g.tasks.length}
                </span>
              </div>
              {g.tasks.map(t => (
                <div key={t.id} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"7px 0", borderBottom:"1px solid #141416" }}>
                  <Checkbox checked={t.done} onChange={()=>toggle(t.id)} color={t.pinned ? "#F0A429" : "#7C6FCD"}/>
                  <span style={{ flex:1, fontSize:13, color: t.done ? "#4A4A52" : t.pinned ? "#E8D48B" : "#C8C8D0", textDecoration: t.done ? "line-through" : "none", lineHeight:1.4 }}>{t.text}</span>
                  <button onClick={()=>del(t.id)} style={{ background:"none", border:"none", color:"#3A3A40", cursor:"pointer", padding:2 }}><Icon n="trash" size={13}/></button>
                </div>
              ))}
            </div>
          );
        });
      })()}

      <div style={{ marginTop:24, display:"flex", gap:8, background:"#141416", border:"1px solid #252528", borderRadius:10, padding:12 }}>
        <select value={newCourse} onChange={e=>setNewCourse(e.target.value)} style={{ background:"#0D0D0F", border:"1px solid #252528", borderRadius:6, color:"#E8E8ED", fontSize:12, padding:"4px 6px", outline:"none", fontFamily:"JetBrains Mono,monospace" }}>
          {[...FALL_ORDER,...SPRING_ORDER].map(id => <option key={id} value={id}>{COURSES[id].code}</option>)}
        </select>
        <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()}
          placeholder="Add a task…" style={{ flex:1, background:"transparent", border:"none", color:"#E8E8ED", fontSize:13, outline:"none" }}/>
        <button onClick={addTask} style={{ background:"#7C6FCD", border:"none", borderRadius:6, padding:"6px 14px", color:"#fff", fontSize:12, cursor:"pointer" }}>Add</button>
      </div>
    </div>
  );
}

// ── WORKOUT ───────────────────────────────────────────────────────────────────
function Workout() {
  const [checked,   setChecked]   = useState(() => load("workoutChecked", {}));
  const [activeDay, setActiveDay] = useState(0);

  const toggle = key => { const n={...checked,[key]:!checked[key]}; setChecked(n); save("workoutChecked",n); };

  const day    = WORKOUT_PLAN[activeDay];
  const dayKey = `day${activeDay}`;
  const total  = day.exercises.length;
  const done   = day.exercises.filter((_,i)=>checked[`${dayKey}-${i}`]).length;

  const resetDay = () => {
    const n={...checked};
    day.exercises.forEach((_,i)=>delete n[`${dayKey}-${i}`]);
    setChecked(n); save("workoutChecked",n);
  };

  return (
    <div style={{ maxWidth:520 }}>
      <h2 style={{ margin:"0 0 24px", fontSize:20, fontWeight:600, color:"#E8E8ED" }}>Workout Plan</h2>

      <div style={{ display:"flex", gap:8, marginBottom:24 }}>
        {WORKOUT_PLAN.map((d,i) => {
          const dk=`day${i}`;
          const dDone=d.exercises.filter((_,j)=>checked[`${dk}-${j}`]).length;
          const complete=dDone===d.exercises.length;
          return (
            <button key={i} onClick={()=>setActiveDay(i)} style={{
              flex:1, padding:"10px 8px", borderRadius:10,
              border:`1px solid ${activeDay===i ? "#7C6FCD" : complete ? "#4CAF8A40" : "#2A2A2E"}`,
              background: activeDay===i ? "#7C6FCD15" : complete ? "#4CAF8A10" : "#141416",
              cursor:"pointer", textAlign:"center",
            }}>
              <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, color: activeDay===i ? "#7C6FCD" : complete ? "#4CAF8A" : "#6B6B70", marginBottom:4 }}>{d.day}</div>
              <div style={{ fontSize:11, color: activeDay===i ? "#E8E8ED" : "#A8A8B0", fontWeight:500 }}>{d.title}</div>
              <div style={{ fontSize:10, color:"#6B6B70", marginTop:4 }}>{dDone}/{d.exercises.length}</div>
            </button>
          );
        })}
      </div>

      <div style={{ background:"#141416", border:"1px solid #252528", borderRadius:12, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"#7C6FCD", marginBottom:4 }}>{day.day.toUpperCase()}</div>
            <div style={{ fontSize:16, fontWeight:600, color:"#E8E8ED" }}>{day.title}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:13, color: done===total ? "#4CAF8A" : "#6B6B70" }}>{done}/{total}</div>
            <button onClick={resetDay} style={{ background:"none", border:"1px solid #2A2A2E", borderRadius:6, padding:"4px 10px", color:"#6B6B70", fontSize:11, cursor:"pointer" }}>Reset</button>
          </div>
        </div>

        <div style={{ height:3, background:"#1E1E22", borderRadius:2, marginBottom:20, overflow:"hidden" }}>
          <div style={{ width:`${(done/total)*100}%`, height:"100%", background:"#7C6FCD", borderRadius:2, transition:"width 0.3s" }}/>
        </div>

        {day.exercises.map((ex,i) => {
          const key=`${dayKey}-${i}`;
          const isDone=checked[key];
          return (
            <div key={i} onClick={()=>toggle(key)} style={{
              display:"flex", alignItems:"center", gap:14, padding:"12px 0",
              borderBottom: i<day.exercises.length-1 ? "1px solid #1E1E22" : "none",
              cursor:"pointer",
            }}>
              <Checkbox checked={isDone} onChange={()=>toggle(key)} color="#7C6FCD"/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, color: isDone ? "#4A4A52" : "#E8E8ED", textDecoration: isDone ? "line-through" : "none", marginBottom:2 }}>{ex.name}</div>
                <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color: isDone ? "#3A3A40" : "#7C6FCD" }}>{ex.sets} × {ex.reps}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id:"hub",         label:"Course Hub",       icon:"book" },
  { id:"cal",         label:"Exam Calendar",    icon:"cal"  },
  { id:"gpa-overview",label:"GPA Overview",     icon:"gpa"  },
  { id:"gpa",         label:"Grade Calculator", icon:"calc" },
  { id:"timer",       label:"Focus Timer",      icon:"timer"},
  { id:"tasks",       label:"Tasks",            icon:"tasks"},
  { id:"workout",     label:"Workout",          icon:"gym"  },
];

export default function App() {
  const [tab, setTab] = useState("hub");
  return (
    <div style={{ display:"flex", height:"100vh", background:"#0D0D0F", color:"#E8E8ED", fontFamily:"'Inter',-apple-system,sans-serif" }}>
      <div style={{ width:210, borderRight:"1px solid #1A1A1E", display:"flex", flexDirection:"column", padding:"20px 12px", flexShrink:0 }}>
        <div style={{ marginBottom:28, padding:"0 8px" }}>
          <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:13, fontWeight:700, color:"#E8E8ED", letterSpacing:"-0.01em" }}>study.os</div>
          <div style={{ fontSize:10, color:"#4A4A52", marginTop:2, fontFamily:"JetBrains Mono,monospace" }}>TAMU · Fall 2026</div>
        </div>
        {NAV.map(n => (
          <button key={n.id} onClick={()=>setTab(n.id)} style={{
            display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:8,
            border:"none", background: tab===n.id ? "#1E1E22" : "transparent",
            color: tab===n.id ? "#E8E8ED" : "#6B6B70", fontSize:13, cursor:"pointer", marginBottom:2, textAlign:"left", width:"100%",
          }}>
            <span style={{ color: tab===n.id ? "#7C6FCD" : "inherit" }}><Icon n={n.icon} size={15}/></span>
            {n.label}
          </button>
        ))}
        <div style={{ marginTop:"auto", padding:"0 8px" }}>
          <div style={{ height:1, background:"#1A1A1E", marginBottom:12 }}/>
          <div style={{ fontSize:11, color:"#4A4A52" }}>Phase 1 · v1.2</div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:32 }}>
        {tab==="hub"          && <CourseHub/>}
        {tab==="cal"          && <CalendarView/>}
        {tab==="gpa-overview" && <OverallGPA/>}
        {tab==="gpa"          && <GpaCalc/>}
        {tab==="timer"        && <FocusTimer/>}
        {tab==="tasks"        && <WeeklyTasks/>}
        {tab==="workout"      && <Workout/>}
      </div>
    </div>
  );
}