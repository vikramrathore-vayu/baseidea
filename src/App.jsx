import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  ClipboardList,
  Clock,
  CreditCard,
  FileText,
  HeartPulse,
  Languages,
  LayoutDashboard,
  Lock,
  Menu,
  MessageCircle,
  Mic,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  Users,
  X
} from "lucide-react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";

const ACCENT = "#5E0ED7";
const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4";

// TODO: Replace with your real WhatsApp number in international format, without + sign.
// Example: 917851067550
const WHATSAPP_NUMBER = "917851067550";

const ease = [0.22, 1, 0.36, 1];
const navLinks = [
  { label: "Story", to: "/#story" },
  { label: "Expertise", to: "/#expertise" },
  { label: "Studios", to: "/#workflow" },
  { label: "Feedback", to: "/#feedback" }
];

const languageOptions = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "hinglish", label: "Hinglish" },
  { code: "mr", label: "मराठी" }
];

const translations = {
  en: {
    hero1: "Fearless",
    hero2: "Health",
    hero3: "Delivered",
    tagline: "AI Care\nFor Every Village\nOn WhatsApp",
    desc: "DOCAI helps patients get AI symptom guidance, health records and doctor support without travelling.",
    cta: "Work With Us",
    start: "Start Checkup",
    login: "Login",
    signup: "Sign Up",
    dashboard: "Dashboard",
    pricing: "Pricing",
    admin: "Admin",
    whatsapp: "WhatsApp Help",
    stats1: "RURAL\nPATIENTS",
    stats2: "AI\nCHECKUPS",
    stats3: "DOCTOR\nNETWORK",
    storyTitle: "Built for people who cannot travel for every health question.",
    storyText:
      "DOCAI is an online-first healthcare assistance MVP. It can collect symptoms, give safe AI guidance, store simple records, capture leads on WhatsApp and help your team route cases to doctors.",
    featureTitle: "What the MVP includes",
    pricingTitle: "Simple plans for testing revenue",
    ruralTitle: "Language barrier solved",
    ruralText:
      "Users can switch language anytime. For rural India, the app keeps words simple, uses WhatsApp, and supports voice-first workflows in future versions.",
    consultTitle: "AI / Doctor Consultation",
    consultSub: "Answer a few questions. DOCAI creates a triage summary you can send on WhatsApp.",
    patientDashboard: "Patient Dashboard",
    welcome: "Welcome back",
    risk: "Risk Level",
    records: "Health Records",
    appointments: "Consultations",
    leads: "WhatsApp Leads",
    save: "Save",
    send: "Send on WhatsApp",
    name: "Full Name",
    phone: "Phone Number",
    symptoms: "Symptoms",
    age: "Age",
    city: "Village / City",
    submit: "Submit",
    noBackend: "This MVP uses browser localStorage. Connect Firebase/Supabase later for real users.",
    adminTitle: "Admin Dashboard",
    revenue: "Revenue Model",
    disclaimer: "DOCAI is not a replacement for emergency care or a licensed doctor diagnosis."
  },
  hi: {
    hero1: "निडर",
    hero2: "सेहत",
    hero3: "घर तक",
    tagline: "हर गांव के लिए\nAI हेल्थ सहायता\nWhatsApp पर",
    desc: "DOCAI मरीजों को बिना यात्रा किए AI symptom guidance, health records और doctor support देता है।",
    cta: "हमसे जुड़ें",
    start: "चेकअप शुरू करें",
    login: "लॉगिन",
    signup: "साइन अप",
    dashboard: "डैशबोर्ड",
    pricing: "प्राइसिंग",
    admin: "एडमिन",
    whatsapp: "WhatsApp सहायता",
    stats1: "ग्रामीण\nमरीज",
    stats2: "AI\nचेकअप",
    stats3: "डॉक्टर\nनेटवर्क",
    storyTitle: "उन लोगों के लिए जो हर health question के लिए travel नहीं कर सकते।",
    storyText:
      "DOCAI एक online-first healthcare assistance MVP है। यह symptoms collect करता है, safe AI guidance देता है, simple records रखता है, WhatsApp leads capture करता है और cases doctors तक route करता है।",
    featureTitle: "MVP में क्या-क्या है",
    pricingTitle: "Revenue test करने के लिए simple plans",
    ruralTitle: "Language barrier का solution",
    ruralText:
      "User कभी भी language change कर सकता है। Rural India के लिए app simple words, WhatsApp और future में voice-first workflow support करेगा।",
    consultTitle: "AI / Doctor Consultation",
    consultSub: "कुछ सवालों का जवाब दें। DOCAI एक triage summary बनाएगा जिसे WhatsApp पर भेज सकते हैं।",
    patientDashboard: "Patient Dashboard",
    welcome: "Welcome back",
    risk: "Risk Level",
    records: "Health Records",
    appointments: "Consultations",
    leads: "WhatsApp Leads",
    save: "Save",
    send: "WhatsApp पर भेजें",
    name: "पूरा नाम",
    phone: "फोन नंबर",
    symptoms: "लक्षण",
    age: "उम्र",
    city: "गांव / शहर",
    submit: "Submit",
    noBackend: "यह MVP browser localStorage use करता है। Real users के लिए बाद में Firebase/Supabase connect करें।",
    adminTitle: "Admin Dashboard",
    revenue: "Revenue Model",
    disclaimer: "DOCAI emergency care या licensed doctor diagnosis का replacement नहीं है।"
  },
  hinglish: {
    hero1: "Fearless",
    hero2: "Health",
    hero3: "Ghar Tak",
    tagline: "Gaon gaon ke liye\nAI health help\nWhatsApp par",
    desc: "DOCAI patients ko travel ke bina AI guidance, records aur doctor support deta hai.",
    cta: "Work With Us",
    start: "Checkup Start Karo",
    login: "Login",
    signup: "Sign Up",
    dashboard: "Dashboard",
    pricing: "Pricing",
    admin: "Admin",
    whatsapp: "WhatsApp Help",
    stats1: "RURAL\nPATIENTS",
    stats2: "AI\nCHECKUPS",
    stats3: "DOCTOR\nNETWORK",
    storyTitle: "Jinko har health question ke liye travel nahi karna chahiye, unke liye.",
    storyText:
      "DOCAI online-first healthcare assistance MVP hai: symptoms collect, AI guidance, records, WhatsApp leads aur doctor routing.",
    featureTitle: "MVP features",
    pricingTitle: "Revenue test karne ke plans",
    ruralTitle: "Language barrier solve",
    ruralText: "User language switch kar sakta hai. Rural users ke liye simple words + WhatsApp flow.",
    consultTitle: "AI / Doctor Consultation",
    consultSub: "Questions answer karo. DOCAI WhatsApp share karne layak summary banayega.",
    patientDashboard: "Patient Dashboard",
    welcome: "Welcome back",
    risk: "Risk Level",
    records: "Health Records",
    appointments: "Consultations",
    leads: "WhatsApp Leads",
    save: "Save",
    send: "WhatsApp Par Send",
    name: "Full Name",
    phone: "Phone Number",
    symptoms: "Symptoms",
    age: "Age",
    city: "Village / City",
    submit: "Submit",
    noBackend: "Ye MVP localStorage use karta hai. Real app me Firebase/Supabase connect karna.",
    adminTitle: "Admin Dashboard",
    revenue: "Revenue Model",
    disclaimer: "DOCAI emergency care ya licensed doctor diagnosis ka replacement nahi hai."
  },
  mr: {
    hero1: "धाडसी",
    hero2: "आरोग्य",
    hero3: "घरपोच",
    tagline: "प्रत्येक गावासाठी\nAI आरोग्य मदत\nWhatsApp वर",
    desc: "DOCAI रुग्णांना प्रवास न करता AI guidance, records आणि doctor support देते.",
    cta: "आमच्याशी संपर्क",
    start: "Checkup सुरू करा",
    login: "Login",
    signup: "Sign Up",
    dashboard: "Dashboard",
    pricing: "Pricing",
    admin: "Admin",
    whatsapp: "WhatsApp मदत",
    stats1: "ग्रामीण\nरुग्ण",
    stats2: "AI\nCheckups",
    stats3: "Doctor\nNetwork",
    storyTitle: "प्रत्येक आरोग्य प्रश्नासाठी प्रवास करू न शकणाऱ्या लोकांसाठी.",
    storyText:
      "DOCAI online-first healthcare assistance MVP आहे: symptoms collect, AI guidance, records, WhatsApp leads आणि doctor routing.",
    featureTitle: "MVP मध्ये काय आहे",
    pricingTitle: "Revenue test साठी plans",
    ruralTitle: "Language barrier solution",
    ruralText: "User language switch करू शकतो. Rural users साठी simple words + WhatsApp flow.",
    consultTitle: "AI / Doctor Consultation",
    consultSub: "काही questions answer करा. DOCAI WhatsApp summary तयार करेल.",
    patientDashboard: "Patient Dashboard",
    welcome: "Welcome back",
    risk: "Risk Level",
    records: "Health Records",
    appointments: "Consultations",
    leads: "WhatsApp Leads",
    save: "Save",
    send: "WhatsApp वर Send",
    name: "Full Name",
    phone: "Phone Number",
    symptoms: "Symptoms",
    age: "Age",
    city: "Village / City",
    submit: "Submit",
    noBackend: "हा MVP localStorage use करतो. Real app मध्ये Firebase/Supabase connect करा.",
    adminTitle: "Admin Dashboard",
    revenue: "Revenue Model",
    disclaimer: "DOCAI emergency care किंवा licensed doctor diagnosis चा replacement नाही."
  }
};

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (index = 0) => ({ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5, ease } })
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (index = 0) => ({ opacity: 1, y: 0, transition: { delay: index * 0.12, duration: 0.6, ease } })
};

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function useLang() {
  const [lang, setLang] = useLocalStorage("docai_language", "en");
  return { lang, setLang, t: translations[lang] || translations.en };
}

function makeWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="DOCAI home">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2" style={{ borderColor: ACCENT }}>
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />
      </div>
      <span className="hidden text-sm font-semibold uppercase tracking-widest text-black sm:inline">DOCAI</span>
    </Link>
  );
}

function LanguageSelect({ lang, setLang, light = false }) {
  return (
    <label className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-widest ${light ? "border-white/25 text-white" : "border-black/10 bg-white/70 text-black backdrop-blur"}`}>
      <Languages size={15} />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className={`bg-transparent outline-none ${light ? "text-white" : "text-black"}`}
      >
        {languageOptions.map((item) => (
          <option key={item.code} value={item.code} className="text-black">
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function WorkWithUsLink({ className = "", iconSize = 22, children = "Work With Us", message }) {
  return (
    <a
      href={makeWhatsAppLink(message || "Hi DOCAI, I want to know more about your service.")}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 font-semibold uppercase tracking-wide ${className}`}
      style={{ color: ACCENT }}
    >
      {children}
      <ArrowUpRight size={iconSize} strokeWidth={2.5} />
    </a>
  );
}

function MobileMenu({ isOpen, onClose, lang, setLang, t }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex min-h-screen flex-col bg-white px-5 pt-5 pb-8 font-inter text-black sm:px-8 md:px-12 md:pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white" aria-label="Close menu">
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div className="mt-8">
            <LanguageSelect lang={lang} setLang={setLang} />
          </div>
          <nav className="mt-12 flex flex-col gap-7">
            {[...navLinks, { label: t.pricing, to: "/pricing" }, { label: t.login, to: "/login" }, { label: t.dashboard, to: "/dashboard" }].map((link, index) => (
              <motion.div key={link.label} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + index * 0.06, duration: 0.45, ease }}>
                <Link to={link.to} onClick={onClose} className="text-3xl font-semibold uppercase tracking-widest text-black">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="mt-auto">
            <WorkWithUsLink className="text-xl" iconSize={22} message="Hi DOCAI, I want to test the MVP." />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header({ lang, setLang, t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";
  return (
    <>
      <header className={`z-30 flex items-center justify-between px-5 pt-5 sm:px-8 md:px-12 md:pt-6 ${onHome ? "absolute inset-x-0 top-0" : "relative pb-5"}`}>
        <motion.div variants={fadeDown} initial="hidden" animate="visible" custom={0}>
          <Logo />
        </motion.div>
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link, index) => (
            <motion.div key={link.label} variants={fadeDown} initial="hidden" animate="visible" custom={index + 1}>
              <Link to={link.to} className="text-sm font-semibold uppercase tracking-widest text-black">
                {link.label}
              </Link>
            </motion.div>
          ))}
          <Link to="/pricing" className="text-sm font-semibold uppercase tracking-widest text-black">{t.pricing}</Link>
          <Link to="/login" className="text-sm font-semibold uppercase tracking-widest text-black">{t.login}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block"><LanguageSelect lang={lang} setLang={setLang} /></div>
          <motion.button variants={fadeDown} initial="hidden" animate="visible" custom={5} onClick={() => setMenuOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white" aria-label="Open menu">
            <Menu size={18} />
          </motion.button>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} setLang={setLang} t={t} />
    </>
  );
}

