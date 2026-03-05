import { useState, useEffect, useRef } from "react"

const W = "https://divinityagi.com/wp-content/uploads"
const urls: Record<string, string> = {
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
function a(k: string) { return urls[k] || "" }

const guides = [
  { name: "Christian Guide", sub: "Youth Pastor", img: "christian", icon: "fiCross", url: "https://studio.d-id.com/agents/share?id=v2_agt_ML0IYfBU&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Jewish Guide", sub: "Rabbi David Levin", img: "jewish", icon: "fiStar", url: "https://studio.d-id.com/agents/share?id=v2_agt_DLZthH6S&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Buddhist Guide", sub: "Nichiren Daishi Ren", img: "buddhist", icon: "fiDharma", url: "https://studio.d-id.com/agents/share?id=v2_agt_IlU6G1O8&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Sage Guide", sub: "Confucian Scholar", img: "sage", icon: "fiSage", url: "https://studio.d-id.com/agents/share?id=v2_agt_KbcOcrr9&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Medicine Man", sub: "Indigenous Healer", img: "medicine", icon: "fiIndig", url: "https://studio.d-id.com/agents/share?id=v2_agt_Xk_koIYG&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Taoist Guide", sub: "Adept Xu Yunyao", img: "taoist", icon: "fiTao", url: "https://studio.d-id.com/agents/share?id=v2_agt_aSUWppN9&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Baha'i Guide", sub: "Dr. Leila Farzan", img: "bahai", icon: "fiBahai", url: "https://studio.d-id.com/agents/share?id=v2_agt_g6vwvDPd&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Polytheism", sub: "Ancient Pantheon", img: "polytheism", icon: "fiIndig", url: "https://studio.d-id.com/agents/share?id=v2_agt_5DNc0PU8&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
  { name: "Shinto Guide", sub: "Kenta Moriyama", img: "shinto", icon: "fiTorii", url: "https://studio.d-id.com/agents/share?id=v2_agt_UxrKiybg&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNRGMyTnpZeE9URXpPVEEyT0RRMk1qY3pPVGM2YUdaNVMwcHJNbkowWWtwZlNXRnJOVm93WmxOag==" },
]

function useFade() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.08 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return { ref, style: { opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)" } as React.CSSProperties }
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: "smooth" })
  }
}

const CX = "max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10"

