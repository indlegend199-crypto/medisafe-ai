"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";

interface SafetyScoreGaugeProps {
    score: number;
    medCount: number;
}

export default function SafetyScoreGauge({ score, medCount }: SafetyScoreGaugeProps) {
    // Calculate arc length (circumference is 2 * PI * r)
    // r = 125, circum = 785.4
    const percentage = score / 100;
    const strokeDasharray = `${percentage * 785.4} 785.4`;

    return (
        <section className="card-premium h-full flex flex-col items-center justify-center text-center group relative overflow-hidden !p-12">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full animate-pulse-slow"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse-slow-reverse"></div>

            <div className="relative z-10 w-full mb-10">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <Sparkles size={14} className="text-teal-400 animate-pulse" />
                    <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">Molecular Safety Index</h3>
                </div>
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent mx-auto"></div>
            </div>

            <div className="relative w-80 h-80 mb-12">
                {/* Advanced Glowing Rings */}
                <div className="absolute inset-[-30px] rounded-full bg-teal-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                <div className="absolute inset-[-10px] rounded-full border border-white/5 backdrop-blur-3xl shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]"></div>
                
                <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_15px_rgba(13,148,136,0.3)]">
                    {/* Background Track */}
                    <circle
                        cx="160" cy="160" r="125"
                        fill="none"
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="20"
                    />
                    {/* Animated Progress Arc */}
                    <motion.circle
                        initial={{ strokeDasharray: "0 1000" }}
                        animate={{ strokeDasharray }}
                        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                        cx="160" cy="160" r="125"
                        fill="none"
                        stroke="url(#teal-green-grad)"
                        strokeWidth="22"
                        strokeLinecap="round"
                        className="relative z-10"
                    />
                    <defs>
                        <linearGradient id="teal-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0d9488" />
                            <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Score Centerpiece */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative"
                    >
                        <span className="text-[100px] font-black text-white leading-none tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                            {score}
                        </span>
                        <span className="absolute -top-2 -right-6 text-3xl font-black text-teal-400 drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]">%</span>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="mt-4 px-8 py-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center gap-3 backdrop-blur-xl shadow-lg"
                    >
                        <Shield size={14} className="text-emerald-400" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400">System Balanced</span>
                    </motion.div>
                </div>
            </div>

            {/* Metrics Bottom Row */}
            <div className="relative z-10 grid grid-cols-2 gap-12 w-full pt-12 border-t border-white/5 mt-auto">
                <div className="text-left space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] opacity-60">Medication Density</p>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-500/10 rounded-lg border border-teal-500/20">
                            <Shield size={14} className="text-teal-400" />
                        </div>
                        <p className="text-3xl font-black text-white italic">{medCount} <span className="text-[10px] font-normal text-slate-500 not-italic uppercase tracking-widest pl-1">Agents</span></p>
                    </div>
                </div>
                <div className="text-right space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] opacity-60">Audit Fidelity</p>
                    <p className="text-3xl font-black text-white italic">99<span className="text-teal-500">.</span>9<span className="text-xs font-normal text-slate-500 not-italic uppercase tracking-widest">%</span></p>
                </div>
            </div>
        </section>
    );
}
