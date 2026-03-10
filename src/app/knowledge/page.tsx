"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Search, Info, AlertTriangle, Wine, Utensils, ClipboardList, ChevronRight, BookOpen, Shield, Zap, Pill, Activity, Microscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MEDICINE_DATA = [
    {
        name: "Metformin",
        class: "Biguanide",
        use: "Type 2 Diabetes mellitus",
        dosage: "500mg to 2000mg daily",
        sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste"],
        warnings: ["Lactic acidosis (rare but serious)", "Kidney function monitoring required"],
        food: "Take with meals to reduce stomach side effects.",
        alcohol: "Avoid excessive alcohol as it increases risk of lactic acidosis.",
        explanation: "Metformin is commonly used to control blood sugar in people with type 2 diabetes. It works by reducing glucose production in the liver and helping the body use insulin better."
    },
    {
        name: "Atorvastatin",
        class: "HMG-CoA Reductase Inhibitor (Statin)",
        use: "High cholesterol, Heart disease prevention",
        dosage: "10mg to 80mg daily",
        sideEffects: ["Muscle pain", "Joint pain", "Diarrhea", "Liver enzyme changes"],
        warnings: ["Unexplained muscle pain or weakness", "Dark colored urine"],
        food: "Can be taken with or without food.",
        alcohol: "Limit alcohol; high intake may increase risk of liver side effects.",
        explanation: "Atorvastatin helps lower 'bad' cholesterol (LDL) and fats (triglycerides) while raising 'good' cholesterol (HDL) in the blood. This reduces the risk of heart attack and stroke."
    },
    {
        name: "Lisinopril",
        class: "ACE Inhibitor",
        use: "High blood pressure (Hypertension), Heart failure",
        dosage: "5mg to 40mg daily",
        sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue"],
        warnings: ["Swelling of face/lips/tongue (Angioedema)", "High potassium levels"],
        food: "Take at the same time each day, with or without food.",
        alcohol: "Alcohol can increase the blood pressure-lowering effect, causing dizziness.",
        explanation: "Lisinopril relaxes blood vessels so blood can flow more easily, which lowers blood pressure and makes it easier for the heart to pump."
    }
];

