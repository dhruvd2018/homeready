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
  DollarSign
} from 'lucide-react';

/**
 * HOMEREADY - NYC AI-NATIVE HOME SERVICES
 * LAUNCH VERSION 1.1 - Added Subcontractor Portal
 * * Core Logic:
 * - Address-based pricing (Beachhead logic)
 * - Triage Agent (Safety firewall)
 * - Operator Dashboard (Flywheel visualization)
 */

// --- CONFIGURATION & DATA MODELS ---

const SERVICE_CATALOG = {
  DRYER_VENT: {
    id: 'dryer_vent',
    name: 'Dryer Vent Cleaning & Safety',
    price: 189,
    buildingPrice: 139,
    desc: 'Full cleaning, airflow test, fire-risk checklist.',
    icon: <Wind className="w-6 h-6" />
  },
  THERMOSTAT: {
    id: 'thermostat',
    name: 'Smart Thermostat Install',
    price: 299, // Customer provides device
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

const BEACHHEAD_BUILDING = "345 E 80th St";

const SUBCONTRACTOR_PAYOUTS = {
  DRYER_VENT: 75,
  THERMOSTAT: 120,
  WINTERIZE: 140,
  EMERGENCY_SURCHARGE: 15, // $75 + $15 = $90 for Dryer Vent Emergency
};

// --- COMPONENTS ---

// 1. HEADER
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

      <button 
        onClick={() => setView('agent')}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold text-sm transition shadow-lg shadow-blue-900/50 flex items-center"
      >
        Book Flat-Rate <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  </nav>
);

// 2. HERO & LANDING
const Hero = ({ setView }) => (
  <div className="bg-slate-900 text-white pt-16 pb-24 relative overflow-hidden">
    {/* Background Abstract */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
      <div className="space-y-6 flex flex-col items-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-700/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Activity className="w-3 h-3 mr-1" />
          System Online • NYC
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Home services, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            orchestrated by AI.
          </span>
        </h1>
        <p className="text-lg text-slate-400 max-w-lg">
          Flat-rate pricing. Licensed pros. Building-approved. 
          We own the outcome, not just the introduction.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
          <button 
            onClick={() => setView('agent')}
            className="bg-white text-slate-900 px-8 py-3.5 rounded-lg font-bold hover:bg-slate-100 transition flex justify-center items-center shadow-lg shadow-white/10"
          >
            Start Booking
            <MessageSquare className="w-4 h-4 ml-2" />
          </button>
          <button 
            onClick={() => setView('services')}
            className="border border-slate-700 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-slate-800 transition"
          >
            View Services
          </button>
        </div>
        <div className="flex items-center space-x-4 pt-2 justify-center">
           <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-300">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                </div>
              ))}
           </div>
           <p className="text-xs text-slate-500">
             Trusted by 20+ Upper East Side buildings.
           </p>
        </div>
      </div>
    </div>
  </div>
);

