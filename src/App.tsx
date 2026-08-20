/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  FileText,
  Upload,
  HelpCircle,
  Info,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Lock,
  ShieldAlert,
  Eye,
  Trash2,
  UserCheck
} from 'lucide-react';

interface ApplicantDoc {
  id: string;
  name: string;
  middleName?: string;
  surname: string;
  jobType: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  profilePicUrl?: string;
  fileUrl?: string;
}

function GoToGuysLogo({ className = "w-14 h-14", idPrefix = "main" }: { className?: string; idPrefix?: string }) {
  const topCurveId = `topCurve-${idPrefix}`;
  const bottomBannerCurveId = `bottomBannerCurve-${idPrefix}`;

  return (
    <svg className={`${className} flex-shrink-0`} viewBox="0 0 200 200">
      {/* Outer concentric navy rings */}
      <circle cx="100" cy="100" r="95" fill="#ffffff" stroke="#152d43" strokeWidth="8" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="#152d43" strokeWidth="2.5" />
      
      {/* Top Arc Text: LUS VIR WERK */}
      <path id={topCurveId} d="M 28 100 A 72 72 0 0 1 172 100" fill="none" />
      <text className="text-[13px] font-black uppercase tracking-[0.25em]" fill="#152d43" fontFamily="system-ui, -apple-system, sans-serif">
        <textPath href={`#${topCurveId}`} startOffset="50%" textAnchor="middle">LUS VIR WERK</textPath>
      </text>

      {/* Center Icon: Pickaxe + Gear Cog */}
      <g transform="translate(100, 84)">
        {/* Gear (Cog) on the right */}
        <g transform="translate(14, 0)">
          <path
            d="M -22 -6 L -16 -6 L -14 -12 L -20 -15 L -16 -21 L -10 -18 L -6 -23 L -8 -29 L 0 -30 L 2 -24 L 8 -24 L 10 -30 L 18 -29 L 16 -23 L 20 -18 L 26 -21 L 30 -15 L 24 -12 L 26 -6 L 32 -6 L 32 4 L 26 4 L 24 10 L 30 13 L 26 19 L 20 16 L 16 21 L 18 27 L 10 28 L 8 22 L 2 22 L 0 28 L -8 27 L -6 21 L -10 16 L -16 19 L -20 13 L -14 10 L -16 4 L -22 4 Z"
            fill="#152d43"
          />
          {/* Inner cutout hole of the gear */}
          <circle cx="5" cy="0" r="14" fill="#ffffff" />
        </g>

        {/* Diagonal Pickaxe crossing through gear */}
        <g transform="rotate(-38)">
          {/* Handle */}
          <rect x="-3.5" y="-36" width="7" height="68" rx="2" fill="#152d43" />
          {/* Pickaxe Head */}
          <path
            d="M -30 -36 C -15 -42 0 -41 0 -41 C 0 -41 15 -42 30 -36 C 24 -32 16 -32 0 -34 C -16 -32 -24 -32 -30 -36 Z"
            fill="#152d43"
          />
          {/* Hammer edge / back bracket */}
          <rect x="-6" y="-43" width="12" height="6" rx="1" fill="#152d43" />
        </g>
      </g>

      {/* Divider line under graphic */}
      <line x1="32" y1="102" x2="168" y2="102" stroke="#152d43" strokeWidth="2.5" />

      {/* Main Bold Text: GO TO GUYS */}
      <text
        x="100"
        y="126"
        textAnchor="middle"
        className="text-[23px] font-black tracking-tight"
        fill="#152d43"
        fontFamily="Impact, 'Arial Black', -apple-system, sans-serif"
        style={{ letterSpacing: '0.04em' }}
      >
        GO TO GUYS
      </text>

      {/* Bottom Filled Navy Banner */}
      <path
        d="M 23 128 A 84 84 0 0 0 177 128 C 150 144 118 148 100 148 C 82 148 50 144 23 128 Z"
        fill="#152d43"
      />

      {/* Text inside bottom navy banner: THE CO TO GUYS FOR EVERY JOB */}
      <path id={bottomBannerCurveId} d="M 32 133 Q 100 152 168 133" fill="none" />
      <text
        className="text-[7.2px] font-bold uppercase tracking-[0.14em]"
        fill="#ffffff"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        <textPath href={`#${bottomBannerCurveId}`} startOffset="50%" textAnchor="middle">
          THE CO TO GUYS FOR EVERY JOB
        </textPath>
      </text>
    </svg>
  );
}

