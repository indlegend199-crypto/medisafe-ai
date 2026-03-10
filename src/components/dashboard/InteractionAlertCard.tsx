"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight, ShieldCheck, AlertCircle } from "lucide-react";

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
            icon: <ShieldCheck size={28} />,
            glow: "bg-emerald-500/5"
        }
    }[severity];

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
            className={`relative p-8 bg-white/[0.02] border ${config.border} rounded-[40px] group hover:bg-white/[0.04] transition-all duration-700 overflow-hidden shadow-2xl`}
        >
            {/* Background Texture/Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {/* Abstract Glow */}
            <div className={`absolute -top-12 -right-12 w-48 h-48 blur-3xl opacity-20 pointer-events-none transition-all duration-1000 group-hover:scale-150 ${config.glow}`}></div>

            <div className="flex items-center gap-8 relative z-10">
                <div className={`w-20 h-20 rounded-[28px] flex items-center justify-center border-2 shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6 ${config.bg} ${config.border} ${config.text} shadow-${config.color}-500/20`}>
                    {config.icon}
                </div>
                
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className={`text-[11px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-current opacity-80 ${config.text}`}>
                                {severity === "high" ? "High Risk" : severity === "medium" ? "Caution" : "Safe Protocol"}
                            </span>
                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] italic">{type}</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{time}</span>
                    </div>
                    
                    <h4 className="text-2xl font-black text-white leading-tight tracking-tight group-hover:text-primary transition-colors">{meds}</h4>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed italic opacity-80">"{details}"</p>
                </div>
                
                <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:translate-x-1 transition-all">
                    <ChevronRight size={24} />
                </button>
            </div>
        </motion.div>
    );
}
