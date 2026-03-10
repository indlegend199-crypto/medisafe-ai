"use client";

import { useState, useEffect } from "react";
import { History as HistoryIcon, Shield, Brain, Calendar, ArrowRight, Trash2, Filter, ChevronRight, Zap, Lock as LockIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryItem {
    id: string;
    type: "interaction" | "scan";
    date: string;
    items: string[];
    result: "Green" | "Yellow" | "Red" | "Extracted";
}

const MOCK_HISTORY: HistoryItem[] = [
    { id: "1", type: "interaction", date: "2026-03-07", items: ["Ibuprofen", "Warfarin"], result: "Red" },
    { id: "2", type: "scan", date: "2026-03-06", items: ["Metformin", "Atorvastatin"], result: "Extracted" },
    { id: "3", type: "interaction", date: "2026-03-05", items: ["Amoxicillin", "Paracetamol"], result: "Green" },
    { id: "4", type: "interaction", date: "2026-03-01", items: ["Lisinopril", "Spironolactone"], result: "Yellow" },
];

export default function HistoryPage() {
    const [filter, setFilter] = useState<"all" | "interaction" | "scan">("all");
    const filtered = MOCK_HISTORY.filter(h => filter === "all" || h.type === filter);

    return (
        <div className="main-content">
            <header className="mb-12 animate-fade">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 bg-primary/10 w-fit px-4 py-1.5 rounded-full border border-primary/20 mb-6">
                            <HistoryIcon size={12} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                Temporal Activity Log
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Clinical <span className="text-gradient">Timeline</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-2xl">Archived molecular screenings and pharmaceutical scan interactions.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
                        {[
                            { id: "all", label: "All Activity" },
                            { id: "interaction", label: "Interactions" },
                            { id: "scan", label: "AI Scans" }
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setFilter(btn.id as any)}
                                className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                    filter === btn.id 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                    : 'text-slate-500 hover:text-white'
                                }`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <section className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filtered.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="card-premium !bg-white/[0.01] !py-32 text-center"
                        >
                            <HistoryIcon size={64} className="text-white/10 mx-auto mb-6" />
                            <h3 className="text-2xl font-black text-white mb-2">Temporal Void</h3>
                            <p className="text-slate-500 font-medium">No activity records found for the selected clinical filters.</p>
                        </motion.div>
                    ) : (
                        filtered.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group card-premium !p-6 flex items-center gap-8 hover:bg-white/5 transition-all border-white/5 hover:border-white/10"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                                    item.type === "interaction" ? 
                                    (item.result === "Red" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                     item.result === "Yellow" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20") :
                                    "bg-primary/10 text-primary border-primary/20"
                                }`}>
                                    {item.type === "interaction" ? <Shield size={28} /> : <Brain size={28} />}
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Calendar size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{item.date}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                            item.result === "Red" ? "bg-red-500/5 text-red-500 border-red-500/10" :
                                            item.result === "Yellow" ? "bg-amber-500/5 text-amber-500 border-amber-500/10" :
                                            item.result === "Green" ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10" :
                                            "bg-primary/5 text-primary border-primary/10"
                                        }`}>
                                            {item.type === "interaction" ? `${item.result} RISK` : "SCAN SUCCESS"}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-black text-white tracking-tight group-hover:text-primary transition-colors">
                                        {item.items.join(" + ")}
                                    </h4>
                                </div>

                                <div className="hidden md:flex items-center gap-3">
                                    <button className="h-12 px-6 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                                        Detailed Report <ChevronRight size={14} />
                                    </button>
                                    <button className="w-12 h-12 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors bg-white/5 rounded-xl border border-white/5">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </section>

            {/* Protocol Footer */}
            <div className="mt-16 p-12 bg-white/[0.01] rounded-[48px] border border-white/5 flex flex-col md:flex-row gap-8 items-center opacity-40 hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 bg-grad-dark rounded-2xl flex items-center justify-center text-primary shrink-0 border border-white/5">
                    <LockIcon size={24} />
                </div>
                <div className="flex-1">
                    <h5 className="label-caps !text-[11px] !text-white/80 mb-2">Temporal Security Protocol</h5>
                    <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                        Archived clinical actions are encrypted and stored locally. Temporal logs provide a deterministic trail of pharmacological safety checks to ensure long-term medication vigilance.
                    </p>
                </div>
                <button className="h-14 px-10 bg-red-500/5 border border-red-500/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:bg-red-500 hover:text-white transition-all">
                    Purge History
                </button>
            </div>
        </div>
    );
}
