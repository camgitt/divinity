import { useEffect, useState, useMemo } from "react"

const WP = "https://divinityagi.com/wp-content/uploads"
const BOT = "https://www.divinitybot.com/assets"

function navigate(to: string) {
  window.history.pushState({}, "", to)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

const STEPS = ["Account", "Profile", "Faith", "Confirmation"] as const

function SignupModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [pw, setPw] = useState("")
  const [pw2, setPw2] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)

  // Profile
  const [bio, setBio] = useState("")
  const [dob, setDob] = useState("")
  const [location, setLocation] = useState("")
  const [pronouns, setPronouns] = useState("")

  // Faith
  const [faith, setFaith] = useState("")
  const [experience, setExperience] = useState("")
  const [seeking, setSeeking] = useState<string[]>([])

  const faithOptions = [
    { id: "christian", label: "Christianity", icon: "✝️" },
    { id: "jewish", label: "Judaism", icon: "✡️" },
    { id: "buddhist", label: "Buddhism", icon: "☸️" },
    { id: "confucian", label: "Confucianism", icon: "🏛️" },
    { id: "indigenous", label: "Indigenous", icon: "🪶" },
    { id: "taoist", label: "Taoism", icon: "☯️" },
    { id: "bahai", label: "Bahá'í", icon: "⭐" },
    { id: "polytheist", label: "Polytheism", icon: "🌀" },
    { id: "shinto", label: "Shinto", icon: "⛩️" },
    { id: "exploring", label: "Just Exploring", icon: "🔍" },
  ]

  const seekingOptions = [
    "Daily reflection", "Grief support", "Meditation", "Community",
    "Scripture study", "Life guidance", "Inner peace", "Spiritual growth",
  ]

  const toggleSeeking = (s: string) => setSeeking(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const step2Valid = true // profile is optional
  const step3Valid = !!faith

  const pwChecks = useMemo(() => ({
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
  }), [pw])

  const pwValid = pwChecks.length && pwChecks.upper && pwChecks.lower && pwChecks.number
  const step1Valid = name.trim() && email.trim() && username.trim() && pwValid && pw === pw2

  const CheckIcon = ({ met }: { met: boolean }) => met
    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/></svg>

  return (
    <div className="signup-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="signup-modal">
        <button className="signup-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p className="sub">A clear 4-step setup for first-time completion</p>
          <p className="step-label">Step {step + 1} of {STEPS.length}</p>
          <p className="step-back-hint">You can go back anytime</p>

          <div className="signup-stepper">
            {STEPS.map((label, i) => (
              <div className="stepper-item" key={label}>
                {i < STEPS.length - 1 && <div className={`stepper-line ${i < step ? "done" : ""}`} />}
                <div className={`stepper-dot ${i === step ? "active" : i < step ? "done" : ""}`}>
                  {i < step ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg> : i + 1}
                </div>
                <span className={`stepper-label ${i === step ? "active" : ""}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {step === 0 && (
          <>
            <div className="signup-body">
              <p className="intro">Start with your account details. You can review everything before submitting.</p>

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                <p className="hint">We'll only use this for account and important updates.</p>
              </div>

              <div className="form-group">
                <label>Username</label>
                <div className="at-prefix">
                  <input type="text" placeholder="johndoe" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <p className="hint">This appears in community features.</p>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPw ? "text" : "password"} placeholder="Create a secure password" value={pw} onChange={e => setPw(e.target.value)} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }} aria-label={showPw ? "Hide password" : "Show password"}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                    </svg>
                  </button>
                </div>
                <div className="pw-reqs">
                  <span className={`pw-req ${pwChecks.length ? "met" : ""}`}><CheckIcon met={pwChecks.length} /> 8+ characters</span>
                  <span className={`pw-req ${pwChecks.upper ? "met" : ""}`}><CheckIcon met={pwChecks.upper} /> One uppercase</span>
                  <span className={`pw-req ${pwChecks.lower ? "met" : ""}`}><CheckIcon met={pwChecks.lower} /> One lowercase</span>
                  <span className={`pw-req ${pwChecks.number ? "met" : ""}`}><CheckIcon met={pwChecks.number} /> One number</span>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPw2 ? "text" : "password"} placeholder="Re-enter your password" value={pw2} onChange={e => setPw2(e.target.value)} />
                  <button type="button" onClick={() => setShowPw2(!showPw2)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }} aria-label={showPw2 ? "Hide password" : "Show password"}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPw2 ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                    </svg>
                  </button>
                </div>
                {pw2 && pw !== pw2 && <p className="hint" style={{ color: "#ef4444" }}>Passwords do not match.</p>}
              </div>
            </div>

            <div className="signup-footer">
              <button className="btn-back" onClick={onClose}>Back</button>
              <button className="btn-continue" disabled={!step1Valid} onClick={() => setStep(1)}>Continue</button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="signup-body">
              <p className="intro">Tell us a bit about yourself so we can personalize your experience. All fields are optional.</p>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  placeholder="A little about your spiritual journey..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  maxLength={200}
                  style={{ width: "100%", minHeight: 80, padding: "0.625rem 0.875rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", fontFamily: "'Raleway', sans-serif", fontSize: 14, color: "#111", background: "#f9fafb", outline: "none", resize: "vertical", transition: "all 0.2s" }}
                />
                <p className="hint">{bio.length}/200 characters</p>
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
                <p className="hint">Used to personalize your experience. Never shared publicly.</p>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="City, Country" value={location} onChange={e => setLocation(e.target.value)} />
                <p className="hint">Helps us suggest local faith communities.</p>
              </div>

              <div className="form-group">
                <label>Pronouns</label>
                <select
                  value={pronouns}
                  onChange={e => setPronouns(e.target.value)}
                  style={{ width: "100%", height: 42, padding: "0 0.875rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", fontFamily: "'Raleway', sans-serif", fontSize: 14, color: pronouns ? "#111" : "#9ca3af", background: "#f9fafb", outline: "none", cursor: "pointer" }}
                >
                  <option value="" disabled>Select pronouns</option>
                  <option value="he/him">He / Him</option>
                  <option value="she/her">She / Her</option>
                  <option value="they/them">They / Them</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="signup-footer">
              <button className="btn-back" onClick={() => setStep(0)}>Back</button>
              <button className="btn-continue" onClick={() => setStep(2)}>Continue</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="signup-body">
              <p className="intro">Choose your faith tradition or explore freely — no commitment required.</p>

              <div className="form-group">
                <label>Faith Tradition</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.25rem" }}>
                  {faithOptions.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFaith(f.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.625rem 0.75rem", borderRadius: "0.5rem",
                        border: faith === f.id ? "2px solid #497EBC" : "1px solid #d1d5db",
                        background: faith === f.id ? "rgba(73,126,188,0.06)" : "#f9fafb",
                        cursor: "pointer", transition: "all 0.2s",
                        fontFamily: "'Raleway', sans-serif", fontSize: 13, color: "#374151",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{f.icon}</span>
                      <span style={{ fontWeight: faith === f.id ? 600 : 400 }}>{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Experience Level</label>
                <select
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  style={{ width: "100%", height: 42, padding: "0 0.875rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", fontFamily: "'Raleway', sans-serif", fontSize: 14, color: experience ? "#111" : "#9ca3af", background: "#f9fafb", outline: "none", cursor: "pointer" }}
                >
                  <option value="" disabled>How familiar are you?</option>
                  <option value="new">New — just starting to explore</option>
                  <option value="some">Some background — know the basics</option>
                  <option value="practicing">Practicing — active in my faith</option>
                  <option value="deep">Deep — lifelong practitioner or scholar</option>
                </select>
              </div>

              <div className="form-group">
                <label>What are you seeking?</label>
                <p className="hint" style={{ marginBottom: "0.5rem" }}>Select all that apply.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {seekingOptions.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSeeking(s)}
                      style={{
                        padding: "0.4rem 0.85rem", borderRadius: "2rem",
                        border: seeking.includes(s) ? "1.5px solid #497EBC" : "1px solid #d1d5db",
                        background: seeking.includes(s) ? "rgba(73,126,188,0.08)" : "#fff",
                        color: seeking.includes(s) ? "#1e386e" : "#6b7280",
                        fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: seeking.includes(s) ? 600 : 400,
                        cursor: "pointer", transition: "all 0.2s",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="signup-footer">
              <button className="btn-back" onClick={() => setStep(1)}>Back</button>
              <button className="btn-continue" disabled={!step3Valid} onClick={() => setStep(3)}>Continue</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="signup-body">
              <p className="intro">Review your details and confirm your account.</p>

              {/* Account summary */}
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: "#374151", padding: "1.25rem", background: "#f9fafb", borderRadius: "0.5rem", marginBottom: "0.75rem", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>ACCOUNT</div>
                <div style={{ lineHeight: 1.9 }}>
                  <div><strong>Name:</strong> {name}</div>
                  <div><strong>Email:</strong> {email}</div>
                  <div><strong>Username:</strong> @{username}</div>
                </div>
                <button type="button" onClick={() => setStep(0)} style={{ marginTop: "0.5rem", background: "none", border: "none", color: "#497EBC", fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}>Edit</button>
              </div>

              {/* Profile summary */}
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: "#374151", padding: "1.25rem", background: "#f9fafb", borderRadius: "0.5rem", marginBottom: "0.75rem", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>PROFILE</div>
                <div style={{ lineHeight: 1.9 }}>
                  {bio && <div><strong>Bio:</strong> {bio}</div>}
                  {dob && <div><strong>Date of Birth:</strong> {dob}</div>}
                  {location && <div><strong>Location:</strong> {location}</div>}
                  {pronouns && <div><strong>Pronouns:</strong> {pronouns}</div>}
                  {!bio && !dob && !location && !pronouns && <div style={{ color: "#9ca3af", fontStyle: "italic" }}>No profile details added</div>}
                </div>
                <button type="button" onClick={() => setStep(1)} style={{ marginTop: "0.5rem", background: "none", border: "none", color: "#497EBC", fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}>Edit</button>
              </div>

              {/* Faith summary */}
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: "#374151", padding: "1.25rem", background: "#f9fafb", borderRadius: "0.5rem", marginBottom: "0.5rem", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>FAITH</div>
                <div style={{ lineHeight: 1.9 }}>
                  <div><strong>Tradition:</strong> {faithOptions.find(f => f.id === faith)?.icon} {faithOptions.find(f => f.id === faith)?.label || "—"}</div>
                  {experience && <div><strong>Experience:</strong> {experience}</div>}
                  {seeking.length > 0 && <div><strong>Seeking:</strong> {seeking.join(", ")}</div>}
                </div>
                <button type="button" onClick={() => setStep(2)} style={{ marginTop: "0.5rem", background: "none", border: "none", color: "#497EBC", fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}>Edit</button>
              </div>
            </div>
            <div className="signup-footer">
              <button className="btn-back" onClick={() => setStep(2)}>Back</button>
              <button className="btn-continue" onClick={onClose}>Create Account</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function BotPage() {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => setLoaded(true))
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <>
      <style>{`
        .bot-page *, .bot-page *::before, .bot-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .bot-page { font-family: 'Raleway', sans-serif; background: #fff; color: #111; overflow-x: hidden; min-height: 100vh; }
        .bot-page .hero-outer { position: relative; background: #fff; overflow-x: hidden; }
        .bot-page .hero-tint { position: fixed; inset: 0; background: rgba(0,0,0,0.15); pointer-events: none; z-index: 5; }
        .bot-page .hero-inner { position: relative; min-height: 100vh; display: flex; flex-direction: column; }
        .bot-page .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
        .bot-page .hero-logo-wrap { position: relative; z-index: 10; width: 100%; padding: 4rem 1rem 0.5rem; text-align: center; }
        .bot-page .hero-logo-wrap img { width: 280px; height: auto; margin: 0 auto; display: block; }
        @media (min-width: 640px) { .bot-page .hero-logo-wrap img { width: 380px; } }
        @media (min-width: 768px) { .bot-page .hero-logo-wrap img { width: 480px; } }
        @media (min-width: 1024px) { .bot-page .hero-logo-wrap img { width: 550px; } }
        .bot-page .hero-tagline-wrap { position: relative; z-index: 10; flex: 1; display: flex; align-items: center; justify-content: center; padding: 0 1rem; margin-bottom: 30vh; }
        .bot-page .hero-tagline { color: #fff; text-align: center; font-family: 'Raleway', sans-serif; font-weight: 500; letter-spacing: 0.025em; font-style: italic; font-size: 20px; padding: 0 40px; text-shadow: 0 2px 4px rgba(0,0,0,0.4); }
        .bot-page .cta-bar { position: fixed; bottom: 1.5rem; left: 0; right: 0; z-index: 20; padding: 0 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.625rem; }
        @media (min-width: 640px) { .bot-page .cta-bar { bottom: 2rem; padding: 0 1.5rem; } }
        .bot-page .btn-checkin { position: relative; width: 100%; max-width: 340px; height: 42px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.5rem; background: rgba(0,0,0,0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.3); color: #fff; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .bot-page .btn-checkin:hover { background: rgba(0,0,0,0.5); box-shadow: 0 10px 15px rgba(0,0,0,0.2); transform: translateY(-1px); }
        .bot-page .btn-checkin:active { transform: scale(0.95); }
        .bot-page .btn-checkin .heart-svg { width: 16px; height: 16px; fill: #C9A882; stroke: #C9A882; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
        .bot-page .btn-checkin span { font-family: 'Raleway', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.05em; }
        @media (min-width: 640px) { .bot-page .btn-checkin span { font-size: 14px; } }
        .bot-page .cta-btn-row { width: 100%; max-width: 340px; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .bot-page .btn-gold { position: relative; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 0.5rem; background: linear-gradient(to right, #b69e60, #a08e54); color: #fff; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
        .bot-page .btn-gold:hover { background: linear-gradient(to right, #a58d55, #8f7c4a); box-shadow: 0 10px 15px rgba(0,0,0,0.2); transform: translateY(-1px); }
        .bot-page .btn-gold:active { transform: scale(0.95); }
        .bot-page .btn-gold-sheen { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent, rgba(0,0,0,0.1)); border-radius: 0.5rem; }
        .bot-page .btn-gold span { position: relative; font-family: 'Raleway', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.05em; text-shadow: 0 1px 2px rgba(0,0,0,0.2); color: #fff; }
        @media (min-width: 640px) { .bot-page .btn-gold span { font-size: 14px; } }
        .bot-page .content-sections { position: relative; background: #e9f2f8; }
        .bot-page section { background: #e9f2f8; }
        .bot-page .ways-section { padding: 4rem 1rem; max-width: 72rem; margin: 0 auto; }
        @media (min-width: 640px) { .bot-page .ways-section { padding: 5rem 1rem; } }
        .bot-page .section-h2 { text-align: center; font-family: 'Playfair Display', serif; font-size: 32px; color: #1e386e; margin-bottom: 3rem; }
        @media (min-width: 640px) { .bot-page .section-h2 { font-size: 40px; } }
        .bot-page .ways-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; max-width: 56rem; margin: 0 auto; }
        @media (min-width: 640px) { .bot-page .ways-grid { grid-template-columns: 1fr 1fr; } }
        .bot-page .way-card { background: rgba(255,255,255,0.6); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(73,126,188,0.2); border-radius: 0.75rem; padding: 1.5rem; transition: all 0.3s; cursor: pointer; }
        .bot-page .way-card:hover { box-shadow: 0 10px 25px rgba(0,0,0,0.1); transform: translateY(-2px); border-color: rgba(73,126,188,0.4); }
        .bot-page .card-icon { margin-bottom: 1rem; color: #497EBC; }
        .bot-page .card-icon svg { width: 24px; height: 24px; stroke: #497EBC; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .bot-page .card-h3 { font-family: 'Playfair Display', serif; font-size: 20px; color: #1e386e; margin-bottom: 0.5rem; }
        .bot-page .card-p { font-family: 'Raleway', sans-serif; font-size: 15px; color: #374151; line-height: 1.625; }
        .bot-page .how-section { padding: 4rem 1rem; background: #e9f2f8; }
        @media (min-width: 640px) { .bot-page .how-section { padding: 5rem 1rem; } }
        .bot-page .how-inner { max-width: 56rem; margin: 0 auto; }
        .bot-page .steps-wrap { display: flex; flex-direction: column; gap: 2rem; }
        .bot-page .step { display: flex; gap: 1.5rem; align-items: flex-start; }
        .bot-page .step-num { flex-shrink: 0; width: 3rem; height: 3rem; border-radius: 50%; background: linear-gradient(135deg, #497EBC, #1E3A5F); color: #fff; display: flex; align-items: center; justify-content: center; font-family: 'Raleway', sans-serif; font-weight: 600; font-size: 18px; box-shadow: 0 4px 12px rgba(73,126,188,0.3); }
        .bot-page .step h3 { font-family: 'Playfair Display', serif; font-size: 20px; color: #1e386e; margin-bottom: 0.25rem; }
        .bot-page .step p { font-family: 'Raleway', sans-serif; font-size: 15px; color: #374151; line-height: 1.625; }
        .bot-page .is-section { padding: 4rem 1rem; max-width: 56rem; margin: 0 auto; background: #e9f2f8; }
        @media (min-width: 640px) { .bot-page .is-section { padding: 5rem 1rem; } }
        .bot-page .is-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        @media (min-width: 768px) { .bot-page .is-grid { grid-template-columns: 1fr 1fr; } }
        .bot-page .is-card { border-radius: 0.75rem; padding: 2rem; border: 1px solid rgba(73,126,188,0.2); transition: all 0.3s; }
        .bot-page .is-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .bot-page .is-card.tinted { background: rgba(73,126,188,0.05); }
        .bot-page .is-card.white { background: rgba(255,255,255,0.6); backdrop-filter: blur(8px); }
        .bot-page .is-card h3 { font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 1rem; }
        .bot-page .is-card.tinted h3 { color: #497EBC; }
        .bot-page .is-card.white h3 { color: #1e386e; }
        .bot-page .is-card p { font-family: 'Raleway', sans-serif; font-size: 15px; color: #374151; line-height: 1.625; }
        .bot-page .privacy-section { padding: 4rem 1rem; background: #e9f2f8; }
        @media (min-width: 640px) { .bot-page .privacy-section { padding: 5rem 1rem; } }
        .bot-page .privacy-inner { max-width: 48rem; margin: 0 auto; text-align: center; }
        .bot-page .shield-icon { display: block; margin: 0 auto 1.5rem; width: 40px; height: 40px; stroke: #497EBC; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .bot-page .privacy-inner h2 { font-family: 'Playfair Display', serif; font-size: 32px; color: #1e386e; margin-bottom: 1.5rem; }
        @media (min-width: 640px) { .bot-page .privacy-inner h2 { font-size: 40px; } }
        .bot-page .privacy-inner p { font-family: 'Raleway', sans-serif; font-size: 16px; color: #374151; line-height: 1.7; margin-bottom: 1rem; }
        .bot-page .privacy-inner p.small { font-size: 15px; color: #4b5563; }
        .bot-page .faq-section { padding: 4rem 1rem; max-width: 48rem; margin: 50px 0 -67px; background: #e9f2f8; }
        @media (min-width: 640px) { .bot-page .faq-section { padding: 5rem 1rem; } }
        .bot-page .faq-section h2 { text-align: center; font-family: 'Playfair Display', serif; font-size: 32px; color: #1e386e; margin-bottom: 3rem; }
        @media (min-width: 640px) { .bot-page .faq-section h2 { font-size: 40px; } }
        .bot-page .faq-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .bot-page .faq-item { border-bottom: 1px solid #e5e7eb; padding-bottom: 1.5rem; transition: all 0.3s; }
        .bot-page .faq-item:hover { padding-left: 0.5rem; }
        .bot-page .faq-item:last-child { border-bottom: none; }
        .bot-page .faq-item h3 { font-family: 'Playfair Display', serif; font-size: 18px; color: #1e386e; margin-bottom: 0.5rem; }
        .bot-page .faq-item p { font-family: 'Raleway', sans-serif; font-size: 15px; color: #374151; line-height: 1.625; }
        .bot-page .logo-break { padding: 8rem 1rem 1rem; max-width: 42rem; margin: 0 auto; position: relative; z-index: 20; display: flex; justify-content: center; background: #e9f2f8; }
        @media (min-width: 640px) { .bot-page .logo-break { padding: 10rem 1rem 1.5rem; } }
        .bot-page .logo-break img { width: 100%; max-width: 32rem; height: auto; object-fit: contain; padding: 0 2rem; }
        .bot-page .ready-section { position: relative; min-height: 100vh; width: 100%; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 5rem; margin-top: -8rem; background: #e9f2f8; }
        @media (min-width: 640px) { .bot-page .ready-section { padding-bottom: 8rem; } }
        .bot-page .ready-video-wrap { position: absolute; inset: 0; width: 100%; height: 100%; }
        .bot-page .ready-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 20%; }
        .bot-page .ready-content { position: relative; z-index: 10; width: 100%; max-width: 42rem; margin: 74px 0; padding: 0 1rem; text-align: center; }
        .bot-page .ready-text-inner { padding: 51px 103px; }
        @media (max-width: 640px) { .bot-page .ready-text-inner { padding: 2rem 1.5rem; } }
        .bot-page .ready-content h2 { font-family: 'Playfair Display', serif; font-size: 36px; color: #fff; margin-bottom: 1.5rem; text-shadow: 0 4px 12px rgba(0,0,0,0.5); }
        @media (min-width: 640px) { .bot-page .ready-content h2 { font-size: 48px; } }
        @media (min-width: 768px) { .bot-page .ready-content h2 { font-size: 56px; } }
        .bot-page .ready-content p { font-family: 'Raleway', sans-serif; font-size: 18px; color: rgba(255,255,255,0.95); text-shadow: 0 2px 8px rgba(0,0,0,0.5); max-width: 36rem; margin: 0 auto; padding: 0 7px; }
        @media (min-width: 640px) { .bot-page .ready-content p { font-size: 20px; } }
        .bot-page .scroll-top-btn { position: fixed; bottom: 6rem; right: 2rem; width: 3rem; height: 3rem; background: linear-gradient(to right, #497EBC, #1E3A5F); color: #fff; border: 1px solid rgba(73,126,188,0.3); border-radius: 50%; box-shadow: 0 10px 15px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 40; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: all 0.3s; }
        .bot-page .scroll-top-btn:hover { background: linear-gradient(to right, #3A6BA5, #497EBC); transform: translateY(-2px) scale(1.1); box-shadow: 0 15px 20px rgba(0,0,0,0.25); }
        .bot-page .scroll-top-btn svg { width: 20px; height: 20px; stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

        /* signup modal */
        .bot-page .signup-overlay { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.6); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .bot-page .signup-modal { position: relative; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; background: #fff; border-radius: 1rem; box-shadow: 0 25px 60px rgba(0,0,0,0.3); }
        .bot-page .signup-header { padding: 2rem 2rem 0; text-align: center; }
        .bot-page .signup-header h2 { font-family: 'Playfair Display', serif; font-size: 26px; color: #1e386e; margin-bottom: 0.25rem; }
        .bot-page .signup-header p.sub { font-family: 'Raleway', sans-serif; font-size: 13px; color: #6b7280; margin-bottom: 1.5rem; }
        .bot-page .signup-header .step-label { font-family: 'Raleway', sans-serif; font-size: 12px; color: #9ca3af; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
        .bot-page .signup-header .step-back-hint { font-family: 'Raleway', sans-serif; font-size: 11px; color: #c9a882; margin-bottom: 1.25rem; }
        .bot-page .signup-stepper { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 1.5rem; padding: 0 1rem; }
        .bot-page .stepper-item { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
        .bot-page .stepper-dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Raleway', sans-serif; font-size: 13px; font-weight: 700; transition: all 0.3s; border: 2px solid #e5e7eb; background: #fff; color: #9ca3af; z-index: 2; }
        .bot-page .stepper-dot.active { background: linear-gradient(135deg, #497EBC, #1E3A5F); border-color: #497EBC; color: #fff; box-shadow: 0 2px 8px rgba(73,126,188,0.3); }
        .bot-page .stepper-dot.done { background: #497EBC; border-color: #497EBC; color: #fff; }
        .bot-page .stepper-label { font-family: 'Raleway', sans-serif; font-size: 11px; color: #9ca3af; margin-top: 0.35rem; letter-spacing: 0.02em; }
        .bot-page .stepper-label.active { color: #1e386e; font-weight: 600; }
        .bot-page .stepper-line { position: absolute; top: 16px; left: 50%; width: 100%; height: 2px; background: #e5e7eb; z-index: 1; }
        .bot-page .stepper-line.done { background: #497EBC; }
        .bot-page .signup-body { padding: 0 2rem 1.5rem; }
        .bot-page .signup-body .intro { font-family: 'Raleway', sans-serif; font-size: 13px; color: #6b7280; line-height: 1.5; margin-bottom: 1.25rem; }
        .bot-page .form-group { margin-bottom: 1rem; }
        .bot-page .form-group label { display: block; font-family: 'Raleway', sans-serif; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 0.35rem; letter-spacing: 0.02em; }
        .bot-page .form-group input { width: 100%; height: 42px; padding: 0 0.875rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-family: 'Raleway', sans-serif; font-size: 14px; color: #111; background: #f9fafb; outline: none; transition: all 0.2s; }
        .bot-page .form-group input:focus { border-color: #497EBC; box-shadow: 0 0 0 3px rgba(73,126,188,0.1); background: #fff; }
        .bot-page .form-group input::placeholder { color: #9ca3af; }
        .bot-page .form-group .hint { font-family: 'Raleway', sans-serif; font-size: 11px; color: #9ca3af; margin-top: 0.3rem; }
        .bot-page .form-group .at-prefix { position: relative; }
        .bot-page .form-group .at-prefix input { padding-left: 2rem; }
        .bot-page .form-group .at-prefix::before { content: '@'; position: absolute; left: 0.875rem; top: 50%; transform: translateY(-50%); font-family: 'Raleway', sans-serif; font-size: 14px; color: #9ca3af; pointer-events: none; }
        .bot-page .pw-reqs { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; margin-top: 0.5rem; margin-bottom: 0.25rem; }
        .bot-page .pw-req { font-family: 'Raleway', sans-serif; font-size: 11px; color: #9ca3af; display: flex; align-items: center; gap: 0.3rem; transition: color 0.2s; }
        .bot-page .pw-req.met { color: #16a34a; }
        .bot-page .pw-req svg { width: 14px; height: 14px; flex-shrink: 0; }
        .bot-page .signup-footer { display: flex; gap: 0.75rem; padding: 0 2rem 2rem; }
        .bot-page .btn-back { flex: 1; height: 44px; border: 1px solid #d1d5db; border-radius: 0.5rem; background: #fff; color: #374151; font-family: 'Raleway', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .bot-page .btn-back:hover { background: #f3f4f6; }
        .bot-page .btn-continue { flex: 2; height: 44px; border: none; border-radius: 0.5rem; background: linear-gradient(135deg, #497EBC, #1E3A5F); color: #fff; font-family: 'Raleway', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.03em; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(73,126,188,0.3); }
        .bot-page .btn-continue:hover { box-shadow: 0 6px 20px rgba(73,126,188,0.4); transform: translateY(-1px); }
        .bot-page .btn-continue:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .bot-page .signup-close { position: absolute; top: 1rem; right: 1rem; width: 32px; height: 32px; border-radius: 50%; border: none; background: #f3f4f6; color: #6b7280; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 2; }
        .bot-page .signup-close:hover { background: #e5e7eb; color: #111; }

        /* back nav */
        .bot-page .back-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; padding: 0 1.5rem; height: 56px; display: flex; align-items: center; justify-content: space-between; transition: all 0.4s; }
        .bot-page .back-nav.scrolled { background: rgba(30,56,110,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 2px 20px rgba(0,0,0,0.15); }
        .bot-page .back-btn { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.8); font-family: 'Raleway', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.03em; background: none; border: none; cursor: pointer; padding: 0.5rem 0; transition: color 0.3s; }
        .bot-page .back-btn:hover { color: #fff; }
        .bot-page .back-btn svg { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 2; }
        .bot-page .nav-cta { display: flex; align-items: center; gap: 0.75rem; }
        .bot-page .nav-cta a { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 1rem; border-radius: 2rem; font-family: 'Raleway', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-decoration: none; transition: all 0.3s; }
        .bot-page .nav-cta .btn-nav-gold { background: linear-gradient(to right, #b69e60, #a08e54); color: #fff; box-shadow: 0 2px 8px rgba(182,158,96,0.3); }
        .bot-page .nav-cta .btn-nav-gold:hover { box-shadow: 0 4px 16px rgba(182,158,96,0.4); transform: translateY(-1px); }
        .bot-page .nav-cta .btn-nav-outline { border: 1px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.8); }
        .bot-page .nav-cta .btn-nav-outline:hover { background: rgba(255,255,255,0.1); color: #fff; }

        /* version footer */
        .bot-page .version-footer { background: #0f1b33; padding: 3rem 1rem 2rem; }
        .bot-page .version-footer-inner { max-width: 48rem; margin: 0 auto; }
        .bot-page .vf-top { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
        @media (min-width: 640px) { .bot-page .vf-top { flex-direction: row; justify-content: space-between; } }
        .bot-page .vf-brand { display: flex; align-items: center; gap: 0.5rem; }
        .bot-page .vf-brand span { font-family: 'Playfair Display', serif; font-size: 16px; color: #fff; font-weight: 600; }
        .bot-page .vf-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem 1.25rem; }
        .bot-page .vf-links a, .bot-page .vf-links button { font-family: 'Raleway', sans-serif; font-size: 12px; color: rgba(255,255,255,0.5); background: none; border: none; cursor: pointer; text-decoration: none; letter-spacing: 0.03em; transition: color 0.2s; padding: 0; }
        .bot-page .vf-links a:hover, .bot-page .vf-links button:hover { color: #fff; }
        .bot-page .vf-divider { width: 100%; height: 1px; background: rgba(255,255,255,0.08); margin: 0.5rem 0; }
        .bot-page .vf-versions { margin-bottom: 1.5rem; }
        .bot-page .vf-versions-label { font-family: 'Raleway', sans-serif; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.25); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.75rem; text-align: center; }
        @media (min-width: 640px) { .bot-page .vf-versions-label { text-align: left; } }
        .bot-page .vf-version-list { display: flex; flex-direction: column; gap: 0.4rem; }
        .bot-page .vf-version { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; border-radius: 0.375rem; transition: background 0.2s; cursor: pointer; background: none; border: none; width: 100%; text-align: left; }
        .bot-page .vf-version:hover { background: rgba(255,255,255,0.04); }
        .bot-page .vf-version.active { background: rgba(73,126,188,0.12); }
        .bot-page .vf-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; border: 1.5px solid rgba(255,255,255,0.2); }
        .bot-page .vf-dot.active { background: #497EBC; border-color: #497EBC; box-shadow: 0 0 6px rgba(73,126,188,0.5); }
        .bot-page .vf-dot.other { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.15); }
        .bot-page .vf-version-name { font-family: 'Raleway', sans-serif; font-size: 13px; color: rgba(255,255,255,0.7); font-weight: 500; }
        .bot-page .vf-version.active .vf-version-name { color: #fff; font-weight: 600; }
        .bot-page .vf-version-tag { font-family: 'Raleway', sans-serif; font-size: 10px; padding: 0.15rem 0.5rem; border-radius: 2rem; letter-spacing: 0.04em; font-weight: 600; }
        .bot-page .vf-tag-current { background: rgba(73,126,188,0.2); color: #7EB3E0; }
        .bot-page .vf-tag-latest { background: rgba(182,158,96,0.2); color: #C9A882; }
        .bot-page .vf-version-desc { font-family: 'Raleway', sans-serif; font-size: 11px; color: rgba(255,255,255,0.3); margin-left: auto; }
        @media (max-width: 640px) { .bot-page .vf-version-desc { display: none; } }
        .bot-page .vf-line { position: relative; }
        .bot-page .vf-line::before { content: ''; position: absolute; left: calc(0.75rem + 3.5px); top: -0.4rem; width: 1px; height: calc(100% + 0.8rem); background: rgba(255,255,255,0.06); }
        .bot-page .vf-line:first-child::before { top: 50%; height: 50%; }
        .bot-page .vf-line:last-child::before { height: 50%; }
        .bot-page .vf-copyright { text-align: center; font-family: 'Raleway', sans-serif; font-size: 11px; color: rgba(255,255,255,0.25); }
        .bot-page .vf-copyright strong { color: rgba(255,255,255,0.4); }

        /* page fade in */
        .bot-page .page-fade { opacity: 0; transform: translateY(12px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .bot-page .page-fade.show { opacity: 1; transform: translateY(0); }

        /* explore banner */
        .bot-page .explore-banner { background: linear-gradient(135deg, #1e386e, #2a5298); padding: 3rem 1.5rem; text-align: center; }
        .bot-page .explore-banner h3 { font-family: 'Playfair Display', serif; font-size: 28px; color: #fff; margin-bottom: 0.75rem; }
        @media (min-width: 640px) { .bot-page .explore-banner h3 { font-size: 34px; } }
        .bot-page .explore-banner p { font-family: 'Raleway', sans-serif; font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 1.5rem; max-width: 28rem; margin-left: auto; margin-right: auto; line-height: 1.6; }
        .bot-page .explore-banner .btn-row { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        .bot-page .explore-banner .btn-row a,
        .bot-page .explore-banner .btn-row button { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.65rem 1.5rem; border-radius: 2rem; font-family: 'Raleway', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; cursor: pointer; transition: all 0.3s; text-decoration: none; }
        .bot-page .explore-banner .btn-explore-gold { background: linear-gradient(to right, #b69e60, #a08e54); color: #fff; border: none; box-shadow: 0 4px 12px rgba(182,158,96,0.3); }
        .bot-page .explore-banner .btn-explore-gold:hover { box-shadow: 0 6px 20px rgba(182,158,96,0.4); transform: translateY(-1px); }
        .bot-page .explore-banner .btn-explore-outline { background: none; border: 1px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.9); }
        .bot-page .explore-banner .btn-explore-outline:hover { background: rgba(255,255,255,0.1); }
      `}</style>

      <div className={`bot-page page-fade ${loaded ? "show" : ""}`}>
        {/* Back nav */}
        <div className={`back-nav ${scrolled ? "scrolled" : ""}`}>
          <button className="back-btn" onClick={() => navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 12H5m0 0l7 7m-7-7l7-7" /></svg>
            DivinityAGI
          </button>
          <div className="nav-cta">
            <a href="https://divinityagi.com/subscribe-now/" className="btn-nav-gold">Buy Minutes</a>
            <button onClick={() => navigate("/")} className="btn-nav-outline" style={{ border: "1px solid rgba(255,255,255,0.3)", background: "none", color: "rgba(255,255,255,0.8)" }}>
              Explore Guides
            </button>
          </div>
        </div>

        <div className="hero-outer">
          <div className="hero-tint" aria-hidden="true" />

          {/* HERO */}
          <div className="hero-inner">
            <video
              autoPlay loop muted playsInline
              poster={`${BOT}/c24f7eb5677fe9329b550d72ef16016a1f216a6e-DbBhlkSE.png`}
              className="hero-video"
            >
              <source src={`${WP}/2026/01/Starry-night-bg.mp4`} type="video/mp4" />
            </video>

            <div className="hero-logo-wrap">
              <img src={`${BOT}/divinity-gold-private-logo-CsVsJ4O6.png`} alt="DivinityAGI" />
            </div>

            <div className="hero-tagline-wrap">
              <p className="hero-tagline">No judgment. No preaching. You're in control.</p>
            </div>
          </div>

          {/* FIXED CTA BAR */}
          <div className="cta-bar">
            <button className="btn-checkin">
              <svg className="heart-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              <span>Start a Check-In — Free</span>
            </button>
            <div className="cta-btn-row">
              <button className="btn-gold" onClick={() => setShowSignup(true)}>
                <div className="btn-gold-sheen" />
                <span>Create Account</span>
              </button>
              <button className="btn-gold">
                <div className="btn-gold-sheen" />
                <span>Sign In</span>
              </button>
            </div>
          </div>

          {/* CONTENT SECTIONS */}
          <div className="content-sections">

            {/* Choose your way in */}
            <section>
              <div className="ways-section">
                <h2 className="section-h2">Choose your way in</h2>
                <div className="ways-grid">
                  <div className="way-card">
                    <div className="card-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <h3 className="card-h3">Find My Guide</h3>
                    <p className="card-p">A personal match system to help you find the right kind of support for where you are today.</p>
                  </div>

                  <div className="way-card">
                    <div className="card-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/>
                        <circle cx="12" cy="8" r="2"/><path d="M12 10v12"/>
                        <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/>
                        <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>
                      </svg>
                    </div>
                    <h3 className="card-h3">Enter Quiet Space</h3>
                    <p className="card-p">Multi-faith guided meditations for calm, grounding, and reflection.</p>
                  </div>

                  <div className="way-card">
                    <div className="card-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                      </svg>
                    </div>
                    <h3 className="card-h3">Explore</h3>
                    <p className="card-p">A respectful multi-faith portal for exploring traditions—without pressure or judgment.</p>
                  </div>

                  <div className="way-card">
                    <div className="card-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
                      </svg>
                    </div>
                    <h3 className="card-h3">Meet Leaders</h3>
                    <p className="card-p">Real people, represented as AI chat companions—created with permission and clear boundaries.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How it works */}
            <section className="how-section">
              <div className="how-inner">
                <h2 className="section-h2">How it works</h2>
                <div className="steps-wrap">
                  <div className="step">
                    <div className="step-num">1</div>
                    <div>
                      <h3>Choose a path</h3>
                      <p>My Spirit Guide, Quiet Space, Circle of Faith, or Verified Leaders.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-num">2</div>
                    <div>
                      <h3>Start a check-in</h3>
                      <p>Ask what's on your mind—or simply take a moment to breathe.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-num">3</div>
                    <div>
                      <h3>Reflect at your pace</h3>
                      <p>Save insights. Come back anytime.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divinity is / is not */}
            <section>
              <div className="is-section">
                <div className="is-grid">
                  <div className="is-card tinted">
                    <h3>Divinity is</h3>
                    <p>Reflection, exploration, and support.</p>
                  </div>
                  <div className="is-card white">
                    <h3>Divinity is not</h3>
                    <p>A religion, therapy, or a replacement for clergy.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy & Safety */}
            <section className="privacy-section">
              <div className="privacy-inner">
                <svg className="shield-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                </svg>
                <h2>Privacy &amp; safety</h2>
                <p>Spiritual questions are personal. Divinity is designed to be respectful and transparent.</p>
                <p className="small">If you're in crisis or feeling unsafe, contact local emergency services or a crisis hotline.</p>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <div className="faq-section">
                <h2>Frequently asked questions</h2>
                <div className="faq-list">
                  <div className="faq-item">
                    <h3>Is Divinity a religion?</h3>
                    <p>No. It's a private space for reflection and exploration.</p>
                  </div>
                  <div className="faq-item">
                    <h3>Will it try to convert me?</h3>
                    <p>No. Your beliefs are yours.</p>
                  </div>
                  <div className="faq-item">
                    <h3>Is this therapy?</h3>
                    <p>No. Divinity supports reflection, not clinical care.</p>
                  </div>
                  <div className="faq-item">
                    <h3>Do I need to choose a faith?</h3>
                    <p>No. Start with curiosity and stay there if you want.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Explore banner — CTA back to main site */}
            <section>
              <div className="explore-banner">
                <h3>Explore All Spirit Guides</h3>
                <p>Discover 9+ AI companions from Christianity, Judaism, Buddhism, Indigenous traditions, and more.</p>
                <div className="btn-row">
                  <button onClick={() => navigate("/")} className="btn-explore-gold">
                    <svg style={{ width: 16, height: 16, stroke: "currentColor", fill: "none", strokeWidth: 2 }} viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Meet All Guides
                  </button>
                  <a href="https://divinityagi.com/subscribe-now/" className="btn-explore-outline">Buy Minutes</a>
                </div>
              </div>
            </section>

            {/* Logo break */}
            <section style={{ background: "#e9f2f8" }}>
              <div className="logo-break">
                <img src={`${BOT}/divinity-gold-private-logo-black-DEi-Os5Q.png`} alt="DivinityAGI - A Private Place to Reflect" />
              </div>
            </section>

            {/* Ready to begin */}
            <section className="ready-section">
              <div className="ready-video-wrap">
                <video
                  autoPlay loop muted playsInline
                  poster={`${BOT}/3c5d95850e2e76f4394e8251568719a80d474f3c-Cw4huU01.png`}
                  className="ready-video"
                >
                  <source src={`${WP}/2026/01/Home-Screen-Cover.mp4`} type="video/mp4" />
                </video>
              </div>
              <div className="ready-content">
                <div className="ready-text-inner">
                  <h2>Ready to begin?</h2>
                  <p>No judgment. No preaching. You're in control.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="version-footer">
              <div className="version-footer-inner">
                <div className="vf-top">
                  <div className="vf-brand">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#497EBC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>DivinityAGI</span>
                  </div>
                  <div className="vf-links">
                    <a href="https://divinityagi.com/privacy-policy/">Privacy</a>
                    <a href="https://divinityagi.com/privacy-policy/">Terms</a>
                    <a href="mailto:hello@divinityagi.com">Contact</a>
                    <a href="https://divinityagi.com/subscribe-now/">Buy Minutes</a>
                  </div>
                </div>

                <div className="vf-divider" />

                <div className="vf-versions">
                  <div className="vf-versions-label">Site Versions</div>
                  <div className="vf-version-list">
                    <button className="vf-version vf-line" onClick={() => navigate("/")}>
                      <span className="vf-dot other" />
                      <span className="vf-version-name">v1.0 — Landing Page</span>
                      <span className="vf-version-tag vf-tag-latest">latest</span>
                      <span className="vf-version-desc">Main site · Spirit guides · Pricing</span>
                    </button>
                    <button className="vf-version active vf-line" onClick={() => navigate("/bot")}>
                      <span className="vf-dot active" />
                      <span className="vf-version-name">v1.1 — DivinityBot</span>
                      <span className="vf-version-tag vf-tag-current">current</span>
                      <span className="vf-version-desc">Bot page · Signup flow · Check-in</span>
                    </button>
                    <button className="vf-version vf-line" onClick={() => navigate("/v2")}>
                      <span className="vf-dot other" />
                      <span className="vf-version-name">v2.0 — Redesign</span>
                      <span className="vf-version-desc">New layout · Updated sections</span>
                    </button>
                    <a className="vf-version vf-line" href="https://www.divinitybot.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <span className="vf-dot other" />
                      <span className="vf-version-name">DivinityBot.com</span>
                      <span className="vf-version-desc">Live app · External ↗</span>
                    </a>
                    <a className="vf-version vf-line" href="https://divinityagi.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <span className="vf-dot other" />
                      <span className="vf-version-name">DivinityAGI.com</span>
                      <span className="vf-version-desc">WordPress · Main site ↗</span>
                    </a>
                  </div>
                </div>

                <div className="vf-divider" />
                <p className="vf-copyright">© 2026 <strong>DivinityAGI</strong> · All rights reserved.</p>
              </div>
            </footer>

          </div>
        </div>

        {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}

        {/* Scroll to top */}
        <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
          </svg>
        </button>
      </div>
    </>
  )
}
