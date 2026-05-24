import React, { useState } from 'react';
import { Menu, X, Activity, Users, BarChart3, FileText, Plus, Mic, HeartPulse, Stethoscope, Clock } from 'lucide-react';
import { supabase } from './supabase';

const t = {
  en: {
    overview: 'Overview', patientsList: 'Patients List', activeCases: 'Active Cases', analytics: 'Analytics',
    addNewPatient: '+ Add New Patient', activityLog: 'Activity Log', fullName: 'Full Name', age: 'Age',
    mobileNumber: 'Mobile Number', symptoms: 'Symptoms/Issues', savePatient: 'Save Patient', cancel: 'Cancel',
    totalPatients: 'Total Patients', recovered: 'Recovered',
  },
  hi: {
    overview: 'आज की रिपोर्ट', patientsList: 'मरीजों की लिस्ट', activeCases: 'एक्टिव मरीज', analytics: 'डेटा विश्लेषण',
    addNewPatient: '+ नया मरीज जोड़ें', activityLog: 'हाल की गतिविधि', fullName: 'पूरा नाम', age: 'उम्र',
    mobileNumber: 'मोबाइल नंबर', symptoms: 'लक्षण/समस्याएं', savePatient: 'मरीज सेव करें', cancel: 'रद्द करें',
    totalPatients: 'कुल मरीज', recovered: 'स्वस्थ हुए',
  }
};

function App() {
  const [lang, setLang] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', age: '', mobileNumber: '', symptoms: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('patients').insert([
        { full_name: formData.fullName, age: parseInt(formData.age), mobile: formData.mobileNumber, symptoms: formData.symptoms }
      ]);
      if (error) alert("डेटा सेव नहीं हुआ।");
      else {
        alert(lang === 'en' ? 'Patient added successfully!' : 'मरीज सफलतापूर्वक जोड़ा गया!');
        setFormData({ fullName: '', age: '', mobileNumber: '', symptoms: '' });
        setIsModalOpen(false);
      }
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  const navItems = [
    { id: 'overview', icon: Activity, label: t[lang].overview },
    { id: 'patients', icon: Users, label: t[lang].patientsList },
    { id: 'analytics', icon: BarChart3, label: t[lang].analytics },
    { id: 'logs', icon: FileText, label: t[lang].activityLog },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600"><Menu /></button>
          <div className="flex items-center gap-2 text-blue-600 font-bold"><HeartPulse /><span>HealthCare</span></div>
        </div>
        <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className="px-3 py-1 bg-slate-100 rounded-full text-sm">
          {lang === 'en' ? 'हिंदी' : 'English'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-900/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-64 bg-white h-full shadow-xl flex flex-col">
            <div className="p-4 border-b flex justify-between">
              <span className="text-blue-600 font-bold flex gap-2"><HeartPulse/>HealthCare</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X/></button>
            </div>
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-600">
                  <item.icon className="w-5 h-5" />{item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r flex-col shadow-sm sticky top-0 h-screen">
        <div className="p-6 border-b text-blue-600 font-bold text-2xl flex gap-2"><HeartPulse/>HealthCare</div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}>
              <item.icon className="w-5 h-5" />{item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 w-full max-w-5xl mx-auto">
        
        {/* Top Header (Desktop) */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{t[lang].overview}</h1>
          <div className="bg-slate-100 p-1 rounded-lg">
            <button onClick={() => setLang('en')} className={`px-4 py-1 rounded-md ${lang === 'en' ? 'bg-white text-blue-600' : ''}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-4 py-1 rounded-md ${lang === 'hi' ? 'bg-white text-blue-600' : ''}`}>हिंदी</button>
          </div>
        </div>

        {/* Add Patient Button */}
        <button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold mb-8">
          <Plus />{t[lang].addNewPatient}
        </button>

        {/* Cards */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4"><div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users/></div><div><p className="text-slate-500">{t[lang].totalPatients}</p><p className="text-2xl font-bold">1,248</p></div></div>
            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4"><div className="p-3 bg-teal-50 text-teal-600 rounded-lg"><Stethoscope/></div><div><p className="text-slate-500">{t[lang].activeCases}</p><p className="text-2xl font-bold">342</p></div></div>
            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4"><div className="p-3 bg-green-50 text-green-600 rounded-lg"><Activity/></div><div><p className="text-slate-500">{t[lang].recovered}</p><p className="text-2xl font-bold">890</p></div></div>
          </div>
        )}

      </div>

      {/* Add Patient Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold">{t[lang].addNewPatient}</h2>
              <button onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            <form onSubmit={handleAddPatient} className="p-6 space-y-4">
              <input type="text" name="fullName" required onChange={handleInputChange} placeholder={t[lang].fullName} className="w-full p-3 border rounded-lg" />
              <input type="number" name="age" required onChange={handleInputChange} placeholder={t[lang].age} className="w-full p-3 border rounded-lg" />
              <input type="tel" name="mobileNumber" required onChange={handleInputChange} placeholder={t[lang].mobileNumber} className="w-full p-3 border rounded-lg" />
              <textarea name="symptoms" required onChange={handleInputChange} placeholder={t[lang].symptoms} className="w-full p-3 border rounded-lg" rows="3"></textarea>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">{isSubmitting ? '...' : t[lang].savePatient}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