function HomePage({ lang, setLang, t }) {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden font-inter text-black">
        <video className="absolute inset-0 h-full w-full object-cover" src={VIDEO_URL} autoPlay loop muted playsInline aria-hidden="true" />
        <Header lang={lang} setLang={setLang} t={t} />
        <div className="relative z-10 flex min-h-screen flex-col pt-20">
          <section className="flex flex-1 items-center justify-end px-5 py-8 sm:px-8 md:px-12 md:py-0">
            <div className="flex items-start gap-5 text-right sm:gap-8 md:gap-10">
              {[
                { value: "300", label: t.stats1 },
                { value: "200", label: t.stats2 },
                { value: "100", label: t.stats3 }
              ].map((item, index) => (
                <motion.div key={item.label} variants={fadeUp} initial="hidden" animate="visible" custom={index + 2} className="text-right">
                  <div className="font-semibold leading-none tracking-wide text-black" style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)" }}>
                    <span className="align-super text-[0.5em]" style={{ color: ACCENT }}>+</span>{item.value}
                  </div>
                  <p className="mt-2 whitespace-pre-line text-[10px] font-semibold uppercase leading-tight tracking-widest text-black sm:text-xs md:text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-6 px-5 pb-8 sm:px-8 md:gap-12 md:px-12 md:pb-12">
            <div className="flex items-center justify-between gap-4">
              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={5} className="max-w-[150px] whitespace-pre-line text-[10px] font-semibold uppercase tracking-widest text-black sm:max-w-[200px] sm:text-xs md:max-w-xs md:text-sm">
                {t.tagline}
              </motion.p>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                <WorkWithUsLink className="whitespace-nowrap text-base sm:text-xl md:text-2xl" iconSize={22} message="Hi DOCAI, I want to test your rural health app." >{t.cta}</WorkWithUsLink>
              </motion.div>
            </div>
            <div className="flex items-end justify-between gap-3 sm:gap-4">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7} className="w-[135px] shrink-0 sm:w-[220px] md:w-[330px]">
                <p className="text-left text-[9px] font-semibold uppercase tracking-widest text-black sm:text-xs md:text-right md:text-sm">{t.desc}</p>
                <div className="mt-5 flex flex-col gap-2 md:items-end">
                  <Link to="/consultation" className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white">
                    {t.start}<ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
              <div className="text-right">
                {[t.hero1, t.hero2, t.hero3].map((word, index) => (
                  <div key={word} className="overflow-hidden">
                    <motion.h1 className="font-semibold uppercase tracking-wide text-black" style={{ fontSize: "clamp(2rem, 9vw, 9rem)", lineHeight: 0.88 }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.4 + index * 0.14, duration: 0.7, ease }}>
                      {word}
                    </motion.h1>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <LandingSections t={t} />
    </>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: ACCENT }}>{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold uppercase tracking-wide text-black sm:text-4xl md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-sm font-semibold uppercase leading-7 tracking-widest text-black/70 md:text-base">{text}</p>}
    </div>
  );
}

function LandingSections({ t }) {
  const features = [
    [Bot, "AI Symptom Triage", "Safe first-level questions, risk level and next-step summary."],
    [MessageCircle, "WhatsApp Lead Capture", "Collect name, phone, village and symptoms, then open WhatsApp."],
    [FileText, "Patient Records", "Simple local record history for prescriptions, symptoms and visits."],
    [Stethoscope, "Doctor Routing", "Admin can see cases and assign doctor follow-up."],
    [Languages, "Multi Language", "English, Hindi, Hinglish and Marathi starter support."],
    [ShieldCheck, "Safety Disclaimer", "Clear emergency and doctor-consultation warnings."],
  ];
  return (
    <div className="bg-white font-inter text-black">
      <section id="story" className="px-5 py-20 sm:px-8 md:px-12">
        <SectionTitle eyebrow="Story" title={t.storyTitle} text={t.storyText} />
      </section>
      <section id="expertise" className="px-5 pb-20 sm:px-8 md:px-12">
        <SectionTitle eyebrow="MVP" title={t.featureTitle} />
        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, text]) => <InfoCard key={title} Icon={Icon} title={title} text={text} />)}
        </div>
      </section>
      <section id="workflow" className="bg-black px-5 py-20 text-white sm:px-8 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: ACCENT }}>Workflow</p>
            <h2 className="mt-4 text-3xl font-semibold uppercase tracking-wide sm:text-5xl">Online-only system</h2>
            <p className="mt-5 text-sm font-semibold uppercase leading-7 tracking-widest text-white/70">User opens app → selects language → fills symptom form → AI triage summary → WhatsApp support → admin dashboard → doctor follow-up.</p>
          </div>
          <div className="grid gap-3">
            {["No offline visit needed to start", "Works as a shareable web app", "Can be hosted free on Vercel/Netlify", "Future: Firebase, payments, voice notes"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold uppercase tracking-widest">
                <Check size={18} style={{ color: ACCENT }} /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 md:px-12">
        <SectionTitle eyebrow="Rural India" title={t.ruralTitle} text={t.ruralText} />
      </section>
      <section id="feedback" className="px-5 pb-20 sm:px-8 md:px-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#f4efff] p-8 md:p-12">
          <h2 className="text-3xl font-semibold uppercase tracking-wide md:text-5xl">Ready to test DOCAI?</h2>
          <p className="mt-4 text-sm font-semibold uppercase leading-7 tracking-widest text-black/70">Share the hosted link with friends. Ask them to test language switch, signup, consultation, pricing and WhatsApp flow.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="rounded-full bg-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white">Create Account</Link>
            <Link to="/consultation" className="rounded-full border border-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black">Try Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ Icon, title, text }) {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: "#f0e7ff", color: ACCENT }}><Icon size={22} /></div>
      <h3 className="mt-5 text-lg font-semibold uppercase tracking-widest">{title}</h3>
      <p className="mt-3 text-sm font-semibold uppercase leading-6 tracking-wider text-black/60">{text}</p>
    </div>
  );
}

