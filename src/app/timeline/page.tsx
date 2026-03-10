"use client";

import { useState, useEffect } from "react";
import {
    History as HistoryIcon, Search, Pill, Brain, AlertCircle,
    CheckCircle2, Plus, ArrowRight, Calendar, Filter, Download, Zap as ZapIcon, Lock as LockIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimelinePage() {
    const [events, setEvents] = useState<any[]>([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const mockEvents = [
            {
                id: 1,
                date: "March 10, 2025",
                time: "10:45 AM",
                type: "scan",
                title: "Prescription Analysis",
                details: "Autonomous extraction of Metformin, Atorvastatin, and Lisinopril sequence. No molecular conflicts identified.",
                icon: <Brain size={22} />,
                color: "text-primary"
            },
            {
                id: 2,
                date: "March 8, 2025",
                time: "02:15 PM",
                type: "vault",
                title: "Molecular Agent Addition",
                details: "Ibuprofen 400mg formulation commited to the clinical vault for regular administration.",
                icon: <Pill size={22} />,
                color: "text-emerald-400"
            },
            {
                id: 3,
                date: "March 8, 2025",
                time: "02:16 PM",
                type: "warning",
                title: "Incompatibility Detected",
                details: "Critical interaction signal identified between Ibuprofen and Warfarin vectors. Safety protocol triggered.",
                icon: <AlertCircle size={22} />,
                color: "text-red-400"
            },
            {
                id: 4,
                date: "Feb 28, 2025",
                time: "09:00 AM",
                type: "symptom",
                title: "Bio-Signal Commited",
                details: "Logged mild gastrointestinal discomfort. Mapping symptomatic responses to current pharmacological agents.",
                icon: <Zap size={22} />,
                color: "text-amber-400"
            },
            {
                id: 5,
                date: "Feb 15, 2025",
                time: "11:30 AM",
                type: "report",
                title: "Clinical Abstract Export",
                details: "Monthly security summary and interaction synthesis generated for clinical lead.",
                icon: <Calendar size={22} />,
                color: "text-primary"
            }
        ];
        setEvents(mockEvents);
    }, []);

    const filteredEvents = filter === "all" ? events : events.filter(e => e.type === filter);

    return (
        <div className="main-content">
            <header className="mb-12 animate-fade">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-2 bg-primary/10 w-fit px-4 py-1.5 rounded-full border border-primary/20 mb-6">
                            <HistoryIcon size={12} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                Temporal Security Log
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Clinical <span className="text-gradient">Timeline</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-xl">A decentralized audit of molecular screenings, pharmaceutical events, and safety protocol triggers.</p>
                    </div>

                    <button className="h-16 px-10 bg-white/5 rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/5 shadow-2xl">
                        <Download size={20} />
                        <span>Export Temporal Log</span>
                    </button>
                </div>
            </header>

            <div className="flex flex-wrap items-center justify-between gap-8 mb-16 card-premium !bg-white/[0.02] border-white/5 !p-6 backdrop-blur-3xl">
                <div className="flex items-center gap-2">
                    {[
                        { id: "all", label: "All Events" },
                        { id: "scan", label: "Scans" },
                        { id: "warning", label: "Signals" },
                        { id: "vault", label: "Vault" }
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setFilter(btn.id)}
                            className={`px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${
                                filter === btn.id 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'text-slate-500 hover:text-white'
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 group grow max-w-md">
                    <Search size={16} className="text-slate-500 group-focus-within:text-primary transition-colors" />
                    <input type="text" placeholder="QUERY TEMPORAL DATABASE..." className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-white placeholder:text-slate-700 focus:ring-0 w-full" />
                </div>
            </div>

            <div className="relative pl-12 md:pl-64">
                {/* Central Line */}
                <div className="absolute left-[22px] md:left-[199px] top-0 bottom-0 w-[2px] bg-grad-dark opacity-20"></div>
                
                <div className="space-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 space-y-6">
                                <HistoryIcon size={64} className="text-white/5 mx-auto" />
                                <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Zero Temporal Records Found</p>
                            </motion.div>
                        ) : (
                            filteredEvents.map((event, index) => (
                                <div key={event.id} className="relative group">
                                    {/* Date Side */}
                                    <div className="hidden md:flex absolute -left-64 w-48 text-right flex flex-col gap-1 pt-6">
                                        <span className="text-sm font-black text-white tracking-tight">{event.date}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{event.time}</span>
                                    </div>

                                    {/* Node */}
                                    <div className="absolute -left-12 md:-left-8 top-6 w-12 h-12 bg-bg-deep border-4 border-white/5 rounded-2xl z-10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500 shadow-2xl">
                                        <div className={`transition-colors ${event.color}`}>
                                            {event.icon}
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="card-premium !p-8 border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500"
                                    >
                                        <div className="md:hidden flex justify-between items-center mb-6">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{event.date}</span>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{event.time}</span>
                                        </div>

                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                            <div className="flex items-center gap-4">
                                                <span className={`label-caps !text-[9px] ${
                                                    event.type === 'warning' ? '!text-red-400 !bg-red-500/10' :
                                                    event.type === 'vault' ? '!text-emerald-400 !bg-emerald-500/10' :
                                                    '!text-primary !bg-primary/10'
                                                }`}>
                                                    {event.type} event
                                                </span>
                                                <h4 className="text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors">{event.title}</h4>
                                            </div>
                                            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                                                Protocol Details <ArrowRight size={14} />
                                            </button>
                                        </div>
                                        
                                        <p className="text-slate-400 font-medium leading-relaxed max-w-3xl text-base italic border-l-2 border-white/5 pl-6">
                                            {event.details}
                                        </p>
                                    </motion.div>
                                </div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Protocol Footer */}
            <div className="mt-32 card-premium !bg-grad-dark !p-12 border-white/5 relative overflow-hidden flex flex-col items-center text-center gap-8">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary border border-primary/20 shadow-2xl">
                    <LockIcon size={28} />
                </div>
                <div className="max-w-2xl space-y-4">
                    <h5 className="label-caps !text-[12px] !text-white flex items-center justify-center gap-3">
                         Temporal Integrity Assurance
                    </h5>
                    <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                        Temporal event logs are cryptographically hashed and synchronized with your local clinical security module. This provides an immutable record of pharmaceutical surveillance and safety adherence for regulatory and clinical auditing.
                    </p>
                </div>
            </div>
        </div>
    );
}

const Zap = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.75 15.3 3 12.1 9.25 20 9.25 8.7 21 11.9 14.75H4Z"/></svg>
);