/* ── Accordion ── */
function Acc({ title, icon, children, open: dOpen = false }: { title: string; icon: string; children: React.ReactNode; open?: boolean }) {
  const [o, setO] = useState(dOpen)
  return (
    <div className={`border rounded-xl transition-all duration-300 ${o ? "bg-white border-gray-200 shadow-sm" : "bg-gray-50/60 border-gray-100 hover:border-gray-200"}`}>
      <button onClick={() => setO(!o)} className="w-full flex items-center gap-3 p-4 text-left">
        <span className="text-lg shrink-0 w-7 text-center">{icon}</span>
        <span className="font-display text-[15px] md:text-base font-semibold text-gray-900 flex-1">{title}</span>
        <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${o ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${o ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-4 pl-[44px]"><p className="text-gray-500 text-sm leading-relaxed">{children}</p></div>
      </div>
    </div>
  )
}

/* ── NAV ── */
function Nav() {
  const [s, setS] = useState(false)
  const [o, setO] = useState(false)
  useEffect(() => {
    const h = () => setS(window.scrollY > 50)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  const links = [
    { l: "EXPLORE", h: "explore" },
    { l: "GUIDES", h: "guides" },
    { l: "HOW IT WORKS", h: "how-it-works" },
    { l: "PRICING", h: "pricing" },
    { l: "VERIFIED LEADERS", h: "leaders" },
    { l: "FAQ", h: "faq" },
  ]
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${s ? "bg-white/95 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-white"}`}>
      <div className={`${CX} flex items-center justify-between h-[68px]`}>
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
          <img src={a("logo")} alt="Divinity" className="h-9" />
        </a>
        <div className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <button key={l.h} onClick={() => scrollTo(l.h)} className="text-[11px] tracking-[2px] font-semibold text-gray-600 hover:text-black transition bg-transparent border-none cursor-pointer">{l.l}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="https://divinityagi.com/subscribe-now/" className="px-5 py-2 bg-gray-900 text-white rounded-full text-[11px] tracking-[1px] font-semibold hover:bg-black transition">Buy Minutes</a>
          <button onClick={() => setO(!o)} className="lg:hidden p-2 text-gray-500">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d={o ? "M18 6L6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>
      {o && (
        <div className="lg:hidden bg-white border-t px-5 py-4 flex flex-col gap-2">
          {links.map(l => (
            <button key={l.h} onClick={() => { scrollTo(l.h); setO(false) }} className="text-sm text-gray-600 py-1.5 text-left bg-transparent border-none cursor-pointer">{l.l}</button>
          ))}
          <a href="https://divinityagi.com/subscribe-now/" className="text-sm text-gray-900 font-bold py-1.5">Buy Minutes</a>
        </div>
      )}
    </nav>
  )
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-[68px] overflow-hidden">
      <div className="absolute inset-0">
        <img src={a("heroImg")} alt="" className="w-full h-full object-cover" />
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={urls.heroVid} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/65" />
      </div>
      <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-5">
        <p className="text-xs md:text-sm tracking-[4px] uppercase opacity-60 mb-4 font-semibold">AI-Powered Spiritual Companions</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] font-bold mb-5 leading-[1.06]">
          Spiritual Guidance<br />for Every Path
        </h1>
        <p className="text-base md:text-lg opacity-80 mb-9 leading-relaxed max-w-lg mx-auto">
          Connect with wise, compassionate AI guides across the world's faith traditions. No judgment. No pressure. Just understanding.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => scrollTo("guides")} className="px-8 py-3.5 bg-white text-black rounded-full text-sm font-bold tracking-wide hover:bg-gray-100 transition uppercase w-full sm:w-auto">
            Meet Your Guide
          </button>
          <button onClick={() => scrollTo("how-it-works")} className="px-8 py-3.5 border-2 border-white/70 text-white rounded-full text-sm font-bold tracking-wide hover:bg-white/10 transition uppercase w-full sm:w-auto">
            How It Works
          </button>
        </div>
        <div className="mt-12 flex items-center justify-center gap-1 opacity-50 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div>
    </section>
  )
}

/* ── TRUST BAR ── */
function TrustBar() {
  return (
    <div className="bg-gray-900 text-white py-5">
      <div className={`${CX} flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center`}>
        {[
          { n: "9+", l: "Faith Traditions" },
          { n: "24/7", l: "Availability" },
          { n: "100%", l: "Confidential" },
          { n: "0", l: "Judgment" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-display text-xl md:text-2xl font-bold">{s.n}</span>
            <span className="text-xs text-gray-400 tracking-wide uppercase">{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── COMPANIONS — video + text section using the unused asset ── */
function Companions() {
  const f = useFade()
  return (
    <section className="bg-white py-14 md:py-20 overflow-hidden">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img src={a("companionsImg")} alt="AI Companions" className="w-full" />
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src={urls.companionsVid} type="video/mp4" />
            </video>
          </div>
          <div>
            <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-3">Meet Your Companions</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Wisdom That Listens,<br />Guidance That Cares
            </h2>
            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-5">
              Each Divinity guide is built on <strong className="text-gray-700">deeply researched behavior profiles</strong> rooted in real spiritual traditions. They don't recite — they <em>converse</em>. They don't preach — they <em>listen</em>.
            </p>
            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6">
              Whether you're exploring faith for the first time, returning after years away, or deepening a lifelong practice — there's a companion waiting.
            </p>
            <button onClick={() => scrollTo("guides")} className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-bold tracking-wide hover:bg-black transition uppercase">
              Explore Guides
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── WHAT IS / WHAT IS NOT ── */
function WhatIsSection() {
  const f = useFade()
  return (
    <section id="explore" className="bg-gray-50 py-14 md:py-20">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
          <div>
            <div className="mb-6">
              <img src={a("meditate")} alt="Meditation" className="w-full h-[200px] md:h-[260px] object-cover rounded-xl" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">What is Divinity?</h2>
            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-5">
              A place for <strong className="text-gray-700">reflection</strong>, <strong className="text-gray-700">exploration</strong>, and <strong className="text-gray-700">support</strong> — helping you slow down, discover what resonates across faith traditions, and find encouragement whenever you need it.
            </p>
            <div className="space-y-2">
              <Acc title="Ask Questions" icon="✦" open>Explore life's deeper questions with a guide who listens without judgment. Ask about meaning, purpose, doubt, or anything on your heart.</Acc>
              <Acc title="Explore Wisdom" icon="◎">Discover teachings from Christianity, Judaism, Islam, Buddhism, Hinduism, Sikhism, Taoism, Indigenous traditions, and more — real spiritual insight, not surface-level summaries.</Acc>
              <Acc title="Reflect Quietly" icon="✿">Sometimes you don't need answers — you need space. Find clarity through gentle, guided reflection at your own pace.</Acc>
              <Acc title="Learn at Your Own Pace" icon="◈">Start today, come back next week, or explore a different path tomorrow. Your spiritual journey is yours to shape.</Acc>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <img src={a("circleGroup")} alt="Circle of faiths" className="w-full h-[200px] md:h-[260px] object-cover rounded-xl" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Divinity is Not</h2>
            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-5">
              Not a religion, not therapy, not a replacement for clergy, and <strong className="text-gray-700">not here to convert or judge</strong>. A complementary tool that helps you reflect and prepare for deeper conversations.
            </p>
            <div className="space-y-2">
              <Acc title="Not a Religion" icon="○" open>Divinity doesn't ask you to believe anything, join anything, or follow any doctrine. Your beliefs are your own.</Acc>
              <Acc title="Not Therapy" icon="○">While our guides offer compassionate support, Divinity is not a substitute for professional mental health care.</Acc>
              <Acc title="Not a Replacement for Clergy" icon="○">Our AI companions complement — never replace — real-world faith leaders. Think of it as preparation and reflection.</Acc>
              <Acc title="Not Here to Convert" icon="○">Every tradition honored equally. No path ranked above another. No pressure, ever.</Acc>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CIRCLE OF FAITHS — the wheel graphic ── */
function CircleOfFaiths() {
  const f = useFade()
  return (
    <section className="bg-white py-14 md:py-20 overflow-hidden">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="order-2 md:order-1">
            <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-3">Circle of Faiths</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Every Tradition,<br />One Constellation
            </h2>
            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-5">
              The Circle of Faiths represents <strong className="text-gray-700">humanity's shared spiritual heritage</strong> — traditions that have guided billions across millennia, each with its own wisdom, each worthy of deep respect.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { icon: "fiCross", name: "Christianity" },
                { icon: "fiStar", name: "Judaism" },
                { icon: "fiDharma", name: "Buddhism" },
                { icon: "fiSage", name: "Confucianism" },
                { icon: "fiIndig", name: "Indigenous" },
                { icon: "fiTao", name: "Taoism" },
                { icon: "fiBahai", name: "Baha'i" },
                { icon: "fiTorii", name: "Shinto" },
                { icon: "fiIndig", name: "Polytheism" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <img src={a(f.icon)} alt="" className="w-5 h-5 opacity-70" />
                  <span className="text-xs text-gray-600 font-medium">{f.name}</span>
                </div>
              ))}
            </div>
            <a href="https://divinityagi.com/circle-of-faiths/" className="text-sm font-bold text-gray-900 hover:text-gray-600 transition inline-flex items-center gap-1">
              Learn about the Circle <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img src={a("circleWheel")} alt="Circle of Faiths" className="w-[280px] md:w-[380px] animate-[spin_120s_linear_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SPIRIT GUIDES ── */
function Guides() {
  const f = useFade()
  return (
    <section id="guides" className="bg-gray-50 py-14 md:py-20">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-2">Choose Your Path</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-2">Spirit Guides</h2>
          <p className="text-gray-500 text-sm md:text-[15px] max-w-md mx-auto">Each guide is a deeply researched AI companion. Choose one to begin a conversation.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {guides.map((g, i) => (
            <a key={i} href={g.url} target="_blank" rel="noopener noreferrer" className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1">
              <div className="relative aspect-square overflow-hidden">
                <img src={a(g.img)} alt={g.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <img src={a(g.icon)} alt="" className="absolute top-2.5 right-2.5 w-5 h-5 md:w-7 md:h-7 opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 bg-white/90 text-black rounded-full text-xs font-bold tracking-wide uppercase">Start Chat</span>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-2.5 md:p-3.5">
                <p className="font-display text-white text-xs sm:text-sm md:text-base font-bold leading-tight">{g.name}</p>
                <p className="text-white/60 text-[9px] md:text-xs">{g.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FEATURED GUIDE SPOTLIGHT ── */
function FeaturedGuide() {
  const f = useFade()
  const messages = [
    { from: "user", text: "I've been feeling disconnected from my faith lately. Is that normal?" },
    { from: "guide", text: "It's more common than you think. Many people experience seasons of distance. The fact that you're asking means something in you is still reaching toward meaning." },
    { from: "user", text: "I just don't know where to start again." },
    { from: "guide", text: "You don't have to start over. You can start from right here, right now. What matters most to you in this moment?" },
  ]
  return (
    <section className="bg-white py-14 md:py-20">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div>
            <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-3">Featured Guide</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">Talia Rosenberg</h2>
            <p className="text-gray-400 text-sm mb-4">Reform Jewish Guide</p>
            <img src={a("taliaCover")} alt="Talia Rosenberg" className="w-full h-[240px] md:h-[300px] object-cover rounded-xl mb-5" />
            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
              Talia draws from the Reform Jewish tradition — emphasizing <strong className="text-gray-700">questioning as a form of devotion</strong>, personal autonomy, and the belief that wisdom grows through honest conversation.
            </p>
          </div>
          <div>
            <div className="bg-gray-50 rounded-2xl p-5 md:p-7 border border-gray-100">
              <p className="text-[10px] tracking-[2px] uppercase text-gray-400 font-semibold mb-5">Sample Conversation</p>
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.from === "user" ? "bg-gray-900 text-white rounded-br-sm" : "bg-white border border-gray-200 text-gray-700 rounded-bl-sm"}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <a href={guides[1].url} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-black transition inline-block">
                  Talk to Talia
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── HOW IT WORKS ── */
function HowItWorks() {
  const f = useFade()
  const steps = [
    { n: "01", title: "Choose a Path", desc: "Select a tradition, a philosophy, or simply your curiosity. There's no wrong door — start anywhere.", img: a("quietSpace") },
    { n: "02", title: "Start a Conversation", desc: "Connect with a guide built on deeply researched behavior profiles. Ask about meaning, grief, purpose, doubt, or anything.", img: a("womanPhone") },
    { n: "03", title: "Reflect at Your Own Pace", desc: "Pause, come back tomorrow, switch guides, or go deeper. No timer, no pressure. Your journey unfolds as it should.", img: a("quietGroup") },
  ]
  return (
    <section id="how-it-works" className="bg-gray-50 py-14 md:py-20">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-2">Simple & Respectful</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-2">How it Works</h2>
          <p className="text-gray-500 text-sm md:text-[15px]">Three steps. You're always in control.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
              <div className="h-[180px] md:h-[200px] overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="inline-block w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mb-3">{s.n}</span>
                <h3 className="font-display text-lg md:text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PRICING ── */
function Pricing() {
  const f = useFade()
  const plans = [
    {
      name: "Explorer",
      price: "Free",
      sub: "Get started",
      features: ["5 minutes per day", "Access to 3 guides", "Text conversations", "Basic reflection tools"],
      cta: "Start Free",
      href: "#guides",
      featured: false,
    },
    {
      name: "Seeker",
      price: "$9.99",
      sub: "per month",
      features: ["60 minutes per month", "All 9+ guides", "Voice & text conversations", "Conversation history", "Priority access"],
      cta: "Buy Minutes",
      href: "https://divinityagi.com/subscribe-now/",
      featured: true,
    },
    {
      name: "Devoted",
      price: "$24.99",
      sub: "per month",
      features: ["Unlimited minutes", "All 9+ guides", "Voice & text conversations", "Full conversation history", "Priority access", "Early access to new guides"],
      cta: "Buy Minutes",
      href: "https://divinityagi.com/subscribe-now/",
      featured: false,
    },
  ]
  return (
    <section id="pricing" className="bg-white py-14 md:py-20">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-2">Simple Pricing</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-2">Find Your Plan</h2>
          <p className="text-gray-500 text-sm md:text-[15px] max-w-md mx-auto">Start free. Upgrade when you're ready. No commitment, cancel anytime.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {plans.map((p, i) => (
            <div key={i} className={`rounded-2xl p-6 md:p-7 flex flex-col transition-all ${p.featured ? "bg-gray-900 text-white shadow-xl scale-[1.02] md:scale-105" : "bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-md"}`}>
              <p className={`text-xs tracking-[2px] uppercase font-semibold mb-4 ${p.featured ? "text-gray-400" : "text-gray-400"}`}>{p.name}</p>
              <div className="mb-5">
                <span className="font-display text-4xl md:text-5xl font-bold">{p.price}</span>
                {p.sub !== "Get started" && <span className={`text-sm ml-1 ${p.featured ? "text-gray-400" : "text-gray-400"}`}>/{p.sub.replace("per ", "")}</span>}
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {p.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <svg className={`w-4 h-4 mt-0.5 shrink-0 ${p.featured ? "text-green-400" : "text-green-500"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    <span className={p.featured ? "text-gray-300" : "text-gray-600"}>{feat}</span>
                  </li>
                ))}
              </ul>
              <a href={p.href} className={`block text-center px-6 py-3 rounded-full text-sm font-bold tracking-wide transition uppercase ${p.featured ? "bg-white text-black hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-black"}`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── WHY IT WORKS / SAFETY ── */
function Safety() {
  const f = useFade()
  return (
    <section id="safety" className="bg-gray-50 py-14 md:py-20">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div>
            <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-3">Safety & Trust</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">Built on Responsibility</h2>
            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-4">
              Divinity is <strong className="text-gray-700">multi-faith by design</strong> — welcoming people of any tradition or none. Respectful, pressure-free exploration without ranking, judging, or pushing "one true path."
            </p>
            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6">
              Grounded in <strong className="text-gray-700">safety, ethics, and oversight</strong> — clear boundaries, user control, and responsible guardrails that prioritize trust.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { t: "Curated Responses", d: "Each guide responds within its tradition's context", icon: "🛡" },
                { t: "Crisis Protocols", d: "Recognizes when professional help is needed", icon: "🚨" },
                { t: "Confidential", d: "Private conversations, deletable anytime", icon: "🔒" },
                { t: "No Manipulation", d: "No conversion tactics, guilt, or pressure", icon: "✋" },
              ].map((p, i) => (
                <div key={i} className="p-3 rounded-lg bg-white border border-gray-100">
                  <span className="text-base mb-1 block">{p.icon}</span>
                  <p className="text-xs font-bold text-gray-900 mb-0.5">{p.t}</p>
                  <p className="text-[11px] text-gray-400 leading-snug">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <video autoPlay muted loop playsInline poster={a("leadersFrame")} className="w-full rounded-xl">
              <source src={urls.leadersVid} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  const f = useFade()
  const reviews = [
    { t: "Having a guide who listens without judgment and responds with real wisdom — it's something I didn't know I needed.", n: "Sarah M.", s: "App Review", stars: 5 },
    { t: "It's not replacing what we do — it's giving people a safe space to explore before deeper conversations.", n: "Rev. James T.", s: "Verified Leader", stars: 5 },
    { t: "My guide feels like talking to a wise uncle who understands the tradition and my modern life.", n: "David K.", s: "App Review", stars: 5 },
    { t: "I was skeptical about AI and spirituality. But Divinity surprised me — it's thoughtful, nuanced, and genuinely helpful.", n: "Priya S.", s: "App Review", stars: 5 },
    { t: "I use it as a reflection tool before meeting with my pastor. It helps me organize my thoughts and questions.", n: "Marcus L.", s: "App Review", stars: 5 },
    { t: "Finally, a spiritual tool that doesn't try to sell me anything or push a specific belief.", n: "Yuki T.", s: "App Review", stars: 5 },
  ]
  return (
    <section className="bg-white py-14 md:py-20">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-2">Testimonials</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-2">What People Are Saying</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((t, i) => (
            <div key={i} className="p-6 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.t}"</p>
              <p className="font-bold text-gray-900 text-sm">{t.n}</p>
              <p className="text-gray-400 text-xs">{t.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── VERIFIED LEADERS ── */
function Leaders() {
  const f = useFade()
  return (
    <section id="leaders" className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={a("verifiedBg")} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div ref={f.ref} style={f.style} className="relative z-10 max-w-[700px] mx-auto px-5 text-center text-white">
        <p className="text-xs tracking-[3px] uppercase opacity-60 font-semibold mb-3">For Spiritual Leaders</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">Verified Leaders</h2>
        <h3 className="font-display text-lg font-light mb-5 opacity-90">Extend your ministry beyond boundaries.</h3>
        <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
          Create your verified profile, publish your AI avatar built on your teachings, and reach people you'd never meet in person. Earn commission from our growing network.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="https://divinityagi.com/spiritual-leaders-and-influencers/" className="px-7 py-3 bg-white text-black rounded-full text-sm font-bold tracking-wide hover:bg-gray-100 transition uppercase">Learn More</a>
          <a href="https://divinityagi.com/spiritual-leaders-and-influencers/" className="px-7 py-3 border-2 border-white text-white rounded-full text-sm font-bold tracking-wide hover:bg-white/10 transition uppercase">Apply Now</a>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ── */
function FAQ() {
  const f = useFade()
  const faqs = [
    { q: "Is Divinity a religion?", a: "No. Divinity is a technology platform that provides access to AI companions trained on various spiritual traditions. It doesn't ask you to believe, join, or follow anything." },
    { q: "Is this a replacement for therapy?", a: "No. Divinity guides offer compassionate spiritual conversation, but they are not licensed therapists. If you're experiencing a mental health crisis, please contact a professional. Our guides include crisis protocols that direct users to appropriate resources." },
    { q: "How are the guides built?", a: "Each guide is constructed on deeply researched behavior profiles rooted in real spiritual traditions, reviewed by scholars and practitioners. They're designed to converse authentically within their tradition's framework." },
    { q: "Is my conversation private?", a: "Yes. All conversations are confidential and can be deleted at any time. We don't sell your data, and your spiritual exploration stays between you and your guide." },
    { q: "Can I talk to multiple guides?", a: "Absolutely. Many users explore several traditions. You can switch between guides freely — there's no commitment to any single path." },
    { q: "What does 'Buy Minutes' mean?", a: "Divinity uses a minute-based system. Free users get 5 minutes daily. Paid plans offer 60 or unlimited minutes per month for deeper, uninterrupted conversations." },
    { q: "Do the guides try to convert people?", a: "Never. Every guide is designed to honor its own tradition without ranking it above others. There are no conversion tactics, guilt, or pressure — ever." },
    { q: "Can real spiritual leaders join Divinity?", a: "Yes! Our Verified Leaders program lets clergy, pastors, rabbis, monks, and spiritual teachers create AI avatars based on their teachings and earn commission. Visit the Verified Leaders section to learn more." },
  ]
  return (
    <section id="faq" className="bg-gray-50 py-14 md:py-20">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-2">Questions?</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-2">Frequently Asked</h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, i) => (
            <Acc key={i} title={faq.q} icon="?" open={i === 0}>{faq.a}</Acc>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── EMAIL + DOWNLOAD CTA ── */
function CtaSection() {
  const f = useFade()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.includes("@")) setSent(true)
  }
  return (
    <section id="get-app" className="bg-white py-14 md:py-20">
      <div ref={f.ref} style={f.style} className={CX}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div>
            <p className="text-xs tracking-[3px] uppercase text-gray-400 font-semibold mb-3">Stay Connected</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">Join Our Community</h3>
            <p className="text-gray-500 text-sm mb-5">Be first to know when new guides and features launch. No spam — just meaningful updates.</p>
            {sent ? (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <p className="text-green-700 text-sm font-semibold">Thank you! We'll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition" />
                <button type="submit" className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-black transition shrink-0">Subscribe</button>
              </form>
            )}
            <p className="text-[11px] text-gray-400 mt-3">We respect your privacy. Unsubscribe anytime.</p>
          </div>
          <div className="text-center">
            <img src={a("phoneStack")} alt="Download Divinity" className="w-52 md:w-64 mx-auto mb-6 drop-shadow-xl" />
            <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-2">Download Divinity</h3>
            <p className="text-gray-400 text-sm mb-5">No commitment. No pressure. Just wisdom.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://divinityagi.com/subscribe-now/" className="px-7 py-3 bg-gray-900 text-white rounded-full text-sm font-bold tracking-wide hover:bg-black transition uppercase inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                App Store
              </a>
              <a href="https://divinityagi.com/subscribe-now/" className="px-7 py-3 bg-gray-900 text-white rounded-full text-sm font-bold tracking-wide hover:bg-black transition uppercase inline-flex items-center gap-2">
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

/* ── FINAL CTA BANNER ── */
function FinalCta() {
  return (
    <section className="bg-gray-900 py-16 md:py-20">
      <div className={`${CX} text-center`}>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Begin Your Journey</h2>
        <p className="text-gray-400 text-sm md:text-base mb-8 max-w-lg mx-auto">No pressure. No judgment. Just a compassionate guide ready to listen whenever you are.</p>
        <button onClick={() => scrollTo("guides")} className="px-8 py-3.5 bg-white text-black rounded-full text-sm font-bold tracking-wide hover:bg-gray-100 transition uppercase">
          Meet Your Guide
        </button>
      </div>
    </section>
  )
}

/* ── FOOTER ── */
function Footer() {
  const nav = [
    { k: "icContribute", l: "Spirit Guides", h: "https://divinityagi.com/divinity-spirit-guide/" },
    { k: "icCircle", l: "Circle of Faiths", h: "https://divinityagi.com/circle-of-faiths/" },
    { k: "icBird", l: "Generate a Guide", h: "https://divinityagi.com/ai-spirit-guide/" },
    { k: "icLotus", l: "Your Guide", h: "https://divinityagi.com/divinity-guide/" },
    { k: "icGuide", l: "Contributors", h: "https://divinityagi.com/spiritual-leaders-and-influencers/" },
    { k: "icStrategy", l: "Settings", h: "#" },
  ]
  return (
    <footer className="bg-white border-t border-gray-100 py-10">
      <div className={CX}>
        <div className="flex justify-center mb-5">
          <img src={a("logoApp")} alt="DivinityAGI" className="w-10 h-10" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-w-lg mx-auto mb-8">
          {nav.map((n, i) => (
            <a key={i} href={n.h} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-gray-50 transition group">
              <img src={a(n.k)} alt="" className="w-8 h-8 opacity-60 group-hover:opacity-100 transition" />
              <span className="text-[9px] text-gray-400 text-center leading-tight font-semibold">{n.l}</span>
            </a>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {[
            { l: "Spirit Guides", h: "#guides" },
            { l: "Circle of Faiths", h: "https://divinityagi.com/circle-of-faiths/" },
            { l: "How It Works", h: "#how-it-works" },
            { l: "Pricing", h: "#pricing" },
            { l: "Verified Leaders", h: "#leaders" },
            { l: "FAQ", h: "#faq" },
          ].map((l, i) => (
            <a key={i} href={l.h} onClick={l.h.startsWith("#") ? (e) => { e.preventDefault(); scrollTo(l.h.slice(1)) } : undefined} className="text-[10px] tracking-[1.5px] text-gray-400 hover:text-gray-700 font-semibold uppercase transition">{l.l}</a>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <a href="https://divinityagi.com/privacy-policy/" className="text-[10px] tracking-[1.5px] text-gray-400 hover:text-gray-700 font-semibold uppercase transition">Privacy Policy</a>
          <a href="https://divinityagi.com/privacy-policy/" className="text-[10px] tracking-[1.5px] text-gray-400 hover:text-gray-700 font-semibold uppercase transition">Terms of Service</a>
          <a href="mailto:hello@divinityagi.com" className="text-[10px] tracking-[1.5px] text-gray-400 hover:text-gray-700 font-semibold uppercase transition">Contact</a>
        </div>
        <p className="text-center text-[11px] text-gray-400">© 2026 <strong>DivinityAGI</strong> · All rights reserved.</p>
      </div>
    </footer>
  )
}

/* ── APP ── */
export default function App() {
  return (
    <div className="min-h-screen bg-white font-body text-gray-900">
      <Nav />
      <Hero />
      <TrustBar />
      <Companions />
      <WhatIsSection />
      <CircleOfFaiths />
      <Guides />
      <FeaturedGuide />
      <HowItWorks />
      <Pricing />
      <Safety />
      <Testimonials />
      <Leaders />
      <FAQ />
      <CtaSection />
      <FinalCta />
      <Footer />
    </div>
  )
}