function PageShell({ children, lang, setLang, t }) {
  return <div className="min-h-screen bg-[#fbfbfb] font-inter text-black"><Header lang={lang} setLang={setLang} t={t} /><main className="px-5 py-8 sm:px-8 md:px-12">{children}</main></div>;
}

function AuthPage({ mode, lang, setLang, t }) {
  const navigate = useNavigate();
  const [users, setUsers] = useLocalStorage("docai_users", []);
  const [form, setForm] = useState({ name: "", phone: "", password: "", village: "" });
  function submit(e) {
    e.preventDefault();
    const user = { id: Date.now(), name: form.name || "DOCAI User", phone: form.phone, village: form.village, role: "patient" };
    if (mode === "signup") setUsers([...users, user]);
    localStorage.setItem("docai_session", JSON.stringify(user));
    navigate("/dashboard");
  }
  return (
    <PageShell lang={lang} setLang={setLang} t={t}>
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-xl md:grid-cols-2">
        <div className="bg-black p-8 text-white md:p-12">
          <Sparkles style={{ color: ACCENT }} />
          <h1 className="mt-6 text-3xl font-semibold uppercase tracking-wide md:text-5xl">{mode === "signup" ? t.signup : t.login}</h1>
          <p className="mt-5 text-sm font-semibold uppercase leading-7 tracking-widest text-white/70">Create a test patient account. For MVP testing no real backend is used.</p>
          <p className="mt-8 rounded-2xl bg-white/10 p-4 text-xs font-semibold uppercase leading-6 tracking-widest">Demo: any phone + password works.</p>
        </div>
        <form onSubmit={submit} className="space-y-4 p-8 md:p-12">
          {mode === "signup" && <Input icon={User} label={t.name} value={form.name} onChange={(v) => setForm({ ...form, name: v })} />}
          <Input icon={Phone} label={t.phone} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
          {mode === "signup" && <Input icon={MapPinIcon} label={t.city} value={form.village} onChange={(v) => setForm({ ...form, village: v })} />}
          <Input icon={Lock} label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required />
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-4 text-sm font-semibold uppercase tracking-widest text-white">
            {mode === "signup" ? t.signup : t.login}<ArrowRight size={17} />
          </button>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-black/50">
            {mode === "signup" ? "Already have account? " : "New user? "}
            <Link to={mode === "signup" ? "/login" : "/signup"} style={{ color: ACCENT }}>{mode === "signup" ? t.login : t.signup}</Link>
          </p>
        </form>
      </div>
    </PageShell>
  );
}

