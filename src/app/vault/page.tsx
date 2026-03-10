"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Pill, Plus, Trash2, Edit2, Clock, Calendar, Bookmark,
    Activity, AlertTriangle, ChevronRight, Save, Shield, Info, X, Search,
    LayoutGrid, List, Sparkles, Database, FileText, ChevronDown, Lock as LockIcon, ArrowRight
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
        <div className="main-content">
            <header className="mb-12 animate-fade">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                                <LockIcon size={12} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                    AES-256 Storage
                                </span>
                            </div>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Medication <span className="text-gradient">Vault</span></h1>
                        <p className="text-slate-400 font-medium text-lg max-w-2xl">Secure clinical archiving for your pharmaceutical treatment history.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search molecular database..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-premium !w-[280px] !pl-12 !h-[60px]"
                            />
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
                        </div>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="btn-primary !h-[60px]"
                        >
                            <Plus size={20} /> Add Entry
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: "Active Molecules", val: vault.length, icon: Pill, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { label: "Confidence", val: "99.8%", icon: Shield, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "Verified Sources", val: "24+", icon: Database, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                    { label: "Vault Integrity", val: "Optimal", icon: Activity, color: "text-purple-400", bg: "bg-purple-500/10" }
                ].map((stat, i) => (
                    <div key={i} className="card-premium !p-6 flex flex-col items-start gap-4 hover:border-white/10 transition-all group">
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center border border-white/5`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="label-caps !text-[9px] mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-white">{stat.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-primary shadow-lg text-white" : "text-slate-500 hover:text-slate-300"}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-primary shadow-lg text-white" : "text-slate-500 hover:text-slate-300"}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{filteredVault.length} Archive Entries</span>
                </div>

                <Link href="/checker" className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest bg-primary/10 px-6 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all border border-primary/20">
                    Run Clinical Interaction Scan <ArrowRight size={14} />
                </Link>
            </div>

            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
                <AnimatePresence>
                    {filteredVault.map((med, i) => (
                        <motion.div
                            layout
                            key={med.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`card-premium group relative overflow-hidden ${viewMode === "list" ? "flex items-center justify-between p-6" : "p-10"}`}
                        >
                            <div className={viewMode === "list" ? "flex items-center gap-12 flex-1" : ""}>
                                <div className={`flex items-center gap-6 ${viewMode === "grid" ? "mb-8" : ""}`}>
                                    <div className="w-16 h-16 bg-white/5 text-primary rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-primary group-hover:text-white transition-all">
                                        <Pill size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white leading-tight mb-1">{med.name}</h3>
                                        <p className="text-primary font-black text-[10px] uppercase tracking-widest">{med.dosage || "Universal Dose"}</p>
                                    </div>
                                </div>

                                <div className={`grid ${viewMode === "list" ? "grid-cols-3 flex-1" : "grid-cols-1 md:grid-cols-2"} gap-8 ${viewMode === "grid" ? "mb-10" : ""}`}>
                                    <div className="space-y-1">
                                        <p className="label-caps !text-[9px]">Schedule Protocol</p>
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                                            <Clock size={16} className="text-primary/50" /> {med.frequency} • {med.timing}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="label-caps !text-[9px]">Clinical Purpose</p>
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                                            <Activity size={16} className="text-primary/50" /> {med.purpose || "General Therapy"}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="label-caps !text-[9px]">Start Cycle</p>
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                                            <Calendar size={16} className="text-primary/50" /> {med.startDate}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`flex items-center gap-3 ${viewMode === "list" ? "shrink-0 ml-8" : "border-t border-white/5 pt-8 z-10 relative"}`}>
                                <button onClick={() => editMed(med)} className="flex-1 px-6 py-3 bg-white/5 text-slate-400 rounded-xl text-[10px] font-black uppercase hover:bg-white/10 hover:text-white transition-all border border-white/5">
                                    Modify Record
                                </button>
                                <button onClick={() => deleteMed(med.id)} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="absolute -top-4 -right-4 p-8 opacity-0 group-hover:opacity-10 transition-opacity blur-2xl">
                                <Sparkles size={160} className="text-primary" />
                            </div>
                        </motion.div>
                    ))}

                    {filteredVault.length === 0 && (
                        <div className="col-span-full py-32 bg-white/[0.01] rounded-[48px] border-2 border-dashed border-white/5 text-center">
                            <Database size={80} className="text-white/5 mx-auto mb-8" />
                            <h3 className="text-3xl font-black text-white tracking-tighter mb-4">No Records Identified</h3>
                            <p className="text-slate-500 font-bold max-w-sm mx-auto text-lg leading-tight">Initialize your pharmaceutical archive by adding a new treatment record.</p>
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
                            className="modal-content glass"
                        >
                            <div className="p-12">
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Medication Entry Hub</span>
                                        </div>
                                        <h3 className="text-4xl font-black text-white tracking-tighter">{editingId ? "Modify" : "New"} Vault <span className="text-gradient">Record</span></h3>
                                    </div>
                                    <button onClick={closeForm} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white transition-all">
                                        <X size={24} />
                                    </button>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 p-5 rounded-2xl flex items-center gap-4 text-red-400 text-sm font-bold mb-10 border border-red-500/20">
                                        <AlertTriangle size={20} /> {error}
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-8 mb-12">
                                    <div className="space-y-3">
                                        <label className="label-caps ml-2">Clinical Molecule Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Atorvastatin"
                                            value={newMed.name || ""}
                                            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                                            className="input-premium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="label-caps ml-2">Strength / Conc.</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 20mg"
                                            value={newMed.dosage || ""}
                                            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                                            className="input-premium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="label-caps ml-2">Delivery Schedule</label>
                                        <div className="relative">
                                            <select
                                                value={newMed.frequency}
                                                onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                                                className="input-premium appearance-none pr-12 cursor-pointer"
                                            >
                                                <option>Daily</option>
                                                <option>Twice Daily</option>
                                                <option>Weekly</option>
                                                <option>Monthly</option>
                                                <option>As Needed</option>
                                            </select>
                                            <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="label-caps ml-2">Treatment Purpose</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Hypertension"
                                            value={newMed.purpose || ""}
                                            onChange={(e) => setNewMed({ ...newMed, purpose: e.target.value })}
                                            className="input-premium"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={closeForm} className="flex-1 h-[68px] bg-white/5 text-slate-400 rounded-3xl font-black text-[11px] uppercase hover:bg-white/10 transition-all tracking-widest">
                                        Discard
                                    </button>
                                    <button onClick={handleSaveMed} className="flex-[2] btn-primary !h-[68px] !text-[11px] uppercase tracking-widest gap-3 shadow-primary/30">
                                        <Save size={20} />
                                        Commit to Secure Vault
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
                    background: rgba(2, 6, 23, 0.85);
                    backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                }
                .modal-content {
                    width: 100%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 48px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .text-gradient {
                    background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                option {
                    background: #0f172a;
                    color: white;
                }
            `}</style>
        </div>
    );
}
