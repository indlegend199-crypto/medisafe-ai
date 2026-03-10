"use client";

import { useState, useEffect } from "react";
import {
    Users, UserPlus, Trash2, Edit2, Shield, AlertTriangle,
    CheckCircle2, ChevronRight, Activity, Plus, X, Heart,
    Thermometer, Weight, Calendar, Pill, Search, Lock as LockIcon
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
        <div className="profiles-page pb-20 pt-10 min-h-screen bg-slate-50/50">
            <main className="container max-w-7xl mx-auto px-6">
                <header className="mb-16">
                    <div className="flex items-center gap-2 mb-4 bg-primary/5 w-fit px-4 py-1.5 rounded-full border border-primary/10">
                        <Users size={12} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            Patient Management System
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-6xl font-black tracking-tight mb-4">Patient <span className="text-primary italic">Profiles</span></h1>
                            <p className="text-slate-500 text-xl max-w-2xl leading-relaxed">Centrally manage clinical profiles for your entire family with automated contraindication detection.</p>
                        </div>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-primary text-white h-[60px] px-8 rounded-[24px] shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-3 shrink-0"
                        >
                            <UserPlus size={20} />
                            <span className="text-sm font-black">Add New Patient</span>
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
                                className="card-premium p-10 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Users size={160} className="text-primary" />
                                </div>

                                <div className="flex items-center justify-between mb-8 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-primary/5 text-primary rounded-[32px] flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                            <Users size={36} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900 leading-tight mb-1">{profile.name}</h3>
                                            <div className="flex gap-4">
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{profile.age} Years</span>
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{profile.weight} KG</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setEditingId(profile.id); setNewProfile(profile); setIsAdding(true); }} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => deleteProfile(profile.id)} className="p-3 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mb-10 relative z-10">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical History</p>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.conditions.map((c, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase">{c}</span>
                                            ))}
                                            {profile.conditions.length === 0 && <span className="text-xs text-slate-300 italic">None listed</span>}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Allergies</p>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.allergies.map((a, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase">{a}</span>
                                            ))}
                                            {profile.allergies.length === 0 && <span className="text-xs text-slate-300 italic">None listed</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 mb-8 relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safety Analysis</p>
                                        <button
                                            onClick={() => runAnalysis(profile.id)}
                                            disabled={isAnalyzing === profile.id}
                                            className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline disabled:opacity-50"
                                        >
                                            {isAnalyzing === profile.id ? "Analyzing..." : "Refresh Engines"}
                                        </button>
                                    </div>

                                    {profile.analysis ? (
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${profile.analysis.overallRiskLevel === 'High' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                                        <Shield size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black text-slate-900">{profile.analysis.safetyScore}% Safety Score</h4>
                                                        <p className={`text-[10px] font-black uppercase tracking-widest ${profile.analysis.overallRiskLevel === 'High' ? 'text-red-500' : 'text-emerald-500'}`}>{profile.analysis.overallRiskLevel} Risk Protocol</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 leading-relaxed font-bold italic">"{profile.analysis.summary}"</p>

                                            {(profile.analysis.contraindications?.length > 0 || profile.analysis.allergyConflicts?.length > 0) && (
                                                <div className="space-y-3 pt-4 border-t border-slate-200">
                                                    {profile.analysis.contraindications?.map((c: any, idx: number) => (
                                                        <div key={idx} className="flex gap-3 text-xs font-bold text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-100">
                                                            <AlertTriangle size={14} className="shrink-0" />
                                                            <span>{c.med} contraindication with {c.condition}: {c.risk}</span>
                                                        </div>
                                                    ))}
                                                    {profile.analysis.allergyConflicts?.map((a: any, idx: number) => (
                                                        <div key={idx} className="flex gap-3 text-xs font-bold text-red-700 bg-red-50 p-3 rounded-xl border border-red-100">
                                                            <Activity size={14} className="shrink-0" />
                                                            <span>{a.med} conflict with {a.allergy} allergy ({a.reaction})</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-xs text-slate-400 font-bold mb-4">No recent analysis data found for this profile.</p>
                                            <button
                                                onClick={() => runAnalysis(profile.id)}
                                                className="bg-primary/5 text-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"
                                            >
                                                Run Clinical Scan
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {isAdding && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setIsAdding(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"></motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[48px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10">
                            <div className="p-12">
                                <div className="flex items-center justify-between mb-12">
                                    <h3 className="text-4xl font-black tracking-tighter">{editingId ? "Modify Patient" : "New Patient Profile"}</h3>
                                    <button onClick={() => setIsAdding(false)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8 mb-12">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Full Name</label>
                                        <input type="text" value={newProfile.name || ""} onChange={e => setNewProfile({ ...newProfile, name: e.target.value })} placeholder="e.g. John Doe" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 font-bold text-slate-800 focus:bg-white focus:border-primary/20 transition-all" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Age (Years)</label>
                                        <input type="number" value={newProfile.age || ""} onChange={e => setNewProfile({ ...newProfile, age: e.target.value })} placeholder="45" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 font-bold text-slate-800 focus:bg-white focus:border-primary/20 transition-all" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Weight (KG)</label>
                                        <input type="number" value={newProfile.weight || ""} onChange={e => setNewProfile({ ...newProfile, weight: e.target.value })} placeholder="75" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 font-bold text-slate-800 focus:bg-white focus:border-primary/20 transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    {[
                                        { label: "Medical Conditions", field: "conditions", icon: <Heart size={16} />, placeholders: "Diabetes, Hypertension..." },
                                        { label: "Active Allergies", field: "allergies", icon: <Thermometer size={16} />, placeholders: "Penicillin, Peanuts..." },
                                        { label: "Current Medications", field: "medications", icon: <Pill size={16} />, placeholders: "Metformin, Lisinopril..." }
                                    ].map((s, idx) => (
                                        <div key={idx} className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
                                                    {s.icon} {s.label}
                                                </label>
                                                <span className="text-[9px] font-bold text-slate-300 uppercase">Press Enter to add</span>
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
                                                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 pl-14 font-bold text-slate-800 focus:bg-white focus:border-primary/20 transition-all"
                                                />
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">
                                                    <Plus size={20} />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {(newProfile as any)[s.field]?.map((tag: string, i: number) => (
                                                    <span key={i} className="px-4 py-2 bg-primary/5 text-primary border border-primary/10 rounded-xl text-xs font-bold flex items-center gap-2">
                                                        {tag}
                                                        <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeTag(s.field as any, i)} />
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-16 flex gap-4">
                                    <button onClick={() => setIsAdding(false)} className="flex-1 bg-slate-50 text-slate-400 h-[64px] rounded-[24px] font-black text-[11px] uppercase hover:bg-slate-100 transition-all tracking-[0.2em]">Cancel</button>
                                    <button onClick={handleSave} className="flex-[2] bg-primary text-white h-[64px] rounded-[24px] font-black text-[11px] uppercase shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all tracking-[0.2em]">Save Patient Profile</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
}
