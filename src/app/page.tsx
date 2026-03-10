"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import {
  Shield, Brain, Pill, AlertCircle,
  ArrowRight, LayoutDashboard, Sparkles, Database,
  Lock as LockIcon, Zap, Microscope, FileCheck, Star
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      href: "/checker",
      icon: <Shield size={32} />,
      title: "Interaction Checker",
      desc: "Instant cross-referencing of up to 10 medicines with deep pharmacological reasoning and risk grading.",
      colorClass: "bg-blue-500/10 text-primary border-primary/20",
      badge: "Clinical Standard"
    },
    {
      href: "/scanner",
      icon: <Microscope size={32} />,
      title: "Prescription Vision",
      desc: "Decode complex medical transcripts and handwritten prescriptions using neural vision transformers.",
      colorClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      badge: "Vision AI 2.0"
    },
    {
      href: "/vault",
      icon: <Database size={32} />,
      title: "Health Vault",
      desc: "Secure health data infrastructure with real-time safety monitoring and decentralized risk alerts.",
      colorClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      badge: "AES-256 Protocol"
    },
    {
      href: "/timeline",
      icon: <Database size={32} />, // Reusing database for timeline in this view
      title: "Safety Timeline",
      desc: "A chronological audit of treatment progression and adverse reaction signal synchronization.",
      colorClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      badge: "Audit Ready"
    }
  ];

  const stats = [
    { label: "Drugs Analyzed", value: "350k+", icon: <Pill size={24} /> },
    { label: "Clinical Precision", value: "99.9%", icon: <Star size={24} /> },
    { label: "Clinical Repos", value: "85+", icon: <FileCheck size={24} /> }
  ];

  return (
    <div className="bg-bg-deep min-h-screen selection:bg-primary/30 selection:text-white overflow-x-hidden">
      {/* Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] bg-indigo-600/10 blur-[100px] rounded-full opacity-60"></div>
      </div>

      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 overflow-hidden z-10">
        <div className="container relative">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-xl flex items-center gap-3"
            >
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
                Pioneering Autonomous Patient Safety
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tight"
            >
              The Clinical <br /> Intelligence <span className="text-gradient italic">Operating System.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl leading-relaxed"
            >
              MediSafe AI identifies life-threatening interactions, decodes complex medical vision data, and monitors bio-metric safety with neural reasoning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Link href="/dashboard" className="btn-primary !px-12 !h-16 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] shadow-primary/20">
                <LayoutDashboard size={20} /> Launch Dashboard
              </Link>
              <Link href="/checker" className="h-16 px-12 bg-white/5 rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-white border border-white/10 hover:bg-white/10 transition-all">
                <Shield size={20} className="text-primary" /> Run Safety Check
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="pt-12 flex flex-wrap justify-center items-center gap-12"
            >
              {['HIPAA READY', 'AES-256 VAULT', 'VERIFIED DATA', 'CLINICAL GRADE'].map((trust, i) => (
                <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white">
                  <div className="w-1 h-1 bg-primary rounded-full"></div> {trust}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full max-w-7xl">
            <div className="absolute top-[20%] left-[10%] w-px h-64 bg-grad-primary opacity-20 hidden lg:block"></div>
            <div className="absolute bottom-[20%] right-[10%] w-px h-64 bg-grad-primary opacity-20 hidden lg:block"></div>
        </div>
      </section>

      {/* Product Preview Cards Mesh */}
      <section className="pb-48 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium !bg-white/[0.02] border-white/5 !p-12 text-center group active:scale-95 transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] group-hover:shadow-primary/30 transition-all">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">System <span className="text-gradient italic">Capabilities</span></h2>
            <p className="text-lg text-slate-500 font-bold">Autonomous agents engineered for deterministic pharmacological safety.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group card-premium !p-10 border-white/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-500"
              >
                <div className={`w-16 h-16 ${feature.colorClass} border rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <div className="text-[9px] font-black uppercase text-primary mb-4 bg-primary/10 px-4 py-1.5 rounded-full inline-block tracking-[0.2em] border border-primary/20">
                  {feature.badge}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-10 text-sm">
                  {feature.desc}
                </p>
                <Link href={feature.href} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-primary transition-all">
                  INITIALIZE PROTOCOL <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Disclaimer Callout */}
      <section className="pb-40 relative z-10">
        <div className="container">
          <div className="card-premium !bg-grad-dark !p-12 lg:!p-24 border-primary/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/10 blur-[150px] -mr-64 -mt-64 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10 grid lg:grid-cols-[1fr_400px] gap-20 items-center">
              <div className="space-y-8">
                <div className="w-20 h-20 bg-primary/10 rounded-[30px] flex items-center justify-center text-primary border border-primary/20 shadow-2xl">
                    <Shield size={36} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">Clinical Integrity & <br /> Regulatory Data.</h2>
                  <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-2xl italic">
                    "MediSafe AI is a computational pharmacological reference. Every signal generated is cross-indexed with localized clinical safety repositories."
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Architecture</p>
                    <p className="text-white font-black">Neural Medicine Engine</p>
                  </div>
                  <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Compliance</p>
                    <p className="text-white font-black">HIPAA Protected</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-10">
                <div className="p-10 bg-white/5 rounded-[40px] border border-white/5 backdrop-blur-3xl space-y-6">
                    <LockIcon size={32} className="text-primary" />
                    <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
                        All patient medication records are encrypted at rest with AES-256-GCM. Clinical data transmissions utilize TLS 1.3 with Perfect Forward Secrecy.
                    </p>
                    <Link href="/dashboard" className="btn-primary w-full !h-14 flex items-center justify-center gap-3 shadow-primary/20">
                      Begin Secure Session <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="text-center">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest uppercase">Validated by clinicians worldwide</p>
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
