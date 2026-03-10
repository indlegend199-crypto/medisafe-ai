"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield, Brain, Pill, History, AlertCircle, Users,
  FileText, Activity, LayoutDashboard, Settings, Menu, X, LogOut,
  Zap, Database, Microscope, Search, Bell, Sparkles, Plus
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} />, badge: "Active" },
    { name: "Patient Profiles", href: "/profiles", icon: <Users size={20} /> },
    { name: "AI Assistant", href: "/assistant", icon: <Brain size={20} />, pulse: true },
    { name: "Medication Vault", href: "/vault", icon: <Database size={20} /> },
    { name: "Interaction Checker", href: "/checker", icon: <Shield size={20} /> },
    { name: "Prescription Scanner", href: "/scanner", icon: <Microscope size={20} /> },
  ];

  if (!mounted || pathname === "/") return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="lg:hidden fixed bottom-8 right-8 z-[200] w-16 h-16 bg-grad-primary rounded-full text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center active:scale-90 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside 
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed lg:sticky left-0 top-0 h-screen w-[320px] bg-bg-deep/50 backdrop-blur-3xl border-r border-white/5 z-[150] shadow-2xl flex flex-col"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

            {/* Logo Sector */}
            <div className="p-10 relative z-20">
              <Link href="/" className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:bg-primary transition-all duration-700 shadow-2xl">
                   <div className="absolute inset-0 bg-grad-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <Shield size={24} className="text-primary group-hover:text-white relative z-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter text-white">MediSafe <span className="text-primary italic">AI</span></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Healthcare Platform</span>
                </div>
              </Link>
            </div>

            {/* Notification Chip */}
            <div className="px-8 mb-10">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-white/[0.08] transition-all">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                        <Bell size={14} />
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">Safety Signal</p>
                        <p className="text-[9px] font-bold text-slate-500">2 pending interactions</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-700 group-hover:text-primary transition-colors" />
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-6 space-y-2 relative z-20">
              <div className="px-4 pb-4">
                 <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em]">Navigation</p>
              </div>
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-5 px-6 py-5 rounded-2xl transition-all duration-500 group overflow-hidden ${
                      isActive 
                        ? "bg-white/[0.04] text-white border border-white/5 shadow-2xl" 
                        : "text-slate-500 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    {isActive && (
                        <motion.div 
                            layoutId="sidebar-nav-bg"
                            className="absolute inset-0 bg-grad-primary opacity-10"
                        />
                    )}
                    
                    <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive ? "bg-primary text-white shadow-xl shadow-primary/20 scale-110" : "bg-white/5 group-hover:scale-110"
                    }`}>
                      {item.icon}
                      {item.pulse && !isActive && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-bg-deep animate-pulse"></div>
                      )}
                    </div>
                    
                    <span className={`relative z-10 text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? "translate-x-1" : ""}`}>
                        {item.name}
                    </span>

                    {item.badge && (
                        <span className="relative z-10 ml-auto text-[8px] font-black uppercase bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md border border-emerald-500/20">
                            {item.badge}
                        </span>
                    )}

                    {isActive && (
                        <motion.div 
                            layoutId="sidebar-active-line"
                            className="absolute left-0 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_20px_#2563eb]"
                        />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Sector - Identity & Control */}
            <div className="p-8 relative z-20 border-t border-white/5 bg-white/[0.01]">
                <div className="mb-8">
                    <div className="bg-grad-dark p-6 rounded-[32px] border border-white/5 space-y-5 group/box relative overflow-hidden hover:border-primary/30 transition-all duration-700">
                         <div className="absolute top-0 right-0 p-8 opacity-0 group-hover/box:opacity-5 transition-opacity pointer-events-none">
                            <Sparkles size={100} />
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-2xl overflow-hidden relative">
                                <Plus size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Premium Support</h4>
                                <p className="text-[9px] font-bold text-slate-500">Upgrade for more features</p>
                            </div>
                         </div>
                         <button className="w-full h-12 bg-white/5 text-white/40 text-[9px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-primary hover:text-white transition-all">Enable Pro Mode</button>
                    </div>
                </div>

                <div className="flex items-center gap-5 p-4 bg-white/5 rounded-3xl border border-white/5 group hover:border-white/10 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-[18px] bg-grad-primary text-white flex items-center justify-center text-sm font-black shadow-xl group-hover:scale-105 transition-transform">
                        AD
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-xs font-black text-white group-hover:text-primary transition-colors">Dr. Alex Doe</span>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Lead Provider</span>
                    </div>
                    <button className="text-slate-700 hover:text-white transition-colors">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
