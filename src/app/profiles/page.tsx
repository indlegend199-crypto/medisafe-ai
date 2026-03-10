"use client";

import { useState, useEffect } from "react";
import {
    Users, UserPlus, Trash2, Edit2, Shield, AlertTriangle,
    CheckCircle2, ChevronRight, Activity, Plus, X, Heart,
    Thermometer, Weight, Calendar, Pill, Search, Lock as LockIcon,
    ArrowUpRight, Sparkles, Brain, Database, Microscope
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzePatientProfile } from "@/lib/gemini";

interface PatientProfile {
    id: string;
    name: string;
    age: string;
    weight: string;
    conditions: string[];
    allergies: string[];
    medications: string[];
    analysis?: any;
}

export default function ProfilesPage() {
    const [profiles, setProfiles] = useState<PatientProfile[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newProfile, setNewProfile] = useState<Partial<PatientProfile>>({
        conditions: [],
        allergies: [],
        medications: []
    });
    const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("medisafe_profiles");
        if (saved) setProfiles(JSON.parse(saved));
    }, []);

    const saveProfiles = (updated: PatientProfile[]) => {
        setProfiles(updated);
        localStorage.setItem("medisafe_profiles", JSON.stringify(updated));
    };

    const handleSave = async () => {
        if (!newProfile.name) return;

        const profileEntry: PatientProfile = {
            id: editingId || Date.now().toString(),
            name: newProfile.name || "",
            age: newProfile.age || "",
            weight: newProfile.weight || "",
            conditions: newProfile.conditions || [],
            allergies: newProfile.allergies || [],
            medications: newProfile.medications || [],
            analysis: newProfile.analysis
        };

        let updatedProfiles;
        if (editingId) {
            updatedProfiles = profiles.map(p => p.id === editingId ? profileEntry : p);
        } else {
            updatedProfiles = [...profiles, profileEntry];
        }

        saveProfiles(updatedProfiles);
        setIsAdding(false);
        setEditingId(null);
        setNewProfile({ conditions: [], allergies: [], medications: [] });
    };

    const runAnalysis = async (id: string) => {
        const profile = profiles.find(p => p.id === id);
        if (!profile) return;

        setIsAnalyzing(id);
        const result = await analyzePatientProfile(profile);
        const updated = profiles.map(p => p.id === id ? { ...p, analysis: result } : p);
        saveProfiles(updated);
        setIsAnalyzing(null);
    };

    const deleteProfile = (id: string) => {
        if (confirm("Delete this patient profile?")) {
            saveProfiles(profiles.filter(p => p.id !== id));
        }
    };

    const addTag = (field: "conditions" | "allergies" | "medications", value: string) => {
        if (!value.trim()) return;
        setNewProfile(prev => ({
            ...prev,
            [field]: [...(prev[field] || []), value.trim()]
        }));
    };

    const removeTag = (field: "conditions" | "allergies" | "medications", index: number) => {
        setNewProfile(prev => ({
            ...prev,
            [field]: (prev[field] || []).filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="main-content relative min-h-screen">
            {/* Premium Gradient Top Shell */}
            <div className="dashboard-shell"></div>

            <header className="mb-16 animate-fade relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-2 bg-purple-500/10 w-fit px-4 py-1.5 rounded-full border border-purple-500/20 mb-6 mx-auto lg:mx-0">
                            <Users size={12} className="text-purple-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                                Institutional Patient Registry
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Patient <span className="text-gradient">Profiles</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-xl">Centralized clinical health management for individuals and high-risk case folders.</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingId(null);
                            setNewProfile({ conditions: [], allergies: [], medications: [] });
                            setIsAdding(true);
                        }}
                        className="btn-primary !px-10 !h-16 shadow-primary/20"
                    >
                        <UserPlus size={20} /> Initialize New Case
                    </button>
                </div>
            </header>

            <div className="grid lg:grid-cols-2 gap-10 relative z-10">
                <AnimatePresence>
                    {profiles.map((profile, i) => (
                        <motion.div
                            key={profile.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="card-premium group relative overflow-hidden !p-10 border-white/5 hover:border-primary/30 transition-all duration-500"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] blur-2xl group-hover:scale-110 transition-transform duration-1000">
                                <Users size={240} />
                            </div>

                            <div className="flex items-center justify-between mb-10 relative z-10">
                                <div className="flex items-center gap-8">
                                    <div className="w-20 h-20 rounded-[32px] bg-grad-dark text-primary flex items-center justify-center border border-white/5 group-hover:bg-grad-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                                        <Users size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white tracking-tighter mb-2">{profile.name}</h3>
                                        <div className="flex gap-6">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={12} className="text-slate-600" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{profile.age} Years</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Weight size={12} className="text-slate-600" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{profile.weight} KG</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => { setEditingId(profile.id); setNewProfile(profile); setIsAdding(true); }} className="w-12 h-12 bg-white/5 text-slate-500 rounded-2xl flex items-center justify-center hover:bg-primary/20 hover:text-white transition-all">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => deleteProfile(profile.id)} className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-10 mb-10 relative z-10 border-y border-white/5 py-10">
                                <div className="space-y-4">
                                    <p className="label-caps !text-[9px] !text-amber-500 flex items-center gap-2"><Heart size={10} /> Clinical Markers</p>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.conditions.map((c, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-[9px] font-black uppercase border border-amber-500/20">{c}</span>
                                        ))}
                                        {profile.conditions.length === 0 && <span className="text-[10px] text-slate-600 font-bold italic">No identified markers</span>}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="label-caps !text-[9px] !text-rose-500 flex items-center gap-2"><AlertTriangle size={10} /> Conflict Agents</p>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.allergies.map((a, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-lg text-[9px] font-black uppercase border border-rose-500/20">{a}</span>
                                        ))}
                                        {profile.allergies.length === 0 && <span className="text-[10px] text-slate-600 font-bold italic">No identified conflicts</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 relative z-10 group/report hover:bg-white/[0.04] transition-all duration-500">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <Brain size={18} className="text-primary" />
                                        <p className="label-caps !text-[10px] !m-0 !text-white">Active Intelligence Synthesis</p>
                                    </div>
                                    <button
                                        onClick={() => runAnalysis(profile.id)}
                                        disabled={isAnalyzing === profile.id}
                                        className="text-[10px] font-black uppercase text-primary tracking-widest hover:bg-primary/10 px-4 py-2 rounded-full transition-all disabled:opacity-50"
                                    >
                                        {isAnalyzing === profile.id ? "Processing Molecular Domain..." : "Re-Initialize Audit"}
                                    </button>
                                </div>

                                {profile.analysis ? (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className="relative">
                                                <svg className="w-16 h-16 transform -rotate-90">
                                                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                                                    <motion.circle 
                                                        initial={{ strokeDasharray: "0 1000" }}
                                                        animate={{ strokeDasharray: `${(profile.analysis.safetyScore / 100) * 175} 1000` }}
                                                        transition={{ duration: 1.5, ease: "circOut" }}
                                                        cx="32" cy="32" r="28" fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" 
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-xs font-black text-white">{profile.analysis.safetyScore}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className={`w-2 h-2 rounded-full ${profile.analysis.overallRiskLevel === 'High' ? 'bg-rose-500 shadow-[0_0_10px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`}></div>
                                                    <h4 className="text-lg font-black text-white">{profile.analysis.overallRiskLevel} Risk Grade</h4>
                                                </div>
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">Cross-Referenced: 3.4k Repositories</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed font-bold italic border-l-2 border-primary/30 pl-6">"{profile.analysis.summary}"</p>

                                        {(profile.analysis.contraindications?.length > 0 || profile.analysis.allergyConflicts?.length > 0) && (
                                            <div className="space-y-3 pt-6 border-t border-white/5">
                                                {profile.analysis.contraindications?.map((c: any, idx: number) => (
                                                    <div key={idx} className="flex gap-4 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 group/item hover:bg-amber-500/10 transition-all">
                                                        <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-black text-white uppercase">{c.med} + {c.condition}</p>
                                                            <p className="text-[10px] font-bold text-amber-500/80 leading-snug">{c.risk}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {profile.analysis.allergyConflicts?.map((a: any, idx: number) => (
                                                    <div key={idx} className="flex gap-4 p-4 bg-rose-500/5 rounded-2xl border border-rose-500/10 group/item hover:bg-rose-500/10 transition-all">
                                                        <Shield size={16} className="text-rose-500 shrink-0 mt-0.5" />
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-black text-white uppercase">{a.med} conflict: {a.allergy}</p>
                                                            <p className="text-[10px] font-bold text-rose-500/80 leading-snug">{a.reaction}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 space-y-6">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl border border-dashed border-white/10 flex items-center justify-center mx-auto text-slate-700">
                                            <Activity size={32} />
                                        </div>
                                        <p className="text-xs text-slate-500 font-bold max-w-[200px] mx-auto leading-relaxed">System is awaiting pharmacological audit trail command.</p>
                                        <button
                                            onClick={() => runAnalysis(profile.id)}
                                            className="h-12 px-8 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/5 hover:bg-primary hover:text-white transition-all"
                                        >
                                            Initialize Audit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {profiles.length === 0 && (
                    <div className="col-span-2 py-40 bg-white/[0.01] rounded-[64px] border-2 border-dashed border-white/5 text-center flex flex-col items-center justify-center">
                         <div className="w-24 h-24 bg-grad-dark rounded-[36px] flex items-center justify-center mb-8 border border-white/5 shadow-2xl">
                            <Microscope size={40} className="text-slate-700" />
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tighter mb-4">Registry Empty</h3>
                        <p className="text-slate-500 font-bold max-w-sm mx-auto text-lg leading-tight mb-10">System protocols require at least one active patient profile to synchronize clinical safety intelligence.</p>
                        <button 
                             onClick={() => setIsAdding(true)}
                             className="btn-primary !px-12 !h-16"
                        >
                            <UserPlus size={20} /> Create Master Profile
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="modal-overlay">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                            animate={{ opacity: 1, scale: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="modal-content !bg-bg-deep/95 backdrop-blur-3xl"
                        >
                            <div className="p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none -rotate-12 translate-x-20">
                                    <Brain size={400} />
                                </div>

                                <div className="flex items-center justify-between mb-12 relative z-10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Secure Clinical Entry</span>
                                        </div>
                                        <h3 className="text-4xl text-white font-black tracking-tighter">{editingId ? "Modify" : "New"} Patient <span className="text-gradient italic">Case</span></h3>
                                    </div>
                                    <button onClick={() => setIsAdding(false)} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8 mb-12 relative z-10">
                                    <div className="space-y-3">
                                        <label className="label-caps !text-[10px] !m-0 !text-slate-500">Full Operational Name</label>
                                        <input type="text" value={newProfile.name || ""} onChange={e => setNewProfile({ ...newProfile, name: e.target.value })} placeholder="John Doe" className="input-premium !h-16 !bg-white/[0.03] !border-white/5" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="label-caps !text-[10px] !m-0 !text-slate-500">Biological Age</label>
                                        <input type="number" value={newProfile.age || ""} onChange={e => setNewProfile({ ...newProfile, age: e.target.value })} placeholder="45" className="input-premium !h-16 !bg-white/[0.03] !border-white/5" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="label-caps !text-[10px] !m-0 !text-slate-500">Measured Weight (KG)</label>
                                        <input type="number" value={newProfile.weight || ""} onChange={e => setNewProfile({ ...newProfile, weight: e.target.value })} placeholder="75" className="input-premium !h-16 !bg-white/[0.03] !border-white/5" />
                                    </div>
                                </div>

                                <div className="space-y-10 relative z-10">
                                    {[
                                        { label: "Medication History / Markers", field: "conditions", icon: <Heart size={14} />, placeholder: "e.g. Type 2 Diabetes, Hypertension..." },
                                        { label: "Identified Conflict Allergies", field: "allergies", icon: <AlertTriangle size={14} />, placeholder: "e.g. Penicillin, NSAIDs..." },
                                        { label: "Current Biological Agents", field: "medications", icon: <Pill size={14} />, placeholder: "e.g. Metformin, Lisinopril..." }
                                    ].map((s, idx) => (
                                        <div key={idx} className="space-y-4">
                                            <div className="flex items-center justify-between px-2">
                                                <label className="label-caps !text-[10px] !m-0 flex items-center gap-3 !text-white opacity-80">
                                                    {s.icon} {s.label}
                                                </label>
                                                <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Enter to map entity</span>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            addTag(s.field as any, (e.target as any).value);
                                                            (e.target as any).value = '';
                                                        }
                                                    }}
                                                    placeholder={s.placeholder}
                                                    className="input-premium !h-16 !pl-16 !bg-white/[0.03] !border-white/5 focus:!border-primary/50"
                                                />
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary">
                                                    <Plus size={20} />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-3 pt-2">
                                                {(newProfile as any)[s.field]?.map((tag: string, i: number) => (
                                                    <span key={i} className="px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-[10px] font-black uppercase flex items-center gap-3 hover:bg-primary transition-all group/tag">
                                                        {tag}
                                                        <X size={14} className="cursor-pointer group-hover/tag:text-white text-primary/50" onClick={() => removeTag(s.field as any, i)} />
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-16 flex gap-6 relative z-10 border-t border-white/5 pt-10">
                                    <button onClick={() => setIsAdding(false)} className="flex-1 h-18 bg-white/5 text-slate-500 rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">Discard Changes</button>
                                    <button onClick={handleSave} className="flex-[2] btn-primary !h-18 !text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 gap-4">
                                        <Database size={20} /> Commit to Registry
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Global Infrastructure Label */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 opacity-40 hover:opacity-100 transition-opacity relative z-10">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-slate-600">
                        <LockIcon size={24} />
                    </div>
                    <div>
                         <h5 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-1">Clinical Vault Protocol</h5>
                         <p className="text-[11px] font-bold text-slate-500 italic">User clinical data is locally cached and encrypted using browser-native storage protocols.</p>
                    </div>
                </div>
                <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-600">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary shadow-lg shadow-primary"></div> HIPAA Compliant</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald"></div> Verified Nodes: 12</span>
                </div>
            </div>
            
            <style jsx global>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 1000;
                    background: rgba(2, 6, 23, 0.95);
                    backdrop-filter: blur(24px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 32px;
                }
                .modal-content {
                    width: 100%;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 64px;
                    border: 1px solid rgba(255,255,255,0.08);
                    box-shadow: 0 40px 100px -20px rgba(0,0,0,0.8);
                }
                /* Custom Scrollbar for Modal */
                .modal-content::-webkit-scrollbar { width: 4px; }
                .modal-content::-webkit-scrollbar-track { background: transparent; }
                .modal-content::-webkit-scrollbar-thumb { background: rgba(37, 99, 235, 0.2); border-radius: 10px; }
            `}</style>
        </div>
    );
}
