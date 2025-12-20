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
  Phone
} from 'lucide-react';

/**
 * HOMEREADY - NYC AI-NATIVE HOME SERVICES
 * LAUNCH VERSION 1.1.1 - Updated Official Contact Info
 * Strategy: Dryer Vent Wedge -> Organic Growth -> Upsell
 */

const SERVICE_CATALOG = {
  DRYER_VENT: {
    id: 'dryer_vent',
    name: 'Dryer Vent Cleaning & Safety',
    price: 189,
    buildingPrice: 139,
    desc: 'Full cleaning, airflow test, fire-risk checklist. NYC code compliant.',
    icon: <Wind className="w-6 h-6" />
  },
  THERMOSTAT: {
    id: 'thermostat',
    name: 'Smart Thermostat Install',
    price: 299,
    buildingPrice: 279,
    desc: 'Nest/Ecobee installation. C-wire verification included.',
    icon: <Thermometer className="w-6 h-6" />
  },
  WINTERIZE: {
    id: 'winterize',
    name: 'Winter Weatherization',
    price: 399,
    buildingPrice: 369,
    desc: 'Window film, draft sealing, radiator reflectors.',
    icon: <Snowflake className="w-6 h-6" />
  }
};

const SUBCONTRACTOR_PAYOUTS = {
  DRYER_VENT: 75,
  THERMOSTAT: 120,
  WINTERIZE: 140,
  EMERGENCY_SURCHARGE: 15,
};

const Header = ({ setView, view }) => (
  <nav className="w-full bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div 
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={() => setView('home')}
      >
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">HomeReady</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
        <button onClick={() => setView('home')} className={`hover:text-white transition ${view === 'home' ? 'text-white' : ''}`}>Services</button>
        <button onClick={() => setView('dashboard')} className={`hover:text-white transition ${view === 'dashboard' ? 'text-white' : ''}`}>Operator Portal</button>
        <button onClick={() => setView('subcontractor')} className={`hover:text-white transition ${view === 'subcontractor' ? 'text-white' : ''}`}>Pro Login</button>
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
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
      <div className="space-y-6 flex flex-col items-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-700/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Activity className="w-3 h-3 mr-1" />
          System Online • NYC
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Home maintenance, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            orchestrated by AI.
          </span>
        </h1>
        <p className="text-lg text-slate-400 max-w-lg">
          Flat-rate dryer vent cleaning and safety audits. 
          The smarter way to protect your Manhattan home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
          <button 
            onClick={() => setView('agent')}
            className="bg-white text-slate-900 px-8 py-3.5 rounded-lg font-bold hover:bg-slate-100 transition flex justify-center items-center shadow-lg shadow-white/10"
          >
            Start Booking
            <MessageSquare className="w-4 h-4 ml-2" />
          </button>
          <a 
            href="tel:9293140841"
            className="border border-slate-700 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center"
          >
            Call (929) 314-0841
          </a>
        </div>
      </div>
    </div>
  </div>
);

const ServiceGrid = ({ setView }) => (
  <div className="py-20 bg-slate-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900">Expert Services</h2>
        <p className="text-slate-600 mt-2">Certified pros. Fixed pricing. Guaranteed outcomes.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {Object.values(SERVICE_CATALOG).map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
            <p className="text-slate-500 text-sm mb-4 min-h-[40px]">{service.desc}</p>
            <div className="flex items-baseline mb-6">
              <span className="text-2xl font-bold text-slate-900">${service.price}</span>
              <span className="text-slate-400 text-sm ml-1">/ visit</span>
            </div>
            <button 
              onClick={() => setView('agent')}
              className="w-full py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Check Availability
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AgentInterface = ({ setView }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'agent', text: "Hi, I'm the HomeReady Assistant. I can help you schedule a dryer vent cleaning or other home safety services. What's your address?" }
  ]);
  const [input, setInput] = useState('');
  const [state, setState] = useState('ADDRESS');
  const [bookingData, setBookingData] = useState({});
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
        const isBeachhead = userText.includes('80th') || userText.includes('345');
        setBookingData({ address: userText, isBeachhead });
        setMessages(prev => [...prev, { id: Date.now(), type: 'agent', text: `Got it. We service ${userText}. Which service do you need? (Dryer Vent, Thermostat, or Winterization)` }]);
        setState('SERVICE');
      } else if (state === 'SERVICE') {
        setMessages(prev => [...prev, { id: Date.now(), type: 'agent', text: "Checking our schedule for a licensed pro in your area... Shall I generate a secure booking link?" }]);
        setState('CONFIRM');
      }
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-4 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 h-[600px] flex flex-col">
          <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-500" />
              <div className="text-sm font-bold">HomeReady Concierge</div>
            </div>
            <button onClick={() => setView('home')}><X className="w-5 h-5 opacity-50" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.type === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-slate-400 italic">Thinking...</div>}
          </div>
          <div className="p-4 border-t">
            <input 
              className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Type address..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
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
    <p className="text-slate-500">Real-time building penetration and agent metrics.</p>
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="text-xs font-bold text-slate-400 uppercase">Active Jobs</div>
        <div className="text-3xl font-bold">14</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="text-xs font-bold text-slate-400 uppercase">Rev/Unit</div>
        <div className="text-3xl font-bold">$215</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="text-xs font-bold text-slate-400 uppercase">Penetration</div>
        <div className="text-3xl font-bold">12%</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="text-xs font-bold text-slate-400 uppercase">Health</div>
        <div className="text-3xl font-bold text-emerald-500">98%</div>
      </div>
    </div>
    <button onClick={() => window.location.reload()} className="mt-8 text-blue-600 text-sm font-bold">Refresh Live Feed</button>
  </div>
);

const SubcontractorPortal = () => (
  <div className="bg-slate-50 min-h-screen p-8">
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border shadow-sm text-center">
      <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold">Pro Portal</h1>
      <p className="text-slate-500 mb-8">Login to view dispatched jobs and flat-rate payouts.</p>
      <div className="p-4 bg-slate-50 rounded-xl border mb-6 text-sm text-slate-600 italic">
        "I'm ready to accept a dryer vent job at 345 E 80th St."
      </div>
      <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">Sign In</button>
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
        <p>NYC's first AI-native home services operator. Reliable maintenance for modern living.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Services</h4>
        <ul className="space-y-2">
          <li>Dryer Vent Cleaning</li>
          <li>Thermostat Install</li>
          <li>Winter Weatherization</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Company</h4>
        <ul className="space-y-2">
          <li><button onClick={() => setView('dashboard')} className="hover:text-white transition">Operator Hub</button></li>
          <li><button onClick={() => setView('subcontractor')} className="hover:text-white transition">Subcontractor Portal</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Contact</h4>
        <ul className="space-y-2">
          <li>support@homereadys.com</li>
          <li className="text-white font-bold">(929) 314-0841</li>
          <li>Manhattan, New York</li>
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
      {view === 'home' && <><Hero setView={setView} /><ServiceGrid setView={setView} /></>}
      {view === 'agent' && <AgentInterface setView={setView} />}
      {view === 'dashboard' && <OperatorDashboard />}
      {view === 'subcontractor' && <SubcontractorPortal />}
      <Footer setView={setView} />
    </div>
  );
};

export default App;