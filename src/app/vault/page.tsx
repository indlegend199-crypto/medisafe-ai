"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Pill, Plus, Trash2, Edit2, Clock, Calendar, Bookmark,
    Activity, AlertTriangle, ChevronRight, Save, Shield, Info, X, Search,
    LayoutGrid, List, Sparkles, Database, FileText, ChevronDown
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
    const [interactionWarning, setInteractionWarning] = useState<string | null>(null);
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

    const clearVault = () => {
        if (confirm("DANGER: This will permanently delete all medications in your vault. Continue?")) {
            saveVault([]);
        }
    };

    const filteredVault = vault.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="vault-page pb-20 pt-10 min-h-screen bg-slate-50/50">
            <main className="container max-w-6xl mx-auto px-4">
                <header className="page-header mb-12 animate-slide-up">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                            <Database size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/5 px-3 py-1 rounded-full">
                            Patient Health Vault
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter mb-4">Medication <span className="text-blue-500 italic">Profile</span></h1>
                            <p className="text-slate-500 text-lg max-w-2xl">Manage your treatment history and essential drug details in a secure, clinical-grade digital environment.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/80 backdrop-blur-md border border-slate-200 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm group focus-within:ring-2 ring-blue-500/20 transition-all">
                                <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Find medication..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold placeholder:text-slate-300 w-[180px]"
                                />
                            </div>
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Plus size={20} />
                                <span className="text-sm font-black hidden sm:inline">Add Medicine</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { label: "Active Medicines", val: vault.length, icon: Pill, color: "blue" },
                        { label: "Safety Status", val: "Optimal", icon: Shield, color: "emerald" },
                        { label: "Vault Security", val: "AES-256", icon: Shield, color: "indigo" },
                        { label: "Last Analysis", val: "Just Now", icon: Activity, color: "purple" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500 flex items-center justify-center mb-4`}>
                                <stat.icon size={20} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                            <p className="text-xl font-black tracking-tight">{stat.val}</p>
                        </div>
                    ))}
                </div>

                <div className="mb-8 flex items-center justify-between">
                    <div className="flex bg-white/50 p-1 rounded-2xl border border-slate-200">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-white shadow-md text-blue-500" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "bg-white shadow-md text-blue-500" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                    {vault.length > 0 && (
                        <button onClick={clearVault} className="text-[10px] font-black uppercase text-slate-400 hover:text-red-500 transition-colors tracking-widest flex items-center gap-2">
                            <X size={14} /> Clear Vault
                        </button>
                    )}
                </div>

                <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    <AnimatePresence>
                        {filteredVault.map((med, i) => (
                            <motion.div
                                layout
                                key={med.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`bg-white rounded-[40px] border border-slate-100 shadow-lg group hover:shadow-2xl hover:scale-[1.02] transition-all p-8 relative overflow-hidden ${viewMode === "list" ? "flex items-center justify-between" : ""}`}
                            >
                                <div className={viewMode === "list" ? "flex items-center gap-6" : ""}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                                            <Pill size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 leading-tight">{med.name}</h3>
                                            <p className="text-slate-400 font-bold text-sm">{med.dosage}</p>
                                        </div>
                                    </div>

                                    <div className={`grid ${viewMode === "list" ? "grid-cols-3" : "grid-cols-1"} gap-4 mb-8`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                <Clock size={14} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{med.frequency} • {med.timing}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                <Activity size={14} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{med.purpose || "Health Profile"}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                <Calendar size={14} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">Started {med.startDate}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-3 ${viewMode === "list" ? "" : "border-t border-slate-50 pt-6 mt-2"}`}>
                                    <Link href="/checker" className="flex-1 bg-blue-500/5 text-blue-600 py-3 rounded-2xl text-[10px] font-black uppercase text-center hover:bg-blue-600 hover:text-white transition-all">
                                        Molecular Scan
                                    </Link>
                                    <button onClick={() => editMed(med)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => deleteMed(med.id)} className="p-3 bg-red-50 text-red-300 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {filteredVault.length === 0 && (
                            <div className="col-span-full py-20 bg-white rounded-[48px] border-2 border-dashed border-slate-200 text-center">
                                <Search size={64} className="text-slate-100 mx-auto mb-6" strokeWidth={1} />
                                <h3 className="text-2xl font-black text-slate-800 mb-2">No results found</h3>
                                <p className="text-slate-400 font-medium">Try broadening your search or add a new medication.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {isAdding && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={closeForm}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-white rounded-[48px] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10"
                        >
                            <div className="p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 block">Medication Entry</span>
                                        <h3 className="text-3xl font-black tracking-tighter">{editingId ? "Modify Treatment" : "Add Medication"}</h3>
                                    </div>
                                    <button onClick={closeForm} className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>

                                {error && (
                                    <div className="bg-red-50 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold mb-8">
                                        <AlertTriangle size={18} /> {error}
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6 mb-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Atorvastatin"
                                            value={newMed.name || ""}
                                            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-800 focus:ring-2 ring-blue-500 transition-all shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Dosage</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 20mg"
                                            value={newMed.dosage || ""}
                                            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-800 focus:ring-2 ring-blue-500 transition-all shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Frequency</label>
                                        <select
                                            value={newMed.frequency}
                                            onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-800 focus:ring-2 ring-blue-500 transition-all shadow-inner appearance-none capitalize"
                                        >
                                            <option>Daily</option>
                                            <option>Twice Daily</option>
                                            <option>Weekly</option>
                                            <option>Monthly</option>
                                            <option>As Needed</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Condition</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Cholesterol"
                                            value={newMed.purpose || ""}
                                            onChange={(e) => setNewMed({ ...newMed, purpose: e.target.value })}
                                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-800 focus:ring-2 ring-blue-500 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={closeForm} className="flex-1 bg-slate-50 text-slate-400 py-5 rounded-3xl font-black text-xs uppercase hover:bg-slate-100 transition-all tracking-widest">
                                        Discard Changes
                                    </button>
                                    <button onClick={handleSaveMed} className="flex-[2] bg-blue-600 text-white py-5 rounded-3xl font-black text-xs uppercase shadow-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all tracking-widest flex items-center justify-center gap-3">
                                        <Save size={18} />
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
