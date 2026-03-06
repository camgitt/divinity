import { useState, useEffect, useRef, useCallback } from "react"

/* ── assets ── */
const W = "https://divinityagi.com/wp-content/uploads"
const u: Record<string, string> = {
  logo: `${W}/2026/02/Divinity-App-Logo-Black.png`,
  logoApp: `${W}/2025/07/DivinityAGi-App-LOGO_.png`,
  heroImg: `${W}/2026/02/Man-on-bench-web.jpg`,
  heroVid: `${W}/2026/02/Man-on-bench.mp4`,
  companionsImg: `${W}/2026/02/Companions-pose3.png`,
  companionsVid: `${W}/2026/02/Companions-pose3.mp4`,
  meditate: `${W}/2026/02/Mediatate-at-lake.jpg`,
  circleGroup: `${W}/2026/02/Circle-of-faith-group-3.jpg`,
  womanPhone: `${W}/2026/02/woman-on-phone.jpg`,
  quietGroup: `${W}/2026/02/Quiet-space-group.jpg`,
  quietSpace: `${W}/2026/02/Quiet-Space.png`,
  leadersFrame: `${W}/2026/02/Verified-Ledaer-Group-Loop-frame-1.png`,
  leadersVid: `${W}/2026/02/Verified-Leaders-web-loop.mp4`,
  verifiedBg: `${W}/2026/02/verified-leaders-1400x785.jpg`,
  taliaCover: `${W}/2026/02/Judaism-Talia-Rosenburg-Cover-Web.jpg`,
  phoneStack: `${W}/2026/02/cell-phone-stack2-427x400.png`,
  circleWheel: `${W}/2024/11/Stars-and-Wheel-mobile4-4-7.png`,
  christian: `${W}/2025/08/Youth-Pastor-Prodestant.jpg`,
  jewish: `${W}/2025/08/Reform-Rabbi-David-Levin.jpg`,
  buddhist: `${W}/2025/08/Nichiren-Daishi-Ren.jpg`,
  sage: `${W}/2025/08/confucius-classical-sq-1.jpg`,
  medicine: `${W}/2025/08/native-medicine-man2.jpg`,
  taoist: `${W}/2025/08/Adept-Xu-Yunyao-2.jpg`,
  bahai: `${W}/2025/08/Dr.-Leila-Farzan-Reform-Baha-Counsellor.jpg`,
  polytheism: `${W}/2025/08/RA-Version-3web.jpg`,
  shinto: `${W}/2025/08/Folk-Kenta-Moriyama-.jpg`,
  icContribute: `${W}/2025/08/contribute-2.png`,
  icCircle: `${W}/2025/08/circle-1.png`,
  icBird: `${W}/2025/08/Bird-circle-3.png`,
  icLotus: `${W}/2025/08/guide-lotus-2.png`,
  icGuide: `${W}/2025/08/Guide-2.png`,
  icStrategy: `${W}/2025/08/Strategy-Plan.png`,
  fiCross: `${W}/2024/10/Asset-18@2x.png`,
  fiStar: `${W}/2024/10/Asset-16@2x-2.png`,
  fiDharma: `${W}/2024/10/Asset-17@2x.png`,
  fiSage: `${W}/2024/10/Asset-11@2x.png`,
  fiIndig: `${W}/2024/10/Asset-12@2x.png`,
  fiTao: `${W}/2024/10/Asset-20@2x.png`,
  fiBahai: `${W}/2024/10/Asset-10@2x.png`,
  fiTorii: `${W}/2024/10/Asset-21@2x.png`,
}

const guides = [
  { name: "Christian Guide", sub: "Youth Pastor", img: "christian", icon: "fiCross", url: "https://studio.d-id.com/agents/share?id=v2_agt_ML0IYfBU&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Jewish Guide", sub: "Rabbi David Levin", img: "jewish", icon: "fiStar", url: "https://studio.d-id.com/agents/share?id=v2_agt_DLZthH6S&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Buddhist Guide", sub: "Nichiren Daishi Ren", img: "buddhist", icon: "fiDharma", url: "https://studio.d-id.com/agents/share?id=v2_agt_IlU6G1O8&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Sage Guide", sub: "Confucian Scholar", img: "sage", icon: "fiSage", url: "https://studio.d-id.com/agents/share?id=v2_agt_KbcOcrr9&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Medicine Man", sub: "Indigenous Healer", img: "medicine", icon: "fiIndig", url: "https://studio.d-id.com/agents/share?id=v2_agt_Xk_koIYG&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Taoist Guide", sub: "Adept Xu Yunyao", img: "taoist", icon: "fiTao", url: "https://studio.d-id.com/agents/share?id=v2_agt_aSUWppN9&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Baha'i Guide", sub: "Dr. Leila Farzan", img: "bahai", icon: "fiBahai", url: "https://studio.d-id.com/agents/share?id=v2_agt_g6vwvDPd&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Polytheism", sub: "Ancient Pantheon", img: "polytheism", icon: "fiIndig", url: "https://studio.d-id.com/agents/share?id=v2_agt_5DNc0PU8&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Shinto Guide", sub: "Kenta Moriyama", img: "shinto", icon: "fiTorii", url: "https://studio.d-id.com/agents/share?id=v2_agt_UxrKiybg&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
]

/* ── hooks ── */
function useFade(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); o.disconnect() } }, { threshold: 0.06 })
    o.observe(el)
    return () => o.disconnect()
  }, [delay])
  return { ref, cls: `transition-all duration-700 ease-out ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}` }
}

