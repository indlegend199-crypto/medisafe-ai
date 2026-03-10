"use client";

import { Brain, Filter, MoreHorizontal } from "lucide-react";
import InteractionAlertCard from "./InteractionAlertCard";

interface Alert {
    type: string;
    meds: string;
    details: string;
    time: string;
    severity: "high" | "medium" | "low";
}

interface InteractionAlertsPanelProps {
    alerts: Alert[];
}

export default function InteractionAlertsPanel({ alerts }: InteractionAlertsPanelProps) {
    return (
        <section className="card-premium h-full flex flex-col !p-12 overflow-hidden relative group">
            {/* Background Molecular Graphic */}
            <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none -rotate-12 translate-x-12 -translate-y-12 transition-transform duration-1000 group-hover:scale-110">
                 <Brain size={400} className="text-primary" />
            </div>
            
            <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                    <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-5">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/10">
                            <Brain size={28} />
                        </div>
                        Real-time Intelligence
                    </h3>
                    <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.5em] mt-3 pl-1">Active Neural Pharmacological Feed</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all hover:bg-white/10 hover:border-white/10">
                        <Filter size={16} /> Matrix Stats
                    </button>
                    <button className="p-3 bg-white/5 rounded-2xl border border-white/5 text-slate-600 hover:text-white transition-all">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-3 custom-scrollbar relative z-10 scroll-smooth">
                {alerts.length > 0 ? (
                    alerts.map((alert, idx) => (
                        <InteractionAlertCard key={idx} {...alert} idx={idx} />
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-40 italic space-y-4">
                        <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center border border-white/5">
                            <Brain size={48} className="text-slate-700" />
                        </div>
                        <p className="text-slate-600 font-bold tracking-widest text-xs uppercase">No Active Conflicts Detected</p>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(37, 99, 235, 0.2);
                }
            `}</style>
        </section>
    );
}
