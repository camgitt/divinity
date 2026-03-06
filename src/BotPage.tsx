import { useState, useEffect, useRef, useMemo } from "react"

const WP = "https://divinityagi.com/wp-content/uploads"
const BOT = "https://www.divinitybot.com/assets"

function navigate(to: string) {
  window.history.pushState({}, "", to)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

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
  return { ref, cls: `transition-all duration-700 ease-out ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}` }
}

function useStagger(count: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.05 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return {
    ref,
    visible: v,
    itemCls: (i: number) =>
      `transition-all duration-600 ease-out ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
    itemStyle: (i: number) => ({ transitionDelay: v ? `${i * 120}ms` : "0ms" }),
  }
}

const CX = "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"

/* ── Chat Preview ── */
const chatMessages = [
  { from: "bot", text: "Welcome. This is a quiet space -- no judgment, no pressure. What's on your mind today?" },
  { from: "user", text: "I've been feeling lost lately. Like I don't know what I believe anymore." },
  { from: "bot", text: "That's a brave thing to name. Doubt isn't the opposite of faith -- it's often the doorway to deeper understanding. Would you like to explore what's shifting for you?" },
  { from: "user", text: "I think so. I grew up religious but it doesn't feel the same anymore." },
  { from: "bot", text: "Growth often means outgrowing the containers we were given. That doesn't mean the essence was wrong -- just that you're ready for something bigger. What part still resonates with you?" },
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
    if (!started) return
    if (visibleCount >= chatMessages.length) return
    const delay = visibleCount === 0 ? 400 : (chatMessages[visibleCount - 1]?.from === "bot" ? 1800 : 1200)
    const t = setTimeout(() => setVisibleCount(c => c + 1), delay)
    return () => clearTimeout(t)
  }, [started, visibleCount])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [visibleCount])

  return (
    <div ref={ref} className="relative max-w-lg mx-auto">
      {/* Phone frame */}
      <div className="relative bg-brand-900/80 backdrop-blur-xl rounded-[2rem] p-1.5 shadow-2xl shadow-brand-900/40 border border-white/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-brand-900 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="bg-gradient-to-b from-brand-800 to-brand-900 rounded-[1.5rem] overflow-hidden">
          {/* Chat header */}
          <div className="px-5 pt-8 pb-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold font-display">DivinityBot</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] text-white/40">Online</span>
                </div>
              </div>
            </div>
          </div>
          {/* Messages */}
          <div ref={scrollRef} className="h-[340px] overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
            {chatMessages.slice(0, visibleCount).map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-[fadeUp_0.4s_ease-out]`}>
                <div className={`max-w-[82%] px-4 py-2.5 text-[13px] leading-relaxed ${
                  m.from === "user"
                    ? "bg-gold-500/90 text-white rounded-2xl rounded-br-md"
                    : "bg-white/8 border border-white/10 text-white/85 rounded-2xl rounded-bl-md"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {visibleCount < chatMessages.length && started && (
              <div className="flex justify-start">
                <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Input bar */}
          <div className="px-4 pb-5 pt-2">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2.5">
              <span className="text-white/25 text-[13px] flex-1">What's on your mind?</span>
              <div className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Glow */}
      <div className="absolute -inset-8 bg-gold-500/5 rounded-full blur-3xl -z-10" />
    </div>
  )
}

/* ── Signup Modal ── */
const STEPS = ["Account", "Profile", "Faith", "Confirmation"] as const

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

const seekingOptions = [
  "Daily reflection", "Grief support", "Meditation", "Community",
  "Scripture study", "Life guidance", "Inner peace", "Spiritual growth",
]

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

  const pwChecks = useMemo(() => ({
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
  }), [pw])

  const pwValid = pwChecks.length && pwChecks.upper && pwChecks.lower && pwChecks.number
  const step1Valid = name.trim() && email.trim() && username.trim() && pwValid && pw === pw2

  const inputCls = "w-full h-11 px-3.5 border border-brand-200 rounded-lg font-body text-sm text-brand-700 bg-brand-50/50 outline-none transition-all focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:bg-white placeholder:text-brand-300"
  const labelCls = "block text-xs font-semibold text-brand-500 mb-1.5 tracking-wide"

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-50 text-brand-400 hover:bg-brand-100 hover:text-brand-600 flex items-center justify-center transition z-10">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        {/* Header */}
        <div className="pt-8 pb-4 px-7 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-700 mb-1">Create Your Account</h2>
          <p className="text-xs text-brand-300 mb-5">Step {step + 1} of {STEPS.length}</p>
          {/* Stepper */}
          <div className="flex items-center justify-center gap-0 max-w-xs mx-auto">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-col items-center flex-1 relative">
                {i < STEPS.length - 1 && (
                  <div className={`absolute top-4 left-1/2 w-full h-0.5 ${i < step ? "bg-brand-400" : "bg-brand-100"} transition-colors`} />
                )}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i === step ? "bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/30"
                  : i < step ? "bg-brand-400 text-white"
                  : "bg-brand-50 border-2 border-brand-100 text-brand-300"
                }`}>
                  {i < step ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg> : i + 1}
                </div>
                <span className={`text-[10px] mt-1.5 ${i === step ? "text-brand-600 font-semibold" : "text-brand-300"}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 0: Account */}
        {step === 0 && (
          <div className="px-7 pb-7">
            <p className="text-sm text-brand-400 mb-5">Start with your account details.</p>
            <div className="space-y-4">
              <div><label className={labelCls}>Full Name</label><input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Email</label><input type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} /></div>
              <div>
                <label className={labelCls}>Username</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-brand-300">@</span>
                  <input type="text" placeholder="johndoe" value={username} onChange={e => setUsername(e.target.value)} className={`${inputCls} pl-8`} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Password</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} placeholder="Create a secure password" value={pw} onChange={e => setPw(e.target.value)} className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-300 hover:text-brand-500 transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  {[
                    { met: pwChecks.length, label: "8+ characters" },
                    { met: pwChecks.upper, label: "Uppercase" },
                    { met: pwChecks.lower, label: "Lowercase" },
                    { met: pwChecks.number, label: "Number" },
                  ].map(c => (
                    <span key={c.label} className={`text-[11px] flex items-center gap-1 ${c.met ? "text-green-600" : "text-brand-300"}`}>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">{c.met ? <path d="M20 6L9 17l-5-5" /> : <circle cx="12" cy="12" r="9" />}</svg>
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelCls}>Confirm Password</label>
                <div className="relative">
                  <input type={showPw2 ? "text" : "password"} placeholder="Re-enter your password" value={pw2} onChange={e => setPw2(e.target.value)} className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPw2(!showPw2)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-300 hover:text-brand-500 transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {showPw2 ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                    </svg>
                  </button>
                </div>
                {pw2 && pw !== pw2 && <p className="text-[11px] text-red-500 mt-1">Passwords do not match.</p>}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={onClose} className="flex-1 h-11 border border-brand-200 rounded-lg text-sm font-semibold text-brand-500 hover:bg-brand-50 transition">Back</button>
              <button disabled={!step1Valid} onClick={() => setStep(1)} className="flex-[2] h-11 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-lg text-sm font-bold tracking-wide shadow-md shadow-brand-500/20 hover:shadow-lg hover:-translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">Continue</button>
            </div>
          </div>
        )}

        {/* Step 1: Profile */}
        {step === 1 && (
          <div className="px-7 pb-7">
            <p className="text-sm text-brand-400 mb-5">Tell us about yourself. All fields are optional.</p>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Bio</label>
                <textarea placeholder="A little about your spiritual journey..." value={bio} onChange={e => setBio(e.target.value)} maxLength={200} className="w-full min-h-[80px] px-3.5 py-2.5 border border-brand-200 rounded-lg font-body text-sm text-brand-700 bg-brand-50/50 outline-none transition-all focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:bg-white placeholder:text-brand-300 resize-vertical" />
                <p className="text-[11px] text-brand-300 mt-1">{bio.length}/200</p>
              </div>
              <div><label className={labelCls}>Date of Birth</label><input type="date" value={dob} onChange={e => setDob(e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Location</label><input type="text" placeholder="City, Country" value={location} onChange={e => setLocation(e.target.value)} className={inputCls} /></div>
              <div>
                <label className={labelCls}>Pronouns</label>
                <select value={pronouns} onChange={e => setPronouns(e.target.value)} className={`${inputCls} cursor-pointer ${!pronouns ? "text-brand-300" : ""}`}>
                  <option value="" disabled>Select pronouns</option>
                  <option value="he/him">He / Him</option>
                  <option value="she/her">She / Her</option>
                  <option value="they/them">They / Them</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(0)} className="flex-1 h-11 border border-brand-200 rounded-lg text-sm font-semibold text-brand-500 hover:bg-brand-50 transition">Back</button>
              <button onClick={() => setStep(2)} className="flex-[2] h-11 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-lg text-sm font-bold tracking-wide shadow-md shadow-brand-500/20 hover:shadow-lg hover:-translate-y-px transition-all">Continue</button>
            </div>
          </div>
        )}

        {/* Step 2: Faith */}
        {step === 2 && (
          <div className="px-7 pb-7">
            <p className="text-sm text-brand-400 mb-5">Choose your tradition or explore freely.</p>
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Faith Tradition</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {faithOptions.map(f => (
                    <button key={f.id} type="button" onClick={() => setFaith(f.id)} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-[13px] transition-all ${
                      faith === f.id
                        ? "border-2 border-brand-400 bg-brand-50 text-brand-700 font-semibold"
                        : "border border-brand-100 bg-brand-50/30 text-brand-500 hover:border-brand-200"
                    }`}>
                      <span className="text-lg">{f.icon}</span>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelCls}>Experience Level</label>
                <select value={experience} onChange={e => setExperience(e.target.value)} className={`${inputCls} cursor-pointer ${!experience ? "text-brand-300" : ""}`}>
                  <option value="" disabled>How familiar are you?</option>
                  <option value="new">New -- just starting to explore</option>
                  <option value="some">Some background -- know the basics</option>
                  <option value="practicing">Practicing -- active in my faith</option>
                  <option value="deep">Deep -- lifelong practitioner or scholar</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>What are you seeking?</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {seekingOptions.map(s => (
                    <button key={s} type="button" onClick={() => toggleSeeking(s)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      seeking.includes(s)
                        ? "border-2 border-brand-400 bg-brand-50 text-brand-700 font-semibold"
                        : "border border-brand-100 text-brand-400 hover:border-brand-200"
                    }`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="flex-1 h-11 border border-brand-200 rounded-lg text-sm font-semibold text-brand-500 hover:bg-brand-50 transition">Back</button>
              <button disabled={!faith} onClick={() => setStep(3)} className="flex-[2] h-11 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-lg text-sm font-bold tracking-wide shadow-md shadow-brand-500/20 hover:shadow-lg hover:-translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">Continue</button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="px-7 pb-7">
            <p className="text-sm text-brand-400 mb-5">Review your details and confirm.</p>
            <div className="space-y-3">
              {[
                { title: "ACCOUNT", editStep: 0, rows: [["Name", name], ["Email", email], ["Username", `@${username}`]] },
                { title: "PROFILE", editStep: 1, rows: bio || dob || location || pronouns ? [[bio && "Bio", bio], [dob && "Date of Birth", dob], [location && "Location", location], [pronouns && "Pronouns", pronouns]].filter(r => r[0]) as string[][] : [["", "No profile details added"]] },
                { title: "FAITH", editStep: 2, rows: [["Tradition", `${faithOptions.find(f => f.id === faith)?.icon || ""} ${faithOptions.find(f => f.id === faith)?.label || "--"}`], experience ? ["Experience", experience] : null, seeking.length ? ["Seeking", seeking.join(", ")] : null].filter(Boolean) as string[][] },
              ].map(section => (
                <div key={section.title} className="p-4 bg-brand-50/60 rounded-xl border border-brand-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-brand-300 tracking-widest">{section.title}</span>
                    <button onClick={() => setStep(section.editStep)} className="text-[11px] font-semibold text-brand-400 hover:text-brand-600 transition">Edit</button>
                  </div>
                  <div className="space-y-1">
                    {section.rows.map((r, i) => (
                      <p key={i} className="text-[13px] text-brand-600">{r[0] ? <><strong className="text-brand-700">{r[0]}:</strong> {r[1]}</> : <span className="text-brand-300 italic">{r[1]}</span>}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="flex-1 h-11 border border-brand-200 rounded-lg text-sm font-semibold text-brand-500 hover:bg-brand-50 transition">Back</button>
              <button onClick={onClose} className="flex-[2] h-11 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-lg text-sm font-bold tracking-wide shadow-md shadow-gold-500/20 hover:shadow-lg hover:-translate-y-px transition-all">Create Account</button>
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

  useEffect(() => {
    window.scrollTo(0, 0)
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  const f1 = useFade()
  const f2 = useFade()
  const f3 = useFade()
  const f4 = useFade()
  const f5 = useFade()
  const f6 = useFade()
  const stag = useStagger(4)

  return (
    <div className="min-h-screen bg-white font-body text-brand-700">
      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${scrolled ? "bg-brand-900/90 backdrop-blur-xl shadow-lg" : "bg-transparent"}`}>
        <div className={`${CX} flex items-center justify-between h-14 lg:h-16`}>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/70 hover:text-white transition text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5m0 0l7 7m-7-7l7-7" /></svg>
            DivinityAGI
          </button>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setShowSignup(true)} className="px-4 py-1.5 border border-white/20 text-white/80 rounded-full text-[11px] tracking-wider font-bold hover:bg-white/10 transition uppercase">Sign Up</button>
            <a href="https://divinityagi.com/subscribe-now/" className="px-4 py-1.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full text-[11px] tracking-wider font-bold hover:shadow-lg hover:shadow-gold-500/20 transition shadow-sm uppercase">Investor Portal</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video bg */}
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline poster={`${BOT}/c24f7eb5677fe9329b550d72ef16016a1f216a6e-DbBhlkSE.png`} className="w-full h-full object-cover object-[center_30%]">
            <source src={`${WP}/2026/01/Starry-night-bg.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/30 via-brand-900/50 to-brand-900/80" />
        </div>
        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto pt-20">
          <img src={`${BOT}/divinity-gold-private-logo-CsVsJ4O6.png`} alt="DivinityAGI" className="w-64 sm:w-80 md:w-96 lg:w-[420px] mx-auto mb-8" />
          <p className="text-lg md:text-xl font-display italic text-white/60 mb-10 max-w-md mx-auto">
            No judgment. No preaching. You're in control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => setShowSignup(true)} className="px-8 py-3.5 bg-gold-500 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-gold-600 transition-all hover:shadow-lg hover:shadow-gold-500/30 uppercase w-full sm:w-auto inline-flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" /></svg>
              Start a Check-In -- Free
            </button>
            <button onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-3.5 border border-white/30 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-white/10 transition uppercase w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* CHOOSE YOUR WAY IN */}
      <section id="explore" className="py-20 lg:py-28 bg-brand-50">
        <div ref={stag.ref} className={CX}>
          <div className="text-center mb-14">
            <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">Your Journey Starts Here</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold text-brand-700 leading-tight">Choose Your Way In</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { icon: <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>, title: "Find My Guide", desc: "A personal match system to help you find the right kind of support for where you are today." },
              { icon: <><path d="M12 5a3 3 0 113 3m-3-3a3 3 0 10-3 3m3-3v1M9 8a3 3 0 103 3M9 8h1m5 0a3 3 0 11-3 3m3-3h-1m-2 3v-1" /><circle cx="12" cy="8" r="2" /><path d="M12 10v12" /><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5z" /><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5z" /></>, title: "Enter Quiet Space", desc: "Multi-faith guided meditations for calm, grounding, and reflection." },
              { icon: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" /><path d="M2 12h20" /></>, title: "Explore Traditions", desc: "A respectful multi-faith portal for exploring traditions -- without pressure or judgment." },
              { icon: <><path d="M7.9 20A9 9 0 104 16.1L2 22z" /></>, title: "Meet Leaders", desc: "Real people, represented as AI chat companions -- created with permission and clear boundaries." },
            ].map((card, i) => (
              <div key={i} className={stag.itemCls(i)} style={stag.itemStyle(i)}>
                <div className="group relative bg-white/70 backdrop-blur-sm border border-brand-100 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                  <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center mb-5">
                    <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">{card.icon}</svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-700 mb-2">{card.title}</h3>
                  <p className="text-[15px] text-brand-400 leading-relaxed">{card.desc}</p>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition">
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V8h-9" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAT PREVIEW + ABOUT */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div ref={f1.ref} className={`${CX} ${f1.cls}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">Live Preview</p>
              <h2 className="font-display text-3xl lg:text-[42px] font-bold text-brand-700 mb-5 leading-tight">
                A Conversation,<br />Not a Sermon
              </h2>
              <p className="text-brand-400 text-[15px] lg:text-base leading-relaxed mb-4">
                DivinityBot meets you where you are. Ask about <strong className="text-brand-600">meaning, doubt, grief, curiosity</strong> -- or just sit in silence. Every response is thoughtful, never preachy.
              </p>
              <p className="text-brand-400 text-[15px] lg:text-base leading-relaxed mb-7">
                Built on <strong className="text-brand-600">deeply researched spiritual traditions</strong>, grounded in compassion, and designed to listen first.
              </p>
              <button onClick={() => setShowSignup(true)} className="px-7 py-3 bg-gold-500 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-gold-600 transition-all hover:shadow-lg uppercase inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Try It Free
              </button>
            </div>
            <ChatPreview />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 lg:py-28 bg-brand-50">
        <div ref={f2.ref} className={`${CX} ${f2.cls}`}>
          <div className="text-center mb-14">
            <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">Simple & Respectful</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold text-brand-700 leading-tight">How It Works</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              { n: "01", title: "Choose a path", desc: "My Spirit Guide, Quiet Space, Circle of Faith, or Verified Leaders." },
              { n: "02", title: "Start a check-in", desc: "Ask what's on your mind -- or simply take a moment to breathe." },
              { n: "03", title: "Reflect at your pace", desc: "Save insights. Come back anytime. No timer, no pressure." },
            ].map((step, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-lg shadow-brand-500/20">{step.n}</div>
                <div>
                  <h3 className="font-display text-xl font-bold text-brand-700 mb-1">{step.title}</h3>
                  <p className="text-[15px] text-brand-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVINITY IS / IS NOT */}
      <section className="py-20 lg:py-28">
        <div ref={f3.ref} className={`${CX} ${f3.cls}`}>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-8 lg:p-10 rounded-2xl bg-brand-50 border border-brand-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-500 mb-3">Divinity is</h3>
              <p className="text-[15px] text-brand-400 leading-relaxed">A place for <strong className="text-brand-600">reflection</strong>, <strong className="text-brand-600">exploration</strong>, and <strong className="text-brand-600">support</strong> -- helping you slow down, discover what resonates, and find encouragement whenever you need it.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl bg-white border border-brand-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-700 mb-3">Divinity is not</h3>
              <p className="text-[15px] text-brand-400 leading-relaxed">Not a religion, not therapy, not a replacement for clergy, and <strong className="text-brand-600">not here to convert or judge</strong>. A complementary tool for reflection and preparation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY & SAFETY */}
      <section className="py-20 lg:py-28 bg-brand-50">
        <div ref={f4.ref} className={`${CX} ${f4.cls} text-center max-w-2xl mx-auto`}>
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-700 mb-5">Privacy & Safety</h2>
          <p className="text-brand-400 text-[15px] md:text-base leading-relaxed mb-3">
            Spiritual questions are personal. Divinity is designed to be <strong className="text-brand-600">respectful, transparent, and safe</strong>. Your conversations are confidential and can be deleted at any time.
          </p>
          <p className="text-brand-300 text-[14px] leading-relaxed">
            If you're in crisis or feeling unsafe, contact local emergency services or a crisis hotline.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <div ref={f5.ref} className={`${CX} ${f5.cls}`}>
          <div className="text-center mb-14">
            <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">Questions?</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold text-brand-700 leading-tight">Frequently Asked</h2>
          </div>
          <div className="max-w-2xl mx-auto divide-y divide-brand-100">
            {[
              { q: "Is Divinity a religion?", a: "No. It's a private space for reflection and exploration. No doctrine, no membership, no pressure." },
              { q: "Will it try to convert me?", a: "Never. Your beliefs are yours. Every tradition is honored equally -- no path ranked above another." },
              { q: "Is this therapy?", a: "No. Divinity supports reflection, not clinical care. If professional help is needed, our guides include crisis protocols." },
              { q: "Do I need to choose a faith?", a: "No. Start with curiosity and stay there as long as you want. Explore multiple traditions freely." },
            ].map((faq, i) => (
              <div key={i} className="py-6 first:pt-0 last:pb-0">
                <h3 className="font-display text-lg font-bold text-brand-700 mb-2">{faq.q}</h3>
                <p className="text-[15px] text-brand-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE GUIDES CTA */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-400/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />
        <div ref={f6.ref} className={`relative z-10 ${CX} text-center ${f6.cls}`}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Explore All Spirit Guides</h2>
          <p className="text-brand-200 text-[15px] md:text-base mb-9 max-w-lg mx-auto leading-relaxed">
            Discover 9+ AI companions from Christianity, Judaism, Buddhism, Indigenous traditions, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => navigate("/")} className="px-8 py-3.5 bg-gold-500 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-gold-600 transition-all hover:shadow-lg uppercase inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
              Meet All Guides
            </button>
            <button onClick={() => setShowSignup(true)} className="px-8 py-3.5 border border-white/30 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-white/10 transition uppercase">
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* READY TO BEGIN — video section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline poster={`${BOT}/3c5d95850e2e76f4394e8251568719a80d474f3c-Cw4huU01.png`} className="w-full h-full object-cover object-[center_20%]">
            <source src={`${WP}/2026/01/Home-Screen-Cover.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-brand-900/40" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>Ready to begin?</h2>
          <p className="text-white/90 text-lg md:text-xl" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>No judgment. No preaching. You're in control.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-900 py-12">
        <div className={CX}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#497EBC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              <span className="font-display text-white text-base font-semibold">DivinityAGI</span>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              <a href="https://divinityagi.com/privacy-policy/" className="text-[11px] tracking-wider text-white/40 hover:text-white transition font-semibold uppercase">Privacy</a>
              <a href="https://divinityagi.com/privacy-policy/" className="text-[11px] tracking-wider text-white/40 hover:text-white transition font-semibold uppercase">Terms</a>
              <a href="mailto:hello@divinityagi.com" className="text-[11px] tracking-wider text-white/40 hover:text-white transition font-semibold uppercase">Contact</a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 mb-6">
            <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase text-center sm:text-left mb-3">Site Versions</p>
            <div className="space-y-1">
              {[
                { label: "v1.0 -- Landing Page", path: "/", desc: "Main site", tag: "latest", tagCls: "bg-gold-500/20 text-gold-300" },
                { label: "v1.1 -- DivinityBot", path: "/bot", desc: "Bot page", current: true },
                { label: "v2.0 -- Redesign", path: "/v2", desc: "New layout" },
                { label: "DivinityBot.com", href: "https://www.divinitybot.com", desc: "Live app" },
                { label: "DivinityAGI.com", href: "https://divinityagi.com", desc: "WordPress" },
              ].map((v, i) => v.href ? (
                <a key={i} href={v.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/[0.03] transition group">
                  <span className="w-2 h-2 rounded-full bg-white/15 shrink-0" />
                  <span className="text-[12px] text-white/50 group-hover:text-white/80 font-medium">{v.label}</span>
                  <span className="text-[11px] text-white/20 ml-auto hidden sm:inline">{v.desc} &#8599;</span>
                </a>
              ) : (
                <button key={i} onClick={() => navigate(v.path!)} className={`flex items-center gap-3 px-3 py-2 rounded-md transition w-full text-left ${v.current ? "bg-brand-500/10" : "hover:bg-white/[0.03]"}`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${v.current ? "bg-brand-400 shadow-[0_0_6px_rgba(73,126,188,0.5)]" : "bg-white/15"}`} />
                  <span className={`text-[12px] font-medium ${v.current ? "text-white font-semibold" : "text-white/50"}`}>{v.label}</span>
                  {v.current && <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-400/20 text-brand-300">CURRENT</span>}
                  {v.tag && <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full ${v.tagCls}`}>{v.tag.toUpperCase()}</span>}
                  <span className="text-[11px] text-white/20 ml-auto hidden sm:inline">{v.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-5">
            <p className="text-center text-[11px] text-white/20">&copy; 2026 <strong className="text-white/30">DivinityAGI</strong> &middot; All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      {scrolled && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 w-11 h-11 bg-gradient-to-br from-brand-500 to-brand-700 text-white rounded-full shadow-lg shadow-brand-900/30 flex items-center justify-center hover:-translate-y-1 hover:shadow-xl transition-all z-40">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
        </button>
      )}

      {/* Signup Modal */}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  )
}
