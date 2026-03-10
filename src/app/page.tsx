"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import {
  Shield, Brain, Pill, History, AlertCircle,
  ChevronRight, ArrowRight, CheckCircle2,
  Activity, Star, Beaker, GraduationCap, LayoutDashboard, Sparkles, Database,
  Lock, Zap, Microscope, FileCheck
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      href: "/checker",
      icon: <Shield size={32} />,
      title: "Interaction Checker",
      desc: "Cross-reference up to 10 medicines instantly with deep pharmacological reasoning and risk grading.",
      colorClass: "bg-blue-50 text-blue-600",
      badge: "Clinical Standard"
    },
    {
      href: "/scanner",
      icon: <Microscope size={32} />,
      title: "Prescription Vision",
      desc: "Scan and decode complex handwritten prescriptions using medical-grade computer vision transformers.",
      colorClass: "bg-emerald-50 text-emerald-600",
      badge: "Vision AI 2.0"
    },
    {
      href: "/vault",
      icon: <Database size={32} />,
      title: "Health Vault",
      desc: "Securely manage your treatment history with automated real-time safety monitoring and risk alerts.",
      colorClass: "bg-indigo-50 text-indigo-600",
      badge: "Bank-Grade Security"
    },
    {
      href: "/timeline",
      icon: <History size={32} />,
      title: "Safety Timeline",
      desc: "Monitor your treatment progression and capture potential adverse reaction signals over time.",
      colorClass: "bg-purple-50 text-purple-600",
      badge: "Treatment History"
    }
  ];

  const stats = [
    { label: "Drugs Analyzed", value: "350k+", icon: <Pill size={18} /> },
    { label: "Safety Confidence", value: "99.8%", icon: <Star size={18} /> },
    { label: "Clinical Sources", value: "50+", icon: <FileCheck size={18} /> }
  ];

  return (
    <div className="home-page overflow-x-hidden">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="badge-clinical mb-8 bg-blue-500/10 text-blue-600"
              >
                <Sparkles size={14} /> Next-Generation Medicine Safety
              </motion.div>

              <h1 className="text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8">
                Medicine Safety, <span className="text-primary italic">Perfected</span> by AI.
              </h1>

              <p className="text-xl text-slate-500 leading-relaxed mb-10">
                MediSafe AI identifies life-threatening drug interactions, decodes prescription handwriting, and monitors your treatment risks with clinical-grade reasoning.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/checker" className="btn-primary py-5 px-10 rounded-2xl shadow-blue-500/20 hover:scale-[1.02] flex items-center justify-center gap-3">
                  <Shield size={20} /> Check Interaction
                </Link>
                <Link href="/scanner" className="btn-secondary py-5 px-10 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center gap-3">
                  <Brain size={20} /> Scan Prescription
                </Link>
              </div>

              <div className="flex items-center gap-10 grayscale opacity-40">
                <div className="flex items-center gap-2 font-bold text-sm"><Shield size={20} /> HIPPA Ready</div>
                <div className="flex items-center gap-2 font-bold text-sm"><Lock size={20} /> AES-256 Vault</div>
                <div className="flex items-center gap-2 font-bold text-sm"><CheckCircle2 size={20} /> Verified Data</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[48px] overflow-hidden border-8 border-white shadow-2xl skew-x-1 shadow-blue-500/10">
                <img
                  src="/medisafe_ai_dashboard_mockup_1773042398763.png"
                  alt="MediSafe AI Dashboard Preview"
                  className="w-full h-auto scale-105 hover:scale-100 transition-transform duration-1000"
                />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass-morphism p-6 rounded-3xl shadow-xl z-20 border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Interaction Status</p>
                    <p className="font-black text-slate-800">Clear & Safe</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 glass-morphism p-6 rounded-3xl shadow-xl z-20 border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                    <Activity size={24} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Safety Index</p>
                    <p className="font-black text-slate-800">Score: 98/100</p>
                  </div>
                </div>
              </motion.div>

              {/* Background gradient blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="container mb-32">
        <div className="bg-white rounded-[40px] p-2 shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {stats.map((stat, i) => (
              <div key={i} className={`p-10 flex items-center justify-center gap-8 ${i !== 2 ? 'border-r border-slate-50' : ''}`}>
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-primary/40">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-black tracking-tighter text-slate-900">{stat.value}</h3>
                  <p className="text-xs uppercase font-black text-slate-400 tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-premium bg-slate-50/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-5xl font-black tracking-tight mb-6">Designed for Patient <span className="text-primary italic">Certainty</span></h2>
            <p className="text-xl text-slate-500">Every feature is built on validated pharmaceutical data and the latest clinical safety protocols.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="card-premium group"
              >
                <div className={`w-16 h-16 ${feature.colorClass} rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>
                  {feature.icon}
                </div>
                <div className="text-[10px] font-black uppercase text-primary mb-3 bg-primary/5 px-3 py-1 rounded-full inline-block">
                  {feature.badge}
                </div>
                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8">{feature.desc}</p>
                <Link href={feature.href} className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 group-hover:text-primary transition-colors">
                  Launch Engine <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-slate-900 rounded-[48px] p-12 lg:p-20 relative overflow-hidden text-center text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-10">
                <AlertCircle size={32} className="text-blue-400" />
              </div>
              <h2 className="text-4xl font-black mb-6">Medical Data Transparency</h2>
              <p className="text-xl text-slate-300/80 leading-relaxed italic">
                "MediSafe AI is a clinical reference and educational platform. It does not replace the expertise of a licensed physician or pharmacist. Always consult a healthcare professional before altering your medication regimen."
              </p>
              <div className="mt-12 flex items-center justify-center gap-6">
                <Link href="/dashboard" className="btn-primary px-10 rounded-2xl">Create Profile</Link>
                <p className="text-sm font-bold text-slate-400">Trusted by over 10,000+ users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

