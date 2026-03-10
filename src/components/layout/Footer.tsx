import Link from "next/link";
import { Shield, Twitter, Linkedin, Github, Heart, Lock as LockIcon, History, Activity, Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-bg-deep pt-32 pb-16 overflow-hidden z-10">
      {/* Footer Mesh */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 relative z-10">
          <div className="space-y-8">
            <Link href="/" className="group flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                <Shield size={20} />
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase italic">
                MediSafe <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
              Advancing pharmacological safety through decentralized clinical reasoning and autonomous bio-metric monitoring.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Linkedin size={18} />, href: "#" },
                { icon: <Github size={18} />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 hover:text-primary hover:bg-white/10 transition-all border border-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
              <Activity size={14} className="text-primary" /> Architecture
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { label: "Safety Engine", href: "/checker" },
                { label: "Vision Vision", href: "/scanner" },
                { label: "Clinical Vault", href: "/vault" },
                { label: "Patient OS", href: "/dashboard" }
              ].map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className="text-sm font-bold text-slate-500 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
              <LockIcon size={14} className="text-primary" /> Compliance
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { label: "Safety Protocols", href: "#" },
                { label: "Data Integrity", href: "#" },
                { label: "Privacy Core", href: "#" },
                { label: "Legal Framework", href: "#" }
              ].map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className="text-sm font-bold text-slate-500 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="card-premium !bg-white/[0.02] border-white/5 !p-8 space-y-6">
            <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-3">
               Clinical Disclosure
            </h4>
            <p className="text-xs font-bold text-slate-500 leading-relaxed italic">
              Computational results are for clinical reference only. Continuous physiological monitoring and professional medical oversight are mandated for all pharmaceutical interactions.
            </p>
            <div className="pt-4 flex items-center justify-between text-[9px] font-black text-slate-700 uppercase tracking-widest">
                <span>Certified Protocol</span>
                <Brain size={16} />
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} MEDISAFE AI ARCHITECTURE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
            DEPLOYED WITH <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> FOR PATIENT INTEGRITY
          </div>
        </div>
      </div>
    </footer>
  );
}
