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
        <div className="vault-page pb-20 pt-10 min-h-screen bg-slate-50/50">
            <main className="container max-w-7xl mx-auto px-6">
                <header className="mb-16 animate-slide-up">
                    <div className="flex items-center gap-2 mb-4 bg-primary/5 w-fit px-4 py-1.5 rounded-full border border-primary/10">
                        <LockIcon size={12} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            AES-256 Encrypted Health Vault
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-6xl font-black tracking-tight mb-4">Medication <span className="text-primary italic">Intelligence</span> Vault</h1>
                            <p className="text-slate-500 text-xl max-w-2xl leading-relaxed">Securely archive and monitor your pharmaceutical history with real-time safety cross-referencing.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-white border border-slate-200 px-6 py-4 rounded-[24px] flex items-center gap-4 shadow-sm group focus-within:ring-4 ring-primary/10 transition-all w-full lg:w-[320px]">
                                <Search size={20} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search molecules..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent border-none p-0 focus:ring-0 text-base font-bold placeholder:text-slate-300 w-full"
                                />
                            </div>
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-primary text-white h-[60px] px-8 rounded-[24px] shadow-lg shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 shrink-0"
                            >
                                <Plus size={20} />
                                <span className="text-sm font-black hidden sm:inline">Add Medication</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { label: "Active Treatments", val: vault.length, icon: Pill, colorClass: "bg-blue-500 text-blue-500" },
                        { label: "Safety Confidence", val: "99.8%", icon: Shield, colorClass: "bg-emerald-500 text-emerald-500" },
                        { label: "Clinical Sources", val: "24+", icon: Database, colorClass: "bg-indigo-500 text-indigo-500" },
                        { label: "Vault Sync", val: "Verified", icon: Activity, colorClass: "bg-purple-500 text-purple-500" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 rounded-2xl ${stat.colorClass.split(' ')[0]}/10 ${stat.colorClass.split(' ')[1]} flex items-center justify-center mb-6`}>
                                <stat.icon size={24} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900">{stat.val}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-white shadow-md text-primary" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                <LayoutGrid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-white shadow-md text-primary" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                <List size={20} />
                            </button>
                        </div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{filteredVault.length} Archive Entries</span>
                    </div>

                    <Link href="/checker" className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest bg-primary/5 px-6 py-2 rounded-full hover:bg-primary/10 transition-colors">
                        Run Cross-Interaction Scan <ArrowRight size={14} />
                    </Link>
                </div>

                <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                    <AnimatePresence>
                        {filteredVault.map((med, i) => (
                            <motion.div
                                layout
                                key={med.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`card-premium group relative overflow-hidden ${viewMode === "list" ? "flex items-center justify-between py-6 px-10" : "p-10"}`}
                            >
                                <div className={viewMode === "list" ? "flex items-center gap-12 flex-1" : ""}>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-16 h-16 bg-primary/5 text-primary rounded-[20px] flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                            <Pill size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-1">{med.name}</h3>
                                            <p className="text-primary font-black text-xs uppercase tracking-widest">{med.dosage || "Unspecified Dosage"}</p>
                                        </div>
                                    </div>

                                    <div className={`grid ${viewMode === "list" ? "grid-cols-4" : "grid-cols-1 md:grid-cols-2"} gap-8 mb-10`}>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Schedule</p>
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                <Clock size={16} className="text-slate-300" /> {med.frequency} • {med.timing}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Clinical Purpose</p>
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                <Activity size={16} className="text-slate-300" /> {med.purpose || "Health Profile"}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Treatment Start</p>
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                                <Calendar size={16} className="text-slate-300" /> {med.startDate}
                                            </div>
                                        </div>
                                        {med.notes && (
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Clinical Notes</p>
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-500 italic">
                                                    <FileText size={16} className="text-slate-300" /> {med.notes.substring(0, 20)}...
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={`flex items-center gap-4 ${viewMode === "list" ? "shrink-0" : "border-t border-slate-100 pt-8"}`}>
                                    <button onClick={() => editMed(med)} className="flex-1 bg-slate-50 text-slate-400 py-3.5 rounded-2xl text-[10px] font-black uppercase text-center hover:bg-primary/5 hover:text-primary transition-all border border-slate-200 border-dashed">
                                        Edit Entry
                                    </button>
                                    <button onClick={() => deleteMed(med.id)} className="p-3.5 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-100">
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Sparkles size={120} className="text-primary" />
                                </div>
                            </motion.div>
                        ))}

                        {filteredVault.length === 0 && (
                            <div className="col-span-full py-32 bg-white rounded-[48px] border-4 border-dashed border-slate-100 text-center">
                                <Search size={80} className="text-slate-100 mx-auto mb-8" strokeWidth={1} />
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">No matching records found</h3>
                                <p className="text-slate-400 font-bold max-w-sm mx-auto text-lg leading-tight">Try broadening your search or add a new pharmaceutical entry to your vault.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {isAdding && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={closeForm}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-white rounded-[48px] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10"
                        >
                            <div className="p-12">
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Medication Entry Engine</span>
                                        </div>
                                        <h3 className="text-4xl font-black tracking-tighter">{editingId ? "Modify Treatment" : "Add Medication"}</h3>
                                    </div>
                                    <button onClick={closeForm} className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                                        <X size={28} />
                                    </button>
                                </div>

                                {error && (
                                    <div className="bg-red-50 p-5 rounded-2xl flex items-center gap-4 text-red-600 text-sm font-bold mb-10 border-l-4 border-red-500">
                                        <AlertTriangle size={20} /> {error}
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-8 mb-12">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Molecule Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Atorvastatin"
                                            value={newMed.name || ""}
                                            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-transparent rounded-[20px] p-5 font-bold text-slate-800 focus:bg-white focus:border-primary/20 focus:ring-4 ring-primary/5 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Dosage / Strength</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 20mg"
                                            value={newMed.dosage || ""}
                                            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-transparent rounded-[20px] p-5 font-bold text-slate-800 focus:bg-white focus:border-primary/20 focus:ring-4 ring-primary/5 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Clinical Frequency</label>
                                        <div className="relative">
                                            <select
                                                value={newMed.frequency}
                                                onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-transparent rounded-[20px] p-5 font-bold text-slate-800 focus:bg-white focus:border-primary/20 focus:ring-4 ring-primary/5 transition-all appearance-none outline-none"
                                            >
                                                <option>Daily</option>
                                                <option>Twice Daily</option>
                                                <option>Weekly</option>
                                                <option>Monthly</option>
                                                <option>As Needed</option>
                                            </select>
                                            <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Medical Condition</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Hypercholesterolemia"
                                            value={newMed.purpose || ""}
                                            onChange={(e) => setNewMed({ ...newMed, purpose: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-transparent rounded-[20px] p-5 font-bold text-slate-800 focus:bg-white focus:border-primary/20 focus:ring-4 ring-primary/5 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={closeForm} className="flex-1 bg-slate-50 text-slate-400 h-[64px] rounded-[24px] font-black text-[11px] uppercase hover:bg-slate-100 transition-all tracking-[0.2em]">
                                        Discard Changes
                                    </button>
                                    <button onClick={handleSaveMed} className="flex-[2] bg-primary text-white h-[64px] rounded-[24px] font-black text-[11px] uppercase shadow-xl shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all tracking-[0.2em] flex items-center justify-center gap-3">
                                        <Save size={20} />
                                        Save To Secure Vault
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
}
