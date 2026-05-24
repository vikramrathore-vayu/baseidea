import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowRight, ArrowUpRight, BarChart3, Bot, Check, ChevronRight, ClipboardList, Clock, CreditCard, Download, FileText, HeartPulse, Languages, LayoutDashboard, Lock, Menu, MessageCircle, Mic, Phone, Plus, ShieldCheck, Sparkles, Stethoscope, User, Users, X } from "lucide-react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabase"; // <-- SUPABASE ADDED HERE

const ACCENT = "#5E0ED7";
const PINK = "#FF4FD8";
const GOLD = "#D4AF37";
const PREMIUM_GRADIENT = "linear-gradient(135deg, #fff7df 0%, #ffe6f7 35%, #f1e7ff 68%, #ffffff 100%)";
const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4";
const WHATSAPP_NUMBER = "919876543210";

const ease = [0.22, 1, 0.36, 1];
const navLinks = [{ label: "Story", to: "/#story" }, { label: "Expertise", to: "/#expertise" }, { label: "Studios", to: "/#workflow" }, { label: "Feedback", to: "/#feedback" }];

const languageOptions = [{ code: "en", label: "English" }, { code: "hi", label: "हिन्दी" }, { code: "hinglish", label: "Hinglish" }, { code: "mr", label: "मराठी" }];

const translations = {
  en: { hero1: "Fearless", hero2: "Health", hero3: "Delivered", tagline: "AI Care\nFor Every Village\nOn WhatsApp", desc: "DOCAI helps patients get AI symptom guidance, health records and doctor support without travelling.", cta: "Work With Us", start: "Start Checkup", login: "Login", signup: "Sign Up", dashboard: "Dashboard", pricing: "Pricing", admin: "Admin", whatsapp: "WhatsApp Help", stats1: "RURAL\nPATIENTS", stats2: "AI\nCHECKUPS", stats3: "DOCTOR\nNETWORK", storyTitle: "Built for people who cannot travel for every health question.", storyText: "Founder Mr. Vikram Rathore saw that India has a big health access problem, especially in rural areas.", featureTitle: "What the MVP includes", pricingTitle: "Simple plans for testing revenue", ruralTitle: "Language barrier solved", ruralText: "Users can switch language anytime.", consultTitle: "AI / Doctor Consultation", consultSub: "Answer a few questions. DOCAI creates a triage summary you can send on WhatsApp.", patientDashboard: "Patient Dashboard", welcome: "Welcome back", risk: "Risk Level", records: "Health Records", appointments: "Consultations", leads: "WhatsApp Leads", save: "Save", send: "Send on WhatsApp", name: "Full Name", phone: "Phone Number", symptoms: "Symptoms", age: "Age", city: "Village / City", submit: "Submit", noBackend: "This MVP uses browser localStorage & Supabase.", adminTitle: "Admin Dashboard", revenue: "Revenue Model", disclaimer: "DOCAI is not a replacement for emergency care or a licensed doctor diagnosis." },
  hi: { hero1: "निडर", hero2: "सेहत", hero3: "घर तक", tagline: "हर गांव के लिए\nAI हेल्थ सहायता\nWhatsApp पर", desc: "DOCAI मरीजों को बिना यात्रा किए AI guidance, records और doctor support देता है।", cta: "हमसे जुड़ें", start: "चेकअप शुरू करें", login: "लॉगिन", signup: "साइन अप", dashboard: "डैशबोर्ड", pricing: "प्राइसिंग", admin: "एडमिन", whatsapp: "WhatsApp सहायता", stats1: "ग्रामीण\nमरीज", stats2: "AI\nचेकअप", stats3: "डॉक्टर\nनेटवर्क", storyTitle: "उन लोगों के लिए जो हर health question के लिए travel नहीं कर सकते।", storyText: "Founder Mr. Vikram Rathore ने देखा कि India में health access की बहुत बड़ी problem है।", featureTitle: "MVP में क्या-क्या है", pricingTitle: "Revenue test करने के लिए simple plans", ruralTitle: "Language barrier का solution", ruralText: "User कभी भी language change कर सकता है।", consultTitle: "AI / Doctor Consultation", consultSub: "कुछ सवालों का जवाब दें। DOCAI एक triage summary बनाएगा।", patientDashboard: "Patient Dashboard", welcome: "Welcome back", risk: "Risk Level", records: "Health Records", appointments: "Consultations", leads: "WhatsApp Leads", save: "Save", send: "WhatsApp पर भेजें", name: "पूरा नाम", phone: "फोन नंबर", symptoms: "लक्षण", age: "उम्र", city: "गांव / शहर", submit: "Submit", noBackend: "यह MVP localStorage और Supabase use करता है।", adminTitle: "Admin Dashboard", revenue: "Revenue Model", disclaimer: "DOCAI emergency care का replacement नहीं है।" }
};

