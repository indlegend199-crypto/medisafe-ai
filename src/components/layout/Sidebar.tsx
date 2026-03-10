"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield, Brain, Pill, History, AlertCircle, Users,
  FileText, Activity, LayoutDashboard, Settings, Menu, X, LogOut
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Patient Profiles", href: "/profiles", icon: <Users size={18} /> },
    { name: "AI Assistant", href: "/assistant", icon: <Brain size={18} /> },
    { name: "Medication Vault", href: "/vault", icon: <Pill size={18} /> },
    { name: "Interaction Checker", href: "/checker", icon: <Shield size={18} /> },
    { name: "Prescription Scanner", href: "/scanner", icon: <Activity size={18} /> },
  ];

  if (pathname === "/") return null;

  return (
    <>
      <button 
        className="lg:hidden fixed top-6 left-6 z-[200] p-3 bg-slate-900 border border-white/10 rounded-2xl text-white shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className={`sidebar-premium fixed lg:sticky left-0 top-0 h-screen z-[150] shadow-2xl flex flex-col`}
          >
            <div className="px-8 mb-12">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-grad-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Shield size={22} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter text-white">MediSafe <span className="text-primary italic">AI</span></span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Patient Safety</span>
                </div>
              </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-item group ${isActive ? "active" : ""}`}
                  >
                    <div className="icon-container group-hover:bg-primary/20 transition-all">
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                    {isActive && (
                       <motion.div 
                        layoutId="active-pill"
                        className="absolute left-0 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_15px_#2563eb]"
                       />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="px-6 py-8 mt-auto border-t border-white/5 space-y-6">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
                <div className="avatar-med !w-10 !h-10 !text-xs !rounded-xl">AD</div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white">Alex Doe</span>
                  <span className="text-[10px] font-bold text-slate-500">Family Admin</span>
                </div>
                <button className="ml-auto text-slate-600 hover:text-white transition-colors">
                  <LogOut size={16} />
                </button>
              </div>

              <div className="p-5 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl border border-primary/10">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertCircle size={12} /> Legal Policy
                </p>
                <p className="text-[9px] font-bold text-slate-500 leading-relaxed italic">
                  Clinical assistant only. Not a medical substitute.
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .bg-grad-primary {
          background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
        }
      `}</style>
    </>
  );
}
