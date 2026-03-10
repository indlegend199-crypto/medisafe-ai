"use client";

import { useState, useEffect } from "react";
import {
    AlertCircle, AlertTriangle, Info, Bell, Trash2,
    ChevronRight, ArrowRight, Shield, Pill, Activity, CheckCircle2, Zap, Lock as LockIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        // Generate mock alerts based on vault and symptoms
        const meds = JSON.parse(localStorage.getItem("medisafe_vault") || "[]");
        const symps = JSON.parse(localStorage.getItem("medisafe_symptoms") || "[]");

        let combinedAlerts = [];

        // 1. Interaction Alerts
        const hasWarfarin = meds.some((m: any) => m.name.toLowerCase().includes("warfarin"));
        const hasIbuprofen = meds.some((m: any) => m.name.toLowerCase().includes("ibuprofen"));

        if (hasWarfarin && hasIbuprofen) {
            combinedAlerts.push({
                id: '1',
                type: "Molecular",
                title: "Critical Incompatibility Block",
                msg: "Warfarin and Ibuprofen found in your vault. This molecular sequence significantly increases vascular bleeding risk protocols.",
                severity: "critical",
                date: "10:30 AM",
                link: "/checker"
            });
        }

        // 2. Dosage Alerts
        meds.forEach((m: any) => {
            if (m.name.toLowerCase().includes("ibuprofen") && parseInt(m.dosage) > 800) {
                combinedAlerts.push({
                    id: '2',
                    type: "Dosage",
                    title: "Toxic Loading Threshold",
                    msg: `${m.name} formulation (${m.dosage}) exceeds the validated clinical safety threshold for chronic administration.`,
                    severity: "warning",
                    date: "Yesterday",
                    link: "/vault"
                });
            }
        });

        // 3. Symptom Alerts
        if (symps.length > 0) {
            combinedAlerts.push({
                id: '3',
                type: "Symptomatic",
                title: "Adverse Response Signal",
                msg: `Bio-metric log of "${symps[0].name}" may correlate with current agent absorption. Initiate close observation.`,
                severity: "info",
                date: "2 Days Ago",
                link: "/symptoms"
            });
        }

        // 4. Default mock alerts
        combinedAlerts.push({
            id: '4',
            type: "System",
            title: "Safety Engine Refresh",
            msg: "Enhanced interaction vectors for antihypertensive classes synchronized with global pharmacological databases.",
            severity: "info",
            date: "3 Days Ago",
            link: "/knowledge"
        });

        setAlerts(combinedAlerts);
    }, []);

    const removeAlert = (id: string) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    return (
        <div className="main-content">
            <header className="mb-12 animate-fade">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 bg-red-500/10 w-fit px-4 py-1.5 rounded-full border border-red-500/20 mb-6">
                            <Zap size={12} className="text-red-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                                Real-Time Surveillance
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Safety <span className="text-gradient">Signals</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-2xl">Autonomous monitoring of pharmacological conflicts and symptomatic correlations.</p>
                    </div>

                    <div className="flex items-center gap-10 bg-white/5 px-10 py-6 rounded-[32px] border border-white/5 backdrop-blur-xl">
                        {[
                            { label: "Critical", val: alerts.filter(a => a.severity === 'critical').length, color: "text-red-400" },
                            { label: "Warnings", val: alerts.filter(a => a.severity === 'warning').length, color: "text-amber-400" },
                            { label: "Optimal", val: alerts.filter(a => a.severity === 'info').length, color: "text-emerald-400" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col">
                                <span className={`text-2xl font-black ${stat.color}`}>{stat.val}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <section className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {alerts.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className="card-premium !bg-emerald-500/5 !border-emerald-500/10 text-center !py-24 space-y-6"
                        >
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                <Shield size={48} className="text-emerald-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white">Clinical Safe Haven</h3>
                                <p className="text-slate-500 font-medium">No active pharmacological threats detected in your current profile.</p>
                            </div>
                        </motion.div>
                    ) : (
                        alerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`group relative card-premium !p-8 flex gap-8 transition-all duration-300 ${
                                    alert.severity === 'critical' ? 'border-red-500/30 hover:bg-red-500/5' :
                                    alert.severity === 'warning' ? 'border-amber-500/30 hover:bg-amber-500/5' :
                                    'border-primary/30 hover:bg-primary/5'
                                }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                                    alert.severity === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]' :
                                    alert.severity === 'warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                    'bg-primary/10 text-primary border-primary/20'
                                }`}>
                                    {alert.severity === 'critical' ? <AlertCircle size={28} /> :
                                        alert.severity === 'warning' ? <AlertTriangle size={28} /> :
                                            alert.type === 'Symptomatic' ? <Activity size={28} /> :
                                                <Info size={28} />}
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <span className={`label-caps !text-[9px] ${
                                                alert.severity === 'critical' ? '!text-red-400' :
                                                alert.severity === 'warning' ? '!text-amber-400' :
                                                '!text-primary'
                                            }`}>{alert.type} SIGNAL</span>
                                            <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{alert.date}</span>
                                        </div>
                                        <button 
                                            onClick={() => removeAlert(alert.id)}
                                            className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors bg-white/5 rounded-xl border border-white/5"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-white tracking-tight">{alert.title}</h3>
                                        <p className="text-slate-400 font-medium leading-relaxed max-w-3xl">{alert.msg}</p>
                                    </div>

                                    <div className="pt-2">
                                        <Link href={alert.link} className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                                            Execute Protocol <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </section>

            {/* Protocol Footer */}
            <div className="mt-16 card-premium !bg-white/[0.01] !p-12 border-white/5 text-center relative overflow-hidden flex flex-col items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 bg-grad-dark rounded-2xl flex items-center justify-center text-primary border border-white/5">
                    <Shield size={24} />
                </div>
                <div className="max-w-2xl">
                    <h4 className="label-caps !text-[12px] !text-white/80 mb-4 flex items-center justify-center gap-4">
                        <LockIcon size={16} className="text-primary" /> Bio-Metric Integrity Protocol
                    </h4>
                    <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                        Signal surveillance is processed via a decentralized clinical reasoning engine. Alerts are generated based on molecular interaction databases and symptomatic correlation patterns. Professional medical consultation is mandated for all high-criticality signals.
                    </p>
                </div>
            </div>
        </div>
    );
}

const Info = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
