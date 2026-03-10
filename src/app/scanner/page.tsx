"use client";

import { useState, useRef } from "react";
import {
    Camera, Upload, X, Shield, Brain, ChevronRight,
    Search, CheckCircle2, AlertCircle, Clock, Info,
    ArrowRight, Trash2, Pill, Activity, Wand2, Sparkles, Zap, Lock as LockIcon, Microscope, Plus, Edit2, FileText, Download
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { extractMedicinesFromImage, analyzePrescription } from "@/lib/gemini";

interface RxResult {
    condition: string;
    purpose: string;
    description: string;
    timing: string;
    risks: string[];
    sideEffects?: string[];
    dosageWarnings?: string;
}

export default function ScannerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Upload, 2: Extract/Confirm, 3: Result
    const [medicines, setMedicines] = useState<string[]>([]);
    const [analysis, setAnalysis] = useState<RxResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreview(event.target?.result as string);
                setStep(2);
                handleExtract(event.target?.result as string);
            };
            reader.readAsDataURL(selected);
        }
    };

    const handleExtract = async (imageData: string) => {
        setIsScanning(true);
        setError(null);
        try {
            const extracted = await extractMedicinesFromImage(imageData);
            setMedicines(extracted);
        } catch (err) {
            setError("Vision AI failed to decode prescription. Please try a clearer photo.");
        } finally {
            setIsScanning(false);
        }
    };

    const handleRunAnalysis = async () => {
        if (medicines.length === 0) return;
        setIsScanning(true);
        try {
            const res = await analyzePrescription(medicines.join(", "));
            setAnalysis(res);
            setStep(3);
        } catch (err) {
            setError("Analysis engine failed. Please verify medicine names.");
        } finally {
            setIsScanning(false);
        }
    };

    const removeMed = (index: number) => {
        setMedicines(prev => prev.filter((_, i) => i !== index));
    };

    const addMed = (name: string) => {
        if (name.trim()) setMedicines(prev => [...prev, name.trim()]);
    };

    const updateMed = (index: number, newValue: string) => {
        const updated = [...medicines];
        updated[index] = newValue;
        setMedicines(updated);
        setEditingIndex(null);
    };

    const reset = () => {
        setFile(null);
        setPreview(null);
        setMedicines([]);
        setAnalysis(null);
        setStep(1);
        setError(null);
    };

    return (
        <div className="main-content relative min-h-screen">
            {/* Premium Gradient Top Shell */}
            <div className="dashboard-shell"></div>

            <header className="mb-16 animate-fade relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-2 bg-emerald-500/10 w-fit px-4 py-1.5 rounded-full border border-emerald-500/20 mb-6">
                            <Microscope size={12} className="text-emerald-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                                Smart Vision Intelligence
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Rx <span className="text-gradient">Vision</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-xl">High-precision OCR and clinical reasoning for safe medication ingestion.</p>
                    </div>

                    <div className="flex items-center gap-8 bg-white/5 px-8 py-5 rounded-[32px] border border-white/5 backdrop-blur-xl">
                        {[
                            { step: 1, label: "Capture" },
                            { step: 2, label: "Confirm" },
                            { step: 3, label: "Report" }
                        ].map((s) => (
                            <div key={s.step} className={`flex items-center gap-3 transition-opacity duration-500 ${step >= s.step ? 'opacity-100' : 'opacity-20'}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all duration-500 ${
                                    step === s.step ? 'bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-2 ring-primary/20 scale-110' : 
                                    step > s.step ? 'bg-emerald-500 text-white' : 
                                    'bg-white/10 text-slate-500'
                                }`}>
                                    {step > s.step ? <CheckCircle2 size={20} /> : s.step}
                                </div>
                                <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-white/60">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <div className="relative z-10">
                <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative card-premium !bg-white/[0.01] border-white/5 !p-24 text-center cursor-pointer hover:border-primary/20 hover:bg-primary/5 transition-all duration-700 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-grad-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"></div>
                            <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity rotate-12 group-hover:rotate-6 duration-700 pointer-events-none">
                                <FileText size={400} className="text-white" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="w-32 h-32 bg-grad-dark rounded-[40px] flex items-center justify-center mx-auto mb-12 shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                    <Camera size={64} className="text-white relative z-10" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-4xl font-black text-white tracking-tighter mb-6">Import Medical Artifacts</h3>
                                <p className="text-slate-500 font-bold text-lg max-w-sm mx-auto mb-12">Submit your clinical prescriptions for automated molecular extraction.</p>
                                <button className="btn-primary !px-12 !h-16 shadow-primary/20">
                                    Initialize Scan Engine
                                </button>
                                
                                <div className="mt-16 flex items-center justify-center gap-10 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Shield size={24} className="text-white" />
                                    <Brain size={24} className="text-white" />
                                    <Zap size={24} className="text-white" />
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid lg:grid-cols-2 gap-12"
                    >
                        {/* Preview Sector */}
                        <div className="space-y-8">
                            <div className="card-premium !p-5 overflow-hidden relative">
                                {preview && (
                                    <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-grad-dark border border-white/5">
                                        <img src={preview} alt="Scanning Source" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
                                        
                                        {isScanning && (
                                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-md flex items-center justify-center flex-col gap-8">
                                                <div className="w-24 h-24 bg-grad-primary rounded-3xl flex items-center justify-center animate-pulse shadow-2xl shadow-primary/40">
                                                    <Brain size={48} className="text-white" />
                                                </div>
                                                <div className="flex flex-col items-center gap-4">
                                                    <p className="text-white font-black uppercase tracking-[0.5em] text-[10px]">Processing Bio-Vision</p>
                                                    <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            initial={{ x: "-100%" }}
                                                            animate={{ x: "100%" }}
                                                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                            className="w-1/2 h-full bg-primary"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <FileText size={16} className="text-slate-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Source Verification</span>
                                        </div>
                                        <button onClick={reset} className="text-[10px] font-black uppercase text-red-500/60 hover:text-red-400 transition-colors tracking-widest">
                                            Terminal Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Verification Sector */}
                        <div className="space-y-8">
                            <div className="card-premium !bg-white/[0.02] border-white/5 !p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h3 className="text-2xl font-black text-white tracking-tight">Verify Extraction</h3>
                                        <p className="text-slate-500 text-sm font-bold">Review and clinical-check identified agents.</p>
                                    </div>
                                    <div className="w-14 h-14 bg-grad-dark rounded-2xl flex items-center justify-center text-primary border border-white/5">
                                        <Search size={28} />
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-[28px] font-bold mb-10 flex items-center gap-4">
                                        <AlertCircle size={24} /> {error}
                                    </div>
                                )}

                                <div className="space-y-4 mb-12 min-h-[250px]">
                                    <AnimatePresence>
                                        {medicines.map((med, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={i}
                                                className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-primary/30 transition-all font-black text-white"
                                            >
                                                {editingIndex === i ? (
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        value={editingValue}
                                                        onChange={(e) => setEditingValue(e.target.value)}
                                                        onBlur={() => updateMed(i, editingValue)}
                                                        onKeyDown={(e) => e.key === 'Enter' && updateMed(i, editingValue)}
                                                        className="flex-1 input-premium !h-12 !px-4 !bg-white/5"
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-5 flex-1 cursor-pointer" onClick={() => { setEditingIndex(i); setEditingValue(med); }}>
                                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                            <Pill size={20} />
                                                        </div>
                                                        <span className="text-lg tracking-tight">{med}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => { setEditingIndex(i); setEditingValue(med); }} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => removeMed(i)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    <div className="pt-6">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Manual formulation input..."
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        addMed((e.target as HTMLInputElement).value);
                                                        (e.target as HTMLInputElement).value = '';
                                                    }
                                                }}
                                                className="input-premium pl-16 !h-16 !rounded-2xl"
                                            />
                                            <Plus className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    disabled={medicines.length === 0 || isScanning}
                                    onClick={handleRunAnalysis}
                                    className="btn-primary w-full !h-18 !rounded-[28px] shadow-primary/20 flex items-center justify-center gap-5"
                                >
                                    {isScanning ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span className="text-[11px] uppercase tracking-[0.3em]">Decoding Medical Logic...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Brain size={24} />
                                            <span className="text-[11px] uppercase tracking-[0.3em]">Generate Clinical Insight</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 3 && analysis && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto space-y-10"
                    >
                        <div className="card-premium !bg-grad-dark !p-12 border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -mr-64 -mt-64 pointer-events-none"></div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 relative z-10">
                                <div className="flex items-center gap-8">
                                    <div className="w-24 h-24 bg-grad-primary rounded-[36px] flex items-center justify-center shrink-0 shadow-2xl shadow-primary/30 border border-white/10">
                                        <Shield size={44} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="label-caps !text-[10px] mb-2 !text-slate-400">Clinical Formulation Report</p>
                                        <h2 className="text-5xl font-black text-white tracking-tighter">{analysis.condition || "General Therapy"}</h2>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button onClick={reset} className="h-14 px-8 bg-white/5 border border-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                                        Return Home
                                    </button>
                                    <button className="btn-primary !h-14 !px-8 flex items-center gap-3">
                                        <Download size={16} />
                                        <span className="text-[10px] uppercase tracking-widest">Secure PDF</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-16 relative z-10">
                                <div className="space-y-12">
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-3">
                                            <Info size={16} className="text-primary" />
                                            <h4 className="label-caps !text-[10px] !text-primary">Clinical Purpose & Insight</h4>
                                        </div>
                                        <p className="text-3xl font-black text-white leading-tight italic opacity-90">"{analysis.purpose}"</p>
                                        <p className="text-lg text-slate-400 font-medium leading-relaxed">{analysis.description}</p>
                                    </div>

                                    {analysis.sideEffects && analysis.sideEffects.length > 0 && (
                                        <div className="card-premium !bg-amber-500/5 !p-10 border-amber-500/20 rounded-[40px]">
                                            <h4 className="flex items-center gap-4 text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] mb-8">
                                                <Sparkles size={16} /> Symptom Vigilance
                                            </h4>
                                            <div className="flex flex-wrap gap-3">
                                                {analysis.sideEffects.map((s, idx) => (
                                                    <span key={idx} className="px-5 py-2 bg-white/5 text-amber-200 text-[9px] font-black uppercase rounded-xl border border-white/5 backdrop-blur-sm">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-12">
                                    <div className="card-premium !bg-white/5 !p-10 border-white/5 rounded-[40px] shadow-sm">
                                        <h4 className="flex items-center gap-4 text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-8">
                                            <Clock size={16} /> Chrono-Therapy Schedule
                                        </h4>
                                        <p className="text-2xl font-black text-white italic leading-snug">{analysis.timing}</p>
                                    </div>

                                    {analysis.dosageWarnings && (
                                        <div className="card-premium !bg-primary/5 !p-10 border-primary/10 rounded-[40px]">
                                            <h4 className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6">
                                                <Pill size={16} /> Bio-Dosage Parameters
                                            </h4>
                                            <p className="text-base font-bold text-slate-300 leading-relaxed italic">"{analysis.dosageWarnings}"</p>
                                        </div>
                                    )}

                                    <div className="card-premium !bg-red-500/5 !p-10 border-red-500/20 rounded-[40px] shadow-sm">
                                        <h4 className="flex items-center gap-4 text-[10px] font-black text-red-400 uppercase tracking-[0.3em] mb-8">
                                            <AlertCircle size={16} /> Pharmacological Conflict Vectors
                                        </h4>
                                        <ul className="space-y-5">
                                            {analysis.risks.map((risk, i) => (
                                                <li key={i} className="flex items-start gap-4 text-slate-300 font-bold leading-relaxed">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                                    {risk}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Footer */}
                        <div className="p-12 bg-white/[0.02] rounded-[64px] border border-white/5 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-grad-primary opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700"></div>
                            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                                <Shield size={180} className="text-white" />
                            </div>
                            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                                <h4 className="text-[12px] font-black text-white/80 uppercase tracking-[0.5em] flex items-center justify-center gap-4">
                                    <LockIcon size={16} className="text-primary" /> Multi-Layer Security Protocol
                                </h4>
                                <p className="text-xs text-slate-500 font-bold italic leading-relaxed">
                                    Vision intelligence processing is HIPAA compliant and AES-256 encrypted. All extracted clinical data is cross-referenced against global pharmacological repositories. MediSafe AI provides automated reference signals; always verify with a certified medical professional.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>
    );
}
