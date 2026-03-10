"use client";

import { motion } from "framer-motion";
import { Calendar, Bell, Search, ChevronDown, Sparkles, Activity, Shield } from "lucide-react";
import Link from "next/link";

interface PremiumDashboardLayoutProps {
    children: React.ReactNode;
    userName?: string;
}

export default function PremiumDashboardLayout({ children, userName = "Alex Doe" }: PremiumDashboardLayoutProps) {
    return (
        <div className="relative min-h-screen">
            {/* Header / Top Navigation */}
            {/* Teal Gradient Header Background Area */}
            <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-br from-teal-500/10 via-primary/5 to-transparent z-0 pointer-events-none"></div>

            {/* Top Navigation Bar */}
            <nav className="relative z-30 h-20 flex items-center justify-between px-12 border-b border-white/5 bg-white/[0.01] backdrop-blur-md mb-12">
                <div className="flex items-center gap-12">
                     <Link href="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/10">
                            <Shield size={20} />
                        </div>
                        <span className="text-xl font-black text-white tracking-tighter uppercase grayscale group-hover:grayscale-0 transition-all">
                            MediSafe <span className="text-primary italic">AI</span>
                        </span>
                    </Link>

                    {/* Navigation Tabs */}
                    <div className="hidden lg:flex items-center gap-8 ml-8">
                        {['Overview', 'Patient Safety', 'Interactions', 'Analytics'].map((tab) => (
                            <button 
                                key={tab} 
                                className={`text-[11px] font-bold uppercase tracking-widest transition-all ${tab === 'Overview' ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
                            >
                                {tab}
                                {tab === 'Overview' && <div className="h-0.5 w-full bg-primary mt-1 rounded-full"></div>}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <Search size={20} />
                    </button>
                    <button className="text-slate-500 hover:text-white transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-[#050a14]"></span>
                    </button>
                    <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">{userName}</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest opacity-60">Provider</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-grad-primary border border-white/10 flex items-center justify-center text-white font-black text-xs shadow-xl group-hover:scale-105 transition-transform">
                            {userName.split(' ').map(n => n[0]).join('')}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dashboard Title & Welcome Section */}
            <header className="mb-12 animate-fade relative z-20 px-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight">
                            Medication Safety Overview
                        </h1>
                        <p className="text-slate-500 font-medium mt-1 flex items-center gap-3">
                             {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                             <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                             System Audit: <span className="text-emerald-500 font-bold uppercase tracking-tighter">Nominal</span>
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md">
                        <Calendar size={16} className="text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clinical Session Active</span>
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
