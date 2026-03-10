"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle2, Circle, AlertCircle, Calendar, ChevronRight, Trophy, Flame, Zap, Shield, Info as InfoIcon, Lock as LockIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ScheduleItem {
    id: string;
    medName: string;
    dosage: string;
    time: string;
    taken: boolean;
}

export default function SchedulePage() {
    const [todaySchedule, setTodaySchedule] = useState<ScheduleItem[]>([]);
    const [streak, setStreak] = useState(5);

    useEffect(() => {
        const savedVault = localStorage.getItem("medisafe_vault");
        if (savedVault) {
            const parsed = JSON.parse(savedVault);
            const schedule: ScheduleItem[] = [];
            parsed.forEach((m: any) => {
                const times = m.frequency === "Twice Daily" ? ["08:00 AM", "08:00 PM"] : ["09:00 AM"];
                times.forEach((t, i) => {
                    schedule.push({
                        id: `${m.id}-${i}`,
                        medName: m.name,
                        dosage: m.dosage,
                        time: t,
                        taken: false
                    });
                });
            });
            setTodaySchedule(schedule);
        }
    }, []);

    const toggleTaken = (id: string) => {
        setTodaySchedule(prev => prev.map(item =>
            item.id === id ? { ...item, taken: !item.taken } : item
        ));
    };

    const takenCount = todaySchedule.filter(s => s.taken).length;
    const progress = todaySchedule.length > 0 ? (takenCount / todaySchedule.length) * 100 : 0;

    return (
        <div className="main-content">
            <header className="mb-12 animate-fade">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-2 bg-primary/10 w-fit px-4 py-1.5 rounded-full border border-primary/20 mb-6">
                            <Clock size={12} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                Daily Adherence Protocol
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Adherence <span className="text-gradient">Matrix</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-xl">Synchronized chronotherapy schedule and real-time ingestion tracking.</p>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative flex items-center gap-5 bg-white/5 px-8 py-5 rounded-[32px] border border-white/5 backdrop-blur-xl">
                            <div className="w-14 h-14 bg-grad-dark rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                                <Flame size={32} />
                            </div>
                            <div>
                                <span className="text-3xl font-black text-white">{streak}</span>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Day Sequence Streak</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="card-premium !bg-grad-dark !p-10 mb-12 border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 relative z-10">
                    <div className="space-y-2">
                        <h3 className="text-3xl font-black text-white">{Math.round(progress)}% Completed</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{takenCount} of {todaySchedule.length} Molecular Units Administered</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Target Threshold</p>
                        <p className="text-sm font-bold text-white">100% Protocol Completion</p>
                    </div>
                </div>

                <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 relative z-10">
                    <motion.div
                        className="h-full bg-grad-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>
            </section>

            <div className="grid lg:grid-cols-[1fr_320px] gap-12">
                <main className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {todaySchedule.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-premium !bg-white/[0.01] !py-32 text-center flex flex-col items-center gap-6">
                                <AlertCircle size={64} className="text-white/10" />
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-black text-white">Empty Manifest</h4>
                                    <p className="text-slate-500 font-medium">No medications identified in current vault. Populate to generate schedule.</p>
                                </div>
                            </motion.div>
                        ) : (
                            todaySchedule.sort((a, b) => a.time.localeCompare(b.time)).map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group card-premium !p-8 flex items-center gap-8 cursor-pointer transition-all duration-300 ${
                                        item.taken ? 'opacity-40 grayscale border-emerald-500/20' : 'hover:bg-white/5 border-white/5'
                                    }`}
                                    onClick={() => toggleTaken(item.id)}
                                >
                                    <div className={`w-20 font-black text-lg tracking-tighter ${item.taken ? 'text-slate-500' : 'text-primary'}`}>
                                        {item.time}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className={`text-xl font-black tracking-tight transition-all ${item.taken ? 'text-slate-500 line-through' : 'text-white'}`}>
                                            {item.medName}
                                        </h4>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.dosage}</p>
                                    </div>
                                    <div className="shrink-0">
                                        {item.taken ? (
                                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                                <CheckCircle2 size={28} />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-700 border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-all">
                                                <Circle size={28} />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </main>

                <aside className="space-y-8">
                    <div className="card-premium !bg-grad-primary !p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-20 rotate-12 group-hover:rotate-6 transition-transform">
                            <Trophy size={100} className="text-white" />
                        </div>
                        <div className="relative z-10 text-white space-y-4">
                            <h4 className="text-xl font-black tracking-tight">Health Apex</h4>
                            <p className="text-sm font-bold text-white/80 leading-relaxed italic">
                                "95% adherence benchmark achieved this cycle. Optimal molecular stabilization in progress."
                            </p>
                        </div>
                    </div>

                    <div className="card-premium !bg-white/[0.02] border-white/5 !p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary border border-white/5">
                                <Zap size={20} />
                            </div>
                            <h4 className="text-[12px] font-black text-white uppercase tracking-widest">Protocol Alerts</h4>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                            Dose reminders are broadcasted 15 minutes prior to molecular intake schedule.
                        </p>
                        <button className="w-full h-12 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                            Configuration
                        </button>
                    </div>

                    <div className="p-8 bg-grad-dark border border-white/5 rounded-[40px] flex items-start gap-4 opacity-50">
                        <Info size={18} className="text-primary shrink-0 mt-1" />
                        <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic">
                            Schedule generated using localized frequency vectors. Verify chronotherapy timings with clinical documentation.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

const Info = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
