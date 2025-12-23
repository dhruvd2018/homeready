import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Wind, 
  Thermometer, 
  Snowflake, 
  MessageSquare, 
  MapPin, 
  CheckCircle, 
  CreditCard,
  Building,
  ChevronRight,
  X,
  Star,
  Activity,
  User,
  DollarSign,
  Phone,
  Camera,
  Flame,
  Calendar,
  Clock,
  Send,
  Award
} from 'lucide-react';

/**
 * HOMEREADY - NYC AI-NATIVE HOME SERVICES
 * v1.1.9 - Fixed image extensions to .jpeg and case sensitivity
 */

const SERVICE_CATALOG = {
  EXHAUST_CLEANING: {
    id: 'exhaust_cleaning',
    name: 'Exhaust Vent & Air Quality',
    price: 149,
    desc: 'Deep clean of bathroom/kitchen exhaust vents. Removes years of dust, improves suction and air quality.',
    icon: <Wind className="w-6 h-6" />
  },
  DRYER_VENT: {
    id: 'dryer_vent',
    name: 'Dryer Vent Safety Audit',
    price: 189,
    desc: 'Full lint removal and airflow test for in-unit dryers. Critical fire prevention.',
    icon: <Flame className="w-6 h-6" />
  },
  HANDYMAN_UPGRADE: {
    id: 'handyman',
    name: 'Handyman Safety Visit',
    price: 199,
    desc: 'General maintenance: Loose fixtures, squeaky doors, and leak checks. Perfect for move-ins.',
    icon: <Shield className="w-6 h-6" />
  }
};