translations.hinglish = translations.en;
translations.mr = translations.hi;

const fadeDown = { hidden: { opacity: 0, y: -20 }, visible: (index = 0) => ({ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5, ease } }) };
const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: (index = 0) => ({ opacity: 1, y: 0, transition: { delay: index * 0.12, duration: 0.6, ease } }) };

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => { try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : initialValue; } catch { return initialValue; } });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

function useLang() {
  const [lang, setLang] = useLocalStorage("docai_lang", "en");
  const t = translations[lang] || translations.en;
  return { lang, setLang, t };
}

function makeWhatsAppLink(text) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`; }
function downloadRecordsCsv(records, filename) {
  if (records.length === 0) return alert("No records to download");
  const headers = ["ID", "Name", "Phone", "Age", "City", "Symptoms", "Duration", "Emergency", "Risk", "Date"];
  const rows = records.map(r => [r.id, r.name, r.phone, r.age, r.city, `"${(r.symptoms || "").replace(/"/g, '""')}"`, r.duration, r.emergency, r.risk, r.createdAt]);
  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function recordsWhatsAppMessage(records) { return `Hi Vikram, here is the DOCAI report.\nTotal Patients: ${records.length}\nRecent:\n` + records.slice(-3).map(r => `- ${r.name} (${r.risk})`).join("\n"); }

function Header({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const isDash = loc.pathname.startsWith("/dashboard") || loc.pathname.startsWith("/admin") || loc.pathname.startsWith("/consultation");
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-black/5 bg-white/70 px-6 py-4 backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-2 text-xl font-semibold uppercase tracking-widest text-black"><HeartPulse style={{ color: ACCENT }} /> DOCAI</Link>
      <div className="hidden items-center gap-6 lg:flex">
        {!isDash && navLinks.map((l) => <Link key={l.label} to={l.to} className="text-xs font-semibold uppercase tracking-widest text-black/60 hover:text-black">{l.label}</Link>)}
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.02] p-1"><Languages size={14} className="ml-2 text-black/40" />{languageOptions.map(o => <button key={o.code} onClick={() => setLang(o.code)} className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest transition-colors ${lang === o.code ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black/80"}`}>{o.label}</button>)}</div>
        <Link to="/login" className="text-xs font-semibold uppercase tracking-widest text-black/60 hover:text-black">{t.login}</Link>
        <Link to="/consultation" className="rounded-full bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white">{t.start}</Link>
      </div>
      <button className="lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-white p-6">
            <div className="flex items-center justify-between"><Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-xl font-semibold uppercase tracking-widest text-black"><HeartPulse style={{ color: ACCENT }} /> DOCAI</Link><button onClick={() => setOpen(false)}><X /></button></div>
            <div className="mt-12 flex flex-col gap-8">
              {!isDash && navLinks.map((l) => <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="text-2xl font-semibold uppercase tracking-widest text-black/60 hover:text-black">{l.label}</Link>)}
              <div className="flex flex-wrap gap-2">{languageOptions.map(o => <button key={o.code} onClick={() => { setLang(o.code); setOpen(false); }} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest ${lang === o.code ? "border-black bg-black text-white" : "border-black/20 text-black/60"}`}>{o.label}</button>)}</div>
              <Link to="/login" onClick={() => setOpen(false)} className="text-2xl font-semibold uppercase tracking-widest text-black/60 hover:text-black">{t.login}</Link>
              <Link to="/consultation" onClick={() => setOpen(false)} className="w-fit rounded-full bg-black px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white">{t.start}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function PageShell({ lang, setLang, t, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header lang={lang} setLang={setLang} t={t} />
      <main className="px-6 pt-32 pb-24 lg:px-12">{children}</main>
    </div>
  );
}

function HomePage({ lang, setLang, t }) {
  return (
    <PageShell lang={lang} setLang={setLang} t={t}>
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-5xl font-extrabold uppercase tracking-wide md:text-7xl">{t.hero1} <span style={{ color: ACCENT }}>{t.hero2}</span></h1>
        <p className="mt-6 text-xl text-black/60">{t.tagline}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/consultation" className="rounded-full bg-black px-8 py-4 font-bold text-white uppercase tracking-widest">{t.start}</Link>
        </div>
      </div>
    </PageShell>
  );
}

