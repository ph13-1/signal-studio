import { useState, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#0a0a0a;--surface:#111;--surface2:#181818;
  --border:#242424;--border2:#2e2e2e;
  --amber:#f5a623;--amber-dim:#f5a62320;--amber-mid:#f5a62355;
  --green:#22c55e;--red:#ef4444;--text:#e8e4dc;--muted:#5a5a5a;--muted2:#3a3a3a;
  --twitter:#1d9bf0;--linkedin:#0a66c2;--instagram:#e1306c;--youtube:#ff0000;
}
html,body,#root{height:100%;background:var(--bg);}
.app{display:grid;grid-template-rows:56px 1fr;height:100vh;font-family:'IBM Plex Mono',monospace;color:var(--text);background:var(--bg);overflow:hidden;}

/* TOPBAR */
.topbar{display:flex;align-items:center;padding:0 24px;border-bottom:1px solid var(--border);background:var(--surface);position:relative;z-index:20;}
.brand{display:flex;align-items:baseline;gap:10px;margin-right:32px;}
.brand-word{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:3px;color:var(--amber);}
.brand-sub{font-size:9px;letter-spacing:3px;color:var(--muted);text-transform:uppercase;}
.nav-tabs{display:flex;height:100%;}
.nav-tab{padding:0 20px;height:100%;display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);cursor:pointer;border:none;background:none;font-family:'IBM Plex Mono',monospace;border-bottom:2px solid transparent;transition:all .15s;white-space:nowrap;}
.nav-tab:hover{color:var(--text);}
.nav-tab.active{color:var(--amber);border-bottom-color:var(--amber);}
.topbar-right{margin-left:auto;display:flex;align-items:center;gap:12px;}
.status-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:blink 2s infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.status-label{font-size:10px;color:var(--muted);letter-spacing:1px;}

/* BODY */
.body{display:grid;grid-template-columns:380px 1fr;overflow:hidden;}

/* LEFT PANEL */
.left-panel{border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;background:var(--surface);}
.panel-header{padding:16px 20px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.panel-title{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--muted);}
.panel-scroll{flex:1;overflow-y:auto;padding:20px;scrollbar-width:thin;scrollbar-color:var(--border2) transparent;}

/* INPUT SWITCHER */
.input-switcher{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;background:var(--bg);border-radius:8px;padding:4px;margin-bottom:20px;}
.switcher-btn{padding:8px 4px;border-radius:6px;border:none;background:transparent;color:var(--muted);font-size:9px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;font-family:'IBM Plex Mono',monospace;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:5px;}
.switcher-btn .s-icon{font-size:16px;}
.switcher-btn:hover{color:var(--text);}
.switcher-btn.active{background:var(--surface2);color:var(--amber);}

/* FORM */
.form-group{margin-bottom:16px;}
.form-label{display:block;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:7px;}
.form-input,.form-textarea,.form-select{width:100%;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:'IBM Plex Mono',monospace;font-size:12px;padding:10px 12px;outline:none;transition:border-color .15s;resize:none;}
.form-input:focus,.form-textarea:focus,.form-select:focus{border-color:var(--amber);box-shadow:0 0 0 2px var(--amber-dim);}
.form-textarea{min-height:110px;line-height:1.6;}
.form-select option{background:var(--surface);}

