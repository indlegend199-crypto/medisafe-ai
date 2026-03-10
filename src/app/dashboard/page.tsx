"use client";

import { useState, useEffect } from "react";
import {
    Shield, Activity, Calendar, AlertCircle, Pill,
    ChevronRight, Brain, Clock, Plus, ArrowUpRight,
    User, CheckCircle, Info, X, Camera, Search, HelpCircle, Users,
    ChevronDown, AlertTriangle, TrendingUp, Filter, MoreHorizontal,
    History as HistoryIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
    const [safetyScore, setSafetyScore] = useState(92);
    const [vaultMeds, setVaultMeds] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("medisafe_vault");
        if (saved) setVaultMeds(JSON.parse(saved));
    }, []);

    const alerts = [
        { type: "Critical", meds: "Warfarin + Ibuprofen", patient: "John Doe", color: "rose" },
        { type: "Major", meds: "Metformin + Furosemide", patient: "Jane Doe", color: "amber" },
        { type: "Moderate", meds: "Lisinopril + Spironolactone", patient: "Recent Scan", color: "primary" }
    ];

    const schedule = [
        { time: "08:00 AM", med: "Atorvastatin", dosage: "20mg", status: "Taken" },
        { time: "12:30 PM", med: "Metformin", dosage: "500mg", status: "Due" },
        { time: "06:00 PM", med: "Lisinopril", dosage: "10mg", status: "Upcoming" }
    ];

    return (
        <div className="main-content">
            {/* Hero Section */}
            <header className="mb-12 animate-fade">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl text-white mb-2">Welcome, <span className="text-gradient">Alex Doe</span></h1>
                        <p className="text-slate-400 font-medium">Your Medication Safety Overview • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/checker" className="btn-primary">
                            <Plus size={18} /> New Analysis
                        </Link>
                    </div>
                </div>
            </header>

            <div className="dashboard-grid">
                {/* Safety Score - Circular Gauge */}
                <div className="col-span-4 h-full">
                    <section className="card-premium h-full flex flex-col items-center justify-center text-center">
                        <span className="label-caps mb-8">Medication Safety Score</span>
                        
                        <div className="relative w-64 h-64 mb-8">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="128" cy="128" r="110"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth="12"
                                />
                                <motion.circle
                                    initial={{ strokeDasharray: "0 1000" }}
                                    animate={{ strokeDasharray: `${(safetyScore / 100) * 690} 1000` }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    cx="128" cy="128" r="110"
                                    fill="none"
                                    stroke="url(#svg-grad-primary)"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="svg-grad-primary" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#2563eb" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-6xl font-black text-white"
                                >
                                    {safetyScore}
                                </motion.span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald/10 px-3 py-1 rounded-full border border-emerald/20">Excellent</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full pt-8 border-t border-white/5">
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Meds Monitored</p>
                                <p className="text-lg font-bold text-white">{vaultMeds.length} Items</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Last Analysis</p>
                                <p className="text-lg font-bold text-white">2h ago</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Interaction Alerts Panel */}
                <div className="col-span-8 h-full">
                    <section className="card-premium h-full overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl text-white">Clinical Interaction Alerts</h3>
                                <p className="text-xs text-slate-500 font-bold">Priority alerts from monitored patient profiles</p>
                            </div>
                            <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                <Filter size={18} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {alerts.map((alert, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all group border-l-4 border-l-${alert.color === 'primary' ? 'blue-500' : alert.color + '-500'}`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${alert.color === 'primary' ? 'blue-500' : alert.color + '-500'}/10 text-${alert.color === 'primary' ? 'blue-500' : alert.color + '-500'}`}>
                                        <AlertTriangle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded bg-${alert.color === 'primary' ? 'blue-500' : alert.color + '-500'}/10 text-${alert.color === 'primary' ? 'blue-500' : alert.color + '-500'}`}>{alert.type}</span>
                                            <span className="text-xs font-bold text-slate-500">• {alert.patient}</span>
                                        </div>
                                        <p className="text-md font-bold text-white leading-tight">{alert.meds}</p>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all">
                                        <ChevronRight size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Medication Schedule Card */}
                <div className="col-span-8">
                    <section className="card-premium">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl text-white flex items-center gap-3">
                                <Clock className="text-primary" size={22} /> Today's Schedule
                            </h3>
                            <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">View Calendar</button>
                        </div>

                        <div className="space-y-4">
                            {schedule.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 rounded-[24px] bg-white/[0.02] border border-white/5 group hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="text-center w-16 px-3 py-2 bg-white/5 rounded-2xl border border-white/5">
                                            <p className="text-[10px] font-black text-slate-500 uppercase">Time</p>
                                            <p className="text-xs font-black text-white">{item.time.split(' ')[0]}</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-black text-white">{item.med}</p>
                                            <p className="text-xs font-bold text-slate-500">{item.dosage}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${item.status === 'Taken' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-primary/10 text-primary'}`}>
                                            {item.status}
                                        </span>
                                        <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                            <CheckCircle size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="col-span-4 space-y-8">
                    <section className="card-premium">
                        <h3 className="text-lg text-white mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: "Scan Rx", icon: <Camera size={20} />, href: "/scanner" },
                                { name: "Add Med", icon: <Plus size={20} />, href: "/vault" },
                                { name: "AI Chat", icon: <Brain size={20} />, href: "/assistant" },
                                { name: "History", icon: <HistoryIcon size={20} />, href: "/summary" }
                            ].map((action, i) => (
                                <Link key={i} href={action.href} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-primary/10 hover:border-primary/30 transition-all group">
                                    <div className="text-primary group-hover:scale-110 transition-transform">
                                        {action.icon}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{action.name}</span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="card-premium !bg-grad-dark !border-none text-white overflow-hidden relative">
                         <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl">
                            <TrendingUp size={200} />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <h3 className="text-xl mb-2">AI Insights</h3>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">System has detected 3 potential interaction risks in your family vault. Last scan was optimal.</p>
                            </div>
                            <div className="mt-8">
                                <Link href="/assistant" className="w-full py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest">
                                    Full Clinical Report <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Recent Patients Table */}
                <div className="col-span-12">
                    <section className="card-premium">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl text-white">Monitored Patient Profiles</h3>
                            <button className="text-slate-400 hover:text-white"><MoreHorizontal size={20} /></button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                        <th className="pb-4">Patient Name</th>
                                        <th className="pb-4">Age / BMI</th>
                                        <th className="pb-4">Primary Conditions</th>
                                        <th className="pb-4">Status</th>
                                        <th className="pb-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { name: "Emily Chen", stats: "28y • 22.4", condition: "Type 2 Diabetes", status: "Balanced" },
                                        { name: "John Doe", stats: "45y • 26.8", condition: "Hypertension", status: "Review Required" },
                                        { name: "Jane Foster", stats: "34y • 21.5", condition: "Asthma", status: "Balanced" }
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-black text-white border border-white/10">
                                                        {row.name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-bold text-white">{row.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-xs font-bold text-slate-400">{row.stats}</td>
                                            <td className="py-4">
                                                <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-black text-slate-300">
                                                    {row.condition}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${row.status === 'Balanced' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'}`} />
                                                    <span className="text-xs font-bold text-slate-300">{row.status}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button className="text-primary hover:text-white transition-colors"><ArrowUpRight size={18} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>

            {/* Sticky Legal Footer */}
            <div className="mt-16 p-8 bg-white/[0.02] border border-white/5 rounded-3xl flex items-start gap-4 italic text-slate-500 text-[11px] font-medium leading-relaxed">
                <Info size={16} className="text-primary shrink-0 mt-1" />
                <p>MEDI-SAFE AI PROTOCOL: This platform provides clinical-grade information for educational and reference purposes only. It is NOT intended as medical diagnostic software or a substitute for professional pharmaceutical advice. Interaction reports are based on public clinical data aggregations. All medical decisions must be reviewed by a licensed healthcare provider.</p>
            </div>
            
            <style jsx global>{`
                .text-gradient {
                    background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div>
    );
}

// Icon helper components as needed...

// Icon helper
function BookmarkIcon({ size, className }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
    );
}

function FileTextIcon({ size, className }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    );
}
