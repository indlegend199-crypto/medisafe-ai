"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight, Shield, AlertCircle } from "lucide-react";

interface AlertProps {
    type: string;
    meds: string;
    details: string;
    time: string;
    severity: "high" | "medium" | "low";
    idx: number;
}

export default function InteractionAlertCard({ type, meds, details, time, severity, idx }: AlertProps) {
    const config = {
        high: {
            color: "rose",
            bg: "bg-rose-500/10",
            border: "border-rose-500/30",
            text: "text-rose-400",
            icon: <AlertCircle size={28} />,
            glow: "bg-rose-500/5"
        },
        medium: {
            color: "amber",
            bg: "bg-amber-500/10",
            border: "border-amber-500/30",
            text: "text-amber-400",
            icon: <AlertTriangle size={28} />,
            glow: "bg-amber-500/5"
        },
        low: {
            color: "emerald",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/30",
            text: "text-emerald-400",
            icon: <Shield size={28} />,
            glow: "bg-emerald-500/5"
        }
    }[severity];

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + (idx * 0.05), ease: "easeOut" }}
            className={`relative p-6 bg-white/[0.03] border ${config.border} rounded-3xl group hover:bg-white/[0.05] transition-all duration-300 shadow-xl overflow-hidden`}
        >
            {/* Abstract Glow */}
            <div className={`absolute -top-12 -right-12 w-48 h-48 blur-3xl opacity-10 pointer-events-none transition-all duration-700 group-hover:scale-150 ${config.glow}`}></div>

            <div className="flex items-center gap-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg transition-all duration-500 group-hover:scale-105 ${config.bg} ${config.border} ${config.text}`}>
                    {config.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border border-current bg-opacity-10 ${config.text} ${config.bg}`}>
                                {severity === "high" ? "High Risk" : severity === "medium" ? "Caution" : "Safe"}
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest opacity-60">{type}</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{time}</span>
                    </div>
                    
                    <h4 className="text-xl font-black text-white leading-tight truncate">{meds}</h4>
                    <p className="text-xs font-medium text-slate-400 leading-relaxed truncate opacity-80">{details}</p>
                </div>
                
                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-primary transition-all">
                    <ChevronRight size={18} />
                </button>
            </div>
        </motion.div>
    );
}