export default function KnowledgePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMed, setSelectedMed] = useState<any>(null);

    const filteredMeds = MEDICINE_DATA.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-bg-deep min-h-screen">
            <NavBar />

            <main className="container pt-40 pb-32">
                <header className="mb-16 animate-fade text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 bg-primary/10 w-fit px-4 py-1.5 rounded-full border border-primary/20 mb-6 mx-auto lg:mx-0">
                                <BookOpen size={12} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                    Clinical Knowledge Base
                                </span>
                            </div>
                            <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Medicine <span className="text-gradient">Library</span></h1>
                            <p className="text-slate-400 font-medium text-lg">Autonomous pharmacological repository with simplified patient-centric clinical insights.</p>
                        </div>

                        <div className="w-full max-w-md mx-auto lg:mx-0">
                            <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/5 group relative overflow-hidden">
                                <Search size={20} className="text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search Agents..."
                                    className="bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-white placeholder:text-slate-700 focus:ring-0 w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-500"></div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start">
                    {/* List Column */}
                    <div className="space-y-4">
                        <h3 className="label-caps !text-[10px] pl-4">Detected Molecular Entities</h3>
                        <div className="space-y-3">
                            {filteredMeds.map((med, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 8 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`card-premium !p-6 flex justify-between items-center cursor-pointer transition-all duration-300 ${
                                        selectedMed?.name === med.name 
                                        ? 'border-primary/40 bg-primary/10 box-glow ring-1 ring-primary/20' 
                                        : 'border-white/5 hover:border-white/20'
                                    }`}
                                    onClick={() => setSelectedMed(med)}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                                            selectedMed?.name === med.name 
                                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                                            : 'bg-white/5 text-slate-500 border-white/5'
                                        }`}>
                                            <Pill size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white tracking-tight">{med.name}</h4>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{med.class}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className={`transition-transform duration-500 ${selectedMed?.name === med.name ? 'text-primary translate-x-2' : 'text-slate-700'}`} />
                                </motion.div>
                            ))}
                            {filteredMeds.length === 0 && (
                                <div className="p-12 text-center card-premium border-white/5">
                                    <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Zero Agents Matched</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detail Column */}
                    <div className="relative min-h-[600px]">
                        <AnimatePresence mode="wait">
                            {selectedMed ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    key={selectedMed.name}
                                    className="card-premium !p-12 border-white/5 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                        <Shield size={400} />
                                    </div>

                                    <div className="relative z-10 space-y-12">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-12">
                                            <div>
                                                <h2 className="text-5xl font-black text-white tracking-tighter mb-4">{selectedMed.name}</h2>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="label-caps !text-[9px] !bg-primary/10 !text-primary px-4 py-1.5 rounded-full border border-primary/20">
                                                        {selectedMed.class}
                                                    </span>
                                                    <span className="label-caps !text-[9px] !bg-white/5 !text-slate-400 px-4 py-1.5 rounded-full border border-white/5">
                                                        Clinical Protocol 8.2
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-8 bg-grad-dark rounded-[32px] border border-white/5 max-w-sm">
                                                <p className="text-sm font-medium text-slate-400 leading-relaxed italic border-l-2 border-primary/30 pl-4">
                                                    "{selectedMed.explanation}"
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="card-premium !bg-white/[0.02] border-white/5 !p-8 space-y-4">
                                                <h5 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                                                    <ClipboardList size={16} /> Clinical Indications
                                                </h5>
                                                <p className="text-lg font-black text-white tracking-tight leading-snug">{selectedMed.use}</p>
                                            </div>

                                            <div className="card-premium !bg-white/[0.02] border-white/5 !p-8 space-y-4">
                                                <h5 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                                                    <Activity size={16} /> Standard Dosage Scale
                                                </h5>
                                                <p className="text-lg font-black text-white tracking-tight leading-snug">{selectedMed.dosage}</p>
                                            </div>

                                            <div className="md:col-span-2 card-premium !bg-rose/5 border-rose/10 !p-10 space-y-8">
                                                <h5 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-400">
                                                    <AlertTriangle size={18} /> Safety Signals & Adversity
                                                </h5>
                                                <div className="grid md:grid-cols-2 gap-12">
                                                    <div className="space-y-4">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Common Bio-Signals</p>
                                                        <ul className="space-y-3">
                                                            {selectedMed.sideEffects.map((s: string, i: number) => (
                                                                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                                                    <div className="w-1.5 h-1.5 bg-red-400/30 rounded-full"></div> {s}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="p-6 bg-red-400/5 rounded-2xl border border-red-400/10 space-y-4">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-red-400">Institutional Warnings</p>
                                                        <ul className="space-y-3">
                                                            {selectedMed.warnings.map((w: string, i: number) => (
                                                                <li key={i} className="flex items-start gap-3 text-sm font-bold text-red-200/80 leading-snug">
                                                                    <Zap size={14} className="text-red-400 mt-1 shrink-0" /> {w}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-premium !bg-white/[0.02] border-white/5 !p-8 space-y-4">
                                                <h5 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                                                    <Utensils size={16} /> Dietary Correlation
                                                </h5>
                                                <p className="text-base font-bold text-slate-400 italic leading-relaxed">{selectedMed.food}</p>
                                            </div>

                                            <div className="card-premium !bg-white/[0.02] border-white/5 !p-8 space-y-4">
                                                <h5 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-amber-400">
                                                    <Wine size={16} /> Substance Interaction
                                                </h5>
                                                <p className="text-base font-bold text-slate-400 italic leading-relaxed">{selectedMed.alcohol}</p>
                                            </div>
                                        </div>

                                        <div className="pt-12 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                                                <LockIcon size={14} /> Encrypted Repository
                                            </div>
                                            <button className="btn-primary !h-12 !px-8 text-[9px] uppercase tracking-widest">
                                                Reference Protocol
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12 card-premium border-white/5 border-dashed"
                                >
                                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/5">
                                        <Microscope size={48} className="text-slate-700" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Select Molecular Agent</h3>
                                    <p className="text-slate-500 font-medium max-w-sm">Choose a pharmaceutical entity from the clinical database to visualize comprehensive safety protocols and interactions.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

const LockIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
