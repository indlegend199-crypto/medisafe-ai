"use client";

import { useState, useEffect } from "react";
import {
    FileText, Printer, Download, Share2, Shield,
    Pill, Activity, AlertCircle, Clock, Calendar, Lock as LockIcon, Zap, ChevronRight, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SummaryPage() {
    const [vault, setVault] = useState<any[]>([]);
    const [symptoms, setSymptoms] = useState<any[]>([]);
    const [reportDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const savedVault = JSON.parse(localStorage.getItem("medisafe_vault") || "[]");
        const savedSymptoms = JSON.parse(localStorage.getItem("medisafe_symptoms") || "[]");
        setVault(savedVault);
        setSymptoms(savedSymptoms);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="main-content">
            <header className="mb-12 animate-fade no-print">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-2 bg-primary/10 w-fit px-4 py-1.5 rounded-full border border-primary/20 mb-6">
                            <FileText size={12} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                Clinical Reporting Module
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Health <span className="text-gradient">Abstract</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-xl">Comprehensive clinical summary and molecular safety auditing for healthcare professionals.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={handlePrint} className="h-16 px-8 bg-white/5 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/5">
                            <Printer size={18} /> Print Fragment
                        </button>
                        <button className="btn-primary !h-16 !px-10 flex items-center gap-3 shadow-primary/20">
                            <Download size={20} />
                            <span className="text-[11px] uppercase tracking-[0.3em]">Generate Secure PDF</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-[1000px] bg-white text-slate-900 !p-16 rounded-[48px] shadow-2xl relative overflow-hidden medical-report"
                >
                    {/* Watermark */}
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none rotate-12">
                        <Shield size={600} />
                    </div>

                    {/* Report Header */}
                    <div className="flex justify-between items-start border-b-2 border-slate-100 pb-12 mb-12 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                                <Shield size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tighter uppercase">MediSafe <span className="text-primary italic">AI</span></h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Advanced Safety Architecture</p>
                            </div>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Report Metadata</p>
                            <p className="text-sm font-bold">ID: MS-88219-CLINICAL</p>
                            <p className="text-sm font-bold">DATE: {reportDate}</p>
                        </div>
                    </div>

                    <div className="text-center mb-16 relative z-10">
                        <h1 className="text-4xl font-black tracking-tighter mb-4 text-slate-900">Clinical Medication Summary</h1>
                        <p className="text-slate-500 font-bold max-w-xl mx-auto italic">Localized pharmacological analysis and self-reported symptomatic correlations.</p>
                    </div>

                    <div className="space-y-12 relative z-10">
                        {/* Profile Analysis */}
                        <section className="space-y-6">
                            <h3 className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-slate-400">
                                <Activity size={18} className="text-primary" /> Patient Metadata
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 bg-slate-50 rounded-[32px] border border-slate-100">
                                {[
                                    { label: "Patient Name", val: "Alex Doe" },
                                    { label: "Date of Birth", val: "12/05/1985" },
                                    { label: "Blood Stratum", val: "A+ Positive" },
                                    { label: "Clinical Lead", val: "Dr. Jenkins" }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                                        <p className="text-base font-black text-slate-800">{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* active Agents */}
                        <section className="space-y-6">
                            <h3 className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-slate-400">
                                <Pill size={18} className="text-primary" /> Active Pharmacological Agents ({vault.length})
                            </h3>
                            <div className="overflow-hidden border border-slate-100 rounded-[32px]">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50">
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Molecular Name</th>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Dosage</th>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Frequency</th>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Mechanism</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {vault.length > 0 ? vault.map((m, i) => (
                                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                <td className="p-6"><span className="text-lg font-black text-slate-800 tracking-tight">{m.name}</span></td>
                                                <td className="p-6 text-sm font-bold text-slate-600">{m.dosage}</td>
                                                <td className="p-6 text-sm font-bold text-slate-600">{m.frequency}</td>
                                                <td className="p-6 text-sm font-bold text-slate-600 italic">"{m.purpose}"</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={4} className="p-16 text-center text-slate-400 italic">Zero agents detected in active vault.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Safety Synthesis */}
                        <section className="space-y-6">
                            <h3 className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-slate-400">
                                <AlertCircle size={18} className="text-red-500" /> Molecular Safety Synthesis
                            </h3>
                            <div className="p-10 bg-red-50 border-2 border-red-100 rounded-[32px] space-y-4">
                                <div className="flex items-center gap-3 text-red-600">
                                    <Zap size={20} />
                                    <h4 className="text-lg font-black tracking-tight">High-Risk Conflict Vector Detected</h4>
                                </div>
                                <p className="text-base font-bold text-red-900/70 leading-relaxed italic">
                                    "Autonomous analysis indicates a high-risk molecular interaction between <strong>Warfarin</strong> and <strong>Ibuprofen</strong> currently staged in the vault. This combination optimizes for adverse vascular bleeding events. Immediate clinical review is mandated."
                                </p>
                            </div>
                        </section>

                        {/* Recent History */}
                        <section className="space-y-6">
                            <h3 className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-slate-400">
                                <Clock size={18} className="text-primary" /> Temporal Symptom Log (Last 30 Days)
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {symptoms.length > 0 ? symptoms.slice(0, 4).map((s, i) => (
                                    <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center group hover:border-primary/20 transition-all">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.date}</p>
                                            <p className="text-lg font-black text-slate-800 tracking-tight">{s.name}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                            s.severity === 'Severe' ? 'bg-red-100 text-red-600 border-red-200' : 'bg-slate-200 text-slate-600 border-slate-300'
                                        }`}>{s.severity}</span>
                                    </div>
                                )) : (
                                    <div className="md:col-span-2 p-10 bg-slate-50 rounded-[32px] border border-slate-100 text-center text-slate-400 italic font-bold">
                                        Zero symptomatic events recorded in current cycle.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Report Footer */}
                    <footer className="mt-20 pt-16 border-t-2 border-slate-100 space-y-16 relative z-10">
                        <div className="p-10 bg-slate-900 rounded-[32px] text-white space-y-4">
                            <h4 className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.3em]">
                                <LockIcon size={16} className="text-primary" /> Clinical Disclosure Protocol
                            </h4>
                            <p className="text-[12px] font-bold text-white/50 leading-relaxed italic">
                                This abstract is generated by an autonomous clinical reasoning engine. It does not replace professional medical judgment. All molecular interactions must be validated by a licensed physician or pharmacist. MediSafe AI provides deterministic reference nodes based on global pharmaceutical safety repositories.
                            </p>
                        </div>
                        
                        <div className="flex justify-between gap-20">
                            <div className="flex-1 border-t-2 border-slate-200 pt-4 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Authorization</p>
                            </div>
                            <div className="flex-1 border-t-2 border-slate-200 pt-4 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Clinical Validation</p>
                            </div>
                        </div>
                    </footer>
                </motion.div>
            </div>

            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; padding: 0 !important; }
                    .main-content { padding: 0 !important; margin: 0 !important; }
                    .medical-report { 
                        box-shadow: none !important; 
                        padding: 0 !important; 
                        width: 100% !important; 
                        max-width: none !important;
                        border-radius: 0 !important;
                    }
                    .sidebar-premium { display: none !important; }
                    .main-layout { padding: 0 !important; margin: 0 !important; }
                }
            `}</style>
        </div>
    );
}