function AuthPage({ mode, lang, setLang, t }) {
  return (
    <PageShell lang={lang} setLang={setLang} t={t}>
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-center">{mode === "login" ? t.login : t.signup}</h2>
        <form className="mt-6 space-y-4">
          <input className="w-full rounded-xl border p-3" type="email" placeholder="Email" />
          <input className="w-full rounded-xl border p-3" type="password" placeholder="Password" />
          <Link to="/dashboard" className="block w-full rounded-xl bg-black p-3 text-center text-white font-bold uppercase tracking-widest">Submit</Link>
        </form>
      </div>
    </PageShell>
  );
}

function DashboardPage({ lang, setLang, t }) {
  return (
    <PageShell lang={lang} setLang={setLang} t={t}>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold uppercase tracking-widest">{t.dashboard}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link to="/consultation" className="rounded-xl bg-white p-6 shadow hover:shadow-md transition">
            <Plus style={{ color: ACCENT }} size={32} />
            <h2 className="mt-4 text-xl font-bold uppercase tracking-widest">{t.start}</h2>
          </Link>
          <Link to="/admin" className="rounded-xl bg-white p-6 shadow hover:shadow-md transition">
            <LayoutDashboard style={{ color: ACCENT }} size={32} />
            <h2 className="mt-4 text-xl font-bold uppercase tracking-widest">{t.admin}</h2>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

// --- THIS IS THE UPDATED CONSULTATION PAGE WITH SUPABASE ---
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
  
  async function saveRecord(e) {
    e.preventDefault();
    const item = { ...form, id: Date.now(), risk, lang, createdAt: new Date().toISOString() };
    
    // Save to local storage (your old logic)
    setRecords([...records, item]);
    setLeads([...leads, item]);

    // Save to Supabase
    try {
      const { error } = await supabase.from('patients').insert([{ 
        full_name: form.name, 
        mobile: form.phone, 
        age: parseInt(form.age) || null, 
        symptoms: form.symptoms 
      }]);
      if (error) console.error("Supabase Error:", error);
      else alert("Data saved securely to database!");
    } catch (err) { console.error(err); }

    // Clear form
    setForm({ name: "", phone: "", age: "", city: "", symptoms: "", duration: "", emergency: "no" });
  }

  return (
    <PageShell lang={lang} setLang={setLang} t={t}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide">{t.consultTitle}</h1>
          <p className="mt-2 text-black/60 font-semibold">{t.consultSub}</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <form onSubmit={saveRecord} className="space-y-4 rounded-[2rem] bg-white p-6 shadow-sm lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">{t.name}<input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="mt-2 w-full rounded-2xl bg-black/[0.02] border p-3" /></label>
              <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">{t.phone}<input required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="mt-2 w-full rounded-2xl bg-black/[0.02] border p-3" /></label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">{t.age}<input value={form.age} onChange={e=>setForm({...form, age:e.target.value})} className="mt-2 w-full rounded-2xl bg-black/[0.02] border p-3" /></label>
              <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">{t.city}<input value={form.city} onChange={e=>setForm({...form, city:e.target.value})} className="mt-2 w-full rounded-2xl bg-black/[0.02] border p-3" /></label>
            </div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">{t.symptoms}<textarea required value={form.symptoms} onChange={e=>setForm({...form, symptoms:e.target.value})} className="mt-2 w-full rounded-2xl bg-black/[0.02] border p-3" rows="3" /></label>
            <button type="submit" className="w-full rounded-full bg-black px-5 py-4 text-sm font-semibold uppercase tracking-widest text-white">{t.save}</button>
          </form>
          <div className="rounded-[2rem] p-6 text-white shadow-xl lg:col-span-2" style={{ background: `linear-gradient(135deg, #09000f, ${ACCENT}, #2b061b)` }}>
            <Bot style={{ color: ACCENT }} />
            <h2 className="mt-5 text-2xl font-semibold uppercase tracking-wide">AI Triage Preview</h2>
            <div className="mt-5 rounded-2xl bg-white/10 p-4"><p className="text-xs font-semibold uppercase leading-6 tracking-widest text-white/75 whitespace-pre-line">{summary}</p></div>
            <a href={makeWhatsAppLink(summary)} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold uppercase tracking-widest text-white" style={{ backgroundColor: ACCENT }}><MessageCircle size={18} />{t.send}</a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PricingPage({ lang, setLang, t }) { return <PageShell lang={lang} setLang={setLang} t={t}><h1 className="text-3xl font-bold uppercase">{t.pricing}</h1></PageShell>; }
function AdminPage({ lang, setLang, t }) { return <PageShell lang={lang} setLang={setLang} t={t}><h1 className="text-3xl font-bold uppercase">{t.admin}</h1></PageShell>; }

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
