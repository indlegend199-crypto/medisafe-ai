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
        
        const timer = setTimeout(() => {
            setSafetyScore(92);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const alerts = [
        { type: "Drug Interaction", meds: "Warfarin + Ibuprofen", details: "Major pharmacological hazard detected. Risk of vascular instability.", time: "4m ago", severity: "high" as const },
        { type: "Contraindication", meds: "Metformin + Furosemide", details: "Potential metabolic interference detected. Monitor biomarkers.", time: "18m ago", severity: "medium" as const },
        { type: "Verified Safe", meds: "Lisinopril + Atorvastatin", details: "Cardiovascular synergy confirmed. Maintain standard dosing.", time: "2h ago", severity: "low" as const }
    ];

    const analyticsStats = [
        { label: "Potential Adverse Effects", value: "3", subLabel: "Clinical alerts", icon: <AlertCircle size={20} />, color: "text-rose-400" },
        { label: "Major Warnings", value: "12", subLabel: "Requires review", icon: <AlertTriangle size={20} />, color: "text-amber-400" },
        { label: "Drug Interaction Count", value: "24", subLabel: "Active monitor", icon: <Activity size={20} />, color: "text-blue-400" },
        { label: "Safety Compliance Score", value: "98%", subLabel: "Guideline adherence", icon: <CheckCircle size={20} />, color: "text-emerald-400" }
    ];

    const highRiskPatients = [
        { name: "John Smith", risk: "Critical", meds: "12 Medications", status: "Active Monitor", color: "rose" },
        { name: "Sarah Johnson", risk: "Elevated", meds: "8 Medications", status: "Review Pending", color: "amber" },
        { name: "Michael Chen", risk: "Moderate", meds: "15 Medications", status: "Nominal", color: "blue" },
        { name: "Emma Davis", risk: "High", meds: "9 Medications", status: "Audit Needed", color: "amber" }
    ];

    return (
        <PremiumDashboardLayout>
            <div className="px-12 space-y-8 pb-20">
                {/* Row 1: Primary Safety Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Card: Safety Score Gauge */}
                    <div className="h-[520px]">
                        <SafetyScoreGauge score={safetyScore} medCount={vaultMeds.length || 12} />
                    </div>

                    {/* Right Card: Interaction Alert Feed */}
                    <div className="h-[520px]">
                        <InteractionAlertsPanel alerts={alerts} />
                    </div>
                </div>

                {/* Row 2: High-Risk Patients Table */}
                <motion.section 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="card-premium !p-8 relative overflow-hidden group"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                                <Users size={20} className="text-primary" /> High-Risk Patients
                            </h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Clinical Registry Audit</p>
                        </div>
                        <Link href="/profiles" className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                            View All Patients
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/5 text-[10px] font-black uppercase text-slate-600 tracking-widest">
                                <tr>
                                    <th className="pb-4 pl-4">Patient</th>
                                    <th className="pb-4">Risk Level</th>
                                    <th className="pb-4">Medications</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4 text-right pr-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.05]">
                                {highRiskPatients.map((patient, i) => (
                                    <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                                        <td className="py-6 pl-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white border border-white/10 group-hover:border-primary/50 transition-colors">
                                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-sm font-bold text-white">{patient.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-current bg-opacity-10 
                                                ${patient.color === 'rose' ? 'text-rose-400 bg-rose-500/10' : 
                                                  patient.color === 'amber' ? 'text-amber-400 bg-amber-500/10' : 
                                                  'text-blue-400 bg-blue-500/10'}`}>
                                                {patient.risk}
                                            </span>
                                        </td>
                                        <td className="py-6 text-sm text-slate-400">{patient.meds}</td>
                                        <td className="py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${patient.color === 'rose' ? 'bg-rose-500' : 'bg-emerald-500'} animate-pulse`}></div>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{patient.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 text-right pr-4">
                                            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-white hover:bg-primary transition-all">
                                                <ArrowUpRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.section>

                {/* Row 3: Analytics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {analyticsStats.map((stat, i) => (
                        <motion.section 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 + (i * 0.1) }}
                            className="card-premium !p-6 hover:scale-[1.02] transition-transform group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.color} group-hover:bg-white/10 transition-colors`}>
                                    {stat.icon}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{stat.label}</p>
                                    <p className="text-2xl font-black text-white mt-1 leading-none">{stat.value}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">{stat.subLabel}</p>
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </PremiumDashboardLayout>
    );
}
