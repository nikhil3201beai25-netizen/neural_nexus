import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Lock, 
  User, 
  MapPin, 
  Sprout, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  RefreshCw,
  KeyRound,
  FileCheck2,
  Store,
  Briefcase
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  initialMode = 'login',
  lang 
}) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' or 'password'
  const [userRole, setUserRole] = useState('farmer'); // 'farmer', 'dealer', 'agronomist'

  // OTP flow states
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);

  // Form Fields
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('Punjab');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [landHolding, setLandHolding] = useState('2-5 Acres');
  const [selectedCrops, setSelectedCrops] = useState(['Wheat', 'Mustard']);
  const [hasKcc, setHasKcc] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const cropOptions = [
    'Wheat', 'Paddy / Basmati', 'Mustard', 'Cotton', 'Soybean', 
    'Onion', 'Maize', 'Groundnut', 'Potato', 'Sugarcane', 'Moong'
  ];

  const handleToggleCrop = (crop) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter(c => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    // Generate random 4 digit code for simulation
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    setOtpSent(true);
    setOtpTimer(30);
  };

  const handleOtpChange = (index, val) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...enteredOtp];
    newOtp[index] = val;
    setEnteredOtp(newOtp);

    // Auto focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const code = enteredOtp.join('');
    if (code !== generatedOtp && code !== '1234') {
      setErrorMsg(`Invalid OTP! Please enter the code: ${generatedOtp} (or 1234)`);
      return;
    }

    const userData = {
      name: name || 'Kisan Bandhu',
      phone: phone,
      role: userRole,
      state: state,
      district: district || 'Ludhiana',
      village: village || 'Rampur',
      landHolding: landHolding,
      primaryCrops: selectedCrops,
      hasKcc: hasKcc,
      isVerified: true,
      loginTimestamp: new Date().toISOString()
    };

    onLoginSuccess(userData);
    onClose();
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!phone || !password) {
      setErrorMsg('Please enter both mobile/email and password');
      return;
    }

    const userData = {
      name: name || (phone.includes('98') ? 'Ramesh Kumar Patel' : 'Kisan Member'),
      phone: phone,
      role: userRole,
      state: 'Punjab',
      district: 'Ludhiana',
      village: 'Samrala',
      landHolding: '3.5 Acres',
      primaryCrops: ['Wheat', 'Basmati Paddy'],
      hasKcc: true,
      isVerified: true
    };

    onLoginSuccess(userData);
    onClose();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name || !phone || !password) {
      setErrorMsg('Please fill in Name, Mobile number, and Password');
      return;
    }

    const newUser = {
      name: name,
      phone: phone,
      role: userRole,
      state: state,
      district: district || 'Central District',
      village: village || 'Gram Panchayat',
      landHolding: landHolding,
      primaryCrops: selectedCrops,
      hasKcc: hasKcc,
      isVerified: true
    };

    onLoginSuccess(newUser);
    onClose();
  };

  // Demo 1-Click Fill
  const handleQuickDemoLogin = (farmerType) => {
    let demo;
    if (farmerType === 'punjab') {
      demo = {
        name: 'Sardar Gurpreet Singh',
        phone: '98765 43210',
        role: 'farmer',
        state: 'Punjab',
        district: 'Ludhiana',
        village: 'Khanna',
        landHolding: '4 Acres',
        primaryCrops: ['Wheat', 'Basmati Paddy', 'Mustard'],
        hasKcc: true,
        isVerified: true
      };
    } else if (farmerType === 'maharashtra') {
      demo = {
        name: 'Tukaram Dnyaneshwar Patil',
        phone: '98220 12345',
        role: 'farmer',
        state: 'Maharashtra',
        district: 'Nashik',
        village: 'Niphad',
        landHolding: '3 Acres',
        primaryCrops: ['Nashik Onion', 'Soybean', 'Pomegranate'],
        hasKcc: true,
        isVerified: true
      };
    } else {
      demo = {
        name: 'Kisan Seva Kendra FPO',
        phone: '98111 22233',
        role: 'dealer',
        state: 'Uttar Pradesh',
        district: 'Varanasi',
        village: 'Rohaniya',
        landHolding: 'FPO / 200+ Farmers',
        primaryCrops: ['Seeds Distribution', 'Equipment Rental'],
        hasKcc: false,
        isVerified: true
      };
    }

    onLoginSuccess(demo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-fadeIn my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header Banner */}
        <div className="bg-gradient-to-r from-agri-950 via-agri-900 to-emerald-900 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-agri-600 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight">
                Agri<span className="text-agri-400">Connect</span>
              </span>
              <span className="text-[10px] ml-2 uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                Kisan Portal
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
            {mode === 'login' 
              ? (lang === 'hi' ? 'किसान लॉगिन / प्रवेश करें' : 'Farmer Login to AgriConnect')
              : (lang === 'hi' ? 'नया किसान खाता पंजीकरण' : 'Create Your Farmer Account')}
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1">
            {lang === 'hi' 
              ? 'मौसम अनुकूल फसल सलाह, बीज व उपकरण सब्सिडी और आसान डिलीवरी का लाभ उठाएं।'
              : 'Unlock personalized crop climate advisories, subsidized farm tools & village delivery.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-black/30 p-1 rounded-xl mt-4 border border-white/10 text-xs font-bold">
            <button
              onClick={() => { setMode('login'); setOtpSent(false); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-lg transition-all ${mode === 'login' ? 'bg-agri-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              {lang === 'hi' ? 'लॉगिन करें (Sign In)' : 'Sign In'}
            </button>
            <button
              onClick={() => { setMode('signup'); setOtpSent(false); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-lg transition-all ${mode === 'signup' ? 'bg-agri-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              {lang === 'hi' ? 'नया खाता बनाएं (Register)' : 'New Farmer Register'}
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto space-y-5">
          
          {/* Role Picker Pills */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
              Select Your Role (आपकी भूमिका):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'farmer', label: 'Farmer (किसान)', icon: Sprout },
                { id: 'dealer', label: 'Agri Dealer / FPO', icon: Store },
                { id: 'agronomist', label: 'Agronomist', icon: Briefcase },
              ].map((role) => {
                const Icon = role.icon;
                const isSelected = userRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setUserRole(role.id)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col items-center justify-center text-center ${
                      isSelected
                        ? 'border-agri-600 bg-agri-50 text-agri-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-agri-600' : 'text-slate-400'}`} />
                    <span className="text-xs leading-tight">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <span className="font-bold">Notice:</span> {errorMsg}
            </div>
          )}

          {/* ---------------- LOGIN MODE ---------------- */}
          {mode === 'login' && (
            <div className="space-y-4">
              
              {/* Login Method Toggle */}
              <div className="flex border-b border-slate-200 pb-2 text-xs font-bold gap-4">
                <button
                  type="button"
                  onClick={() => { setLoginMethod('otp'); setOtpSent(false); }}
                  className={`pb-1 transition ${loginMethod === 'otp' ? 'text-agri-700 border-b-2 border-agri-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Mobile OTP Login (ओटीपी द्वारा)
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('password')}
                  className={`pb-1 transition ${loginMethod === 'password' ? 'text-agri-700 border-b-2 border-agri-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Password Login (पासवर्ड द्वारा)
                </button>
              </div>

              {loginMethod === 'otp' ? (
                /* OTP FLOW */
                <div>
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Mobile Number (10-अंकों का मोबाइल नंबर)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3 text-slate-400 text-xs font-bold">+91</span>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            placeholder="Enter 10-digit mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            className="w-full pl-12 pr-4 py-2.5 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50 focus:bg-white"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-agri-600 hover:bg-agri-700 text-white font-black text-xs rounded-xl shadow-md shadow-agri-600/20 flex items-center justify-center gap-2 transition"
                      >
                        <span>Send Verification OTP (ओटीपी भेजें)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
                      
                      {/* Simulated SMS Alert Banner */}
                      <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-bold">SMS Dispatched to +91 {phone}:</p>
                          <p className="text-[11px] text-emerald-700">Your AgriConnect verification OTP is: <strong className="text-sm font-black text-emerald-950 tracking-widest">{generatedOtp}</strong></p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEnteredOtp(generatedOtp.split(''))}
                          className="px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg shadow-xs hover:bg-emerald-700"
                        >
                          Auto Fill
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 text-center">
                          Enter 4-Digit OTP Code
                        </label>
                        <div className="flex justify-center gap-3">
                          {enteredOtp.map((digit, idx) => (
                            <input
                              key={idx}
                              id={`otp-input-${idx}`}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(idx, e.target.value)}
                              className="w-12 h-12 text-center text-lg font-black rounded-xl border border-slate-300 focus:border-agri-600 focus:ring-2 focus:ring-agri-500/20 bg-slate-50 focus:bg-white focus:outline-none"
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-agri-600 hover:bg-agri-700 text-white font-black text-xs rounded-xl shadow-md shadow-agri-600/20 flex items-center justify-center gap-2 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify & Enter AgriConnect</span>
                      </button>

                      <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="hover:text-agri-700 font-semibold"
                        >
                          Change Number
                        </button>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="hover:text-agri-700 font-semibold flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Resend OTP
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                /* PASSWORD LOGIN */
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Registered Mobile Number or Email
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. 9876543210 or kisan@gmail.com"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50 focus:bg-white"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Password (पासवर्ड)
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50 focus:bg-white"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-agri-600 hover:bg-agri-700 text-white font-black text-xs rounded-xl shadow-md shadow-agri-600/20 flex items-center justify-center gap-2 transition"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Secure Sign In</span>
                  </button>
                </form>
              )}

              {/* Quick Demo Login shortcuts */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  1-Click Instant Demo Login:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('punjab')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold text-left border border-slate-200 transition"
                  >
                    🌾 Gurpreet Singh
                    <span className="block text-[10px] font-normal text-slate-500">Punjab • 4 Acres</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('maharashtra')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold text-left border border-slate-200 transition"
                  >
                    🧅 Tukaram Patil
                    <span className="block text-[10px] font-normal text-slate-500">Maharashtra • 3 Acres</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ---------------- SIGNUP / REGISTRATION MODE ---------------- */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4 animate-fadeIn">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Farmer Full Name (किसान का पूरा नाम) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50 focus:bg-white"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-3.5 pr-10 py-2.5 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50 focus:bg-white"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Create Password *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50 focus:bg-white"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>
              </div>

              {/* Location: State, District, Village */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State (राज्य) *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2.5 text-xs font-bold rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Punjab">Punjab (North)</option>
                    <option value="Haryana">Haryana (North)</option>
                    <option value="Uttar Pradesh">Uttar Pradesh (North)</option>
                    <option value="Rajasthan">Rajasthan (North)</option>
                    <option value="Maharashtra">Maharashtra (West)</option>
                    <option value="Gujarat">Gujarat (West)</option>
                    <option value="Tamil Nadu">Tamil Nadu (South)</option>
                    <option value="Karnataka">Karnataka (South)</option>
                    <option value="Andhra Pradesh">Andhra Pradesh (South)</option>
                    <option value="West Bengal">West Bengal (East)</option>
                    <option value="Bihar">Bihar (East)</option>
                    <option value="Odisha">Odisha (East)</option>
                    <option value="Assam">Assam (East)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    District (ज़िला)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ludhiana / Nashik"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 text-xs font-bold rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Village / Block
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rampur"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full p-2.5 text-xs font-bold rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              {/* Land Holding */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Agricultural Land Holding (खेत का रकबा):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['< 1 Acre', '1-2 Acres', '2-5 Acres', '5+ Acres'].map((land) => (
                    <button
                      key={land}
                      type="button"
                      onClick={() => setLandHolding(land)}
                      className={`p-2 rounded-xl text-xs font-bold border transition ${
                        landHolding === land 
                          ? 'border-agri-600 bg-agri-600 text-white' 
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      {land}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Crops Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Major Crops Grown (मुख्य फसलें चुनें):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {cropOptions.map((crop) => {
                    const isSelected = selectedCrops.includes(crop);
                    return (
                      <button
                        key={crop}
                        type="button"
                        onClick={() => handleToggleCrop(crop)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-bold transition ${
                          isSelected
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{crop}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* KCC & Government Scheme Opt-In */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasKcc}
                  onChange={(e) => setHasKcc(e.target.checked)}
                  className="w-4 h-4 text-agri-600 rounded focus:ring-agri-500"
                />
                <div className="text-xs">
                  <p className="font-extrabold text-amber-950">I hold a Kisan Credit Card (KCC) / PM-Kisan Account</p>
                  <p className="text-[11px] text-amber-800">Enables concessional 7% farm credit and direct SMAM subsidy invoice generation.</p>
                </div>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 bg-agri-600 hover:bg-agri-700 text-white font-black text-xs rounded-xl shadow-lg shadow-agri-600/25 flex items-center justify-center gap-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Farmer Registration & Get Climate Advisory</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