const JOB_TYPES = [
  'Construction & Trades',
  'Administrative & Office Support',
  'Hospitality, Catering & Tourism',
  'Retail, Sales & Customer Service',
  'Transport, Logistics & Driving',
  'Security & Guarding Services',
  'Cleaning, Domestic & Maintenance',
  'IT & Technical Support',
  'Healthcare & Caregiving',
  'Agriculture & Farming'
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload-vault' | 'about' | 'help' | 'chat'>('dashboard');
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [splashCountdown, setSplashCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSplashCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowSplashScreen(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [selectedJobType, setSelectedJobType] = useState(JOB_TYPES[0]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [congratulationsMsg, setCongratulationsMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; text: string }>>([
    { role: 'model', text: 'Hello! I am your live AI recruitment assistant for Lus vir werk Go2Guys. How can I help you with your CV, job application, or career opportunities today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Job Box / Applicants State (Persisted in localStorage for real user uploads)
  const [applicants, setApplicants] = useState<ApplicantDoc[]>(() => {
    const saved = localStorage.getItem('go2guys_applicants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: '1',
        name: 'Pieter',
        middleName: 'Jan',
        surname: 'Van Der Merwe',
        jobType: 'Construction & Trades',
        fileName: 'Pieter_CV_2026.pdf',
        fileSize: '1.8 MB',
        uploadedAt: 'Today, 19:15'
      }
    ];
  });

  // Admin Wallpaper & Blur State
  const [wallpaperUrl, setWallpaperUrl] = useState<string | null>(() => localStorage.getItem('go2guys_wallpaper') || null);
  const [wallpaperBlur, setWallpaperBlur] = useState<number>(() => {
    const saved = localStorage.getItem('go2guys_blur');
    return saved ? Number(saved) : 4;
  });

  useEffect(() => {
    localStorage.setItem('go2guys_applicants', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    if (wallpaperUrl) {
      localStorage.setItem('go2guys_wallpaper', wallpaperUrl);
    } else {
      localStorage.removeItem('go2guys_wallpaper');
    }
  }, [wallpaperUrl]);

  useEffect(() => {
    localStorage.setItem('go2guys_blur', String(wallpaperBlur));
  }, [wallpaperBlur]);

  // Admin View State (Only admin can view documents in full screen)
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPinModal, setAdminPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [adminFullScreenDoc, setAdminFullScreenDoc] = useState<ApplicantDoc | null>(null);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !surname.trim() || !uploadedFile) {
      alert('Please fill in your Name, Surname, and attach your CV document.');
      return;
    }

    const fileUrl = URL.createObjectURL(uploadedFile);
    const profilePicUrl = profilePicFile ? URL.createObjectURL(profilePicFile) : undefined;

    const newApplicant: ApplicantDoc = {
      id: Date.now().toString(),
      name: firstName.trim(),
      middleName: middleName.trim() || undefined,
      surname: surname.trim(),
      jobType: selectedJobType,
      fileName: uploadedFile.name,
      fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: 'Just now',
      profilePicUrl,
      fileUrl
    };

    setApplicants([newApplicant, ...applicants]);
    setShowUploadModal(false);
    setFirstName('');
    setMiddleName('');
    setSurname('');
    setUploadedFile(null);
    setProfilePicFile(null);
    setProfilePicPreview(null);

    // Show congratulations banner and celebratory modal
    setCongratulationsMsg('Congratulations! Your CV and application have been successfully uploaded to the job box.');
    setShowSuccessModal(true);
    setTimeout(() => {
      setCongratulationsMsg('');
    }, 6000);
  };

  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    const updatedMessages = [...chatMessages, { role: 'user' as const, text: userMsg }];
    setChatMessages(updatedMessages);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      if (res.ok && data.text) {
        setChatMessages([...updatedMessages, { role: 'model', text: data.text }]);
      } else {
        setChatMessages([...updatedMessages, { role: 'model', text: data.error || 'Sorry, I encountered an issue connecting to the live assistant.' }]);
      }
    } catch (err) {
      setChatMessages([...updatedMessages, { role: 'model', text: 'Network error. Please check your connection and try again.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleAdminAccess = () => {
    setPinInput('');
    setPinError(false);
    if (isAdminMode) {
      setIsAdminMode(false);
      setAdminFullScreenDoc(null);
    } else {
      setAdminPinModal(true);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1019') {
      setIsAdminMode(true);
      setAdminPinModal(false);
      setPinInput('');
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* 5-Second Splash Screen */}
      {showSplashScreen && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-lg w-full animate-in zoom-in-95 duration-500">
            {/* Centered Large Official Logo */}
            <div className="w-56 h-56 sm:w-64 sm:h-64 mb-6 filter drop-shadow-md transition-transform hover:scale-105">
              <GoToGuysLogo className="w-full h-full" idPrefix="splash" />
            </div>

            {/* Typography Slogans */}
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-[#102a43] uppercase mb-1">
              Lus Vir Werk • Go To Guys
            </h1>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-500">
              Real People. Real Professionalism. Every Job.
            </p>

            {/* Countdown Badge & Skip */}
            <div className="mt-8 flex items-center gap-3 bg-slate-100/90 border border-slate-200 px-5 py-2.5 rounded-full text-slate-700 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider">
                Loading in {splashCountdown}s
              </span>
              <button
                onClick={() => setShowSplashScreen(false)}
                className="ml-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {wallpaperUrl && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center transition-all duration-300"
          style={{ 
            backgroundImage: `url(${wallpaperUrl})`,
            filter: `blur(${wallpaperBlur}px)`,
            transform: 'scale(1.08)'
          }}
        />
      )}
      <div className="relative z-10 flex flex-col flex-grow">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex items-center justify-between px-6 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        {/* Left Official Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')} title="Go2Guys Home">
          <GoToGuysLogo className="w-14 h-14 drop-shadow-sm group-hover:scale-105 transition-transform" idPrefix="header" />
        </div>

        {/* Top Burger Menu Bar */}
        <div className="flex items-center">
          <button
            onClick={() => setBurgerOpen(!burgerOpen)}
            className="group flex flex-col items-center justify-center w-10 h-10 bg-slate-900 rounded-lg hover:bg-indigo-600 transition-colors shadow-md cursor-pointer focus:outline-none"
            title="Toggle Menu Hub"
          >
            {burgerOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <>
                <span className="w-5 h-0.5 bg-white mb-1 transition-all"></span>
                <span className="w-5 h-0.5 bg-white mb-1 transition-all"></span>
                <span className="w-5 h-0.5 bg-white transition-all"></span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Burger Menu Overlay Dropdown */}
      {burgerOpen && (
        <div className="fixed top-20 right-4 w-48 bg-slate-900 text-white z-50 shadow-2xl rounded-2xl border border-slate-800 p-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setActiveTab('about'); setBurgerOpen(false); }}
              className={`p-2 rounded-xl flex items-center gap-2.5 transition-all text-left ${activeTab === 'about' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'}`}
            >
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold tracking-wide">About App</span>
            </button>
            <button
              onClick={() => { setActiveTab('help'); setBurgerOpen(false); }}
              className={`p-2 rounded-xl flex items-center gap-2.5 transition-all text-left ${activeTab === 'help' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'}`}
            >
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-bold tracking-wide">Help & Guide</span>
            </button>
          </div>
          {/* Discrete small icon for Admin */}
          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Go2Guys</span>
            <button
              onClick={() => { handleAdminAccess(); setBurgerOpen(false); }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${isAdminMode ? 'text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/80' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
              title={isAdminMode ? "Admin Mode Active (Tap to Exit)" : "Security"}
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-grow w-full max-w-4xl mx-auto p-6 md:p-8 pt-28 flex flex-col">
        {activeTab === 'dashboard' ? (
          <div className="space-y-6 w-full">
            {/* Small upload feature right under the top bar (hidden for Admin) */}
            {!isAdminMode && (
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">Looking for work? Upload your CV</h2>
                  <p className="text-xs text-indigo-200 mt-1">Submit your details and CV instantly to our job box categories.</p>
                </div>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" /> Upload CV & Apply
                </button>
              </div>
            )}

            {congratulationsMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-3 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{congratulationsMsg}</span>
              </div>
            )}

            {/* Admin Wallpaper & Blur Settings Panel */}
            {isAdminMode && (
              <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Admin Wallpaper & Blur Settings</h4>
                  {wallpaperUrl && (
                    <button
                      onClick={() => setWallpaperUrl(null)}
                      className="text-[10px] text-red-400 hover:text-red-300 font-bold underline"
                    >
                      Remove Wallpaper
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Upload Background Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            setWallpaperUrl(ev.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] font-bold text-slate-300">Blur Effect ({wallpaperBlur}px)</label>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={wallpaperBlur}
                      onChange={e => setWallpaperBlur(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Job Types Categories & Job Boxes */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                Job Type Categories & Job Boxes
              </h3>
              <div className="flex flex-col space-y-4">
                {JOB_TYPES.map((jobType, idx) => {
                  const jobApplicants = applicants.filter(a => a.jobType === jobType);
                  return (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900">{jobType}</h4>
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                          {jobApplicants.length} {jobApplicants.length === 1 ? 'Applicant' : 'Applicants'}
                        </span>
                      </div>

                      {jobApplicants.length === 0 ? (
                        <p className="text-xs text-slate-400 italic py-2">No documents uploaded in this job box yet.</p>
                      ) : (
                        <div className="space-y-3 mt-3">
                          {jobApplicants.map(app => (
                            <div key={app.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                {app.profilePicUrl ? (
                                  <img src={app.profilePicUrl} alt={app.name} className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500 shadow-sm shrink-0" />
                                ) : (
                                  <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0 border border-slate-300">
                                    {app.name[0]}{app.surname[0]}
                                  </div>
                                )}
                                <div>
                                  <p className="text-xs font-bold text-slate-900">
                                    {app.surname}, {app.name} {app.middleName || ''}
                                  </p>
                                  <p className="text-[10px] text-slate-500 mt-0.5">File: {app.fileName} ({app.fileSize}) • {app.uploadedAt}</p>
                                </div>
                              </div>
                              {isAdminMode ? (
                                <button
                                  onClick={() => setAdminFullScreenDoc(app)}
                                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
                                >
                                  <Eye className="w-3.5 h-3.5" /> View Full Screen
                                </button>
                              ) : (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                                  Uploaded in Box
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* Upload Modal / Form */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Upload CV & Apply</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Middle Name <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  placeholder="e.g. David"
                  value={middleName}
                  onChange={e => setMiddleName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Surname <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smith"
                  value={surname}
                  onChange={e => setSurname(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Choose Job Type <span className="text-red-500">*</span></label>
                <select
                  value={selectedJobType}
                  onChange={e => setSelectedJobType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {JOB_TYPES.map((jt, i) => (
                    <option key={i} value={jt}>{jt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Upload Profile Picture <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setProfilePicFile(file);
                      setProfilePicPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {profilePicPreview && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={profilePicPreview} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-slate-300 shadow-sm" />
                    <span className="text-[10px] text-slate-500">Profile picture selected</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Upload Full CV Document <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFile(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {uploadedFile && (
                  <p className="mt-1.5 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    ✓ Selected CV: {uploadedFile.name}
                  </p>
                )}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  Submit & Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin PIN Login Modal */}
      {adminPinModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Security Authentication</h3>
            <p className="text-[11px] text-slate-500 mb-4">Enter security access code to proceed</p>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                required
                maxLength={8}
                placeholder="••••"
                value={pinInput}
                autoFocus
                onChange={e => { setPinInput(e.target.value); setPinError(false); }}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-center text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {pinError && <p className="text-[10px] text-red-600 font-bold">Invalid security code. Please try again.</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setAdminPinModal(false); setPinInput(''); setPinError(false); }}
                  className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  Authorize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Full Screen Document Viewer Modal / Overlay */}
      {adminFullScreenDoc && (
        <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col text-white animate-in fade-in duration-200">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Admin Full Screen Document Viewer</h2>
              <p className="text-xs text-slate-300 mt-0.5">Applicant: <strong className="text-white">{adminFullScreenDoc.surname}, {adminFullScreenDoc.name} {adminFullScreenDoc.middleName || ''}</strong> — {adminFullScreenDoc.jobType}</p>
            </div>
            <button
              onClick={() => setAdminFullScreenDoc(null)}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4" /> Close Full Screen
            </button>
          </div>
          <div className="flex-grow p-4 sm:p-8 overflow-y-auto flex flex-col items-center bg-slate-900/50">
            <div className="bg-white text-slate-950 rounded-2xl p-6 sm:p-12 max-w-3xl w-full shadow-2xl min-h-[500px] my-8 flex flex-col justify-between border border-slate-200">
              <div>
                <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    {adminFullScreenDoc.profilePicUrl ? (
                      <img src={adminFullScreenDoc.profilePicUrl} alt={adminFullScreenDoc.name} className="w-16 h-16 rounded-full object-cover border-4 border-indigo-100 shadow-md shrink-0" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-lg shrink-0 border border-slate-300">
                        {adminFullScreenDoc.name[0]}{adminFullScreenDoc.surname[0]}
                      </div>
                    )}
                    <div>
                      <h1 className="text-2xl font-black text-slate-900">{adminFullScreenDoc.name} {adminFullScreenDoc.middleName || ''} {adminFullScreenDoc.surname}</h1>
                      <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mt-1">Target Position: {adminFullScreenDoc.jobType}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">Verified Submission</span>
                </div>
                <div className="space-y-4 text-xs text-slate-700">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Attached Document:</p>
                      <p className="font-mono text-indigo-600">{adminFullScreenDoc.fileName} ({adminFullScreenDoc.fileSize})</p>
                      <p className="text-[10px] text-slate-400 mt-1">Uploaded at: {adminFullScreenDoc.uploadedAt}</p>
                    </div>
                    {adminFullScreenDoc.fileUrl && (
                      <a
                        href={adminFullScreenDoc.fileUrl}
                        download={adminFullScreenDoc.fileName}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 no-underline"
                      >
                        Download Document
                      </a>
                    )}
                  </div>
                  <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-center text-slate-600">
                    {adminFullScreenDoc.fileUrl ? (
                      adminFullScreenDoc.fileName.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                        <div className="flex flex-col items-center">
                          <p className="text-[11px] font-bold text-slate-700 mb-2">Live Document Preview (Image):</p>
                          <img src={adminFullScreenDoc.fileUrl} alt="Document Preview" className="max-h-64 rounded-lg border border-slate-300 shadow-sm object-contain" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <p className="text-[11px] font-bold text-slate-700 mb-2">Live Document Preview (PDF / File):</p>
                          <iframe src={adminFullScreenDoc.fileUrl} title="Document Preview" className="w-full h-64 rounded-lg border border-slate-300 bg-white"></iframe>
                        </div>
                      )
                    ) : (
                      <span className="italic">[ No live file preview available ]</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest">
                <span>Lus vir werk Go2Guys Secure Vault</span>
                {adminFullScreenDoc.fileUrl ? (
                  <a
                    href={adminFullScreenDoc.fileUrl}
                    download={adminFullScreenDoc.fileName}
                    className="text-indigo-600 font-bold hover:underline no-underline"
                  >
                    Download to Device
                  </a>
                ) : (
                  <span className="text-slate-400">No file</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Congratulations Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Congratulations!</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Your CV, profile picture, and application documents have been successfully submitted and uploaded to the job box!
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              View Job Box
            </button>
          </div>
        </div>
      )}

      {/* Full Screen Blank Feature Overlay with Back Arrow */}
      {activeTab !== 'dashboard' && (
        <div className="absolute inset-x-0 bottom-0 top-20 bg-slate-50 z-50 flex flex-col animate-in fade-in duration-150 overflow-y-auto">
          <div className="p-4 border-b border-slate-200 flex items-center bg-white shadow-sm sticky top-0 z-10">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-2 text-xs font-bold"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-slate-900" />
              <span>Back to Dashboard</span>
            </button>
            <span className="ml-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
              {activeTab === 'about' ? 'About Lus Vir Werk Go2Guys' : activeTab === 'help' ? 'Help & User Guide' : 'Upload Vault'}
            </span>
          </div>

          <div className="flex-grow p-6 sm:p-10 max-w-3xl mx-auto w-full">
            {activeTab === 'about' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Info className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">About Lus Vir Werk Go2Guys</h2>
                    <p className="text-xs text-slate-500">The Co To Guys for Every Job</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                  <p className="font-medium text-sm text-slate-800">
                    <strong>Lus Vir Werk Go2Guys</strong> is your trusted recruitment and employment platform designed to bridge the gap between skilled tradespeople, job seekers, and top employers.
                  </p>
                  <p>
                    Whether you are looking for construction work, technical maintenance, specialized trade projects, or general employment, our platform provides a secure and efficient digital space to submit your credentials, manage your CV, and connect directly with hiring managers.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-1">Secure CV & ID Vault</h4>
                      <p className="text-[11px] text-slate-500">Store and submit your professional CV and identity documents safely for instant review.</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-1">Instant Job Boxes</h4>
                      <p className="text-[11px] text-slate-500">Organize and categorize job applications by trade, skill level, and availability.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Help & User Guide</h2>
                    <p className="text-xs text-slate-500">How to use the Go2Guys platform</p>
                  </div>
                </div>

                <div className="space-y-5 text-xs text-slate-700 leading-relaxed">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 text-xs">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5">Uploading Your CV & Profile</h4>
                      <p className="text-slate-500">From the main dashboard, tap the <strong>"Looking for work? Upload your CV"</strong> banner. Fill in your full name, target position, upload your profile picture, and attach your CV document (PDF, DOCX, or Image). Hit Submit to send it to the live job box.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 text-xs">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5">Browsing & Managing Submissions</h4>
                      <p className="text-slate-500">Applicants and recruiters can view active submissions on the dashboard, filter by job category, or use authorized administrator mode to view full-screen candidate details and download attached documents.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 text-xs">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5">Live AI Agent Chat</h4>
                      <p className="text-slate-500">Need assistance or career guidance? Tap the floating <strong>Live Agent Chat</strong> button at the bottom right of your screen at any time to chat instantly with our AI assistant.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'upload-vault' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Upload Vault</h2>
                <p className="text-xs text-slate-600 mb-6">Use the upload modal from the dashboard to submit your CV and credentials.</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Open CV Upload Form
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      </div>

      {/* Floating Live Chat Button */}
      <button
        onClick={() => setShowLiveChat(true)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-105 cursor-pointer group border-2 border-indigo-400"
      >
        <MessageSquare className="w-5 h-5 text-indigo-100 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Live Agent Chat</span>
      </button>

      {/* Live Agent Chat Modal / Drawer */}
      {showLiveChat && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[600px] bg-white sm:rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 bg-slate-900 text-white flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shadow-sm">
                AI
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Go2Guys Live Agent</h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online & Ready
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowLiveChat(false)}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-500 border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 text-xs shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Ask about jobs, CVs, or career advice..."
              className="flex-grow px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isChatLoading || !chatInput.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-4 text-center border-t border-slate-200 bg-white text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
        Lus vir werk Go2Guys • All Systems Active
      </footer>
    </div>
  );
}