const Header = ({ setView, view }) => (
  <nav className="w-full bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">HomeReady</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
        <button onClick={() => setView('home')} className={`hover:text-white transition ${view === 'home' ? 'text-white' : ''}`}>Services</button>
        <button onClick={() => setView('dashboard')} className={`hover:text-white transition ${view === 'dashboard' ? 'text-white' : ''}`}>Operator Portal</button>
      </div>

      <div className="flex items-center space-x-4">
        <a href="tel:9293140841" className="hidden md:flex items-center text-slate-300 hover:text-white text-sm font-medium transition">
          <Phone className="w-4 h-4 mr-2 text-blue-500" />
          (929) 314-0841
        </a>
        <button 
          onClick={() => setView('agent')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold text-sm transition shadow-lg shadow-blue-900/50 flex items-center"
        >
          Book Now <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  </nav>
);

const Hero = ({ setView }) => (
  <div className="bg-slate-900 text-white pt-16 pb-24 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
    <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
      <div className="space-y-6 flex flex-col items-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-700/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Activity className="w-3 h-3 mr-1" /> System Online • NYC
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Apartment wellness, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">orchestrated by AI.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-lg">Professional exhaust cleaning and safety audits. Standardizing home maintenance for every NYC resident.</p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
          <button onClick={() => setView('agent')} className="bg-white text-slate-900 px-8 py-3.5 rounded-lg font-bold hover:bg-slate-100 transition shadow-lg">Start Booking</button>
          <a href="tel:9293140841" className="border border-slate-700 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center">Call (929) 314-0841</a>
        </div>
      </div>
    </div>
  </div>
);

const ResultsGallery = () => {
  // Updated to .jpeg based on user feedback. 
  // Ensure the filenames in public/images/ match these exactly (IMG is uppercase, .jpeg is lowercase)
  const beforeImg = "/images/IMG_4477.jpeg"; 
  const afterImg = "/images/IMG_4478.jpeg";

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
               <Award className="w-4 h-4" />
               <span>Case Study #001</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center">
              <Camera className="w-7 h-7 mr-3 text-blue-600" /> Proof of Work
            </h2>
            <p className="text-slate-600 mt-2">We clear the buildup to restore proper ventilation and indoor air quality.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 text-xs font-bold uppercase tracking-wider">
            <Wind className="w-4 h-4" /> Air Quality Restored
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before Card */}
          <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 relative flex flex-col shadow-sm">
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-slate-200">
              <img 
                src={beforeImg} 
                alt="Before" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                onError={(e) => { 
                  e.target.style.display='none'; 
                  e.target.nextSibling.style.display='flex'; 
                }} 
              />
              <div className="hidden absolute inset-0 flex-col items-center justify-center p-8 bg-slate-100 text-center">
                 <div className="text-5xl mb-4">🌪️</div>
                 <div className="text-slate-900 font-bold text-lg">Heavy Dust Buildup</div>
                 <p className="text-sm text-slate-500 mt-1">Found in Manhattan High-Rise</p>
              </div>
            </div>
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
              <span className="text-xs font-bold uppercase opacity-70">Before</span>
              <span className="text-xs italic text-slate-300">Obstructed Airflow</span>
            </div>
          </div>
          {/* After Card */}
          <div className="group overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 relative flex flex-col shadow-sm">
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-emerald-100">
              <img 
                src={afterImg} 
                alt="After" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                onError={(e) => { 
                  e.target.style.display='none'; 
                  e.target.nextSibling.style.display='flex'; 
                }} 
              />
              <div className="hidden absolute inset-0 flex-col items-center justify-center p-8 bg-emerald-50 text-center">
                 <CheckCircle className="w-14 h-14 text-emerald-600 mb-3" />
                 <div className="text-slate-900 font-bold text-lg uppercase tracking-tight">Restored</div>
                 <p className="text-sm text-slate-600 mt-1">Deep Sanitization Complete</p>
              </div>
            </div>
            <div className="bg-emerald-600 p-4 flex justify-between items-center text-white">
              <span className="text-xs font-bold uppercase opacity-70">After HomeReady</span>
              <span className="text-xs italic text-emerald-100">High Suction</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 relative">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Star className="w-8 h-8 fill-current" />
          </div>
          <div>
            <div className="flex items-center space-x-1 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />)}
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Verified Review</span>
            </div>
            <p className="text-slate-700 text-lg italic leading-relaxed">
              "I never realized how much dust our bathroom vent was blowing back into the apartment. HomeReady cleared it out in 20 minutes and showed me the before/after photos. Incredible service and so simple to book."
            </p>
            <div className="flex items-center mt-4">
              <p className="text-slate-900 font-bold">Sarah L.</p>
              <div className="mx-2 w-1 h-1 bg-slate-300 rounded-full" />
              <p className="text-slate-500 text-sm">Upper West Side Resident</p>
            </div>
          </div>
          <div className="absolute top-4 right-8 opacity-5 hidden md:block">
            <MessageSquare className="w-24 h-24 text-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentInterface = ({ setView }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'agent', text: "Hi, I'm the HomeReady Assistant. Let's get your apartment maintenance sorted. What's your Manhattan address?" }
  ]);
  const [input, setInput] = useState('');
  const [state, setState] = useState('ADDRESS'); // ADDRESS, SERVICE, TIME, CONFIRM, DONE
  const [bookingData, setBookingData] = useState({ address: '', service: '', time: '' });
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(prev => [...prev, { id: Date.now(), text: userText, type: 'user' }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (state === 'ADDRESS') {
        setBookingData(prev => ({ ...prev, address: userText }));
        setMessages(prev => [...prev, { id: Date.now(), type: 'agent', text: `Got it. We service ${userText}. Which service do you need? (Exhaust Cleaning, Dryer Vent, or Handyman Visit)` }]);
        setState('SERVICE');
      } else if (state === 'SERVICE') {
        setBookingData(prev => ({ ...prev, service: userText }));
        setMessages(prev => [...prev, { id: Date.now(), type: 'agent', text: "Perfect. What day and time works best for your safety audit?" }]);
        setState('TIME');
      } else if (state === 'TIME') {
        setBookingData(prev => ({ ...prev, time: userText }));
        setMessages(prev => [...prev, { id: Date.now(), type: 'agent', text: `Confirmed: ${bookingData.service} at ${userText}. I've prepared your booking summary. Click below to text our dispatch team and finalize!` }]);
        setState('CONFIRM');
      }
    }, 800);
  };

  const generateSMSLink = () => {
    const businessNumber = "9293140841";
    const body = `HomeReady Booking Confirmation:\nAddress: ${bookingData.address}\nService: ${bookingData.service}\nTime: ${bookingData.time}\n\n[Please send this text to confirm your booking]`;
    return `sms:+1${businessNumber}?&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-4 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 h-[600px] flex flex-col">
          <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-500" />
              <div className="text-sm font-bold">HomeReady Scheduling Concierge</div>
            </div>
            <button onClick={() => setView('home')}><X className="w-5 h-5 opacity-50" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.type === 'user' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-slate-400 italic px-2">Agent is typing...</div>}
            
            {state === 'CONFIRM' && (
              <div className="mt-4 p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center space-y-4 animate-in slide-in-from-bottom-4">
                <div className="flex justify-center"><Calendar className="w-10 h-10 text-blue-600" /></div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">Finalize Booking</div>
                  <div className="text-xs text-slate-600">{bookingData.service} • {bookingData.time}</div>
                </div>
                <a 
                  href={generateSMSLink()}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-blue-700 transition"
                >
                  <Send className="w-4 h-4 mr-2" /> Text Dispatch to Confirm
                </a>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Connects to (929) 314-0841</p>
              </div>
            )}
          </div>
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input 
                className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={state === 'CONFIRM' ? "Click button above..." : "Type here..."}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                disabled={state === 'CONFIRM'}
              />
              <button 
                onClick={handleSend}
                disabled={state === 'CONFIRM'}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OperatorDashboard = () => (
  <div className="bg-slate-50 min-h-screen p-8 text-center">
    <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
    <h1 className="text-2xl font-bold">Operator Hub</h1>
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-sm border"><div className="text-xs font-bold text-slate-400 uppercase">Total Jobs</div><div className="text-3xl font-bold">1</div></div>
      <div className="bg-white p-6 rounded-xl shadow-sm border"><div className="text-xs font-bold text-slate-400 uppercase">Target</div><div className="text-sm font-bold uppercase">Exhaust Vents</div></div>
      <div className="bg-white p-6 rounded-xl shadow-sm border"><div className="text-xs font-bold text-slate-400 uppercase">SMS Engine</div><div className="text-sm font-bold text-emerald-500">READY</div></div>
      <div className="bg-white p-6 rounded-xl shadow-sm border"><div className="text-xs font-bold text-slate-400 uppercase">Reviews</div><div className="text-3xl font-bold text-emerald-500">1</div></div>
    </div>
  </div>
);

const Footer = ({ setView }) => (
  <footer className="bg-slate-900 text-slate-500 py-12 border-t border-slate-800 text-sm">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
      <div>
        <div className="text-white font-bold text-lg mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" /> HomeReady
        </div>
        <p>NYC's AI-native home services operator. Professional exhaust cleaning & safety audits.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Services</h4>
        <ul className="space-y-2 text-slate-400">
          <li>Exhaust Vent Cleaning</li>
          <li>Dryer Vent Safety Audit</li>
          <li>Handyman Visit</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Company</h4>
        <ul className="space-y-2">
          <li><button onClick={() => setView('dashboard')} className="hover:text-white transition">Operator Hub</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Contact</h4>
        <ul className="space-y-2">
          <li className="text-white font-bold">(929) 314-0841</li>
          <li>support@homereadys.com</li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-slate-800 text-xs text-slate-600 text-center">
      <p>&copy; 2025 HomeReady Technologies Inc. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  const [view, setView] = useState('home');

  return (
    <div className="font-sans text-slate-900 bg-white">
      <Header setView={setView} view={view} />
      {view === 'home' && (
        <>
          <Hero setView={setView} />
          <ResultsGallery />
          <div className="py-20 bg-slate-50 border-y border-slate-200">
            <div className="max-w-6xl mx-auto px-4 text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">Flat-Rate Pricing</h2>
            </div>
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
              {Object.values(SERVICE_CATALOG).map((s) => (
                <div key={s.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition hover:shadow-md">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">{s.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{s.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 min-h-[48px]">{s.desc}</p>
                  <div className="text-2xl font-bold mb-6">${s.price}</div>
                  <button onClick={() => setView('agent')} className="w-full py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition">Book Now</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {view === 'agent' && <AgentInterface setView={setView} />}
      {view === 'dashboard' && <OperatorDashboard />}
      <Footer setView={setView} />
    </div>
  );
};

export default App;