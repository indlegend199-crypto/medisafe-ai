"use client";

import { useState, useRef } from "react";
import {
    Camera, Upload, X, Shield, Brain, ChevronRight,
    Search, CheckCircle2, AlertCircle, Clock, Info,
    ArrowRight, Trash2, Pill, Activity, Wand2, Sparkles, Zap
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
}

export default function ScannerPage() {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [activeResult, setActiveResult] = useState<RxResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size exceeds 5MB limit. Please upload a smaller file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64 = event.target?.result as string;

            const newRx: Prescription = {
                id: Date.now().toString(),
                name: file.name,
                date: new Date().toLocaleDateString(),
                preview: base64,
                medicines: [],
                status: "scanning"
            };

            setPrescriptions([newRx]);
            setIsScanning(true);
            setError(null);

            try {
                const medicines = await extractMedicinesFromImage(base64);
                setPrescriptions([{ ...newRx, medicines, status: "completed" }]);
            } catch (err) {
                setError("AI Extraction failed. Please ensure the prescription is clearly visible and try again.");
                setPrescriptions([{ ...newRx, status: "error" }]);
            } finally {
                setIsScanning(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleConfirm = async () => {
        if (!prescriptions[0]?.medicines.length) return;

        setIsScanning(true);
        try {
            const result = await analyzePrescription(prescriptions[0].medicines);
            setActiveResult(result);
        } catch (err) {
            setError("Clinical analysis engine failed. Please try again later.");
        } finally {
            setIsScanning(false);
        }
    };

    const removeMedicine = (idx: number) => {
        const newP = [...prescriptions];
        if (newP[0]) {
            newP[0].medicines = newP[0].medicines.filter((_, i) => i !== idx);
            setPrescriptions(newP);
        }
    };

    const addMedicine = () => {
        const name = prompt("Enter medicine name:");
        if (name) {
            const newP = [...prescriptions];
            if (newP[0]) {
                newP[0].medicines = [...newP[0].medicines, name];
                setPrescriptions(newP);
            }
        }
    };

    return (
        <div className="scanner-page pb-20 pt-10 min-h-screen bg-slate-50/50">
            <main className="container max-w-6xl mx-auto px-4">
                <header className="page-header mb-12 animate-slide-up">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                            <Camera size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/5 px-3 py-1 rounded-full">
                            Vision Safety Layer
                        </span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter mb-4">Prescription <span className="text-blue-500 italic">Interpreter</span></h1>
                    <p className="text-slate-500 text-lg max-w-2xl">Decode complex medical handwriting into clear, actionable clinical insights using medical-grade computer vision.</p>
                </header>

                <div className="scanner-grid grid lg:grid-cols-2 gap-10 items-start">
                    {/* Upload Section */}
                    <section className="upload-container lg:sticky lg:top-10">
                        <AnimatePresence mode="wait">
                            {!prescriptions.length ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="upload-dropzone group h-[500px] bg-white border-4 border-dashed border-slate-100 rounded-[48px] flex flex-col items-center justify-center p-12 text-center cursor-pointer hover:border-blue-500/30 hover:bg-blue-50/30 transition-all duration-500"
                                >
                                    <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-inner">
                                        <Upload size={40} className="text-slate-400 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight">Drop Prescription Image</h3>
                                    <p className="text-slate-400 font-medium max-w-xs mb-8">Click to browse or drag & drop high-resolution photos of your handwritten medication orders.</p>
                                    <div className="flex gap-4 opacity-40">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase"><Shield size={12} /> Encrypted</div>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase"><CheckCircle2 size={12} /> Vision AI</div>
                                    </div>
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="preview-stack space-y-6"
                                >
                                    <div className="relative group rounded-[48px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                                        <img src={prescriptions[0].preview} alt="Rx Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <button
                                            onClick={() => setPrescriptions([])}
                                            className="absolute top-6 right-6 p-4 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-red-500 transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                        <div className="absolute bottom-10 left-10 text-white">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Source Image</p>
                                            <h4 className="text-xl font-bold">{prescriptions[0].name}</h4>
                                        </div>
                                    </div>

                                    {prescriptions[0].status === "scanning" && (
                                        <div className="bg-blue-600 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
                                            <div className="flex items-center gap-6 relative z-10">
                                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                                    <Activity className="animate-spin" size={32} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black mb-1">OCR Analysis in Progress</h4>
                                                    <p className="text-white/70 text-sm font-medium">Our vision neural network is decoding handwritten molecules...</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="bg-red-50 border border-red-100 p-6 rounded-[32px] flex items-center gap-4 text-red-600">
                                            <AlertCircle size={24} />
                                            <div className="flex-1">
                                                <p className="text-xs font-black uppercase tracking-tighter mb-1">Vision Error</p>
                                                <p className="text-sm font-bold">{error}</p>
                                            </div>
                                            <button
                                                className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black"
                                                onClick={() => {
                                                    setPrescriptions([]);
                                                    setError(null);
                                                }}
                                            >Retry</button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* Result Section */}
                    <section className="result-container">
                        <AnimatePresence mode="wait">
                            {prescriptions[0]?.status === "completed" && !activeResult && (
                                <motion.div
                                    key="extraction-results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-[48px] p-10 shadow-xl border border-slate-100"
                                >
                                    <div className="flex items-center justify-between mb-10">
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-2 block">Detection Results</span>
                                            <h3 className="text-3xl font-black tracking-tighter">Medicines Found</h3>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                                            <CheckCircle2 size={24} />
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-10">
                                        {prescriptions[0].medicines.map((med: string, i: number) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={i}
                                                className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-100"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500">
                                                        <Zap size={18} />
                                                    </div>
                                                    <span className="font-black text-slate-800">{med}</span>
                                                </div>
                                                <button onClick={() => removeMedicine(i)} className="p-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Trash2 size={18} />
                                                </button>
                                            </motion.div>
                                        ))}
                                        <button onClick={addMedicine} className="w-full p-6 border-4 border-dashed border-slate-100 rounded-3xl text-slate-400 font-black text-xs hover:border-blue-200 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                                            + Manual Correction
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleConfirm}
                                        disabled={isScanning || !prescriptions[0].medicines.length}
                                        className="btn-primary w-full py-6 rounded-[24px] shadow-2xl flex items-center justify-center gap-4 text-lg font-black bg-blue-600 text-white hover:bg-blue-700 transition-all"
                                    >
                                        {isScanning ? <Activity className="animate-spin" /> : <Sparkles size={20} />}
                                        Analyze Prescription Logic
                                    </button>
                                </motion.div>
                            )}

                            {activeResult && (
                                <motion.div
                                    key="clinical-report"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6"
                                >
                                    {/* Clinical Summary */}
                                    <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-3 bg-blue-500 rounded-2xl">
                                                    <Brain size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">Clinical Interpretation</p>
                                                    <h3 className="text-2xl font-black">{activeResult.condition}</h3>
                                                </div>
                                            </div>

                                            <p className="text-lg text-blue-100/80 leading-relaxed font-medium italic mb-10">
                                                "{activeResult.description}"
                                            </p>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                                                    <p className="text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Medical Purpose</p>
                                                    <p className="text-sm font-bold">{activeResult.purpose}</p>
                                                </div>
                                                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                                                    <p className="text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Timing Logic</p>
                                                    <p className="text-sm font-bold">{activeResult.timing}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Risk Vectors */}
                                    <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl">
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Identified Risk Vectors</h4>
                                        <div className="space-y-4">
                                            {activeResult.risks.map((risk, i) => (
                                                <div key={i} className="flex items-center gap-4 p-5 bg-red-50 rounded-2xl border border-red-100">
                                                    <AlertCircle size={18} className="text-red-500 shrink-0" />
                                                    <p className="text-sm font-bold text-red-800 italic">{risk}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-8 flex gap-4">
                                            <Link href="/checker" className="flex-1 bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-black shadow-lg hover:bg-blue-700 transition-all">
                                                <Shield size={16} /> Run Interaction Check
                                            </Link>
                                            <button onClick={() => setActiveResult(null)} className="px-6 py-4 bg-slate-50 rounded-2xl text-xs font-black text-slate-500 hover:bg-slate-100 transition-colors">
                                                New Scan
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {!prescriptions.length && (
                                <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[48px] border-2 border-dashed border-slate-200 text-center h-[500px] shadow-sm">
                                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
                                        <Brain size={40} className="text-slate-200" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-4">Vision Ready</h3>
                                    <p className="text-slate-400 font-medium max-w-xs">Upload a photo to engage our clinical vision transformer and decode your prescriptions.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </section>
                </div>
            </main>
        </div>
    );
}
