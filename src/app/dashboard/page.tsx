"use client";

import { useState, useEffect } from "react";
import {
    Activity, Calendar, AlertCircle, Pill,
    ChevronRight, Brain, Clock, Plus, ArrowUpRight,
    User, CheckCircle, Info, X, Camera, Search, HelpCircle, Users,
    ChevronDown, AlertTriangle, TrendingUp, Filter, MoreHorizontal,
    History as HistoryIcon, Bell, Sparkles, Database, Microscope, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PremiumDashboardLayout from "@/components/dashboard/PremiumDashboardLayout";
import SafetyScoreGauge from "@/components/dashboard/SafetyScoreGauge";
import InteractionAlertsPanel from "@/components/dashboard/InteractionAlertsPanel";

export default function DashboardPage() {
    const [safetyScore, setSafetyScore] = useState(94);
    const [vaultMeds, setVaultMeds] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("medisafe_vault");
        if (saved) setVaultMeds(JSON.parse(saved));
        
        // Simulating medical intelligence loading
        const timer = setTimeout(() => {
            setSafetyScore(92);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const alerts = [
        { type: "Interaction Hazard", meds: "Warfarin + Ibuprofen", details: "Major pharmacological conflict detected. Vascular stability at risk.", time: "2m ago", severity: "high" as const },
        { type: "Contraindication", meds: "Metformin + Furosemide", details: "Lactic acidosis biomarkers require immediate synchronization.", time: "15m ago", severity: "medium" as const },
        { type: "Optimal Protocol", meds: "Lisinopril + Atorvastatin", details: "Cardiovascular synergy verified. Standard dosing continues.", time: "1h ago", severity: "low" as const }
    ];

    const stats = [
        { label: "Molecular Agents", value: vaultMeds.length || "12", icon: <Pill size={24} />, color: "text-teal-400" },
        { label: "Intelligence Audits", value: "4,291", icon: <Brain size={24} />, color: "text-blue-400" },
        { label: "Clinical Profiles", value: "8", icon: <Users size={24} />, color: "text-purple-400" }
    ];

    return (
        <PremiumDashboardLayout>
            <div className="space-y-12 pb-24">
                {/* Upper Intelligence Hub */}
                <div className="grid grid-cols-12 gap-12">
                    {/* Left: Global Safety Score Node */}
                    <div className="col-span-12 xl:col-span-5 h-[680px]">
                        <SafetyScoreGauge score={safetyScore} medCount={vaultMeds.length || 12} />
                    </div>

                    {/* Right: Real-time conflict stream */}
                    <div className="col-span-12 xl:col-span-7 h-[680px]">
                        <InteractionAlertsPanel alerts={alerts} />
                    </div>
                </div>

                {/* Interaction CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    <Link href="/checker" className="group relative w-full h-24 bg-white/[0.02] border border-white/5 rounded-[48px] flex items-center justify-between px-12 overflow-hidden hover:bg-white/[0.04] transition-all hover:border-primary/30 shadow-4xl hover:shadow-primary/10">
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                        <div className="flex items-center gap-10">
                            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-12 transition-all shadow-2xl">
                                <Microscope size={32} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-white uppercase tracking-widest italic group-hover:text-primary transition-colors">Initialize Diagnostic Logic</h3>
                                <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.6em]">Cross-Reference Primary Molecular Vault</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 group-hover:text-white transition-colors">Start Neural Scan</span>
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <ChevronRight size={24} />
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Tactical Analytics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {stats.map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 + (i * 0.1), ease: "easeOut" }}
                            className="card-premium !p-12 hover:scale-[1.02] transition-transform duration-500 overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
                                {stat.icon}
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className={`w-20 h-20 rounded-[32px] bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-700 shadow-3xl ${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-[11px] font-black uppercase text-slate-600 tracking-[0.5em] mb-3">{stat.label}</p>
                                    <p className="text-6xl font-black text-white tracking-tighter leading-none">{stat.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Institutional Bottom Grid */}
                <div className="grid grid-cols-12 gap-12">
                    {/* Clinical History Node */}
                    <div className="col-span-12 lg:col-span-8">
                        <section className="card-premium !p-12 min-h-[600px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                                <HistoryIcon size={600} className="text-white" />
                            </div>
                            
                            <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative z-10 gap-10">
                                <div>
                                    <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-5">
                                        <HistoryIcon size={32} className="text-primary" /> Temporal Audit Log
                                    </h3>
                                    <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.5em] mt-3">Sovereign Transaction Registry</p>
                                </div>
                                <div className="flex bg-white/5 p-2 rounded-[28px] border border-white/5 backdrop-blur-3xl shadow-3xl">
                                    <button className="px-10 py-4 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-[20px] shadow-2xl shadow-primary/30">Table View</button>
                                    <button className="px-10 py-4 text-slate-600 text-[11px] font-black uppercase tracking-widest hover:text-white transition-colors">Visual Graph</button>
                                </div>
                            </div>

                            <div className="overflow-x-auto relative z-10">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[11px] font-black uppercase text-slate-700 tracking-[0.6em]">
                                            <th className="pb-12 pl-6">Clinical Event</th>
                                            <th className="pb-12">Domain</th>
                                            <th className="pb-12">Sync Timestamp</th>
                                            <th className="pb-12">Status</th>
                                            <th className="pb-12 text-right pr-6">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.05]">
                                        {[
                                            { name: "Vision Decryption", type: "Neural Extraction", time: "Feb 10, 20:42", status: "Verified", icon: <Camera size={20} />, color: "text-teal-400" },
                                            { name: "Symptom Logic", type: "Bio-Response", time: "Feb 09, 14:15", status: "Nominal", icon: <Activity size={20} />, color: "text-emerald-400" },
                                            { name: "Conflict Audit", type: "Risk Control", time: "Feb 08, 09:30", status: "Secured", icon: <Shield size={20} />, color: "text-primary" },
                                            { name: "Archive Sync", type: "Ledger Update", time: "Jan 30, 23:11", status: "Synced", icon: <Database size={20} />, color: "text-purple-400" }
                                        ].map((row, i) => (
                                            <tr key={i} className="group hover:bg-white/[0.02] transition-all duration-700">
                                                <td className="py-12 pl-6">
                                                    <div className="flex items-center gap-8">
                                                        <div className={`w-14 h-14 rounded-[20px] bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 shadow-2xl ${row.color}`}>
                                                            {row.icon}
                                                        </div>
                                                        <span className="text-xl font-black text-white group-hover:text-primary transition-colors">{row.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-12">
                                                    <span className="px-6 py-2 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-80">{row.type}</span>
                                                </td>
                                                <td className="py-12 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">{row.time}</td>
                                                <td className="py-12">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{row.status}</span>
                                                    </div>
                                                </td>
                                                <td className="py-12 text-right pr-6">
                                                    <button className="w-14 h-14 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-slate-700 hover:text-primary hover:border-primary/30 transition-all shadow-xl group/btn">
                                                        <ArrowUpRight size={24} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Quick Access Node */}
                    <div className="col-span-12 lg:col-span-4 space-y-12">
                        {/* Clinical Vault Card */}
                        <section className="card-premium !bg-grad-dark !border-none relative overflow-hidden h-fit !p-14 group shadow-5xl">
                             {/* Background Texture */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            
                            <div className="absolute top-0 right-0 p-16 opacity-10 blur-[100px] group-hover:scale-125 transition-transform duration-1000">
                                <Database size={400} className="text-primary" />
                            </div>
                            
                            <div className="relative z-10 flex flex-col gap-14">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                         <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>
                                         <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Biometric Vault Active</span>
                                    </div>
                                    <h3 className="text-5xl font-black text-white tracking-tighter italic leading-none">Clinical Archive</h3>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] mt-6 opacity-60">Protocols: AES-256 Symmetric</p>
                                </div>
                                
                                <Link href="/vault" className="w-full h-20 bg-primary text-white font-black text-[13px] uppercase tracking-[0.4em] rounded-[32px] shadow-[0_20px_60px_-10px_rgba(37,99,235,0.4)] hover:scale-[1.03] transition-all flex items-center justify-center gap-5 hover:bg-blue-500">
                                    Authorize Access <ArrowUpRight size={24} />
                                </Link>
                                <p className="text-center text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Multi-Factor Verification Required</p>
                            </div>
                        </section>

                        {/* Node Navigator */}
                        <section className="card-premium !p-12">
                            <h3 className="text-xl font-black text-white mb-12 uppercase tracking-[0.6em] flex items-center gap-5">
                                <div className="w-2 h-8 bg-primary rounded-full"></div>
                                Node Navigator
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                                 {[
                                    { name: "Vision Scan", icon: <Camera size={28} />, href: "/scanner", color: "text-teal-400" },
                                    { name: "Neural AI", icon: <Sparkles size={28} />, href: "/assistant", color: "text-blue-400" },
                                    { name: "Clinical Case", icon: <HistoryIcon size={28} />, href: "/summary", color: "text-purple-400" },
                                    { name: "Patient Registry", icon: <Users size={28} />, href: "/profiles", color: "text-emerald-400" }
                                ].map((node, i) => (
                                    <Link key={i} href={node.href} className="p-10 rounded-[48px] bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center gap-6 hover:bg-white/[0.06] hover:border-white/10 transition-all group duration-700 shadow-3xl">
                                        <div className={`${node.color} group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 filter drop-shadow-lg`}>
                                            {node.icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 group-hover:text-white transition-colors text-center">{node.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Institutional Integrity Footer */}
                <div className="mt-24 relative z-10 px-6">
                    <div className="flex flex-col xl:flex-row items-center justify-between p-16 bg-white/[0.03] border border-white/5 rounded-[80px] backdrop-blur-3xl gap-16 group hover:bg-white/[0.05] transition-all duration-1000 shadow-5xl">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 max-w-6xl text-center md:text-left">
                            <div className="w-24 h-24 bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center text-primary shrink-0 transition-all duration-1000 group-hover:rotate-12 group-hover:scale-110 shadow-4xl">
                                <Shield size={44} />
                            </div>
                            <div className="space-y-6">
                                 <h4 className="text-[13px] font-black text-white uppercase tracking-[0.5em] flex items-center justify-center md:justify-start gap-5">
                                    <Sparkles size={20} className="text-primary animate-pulse" /> Clinical Integrity Protocol
                                 </h4>
                                 <p className="text-[16px] font-bold text-slate-500 italic leading-relaxed opacity-80">
                                    <span className="text-white opacity-100 uppercase font-black text-[12px] tracking-[0.3em] mr-3 underline decoration-primary decoration-4 underline-offset-8">Critical Directive:</span> 
                                    This console operates as an autonomous pharmacological reasoning node synchronized with global NLM + OpenFDA repositories. Institutional integrity mandates professional physician oversight for all therapeutic decisions. Molecular interaction signals and risk indices are derived from computational probability matrices using decentralized clinical audit trails.
                                 </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-16 shrink-0 border-l border-white/10 pl-20 hidden xl:flex">
                            <div className="text-center">
                                <p className="text-[12px] font-black text-slate-700 uppercase tracking-[0.4em] mb-3">Protocol Status</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                                    <p className="text-3xl font-black text-emerald-500 italic uppercase tracking-tighter">Secure</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-[12px] font-black text-slate-700 uppercase tracking-[0.4em] mb-3">Audit Index</p>
                                <p className="text-3xl font-black text-white italic uppercase tracking-tighter pl-2">Verified</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PremiumDashboardLayout>
    );
}
