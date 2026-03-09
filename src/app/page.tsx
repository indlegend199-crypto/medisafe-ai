"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import {
  Shield, Brain, Pill, History, AlertCircle,
  ChevronRight, ArrowRight, CheckCircle2,
  Activity, Star, Beaker, GraduationCap, LayoutDashboard, Sparkles, Database
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      href: "/checker",
      icon: <Shield size={32} />,
      title: "Interaction Checker",
      desc: "Cross-reference up to 10 medicines instantly with deep pharmacological reasoning.",
      colorClass: "bg-emerald-50 text-emerald-500",
      badge: "Clinical Standard"
    },
    {
      href: "/scanner",
      icon: <Brain size={32} />,
      title: "Vision Interpreter",
      desc: "Scan and decode handwritten prescriptions using advanced computer vision.",
      colorClass: "bg-blue-50 text-blue-500",
      badge: "Real-time OCR"
    },
    {
      href: "/vault",
      icon: <Database size={32} />,
      title: "Medication Vault",
      desc: "Securely store and manage your treatment profile with automated safety monitoring.",
      colorClass: "bg-indigo-50 text-indigo-500",
      badge: "Secure Profile"
    },
    {
      href: "/checker",
      icon: <GraduationCap size={32} />,
      title: "Student Mode",
      desc: "Detailed molecular pathways and receptor data for medical professionals.",
      colorClass: "bg-amber-50 text-amber-500",
      badge: "Academic Grade"
    }
  ];

  return (
    <div className="home-page overflow-x-hidden">
      <NavBar />

      {/* Hero Section */}
      <section className="hero relative pt-40 pb-32">
        <div className="container hero-container relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-content"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hero-badge animate-float"
            >
              <Sparkles size={14} className="text-amber-500" /> AI-Driven Precision Care
            </motion.div>

            <h1 className="hero-title">
              Patient Safety <br />
              <span className="text-primary italic">Re-Imagined</span> <br />
              with AI.
            </h1>

            <p className="hero-subtitle">
              MediSafe AI identifies life-threatening drug interactions, explains complex treatment logic, and monitors your health safety score with clinical reasoning.
            </p>

            <div className="hero-actions flex gap-4 mt-8">
              <Link href="/dashboard" className="btn-primary hover-glow scale-105">
                Open Dashboard <ArrowRight size={20} />
              </Link>
              <Link href="/checker" className="btn-secondary glass-morphism">
                Start Analysis
              </Link>
            </div>

            <div className="trust-layer mt-12 flex gap-8 opacity-60">
              <div className="flex items-center gap-2 text-sm font-bold"><Shield size={16} /> Privacy Secure</div>
              <div className="flex items-center gap-2 text-sm font-bold"><CheckCircle2 size={16} /> Clinically Verified</div>
            </div>
          </motion.div>

          {/* Interactive Floating Card Visual */}
          <motion.div
            initial={{ opacity: 0, rotateY: 20, rotateX: 10 }}
            animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
            transition={{ duration: 1.2 }}
            className="hero-visual perspective-1000 hidden lg:block"
          >
            <div className="glass-morphism p-8 rounded-[40px] border-2 border-white/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Activity className="text-primary animate-pulse" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Patient Pulse</p>
                    <h4 className="font-bold text-slate-800">Safety Index: 98%</h4>
                  </div>
                </div>
                <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Secure</div>
              </div>

              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse"></div>
                <div className="flex gap-4">
                  <div className="h-20 bg-primary/5 rounded-2xl w-1/2 flex items-center justify-center">
                    <Pill className="text-primary/40" size={32} />
                  </div>
                  <div className="h-20 bg-primary/5 rounded-2xl w-1/2 flex items-center justify-center">
                    <Beaker className="text-primary/40" size={32} />
                  </div>
                </div>
                <div className="bg-slate-900 text-white p-4 rounded-3xl text-xs font-medium leading-relaxed shadow-xl">
                  AI: "No severe interactions found between Atorvastatin and Metformin. Kidney protection active."
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-400/5 blur-[120px] rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats - Premium Glass Bar */}
      <section className="container mb-32">
        <div className="glass-morphism rounded-[32px] p-1 shadow-inner border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { label: "Drugs Monitored", value: "250,000+", icon: <Pill size={18} /> },
              { label: "Interaction Confidence", value: "99.4%", icon: <Star size={18} /> },
              { label: "Active Monitors", value: "10,000+", icon: <Activity size={18} /> }
            ].map((stat, i) => (
              <div key={i} className={`p-8 bg-white/40 backdrop-blur-md text-center rounded-3xl flex flex-col items-center gap-2 ${i === 1 ? 'border-x border-slate-200' : ''}`}>
                <div className="text-primary/60 mb-1">{stat.icon}</div>
                <h3 className="text-4xl font-black text-slate-900">{stat.value}</h3>
                <p className="text-xs uppercase font-black text-slate-400 tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container pb-40">
        <div className="section-header max-w-2xl mx-auto text-center mb-20 animate-slide-up">
          <h2 className="text-5xl font-black mb-6 tracking-tighter">Clinical Precision at Scale</h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Harness the power of medical-grade AI to ensure every dose is safe, explained, and monitored in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="feature-card-premium group"
            >
              <Link href={feature.href} className="block p-10 bg-white rounded-[40px] border border-slate-100 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/20">
                <div className={`f-icon-new mb-8 ${feature.colorClass} w-16 h-16 rounded-[20px] flex items-center justify-center shadow-inner`}>
                  {feature.icon}
                </div>
                <div className="text-[10px] font-black uppercase text-primary mb-3 tracking-widest bg-primary/5 inline-block px-3 py-1 rounded-full">
                  {feature.badge}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 group-hover:text-primary transition-all">
                  Launch Engine <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Professional Footer */}
      <Footer />

      <style jsx>{`
        .hero-title {
            font-size: clamp(3rem, 10vw, 5.5rem);
            line-height: 0.95;
            letter-spacing: -0.05em;
            margin-bottom: 24px;
            font-weight: 900;
        }
        .hero-subtitle {
            font-size: 1.125rem;
            color: #64748b;
            max-width: 500px;
            line-height: 1.7;
        }
        .hero-container {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 40px;
            align-items: center;
        }
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: white;
            padding: 8px 16px;
            border-radius: 999px;
            font-weight: 800;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            border: 1px solid #f1f5f9;
            margin-bottom: 32px;
        }
        .hover-glow:hover {
            box-shadow: 0 0 30px rgba(37, 99, 235, 0.4);
        }
        .perspective-1000 {
            perspective: 1000px;
        }
        .feature-card-premium {
            cursor: pointer;
        }
        
        @media (max-width: 1024px) {
            .hero-container {
                grid-template-columns: 1fr;
                text-align: center;
            }
            .hero-subtitle {
                margin: 0 auto;
            }
            .hero-actions {
                justify-content: center;
            }
            .trust-layer {
                justify-content: center;
            }
        }
      `}</style>
    </div>
  );
}
