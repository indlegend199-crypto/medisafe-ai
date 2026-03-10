"use client";

import { useState, useEffect } from "react";
import {
    Activity as ActivityIcon, Plus, Trash2, Calendar, AlertCircle,
    Pill, Clock, Search, Filter, Shield, Zap as ZapIcon, Info, Lock as LockIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Symptom {
    id: string;
    name: string;
    severity: "Mild" | "Moderate" | "Severe";
    date: string;
    notes: string;
    relatedMed?: string;
}

export default function SymptomsPage() {
    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [vaultMeds, setVaultMeds] = useState<string[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newSymp, setNewSymp] = useState<Partial<Symptom>>({
        severity: "Mild"
    });

    useEffect(() => {
        const saved = localStorage.getItem("medisafe_symptoms");
        if (saved) setSymptoms(JSON.parse(saved));

        const savedVault = localStorage.getItem("medisafe_vault");
        if (savedVault) {
            const parsed = JSON.parse(savedVault);
            setVaultMeds(parsed.map((m: any) => m.name));
        }
    }, []);

    const saveSymptoms = (updated: Symptom[]) => {
        setSymptoms(updated);
        localStorage.setItem("medisafe_symptoms", JSON.stringify(updated));
    };

    const handleAddSymptom = () => {
        if (!newSymp.name) return;

        const sympToAdd: Symptom = {
            id: Date.now().toString(),
            name: newSymp.name || "",
            severity: newSymp.severity as any,
            date: newSymp.date || new Date().toISOString().split('T')[0],
            notes: newSymp.notes || "",
            relatedMed: newSymp.relatedMed
        };

        saveSymptoms([...symptoms, sympToAdd]);
        setIsAdding(false);
        setNewSymp({ severity: "Mild" });
    };

    const deleteSymptom = (id: string) => {
        saveSymptoms(symptoms.filter(s => s.id !== id));
    };

    const getRelationMessage = (sympName: string) => {
        const name = sympName.toLowerCase();
        if (name.includes("dizz") || name.includes("nausea")) {
            if (vaultMeds.some(m => m.toLowerCase().includes("metformin")))
                return "Molecular correlation identified: Nausea and dizziness are primary side-effect vectors associated with Metformin formulation.";
            if (vaultMeds.some(m => m.toLowerCase().includes("lisinopril")))
                return "Clinical correlation signal: Dizziness is a documented adverse response frequency in the ACE inhibitor class (Lisinopril).";
        }
        return null;
    };

    return (
        <div className="main-content">
            <header className="mb-12 animate-fade">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-2 bg-primary/10 w-fit px-4 py-1.5 rounded-full border border-primary/20 mb-6">
                            <Activity size={12} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                Pharmacovigilance Tracker
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Adverse <span className="text-gradient">Signals</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-xl">Mapping symptomatic responses to localized pharmacological intake patterns.</p>
                    </div>

                    <button onClick={() => setIsAdding(true)} className="btn-primary !h-16 !px-10 flex items-center gap-4 shadow-primary/20 group">
                        <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                        <span className="text-[11px] uppercase tracking-[0.3em]">Log Bio-Signal</span>
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="card-premium !bg-grad-dark !p-12 border-primary/20 mb-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
                        <h3 className="text-2xl font-black text-white mb-10 tracking-tight flex items-center gap-4">
                            <Plus className="text-primary" /> New Symptom Entry
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-8 relative z-10 text-white">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Observed Phenomenon</label>
                                <select
                                    value={newSymp.name || ""}
                                    onChange={(e) => setNewSymp({ ...newSymp, name: e.target.value })}
                                    className="input-premium !appearance-none"
                                >
                                    <option value="" className="bg-bg-deep">Select Bio-Signal...</option>
                                    <option className="bg-bg-deep">Dizziness</option>
                                    <option className="bg-bg-deep">Nausea</option>
                                    <option className="bg-bg-deep">Headache</option>
                                    <option className="bg-bg-deep">Fatigue</option>
                                    <option className="bg-bg-deep">Stomach Pain</option>
                                    <option className="bg-bg-deep">Muscle Pain</option>
                                    <option className="bg-bg-deep">Rash / Itching</option>
                                    <option className="bg-bg-deep">Other Clinical Signal</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Criticality Level</label>
                                <select
                                    value={newSymp.severity}
                                    onChange={(e) => setNewSymp({ ...newSymp, severity: e.target.value as any })}
                                    className="input-premium !appearance-none"
                                >
                                    <option className="bg-bg-deep">Mild</option>
                                    <option className="bg-bg-deep">Moderate</option>
                                    <option className="bg-bg-deep">Severe</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Event Timestamp</label>
                                <input
                                    type="date"
                                    value={newSymp.date || ""}
                                    onChange={(e) => setNewSymp({ ...newSymp, date: e.target.value })}
                                    className="input-premium"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Suspected Pharmacological Agent</label>
                                <select
                                    value={newSymp.relatedMed || ""}
                                    onChange={(e) => setNewSymp({ ...newSymp, relatedMed: e.target.value })}
                                    className="input-premium !appearance-none"
                                >
                                    <option value="" className="bg-bg-deep">Neutral / Unspecified</option>
                                    {vaultMeds.map((m, i) => <option key={i} value={m} className="bg-bg-deep">{m}</option>)}
                                </select>
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Clinical Observations & Timing</label>
                                <textarea
                                    placeholder="Quantify the response (e.g., 'Occurred 45m post-administration')..."
                                    value={newSymp.notes || ""}
                                    onChange={(e) => setNewSymp({ ...newSymp, notes: e.target.value })}
                                    className="input-premium min-h-[120px] py-4"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-12 pt-10 border-t border-white/5 relative z-10">
                            <button className="h-14 px-10 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all" onClick={() => setIsAdding(false)}>
                                Abort Entry
                            </button>
                            <button className="btn-primary !h-14 !px-10" onClick={handleAddSymptom}>
                                Commit to Bio-Log
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="symptom-history">
                {symptoms.length === 0 ? (
                    <div className="card-premium !bg-white/[0.01] !py-32 text-center flex flex-col items-center gap-8 group">
                        <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center text-slate-700 border border-white/5 group-hover:border-primary/30 group-hover:text-primary transition-all duration-700">
                            <Activity size={48} className="animate-pulse" />
                        </div>
                        <div className="space-y-3 max-w-sm">
                            <h3 className="text-2xl font-black text-white">Baseline Equilibrium</h3>
                            <p className="text-slate-500 font-medium">No adverse response vectors logged. Mapping side effects improves molecular safety algorithms.</p>
                        </div>
                        <button className="btn-primary !px-12" onClick={() => setIsAdding(true)}>Initialize First Log</button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {symptoms.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((s, idx) => (
                            <motion.div 
                                key={s.id} 
                                layout 
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="card-premium !bg-white/[0.03] !p-8 flex flex-col gap-6 group hover:border-primary/20 transition-all border-white/5"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-3">
                                        <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                            s.severity === 'Severe' ? 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]' :
                                            s.severity === 'Moderate' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                            'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                        }`}>{s.severity} Response</span>
                                        <h4 className="text-2xl font-black text-white tracking-tight">{s.name}</h4>
                                    </div>
                                    <button onClick={() => deleteSymptom(s.id)} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors bg-white/5 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Calendar size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{s.date}</span>
                                    </div>
                                    {s.relatedMed && (
                                        <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px]">
                                            <Pill size={14} />
                                            <span>{s.relatedMed}</span>
                                        </div>
                                    )}
                                </div>

                                {s.notes && (
                                    <div className="p-5 bg-white/5 rounded-2xl text-sm font-bold text-slate-400 leading-relaxed italic border border-white/5">
                                        "{s.notes}"
                                    </div>
                                )}

                                {getRelationMessage(s.name) && (
                                    <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl flex items-start gap-4">
                                        <Zap size={18} className="text-primary shrink-0 mt-1" />
                                        <p className="text-xs font-black text-slate-200 leading-relaxed italic">
                                            {getRelationMessage(s.name)}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Safety Protocol Section */}
            <div className="mt-20 card-premium !bg-grad-dark !p-12 border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 blur-[150px] -mr-64 -mt-64 pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-[30px] flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-2xl">
                        <LockIcon size={36} />
                    </div>
                    <div className="flex-1 space-y-4">
                        <h4 className="label-caps !text-[14px] !text-white flex items-center gap-3">
                             Side-Effect Correlation Matrix
                        </h4>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                            All symptom logs are processed by our decentralized pharmacological engine to identify adverse response patterns. High-criticality responses (Severe) will trigger immediate clinical warnings across the adherence dashboard. Maintain rigorous logging for optimal molecular safety monitoring.
                        </p>
                    </div>
                    <div className="shrink-0 flex gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-600 border border-white/5">
                            <Activity size={20} />
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-600 border border-white/5">
                            <Shield size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Zap = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.75 15.3 3 12.1 9.25 20 9.25 8.7 21 11.9 14.75H4Z"/></svg>
);
const Activity = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);