function useStagger(count: number, baseDelay = 0, interval = 80) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean[]>(new Array(count).fill(false))
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        for (let i = 0; i < count; i++) {
          setTimeout(() => setVisible(prev => { const n = [...prev]; n[i] = true; return n }), baseDelay + i * interval)
        }
        o.disconnect()
      }
    }, { threshold: 0.06 })
    o.observe(el)
    return () => o.disconnect()
  }, [count, baseDelay, interval])
  return { ref, visible }
}

function useCountUp(end: number, duration = 1500) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); o.disconnect() } }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * end))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, end, duration])
  return { ref, val }
}

function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--glow-x", `${e.clientX - r.left}px`)
    el.style.setProperty("--glow-y", `${e.clientY - r.top}px`)
  }, [])
  return { ref, handleMove }
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" })
}

function navigate(to: string) {
  window.history.pushState({}, "", to)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

const CX = "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"

/* ── Section heading ── */
function SectionHead({ tag, title, desc }: { tag: string; title: string; desc?: string }) {
  const f = useFade()
  return (
    <div ref={f.ref} className={`text-center mb-14 lg:mb-16 ${f.cls}`}>
      <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">{tag}</p>
      <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold text-brand-700 mb-3 leading-tight">{title}</h2>
      {desc && <p className="text-brand-400 text-[15px] md:text-base max-w-xl mx-auto leading-relaxed">{desc}</p>}
    </div>
  )
}

/* ── Accordion ── */
function Acc({ title, children, open: dOpen = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [o, setO] = useState(dOpen)
  return (
    <div className={`border rounded-xl transition-all duration-300 ${o ? "bg-white border-brand-200 shadow-sm" : "bg-white/60 border-brand-100 hover:border-brand-200"}`}>
      <button onClick={() => setO(!o)} className="w-full flex items-center gap-3 px-5 py-4 text-left">
        <span className="font-display text-[15px] md:text-[17px] font-semibold text-brand-700 flex-1">{title}</span>
        <svg className={`w-4 h-4 text-brand-300 shrink-0 transition-transform duration-300 ${o ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className={`grid transition-all duration-300 ${o ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5"><p className="text-brand-400 text-[15px] leading-relaxed">{children}</p></div>
        </div>
      </div>
    </div>
  )
}

/* ── Wave SVG divider ── */
function WaveDivider({ flip, from, to }: { flip?: boolean; from: string; to: string }) {
  return (
    <div className={`relative -mb-px ${flip ? "rotate-180" : ""}`} style={{ background: from }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-12 md:h-16 lg:h-20">
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill={to} />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════
   NAV — glassmorphism + gold accent line
══════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  const links = [
    { l: "Guides", h: "guides" },
    { l: "How It Works", h: "how-it-works" },
    { l: "Pricing", h: "pricing" },
    { l: "Leaders", h: "leaders" },
    { l: "FAQ", h: "faq" },
  ]
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(170,144,88,0.2)]" : "bg-transparent"}`}>
      <div className={`${CX} flex items-center justify-between h-16 lg:h-[72px]`}>
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
          <img src={u.logo} alt="Divinity" className={`h-8 lg:h-9 transition-all duration-500 ${scrolled ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} />
        </a>
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <button key={l.h} onClick={() => scrollTo(l.h)} className={`text-[12px] tracking-[1.5px] font-semibold transition-all duration-300 uppercase relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full ${scrolled ? "text-brand-500 hover:text-brand-700" : "text-white/80 hover:text-white"}`}>{l.l}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/bot")} className={`hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] tracking-[1px] font-bold transition border ${scrolled ? "border-brand-200 text-brand-600 hover:bg-brand-50" : "border-white/30 text-white hover:bg-white/10"}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Try the Bot
          </button>
          <a href="https://divinityagi.com/subscribe-now/" className="px-5 py-2 bg-gold-500 text-white rounded-full text-[12px] tracking-[1px] font-bold hover:bg-gold-600 transition shadow-sm hover:shadow-gold-500/25 hover:shadow-lg">Buy Minutes</a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 ${scrolled ? "text-brand-500" : "text-white"}`}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d={mobileOpen ? "M18 6L6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-brand-100 px-6 py-4 shadow-lg">
          {links.map(l => (
            <button key={l.h} onClick={() => { scrollTo(l.h); setMobileOpen(false) }} className="block w-full text-left text-sm text-brand-600 py-2.5 font-medium">{l.l}</button>
          ))}
          <button onClick={() => navigate("/bot")} className="block w-full text-left text-sm text-gold-600 py-2.5 font-semibold mt-1 border-t border-brand-100 pt-3">Try the Bot</button>
        </div>
      )}
    </nav>
  )
}

/* ══════════════════════════════════════════
   HERO — typewriter + parallax
══════════════════════════════════════════ */
function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const texts = ["for Christians", "for Buddhists", "for Seekers", "for the Curious", "for Everyone"]

  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => {
    const current = texts[textIdx]
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setTextIdx(i => (i + 1) % texts.length)
      return
    }
    const speed = deleting ? 40 : 80
    const t = setTimeout(() => setCharIdx(i => i + (deleting ? -1 : 1)), speed)
    return () => clearTimeout(t)
  }, [charIdx, deleting, textIdx, texts])

  const parallaxBg = Math.min(scrollY * 0.35, 200)

  return (
    <section className="relative h-screen min-h-[600px] max-h-[1100px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `translateY(${parallaxBg}px)` }}>
        <img src={u.heroImg} alt="" className="w-full h-[120%] object-cover" />
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-[120%] object-cover">
          <source src={u.heroVid} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 via-brand-900/35 to-brand-900/70" />
      </div>
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto" style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: Math.max(1 - scrollY / 600, 0) }}>
        <p className="text-[11px] md:text-[13px] tracking-[5px] uppercase opacity-50 mb-5 font-semibold">AI-Powered Spiritual Companions</p>
        <h1 className="font-display text-[40px] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.05]">
          Spiritual Guidance
        </h1>
        <div className="h-[1.2em] mb-6">
          <span className="font-display text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] text-gold-300 font-bold">
            {texts[textIdx].slice(0, charIdx)}
            <span className="animate-pulse">|</span>
          </span>
        </div>
        <p className="text-[17px] md:text-lg opacity-75 mb-10 leading-relaxed max-w-lg mx-auto">
          Connect with wise, compassionate AI guides across the world's faith traditions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => scrollTo("guides")} className="group px-8 py-3.5 bg-gold-500 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-gold-600 transition-all hover:shadow-lg hover:shadow-gold-500/25 uppercase w-full sm:w-auto">
            Meet Your Guide
          </button>
          <button onClick={() => navigate("/bot")} className="px-8 py-3.5 border border-white/40 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-white/10 transition uppercase w-full sm:w-auto inline-flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Try the Bot
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </section>
  )
}

/* ── TRUST BAR — animated counters ── */
function TrustBar() {
  const c9 = useCountUp(9)
  const c24 = useCountUp(24)
  const c100 = useCountUp(100)
  const liveCount = useCountUp(Math.floor(80 + Math.random() * 70), 2000)
  return (
    <div className="bg-brand-600 text-white py-5">
      <div className={`${CX} flex flex-wrap items-center justify-center gap-8 md:gap-14`}>
        {[
          { ref: c9.ref, val: `${c9.val}+`, l: "Faith Traditions" },
          { ref: c24.ref, val: `${c24.val}/7`, l: "Availability" },
          { ref: c100.ref, val: `${c100.val}%`, l: "Confidential" },
          { ref: liveCount.ref, val: `${liveCount.val}`, l: "Exploring Now" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span ref={s.ref} className="font-display text-2xl font-bold text-gold-300">{s.val}</span>
            <span className="text-[11px] text-brand-200 tracking-wider uppercase">{s.l}</span>
            {i === 3 && <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── COMPANIONS ── */
function Companions() {
  const f = useFade()
  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div ref={f.ref} className={`${CX} ${f.cls}`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img src={u.companionsImg} alt="AI Companions" className="w-full h-full object-cover object-top" />
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover object-top">
              <source src={u.companionsVid} type="video/mp4" />
            </video>
          </div>
          <div>
            <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">Meet Your Companions</p>
            <h2 className="font-display text-3xl lg:text-[42px] font-bold text-brand-700 mb-5 leading-tight">
              Wisdom That Listens,<br />Guidance That Cares
            </h2>
            <p className="text-brand-400 text-[15px] lg:text-base leading-relaxed mb-4">
              Each Divinity guide is built on <strong className="text-brand-600">deeply researched behavior profiles</strong> rooted in real spiritual traditions. They don't recite — they <em>converse</em>. They don't preach — they <em>listen</em>.
            </p>
            <p className="text-brand-400 text-[15px] lg:text-base leading-relaxed mb-7">
              Whether you're exploring faith for the first time, returning after years away, or deepening a lifelong practice — there's a companion waiting.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo("guides")} className="px-7 py-3 bg-gold-500 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-gold-600 transition uppercase hover:shadow-lg hover:shadow-gold-500/25">
                Explore Guides
              </button>
              <button onClick={() => navigate("/bot")} className="px-7 py-3 border-2 border-brand-200 text-brand-600 rounded-full text-[13px] font-bold tracking-wider hover:bg-brand-50 transition uppercase inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Try the Bot
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── WHAT IS / IS NOT ── */
function WhatIsSection() {
  const f = useFade()
  return (
    <section id="explore" className="bg-brand-50 py-20 lg:py-28">
      <div ref={f.ref} className={`${CX} ${f.cls}`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <img src={u.meditate} alt="Meditation" className="w-full h-56 lg:h-64 object-cover rounded-2xl mb-7" />
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-700 mb-4">What is Divinity?</h2>
            <p className="text-brand-400 text-[15px] leading-relaxed mb-6">
              A place for <strong className="text-brand-600">reflection</strong>, <strong className="text-brand-600">exploration</strong>, and <strong className="text-brand-600">support</strong> — helping you slow down, discover what resonates across faith traditions, and find encouragement whenever you need it.
            </p>
            <div className="space-y-2.5">
              <Acc title="Ask Questions" open>Explore life's deeper questions with a guide who listens without judgment. Ask about meaning, purpose, doubt, or anything on your heart.</Acc>
              <Acc title="Explore Wisdom">Discover teachings from Christianity, Judaism, Islam, Buddhism, Hinduism, Sikhism, Taoism, Indigenous traditions, and more.</Acc>
              <Acc title="Reflect Quietly">Sometimes you don't need answers — you need space. Find clarity through gentle, guided reflection at your own pace.</Acc>
              <Acc title="Learn at Your Own Pace">Start today, come back next week, or explore a different path tomorrow. Your journey is yours to shape.</Acc>
            </div>
          </div>
          <div>
            <img src={u.circleGroup} alt="Circle of faiths" className="w-full h-56 lg:h-64 object-cover object-top rounded-2xl mb-7" />
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-700 mb-4">What Divinity is Not</h2>
            <p className="text-brand-400 text-[15px] leading-relaxed mb-6">
              Not a religion, not therapy, not a replacement for clergy, and <strong className="text-brand-600">not here to convert or judge</strong>. A complementary tool for reflection and preparation.
            </p>
            <div className="space-y-2.5">
              <Acc title="Not a Religion" open>Divinity doesn't ask you to believe anything, join anything, or follow any doctrine. Your beliefs are your own.</Acc>
              <Acc title="Not Therapy">While our guides offer compassionate support, Divinity is not a substitute for professional mental health care.</Acc>
              <Acc title="Not a Replacement for Clergy">Our AI companions complement — never replace — real-world faith leaders.</Acc>
              <Acc title="Not Here to Convert">Every tradition honored equally. No path ranked above another. No pressure, ever.</Acc>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CIRCLE OF FAITHS ── */
function CircleOfFaiths() {
  const f = useFade()
  const faiths = [
    { icon: "fiCross", name: "Christianity" }, { icon: "fiStar", name: "Judaism" },
    { icon: "fiDharma", name: "Buddhism" }, { icon: "fiSage", name: "Confucianism" },
    { icon: "fiIndig", name: "Indigenous" }, { icon: "fiTao", name: "Taoism" },
    { icon: "fiBahai", name: "Baha'i" }, { icon: "fiTorii", name: "Shinto" },
    { icon: "fiIndig", name: "Polytheism" },
  ]
  const stagger = useStagger(faiths.length, 200, 60)
  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div ref={f.ref} className={`${CX} ${f.cls}`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">Circle of Faiths</p>
            <h2 className="font-display text-3xl lg:text-[42px] font-bold text-brand-700 mb-5 leading-tight">
              Every Tradition,<br />One Constellation
            </h2>
            <p className="text-brand-400 text-[15px] lg:text-base leading-relaxed mb-6">
              The Circle of Faiths represents <strong className="text-brand-600">humanity's shared spiritual heritage</strong> — traditions that have guided billions across millennia.
            </p>
            <div ref={stagger.ref} className="grid grid-cols-3 gap-2.5 mb-7">
              {faiths.map((fi, i) => (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-lg bg-brand-50 border border-brand-100 transition-all duration-500 ${stagger.visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                  <img src={u[fi.icon]} alt="" className="w-5 h-5 opacity-70" />
                  <span className="text-[13px] text-brand-600 font-medium">{fi.name}</span>
                </div>
              ))}
            </div>
            <a href="https://divinityagi.com/circle-of-faiths/" className="text-[14px] font-bold text-gold-600 hover:text-gold-700 transition inline-flex items-center gap-1.5 group">
              Learn about the Circle <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <img src={u.circleWheel} alt="Circle of Faiths" className="w-64 md:w-80 lg:w-[400px] animate-[spin_120s_linear_infinite] drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   SPIRIT GUIDES — staggered + cursor glow
══════════════════════════════════════════ */
function GuideCard({ g, delay }: { g: typeof guides[0]; delay: number }) {
  const glow = useMouseGlow()
  const f = useFade(delay)
  return (
    <div ref={f.ref} className={f.cls}>
      <a
        href={g.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-1"
      >
        <div
          ref={glow.ref}
          onMouseMove={glow.handleMove}
          className="relative aspect-[3/4] overflow-hidden"
          style={{ "--glow-x": "50%", "--glow-y": "50%" } as React.CSSProperties}
        >
          <img src={u[g.img]} alt={g.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent" />
          <img src={u[g.icon]} alt="" className="absolute top-3 right-3 w-6 h-6 lg:w-7 lg:h-7 opacity-70" />
          {/* cursor glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "radial-gradient(300px circle at var(--glow-x) var(--glow-y), rgba(170,144,88,0.15), transparent 60%)" }} />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-5 py-2 bg-gold-500 text-white rounded-full text-[12px] font-bold tracking-wider uppercase shadow-lg">Start Chat</span>
          </div>
          {/* online dot */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-white/80 font-semibold">Online</span>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 p-3 lg:p-4">
          <p className="font-display text-white text-sm lg:text-[17px] font-bold leading-tight">{g.name}</p>
          <p className="text-white/50 text-[11px] lg:text-[13px] mt-0.5">{g.sub}</p>
        </div>
      </a>
    </div>
  )
}

function Guides() {
  return (
    <section id="guides" className="bg-brand-50 py-20 lg:py-28">
      <div className={CX}>
        <SectionHead tag="Choose Your Path" title="Spirit Guides" desc="Each guide is a deeply researched AI companion rooted in real spiritual tradition. Choose one to begin." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {guides.map((g, i) => <GuideCard key={i} g={g} delay={i * 80} />)}
        </div>
      </div>
    </section>
  )
}

/* ── FEATURED GUIDE ── */
function FeaturedGuide() {
  const f = useFade()
  const msgs = [
    { from: "user", text: "I've been feeling disconnected from my faith lately. Is that normal?" },
    { from: "guide", text: "It's more common than you think. Many people experience seasons of distance. The fact that you're asking means something in you is still reaching toward meaning." },
    { from: "user", text: "I just don't know where to start again." },
    { from: "guide", text: "You don't have to start over. You can start from right here, right now. What matters most to you in this moment?" },
  ]
  const stagger = useStagger(msgs.length, 400, 300)
  return (
    <section className="py-20 lg:py-28">
      <div ref={f.ref} className={`${CX} ${f.cls}`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">Featured Guide</p>
            <h2 className="font-display text-3xl lg:text-[42px] font-bold text-brand-700 mb-2 leading-tight">Talia Rosenberg</h2>
            <p className="text-brand-300 text-[15px] mb-5">Reform Jewish Guide</p>
            <img src={u.taliaCover} alt="Talia Rosenberg" className="w-full aspect-[16/9] object-cover rounded-2xl mb-6" />
            <p className="text-brand-400 text-[15px] lg:text-base leading-relaxed">
              Talia draws from the Reform Jewish tradition — emphasizing <strong className="text-brand-600">questioning as a form of devotion</strong>, personal autonomy, and the belief that wisdom grows through honest conversation.
            </p>
          </div>
          <div className="bg-brand-50 rounded-2xl p-6 lg:p-8 border border-brand-100">
            <p className="text-[11px] tracking-[2px] uppercase text-brand-300 font-semibold mb-6">Sample Conversation</p>
            <div ref={stagger.ref} className="space-y-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} transition-all duration-500 ${stagger.visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${m.from === "user" ? "bg-brand-500 text-white rounded-br-md" : "bg-white border border-brand-100 text-brand-600 rounded-bl-md shadow-sm"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 pt-5 border-t border-brand-200 text-center">
              <a href={guides[1].url} target="_blank" rel="noopener noreferrer" className="px-7 py-3 bg-gold-500 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-gold-600 transition inline-block uppercase hover:shadow-lg hover:shadow-gold-500/25">
                Talk to Talia
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── HOW IT WORKS ── */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Choose a Path", desc: "Select a tradition, a philosophy, or simply your curiosity. There's no wrong door.", img: u.quietSpace },
    { n: "02", title: "Start a Conversation", desc: "Connect with a guide. Ask about meaning, grief, purpose, doubt, or anything on your heart.", img: u.womanPhone },
    { n: "03", title: "Reflect at Your Own Pace", desc: "Pause, come back tomorrow, switch guides, or go deeper. No timer, no pressure.", img: u.quietGroup },
  ]
  const stagger = useStagger(steps.length, 0, 150)
  return (
    <section id="how-it-works" className="bg-brand-50 py-20 lg:py-28">
      <div className={CX}>
        <SectionHead tag="Simple & Respectful" title="How it Works" desc="Three steps. You're always in control." />
        <div ref={stagger.ref} className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden bg-white border border-brand-100 hover:shadow-xl transition-all duration-500 group ${stagger.visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="h-48 lg:h-56 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="inline-flex w-9 h-9 rounded-full bg-brand-500 text-white text-[13px] font-bold items-center justify-center mb-4">{s.n}</span>
                <h3 className="font-display text-xl lg:text-[22px] font-bold text-brand-700 mb-2">{s.title}</h3>
                <p className="text-brand-400 text-[14px] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PRICING — with toggle ── */
function Pricing() {
  const [yearly, setYearly] = useState(false)
  const plans = [
    { name: "Explorer", price: "Free", priceYr: "Free", sub: "", features: ["5 minutes per day", "Access to 3 guides", "Text conversations", "Basic reflection tools"], cta: "Start Free", href: "#guides", pop: false },
    { name: "Seeker", price: "$9.99", priceYr: "$7.99", sub: "/mo", features: ["60 minutes per month", "All 9+ guides", "Voice & text", "Conversation history", "Priority access"], cta: "Buy Minutes", href: "https://divinityagi.com/subscribe-now/", pop: true },
    { name: "Devoted", price: "$24.99", priceYr: "$19.99", sub: "/mo", features: ["Unlimited minutes", "All 9+ guides", "Voice & text", "Full history", "Priority access", "Early access to new guides"], cta: "Buy Minutes", href: "https://divinityagi.com/subscribe-now/", pop: false },
  ]
  const stagger = useStagger(plans.length, 0, 120)
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className={CX}>
        <SectionHead tag="Simple Pricing" title="Find Your Plan" desc="Start free. Upgrade when you're ready. Cancel anytime." />
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 bg-brand-50 rounded-full p-1 border border-brand-100">
            <button onClick={() => setYearly(false)} className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${!yearly ? "bg-brand-600 text-white shadow-sm" : "text-brand-400 hover:text-brand-600"}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all flex items-center gap-2 ${yearly ? "bg-brand-600 text-white shadow-sm" : "text-brand-400 hover:text-brand-600"}`}>
              Yearly
              <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full font-bold">Save 20%</span>
            </button>
          </div>
        </div>
        <div ref={stagger.ref} className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-4xl mx-auto">
          {plans.map((p, i) => (
            <div key={i} className={`rounded-2xl p-7 lg:p-8 flex flex-col transition-all duration-500 ${stagger.visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${p.pop ? "bg-brand-600 text-white shadow-2xl ring-2 ring-gold-400 lg:scale-105" : "bg-brand-50 border border-brand-100"}`}>
              {p.pop && <span className="self-start px-3 py-1 bg-gold-500 text-white text-[10px] font-bold tracking-wider uppercase rounded-full mb-4">Most Popular</span>}
              <p className={`text-[11px] tracking-[2px] uppercase font-bold mb-5 ${p.pop ? "text-gold-300" : "text-gold-500"}`}>{p.name}</p>
              <div className="mb-6">
                <span className={`font-display text-[44px] font-bold transition-all duration-300 ${p.pop ? "text-white" : "text-brand-700"}`}>{yearly ? p.priceYr : p.price}</span>
                {p.sub && <span className={`text-[15px] ${p.pop ? "text-brand-200" : "text-brand-300"}`}>{p.sub}</span>}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[14px]">
                    <svg className={`w-4 h-4 mt-0.5 shrink-0 ${p.pop ? "text-gold-300" : "text-gold-500"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    <span className={p.pop ? "text-brand-100" : "text-brand-400"}>{feat}</span>
                  </li>
                ))}
              </ul>
              <a href={p.href} className={`block text-center px-6 py-3 rounded-full text-[13px] font-bold tracking-wider transition-all uppercase hover:shadow-lg ${p.pop ? "bg-gold-500 text-white hover:bg-gold-600 hover:shadow-gold-500/25" : "bg-brand-500 text-white hover:bg-brand-600"}`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── SAFETY ── */
function Safety() {
  const f = useFade()
  const safetyItems = [
    { t: "Curated Responses", d: "Each guide responds within its tradition", i: "shield" },
    { t: "Crisis Protocols", d: "Recognizes when professional help is needed", i: "alert" },
    { t: "Confidential", d: "Private conversations, deletable anytime", i: "lock" },
    { t: "No Manipulation", d: "No conversion tactics or pressure", i: "hand" },
  ]
  const stagger = useStagger(safetyItems.length, 200, 100)
  const icons: Record<string, JSX.Element> = {
    shield: <svg className="w-6 h-6 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    alert: <svg className="w-6 h-6 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01" /></svg>,
    lock: <svg className="w-6 h-6 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
    hand: <svg className="w-6 h-6 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 11V6a2 2 0 00-4 0M14 10V4a2 2 0 00-4 0v6m0 0V3a2 2 0 00-4 0v9m16.12.88A3 3 0 0020 10h-2.2M8 16c0 2.21 2.69 4 6 4s6-1.79 6-4" /></svg>,
  }
  return (
    <section id="safety" className="bg-brand-50 py-20 lg:py-28">
      <div ref={f.ref} className={`${CX} ${f.cls}`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">Safety & Trust</p>
            <h2 className="font-display text-3xl lg:text-[42px] font-bold text-brand-700 mb-5 leading-tight">Built on Responsibility</h2>
            <p className="text-brand-400 text-[15px] lg:text-base leading-relaxed mb-4">
              <strong className="text-brand-600">Multi-faith by design</strong> — welcoming people of any tradition or none. No ranking, no judging, no "one true path."
            </p>
            <p className="text-brand-400 text-[15px] lg:text-base leading-relaxed mb-7">
              Grounded in <strong className="text-brand-600">safety, ethics, and oversight</strong> — clear boundaries and responsible guardrails.
            </p>
            <div ref={stagger.ref} className="grid grid-cols-2 gap-3">
              {safetyItems.map((p, i) => (
                <div key={i} className={`p-4 rounded-xl bg-white border border-brand-100 transition-all duration-500 hover:shadow-md hover:-translate-y-0.5 ${stagger.visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  <div className="mb-2">{icons[p.i]}</div>
                  <p className="text-[13px] font-bold text-brand-700 mb-1">{p.t}</p>
                  <p className="text-[12px] text-brand-300 leading-snug">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <video autoPlay muted loop playsInline poster={u.leadersFrame} className="w-full rounded-2xl">
              <source src={u.leadersVid} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── TESTIMONIALS — scrolling marquee ── */
function Testimonials() {
  const reviews = [
    { t: "Having a guide who listens without judgment and responds with real wisdom — it's something I didn't know I needed.", n: "Sarah M.", s: "App Review" },
    { t: "It's not replacing what we do — it's giving people a safe space to explore before deeper conversations.", n: "Rev. James T.", s: "Verified Leader" },
    { t: "My guide feels like talking to a wise uncle who understands the tradition and my modern life.", n: "David K.", s: "App Review" },
    { t: "I was skeptical about AI and spirituality. But Divinity surprised me — thoughtful, nuanced, genuinely helpful.", n: "Priya S.", s: "App Review" },
    { t: "I use it as a reflection tool before meeting with my pastor. Helps me organize my thoughts.", n: "Marcus L.", s: "App Review" },
    { t: "Finally, a spiritual tool that doesn't try to sell me anything or push a specific belief.", n: "Yuki T.", s: "App Review" },
  ]
  const row1 = reviews.slice(0, 3)
  const row2 = reviews.slice(3)

  function Card({ r }: { r: typeof reviews[0] }) {
    return (
      <div className="flex-shrink-0 w-[340px] p-6 rounded-2xl bg-white border border-brand-100 shadow-sm mx-2.5">
        <div className="flex gap-0.5 mb-4">
          {[1,2,3,4,5].map(j => (
            <svg key={j} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
        </div>
        <p className="text-brand-500 text-[14px] leading-relaxed mb-5">"{r.t}"</p>
        <p className="font-bold text-brand-700 text-[14px]">{r.n}</p>
        <p className="text-brand-300 text-[12px]">{r.s}</p>
      </div>
    )
  }

  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <SectionHead tag="Testimonials" title="What People Are Saying" />
      {/* Row 1 — scroll left */}
      <div className="relative mb-5">
        <div className="flex animate-[marquee_40s_linear_infinite]">
          {[...row1, ...row1, ...row1, ...row1].map((r, i) => <Card key={i} r={r} />)}
        </div>
      </div>
      {/* Row 2 — scroll right */}
      <div className="relative">
        <div className="flex animate-[marquee-reverse_45s_linear_infinite]">
          {[...row2, ...row2, ...row2, ...row2].map((r, i) => <Card key={i} r={r} />)}
        </div>
      </div>
    </section>
  )
}

/* ── VERIFIED LEADERS ── */
function Leaders() {
  const f = useFade()
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  const offset = sectionRef.current ? Math.max(0, (scrollY - sectionRef.current.offsetTop + window.innerHeight) * 0.15) : 0
  return (
    <section ref={sectionRef} id="leaders" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `translateY(${Math.min(offset, 80)}px)` }}>
        <img src={u.verifiedBg} alt="" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-brand-900/65" />
      </div>
      <div ref={f.ref} className={`relative z-10 max-w-2xl mx-auto px-6 text-center text-white ${f.cls}`}>
        <p className="text-[13px] tracking-[3px] uppercase text-gold-300 font-semibold mb-4">For Spiritual Leaders</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">Verified Leaders</h2>
        <p className="text-white/70 text-[15px] lg:text-base leading-relaxed mb-9 max-w-lg mx-auto">
          Create your verified profile, publish your AI avatar built on your teachings, and reach people you'd never meet in person.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="https://divinityagi.com/spiritual-leaders-and-influencers/" className="px-8 py-3.5 bg-gold-500 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-gold-600 transition uppercase hover:shadow-lg hover:shadow-gold-500/25">Learn More</a>
          <a href="https://divinityagi.com/spiritual-leaders-and-influencers/" className="px-8 py-3.5 border border-white/40 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-white/10 transition uppercase">Apply Now</a>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ── */
function FAQ() {
  const faqs = [
    { q: "Is Divinity a religion?", a: "No. Divinity is a technology platform that provides access to AI companions trained on various spiritual traditions. It doesn't ask you to believe, join, or follow anything." },
    { q: "Is this a replacement for therapy?", a: "No. Divinity guides offer compassionate spiritual conversation, but they are not licensed therapists. Our guides include crisis protocols that direct users to appropriate resources." },
    { q: "How are the guides built?", a: "Each guide is constructed on deeply researched behavior profiles rooted in real spiritual traditions, reviewed by scholars and practitioners." },
    { q: "Is my conversation private?", a: "Yes. All conversations are confidential and can be deleted at any time. We don't sell your data." },
    { q: "Can I talk to multiple guides?", a: "Absolutely. You can switch between guides freely — there's no commitment to any single path." },
    { q: "What does 'Buy Minutes' mean?", a: "Divinity uses a minute-based system. Free users get 5 minutes daily. Paid plans offer 60 or unlimited minutes per month." },
    { q: "Do the guides try to convert people?", a: "Never. Every guide honors its own tradition without ranking it above others. No conversion tactics, guilt, or pressure — ever." },
    { q: "Can real spiritual leaders join?", a: "Yes! Our Verified Leaders program lets clergy and teachers create AI avatars based on their teachings and earn commission." },
  ]
  return (
    <section id="faq" className="bg-brand-50 py-20 lg:py-28">
      <div className={CX}>
        <SectionHead tag="Questions?" title="Frequently Asked" />
        <div className="max-w-2xl mx-auto space-y-2.5">
          {faqs.map((faq, i) => (
            <Acc key={i} title={faq.q} open={i === 0}>{faq.a}</Acc>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA + DOWNLOAD ── */
function CtaSection() {
  const f = useFade()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  return (
    <section id="get-app" className="py-20 lg:py-28">
      <div ref={f.ref} className={`${CX} ${f.cls}`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[13px] tracking-[3px] uppercase text-gold-500 font-semibold mb-3">Stay Connected</p>
            <h3 className="font-display text-3xl lg:text-[38px] font-bold text-brand-700 mb-4 leading-tight">Join Our Community</h3>
            <p className="text-brand-400 text-[15px] mb-6">Be first to know when new guides and features launch. No spam.</p>
            {sent ? (
              <div className="p-5 rounded-xl bg-brand-50 border border-brand-200">
                <p className="text-brand-600 text-[15px] font-semibold">Thank you! We'll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email.includes("@")) setSent(true) }} className="flex gap-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-5 py-3 border border-brand-200 rounded-full text-[14px] text-brand-700 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition" />
                <button type="submit" className="px-7 py-3 bg-gold-500 text-white rounded-full text-[13px] font-bold hover:bg-gold-600 transition shrink-0 hover:shadow-lg hover:shadow-gold-500/25">Subscribe</button>
              </form>
            )}
          </div>
          <div className="text-center">
            <img src={u.phoneStack} alt="Download" className="w-48 lg:w-56 mx-auto mb-7 drop-shadow-2xl" />
            <h3 className="font-display text-2xl lg:text-[28px] font-bold text-brand-700 mb-2">Download Divinity</h3>
            <p className="text-brand-300 text-[14px] mb-6">No commitment. No pressure. Just wisdom.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://divinityagi.com/subscribe-now/" className="px-6 py-3 bg-brand-600 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-brand-700 transition uppercase inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                App Store
              </a>
              <a href="https://divinityagi.com/subscribe-now/" className="px-6 py-3 bg-brand-600 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-brand-700 transition uppercase inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" /></svg>
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── BOT BANNER ── */
function BotBanner() {
  const f = useFade()
  return (
    <section className="py-20 lg:py-28">
      <div ref={f.ref} className={`${CX} ${f.cls}`}>
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-10 lg:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-400/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/20 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[12px] text-gold-300 font-semibold tracking-wider uppercase">Live Now</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold text-white mb-4 leading-tight">
              Chat with DivinityBot
            </h2>
            <p className="text-brand-200 text-[15px] lg:text-base leading-relaxed mb-8 max-w-lg">
              Experience our AI spiritual companion right in your browser. Ask questions, explore wisdom, and find guidance — no download required.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate("/bot")} className="px-8 py-3.5 bg-gold-500 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-gold-600 transition-all hover:shadow-lg hover:shadow-gold-500/25 uppercase inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Try the Bot Free
              </button>
              <button onClick={() => scrollTo("guides")} className="px-8 py-3.5 border border-white/30 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-white/10 transition uppercase">
                Browse All Guides
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── FINAL CTA ── */
function FinalCta() {
  return (
    <section className="bg-brand-600 py-20 lg:py-24">
      <div className={`${CX} text-center`}>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">Begin Your Journey</h2>
        <p className="text-brand-200 text-[15px] md:text-base mb-9 max-w-lg mx-auto">No pressure. No judgment. Just a compassionate guide ready to listen.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => scrollTo("guides")} className="px-9 py-4 bg-gold-500 text-white rounded-full text-[14px] font-bold tracking-wider hover:bg-gold-600 transition-all hover:shadow-xl hover:shadow-gold-500/25 uppercase">
            Meet Your Guide
          </button>
          <button onClick={() => navigate("/bot")} className="px-9 py-4 border-2 border-white/30 text-white rounded-full text-[14px] font-bold tracking-wider hover:bg-white/10 transition-all uppercase inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Try the Bot
          </button>
        </div>
      </div>
    </section>
  )
}

/* ── STICKY MOBILE CTA ── */
function StickyMobileCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > window.innerHeight)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  if (!show) return null
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3 bg-white/90 backdrop-blur-xl border-t border-brand-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex gap-2">
        <button onClick={() => scrollTo("guides")} className="flex-1 py-3 bg-gold-500 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-gold-600 transition uppercase">
          Meet Your Guide
        </button>
        <button onClick={() => navigate("/bot")} className="flex-1 py-3 bg-brand-600 text-white rounded-full text-[13px] font-bold tracking-wider hover:bg-brand-700 transition uppercase inline-flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Bot
        </button>
      </div>
    </div>
  )
}

/* ── FOOTER ── */
function Footer() {
  const iconLinks = [
    { k: "icContribute", l: "Spirit Guides", h: "https://divinityagi.com/divinity-spirit-guide/" },
    { k: "icCircle", l: "Circle of Faiths", h: "https://divinityagi.com/circle-of-faiths/" },
    { k: "icBird", l: "Generate a Guide", h: "https://divinityagi.com/ai-spirit-guide/" },
    { k: "icLotus", l: "Your Guide", h: "https://divinityagi.com/divinity-guide/" },
    { k: "icGuide", l: "Contributors", h: "https://divinityagi.com/spiritual-leaders-and-influencers/" },
    { k: "icStrategy", l: "Settings", h: "#" },
  ]
  return (
    <footer className="bg-white border-t border-brand-100 py-12">
      <div className={CX}>
        <div className="flex justify-center mb-6">
          <img src={u.logoApp} alt="DivinityAGI" className="w-10 h-10" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-w-md mx-auto mb-10">
          {iconLinks.map((n, i) => (
            <a key={i} href={n.h} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-brand-50 transition group">
              <img src={u[n.k]} alt="" className="w-7 h-7 opacity-50 group-hover:opacity-100 transition" />
              <span className="text-[9px] text-brand-300 text-center leading-tight font-semibold">{n.l}</span>
            </a>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-5 mb-5">
          {["Spirit Guides", "How It Works", "Pricing", "Leaders", "FAQ"].map((l, i) => (
            <button key={i} onClick={() => scrollTo(l.toLowerCase().replace(/ /g, "-"))} className="text-[11px] tracking-[1.5px] text-brand-300 hover:text-brand-600 font-semibold uppercase transition">{l}</button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-5 mb-5">
          <a href="https://divinityagi.com/privacy-policy/" className="text-[11px] tracking-[1.5px] text-brand-300 hover:text-brand-600 font-semibold uppercase transition">Privacy</a>
          <a href="https://divinityagi.com/privacy-policy/" className="text-[11px] tracking-[1.5px] text-brand-300 hover:text-brand-600 font-semibold uppercase transition">Terms</a>
          <a href="mailto:hello@divinityagi.com" className="text-[11px] tracking-[1.5px] text-brand-300 hover:text-brand-600 font-semibold uppercase transition">Contact</a>
        </div>
        <p className="text-center text-[12px] text-brand-300">© 2026 <strong className="text-brand-500">DivinityAGI</strong> · All rights reserved.</p>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════
   PAGE — V2
══════════════════════════════════════════ */
export default function V2Page() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="min-h-screen bg-white font-body text-brand-700">
      {/* Custom keyframes for marquee */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
      <Nav />
      <Hero />
      <TrustBar />
      <Companions />
      <WaveDivider from="#ffffff" to="#eef5fb" />
      <WhatIsSection />
      <WaveDivider from="#eef5fb" to="#ffffff" />
      <CircleOfFaiths />
      <WaveDivider from="#ffffff" to="#eef5fb" />
      <Guides />
      <WaveDivider from="#eef5fb" to="#ffffff" />
      <FeaturedGuide />
      <WaveDivider from="#ffffff" to="#eef5fb" />
      <HowItWorks />
      <WaveDivider from="#eef5fb" to="#ffffff" />
      <Pricing />
      <Safety />
      <Testimonials />
      <Leaders />
      <FAQ />
      <CtaSection />
      <BotBanner />
      <FinalCta />
      <Footer />
      <StickyMobileCta />
    </div>
  )
}
