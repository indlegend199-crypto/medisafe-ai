"use client";

import { useState, useEffect } from "react";
import {
    Activity, Plus, Trash2, Calendar, AlertCircle,
    Pill, Clock, Search, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Symptom {
    id: string;
    name: string;
    severity: "Mild" | "Moderate" | "Severe";
    date: string;
    notes: string;
    relatedMed?: string;
}

export default function SymptomsPage() {
    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [vaultMeds, setVaultMeds] = useState<string[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newSymp, setNewSymp] = useState<Partial<Symptom>>({
        severity: "Mild"
    });

    useEffect(() => {
        const saved = localStorage.getItem("medisafe_symptoms");
        if (saved) setSymptoms(JSON.parse(saved));

        const savedVault = localStorage.getItem("medisafe_vault");
        if (savedVault) {
            const parsed = JSON.parse(savedVault);
            setVaultMeds(parsed.map((m: any) => m.name));
        }
    }, []);

    const saveSymptoms = (updated: Symptom[]) => {
        setSymptoms(updated);
        localStorage.setItem("medisafe_symptoms", JSON.stringify(updated));
    };

    const handleAddSymptom = () => {
        if (!newSymp.name) return;

        const sympToAdd: Symptom = {
            id: Date.now().toString(),
            name: newSymp.name || "",
            severity: newSymp.severity as any,
            date: newSymp.date || new Date().toISOString().split('T')[0],
            notes: newSymp.notes || "",
            relatedMed: newSymp.relatedMed
        };

        saveSymptoms([...symptoms, sympToAdd]);
        setIsAdding(false);
        setNewSymp({ severity: "Mild" });
    };

    const deleteSymptom = (id: string) => {
        saveSymptoms(symptoms.filter(s => s.id !== id));
    };

    const getRelationMessage = (sympName: string) => {
        const name = sympName.toLowerCase();
        if (name.includes("dizz") || name.includes("nausea")) {
            if (vaultMeds.some(m => m.toLowerCase().includes("metformin")))
                return "Nausea or dizziness may be associated with your current medication Metformin.";
            if (vaultMeds.some(m => m.toLowerCase().includes("lisinopril")))
                return "Dizziness is a common side effect reported with Lisinopril.";
        }
        return null;
    };

    return (
        <div className="symptoms-page">
            <main className="container main-content">
                <header className="page-header">
                    <div className="header-badge">
                        <Activity size={16} /> Patient Response Tracking
                    </div>
                    <div className="header-flex">
                        <div>
                            <h1>Symptom & Side Effect Log</h1>
                            <p className="subtitle">Track your physical responses to identify potential medication correlations.</p>
                        </div>
                        <button className="btn-primary" onClick={() => setIsAdding(true)}>
                            <Plus size={20} /> Log New Entry
                        </button>
                    </div>
                </header>

                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card add-form shadow-xl"
                    >
                        <h3>Record Side Effect</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>What are you feeling?</label>
                                <select
                                    value={newSymp.name || ""}
                                    onChange={(e) => setNewSymp({ ...newSymp, name: e.target.value })}
                                >
                                    <option value="">Select Symptom...</option>
                                    <option>Dizziness</option>
                                    <option>Nausea</option>
                                    <option>Headache</option>
                                    <option>Fatigue</option>
                                    <option>Stomach Pain</option>
                                    <option>Muscle Pain</option>
                                    <option>Rash / Itching</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Severity Level</label>
                                <select
                                    value={newSymp.severity}
                                    onChange={(e) => setNewSymp({ ...newSymp, severity: e.target.value as any })}
                                >
                                    <option>Mild</option>
                                    <option>Moderate</option>
                                    <option>Severe</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date Experienced</label>
                                <input
                                    type="date"
                                    value={newSymp.date || ""}
                                    onChange={(e) => setNewSymp({ ...newSymp, date: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Suspected Medicine</label>
                                <select
                                    value={newSymp.relatedMed || ""}
                                    onChange={(e) => setNewSymp({ ...newSymp, relatedMed: e.target.value })}
                                >
                                    <option value="">None / Not sure</option>
                                    {vaultMeds.map((m, i) => <option key={i} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Personal Notes</label>
                                <textarea
                                    placeholder="Describe timing (e.g. 1 hour after dose)..."
                                    value={newSymp.notes || ""}
                                    onChange={(e) => setNewSymp({ ...newSymp, notes: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button className="btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleAddSymptom}>Save Log Entry</button>
                        </div>
                    </motion.div>
                )}

                <div className="symptom-history">
                    {symptoms.length === 0 ? (
                        <div className="empty-state card">
                            <Activity size={64} strokeWidth={1} color="var(--border)" />
                            <h3>No symptoms logged</h3>
                            <p>Logging side effects helps our AI identify patterns with your medications.</p>
                            <button className="btn-primary" onClick={() => setIsAdding(true)}>Log First Symptom</button>
                        </div>
                    ) : (
                        <div className="history-grid">
                            {symptoms.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((s) => (
                                <motion.div key={s.id} layout className="card symptom-card-v2">
                                    <div className="s-header-v2">
                                        <div className="s-title-v2">
                                            <span className={`sev-tag-v2 ${s.severity.toLowerCase()}`}>{s.severity}</span>
                                            <h4>{s.name}</h4>
                                        </div>
                                        <button onClick={() => deleteSymptom(s.id)} className="icon-btn-v2 danger"><Trash2 size={16} /></button>
                                    </div>

                                    <div className="s-meta-v2">
                                        <div className="m-item"><Calendar size={14} /> {s.date}</div>
                                        {s.relatedMed && <div className="m-item pill"><Pill size={14} /> {s.relatedMed}</div>}
                                    </div>

                                    {s.notes && <p className="s-notes-v2">{s.notes}</p>}

                                    {getRelationMessage(s.name) && (
                                        <div className="s-insight-v2 shadow-sm">
                                            <AlertCircle size={16} />
                                            <p>{getRelationMessage(s.name)}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
        .symptoms-page { background: #f8fafc; min-height: 100vh; }
        .main-content { padding-top: 40px; padding-bottom: 80px; }
        
        .page-header { margin-bottom: 32px; }
        .header-flex { display: flex; justify-content: space-between; align-items: center; }
        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--primary-light);
          color: var(--primary);
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .page-header h1 { font-size: 32px; font-weight: 800; color: var(--text-main); }
        .subtitle { font-size: 16px; color: var(--text-muted); }

        .add-form { margin-bottom: 40px; border: 1px solid var(--primary-light); background: white; padding: 32px; }
        .add-form h3 { font-size: 20px; font-weight: 800; margin-bottom: 24px; }
        .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-size: 14px; font-weight: 700; color: #475569; }
        .form-group input, .form-group select, .form-group textarea { padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; }
        .full-width { grid-column: span 2; }
        .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; }

        .history-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
        .symptom-card-v2 { padding: 24px; border-radius: 20px; display: flex; flex-direction: column; gap: 16px; }
        .s-header-v2 { display: flex; justify-content: space-between; align-items: flex-start; }
        .s-title-v2 { display: flex; flex-direction: column; gap: 8px; }
        .s-title-v2 h4 { font-size: 18px; font-weight: 800; color: #0f172a; }
        
        .sev-tag-v2 { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; display: inline-block; width: fit-content; }
        .sev-tag-v2.mild { background: #dcfce7; color: #166534; }
        .sev-tag-v2.moderate { background: #fef9c3; color: #854d0e; }
        .sev-tag-v2.severe { background: #fee2e2; color: #991b1b; }

        .s-meta-v2 { display: flex; flex-wrap: wrap; gap: 12px; }
        .m-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; font-weight: 600; }
        .m-item.pill { color: var(--primary); background: #f0f7ff; padding: 4px 10px; border-radius: 6px; }

        .s-notes-v2 { font-size: 14px; color: #475569; line-height: 1.5; padding: 12px; background: #f8fafc; border-radius: 12px; }
        
        .s-insight-v2 { 
            background: #fffbeb; border: 1px solid #fef3c7; padding: 16px; border-radius: 12px;
            display: flex; gap: 12px; align-items: flex-start; color: #92400e; font-size: 13px; font-weight: 600;
        }

        .icon-btn-v2 { padding: 8px; border-radius: 8px; }
        .icon-btn-v2.danger:hover { background: #fee2e2; color: #991b1b; }

        .empty-state { text-align: center; padding: 60px; display: flex; flex-direction: column; align-items: center; gap: 16px; }

        @media (max-width: 768px) {
          .header-flex { flex-direction: column; align-items: flex-start; gap: 16px; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
}
