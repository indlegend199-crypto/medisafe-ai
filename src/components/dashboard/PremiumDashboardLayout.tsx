"use client";

import { motion } from "framer-motion";
import { Calendar, Bell, Search, ChevronDown, Sparkles } from "lucide-react";

interface PremiumDashboardLayoutProps {
    children: React.ReactNode;
    userName?: string;
}

export default function PremiumDashboardLayout({ children, userName = "Alex Doe" }: PremiumDashboardLayoutProps) {
    return (
        <div className="relative min-h-screen">
            {/* Premium Gradient Top Shell */}
            <div className="dashboard-shell"></div>
            
            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* Header / Top Navigation */}
            <header className="mb-16 animate-fade relative z-20">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 text-primary bg-primary/10 w-fit px-6 py-2.5 rounded-full border border-primary/20 backdrop-blur-3xl shadow-[0_0_40px_rgba(37,99,235,0.1)] mb-2">
                            <Sparkles size={18} className="animate-pulse text-primary shadow-glow" />
                            <span className="text-[12px] font-black uppercase tracking-[0.4em]">Clinical Intelligence Console 3.0</span>
                        </div>
                        <h1 className="text-7xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                            MediSafe <span className="text-gradient">Console.</span>
                        </h1>
                        <p className="text-slate-500 font-bold text-xl flex items-center gap-4 pl-1">
                            <Calendar size={24} className="text-slate-700" />
                            Session Active • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* Status Hub */}
                        <div className="hidden xl:flex items-center gap-4 px-10 py-5 bg-white/[0.03] rounded-[32px] border border-white/5 backdrop-blur-3xl shadow-3xl">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse-slow shadow-[0_0_15px_#10b981]"></div>
                            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-emerald-500/80">Bio-Metric Protocol: NOMINAL</span>
                        </div>

                        {/* Interactive Controls */}
                        <div className="flex items-center gap-5 bg-white/[0.03] p-2.5 rounded-[40px] border border-white/5 backdrop-blur-3xl shadow-4xl hover:border-white/10 transition-colors">
                             <button className="relative w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all group hover:bg-white/10">
                                <Search size={28} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <button className="relative w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all group hover:bg-white/10">
                                <Bell size={28} className="group-hover:rotate-12 transition-transform" />
                                <span className="absolute top-5 right-5 w-3 h-3 bg-rose-500 rounded-full border-2 border-[#050a14] shadow-lg shadow-rose-500/20"></span>
                            </button>
                            <div className="h-12 w-[1px] bg-white/10 mx-3 opacity-50"></div>
                            
                            {/* Identity Sector */}
                            <div className="flex items-center gap-5 pr-8 pl-2 group cursor-pointer hover:bg-white/5 py-2 rounded-3xl transition-all">
                                <div className="w-14 h-14 rounded-[20px] bg-grad-primary flex items-center justify-center text-white font-black text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform">
                                    {userName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-black text-white leading-none mb-2">{userName}</p>
                                    <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] italic opacity-80">Chief Administrator</p>
                                </div>
                                <ChevronDown size={20} className="text-slate-800 ml-4 group-hover:translate-y-0.5 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10">
                {children}
            </main>

            <style jsx global>{`
                .dashboard-shell {
                    position: absolute;
                    top: -200px;
                    left: 0;
                    right: 0;
                    height: 800px;
                    background: radial-gradient(circle at 50% 0%, rgba(13, 148, 136, 0.2) 0%, rgba(37, 99, 235, 0.1) 40%, transparent 100%);
                    z-index: 0;
                    pointer-events: none;
                }
                .text-gradient {
                    background: linear-gradient(to right, #0d9488, #3b82f6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div>
    );
}
