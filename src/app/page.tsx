"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import {
  Shield, Brain, Pill, AlertCircle,
  ArrowRight, LayoutDashboard, Sparkles, Database,
  Lock as LockIcon, Zap, Microscope, FileCheck, Star,
  Activity, Command, Cpu, Globe, Heart
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      href: "/checker",
      icon: <Shield size={32} />,
      title: "Interaction Hub",
      desc: "Instant molecular cross-referencing of up to 10 clinical agents with deep pharmacological risk grading.",
      colorClass: "bg-blue-500/10 text-primary border-primary/20",
      badge: "Institutional 2.0"
    },
    {
      href: "/scanner",
      icon: <Microscope size={32} />,
      title: "Neural Rx Vision",
      desc: "Autonomous decoding of complex clinical transcripts and handwritten prescriptions via vision transformers.",
      colorClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      badge: "Clinical OCR"
    },
    {
      href: "/assistant",
      icon: <Brain size={32} />,
      title: "Health Intelligence",
      desc: "Your proprietary neurological node for real-time pharmaceutical safety reasoning and data synthesis.",
      colorClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      badge: "Neural V2.4"
    },
    {
      href: "/vault",
      icon: <Database size={32} />,
      title: "Molecular Vault",
      desc: "Secure health data infrastructure with AES-256 encryption and real-time safety signal monitoring.",
      colorClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      badge: "Secure Protocol"
    }
  ];

  const stats = [
    { label: "Molecules Indexed", value: "840k+", icon: <Pill size={28} /> },
    { label: "Reasoning Accuracy", value: "99.98%", icon: <Zap size={28} /> },
    { label: "Verified Nodes", value: "240+", icon: <Globe size={28} /> }
  ];

  return (
    <div className="bg-bg-deep min-h-screen selection:bg-primary/30 selection:text-white overflow-x-hidden">
      {/* Immersive Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[160px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[140px] rounded-full"></div>
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-indigo-600/5 blur-[120px] rounded-full opacity-60"></div>
      </div>

      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-56 overflow-hidden z-10">
        <div className="container relative">
          <div className="flex flex-col items-center text-center max-w-6xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-8 py-3 bg-white/[0.03] rounded-full border border-white/10 backdrop-blur-3xl flex items-center gap-4 shadow-2xl"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/80">
                Foundational Clinical Safety Node
              </span>
            </motion.div>

            <div className="space-y-6">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="text-7xl md:text-9xl font-black text-white leading-[0.9] tracking-[ -0.04em]"
                >
                    The OS for <br /> Pharmaceutical <span className="text-gradient italic">Safety.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-3xl text-slate-500 font-bold max-w-3xl mx-auto leading-relaxed tracking-tight"
                >
                    Autonomous clinical reasoning for interaction conflicts, vision-based Rx decoding, and high-fidelity medication archiving.
                </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 pt-8"
            >
              <Link href="/dashboard" className="btn-primary !px-16 !h-20 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.4)] flex items-center gap-5">
                <LayoutDashboard size={24} /> 
                <span className="text-[12px] font-black uppercase tracking-[0.4em]">Launch Laboratory</span>
              </Link>
              <Link href="/checker" className="h-20 px-16 bg-white/[0.03] rounded-[32px] flex items-center gap-5 text-[12px] font-black uppercase tracking-[0.4em] text-white border border-white/10 hover:bg-white/[0.08] transition-all backdrop-blur-3xl group">
                <Shield size={24} className="text-primary group-hover:scale-110 transition-transform" /> 
                Safety Audit
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.6 }}
              className="pt-16 flex flex-wrap justify-center items-center gap-16"
            >
              {['HIPAA READY', 'AES-256 VAULT', 'CLINICAL VERIFIED', 'NEURAL REASONING'].map((trust, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white group cursor-default">
                  <Heart size={12} className="text-primary opacity-50 group-hover:opacity-100 transition-opacity" /> {trust}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Cinematic Particles Backdrop */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full max-w-7xl opacity-20">
            <div className="absolute top-[30%] left-[5%] w-px h-80 bg-gradient-to-b from-primary to-transparent"></div>
            <div className="absolute top-[10%] right-[5%] w-px h-80 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </section>

      {/* High-Fidelity Stats Grid */}
      <section className="pb-48 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium !bg-white/[0.01] border-white/5 !p-16 text-center group relative overflow-hidden active:scale-95 transition-all duration-700"
              >
                <div className="absolute inset-0 bg-grad-primary opacity-0 group-hover:opacity-[0.02] transition-opacity"></div>
                <div className="w-20 h-20 bg-grad-dark rounded-[32px] flex items-center justify-center text-primary mx-auto mb-10 border border-white/5 shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700">
                  {stat.icon}
                </div>
                <h3 className="text-5xl font-black text-white mb-3 tracking-tighter">{stat.value}</h3>
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center text-center mb-32 space-y-6">
            <div className="w-24 h-1 bg-grad-primary rounded-full mb-6"></div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Autonomous Clinical <span className="text-gradient italic">Operating Matrix.</span></h2>
            <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">Neural-grade agents engineered for zero-trust pharmacological safety.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group card-premium !p-12 border-white/5 hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-700 relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none scale-150 rotate-12">
                     {feature.icon}
                 </div>
                <div className={`w-20 h-20 ${feature.colorClass} border rounded-[32px] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 shadow-2xl`}>
                  {feature.icon}
                </div>
                <div className="text-[10px] font-black uppercase text-primary mb-6 bg-primary/10 px-5 py-2 rounded-full inline-block tracking-[0.3em] border border-primary/20">
                  {feature.badge}
                </div>
                <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">{feature.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed mb-12 text-md italic">
                  "{feature.desc}"
                </p>
                <Link href={feature.href} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-primary/40 group-hover:text-primary transition-all">
                  INITIALIZE NODE <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform shadow-[0_0_20px_#2563eb]" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Intelligence Callout */}
      <section className="pb-48 relative z-10">
        <div className="container">
          <div className="card-premium !bg-grad-dark !p-16 lg:!p-32 border-white/5 relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-primary/20 blur-[200px] -mr-96 -mt-96 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10 grid lg:grid-cols-[1fr_500px] gap-24 items-center">
              <div className="space-y-12 text-center lg:text-left">
                <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center text-primary border border-white/5 shadow-2xl mx-auto lg:mx-0 group-hover:rotate-12 transition-transform">
                    <Cpu size={48} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95]">Deterministic <br /> Pharmacology.</h2>
                  <p className="text-2xl text-slate-500 font-bold leading-relaxed max-w-2xl italic">
                    "Every molecular conflict identified by MediSafe is synthesized through a decentralized grid of clinical safety repositories and FDA clinical registries."
                  </p>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  {['TLS 1.3', 'AES-256', 'HIPAA', 'SOC2'].map(sys => (
                    <div key={sys} className="px-8 py-5 bg-white/5 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-all">
                        <p className="text-[10px] font-black uppercase text-slate-600 mb-1">Standard</p>
                        <p className="text-white font-black text-xl tracking-tighter">{sys}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-12">
                <div className="p-12 bg-white/[0.03] rounded-[64px] border border-white/10 backdrop-blur-3xl space-y-10 group-hover:border-primary/30 transition-all duration-700 shadow-3xl">
                    <div className="w-20 h-20 bg-grad-primary rounded-[32px] flex items-center justify-center text-white shadow-3xl">
                        <LockIcon size={40} />
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-2xl font-black text-white tracking-tight">Access Control Protocol</h4>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                            Biometric clinical data is strictly indexed at the user level. No telemetry is shared with central clinical registries without explicit node consensus.
                        </p>
                    </div>
                    <Link href="/dashboard" className="btn-primary w-full !h-20 flex items-center justify-center gap-5 shadow-primary/30 group">
                      <LayoutDashboard size={24} /> 
                      <span className="text-[11px] font-black uppercase tracking-[0.4em]">Initialize Session</span>
                    </Link>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-primary" fill="currentColor" />)}
                    </div>
                    <p className="text-[11px] font-black text-slate-700 uppercase tracking-[0.5em]">Trusted by 12,000+ Health Practitioners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
