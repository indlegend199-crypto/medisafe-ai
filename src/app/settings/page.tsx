"use client";

import { useState } from "react";
import {
    User, Bell, Shield, Eye, Database, HelpCircle,
    ChevronRight, Save, LogOut, Info, Settings, Trash2, RotateCcw, Lock as LockIcon, Zap, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [biometric, setBiometric] = useState(false);
    const [sharing, setSharing] = useState(false);
    const [activeSection, setActiveSection] = useState("account");
    const [showSuccess, setShowSuccess] = useState(false);

    const clearAllData = () => {
        if (confirm("DANGER: This will permanently delete all your medications, symptom logs, and history. This action cannot be undone. Are you sure?")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const resetOnboarding = () => {
        localStorage.removeItem("medisafe_tour_complete");
        alert("Onboarding guide has been reset. It will appear on your next dashboard visit.");
    };

    const handleSave = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="main-content">
            <header className="mb-12 animate-fade">
                <div className="flex items-center gap-2 bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/5 mb-6">
                    <Settings size={12} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        System Configuration
                    </span>
                </div>
                <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Platform <span className="text-gradient">Preferences</span></h1>
                <p className="text-slate-400 font-medium text-lg max-w-2xl">Manage your clinical profile, data encryption, and medical safety monitoring protocols.</p>
            </header>

            <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
                {/* Navigation Sidebar */}
                <aside className="sticky top-10 space-y-2">
                    {[
                        { id: "account", label: "Account Profile", icon: <User size={18} /> },
                        { id: "privacy", label: "Privacy & Security", icon: <Shield size={18} /> },
                        { id: "data", label: "Data Management", icon: <Database size={18} /> }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                                activeSection === item.id 
                                ? 'bg-grad-primary text-white shadow-lg shadow-primary/20' 
                                : 'text-slate-500 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}

                    <div className="mt-12 pt-12 border-t border-white/5">
                        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors">
                            <LogOut size={18} />
                            Terminate Session
                        </button>
                    </div>
                </aside>

                {/* Content Area */}
                <main className="space-y-8">
                    <AnimatePresence mode="wait">
                        {activeSection === "account" && (
                            <motion.section
                                key="account"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="card-premium space-y-10"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/5">
                                        <User size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">Profile Information</h3>
                                </div>

                                <div className="flex flex-col md:flex-row gap-10 items-start">
                                    <div className="relative group">
                                        <div className="w-32 h-32 bg-grad-dark rounded-[40px] flex items-center justify-center text-4xl font-black text-white border-2 border-white/5 shadow-2xl overflow-hidden">
                                            AD
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Zap size={24} className="text-white" />
                                            </div>
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg border-4 border-bg-deep group-hover:scale-110 transition-transform">
                                            <RotateCcw size={16} />
                                        </button>
                                    </div>

                                    <div className="flex-1 grid md:grid-cols-2 gap-8 w-full">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Legal Name</label>
                                            <input type="text" defaultValue="Alex Doe" className="input-premium" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Secure Email Address</label>
                                            <input type="email" defaultValue="alex.doe@medisafe.io" className="input-premium" />
                                        </div>
                                        <div className="space-y-3 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Bio-Authentication ID</label>
                                            <input type="text" value="AUTH_88291_CLINICAL" disabled className="input-premium opacity-50 cursor-not-allowed" />
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {activeSection === "privacy" && (
                            <motion.section
                                key="privacy"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="card-premium space-y-8"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/5">
                                        <Shield size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">Health Privacy & Security</h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { 
                                            label: "Anonymous Research Sync", 
                                            desc: "Allow encrypted sharing of interaction data to improve global pharmacological safety protocols.",
                                            state: sharing,
                                            setter: setSharing
                                        },
                                        { 
                                            label: "Bio-Unlock Architecture", 
                                            desc: "Secure the medication vault using device-level biometric authentication (FaceID/Fingerprint).",
                                            state: biometric,
                                            setter: setBiometric
                                        },
                                        { 
                                            label: "High-Risk Realtime Alerts", 
                                            desc: "Initiate emergency push notifications when high-toxicity interactions are identified in the vault.",
                                            state: notifications,
                                            setter: setNotifications
                                        }
                                    ].map((item, i) => (
                                        <div key={i} className="group p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-primary/20 transition-all flex items-center justify-between gap-10">
                                            <div className="max-w-xl">
                                                <h4 className="text-lg font-black text-white tracking-tight mb-2">{item.label}</h4>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                                <input 
                                                    type="checkbox" 
                                                    checked={item.state} 
                                                    onChange={(e) => item.setter(e.target.checked)} 
                                                    className="sr-only peer" 
                                                />
                                                <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {activeSection === "data" && (
                            <motion.section
                                key="data"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="card-premium space-y-10"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/5">
                                        <Database size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">Data Integrity Control</h3>
                                </div>

                                <div className="p-8 bg-primary/5 border border-primary/20 rounded-[32px] flex items-start gap-4">
                                    <Info size={20} className="text-primary mt-1 shrink-0" />
                                    <p className="text-sm font-bold text-slate-300 leading-relaxed italic">
                                        Your health stack is localized. All clinical data fragments are stored using device-level encryption. We do not store raw medication lists on our servers.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] flex items-center justify-between gap-10">
                                        <div>
                                            <h4 className="text-lg font-black text-white tracking-tight mb-2">Reset Interaction Tour</h4>
                                            <p className="text-sm text-slate-500 font-medium">Re-initialize the clinical onboarding guide on the dashboard.</p>
                                        </div>
                                        <button onClick={resetOnboarding} className="h-12 px-6 bg-white/5 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-white hover:bg-white/10 transition-all tracking-widest flex items-center gap-3 border border-white/5">
                                            <RotateCcw size={14} /> Re-Launch Guide
                                        </button>
                                    </div>

                                    <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-[32px] flex items-center justify-between gap-10">
                                        <div>
                                            <h4 className="text-lg font-black text-red-400 tracking-tight mb-2">Purge Clinical Repository</h4>
                                            <p className="text-sm text-slate-500 font-medium">Permanently delete all medications, patient records, and history fragments.</p>
                                        </div>
                                        <button onClick={clearAllData} className="h-12 px-6 bg-red-500/10 rounded-xl text-[10px] font-black uppercase text-red-500 hover:bg-red-500 hover:text-white transition-all tracking-widest flex items-center gap-3 border border-red-500/20">
                                            <Trash2 size={14} /> Terminate Data
                                        </button>
                                    </div>
                                </div>
                            </motion.section>
                        )}
                    </AnimatePresence>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-10 border-t border-white/5">
                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 text-emerald-400 font-black text-sm"
                                >
                                    <CheckCircle2 size={16} />
                                    CONFIGURATION SYNCHRONIZED
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex gap-4 ml-auto">
                            <button className="h-16 px-10 bg-white/5 rounded-[20px] font-black text-[11px] uppercase tracking-widest text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                                Cancel Changes
                            </button>
                            <button onClick={handleSave} className="btn-primary !h-16 !px-10 flex items-center gap-3 shadow-primary/20">
                                <Save size={18} />
                                <span className="text-[11px] uppercase tracking-[0.3em]">Commit Preferences</span>
                            </button>
                        </div>
                    </div>

                    {/* Clinical Disclaimer */}
                    <div className="card-premium !bg-white/[0.01] !p-10 border-white/5 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center mt-12 opacity-50 hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 bg-grad-dark rounded-2xl flex items-center justify-center text-primary shrink-0 border border-white/5">
                            <LockIcon size={24} />
                        </div>
                        <p className="text-xs font-bold text-slate-500 leading-relaxed italic text-center md:text-left">
                            "MediSafe AI is a medical-grade decision support platform. Configuration changes should follow clinical best practices. All safety algorithms are updated weekly against global pharmaceutical safety databases."
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

const CheckCircle2 = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
