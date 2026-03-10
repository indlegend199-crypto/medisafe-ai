"use client";

import Link from "next/link";
import { Shield, LayoutDashboard, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
      scrolled ? "h-20 bg-bg-deep/80 backdrop-blur-2xl border-b border-white/5 py-2" : "h-28 bg-transparent py-4"
    }`}>
      <div className="container h-full flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:scale-110 transition-transform duration-500">
            <Shield size={24} />
          </div>
          <div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase leading-none block">
              MediSafe <span className="text-primary italic">AI</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mt-1 block">Clinical Engine</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          {['Features', 'Intelligence', 'Security'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link href="/dashboard" className="btn-primary !h-12 !px-8 flex items-center gap-3 shadow-primary/20 group">
            <LayoutDashboard size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.3em]">Open Platform</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-white" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-4 right-4 bg-bg-deep/95 backdrop-blur-3xl p-8 rounded-[32px] border border-white/10 shadow-2xl z-[1001]"
          >
            <div className="flex flex-col gap-6">
              {['Features', 'Intelligence', 'Security'].map((item) => (
                <Link 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-xl font-black text-white tracking-tight flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  {item} <ChevronRight size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5">
                <Link 
                    href="/dashboard" 
                    className="btn-primary w-full !h-16 flex items-center justify-center gap-4"
                    onClick={() => setIsOpen(false)}
                >
                    <LayoutDashboard size={20} /> Launch Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
