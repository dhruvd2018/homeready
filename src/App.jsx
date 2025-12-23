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
  Award,
  Check
} from 'lucide-react';

/**
 * HOMEREADY - NYC MODERN HOME SERVICES
 * v1.2.0 - Brand Pivot: Tech-enabled but Customer-focused (Removing AI Confusion)
 */

const SERVICE_CATALOG = {
  EXHAUST_CLEANING: {
    id: 'exhaust_cleaning',
    name: 'Exhaust Vent & Air Quality',
    price: 149,
    desc: 'Deep clean of bathroom/kitchen exhaust vents. Improves suction and indoor air quality immediately.',
    icon: <Wind className="w-6 h-6" />
  },
  DRYER_VENT: {
    id: 'dryer_vent',
    name: 'Dryer Vent Safety Audit',
    price: 189,
    desc: 'Full lint removal and airflow test for in-unit dryers. Professional fire prevention.',
    icon: <Flame className="w-6 h-6" />
  },
  HANDYMAN_UPGRADE: {
    id: 'handyman',
    name: 'Handyman Safety Visit',
    price: 199,
    desc: 'General maintenance: Loose fixtures, squeaky doors, and leak checks. Perfect for peace of mind.',
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
        <button onClick={() => setView('dashboard')} className={`hover:text-white transition ${view === 'dashboard' ? 'text-white' : ''}`}>Tracking</button>
      </div>

      <div className="flex items-center space-x-4">
        <a href="tel:9293140841" className="hidden md:flex items-center text-slate-300 hover:text-white text-sm font-medium transition">
          <Phone className="w-4 h-4 mr-2 text-blue-500" />
          (929) 314-0841
        </a>
        <button 
          onClick={() => setView('agent')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition shadow-lg shadow-blue-900/50 flex items-center"
        >
          Book a Visit <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  </nav>
);

const Hero = ({ setView }) => (
  <div className="bg-slate-900 text-white pt-20 pb-28 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
    <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
      <div className="space-y-6 flex flex-col items-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-xs font-semibold uppercase tracking-widest">
          Verified Manhattan Service
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-balance">
          Apartment wellness, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">made effortless.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl">
          Professional exhaust cleaning, safety audits, and modern maintenance. 
          Standardized pricing. Visual proof. Absolute transparency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
          <button onClick={() => setView('agent')} className="bg-white text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-slate-100 transition shadow-xl shadow-white/5">Check Availability</button>
          <a href="tel:9293140841" className="border border-slate-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center">Call (929) 314-0841</a>
        </div>
        <div className="flex items-center space-x-6 pt-6 opacity-60">
           <div className="flex items-center text-xs font-medium"><Check className="w-4 h-4 mr-1 text-emerald-400" /> Licensed & Insured</div>
           <div className="flex items-center text-xs font-medium"><Check className="w-4 h-4 mr-1 text-emerald-400" /> Flat-Rate Only</div>
           <div className="flex items-center text-xs font-medium"><Check className="w-4 h-4 mr-1 text-emerald-400" /> Photo Verification</div>
        </div>
      </div>
    </div>
  </div>
);

const ResultsGallery = () => {
  const beforeImg = "/images/IMG_4477.jpeg"; 
  const afterImg = "/images/IMG_4478.jpeg";

  return (
    <div className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-slate-900 flex items-center">
              <Camera className="w-8 h-8 mr-4 text-blue-600" /> Real Results
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              We clear decades of dust from bathroom and kitchen exhaust vents to restore airflow and eliminate allergens.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center space-x-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 text-sm font-bold uppercase tracking-widest">
            <Wind className="w-5 h-5" /> Airflow Restored
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 relative flex flex-col shadow-sm">
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-slate-200">
              <img 
                src={beforeImg} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} 
              />
              <div className="hidden absolute inset-0 flex-col items-center justify-center p-8 bg-slate-100 text-center">
                 <div className="text-5xl mb-4">🌪️</div>
                 <div className="text-slate-900 font-bold text-xl">Before</div>
                 <p className="text-sm text-slate-500 mt-2">Clogged Exhaust Vent</p>
              </div>
            </div>
            <div className="bg-slate-900 p-5 flex justify-between items-center text-white">
              <span className="text-xs font-black uppercase tracking-widest opacity-60">Before Cleaning</span>
              <span className="text-sm font-medium italic text-slate-400">Obstructed Suction</span>
            </div>
          </div>

          <div className="group overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50 relative flex flex-col shadow-sm">
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-emerald-100">
              <img 
                src={afterImg} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} 
              />
              <div className="hidden absolute inset-0 flex-col items-center justify-center p-8 bg-emerald-50 text-center">
                 <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                 <div className="text-slate-900 font-bold text-xl uppercase tracking-widest">After</div>
                 <p className="text-sm text-slate-600 mt-2">HomeReady Cleared</p>
              </div>
            </div>
            <div className="bg-emerald-600 p-5 flex justify-between items-center text-white">
              <span className="text-xs font-black uppercase tracking-widest opacity-60">HomeReady Finished</span>
              <span className="text-sm font-medium italic text-emerald-100">Free Airflow</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16 p-10 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Star className="w-9 h-9 fill-current" />
          </div>
          <div>
            <div className="flex items-center space-x-1 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
            </div>
            <p className="text-slate-700 text-xl font-medium leading-relaxed italic">
              "The dust in our bathroom vent was incredible. HomeReady cleared it in under 30 minutes and the proof was in the photos. Professional, clean, and finally a service in NYC with actual upfront pricing."
            </p>
            <div className="flex items-center mt-6">
              <p className="text-slate-900 font-bold text-lg">Sarah L.</p>
              <div className="mx-3 w-1.5 h-1.5 bg-slate-300 rounded-full" />
              <p className="text-slate-500 font-medium">Verified Resident</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceGrid = ({ setView }) => (
  <div className="py-24 bg-slate-50 border-y border-slate-200">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Standardized Pricing</h2>
        <p className="text-slate-600 mt-4 text-lg">No hourly estimates. No hidden fees. Just results.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {Object.values(SERVICE_CATALOG).map((s) => (
          <div key={s.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition hover:shadow-xl hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">{s.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 tracking-tight">{s.name}</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed min-h-[48px]">{s.desc}</p>
            <div className="text-3xl font-black text-slate-900 mb-8">${s.price}</div>
            <button onClick={() => setView('agent')} className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition duration-300">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AgentInterface = ({ setView }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'agent', text: "Welcome to HomeReady. I can help you book a maintenance visit or safety audit. What's your Manhattan address?" }
  ]);
  const [input, setInput] = useState('');
  const [state, setState] = useState('ADDRESS'); 
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
        setMessages(prev => [...prev, { id: Date.now(), type: 'agent', text: "Understood. What day and time works best for your visit?" }]);
        setState('TIME');
      } else if (state === 'TIME') {
        setBookingData(prev => ({ ...prev, time: userText }));
        setMessages(prev => [...prev, { id: Date.now(), type: 'agent', text: `Great. I've prepared your booking summary. To finalize, click the button below to text our dispatch team directly.` }]);
        setState('CONFIRM');
      }
    }, 800);
  };

  const generateSMSLink = () => {
    const businessNumber = "9293140841";
    const body = `HomeReady Booking Confirmation:\nAddress: ${bookingData.address}\nService: ${bookingData.service}\nTime: ${bookingData.time}\n\nPlease send this to confirm.`;
    return `sms:+1${businessNumber}?&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-4 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 h-[650px] flex flex-col">
          <div className="bg-slate-900 p-5 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-500" />
              <div className="text-sm font-bold tracking-tight">HomeReady Assistant</div>
            </div>
            <button onClick={() => setView('home')} className="opacity-40 hover:opacity-100 transition"><X className="w-6 h-6" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.type === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-slate-400 font-medium italic animate-pulse">Assistant is typing...</div>}
            
            {state === 'CONFIRM' && (
              <div className="mt-6 p-8 bg-blue-50 border border-blue-100 rounded-3xl text-center space-y-6 animate-in zoom-in-95 duration-500">
                <div className="flex justify-center"><Calendar className="w-12 h-12 text-blue-600" /></div>
                <div className="space-y-2">
                  <div className="text-xl font-bold text-slate-900 tracking-tight">Final Step</div>
                  <div className="text-sm text-slate-600 font-medium">{bookingData.service} • {bookingData.time}</div>
                </div>
                <a 
                  href={generateSMSLink()}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-5 h-5 mr-2" /> Text to Confirm Booking
                </a>
              </div>
            )}
          </div>
          <div className="p-6 border-t bg-white">
            <div className="flex space-x-3">
              <input 
                className="flex-1 bg-slate-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder={state === 'CONFIRM' ? "Please use the button above." : "Type your response..."}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                disabled={state === 'CONFIRM'}
              />
              <button 
                onClick={handleSend}
                disabled={state === 'CONFIRM'}
                className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition disabled:opacity-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setView }) => (
  <footer className="bg-slate-900 text-slate-500 py-16 border-t border-slate-800 text-sm">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
      <div className="space-y-4">
        <div className="text-white font-bold text-xl flex items-center">
          <Shield className="w-6 h-6 mr-2 text-blue-500" /> HomeReady
        </div>
        <p className="leading-relaxed">Modern NYC home services. Professional exhaust cleaning and apartment safety audits.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Services</h4>
        <ul className="space-y-3 font-medium">
          <li>Exhaust Cleaning</li>
          <li>Dryer Vent Safety</li>
          <li>Handyman Visits</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Platform</h4>
        <ul className="space-y-3 font-medium">
          <li><button onClick={() => setView('dashboard')} className="hover:text-white transition">Service Hub</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contact</h4>
        <ul className="space-y-3 font-medium">
          <li className="text-white font-bold">(929) 314-0841</li>
          <li>support@homereadys.com</li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-slate-800 text-xs text-slate-600 text-center font-medium">
      <p>&copy; 2025 HomeReady Technologies Inc. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  const [view, setView] = useState('home');

  return (
    <div className="font-sans text-slate-900 bg-white antialiased">
      <Header setView={setView} view={view} />
      {view === 'home' && (
        <>
          <Hero setView={setView} />
          <ResultsGallery />
          <ServiceGrid setView={setView} />
        </>
      )}
      {view === 'agent' && <AgentInterface setView={setView} />}
      {view === 'dashboard' && (
        <div className="bg-slate-50 min-h-screen p-12 text-center flex flex-col items-center justify-center">
          <Activity className="w-16 h-16 text-blue-600 mb-6" />
          <h1 className="text-3xl font-black">Service Tracker</h1>
          <p className="text-slate-500 mt-2 max-w-sm">Secure hub for real-time job status and resident safety analytics.</p>
          <button onClick={() => setView('home')} className="mt-8 text-blue-600 font-bold hover:underline">Return to Home</button>
        </div>
      )}
      <Footer setView={setView} />
    </div>
  );
};

export default App;