function MapPinIcon(props) { return <Activity {...props} />; }

function Input({ icon: Icon, label, value, onChange, type = "text", required = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-black/60">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3">
        <Icon size={18} className="text-black/40" />
        <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-sm font-semibold uppercase tracking-widest outline-none placeholder:text-black/30" placeholder={label} />
      </div>
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-black/60">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={5} className="w-full rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm font-semibold uppercase leading-6 tracking-widest outline-none" placeholder={placeholder || label} />
    </label>
  );
}

function DashboardPage({ lang, setLang, t }) {
  const [records] = useLocalStorage("docai_records", []);
  const [leads] = useLocalStorage("docai_leads", []);
  const session = JSON.parse(localStorage.getItem("docai_session") || "null");
  if (!session) return <Navigate to="/login" />;
  return (
    <PageShell lang={lang} setLang={setLang} t={t}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: ACCENT }}>{t.welcome}</p>
            <h1 className="mt-3 text-3xl font-semibold uppercase tracking-wide md:text-6xl">{t.patientDashboard}</h1>
          </div>
          <Link to="/consultation" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white">New Consultation<Plus size={16} /></Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <Metric icon={HeartPulse} label={t.risk} value="LOW" />
          <Metric icon={FileText} label={t.records} value={String(records.length)} />
          <Metric icon={Clock} label={t.appointments} value="02" />
          <Metric icon={MessageCircle} label={t.leads} value={String(leads.length)} />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold uppercase tracking-widest">Recent Health Records</h2>
            <div className="mt-5 space-y-3">
              {records.length === 0 ? <Empty text="No records yet. Start a consultation." /> : records.slice().reverse().map((r) => (
                <div key={r.id} className="rounded-2xl border border-black/10 p-4">
                  <div className="flex justify-between gap-3"><b className="uppercase tracking-widest">{r.name}</b><span style={{ color: ACCENT }}>{r.risk}</span></div>
                  <p className="mt-2 text-sm font-semibold uppercase leading-6 tracking-wider text-black/60">{r.symptoms}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-black p-6 text-white">
            <h2 className="text-xl font-semibold uppercase tracking-widest">Next Steps</h2>
            {[
              "Share app link with 10 friends",
              "Ask them to submit symptoms",
              "Check admin lead table",
              "Replace WhatsApp number"
            ].map((x) => <div key={x} className="mt-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white/75"><ChevronRight size={16} style={{ color: ACCENT }} />{x}</div>)}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Metric({ icon: Icon, label, value }) {
  return <div className="rounded-[1.5rem] bg-white p-6 shadow-sm"><Icon style={{ color: ACCENT }} /><p className="mt-5 text-xs font-semibold uppercase tracking-widest text-black/50">{label}</p><h3 className="mt-2 text-3xl font-semibold uppercase tracking-wide">{value}</h3></div>;
}
function Empty({ text }) { return <div className="rounded-2xl border border-dashed border-black/20 p-8 text-center text-sm font-semibold uppercase tracking-widest text-black/40">{text}</div>; }

function ConsultationPage({ lang, setLang, t }) {
  const [records, setRecords] = useLocalStorage("docai_records", []);
  const [leads, setLeads] = useLocalStorage("docai_leads", []);
  const [form, setForm] = useState({ name: "", phone: "", age: "", city: "", symptoms: "", duration: "", emergency: "no" });
  const risk = useMemo(() => {
    const s = form.symptoms.toLowerCase();
    if (form.emergency === "yes" || ["chest", "breath", "unconscious", "bleeding", "stroke", "heart"].some((w) => s.includes(w))) return "HIGH";
    if (["fever", "pain", "vomit", "infection"].some((w) => s.includes(w))) return "MEDIUM";
    return "LOW";
  }, [form]);
  const summary = `DOCAI Triage Summary\nName: ${form.name}\nPhone: ${form.phone}\nAge: ${form.age}\nVillage/City: ${form.city}\nSymptoms: ${form.symptoms}\nDuration: ${form.duration}\nRisk: ${risk}\nLanguage: ${lang}`;
  function saveRecord(e) {
    e.preventDefault();
    const item = { ...form, id: Date.now(), risk, lang, createdAt: new Date().toISOString() };
    setRecords([...records, item]);
    setLeads([...leads, item]);
  }
  return (
    <PageShell lang={lang} setLang={setLang} t={t}>
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Consultation" title={t.consultTitle} text={t.consultSub} />
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <form onSubmit={saveRecord} className="space-y-4 rounded-[2rem] bg-white p-6 shadow-sm lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2"><Input icon={User} label={t.name} value={form.name} onChange={(v) => setForm({ ...form, name: v })} required /><Input icon={Phone} label={t.phone} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required /></div>
            <div className="grid gap-4 sm:grid-cols-2"><Input icon={Activity} label={t.age} value={form.age} onChange={(v) => setForm({ ...form, age: v })} /><Input icon={Activity} label={t.city} value={form.city} onChange={(v) => setForm({ ...form, city: v })} /></div>
            <TextArea label={t.symptoms} value={form.symptoms} onChange={(v) => setForm({ ...form, symptoms: v })} placeholder="Example: fever, cough, headache..." />
            <Input icon={Clock} label="Duration" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
            <label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-black/60">Emergency symptoms?</span><select value={form.emergency} onChange={(e) => setForm({ ...form, emergency: e.target.value })} className="w-full rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm font-semibold uppercase tracking-widest outline-none"><option value="no">No</option><option value="yes">Yes</option></select></label>
            <button className="w-full rounded-full bg-black px-5 py-4 text-sm font-semibold uppercase tracking-widest text-white">{t.save}</button>
          </form>
          <div className="rounded-[2rem] bg-black p-6 text-white lg:col-span-2">
            <Bot style={{ color: ACCENT }} />
            <h2 className="mt-5 text-2xl font-semibold uppercase tracking-wide">AI Triage Preview</h2>
            <div className="mt-5 rounded-2xl bg-white/10 p-4"><p className="text-xs font-semibold uppercase leading-6 tracking-widest text-white/75 whitespace-pre-line">{summary}</p></div>
            <div className="mt-5 rounded-2xl border border-white/10 p-4"><p className="text-xs font-semibold uppercase leading-6 tracking-widest text-white/70">{t.disclaimer}</p></div>
            <a href={makeWhatsAppLink(summary)} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold uppercase tracking-widest text-white" style={{ backgroundColor: ACCENT }}><MessageCircle size={18} />{t.send}</a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PricingPage({ lang, setLang, t }) {
  const plans = [
    { name: "Free", price: "₹0", points: ["AI symptom form", "WhatsApp support", "Local records"], cta: "Start Free" },
    { name: "Care", price: "₹99/mo", points: ["Priority WhatsApp", "Doctor callback request", "Family records"], cta: "Test Plan" },
    { name: "Clinic", price: "₹999/mo", points: ["Admin dashboard", "Lead management", "Doctor routing"], cta: "Partner" }
  ];
  return (
    <PageShell lang={lang} setLang={setLang} t={t}>
      <SectionTitle eyebrow="Pricing" title={t.pricingTitle} text="Start free, test willingness to pay, then add doctor/clinic subscriptions." />
      <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-3">
        {plans.map((p, i) => <div key={p.name} className={`rounded-[2rem] p-7 shadow-sm ${i === 1 ? "bg-black text-white" : "bg-white text-black"}`}>
          <h3 className="text-2xl font-semibold uppercase tracking-widest">{p.name}</h3><div className="mt-5 text-4xl font-semibold uppercase tracking-wide" style={{ color: i === 1 ? "white" : ACCENT }}>{p.price}</div>
          <div className="mt-6 space-y-3">{p.points.map(pt => <p key={pt} className="flex gap-2 text-sm font-semibold uppercase tracking-widest"><Check size={17} style={{ color: ACCENT }} />{pt}</p>)}</div>
          <a href={makeWhatsAppLink(`Hi DOCAI, I want ${p.name} plan`)} target="_blank" rel="noreferrer" className={`mt-8 flex justify-center rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-widest ${i === 1 ? "bg-white text-black" : "bg-black text-white"}`}>{p.cta}</a>
        </div>)}
      </div>
    </PageShell>
  );
}

function AdminPage({ lang, setLang, t }) {
  const [leads] = useLocalStorage("docai_leads", []);
  const [records] = useLocalStorage("docai_records", []);
  return (
    <PageShell lang={lang} setLang={setLang} t={t}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Admin" title={t.adminTitle} text="Mock admin UI for leads, patients, records and revenue model testing." />
        <div className="mt-10 grid gap-4 md:grid-cols-4"><Metric icon={Users} label="Patients" value={String(records.length)} /><Metric icon={MessageCircle} label="Leads" value={String(leads.length)} /><Metric icon={CreditCard} label="MRR Test" value="₹0" /><Metric icon={BarChart3} label="Conversion" value="0%" /></div>
        <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-sm">
          <div className="border-b border-black/10 p-6"><h2 className="text-xl font-semibold uppercase tracking-widest">Lead Inbox</h2></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs font-semibold uppercase tracking-widest"><thead className="bg-black text-white"><tr><th className="p-4">Name</th><th className="p-4">Phone</th><th className="p-4">City</th><th className="p-4">Risk</th><th className="p-4">Symptoms</th><th className="p-4">Action</th></tr></thead><tbody>{leads.length === 0 ? <tr><td colSpan="6" className="p-8 text-center text-black/40">No leads yet</td></tr> : leads.slice().reverse().map(l => <tr key={l.id} className="border-b border-black/10"><td className="p-4">{l.name}</td><td className="p-4">{l.phone}</td><td className="p-4">{l.city}</td><td className="p-4" style={{ color: l.risk === "HIGH" ? "#dc2626" : ACCENT }}>{l.risk}</td><td className="p-4 max-w-xs truncate">{l.symptoms}</td><td className="p-4"><a className="rounded-full bg-black px-4 py-2 text-white" target="_blank" rel="noreferrer" href={makeWhatsAppLink(`Follow up for ${l.name}, phone ${l.phone}, symptoms: ${l.symptoms}`)}>WhatsApp</a></td></tr>)}</tbody></table></div>
        </div>
      </div>
    </PageShell>
  );
}

function AppRouter() {
  const { lang, setLang, t } = useLang();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage lang={lang} setLang={setLang} t={t} />} />
        <Route path="/login" element={<AuthPage mode="login" lang={lang} setLang={setLang} t={t} />} />
        <Route path="/signup" element={<AuthPage mode="signup" lang={lang} setLang={setLang} t={t} />} />
        <Route path="/dashboard" element={<DashboardPage lang={lang} setLang={setLang} t={t} />} />
        <Route path="/consultation" element={<ConsultationPage lang={lang} setLang={setLang} t={t} />} />
        <Route path="/pricing" element={<PricingPage lang={lang} setLang={setLang} t={t} />} />
        <Route path="/admin" element={<AdminPage lang={lang} setLang={setLang} t={t} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
