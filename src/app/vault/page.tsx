"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Pill, Plus, Trash2, Edit2, Clock, Calendar, Bookmark,
    Activity, AlertTriangle, ChevronRight, Save, Shield, Info, X, Search,
    LayoutGrid, List, Sparkles, Database, FileText, ChevronDown, Lock as LockIcon, ArrowRight,
    Zap, Microscope, Layers, Archive, History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Medicine {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    timing: string;
    purpose: string;
    startDate: string;
    notes: string;
}

export default function VaultPage() {
    const [vault, setVault] = useState<Medicine[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newMed, setNewMed] = useState<Partial<Medicine>>({
        timing: "Morning",
        frequency: "Daily"
    });
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    useEffect(() => {
        const saved = localStorage.getItem("medisafe_vault");
        if (saved) setVault(JSON.parse(saved));
    }, []);

    const saveVault = (updated: Medicine[]) => {
        setVault(updated);
        localStorage.setItem("medisafe_vault", JSON.stringify(updated));
    };

    const handleSaveMed = () => {
        if (!newMed.name?.trim()) {
            setError("Medicine name is required.");
            return;
        }

        const medEntry: Medicine = {
            id: editingId || Date.now().toString(),
            name: newMed.name || "",
            dosage: newMed.dosage || "",
            frequency: newMed.frequency || "Daily",
            timing: newMed.timing || "Morning",
            purpose: newMed.purpose || "",
            startDate: newMed.startDate || new Date().toISOString().split('T')[0],
            notes: newMed.notes || ""
        };

        let updatedVault;
        if (editingId) {
            updatedVault = vault.map(m => m.id === editingId ? medEntry : m);
        } else {
            updatedVault = [...vault, medEntry];
        }

        saveVault(updatedVault);
        closeForm();
    };

    const editMed = (med: Medicine) => {
        setNewMed(med);
        setEditingId(med.id);
        setIsAdding(true);
        setError(null);
    };

    const deleteMed = (id: string) => {
        if (confirm("Are you sure you want to remove this medication?")) {
            const updated = vault.filter(m => m.id !== id);
            saveVault(updated);
        }
    };

    const closeForm = () => {
        setIsAdding(false);
        setEditingId(null);
        setNewMed({ timing: "Morning", frequency: "Daily" });
        setError(null);
    };

    const filteredVault = vault.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-content relative min-h-screen">
            {/* Premium Gradient Top Shell */}
            <div className="dashboard-shell"></div>

            <header className="mb-16 animate-fade relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-2 bg-blue-500/10 w-fit px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 mx-auto lg:mx-0">
                            <Archive size={12} className="text-blue-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                                Molecular Asset Repository
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Treatment <span className="text-gradient">Vault</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-xl">Secure clinical archiving and chronotherapy scheduling for complex pharmaceutical history.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-[32px] border border-white/5 backdrop-blur-xl">
                        <div className="relative group flex-1 min-w-[300px]">
                            <input
                                type="text"
                                placeholder="Scan vault assets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-premium !border-none !bg-transparent !pl-14 !h-[64px]"
                            />
                            <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                        </div>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="btn-primary !h-[64px] !px-10 shadow-primary/20"
                        >
                            <Plus size={20} /> Add Entry
                        </button>
                    </div>
                </div>
            </header>

            {/* Global Stats Matrix */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative z-10">
                {[
                    { label: "Active Molecules", val: vault.length, icon: Pill, color: "text-blue-400", bg: "bg-blue-500/10", tag: "Stored" },
                    { label: "Vault Integrity", val: "Optimal", icon: Shield, color: "text-emerald-400", bg: "bg-emerald-500/10", tag: "Secure" },
                    { label: "System Uptime", val: "99.9%", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", tag: "Active" },
                    { label: "Archive Size", val: `${(vault.length * 2.4).toFixed(1)} KB`, icon: Database, color: "text-indigo-400", bg: "bg-indigo-500/10", tag: "AES-256" }
                ].map((stat, i) => (
                    <div key={i} className="card-premium !bg-white/[0.02] border-white/5 !p-8 flex flex-col items-start gap-6 hover:border-primary/20 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform">
                            <stat.icon size={120} />
                        </div>
                        <div className="flex justify-between items-start w-full relative z-10">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center border border-white/5 shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
                                <stat.icon size={28} />
                            </div>
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] border border-white/5 px-3 py-1.5 rounded-full">{stat.tag}</span>
                        </div>
                        <div className="relative z-10">
                            <p className="label-caps !text-[10px] !m-0 !text-slate-500 mb-1">{stat.label}</p>
                            <p className="text-4xl font-black text-white tracking-tighter">{stat.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 relative z-10">
                <div className="flex items-center gap-10">
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-3 rounded-xl transition-all duration-500 ${viewMode === "grid" ? "bg-primary shadow-2xl shadow-primary/20 text-white scale-110" : "text-slate-500 hover:text-slate-300"}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-3 rounded-xl transition-all duration-500 ${viewMode === "list" ? "bg-primary shadow-2xl shadow-primary/20 text-white scale-110" : "text-slate-500 hover:text-slate-300"}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-[2px] bg-white/5"></div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">{filteredVault.length} Clinical Records Detected</span>
                    </div>
                </div>

                <Link href="/checker" className="group flex items-center gap-4 text-[10px] font-black uppercase text-white tracking-[0.3em] bg-white/5 px-10 py-5 rounded-full hover:bg-white/10 transition-all border border-white/5 shadow-2xl">
                    Run Interaction Matrix Protocol <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>

            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10" : "space-y-6 relative z-10"}>
                <AnimatePresence>
                    {filteredVault.map((med, i) => (
                        <motion.div
                            layout
                            key={med.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`card-premium group relative overflow-hidden !bg-white/[0.02] border-white/5 hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-700 ${viewMode === "list" ? "flex items-center justify-between !p-6" : "!p-10"}`}
                        >
                            <div className={viewMode === "list" ? "flex items-center gap-16 flex-1" : ""}>
                                <div className={`flex items-center gap-8 ${viewMode === "grid" ? "mb-10" : ""}`}>
                                    <div className="w-20 h-20 bg-grad-dark text-primary rounded-[32px] flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-grad-primary group-hover:text-white transition-all duration-700 shadow-2xl relative overflow-hidden">
                                         <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <Pill size={40} className="relative z-10" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white tracking-tighter leading-tight mb-2">{med.name}</h3>
                                        <div className="flex items-center gap-3">
                                            <Layers size={14} className="text-primary" />
                                            <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em]">{med.dosage || "Universal Gradient Agent"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`grid ${viewMode === "list" ? "grid-cols-3 flex-1" : "grid-cols-2"} gap-10 ${viewMode === "grid" ? "mb-12" : ""}`}>
                                    <div className="space-y-3">
                                        <p className="label-caps !text-[9px] !text-slate-600 flex items-center gap-2 tracking-[0.3em]"><Clock size={10} /> Schedule Hub</p>
                                        <div className="flex items-center gap-3 text-sm font-black text-white">
                                            {med.frequency} <div className="h-1 w-1 rounded-full bg-white/20"></div> {med.timing}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="label-caps !text-[9px] !text-slate-600 flex items-center gap-2 tracking-[0.3em]"><Activity size={10} /> Clinical Target</p>
                                        <div className="flex items-center gap-3 text-sm font-black text-white">
                                            {med.purpose || "General Therapy"}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="label-caps !text-[9px] !text-slate-600 flex items-center gap-2 tracking-[0.3em]"><Calendar size={10} /> Cycle Meta</p>
                                        <div className="flex items-center gap-3 text-sm font-black text-slate-400">
                                            {med.startDate}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`flex items-center gap-4 ${viewMode === "list" ? "shrink-0 ml-10" : "border-t border-white/5 pt-10 z-10 relative"}`}>
                                <button onClick={() => editMed(med)} className="flex-1 h-14 bg-white/5 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/5">
                                    Edit Record
                                </button>
                                <button onClick={() => deleteMed(med.id)} className="w-14 h-14 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20">
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div className="absolute -top-10 -right-10 p-16 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none">
                                <Sparkles size={200} className="text-primary" />
                            </div>
                        </motion.div>
                    ))}

                    {filteredVault.length === 0 && (
                        <div className="col-span-full py-48 bg-white/[0.01] rounded-[64px] border-2 border-dashed border-white/5 text-center flex flex-col items-center justify-center">
                            <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center mb-8 border border-white/5">
                                <Database size={48} className="text-slate-800" />
                            </div>
                            <h3 className="text-4xl font-black text-white tracking-tighter mb-4">No Asset Matches</h3>
                            <p className="text-slate-500 font-bold max-w-sm mx-auto text-lg leading-tight mb-12">Universal pharmaceutical archives are empty. Initialize your first clinical treatment entry to activate synchronization.</p>
                            <button onClick={() => setIsAdding(true)} className="btn-primary !px-12 !h-18 shadow-primary/30">
                                <Plus size={24} /> New Entry Hub
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="modal-content !bg-bg-deep/95 backdrop-blur-3xl"
                        >
                            <div className="p-16 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none rotate-45 translate-x-20 -translate-y-20">
                                    <Pill size={400} />
                                </div>

                                <div className="flex items-center justify-between mb-16 relative z-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary"></div>
                                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Secure Clinical Archive</span>
                                        </div>
                                        <h3 className="text-5xl font-black text-white tracking-tighter">{editingId ? "Modify" : "New"} Vault <span className="text-gradient">Agent</span></h3>
                                    </div>
                                    <button onClick={closeForm} className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white transition-all">
                                        <X size={28} />
                                    </button>
                                </div>

                                {error && (
                                    <div className="bg-rose-500/10 p-6 rounded-3xl flex items-center gap-5 text-rose-400 text-sm font-black mb-12 border border-rose-500/20 shadow-2xl">
                                        <AlertTriangle size={24} /> {error}
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-10 mb-16 relative z-10">
                                    <div className="space-y-4">
                                        <label className="label-caps !text-[11px] !text-slate-500 ml-4">Clinical Molecule</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                placeholder="e.g. Atorvastatin..."
                                                value={newMed.name || ""}
                                                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                                                className="input-premium !h-18 !bg-white/[0.03] !border-white/5 focus:!border-primary/50"
                                            />
                                            <Pill className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-primary transition-colors" size={24} />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="label-caps !text-[11px] !text-slate-500 ml-4">Concentration / Strength</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 20mg / 5ml"
                                            value={newMed.dosage || ""}
                                            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                                            className="input-premium !h-18 !bg-white/[0.03] !border-white/5 focus:!border-primary/50"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="label-caps !text-[11px] !text-slate-500 ml-4">Chronotherapy Frequency</label>
                                        <div className="relative">
                                            <select
                                                value={newMed.frequency}
                                                onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                                                className="input-premium appearance-none pr-16 bg-white/[0.03] !border-white/5 !h-18 cursor-pointer"
                                            >
                                                <option>Daily</option>
                                                <option>Twice Daily</option>
                                                <option>Morning & Night</option>
                                                <option>Weekly</option>
                                                <option>Monthly</option>
                                                <option>As Needed (PRN)</option>
                                            </select>
                                            <ChevronDown size={24} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="label-caps !text-[11px] !text-slate-500 ml-4">Therapeutic Target</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Chronic Inflammation..."
                                            value={newMed.purpose || ""}
                                            onChange={(e) => setNewMed({ ...newMed, purpose: e.target.value })}
                                            className="input-premium !h-18 !bg-white/[0.03] !border-white/5 focus:!border-primary/50"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-6 relative z-10 pt-12 border-t border-white/5">
                                    <button onClick={closeForm} className="flex-1 h-20 bg-white/5 text-slate-500 rounded-[32px] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all">
                                        Discard
                                    </button>
                                    <button onClick={handleSaveMed} className="flex-[2] btn-primary !h-20 !text-[11px] uppercase tracking-[0.3em] gap-5 shadow-2xl shadow-primary/20">
                                        <Save size={24} />
                                        Commit Clinical Entry
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 1000;
                    background: rgba(2, 6, 23, 0.95);
                    backdrop-filter: blur(24px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 32px;
                }
                .modal-content {
                    width: 100%;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 64px;
                    border: 1px solid rgba(255,255,255,0.08);
                    box-shadow: 0 40px 100px -20px rgba(0,0,0,0.8);
                }
                option {
                    background: #020617;
                    color: white;
                    padding: 20px;
                }
            `}</style>
        </div>
    );
}
