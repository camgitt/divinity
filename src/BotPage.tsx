import { useState, useEffect, useRef, useMemo, useCallback } from "react"

const WP = "https://divinityagi.com/wp-content/uploads"
const BOT = "https://www.divinitybot.com/assets"

function navigate(to: string) {
  window.history.pushState({}, "", to)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

/* ── Colors ── */
const C = {
  ink: "#0d1b3e",
  cream: "#f5f0e8",
  creamLight: "#faf7f2",
  gold: "#c9a84c",
  goldHover: "#b8960c",
  goldMuted: "rgba(201,168,76,0.15)",
  textPrimary: "#1a2744",
  textSecondary: "#5a6a85",
  textMuted: "#8d99ad",
  border: "rgba(201,168,76,0.12)",
} as const

/* ── Hooks ── */
function useFade() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.06 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return { ref, cls: v ? "bot-visible" : "bot-hidden" }
}

function useStagger() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.05 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return { ref, visible: v }
}

const CX = "max-w-6xl mx-auto px-6 sm:px-8 lg:px-12"

/* ── Chat Preview ── */
const chatMessages = [
  { from: "bot", text: "Welcome. This is a quiet space \u2014 no judgment, no pressure. What\u2019s on your mind today?" },
  { from: "user", text: "I\u2019ve been feeling lost lately. Like I don\u2019t know what I believe anymore." },
  { from: "bot", text: "That\u2019s a brave thing to name. Doubt isn\u2019t the opposite of faith \u2014 it\u2019s often the doorway to deeper understanding. Would you like to explore what\u2019s shifting for you?" },
  { from: "user", text: "I think so. I grew up religious but it doesn\u2019t feel the same anymore." },
  { from: "bot", text: "Growth often means outgrowing the containers we were given. That doesn\u2019t mean the essence was wrong \u2014 just that you\u2019re ready for something bigger. What part still resonates?" },
]

