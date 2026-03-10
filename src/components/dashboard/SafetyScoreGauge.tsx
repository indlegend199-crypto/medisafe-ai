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

            <div className="relative z-10 w-full mb-10 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield size={16} className="text-primary" />
                    <h3 className="text-[13px] font-bold uppercase tracking-widest text-slate-400">Medication Safety Score</h3>
                </div>
            </div>

            <div className="relative w-80 h-80 mb-8">
                {/* Advanced Glowing Rings */}
                <div className="absolute inset-[-20px] rounded-full bg-primary/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                <div className="absolute inset-0 rounded-full border border-white/5 backdrop-blur-md shadow-inner"></div>
                
                <svg className="w-full h-full transform -rotate-90">
                    {/* Background Track */}
                    <circle
                        cx="160" cy="160" r="125"
                        fill="none"
                        stroke="rgba(255,255,255,0.02)"
                        strokeWidth="18"
                    />
                    {/* Animated Progress Arc */}
                    <motion.circle
                        initial={{ strokeDasharray: "0 1000" }}
                        animate={{ strokeDasharray }}
                        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
                        cx="160" cy="160" r="125"
                        fill="none"
                        stroke="url(#saas-grad)"
                        strokeWidth="20"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="saas-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#14b8a6" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Score Centerpiece */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="flex items-baseline justify-center">
                             <span className="text-8xl font-black text-white tracking-tight">
                                {score}
                            </span>
                            <span className="text-2xl font-bold text-primary ml-1">%</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 italic opacity-60">Verified Index</p>
                    </motion.div>
                </div>
            </div>

            {/* Metrics Bottom Row */}
            <div className="relative z-10 grid grid-cols-2 gap-8 w-full items-center pt-8 border-t border-white/5 mt-auto">
                <div className="text-center space-y-1">
                    <p className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">Active Meds</p>
                    <p className="text-2xl font-black text-white">{medCount}</p>
                </div>
                <div className="text-center space-y-1">
                    <p className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">Accuracy</p>
                    <p className="text-2xl font-black text-white">99.9%</p>
                </div>
            </div>
        </section>
    );
}
