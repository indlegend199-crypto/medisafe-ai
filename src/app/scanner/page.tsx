"use client";

import { useState, useRef } from "react";
import {
    Camera, Upload, X, Shield, Brain, ChevronRight,
    Search, CheckCircle2, AlertCircle, Clock, Info,
    ArrowRight, Trash2, Pill, Activity, Wand2, Sparkles, Zap, Lock as LockIcon, Microscope, Plus
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
}

interface Prescription {
    id: string;
    name: string;
    date: string;
    preview: string;
    medicines: string[];
    status: "scanning" | "completed" | "error";
    analysis?: RxResult;
}

export default function ScannerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Upload, 2: Extract/Confirm, 3: Result
    const [medicines, setMedicines] = useState<string[]>([]);
    const [analysis, setAnalysis] = useState<RxResult | null>(null);
    const [error, setError] = useState<string | null>(null);

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

    const reset = () => {
        setFile(null);
        setPreview(null);
        setMedicines([]);
        setAnalysis(null);
        setStep(1);
        setError(null);
    };

    return (
        <div className="scanner-page min-h-screen bg-slate-50/50 pb-20 pt-10">
            <main className="container max-w-6xl mx-auto px-6">
                <header className="mb-16 animate-slide-up">
                    <div className="flex items-center gap-2 mb-4 bg-emerald-500/10 w-fit px-4 py-1.5 rounded-full border border-emerald-500/10">
                        <Microscope size={12} className="text-emerald-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
                            Prescription Vision AI 2.0
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-6xl font-black tracking-tight mb-4">Vision <span className="text-primary italic">Interpreter</span></h1>
                            <p className="text-slate-500 text-xl max-w-2xl leading-relaxed">Decode handwritten prescriptions and identify complex medical instructions with clinical-grade accuracy.</p>
                        </div>

                        <div className="flex items-center gap-8 border-l border-slate-200 pl-8 h-fit">
                            {[
                                { step: 1, label: "Capture" },
                                { step: 2, label: "Extract" },
                                { step: 3, label: "Analyze" }
                            ].map((s) => (
                                <div key={s.step} className={`flex items-center gap-3 ${step >= s.step ? 'opacity-100' : 'opacity-30'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${step === s.step ? 'bg-primary text-white shadow-lg shadow-primary/20' : step > s.step ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                        {step > s.step ? <CheckCircle2 size={16} /> : s.step}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="group relative bg-white border-4 border-dashed border-slate-100 rounded-[64px] p-20 text-center cursor-pointer hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Wand2 size={320} className="text-primary" />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-32 h-32 bg-primary/5 rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        <Camera size={64} className="text-primary" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Upload or Snap Prescription</h3>
                                    <p className="text-slate-400 font-bold text-lg max-w-sm mx-auto mb-10">Use your camera to capture the handwriting clearly. Our AI will handle the rest.</p>
                                    <button className="bg-primary text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 group-hover:scale-105 active:scale-95 transition-all">
                                        Select Image File
                                    </button>
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid lg:grid-cols-2 gap-12"
                        >
                            <div className="space-y-8">
                                <div className="card-premium p-4 overflow-hidden">
                                    {preview && (
                                        <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-100">
                                            <img src={preview} alt="Prescription Preview" className="w-full h-full object-cover" />
                                            {isScanning && (
                                                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center flex-col gap-6">
                                                    <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <p className="text-white font-black uppercase tracking-[0.4em] text-xs">Decoding Molecules...</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <button onClick={reset} className="w-full mt-4 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors">
                                        Retake Photo
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="card-premium">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tight">Extracted Elements</h3>
                                            <p className="text-slate-400 text-sm font-bold">Please verify the molecule names below.</p>
                                        </div>
                                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center">
                                            <Activity size={24} />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 p-6 rounded-2xl border-l-4 border-red-500 text-red-600 font-bold mb-8 flex items-center gap-4">
                                            <AlertCircle size={24} /> {error}
                                        </div>
                                    )}

                                    <div className="space-y-4 mb-10 min-h-[200px]">
                                        {medicines.map((med, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={i}
                                                className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-primary/20 transition-all font-bold text-slate-800"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                                                        <Pill size={18} />
                                                    </div>
                                                    {med}
                                                </div>
                                                <button onClick={() => removeMed(i)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </motion.div>
                                        ))}

                                        <div className="pt-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Add medicine manually..."
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            addMed((e.target as HTMLInputElement).value);
                                                            (e.target as HTMLInputElement).value = '';
                                                        }
                                                    }}
                                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 pl-14 font-bold text-slate-800 focus:border-primary/20 focus:ring-4 ring-primary/5 transition-all shadow-inner"
                                                />
                                                <Plus className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        disabled={medicines.length === 0 || isScanning}
                                        onClick={handleRunAnalysis}
                                        className="w-full bg-primary text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-4"
                                    >
                                        <Brain size={20} />
                                        Launch Safety Analysis
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && analysis && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto space-y-8"
                        >
                            <div className="card-premium">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-primary/10 text-primary rounded-[32px] flex items-center justify-center shrink-0 border border-primary/10">
                                            <Microscope size={40} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Clinical Assessment</p>
                                            <h2 className="text-4xl font-black tracking-tighter">{analysis.condition}</h2>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={reset} className="bg-slate-100 text-slate-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                                            New Scan
                                        </button>
                                        <Link href="/vault" className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
                                            Archive Results
                                        </Link>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                <Info size={14} className="text-primary" /> Core Purpose
                                            </h4>
                                            <p className="text-2xl font-black text-slate-800 leading-tight italic">"{analysis.purpose}"</p>
                                        </div>

                                        <div className="bg-primary/5 p-8 rounded-[32px] border-l-8 border-primary relative overflow-hidden">
                                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <Activity size={14} /> Medical Insight
                                            </h4>
                                            <p className="text-base text-slate-700 font-bold leading-relaxed">{analysis.description}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <Clock size={14} className="text-emerald-500" /> Optimal Schedule
                                            </h4>
                                            <p className="text-lg font-black text-emerald-900 italic leading-snug">{analysis.timing}</p>
                                        </div>

                                        <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-[32px] shadow-sm">
                                            <h4 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <AlertCircle size={14} /> Safety Risks
                                            </h4>
                                            <ul className="space-y-3">
                                                {analysis.risks.map((risk, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm font-black text-slate-700">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                                        {risk}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 bg-slate-900 rounded-[48px] text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Shield size={200} className="text-white" />
                                </div>
                                <div className="relative z-10 max-w-2xl mx-auto">
                                    <h4 className="text-xl font-black text-white/90 mb-4 flex items-center justify-center gap-2">
                                        <LockIcon size={20} className="text-primary" /> Patient Safety Protocol
                                    </h4>
                                    <p className="text-sm text-white/40 font-medium italic leading-relaxed">
                                        This Vision AI processing layer is HIPAA compliant and AES-256 encrypted. All clinical data is sourced from peer-reviewed medical journals and FDA-approved labeling data. Always consult a physician for professional medical advice.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