function ChatPreview() {
  const [visibleCount, setVisibleCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!started || visibleCount >= chatMessages.length) return
    const delay = visibleCount === 0 ? 400 : (chatMessages[visibleCount - 1]?.from === "bot" ? 1800 : 1200)
    const t = setTimeout(() => setVisibleCount(c => c + 1), delay)
    return () => clearTimeout(t)
  }, [started, visibleCount])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [visibleCount])

  return (
    <div ref={ref} className="relative max-w-sm mx-auto lg:mx-0">
      <div style={{ background: C.ink, borderRadius: "2rem", padding: "6px", boxShadow: "0 25px 60px rgba(13,27,62,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 rounded-b-xl z-10" style={{ background: C.ink }} />
        <div style={{ background: `linear-gradient(to bottom, ${C.ink}, #0a1530)`, borderRadius: "1.5rem", overflow: "hidden" }}>
          {/* Header */}
          <div className="px-5 pt-7 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.gold}, #a08535)` }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>DivinityBot</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 bot-pulse" />
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Online</span>
                </div>
              </div>
            </div>
          </div>
          {/* Messages */}
          <div ref={scrollRef} className="h-[320px] overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
            {chatMessages.slice(0, visibleCount).map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} bot-msg-enter`}>
                <div className={`max-w-[82%] px-4 py-2.5 text-[13px] leading-relaxed ${
                  m.from === "user"
                    ? "rounded-2xl rounded-br-sm text-white"
                    : "rounded-2xl rounded-bl-sm"
                }`} style={m.from === "user" ? { background: C.gold } : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {visibleCount < chatMessages.length && started && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm px-4 py-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "rgba(255,255,255,0.3)", animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "rgba(255,255,255,0.3)", animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "rgba(255,255,255,0.3)", animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Input */}
          <div className="px-4 pb-5 pt-2">
            <div className="flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-[13px] flex-1" style={{ color: "rgba(255,255,255,0.2)" }}>What's on your mind?</span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: C.gold }}>
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -inset-12 rounded-full -z-10" style={{ background: `radial-gradient(circle, ${C.goldMuted}, transparent 70%)` }} />
    </div>
  )
}

/* ── FAQ Accordion ── */
function FaqItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="transition-all duration-300" style={{ border: `1px solid ${open ? "rgba(201,168,76,0.2)" : C.border}`, borderRadius: "0.75rem", background: open ? "white" : C.creamLight }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-5 py-4 text-left group">
        <span className="text-[15px] font-semibold flex-1" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", color: C.textPrimary }}>{question}</span>
        <svg className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} style={{ color: C.textMuted }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5"><p className="text-[15px] leading-relaxed" style={{ color: C.textSecondary }}>{answer}</p></div>
        </div>
      </div>
    </div>
  )
}

/* ── Signup Modal ── */
const STEPS = ["Account", "Profile", "Faith", "Confirm"] as const

const faithOptions = [
  { id: "christian", label: "Christianity", icon: "\u271D\uFE0F" },
  { id: "jewish", label: "Judaism", icon: "\u2721\uFE0F" },
  { id: "buddhist", label: "Buddhism", icon: "\u2638\uFE0F" },
  { id: "confucian", label: "Confucianism", icon: "\uD83C\uDFDB\uFE0F" },
  { id: "indigenous", label: "Indigenous", icon: "\uD83E\uDEB6" },
  { id: "taoist", label: "Taoism", icon: "\u262F\uFE0F" },
  { id: "bahai", label: "Bah\u00E1'\u00ED", icon: "\u2B50" },
  { id: "polytheist", label: "Polytheism", icon: "\uD83C\uDF00" },
  { id: "shinto", label: "Shinto", icon: "\u26E9\uFE0F" },
  { id: "exploring", label: "Just Exploring", icon: "\uD83D\uDD0D" },
]

const seekingOptions = ["Daily reflection", "Grief support", "Meditation", "Community", "Scripture study", "Life guidance", "Inner peace", "Spiritual growth"]

function SignupModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [pw, setPw] = useState("")
  const [pw2, setPw2] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [bio, setBio] = useState("")
  const [dob, setDob] = useState("")
  const [location, setLocation] = useState("")
  const [pronouns, setPronouns] = useState("")
  const [faith, setFaith] = useState("")
  const [experience, setExperience] = useState("")
  const [seeking, setSeeking] = useState<string[]>([])
  const toggleSeeking = (s: string) => setSeeking(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const pwChecks = useMemo(() => ({ length: pw.length >= 8, upper: /[A-Z]/.test(pw), lower: /[a-z]/.test(pw), number: /[0-9]/.test(pw) }), [pw])
  const pwValid = pwChecks.length && pwChecks.upper && pwChecks.lower && pwChecks.number
  const step1Valid = name.trim() && email.trim() && username.trim() && pwValid && pw === pw2

  const inputStyle: React.CSSProperties = { width: "100%", height: 44, padding: "0 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontFamily: "'Inter','DM Sans',sans-serif", fontSize: 14, color: C.textPrimary, background: C.creamLight, outline: "none", transition: "all 0.2s" }
  const labelStyle: React.CSSProperties = { display: "block", fontFamily: "'Inter','DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 6, letterSpacing: "0.02em" }
  const btnBack: React.CSSProperties = { flex: 1, height: 44, border: `1px solid ${C.border}`, borderRadius: 8, background: "white", color: C.textSecondary, fontFamily: "'Inter','DM Sans',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }
  const btnContinue: React.CSSProperties = { flex: 2, height: 44, border: "none", borderRadius: 8, background: `linear-gradient(135deg, ${C.ink}, #1a3060)`, color: "white", fontFamily: "'Inter','DM Sans',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.03em", cursor: "pointer", transition: "all 0.2s", boxShadow: `0 4px 12px rgba(13,27,62,0.3)` }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(13,27,62,0.7)", backdropFilter: "blur(8px)" }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition z-10" style={{ background: C.cream, color: C.textMuted }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <div className="pt-8 pb-4 px-7 text-center">
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.textPrimary }}>Create Your Account</h2>
          <p className="text-xs mb-5" style={{ color: C.textMuted }}>Step {step + 1} of {STEPS.length}</p>
          <div className="flex items-center justify-center max-w-xs mx-auto">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-col items-center flex-1 relative">
                {i < STEPS.length - 1 && <div className="absolute top-4 left-1/2 w-full h-0.5 transition-colors" style={{ background: i < step ? C.gold : C.border }} />}
                <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all" style={
                  i === step ? { background: `linear-gradient(135deg, ${C.ink}, #1a3060)`, color: "white", boxShadow: "0 2px 8px rgba(13,27,62,0.3)" }
                  : i < step ? { background: C.gold, color: "white" }
                  : { background: C.cream, border: `2px solid ${C.border}`, color: C.textMuted }
                }>
                  {i < step ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg> : i + 1}
                </div>
                <span className="text-[10px] mt-1.5" style={{ color: i === step ? C.textPrimary : C.textMuted, fontWeight: i === step ? 600 : 400 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {step === 0 && (
          <div className="px-7 pb-7">
            <p className="text-sm mb-5" style={{ color: C.textSecondary }}>Start with your account details.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><label style={labelStyle}>Full Name</label><input style={inputStyle} type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} /></div>
              <div><label style={labelStyle}>Email</label><input style={inputStyle} type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div><label style={labelStyle}>Username</label><div style={{ position: "relative" }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: C.textMuted }}>@</span><input style={{ ...inputStyle, paddingLeft: 30 }} type="text" placeholder="johndoe" value={username} onChange={e => setUsername(e.target.value)} /></div></div>
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input style={{ ...inputStyle, paddingRight: 40 }} type={showPw ? "text" : "password"} placeholder="Create a secure password" value={pw} onChange={e => setPw(e.target.value)} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.textMuted, padding: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}</svg>
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", marginTop: 8 }}>
                  {[{ met: pwChecks.length, label: "8+ chars" }, { met: pwChecks.upper, label: "Uppercase" }, { met: pwChecks.lower, label: "Lowercase" }, { met: pwChecks.number, label: "Number" }].map(c => (
                    <span key={c.label} style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4, color: c.met ? "#16a34a" : C.textMuted }}>
                      <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">{c.met ? <path d="M20 6L9 17l-5-5" /> : <circle cx="12" cy="12" r="9" />}</svg>
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input style={{ ...inputStyle, paddingRight: 40 }} type={showPw2 ? "text" : "password"} placeholder="Re-enter password" value={pw2} onChange={e => setPw2(e.target.value)} />
                  <button type="button" onClick={() => setShowPw2(!showPw2)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.textMuted, padding: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{showPw2 ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}</svg>
                  </button>
                </div>
                {pw2 && pw !== pw2 && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>Passwords do not match.</p>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button style={btnBack} onClick={onClose}>Cancel</button>
              <button style={{ ...btnContinue, opacity: step1Valid ? 1 : 0.4, cursor: step1Valid ? "pointer" : "not-allowed" }} disabled={!step1Valid} onClick={() => setStep(1)}>Continue</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="px-7 pb-7">
            <p className="text-sm mb-5" style={{ color: C.textSecondary }}>Tell us about yourself. All optional.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><label style={labelStyle}>Bio</label><textarea placeholder="A little about your journey..." value={bio} onChange={e => setBio(e.target.value)} maxLength={200} style={{ ...inputStyle, height: "auto", minHeight: 80, padding: "10px 14px", resize: "vertical" as const }} /><p style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{bio.length}/200</p></div>
              <div><label style={labelStyle}>Date of Birth</label><input style={inputStyle} type="date" value={dob} onChange={e => setDob(e.target.value)} /></div>
              <div><label style={labelStyle}>Location</label><input style={inputStyle} type="text" placeholder="City, Country" value={location} onChange={e => setLocation(e.target.value)} /></div>
              <div><label style={labelStyle}>Pronouns</label><select style={{ ...inputStyle, cursor: "pointer", color: pronouns ? C.textPrimary : C.textMuted }} value={pronouns} onChange={e => setPronouns(e.target.value)}><option value="" disabled>Select</option><option value="he/him">He / Him</option><option value="she/her">She / Her</option><option value="they/them">They / Them</option><option value="prefer-not">Prefer not to say</option></select></div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button style={btnBack} onClick={() => setStep(0)}>Back</button>
              <button style={btnContinue} onClick={() => setStep(2)}>Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="px-7 pb-7">
            <p className="text-sm mb-5" style={{ color: C.textSecondary }}>Choose your tradition or explore freely.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={labelStyle}>Faith Tradition</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {faithOptions.map(f => (
                    <button key={f.id} type="button" onClick={() => setFaith(f.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, border: faith === f.id ? `2px solid ${C.gold}` : `1px solid ${C.border}`, background: faith === f.id ? C.goldMuted : C.creamLight, cursor: "pointer", transition: "all 0.2s", fontFamily: "'Inter','DM Sans',sans-serif", fontSize: 13, color: C.textPrimary, textAlign: "left" as const, fontWeight: faith === f.id ? 600 : 400 }}>
                      <span style={{ fontSize: 18 }}>{f.icon}</span>{f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div><label style={labelStyle}>Experience Level</label><select style={{ ...inputStyle, cursor: "pointer", color: experience ? C.textPrimary : C.textMuted }} value={experience} onChange={e => setExperience(e.target.value)}><option value="" disabled>How familiar are you?</option><option value="new">New \u2014 just starting to explore</option><option value="some">Some background</option><option value="practicing">Practicing \u2014 active in my faith</option><option value="deep">Deep \u2014 lifelong practitioner</option></select></div>
              <div>
                <label style={labelStyle}>What are you seeking?</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {seekingOptions.map(s => (
                    <button key={s} type="button" onClick={() => toggleSeeking(s)} style={{ padding: "6px 14px", borderRadius: 20, border: seeking.includes(s) ? `2px solid ${C.gold}` : `1px solid ${C.border}`, background: seeking.includes(s) ? C.goldMuted : "white", color: seeking.includes(s) ? C.textPrimary : C.textSecondary, fontFamily: "'Inter','DM Sans',sans-serif", fontSize: 12, fontWeight: seeking.includes(s) ? 600 : 400, cursor: "pointer", transition: "all 0.2s" }}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button style={btnBack} onClick={() => setStep(1)}>Back</button>
              <button style={{ ...btnContinue, opacity: faith ? 1 : 0.4, cursor: faith ? "pointer" : "not-allowed" }} disabled={!faith} onClick={() => setStep(3)}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="px-7 pb-7">
            <p className="text-sm mb-5" style={{ color: C.textSecondary }}>Review and confirm.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { title: "ACCOUNT", editStep: 0, rows: [["Name", name], ["Email", email], ["Username", `@${username}`]] },
                { title: "PROFILE", editStep: 1, rows: bio || dob || location || pronouns ? [[bio && "Bio", bio], [dob && "DOB", dob], [location && "Location", location], [pronouns && "Pronouns", pronouns]].filter(r => r[0]) as string[][] : [["", "No details added"]] },
                { title: "FAITH", editStep: 2, rows: [["Tradition", `${faithOptions.find(f => f.id === faith)?.icon || ""} ${faithOptions.find(f => f.id === faith)?.label || "\u2014"}`], ...(experience ? [["Experience", experience]] : []), ...(seeking.length ? [["Seeking", seeking.join(", ")]] : [])] },
              ].map(section => (
                <div key={section.title} style={{ padding: 16, background: C.creamLight, borderRadius: 12, border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em" }}>{section.title}</span>
                    <button onClick={() => setStep(section.editStep)} style={{ fontSize: 11, fontWeight: 600, color: C.gold, background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                  </div>
                  {section.rows.map((r, i) => (
                    <p key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.8 }}>{r[0] ? <><strong style={{ color: C.textPrimary }}>{r[0]}:</strong> {r[1]}</> : <em style={{ color: C.textMuted }}>{r[1]}</em>}</p>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button style={btnBack} onClick={() => setStep(2)}>Back</button>
              <button style={{ ...btnContinue, background: `linear-gradient(135deg, ${C.gold}, ${C.goldHover})` }} onClick={onClose}>Create Account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   BOT PAGE
══════════════════════════════════════════ */
export default function BotPage() {
  const [scrolled, setScrolled] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [navCta, setNavCta] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const h = () => {
      setScrolled(window.scrollY > 40)
      setNavCta(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  const f1 = useFade()
  const f2 = useFade()
  const f3 = useFade()
  const f4 = useFade()
  const f5 = useFade()
  const f6 = useFade()
  const stag = useStagger()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .bot-hidden { opacity: 0; transform: translateY(24px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .bot-visible { opacity: 1; transform: translateY(0); }
        .bot-stag-item { opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .bot-stag-item.show { opacity: 1; transform: translateY(0); }
        .bot-pulse { animation: botPulse 2s ease-in-out infinite; }
        @keyframes botPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .bot-msg-enter { animation: botMsgIn 0.4s cubic-bezier(0.16,1,0.3,1); }
        @keyframes botMsgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .bot-card { transition: all 0.35s cubic-bezier(0.16,1,0.3,1); }
        .bot-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(13,27,62,0.12); }
        .bot-card:hover .bot-card-accent { opacity: 1; }
        .bot-card:hover .bot-card-arrow { opacity: 1; transform: translate(2px, -2px); }
        .bot-card-accent { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: ${C.gold}; border-radius: 0 0 12px 12px; opacity: 0; transition: opacity 0.3s; }
        .bot-card-arrow { opacity: 0; transform: translate(0, 0); transition: all 0.3s; }
        .bot-heart-pulse { animation: heartPulse 2s ease-in-out infinite; }
        @keyframes heartPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        .bot-shimmer { position: relative; overflow: hidden; }
        .bot-shimmer::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); animation: shimmer 8s ease-in-out infinite; }
        @keyframes shimmer { 0%, 100% { left: -100%; } 50% { left: 100%; } }
        .bot-nav-cta { transform: translateY(-8px); opacity: 0; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); pointer-events: none; }
        .bot-nav-cta.show { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .bot-star-field { position: absolute; inset: 0; overflow: hidden; }
        .bot-star { position: absolute; width: 2px; height: 2px; background: white; border-radius: 50%; animation: starDrift 20s linear infinite; }
        @keyframes starDrift { 0% { transform: translateY(0) translateX(0); opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.6; } 100% { transform: translateY(-100vh) translateX(30px); opacity: 0; } }
      `}</style>

      <div style={{ minHeight: "100vh", fontFamily: "'Inter','DM Sans',system-ui,sans-serif", color: C.textPrimary, background: "white" }}>

        {/* ── NAV ── */}
        <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-500" style={scrolled ? { background: "rgba(13,27,62,0.92)", backdropFilter: "blur(20px)", boxShadow: "0 1px 20px rgba(0,0,0,0.15)" } : { background: "transparent" }}>
          <div className={`${CX} flex items-center justify-between`} style={{ height: 60 }}>
            <button onClick={() => navigate("/")} className="flex items-center gap-2 transition" style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.02em" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5m0 0l7 7m-7-7l7-7" /></svg>
              DIVINITY
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowSignup(true)} style={{ padding: "6px 16px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, background: "none", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase" as const }}>Sign In</button>
              <div className={`bot-nav-cta ${navCta ? "show" : ""}`}>
                <button onClick={() => setShowSignup(true)} className="bot-shimmer" style={{ padding: "8px 20px", borderRadius: 24, background: C.gold, color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.2s", border: "none", textTransform: "uppercase" as const }}>Begin Free</button>
              </div>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh" }}>
          <div className="absolute inset-0">
            <video autoPlay loop muted playsInline poster={`${BOT}/c24f7eb5677fe9329b550d72ef16016a1f216a6e-DbBhlkSE.png`} className="w-full h-full object-cover" style={{ objectPosition: "center 30%" }}>
              <source src={`${WP}/2026/01/Starry-night-bg.mp4`} type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,27,62,0.15), rgba(13,27,62,0.55), rgba(13,27,62,0.85))" }} />
            {/* Star particles */}
            <div className="bot-star-field">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bot-star" style={{ left: `${Math.random() * 100}%`, top: `${60 + Math.random() * 40}%`, animationDelay: `${Math.random() * 20}s`, animationDuration: `${15 + Math.random() * 15}s`, width: Math.random() > 0.7 ? 3 : 2, height: Math.random() > 0.7 ? 3 : 2 }} />
              ))}
            </div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto" style={{ paddingTop: 80 }}>
            <img src={`${BOT}/divinity-gold-private-logo-CsVsJ4O6.png`} alt="Divinity" className="mx-auto mb-8 bot-shimmer" style={{ width: "min(380px, 70vw)" }} />
            <p className="mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "rgba(255,255,255,0.5)", maxWidth: 360, margin: "0 auto 40px" }}>
              A private place to reflect.
            </p>
            <button onClick={() => setShowSignup(true)} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", borderRadius: 28, background: C.gold, color: "white", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, border: "none", cursor: "pointer", transition: "all 0.3s", boxShadow: `0 8px 24px rgba(201,168,76,0.3)` }}>
              <svg className="w-4 h-4 bot-heart-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" /></svg>
              Begin Free
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ opacity: 0.25 }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
        </section>

        {/* ── CHOOSE YOUR WAY IN ── */}
        <section id="explore" style={{ padding: "100px 0", background: C.cream }}>
          <div ref={stag.ref} className={CX}>
            <div className="text-center mb-14">
              <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: C.gold, fontWeight: 700, marginBottom: 12 }}>Your Journey Starts Here</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: C.textPrimary, lineHeight: 1.1 }}>Choose Your Way In</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {[
                { icon: <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>, title: "Find My Guide", desc: "A personal match to find the right support for where you are today." },
                { icon: <><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5z" /><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5z" /><path d="M12 10v12" /><circle cx="12" cy="6" r="4" /></>, title: "Enter Quiet Space", desc: "Multi-faith guided meditations for calm, grounding, and reflection." },
                { icon: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" /><path d="M2 12h20" /></>, title: "Explore Traditions", desc: "A respectful multi-faith portal \u2014 without pressure or judgment." },
                { icon: <><path d="M7.9 20A9 9 0 104 16.1L2 22z" /></>, title: "Meet Leaders", desc: "Real people as AI companions \u2014 created with permission and clear boundaries." },
              ].map((card, i) => (
                <div key={i} className={`bot-stag-item ${stag.visible ? "show" : ""}`} style={{ transitionDelay: stag.visible ? `${i * 120}ms` : "0ms" }}>
                  <div className="bot-card relative cursor-pointer" style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 28px 32px", height: "100%", position: "relative" }}>
                    <div className="bot-card-accent" />
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: C.goldMuted, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                      <svg style={{ width: 22, height: 22, color: C.gold }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">{card.icon}</svg>
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: C.textPrimary, marginBottom: 8 }}>{card.title}</h3>
                    <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.6 }}>{card.desc}</p>
                    <div className="bot-card-arrow absolute" style={{ top: 24, right: 24 }}>
                      <svg style={{ width: 16, height: 16, color: C.gold }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V8h-9" /></svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHAT PREVIEW ── */}
        <section style={{ padding: "100px 0", background: "white" }}>
          <div ref={f1.ref} className={`${CX} ${f1.cls}`}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: C.gold, fontWeight: 700, marginBottom: 12 }}>Live Preview</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: C.textPrimary, lineHeight: 1.1, marginBottom: 20 }}>
                  A Conversation,<br />Not a Sermon
                </h2>
                <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.7, marginBottom: 12 }}>
                  DivinityBot meets you where you are. Ask about <strong style={{ color: C.textPrimary }}>meaning, doubt, grief, curiosity</strong> \u2014 or just sit in silence.
                </p>
                <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.7, marginBottom: 28 }}>
                  Built on <strong style={{ color: C.textPrimary }}>deeply researched spiritual traditions</strong>, grounded in compassion, and designed to listen first.
                </p>
                <button onClick={() => setShowSignup(true)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 24, background: C.gold, color: "white", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, border: "none", cursor: "pointer", transition: "all 0.3s" }}>
                  <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  Try It Free
                </button>
              </div>
              <ChatPreview />
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: "100px 0", background: C.cream }}>
          <div ref={f2.ref} className={`${CX} ${f2.cls}`}>
            <div className="text-center mb-14">
              <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: C.gold, fontWeight: 700, marginBottom: 12 }}>Simple & Respectful</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: C.textPrimary, lineHeight: 1.1 }}>How It Works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { n: "01", title: "Choose a path", desc: "Spirit Guide, Quiet Space, Circle of Faith, or Verified Leaders.", icon: <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /> },
                { n: "02", title: "Start a check-in", desc: "Ask what\u2019s on your mind \u2014 or simply take a moment to breathe.", icon: <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /> },
                { n: "03", title: "Reflect at your pace", desc: "Save insights. Come back anytime. No timer, no pressure.", icon: <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> },
              ].map((step, i) => (
                <div key={i} className="bot-card" style={{ background: "white", borderRadius: 16, padding: 28, border: `1px solid ${C.border}`, position: "relative" }}>
                  <div className="bot-card-accent" />
                  <div className="flex items-center gap-3 mb-5">
                    <span style={{ display: "inline-flex", width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${C.ink}, #1a3060)`, color: "white", fontSize: 13, fontWeight: 700, alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(13,27,62,0.2)" }}>{step.n}</span>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: C.goldMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg style={{ width: 18, height: 18, color: C.gold }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{step.icon}</svg>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: C.textPrimary, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DIVINITY IS / IS NOT — split-screen contrast ── */}
        <section style={{ overflow: "hidden" }}>
          <div ref={f3.ref} className={f3.cls}>
            <div className="grid md:grid-cols-2" style={{ minHeight: 400 }}>
              {/* IS — dark navy */}
              <div style={{ background: C.ink, padding: "clamp(48px, 6vw, 80px) clamp(24px, 5vw, 60px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: C.gold, marginBottom: 24 }}>Divinity is</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                  {["A safe space for reflection and exploration", "Multi-faith by design \u2014 welcoming all traditions", "Built on deeply researched spiritual wisdom", "Available 24/7, completely at your own pace"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                      <svg style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, color: C.gold }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* IS NOT — warm cream */}
              <div style={{ background: C.cream, padding: "clamp(48px, 6vw, 80px) clamp(24px, 5vw, 60px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 24 }}>Divinity is not</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                  {["Not a religion \u2014 no doctrine or membership", "Not therapy or a replacement for clinical care", "Not a replacement for real clergy or leaders", "Not here to convert, judge, or pressure \u2014 ever"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, color: C.textSecondary, lineHeight: 1.5 }}>
                      <svg style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, color: C.textMuted }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── SAFETY & TRUST ── */}
        <section style={{ padding: "100px 0", background: "white" }}>
          <div ref={f4.ref} className={`${CX} ${f4.cls}`}>
            <div className="text-center mb-14">
              <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: C.gold, fontWeight: 700, marginBottom: 12 }}>Safety & Trust</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: C.textPrimary, lineHeight: 1.1, marginBottom: 12 }}>Built on Responsibility</h2>
              <p style={{ fontSize: 16, color: C.textSecondary, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>Spiritual questions are personal. Divinity is designed to be respectful, transparent, and safe.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { icon: <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />, title: "Curated Responses", desc: "Each guide responds within its tradition" },
                { icon: <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />, title: "Crisis Protocols", desc: "Recognizes when professional help is needed" },
                { icon: <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />, title: "Confidential", desc: "Private conversations, deletable anytime" },
                { icon: <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />, title: "No Manipulation", desc: "No conversion tactics or pressure" },
              ].map((card, i) => (
                <div key={i} className="bot-card" style={{ padding: 24, borderRadius: 12, background: C.creamLight, border: `1px solid ${C.border}`, position: "relative" }}>
                  <div className="bot-card-accent" />
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.goldMuted, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <svg style={{ width: 20, height: 20, color: C.gold }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{card.icon}</svg>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>{card.title}</p>
                  <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: "100px 0", background: C.cream }}>
          <div ref={f5.ref} className={`${CX} ${f5.cls}`}>
            <div className="text-center mb-14">
              <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: C.gold, fontWeight: 700, marginBottom: 12 }}>Questions?</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: C.textPrimary, lineHeight: 1.1 }}>Frequently Asked</h2>
            </div>
            <div className="max-w-2xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <FaqItem question="Is Divinity a religion?" answer="No. It's a private space for reflection and exploration. Divinity doesn't ask you to believe anything, join anything, or follow any doctrine. Your beliefs are your own." defaultOpen />
              <FaqItem question="Will it try to convert me?" answer="Never. Your beliefs are yours. Every tradition is honored equally — no path ranked above another. No conversion tactics, guilt, or pressure — ever." />
              <FaqItem question="Is this therapy?" answer="No. While our guides offer compassionate spiritual conversation, Divinity is not a substitute for professional mental health care. Our guides include crisis protocols that direct users to appropriate resources." />
              <FaqItem question="Do I need to choose a faith?" answer="No. Start with curiosity and stay there as long as you want. You can explore multiple traditions freely — there's no commitment to any single path." />
              <FaqItem question="How are the guides built?" answer="Each guide is constructed on deeply researched behavior profiles rooted in real spiritual traditions, reviewed by scholars and practitioners." />
              <FaqItem question="Is my conversation private?" answer="Yes. All conversations are confidential and can be deleted at any time. We don't sell your data." />
            </div>
          </div>
        </section>

        {/* ── FINAL CTA — video ── */}
        <section className="relative flex items-center justify-center overflow-hidden" style={{ height: "clamp(300px, 45vh, 480px)" }}>
          <div className="absolute inset-0">
            <video autoPlay loop muted playsInline poster={`${BOT}/3c5d95850e2e76f4394e8251568719a80d474f3c-Cw4huU01.png`} className="w-full h-full object-cover" style={{ objectPosition: "center center" }}>
              <source src={`${WP}/2026/01/Home-Screen-Cover.mp4`} type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,27,62,0.75), rgba(13,27,62,0.4), rgba(13,27,62,0.3))" }} />
          </div>
          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "white", marginBottom: 16, textShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>Ready to begin?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, marginBottom: 28, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>No judgment. No preaching. You're in control.</p>
            <button onClick={() => setShowSignup(true)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 24, background: C.gold, color: "white", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, border: "none", cursor: "pointer", transition: "all 0.3s", boxShadow: `0 8px 24px rgba(201,168,76,0.3)` }}>
              <svg className="w-4 h-4 bot-heart-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" /></svg>
              Begin Free
            </button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: C.ink, padding: "48px 0 36px" }}>
          <div className={CX}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "white", letterSpacing: "0.04em" }}>DIVINITY</span>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { label: "Privacy", href: "https://divinityagi.com/privacy-policy/" },
                  { label: "Terms", href: "https://divinityagi.com/privacy-policy/" },
                  { label: "Contact", href: "mailto:hello@divinityagi.com" },
                ].map(l => (
                  <a key={l.label} href={l.href} style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase" as const, textDecoration: "none", transition: "color 0.2s" }}>{l.label}</a>
                ))}
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>&copy; 2026 <strong style={{ color: "rgba(255,255,255,0.3)" }}>DivinityAGI</strong> &middot; All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Scroll to top */}
        {scrolled && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed z-40" style={{ bottom: 24, right: 24, width: 44, height: 44, background: `linear-gradient(135deg, ${C.ink}, #1a3060)`, color: "white", borderRadius: "50%", border: "none", boxShadow: "0 8px 20px rgba(13,27,62,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }}>
            <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
          </button>
        )}

        {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      </div>
    </>
  )
}