/* PLATFORMS */
.platforms-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px;}
.platform-btn{display:flex;align-items:center;gap:10px;padding:11px 13px;border-radius:8px;border:1px solid var(--border);background:var(--bg);cursor:pointer;transition:all .15s;font-family:'IBM Plex Mono',monospace;}
.platform-btn:hover{border-color:var(--border2);}
.platform-btn.sel-twitter{border-color:var(--twitter);background:#1d9bf010;}
.platform-btn.sel-linkedin{border-color:var(--linkedin);background:#0a66c210;}
.platform-btn.sel-instagram{border-color:var(--instagram);background:#e1306c10;}
.platform-btn.sel-youtube{border-color:var(--youtube);background:#ff000010;}
.p-icon{font-size:18px;}
.p-info{flex:1;}
.p-name{font-size:11px;color:var(--text);font-weight:500;}
.p-value{font-size:9px;color:var(--muted);margin-top:1px;}
.p-check{font-size:12px;color:var(--amber);}

/* VOICE */
.voice-center{display:flex;flex-direction:column;align-items:center;padding:20px 0;gap:16px;}
.mic-btn{width:80px;height:80px;border-radius:50%;border:2px solid var(--border2);background:var(--bg);color:var(--text);font-size:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.mic-btn.rec{border-color:var(--red);background:#ef444415;animation:mic-pulse 1.2s infinite;}
@keyframes mic-pulse{0%,100%{box-shadow:0 0 0 0 #ef444440}50%{box-shadow:0 0 0 16px transparent}}
.voice-hint{font-size:10px;color:var(--muted);letter-spacing:1px;}
.transcript-area{width:100%;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:12px;font-style:italic;color:var(--text);line-height:1.7;min-height:60px;}

/* URL */
.url-area{display:flex;gap:8px;}
.url-btn{padding:10px 14px;background:var(--amber);color:var(--bg);border:none;border-radius:6px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap;transition:opacity .15s;}
.url-btn:hover{opacity:.85;}
.url-btn:disabled{opacity:.4;cursor:not-allowed;}

/* UPLOAD */
.upload-zone{border:1.5px dashed var(--border2);border-radius:10px;padding:32px 20px;text-align:center;cursor:pointer;transition:all .2s;background:var(--bg);}
.upload-zone:hover,.upload-zone.drag{border-color:var(--amber);background:var(--amber-dim);}
.upload-icon{font-size:32px;margin-bottom:10px;opacity:.5;}
.upload-text{font-size:11px;color:var(--muted);line-height:1.6;}
.upload-sub{font-size:10px;color:var(--muted2);margin-top:6px;}
.file-pill{display:inline-flex;align-items:center;gap:8px;background:var(--amber-dim);border:1px solid var(--amber-mid);border-radius:20px;padding:5px 12px;font-size:11px;color:var(--amber);margin-top:10px;}

/* GENERATE BTN */
.gen-btn{width:100%;padding:14px;background:var(--amber);color:var(--bg);border:none;border-radius:8px;font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;gap:10px;margin-top:4px;}
.gen-btn:hover:not(:disabled){background:#fbbf24;transform:translateY(-1px);}
.gen-btn:disabled{opacity:.4;cursor:not-allowed;transform:none;}
.gen-btn.loading{background:var(--surface2);color:var(--amber);border:1px solid var(--amber-mid);}
@keyframes spin{to{transform:rotate(360deg)}}
.spinner{display:inline-block;animation:spin 1s linear infinite;}

.divider{height:1px;background:var(--border);margin:16px 0;}

/* RIGHT PANEL */
.right-panel{display:flex;flex-direction:column;overflow:hidden;background:var(--bg);}
.right-header{padding:14px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--surface);}
.output-tabs{display:flex;gap:4px;}
.output-tab{padding:6px 14px;border-radius:6px;border:1px solid transparent;background:none;color:var(--muted);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;font-family:'IBM Plex Mono',monospace;transition:all .15s;}
.output-tab:hover{color:var(--text);}
.output-tab.active{background:var(--surface2);border-color:var(--border2);color:var(--text);}
.right-scroll{flex:1;overflow-y:auto;padding:24px;scrollbar-width:thin;scrollbar-color:var(--border2) transparent;}

/* OUTPUT CARDS */
.output-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
.output-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;transition:border-color .2s;}
.output-card:hover{border-color:var(--border2);}
.output-card.wide{grid-column:span 2;}
.card-head{padding:13px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);}
.card-platform{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:500;}
.platform-pip{width:8px;height:8px;border-radius:50%;}
.card-meta{display:flex;gap:8px;align-items:center;}
.value-tag{font-size:10px;color:var(--green);font-family:'IBM Plex Mono',monospace;background:#22c55e12;border:1px solid #22c55e30;padding:2px 8px;border-radius:4px;}
.copy-btn{padding:4px 10px;border-radius:5px;border:1px solid var(--border2);background:var(--surface2);color:var(--muted);font-size:10px;cursor:pointer;font-family:'IBM Plex Mono',monospace;transition:all .15s;}
.copy-btn:hover{color:var(--text);border-color:var(--muted);}
.copy-btn.ok{color:var(--green);border-color:var(--green);}
.card-body{padding:16px;font-family:'Lora',serif;font-size:13px;line-height:1.75;color:var(--text);flex:1;white-space:pre-wrap;word-break:break-word;}

/* SKELETON */
.skel-wrap{padding:16px;}
.skel-line{height:12px;border-radius:4px;background:linear-gradient(90deg,var(--surface2) 25%,var(--border) 50%,var(--surface2) 75%);background-size:200%;animation:skel 1.3s infinite;margin-bottom:10px;}
@keyframes skel{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* EMPTY STATE */
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;padding:40px;}
.empty-ascii{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted2);line-height:1.4;text-align:center;letter-spacing:2px;}
.empty-title{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:4px;color:var(--muted);}
.empty-sub{font-size:11px;color:var(--muted2);text-align:center;max-width:320px;line-height:1.7;}

/* STATS BAR */
.stats-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:24px;}
.stat-cell{background:var(--surface);padding:16px 20px;}
.stat-val{font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--amber);letter-spacing:2px;}
.stat-lbl{font-size:9px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-top:3px;}

/* PLAYBOOK */
.playbook{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-top:16px;}
.playbook-header{padding:14px 20px;border-bottom:1px solid var(--border);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--amber);}
.playbook-row{display:grid;grid-template-columns:28px 1fr 90px 90px;gap:16px;padding:13px 20px;border-bottom:1px solid var(--border);align-items:center;transition:background .1s;}
.playbook-row:last-child{border-bottom:none;}
.playbook-row:hover{background:var(--surface2);}
.p-step{font-size:10px;color:var(--muted);font-weight:600;}
.p-action{font-family:'Lora',serif;font-size:12px;color:var(--text);}
.p-platform{font-size:10px;color:var(--muted);}
.p-earn{font-size:11px;color:var(--green);text-align:right;font-weight:600;}

/* MONO CARDS */
.mono-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
.mono-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;transition:border-color .15s;}
.mono-card:hover{border-color:var(--amber-mid);}
.mono-card-icon{font-size:24px;margin-bottom:12px;font-family:'Bebas Neue',sans-serif;letter-spacing:2px;}
.mono-card-title{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--amber);margin-bottom:8px;}
.mono-card-body{font-size:12px;color:var(--muted);line-height:1.7;font-family:'Lora',serif;}
.mono-card-roi{margin-top:14px;padding-top:12px;border-top:1px solid var(--border);font-size:10px;color:var(--green);font-weight:500;letter-spacing:1px;}

/* HISTORY */
.hist-list{display:flex;flex-direction:column;gap:8px;}
.hist-item{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:14px 18px;display:flex;align-items:center;gap:16px;cursor:pointer;transition:border-color .15s;}
.hist-item:hover{border-color:var(--amber-mid);}
.hist-dot{width:8px;height:8px;border-radius:50%;background:var(--amber);flex-shrink:0;}
.hist-info{flex:1;}
.hist-title{font-size:13px;color:var(--text);margin-bottom:4px;font-family:'Lora',serif;}
.hist-meta{font-size:10px;color:var(--muted);display:flex;gap:12px;}
.hist-val{font-family:'Bebas Neue',sans-serif;font-size:20px;color:var(--amber);letter-spacing:1px;}

/* ERROR */
.error-bar{background:#ef444415;border:1px solid #ef444440;border-radius:8px;padding:12px 16px;font-size:11px;color:#ef9999;margin-bottom:16px;line-height:1.6;}
`;

const PLATFORMS = [
  { id:"twitter",   label:"Twitter / X",   icon:"𝕏",  pip:"#1d9bf0", value:"$150–500/post",  cls:"sel-twitter"  },
  { id:"linkedin",  label:"LinkedIn",       icon:"in",  pip:"#0a66c2", value:"$400–2k/post",   cls:"sel-linkedin" },
  { id:"instagram", label:"Instagram",      icon:"◉",  pip:"#e1306c", value:"$200–800/post",  cls:"sel-instagram"},
  { id:"youtube",   label:"YouTube Script", icon:"▶",  pip:"#ff0000", value:"$800–5k/video",  cls:"sel-youtube"  },
];

const PLAYBOOK = [
  {step:"01", action:"Post Twitter thread to grow audience",         platform:"Twitter/X",     earn:"Audience growth"},
  {step:"02", action:"Cross-post LinkedIn long-form version",        platform:"LinkedIn",      earn:"Inbound leads"},
  {step:"03", action:"Turn thread into Instagram carousel",          platform:"Instagram",     earn:"Brand deals"},
  {step:"04", action:"Record YouTube video from the script",         platform:"YouTube",       earn:"$2–7 RPM ads"},
  {step:"05", action:"Email list gets exclusive deep-dive",          platform:"Newsletter",    earn:"$30–100 CPM"},
  {step:"06", action:"Package into paid digital product",            platform:"Gumroad/etc",   earn:"$97–497/sale"},
];

const HISTORY = [
  {title:"Why most creators never monetize (and how to fix it)", platforms:["Twitter","LinkedIn"],          date:"Mar 9",  value:"$680"},
  {title:"The 5AM content system that changed my business",      platforms:["YouTube","Instagram"],         date:"Mar 6",  value:"$1,200"},
  {title:"I analyzed 100 viral posts. Here's the pattern",       platforms:["Twitter","LinkedIn","Instagram"],date:"Mar 2", value:"$940"},
];

function Skeleton() {
  return (
    <div className="skel-wrap">
      {[90,70,85,55,80,65].map((w,i)=>(
        <div key={i} className="skel-line" style={{width:`${w}%`,animationDelay:`${i*0.09}s`}}/>
      ))}
    </div>
  );
}

export default function App() {
  const [tab,       setTab]       = useState("create");
  const [outTab,    setOutTab]    = useState("outputs");
  const [inputMode, setInputMode] = useState("text");
  const [selected,  setSelected]  = useState(["twitter","linkedin","youtube"]);
  const [topic,     setTopic]     = useState("");
  const [notes,     setNotes]     = useState("");
  const [tone,      setTone]      = useState("authoritative");
  const [cta,       setCta]       = useState("");
  const [url,       setUrl]       = useState("");
  const [urlSnippet,setUrlSnippet]= useState("");
  const [fetchingUrl,setFetchingUrl]=useState(false);
  const [fileText,  setFileText]  = useState("");
  const [fileName,  setFileName]  = useState("");
  const [dragging,  setDragging]  = useState(false);
  const [recording, setRecording] = useState(false);
  const [transcript,setTranscript]= useState("");
  const [outputs,   setOutputs]   = useState({});
  const [loading,   setLoading]   = useState(false);
  const [copied,    setCopied]    = useState({});
  const [error,     setError]     = useState("");
  const fileRef  = useRef();
  const recogRef = useRef();
  const recognitionSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const togglePlatform = id =>
    setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);

  /* ── VOICE ── */
  const toggleRec = () => {
    if (!recognitionSupported) { setTranscript("Speech recognition not supported. Use Chrome or Edge."); return; }
    if (recording) { recogRef.current?.stop(); setRecording(false); }
    else {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const r = new SR(); r.continuous=true; r.interimResults=true;
      r.onresult = e => {
        let t=""; for(let i=0;i<e.results.length;i++) t+=e.results[i][0].transcript;
        setTranscript(t); setNotes(t);
      };
      r.onend = () => setRecording(false);
      r.start(); recogRef.current=r; setRecording(true);
    }
  };

  /* ── FILE ── */
  const handleFile = async file => {
    if (!file) return;
    setFileName(file.name);
    const text = await file.text().catch(()=>"[Could not read file]");
    const excerpt = text.slice(0,4000);
    setFileText(excerpt); setNotes(excerpt);
  };

  /* ── URL (simulated fetch — backend needed for real CORS) ── */
  const fetchUrl = async () => {
    if (!url.trim()) return;
    setFetchingUrl(true); setUrlSnippet("");
    await new Promise(r=>setTimeout(r,1000));
    const sim = `Content extracted from: ${url}\n\nKey points:\n- Main topic and thesis from the page\n- Supporting evidence and data points\n- Actionable takeaways and insights\n- Notable quotes and claims to repurpose`;
    setUrlSnippet(sim); setNotes(sim); setFetchingUrl(false);
  };

  /* ── GENERATE ── */
  const generate = async () => {
    const raw = notes || transcript || fileText || urlSnippet || topic;
    if (!raw || !selected.length) return;
    setLoading(true); setOutputs({}); setError("");

    const platformNames = selected.map(id=>PLATFORMS.find(p=>p.id===id)?.label).filter(Boolean);

    const sys = `You are a world-class content strategist and monetization expert. You write viral, high-converting, platform-native content. Return ONLY a valid JSON object. No markdown fences. No preamble. No explanation.`;

    const prompt = `Create content for: ${platformNames.join(", ")}.

Source material: "${raw}"
Topic/angle: "${topic || "derive from source"}"
Tone: ${tone}
CTA: "${cta || "follow for more"}"

Platform instructions:
- Twitter / X: 5–8 tweet thread. Number each tweet (1/7 etc). Scroll-stopping hook tweet. End with CTA.
- LinkedIn: 300–400 word post. Personal story hook, insight, tactical value. Line breaks for readability. Monetization angle.
- Instagram: Hook caption + value + 5 hashtags. Strategic emoji use. Strong CTA.
- YouTube Script: Full script — HOOK (0-30s), INTRO, 3 MAIN SECTIONS with timestamps, OUTRO+CTA. Add [B-roll notes] in brackets.

Return JSON with only the requested platforms as keys:
${platformNames.map(n=>`"${n}"`).join(", ")}`;

    try {
      const res = await fetch("/api/generate", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:sys,
          messages:[{role:"user",content:prompt}]
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const raw2 = data.content?.map(b=>b.text||"").join("") || "";
      const clean = raw2.replace(/```json[\s\S]*?```|```[\s\S]*?```/g, s => {
        const inner = s.replace(/```json|```/g,"").trim();
        return inner;
      }).trim();
      setOutputs(JSON.parse(clean));
    } catch(e) {
      setError(`Generation failed: ${e.message}. Check your API key is set in Vercel environment variables.`);
    }
    setLoading(false);
  };

  const copyText = (key,text) => {
    navigator.clipboard.writeText(text);
    setCopied(p=>({...p,[key]:true}));
    setTimeout(()=>setCopied(p=>({...p,[key]:false})),2000);
  };

  const hasInput = !!(notes||transcript||fileText||urlSnippet||topic);
  const canGenerate = hasInput && selected.length > 0 && !loading;

  const inputModes = [
    {id:"text",  icon:"✏️", label:"TYPE"},
    {id:"voice", icon:"🎙",  label:"VOICE"},
    {id:"doc",   icon:"📄",  label:"DOC"},
    {id:"url",   icon:"🔗",  label:"URL"},
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* ── TOPBAR ── */}
        <header className="topbar">
          <div className="brand">
            <span className="brand-word">SIGNAL</span>
            <span className="brand-sub">Content Studio</span>
          </div>
          <nav className="nav-tabs">
            {[["create","◈ Create"],["history","◫ Library"],["monetize","$ Monetize"]].map(([id,lbl])=>(
              <button key={id} className={`nav-tab ${tab===id?"active":""}`} onClick={()=>setTab(id)}>{lbl}</button>
            ))}
          </nav>
          <div className="topbar-right">
            <div className="status-dot"/>
            <span className="status-label">AI READY</span>
          </div>
        </header>

        <div className="body">

          {/* ── LEFT PANEL ── */}
          <aside className="left-panel">
            <div className="panel-header">
              <span className="panel-title">Input & Config</span>
              {selected.length > 0 && (
                <span style={{fontSize:10,color:"var(--amber)",letterSpacing:1}}>
                  {selected.length} platform{selected.length>1?"s":""} ✓
                </span>
              )}
            </div>
            <div className="panel-scroll">

              {/* INPUT MODE SWITCHER */}
              <div className="input-switcher">
                {inputModes.map(m=>(
                  <button key={m.id} className={`switcher-btn ${inputMode===m.id?"active":""}`} onClick={()=>setInputMode(m.id)}>
                    <span className="s-icon">{m.icon}</span>{m.label}
                  </button>
                ))}
              </div>

              {/* ── TEXT ── */}
              {inputMode==="text" && <>
                <div className="form-group">
                  <label className="form-label">Topic / Angle</label>
                  <input className="form-input" placeholder="e.g. How I 10x'd my income posting daily…" value={topic} onChange={e=>setTopic(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Notes / Brain Dump</label>
                  <textarea className="form-textarea" placeholder="Raw notes, bullet points, a rough draft — the messier the better." value={notes} onChange={e=>setNotes(e.target.value)} style={{minHeight:120}}/>
                </div>
              </>}

              {/* ── VOICE ── */}
              {inputMode==="voice" && <>
                <div className="form-group">
                  <label className="form-label">Topic</label>
                  <input className="form-input" placeholder="Add a title or topic" value={topic} onChange={e=>setTopic(e.target.value)}/>
                </div>
                <div className="voice-center">
                  <button className={`mic-btn ${recording?"rec":""}`} onClick={toggleRec}>
                    {recording?"⏹":"🎙"}
                  </button>
                  <span className="voice-hint">{recording?"● RECORDING — TAP TO STOP":"TAP TO START RECORDING"}</span>
                  {transcript && <div className="transcript-area">"{transcript}"</div>}
                  {!recognitionSupported && <div style={{fontSize:11,color:"var(--red)",textAlign:"center"}}>Voice requires Chrome or Edge browser.</div>}
                </div>
              </>}

              {/* ── DOC ── */}
              {inputMode==="doc" && <>
                <div
                  className={`upload-zone ${dragging?"drag":""}`}
                  onClick={()=>fileRef.current?.click()}
                  onDragOver={e=>{e.preventDefault();setDragging(true)}}
                  onDragLeave={()=>setDragging(false)}
                  onDrop={e=>{e.preventDefault();setDragging(false);handleFile(e.dataTransfer.files[0])}}
                >
                  <div className="upload-icon">📄</div>
                  <div className="upload-text">Drop a document or click to browse</div>
                  <div className="upload-sub">TXT · MD · PDF · first 4,000 chars used</div>
                  {fileName && <div className="file-pill">📎 {fileName}</div>}
                </div>
                <input ref={fileRef} type="file" accept=".txt,.md,.pdf,.doc,.docx" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
                {fileText && (
                  <div style={{marginTop:12}}>
                    <div className="form-label">Preview</div>
                    <div className="transcript-area" style={{marginTop:6,maxHeight:80,overflow:"auto",fontSize:11}}>{fileText.slice(0,250)}…</div>
                  </div>
                )}
                <div className="form-group" style={{marginTop:14}}>
                  <label className="form-label">Content Angle</label>
                  <input className="form-input" placeholder="What angle should the content take?" value={topic} onChange={e=>setTopic(e.target.value)}/>
                </div>
              </>}

              {/* ── URL ── */}
              {inputMode==="url" && <>
                <div className="form-group">
                  <label className="form-label">URL to Repurpose</label>
                  <div className="url-area">
                    <input className="form-input" placeholder="https://…" value={url} onChange={e=>setUrl(e.target.value)} style={{flex:1}} onKeyDown={e=>e.key==="Enter"&&fetchUrl()}/>
                    <button className="url-btn" onClick={fetchUrl} disabled={fetchingUrl}>{fetchingUrl?"…":"FETCH"}</button>
                  </div>
                </div>
                {urlSnippet && <div className="transcript-area" style={{marginBottom:14,fontSize:11}}>{urlSnippet}</div>}
                <div className="form-group">
                  <label className="form-label">Content Angle</label>
                  <input className="form-input" placeholder="What perspective to take?" value={topic} onChange={e=>setTopic(e.target.value)}/>
                </div>
              </>}

              <div className="divider"/>

              {/* TONE + CTA */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                <div className="form-group" style={{marginBottom:0}}>
                  <label className="form-label">Tone</label>
                  <select className="form-select" value={tone} onChange={e=>setTone(e.target.value)}>
                    <option value="authoritative">Authoritative</option>
                    <option value="conversational">Conversational</option>
                    <option value="contrarian">Contrarian</option>
                    <option value="storytelling">Storytelling</option>
                    <option value="educational">Educational</option>
                    <option value="hype">High-energy</option>
                  </select>
                </div>
                <div className="form-group" style={{marginBottom:0}}>
                  <label className="form-label">CTA / Offer</label>
                  <input className="form-input" placeholder="Free guide, DMs, etc." value={cta} onChange={e=>setCta(e.target.value)}/>
                </div>
              </div>

              {/* PLATFORMS */}
              <div style={{marginBottom:16}}>
                <div className="form-label" style={{marginBottom:10}}>Target Platforms</div>
                <div className="platforms-grid">
                  {PLATFORMS.map(p=>(
                    <div key={p.id} className={`platform-btn ${selected.includes(p.id)?p.cls:""}`} onClick={()=>togglePlatform(p.id)}>
                      <span className="p-icon">{p.icon}</span>
                      <div className="p-info">
                        <div className="p-name">{p.label}</div>
                        <div className="p-value">{p.value}</div>
                      </div>
                      {selected.includes(p.id) && <span className="p-check">✓</span>}
                    </div>
                  ))}
                </div>
              </div>

              <button className={`gen-btn ${loading?"loading":""}`} onClick={generate} disabled={!canGenerate}>
                {loading ? <><span className="spinner">⟳</span> GENERATING…</> : "▸  GENERATE CONTENT"}
              </button>
            </div>
          </aside>

          {/* ── RIGHT PANEL ── */}
          <section className="right-panel">
            <div className="right-header">
              <div className="output-tabs">
                {[["outputs","◈ Outputs"],["playbook","$ Playbook"]].map(([id,lbl])=>(
                  <button key={id} className={`output-tab ${outTab===id?"active":""}`} onClick={()=>setOutTab(id)}>{lbl}</button>
                ))}
              </div>
              {Object.keys(outputs).length > 0 && (
                <button className="copy-btn" onClick={()=>setOutputs({})}>Clear</button>
              )}
            </div>

            <div className="right-scroll">

              {/* ── CREATE → OUTPUTS ── */}
              {tab==="create" && outTab==="outputs" && (<>
                {error && <div className="error-bar">⚠ {error}</div>}

                {!loading && !error && Object.keys(outputs).length===0 && (
                  <div className="empty">
                    <div className="empty-ascii">{"◈ ─────────────── ◈\n  AWAITING INPUT  \n◈ ─────────────── ◈"}</div>
                    <div className="empty-title">READY TO CREATE</div>
                    <div className="empty-sub">Choose an input method, configure your platforms, and hit Generate. Content for all selected platforms streams in simultaneously.</div>
                  </div>
                )}

                {(loading || Object.keys(outputs).length > 0) && (
                  <div className="output-grid">
                    {loading
                      ? selected.map(id=>{
                          const p=PLATFORMS.find(x=>x.id===id);
                          const wide=id==="youtube";
                          return (
                            <div className={`output-card ${wide?"wide":""}`} key={id}>
                              <div className="card-head">
                                <div className="card-platform">
                                  <div className="platform-pip" style={{background:p?.pip}}/>
                                  {p?.label}
                                </div>
                              </div>
                              <Skeleton/>
                            </div>
                          );
                        })
                      : Object.entries(outputs).map(([platform,content])=>{
                          const p=PLATFORMS.find(x=>x.label===platform||platform.toLowerCase().includes(x.id));
                          const wide=platform.toLowerCase().includes("youtube");
                          return (
                            <div className={`output-card ${wide?"wide":""}`} key={platform}>
                              <div className="card-head">
                                <div className="card-platform">
                                  <div className="platform-pip" style={{background:p?.pip||"var(--amber)"}}/>
                                  {platform}
                                </div>
                                <div className="card-meta">
                                  <span className="value-tag">{p?.value||"high value"}</span>
                                  <button className={`copy-btn ${copied[platform]?"ok":""}`} onClick={()=>copyText(platform,content)}>
                                    {copied[platform]?"✓ COPIED":"COPY"}
                                  </button>
                                </div>
                              </div>
                              <div className="card-body">{content}</div>
                            </div>
                          );
                        })
                    }
                  </div>
                )}
              </>)}

              {/* ── CREATE → PLAYBOOK ── */}
              {tab==="create" && outTab==="playbook" && (<>
                <div className="stats-bar">
                  {[{v:"$3,500",l:"AVG / MONTH"},{v:"6",l:"INCOME STREAMS"},{v:"10×",l:"LEVERAGE"},{v:"1",l:"IDEA IN"}].map(s=>(
                    <div className="stat-cell" key={s.l}>
                      <div className="stat-val">{s.v}</div>
                      <div className="stat-lbl">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="playbook">
                  <div className="playbook-header">◈ THE ONE-IDEA REVENUE PLAYBOOK</div>
                  {PLAYBOOK.map(r=>(
                    <div className="playbook-row" key={r.step}>
                      <span className="p-step">{r.step}</span>
                      <span className="p-action">{r.action}</span>
                      <span className="p-platform">{r.platform}</span>
                      <span className="p-earn">{r.earn}</span>
                    </div>
                  ))}
                </div>
                <div className="mono-grid" style={{marginTop:16}}>
                  {[
                    {icon:"🎯",title:"Audience First",       body:"Every post is a trust deposit. Consistency builds the audience that makes all other monetization possible.",roi:"Foundation → unlimited upside"},
                    {icon:"📧",title:"Newsletter",           body:"Email is the asset you own. Repurpose top posts into a newsletter, then sell sponsorships at $30–100 CPM.",roi:"$300–$10,000 per blast"},
                    {icon:"🎓",title:"Digital Products",     body:"Your best content reveals what people want to learn. Package it into courses, templates, or guides.",roi:"$500–$50,000 one-time"},
                    {icon:"🤝",title:"Brand Partnerships",   body:"Consistent LinkedIn + YouTube content attracts inbound brand deals. Your content IS your media kit.",roi:"$1,000–$25,000 per deal"},
                  ].map(c=>(
                    <div className="mono-card" key={c.title}>
                      <div className="mono-card-icon">{c.icon}</div>
                      <div className="mono-card-title">{c.title}</div>
                      <div className="mono-card-body">{c.body}</div>
                      <div className="mono-card-roi">{c.roi}</div>
                    </div>
                  ))}
                </div>
              </>)}

              {/* ── HISTORY ── */}
              {tab==="history" && (
                <div className="hist-list">
                  <div style={{marginBottom:16,fontSize:11,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase"}}>Recent Generations</div>
                  {HISTORY.map((h,i)=>(
                    <div className="hist-item" key={i}>
                      <div className="hist-dot"/>
                      <div className="hist-info">
                        <div className="hist-title">{h.title}</div>
                        <div className="hist-meta"><span>{h.date}</span><span>{h.platforms.join(" · ")}</span></div>
                      </div>
                      <div className="hist-val">{h.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── MONETIZE ── */}
              {tab==="monetize" && (<>
                <div className="stats-bar">
                  {[{v:"$0",l:"THIS MONTH"},{v:"0",l:"POSTS OUT"},{v:"0",l:"FOLLOWERS"},{v:"0",l:"LEADS"}].map(s=>(
                    <div className="stat-cell" key={s.l}>
                      <div className="stat-val">{s.v}</div>
                      <div className="stat-lbl">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mono-grid">
                  {[
                    {icon:"𝕏",  title:"Twitter / X",    body:"Threads drive follows. Replies build trust. Profile link = storefront. 1 thread/day for 90 days creates real traction.",       roi:"$50–500 / sponsored thread"},
                    {icon:"in", title:"LinkedIn",        body:"Long-form posts get indexed and resurface. One strong post can generate inbound consulting leads for months.",                   roi:"$400–2,000 / post value"},
                    {icon:"◉",  title:"Instagram",       body:"Carousels 3× single images. Repurpose your Twitter threads as IG carousels. Link in bio = your digital storefront.",           roi:"$200–800 / brand post"},
                    {icon:"▶",  title:"YouTube",         body:"Scripts from this tool become videos. YouTube compounds — one video earns for years via search + ads.",                        roi:"$800–5,000+ / video"},
                    {icon:"📧", title:"Newsletter",      body:"Build your list from every platform. Email is the only audience you own. Monetize via sponsors, drops, and affiliates.",       roi:"$1,000–10,000 / campaign"},
                    {icon:"🎓", title:"Digital Products",body:"Fastest path from content to cash. Package your expertise into $27–$497 products. One viral thread can fund a full launch.",   roi:"$500–50,000 / launch"},
                  ].map(c=>(
                    <div className="mono-card" key={c.title}>
                      <div className="mono-card-icon" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:2}}>{c.icon}</div>
                      <div className="mono-card-title">{c.title}</div>
                      <div className="mono-card-body">{c.body}</div>
                      <div className="mono-card-roi">{c.roi}</div>
                    </div>
                  ))}
                </div>
              </>)}

            </div>
          </section>
        </div>
      </div>
    </>
  );
}
