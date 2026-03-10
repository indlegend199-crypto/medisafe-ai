"use client";

import { useState, useEffect } from "react";
import {
    Users, UserPlus, Trash2, Edit2, Shield, AlertTriangle,
    CheckCircle2, ChevronRight, Activity, Plus, X, Heart,
    Thermometer, Weight, Calendar, Pill, Search, Lock as LockIcon,
    ArrowUpRight
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
        <div className="main-content">
            <header className="mb-12 animate-fade">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl text-white mb-2 underline decoration-primary/30 underline-offset-8">Patient <span className="text-gradient">Profiles</span></h1>
                        <p className="text-slate-400 font-medium">Clinical health management for individuals and families.</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingId(null);
                            setNewProfile({ conditions: [], allergies: [], medications: [] });
                            setIsAdding(true);
                        }}
                        className="btn-primary"
                    >
                        <UserPlus size={18} /> Add New Patient
                    </button>
                </div>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
                <AnimatePresence>
                    {profiles.map((profile, i) => (
                        <motion.div
                            key={profile.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="card-premium group relative overflow-hidden"
                        >
                             <div className="absolute top-0 right-0 p-8 opacity-5 blur-xl group-hover:opacity-10 transition-opacity">
                                <Users size={160} />
                            </div>

                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                                        <Users size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white">{profile.name}</h3>
                                        <div className="flex gap-4">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{profile.age} Years</span>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{profile.weight} KG</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditingId(profile.id); setNewProfile(profile); setIsAdding(true); }} className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:bg-primary/20 hover:text-white transition-all">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => deleteProfile(profile.id)} className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-8 relative z-10">
                                <div className="space-y-3">
                                    <p className="label-caps !text-[9px]">Medical History</p>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.conditions.map((c, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-[9px] font-black uppercase border border-amber-500/20">{c}</span>
                                        ))}
                                        {profile.conditions.length === 0 && <span className="text-[10px] text-slate-600 font-bold italic">No history</span>}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="label-caps !text-[9px]">Allergies</p>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.allergies.map((a, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-lg text-[9px] font-black uppercase border border-rose-500/20">{a}</span>
                                        ))}
                                        {profile.allergies.length === 0 && <span className="text-[10px] text-slate-600 font-bold italic">No allergies</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <p className="label-caps !text-[9px]">Clinical Safety Intelligence</p>
                                    <button
                                        onClick={() => runAnalysis(profile.id)}
                                        disabled={isAnalyzing === profile.id}
                                        className="text-[9px] font-black uppercase text-primary tracking-widest hover:underline disabled:opacity-50"
                                    >
                                        {isAnalyzing === profile.id ? "Analyzing..." : "Refresh Report"}
                                    </button>
                                </div>

                                {profile.analysis ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${profile.analysis.overallRiskLevel === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'} border border-white/5`}>
                                                <Shield size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white">{profile.analysis.safetyScore}% Safety Score</h4>
                                                <p className={`text-[9px] font-black uppercase tracking-widest ${profile.analysis.overallRiskLevel === 'High' ? 'text-rose-400' : 'text-emerald-400'}`}>{profile.analysis.overallRiskLevel} Risk Identified</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-bold italic">"{profile.analysis.summary}"</p>

                                        {(profile.analysis.contraindications?.length > 0 || profile.analysis.allergyConflicts?.length > 0) && (
                                            <div className="space-y-2 pt-4 border-t border-white/5">
                                                {profile.analysis.contraindications?.map((c: any, idx: number) => (
                                                    <div key={idx} className="flex gap-3 text-[10px] font-bold text-amber-500 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                                                        <AlertTriangle size={12} className="shrink-0" />
                                                        <span>{c.med} + {c.condition} contraindication: {c.risk}</span>
                                                    </div>
                                                ))}
                                                {profile.analysis.allergyConflicts?.map((a: any, idx: number) => (
                                                    <div key={idx} className="flex gap-3 text-[10px] font-bold text-rose-500 bg-rose-500/5 p-3 rounded-xl border border-rose-500/10">
                                                        <Activity size={12} className="shrink-0" />
                                                        <span>{a.med} conflict with {a.allergy} allergy ({a.reaction})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Awaiting Clinical Scan</p>
                                        <button
                                            onClick={() => runAnalysis(profile.id)}
                                            className="bg-primary/10 text-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                                        >
                                            Run Engine
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="modal-overlay">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                            animate={{ opacity: 1, scale: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="modal-content glass"
                        >
                            <div className="p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-3xl text-white font-black tracking-tight">{editingId ? "Modify" : "New"} Patient <span className="text-primary tracking-tighter">Profile</span></h3>
                                    <button onClick={() => setIsAdding(false)} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 mb-10">
                                    <div className="space-y-2">
                                        <label className="label-caps ml-1">Full Clinical Name</label>
                                        <input type="text" value={newProfile.name || ""} onChange={e => setNewProfile({ ...newProfile, name: e.target.value })} placeholder="e.g. John Doe" className="input-premium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="label-caps ml-1">Age (Years)</label>
                                        <input type="number" value={newProfile.age || ""} onChange={e => setNewProfile({ ...newProfile, age: e.target.value })} placeholder="45" className="input-premium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="label-caps ml-1">Body Weight (KG)</label>
                                        <input type="number" value={newProfile.weight || ""} onChange={e => setNewProfile({ ...newProfile, weight: e.target.value })} placeholder="75" className="input-premium" />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        { label: "Clinical Conditions", field: "conditions", icon: <Heart size={14} />, placeholders: "Diabetes, Hypertension..." },
                                        { label: "Active Allergies", field: "allergies", icon: <Thermometer size={14} />, placeholders: "Penicillin, Peanuts..." },
                                        { label: "Current Medications", field: "medications", icon: <Pill size={14} />, placeholders: "Metformin, Lisinopril..." }
                                    ].map((s, idx) => (
                                        <div key={idx} className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="label-caps ml-1 flex items-center gap-2">
                                                    {s.icon} {s.label}
                                                </label>
                                                <span className="text-[8px] font-black text-slate-600 uppercase">Enter to add</span>
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
                                                    placeholder={s.placeholders}
                                                    className="input-premium !pl-12"
                                                />
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                                                    <Plus size={18} />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {(newProfile as any)[s.field]?.map((tag: string, i: number) => (
                                                    <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase flex items-center gap-2">
                                                        {tag}
                                                        <X size={12} className="cursor-pointer hover:text-white" onClick={() => removeTag(s.field as any, i)} />
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 flex gap-4">
                                    <button onClick={() => setIsAdding(false)} className="flex-1 px-8 py-4 bg-white/5 text-slate-400 rounded-2xl font-black text-[10px] uppercase hover:bg-white/10 transition-all tracking-widest">Cancel</button>
                                    <button onClick={handleSave} className="flex-[2] btn-primary !h-auto !py-4 uppercase tracking-widest">Commit Clinical Data</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 1000;
                    background: rgba(2, 6, 23, 0.85);
                    backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                }
                .modal-content {
                    width: 100%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 40px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .text-gradient {
                    background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div>
    );
}