// 3. SERVICE CARDS
const ServiceGrid = ({ setView }) => (
  <div className="py-20 bg-slate-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900">Phase I Services</h2>
        <p className="text-slate-600 mt-2">Flat rates. No hourly billing. No surprises.</p>
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
              <span className="text-slate-400 text-sm ml-1">/ unit</span>
            </div>
            <button 
              onClick={() => setView('agent')}
              className="w-full py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 4. AGENT CHAT INTERFACE (CORE FEATURE)
const AgentInterface = ({ setView }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'agent', text: "Hi, I'm the HomeReady Intake Agent. I can help you book licensed home services in Manhattan. What's your service address?" }
  ]);
  const [input, setInput] = useState('');
  const [state, setState] = useState('ADDRESS'); // ADDRESS, SERVICE, CONFIRM, PAYMENT, DONE
  const [bookingData, setBookingData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (text, type = 'agent') => {
    setMessages(prev => [...prev, { id: Date.now(), text, type }]);
  };

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    addMessage(userText, 'user');
    setInput('');

    // --- AGENT STATE MACHINE ---
    
    if (state === 'ADDRESS') {
      simulateTyping(() => {
        // Simple logic for demo: Check if address contains "80th" to simulate Beachhead
        const isBeachhead = userText.includes('80th') || userText.includes('345');
        const isManhattan = true; // Assume true for demo or check zip
        
        if (isManhattan) {
          setBookingData(prev => ({ ...prev, address: userText, isBeachhead }));
          
          if (isBeachhead) {
             addMessage("I recognize that building (345 E 80th St). Good news: We have 12 other units serviced there, so you qualify for the Building Volume Rate (-$30 to -$50 off).");
             setTimeout(() => addMessage("What service do you need today? (Dryer Vent, Thermostat, or Winterization)"), 800);
          } else {
             addMessage("Got it. We service that area. What service do you need today? (Dryer Vent, Thermostat, or Winterization)");
          }
          setState('SERVICE');
        } else {
          addMessage("I apologize, but we currently only operate in Manhattan (Phase I). We've added you to our expansion waitlist.");
        }
      });
    }

    else if (state === 'SERVICE') {
      simulateTyping(() => {
        const lowerInput = userText.toLowerCase();
        let service = null;

        // Triage Logic
        if (lowerInput.includes('leak') || lowerInput.includes('gas') || lowerInput.includes('smell')) {
           addMessage("⚠️ SAFETY ALERT: Based on your description, this sounds like an emergency leak or gas issue. HomeReady is for maintenance only. Please call 911 or your building super immediately.");
           return;
        }

        if (lowerInput.includes('dryer') || lowerInput.includes('vent')) service = SERVICE_CATALOG.DRYER_VENT;
        else if (lowerInput.includes('therm') || lowerInput.includes('nest')) service = SERVICE_CATALOG.THERMOSTAT;
        else if (lowerInput.includes('winter') || lowerInput.includes('cold')) service = SERVICE_CATALOG.WINTERIZE;

        if (service) {
          const finalPrice = bookingData.isBeachhead ? service.buildingPrice : service.price;
          setBookingData(prev => ({ ...prev, service, finalPrice }));
          
          addMessage(`Okay, ${service.name}.`);
          setTimeout(() => {
            addMessage(`Standard Scope: ${service.desc}`);
            addMessage(`Because you are in a ${bookingData.isBeachhead ? 'partner building' : 'Manhattan service area'}, your flat rate is $${finalPrice} (Licensed Pro included). No hourly fees.`);
            addMessage("Shall I proceed to secure payment and dispatch?");
            setState('CONFIRM');
          }, 600);
        } else {
          addMessage("I didn't quite catch that. We currently offer: Dryer Vent Cleaning, Smart Thermostat Install, and Winterization. Which one interests you?");
        }
      });
    }

    else if (state === 'CONFIRM') {
      simulateTyping(() => {
        if (userText.toLowerCase().includes('yes') || userText.toLowerCase().includes('ok')) {
           setState('PAYMENT');
           addMessage("Generating secure payment link...");
        } else {
           addMessage("No problem. What questions do you have about the scope?");
        }
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-4 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 h-[600px] flex flex-col">
          
          {/* Chat Header */}
          <div className="bg-slate-900 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">HomeReady Concierge</h3>
                <p className="text-slate-400 text-xs">AI-Orchestrated • Licensed Pros</p>
              </div>
            </div>
            <button onClick={() => setView('home')} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                   <div className="flex space-x-1">
                     <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                     <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                   </div>
                 </div>
              </div>
            )}
            
            {/* Payment Mockup */}
            {state === 'PAYMENT' && !isTyping && (
               <div className="mx-8 p-4 bg-white border border-blue-100 rounded-xl shadow-sm text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="text-slate-500 text-xs uppercase tracking-wide font-semibold">Ready for Dispatch</div>
                 <div className="text-2xl font-bold text-slate-900">${bookingData.finalPrice}.00</div>
                 <div className="text-sm text-slate-600">{bookingData.service?.name} @ {bookingData.address}</div>
                 <button 
                    onClick={() => {
                        setState('DONE');
                        addMessage("Payment received. Dispatch Agent has alerted our UES network. You will receive a text with your Pro's ETA shortly.", 'agent');
                    }}
                    className="w-full bg-slate-900 text-white py-2 rounded-lg font-semibold text-sm hover:bg-slate-800 flex items-center justify-center transition"
                 >
                   <CreditCard className="w-4 h-4 mr-2" />
                   Pay & Book Securely
                 </button>
                 <p className="text-[10px] text-slate-400">Funds held in escrow until completion.</p>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={state === 'PAYMENT' || state === 'DONE' ? "Chat closed." : "Type your address or request..."}
                disabled={state === 'PAYMENT' || state === 'DONE'}
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <button 
                onClick={handleSend}
                disabled={state === 'PAYMENT' || state === 'DONE'}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition shadow-lg shadow-blue-500/30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
        
        <div className="mt-6 text-center text-xs text-slate-400">
          <p>Powered by HomeReady Intake & Triage Agents.</p>
          <p>Emergency? Call 911. We do not handle active gas/water leaks.</p>
        </div>
      </div>
    </div>
  );
};

// 5. OPERATOR DASHBOARD (FLYWHEEL VISUALIZATION)
const OperatorDashboard = () => {
    return (
      <div className="bg-slate-50 min-h-screen pb-12">
        <div className="bg-slate-900 text-white pt-8 pb-16 px-4">
          <div className="max-w-6xl mx-auto flex justify-between items-end">
            <div>
                <h1 className="text-2xl font-bold mb-2">Operator Dashboard</h1>
                <p className="text-slate-400">UES Zone Status • 345 E 80th St Beachhead</p>
            </div>
            <div className="flex items-center space-x-2 text-emerald-400 text-sm font-mono border border-emerald-900 bg-emerald-900/20 px-3 py-1 rounded">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>SYSTEM LIVE</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-8 grid md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Active Jobs</div>
            <div className="text-3xl font-bold text-slate-900">14</div>
            <div className="text-xs text-emerald-500 font-medium flex items-center mt-1">
              <CheckCircle className="w-3 h-3 mr-1" /> 100% Licensed
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Avg Ticket</div>
            <div className="text-3xl font-bold text-slate-900">$215</div>
            <div className="text-xs text-blue-500 font-medium mt-1">Target: $200+</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Building Pen.</div>
            <div className="text-3xl font-bold text-slate-900">12%</div>
            <div className="text-xs text-slate-400 mt-1">Of anchor building</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Sub Satisfaction</div>
            <div className="text-3xl font-bold text-slate-900">4.9/5</div>
            <div className="text-xs text-slate-400 mt-1">Based on payouts</div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-8 grid md:grid-cols-2 gap-8">
          {/* Building List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-600" />
              Building Flywheel Status
            </h3>
            <div className="space-y-4">
              {[
                { addr: '345 E 80th St', units: 12, status: 'Anchor', color: 'text-emerald-600 bg-emerald-50' },
                { addr: '301 E 79th St', units: 4, status: 'Growing', color: 'text-blue-600 bg-blue-50' },
                { addr: '1594 2nd Ave', units: 1, status: 'Seeding', color: 'text-slate-600 bg-slate-100' },
              ].map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
                  <div>
                    <div className="font-semibold text-slate-800">{b.addr}</div>
                    <div className="text-xs text-slate-500">{b.units} Units Serviced</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${b.color}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Agent Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Agent Activity Log
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-3 text-sm">
                <div className="min-w-[60px] text-slate-400 text-xs pt-1">14:02</div>
                <div>
                  <span className="text-blue-600 font-semibold">Triage Agent</span>
                  <span className="text-slate-600"> rejected job ID #992 (Plumbing leak - Out of Scope).</span>
                </div>
              </div>
              <div className="flex space-x-3 text-sm">
                 <div className="min-w-[60px] text-slate-400 text-xs pt-1">13:45</div>
                <div>
                  <span className="text-emerald-600 font-semibold">Pricing Agent</span>
                  <span className="text-slate-600"> applied stack discount for Unit 4B @ 345 E 80th.</span>
                </div>
              </div>
              <div className="flex space-x-3 text-sm">
                 <div className="min-w-[60px] text-slate-400 text-xs pt-1">13:12</div>
                <div>
                  <span className="text-purple-600 font-semibold">Dispatch Agent</span>
                  <span className="text-slate-600"> assigned Pro #44 (Mike D.) to Job #881. ETA sent.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

// 6. SUBCONTRACTOR PORTAL (TASK A)
const SubcontractorPortal = () => {
  const proId = "PRO-44 (Mike D.)";
  const mockJobs = [
    {
      id: "J-1001",
      service: "Dryer Vent Cleaning",
      address: "345 E 80th St, Apt 7C",
      time: "Today, 10:00 AM",
      payout: SUBCONTRACTOR_PAYOUTS.DRYER_VENT,
      status: "Dispatched",
      isEmergency: false,
    },
    {
      id: "J-1002",
      service: "Smart Thermostat Install",
      address: "500 E 78th St, Apt 12A",
      time: "Today, 2:00 PM",
      payout: SUBCONTRACTOR_PAYOUTS.THERMOSTAT,
      status: "En Route",
      isEmergency: false,
    },
    {
      id: "J-1003",
      service: "Dryer Vent Cleaning (Emergency)",
      address: "1594 2nd Ave, Apt 2F",
      time: "Tomorrow, 8:00 AM",
      payout: SUBCONTRACTOR_PAYOUTS.DRYER_VENT + SUBCONTRACTOR_PAYOUTS.EMERGENCY_SURCHARGE,
      status: "Accepted",
      isEmergency: true,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center">
            <User className="w-7 h-7 mr-2 text-blue-600" /> Subcontractor Portal
        </h1>
        <p className="text-slate-600 mb-8">Welcome, {proId}. Jobs dispatched by HomeReady Dispatch Agent.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow border border-slate-200">
            <p className="text-xs uppercase text-slate-500 font-semibold">Weekly Payout (ACH)</p>
            <p className="text-2xl font-bold text-emerald-600">$1,845.00</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow border border-slate-200">
            <p className="text-xs uppercase text-slate-500 font-semibold">Active Jobs</p>
            <p className="text-2xl font-bold text-slate-900">{mockJobs.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow border border-slate-200">
            <p className="text-xs uppercase text-slate-500 font-semibold">Next Payout Amount</p>
            <p className="text-2xl font-bold text-blue-600 flex items-center">${mockJobs[0].payout}.00</p>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-blue-600" /> Dispatched Jobs (Flat-Rate Payouts)
        </h2>
        
        <div className="space-y-4">
          {mockJobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-xl shadow border border-slate-100 grid md:grid-cols-4 items-center gap-4">
              <div className="md:col-span-2">
                <div className="font-bold text-slate-900">{job.service}</div>
                <div className="text-sm text-slate-700">{job.address}</div>
                <div className="text-xs text-slate-500 mt-1">{job.time}</div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Pro Payout</p>
                <p className="text-xl font-bold text-emerald-600 flex justify-end items-center">
                    ${job.payout}
                    {job.isEmergency && <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700">EMERGENCY</span>}
                </p>
              </div>
              <div className="text-right">
                <button className={`w-full py-2 rounded-lg text-sm font-semibold transition ${
                  job.status === 'Dispatched' || job.status === 'Accepted'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}>
                  {job.status === 'Dispatched' ? 'Accept Job' : job.status === 'En Route' ? 'Start On Site' : 'View Details'}
                </button>
                {job.status === 'Accepted' && <p className="text-[10px] text-red-500 mt-1">Penalty for no-show.</p>}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-yellow-800">
            **CRITICAL RULE:** All payments are processed via HomeReady. Do not quote, upsell, or accept payment directly from the resident. Violations incur a $2,500 liquidated damages penalty.
        </div>

      </div>
    </div>
  );
};

// 7. FOOTER
const Footer = ({ setView }) => (
  <footer className="bg-slate-900 text-slate-500 py-12 border-t border-slate-800 text-sm">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
      <div>
        <div className="text-white font-bold text-lg mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" /> HomeReady
        </div>
        <p>NYC's first AI-native home services operator. Building reliable infrastructure for Manhattan living.</p>
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
          <li>About Us</li>
          <li>Building Partners</li>
          <li><button onClick={() => setView('subcontractor')} className="hover:text-white transition">Subcontractor Login</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Contact</h4>
        <ul className="space-y-2">
          <li>support@homereadys.com</li>
          <li>(212) 555-0199</li>
          <li>345 E 80th St, New York, NY</li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-slate-800 text-xs text-slate-600 text-center">
      <p className="mb-2">
        DISCLAIMER: HomeReady coordinates services through licensed, independent professionals and does not perform trade work directly. 
        Payment is for coordination and fixed-rate service delivery managed by our platform.
      </p>
      <p>&copy; 2025 HomeReady Technologies Inc. All rights reserved.</p>
    </div>
  </footer>
);

// --- MAIN APP ---

const App = () => {
  const [view, setView] = useState('home'); // home, agent, dashboard, subcontractor

  // Helper function for the Footer view changes
  const setViewFromApp = (newView) => setView(newView);

  return (
    <div className="font-sans text-slate-900 bg-white">
      <Header setView={setView} view={view} />
      
      {view === 'home' && (
        <>
          <Hero setView={setView} />
          <ServiceGrid setView={setView} />
        </>
      )}

      {view === 'services' && (
        <ServiceGrid setView={setView} />
      )}

      {view === 'agent' && (
        <AgentInterface setView={setView} />
      )}

      {view === 'dashboard' && (
        <OperatorDashboard />
      )}
      
      {view === 'subcontractor' && (
        <SubcontractorPortal />
      )}

      <Footer setView={setViewFromApp} />
    </div>
  );
};

export default App;