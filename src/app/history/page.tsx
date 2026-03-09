"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { History, Shield, Brain, Calendar, ArrowRight, Trash2, Filter, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface HistoryItem {
    id: string;
    type: "interaction" | "scan";
    date: string;
    items: string[];
    result: "Green" | "Yellow" | "Red" | "Extracted";
}

const MOCK_HISTORY: HistoryItem[] = [
    { id: "1", type: "interaction", date: "2026-03-07", items: ["Ibuprofen", "Warfarin"], result: "Red" },
    { id: "2", type: "scan", date: "2026-03-06", items: ["Metformin", "Atorvastatin"], result: "Extracted" },
    { id: "3", type: "interaction", date: "2026-03-05", items: ["Amoxicillin", "Paracetamol"], result: "Green" },
    { id: "4", type: "interaction", date: "2026-03-01", items: ["Lisinopril", "Spironolactone"], result: "Yellow" },
];

export default function HistoryPage() {
    const [filter, setFilter] = useState<"all" | "interaction" | "scan">("all");
    const filtered = MOCK_HISTORY.filter(h => filter === "all" || h.type === filter);

    return (
        <div className="history-page">
            <NavBar />

            <main className="container main-content">
                <header className="page-header">
                    <div className="header-badge">
                        <History size={16} /> Activity Log
                    </div>
                    <h1>Safety Check History</h1>
                    <p className="subtitle">Review your past interaction checks and scanned prescriptions.</p>
                </header>

                <section className="history-controls">
                    <div className="filter-tabs">
                        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All Records</button>
                        <button className={filter === "interaction" ? "active" : ""} onClick={() => setFilter("interaction")}>Interaction Checks</button>
                        <button className={filter === "scan" ? "active" : ""} onClick={() => setFilter("scan")}>AI Scans</button>
                    </div>
                    <button className="clear-btn"><Trash2 size={16} /> Clear All</button>
                </section>

                <div className="history-list">
                    {filtered.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="history-card"
                        >
                            <div className="h-type-icon">
                                {item.type === "interaction" ? <Shield className={item.result.toLowerCase()} /> : <Brain className="scan-icon" />}
                            </div>

                            <div className="h-info">
                                <div className="h-top">
                                    <span className="h-date"><Calendar size={14} /> {item.date}</span>
                                    <span className={`h-badge ${item.result.toLowerCase()}`}>
                                        {item.type === "interaction" ? `${item.result} Risk` : "Scan Completed"}
                                    </span>
                                </div>
                                <h4 className="h-title">{item.items.join(" + ")}</h4>
                            </div>

                            <div className="h-actions">
                                <button className="view-btn">
                                    View Results <ChevronRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="empty-history card">
                            <History size={48} strokeWidth={1} color="var(--border)" />
                            <h3>No history found</h3>
                            <p>Your safety checks and scans will appear here.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <style jsx>{`
        .history-page { background: var(--background); min-height: 100vh; }
        .main-content { padding-top: 60px; padding-bottom: 100px; }
        
        .history-controls { 
          display: flex; justify-content: space-between; align-items: center; 
          margin-bottom: 32px; flex-wrap: wrap; gap: 20px;
        }
        .filter-tabs { display: flex; background: white; padding: 4px; border-radius: 999px; border: 1px solid var(--border); }
        .filter-tabs button { 
          padding: 8px 16px; border-radius: 999px; font-size: 14px; font-weight: 600; color: var(--text-muted); 
          transition: all 0.2s ease;
        }
        .filter-tabs button.active { background: var(--primary); color: white; }
        .clear-btn { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--danger); font-weight: 600; }

        .history-list { display: flex; flex-direction: column; gap: 16px; }
        .history-card { 
          background: white; padding: 20px 24px; border-radius: var(--radius-md); 
          border: 1px solid var(--border); display: flex; align-items: center; gap: 24px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .history-card:hover { transform: translateX(8px); box-shadow: var(--shadow-sm); border-color: var(--primary); }

        .h-type-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--background); display: flex; align-items: center; justify-content: center; }
        .h-type-icon .red { color: var(--danger); }
        .h-type-icon .yellow { color: var(--warning); }
        .h-type-icon .green { color: var(--success); }
        .h-type-icon .scan-icon { color: #9333ea; }

        .h-info { flex: 1; }
        .h-top { display: flex; items-center: center; gap: 16px; margin-bottom: 6px; }
        .h-date { font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; }
        .h-badge { font-size: 11px; font-weight: 700; text-transform: uppercase; border-radius: 4px; padding: 2px 6px; }
        .h-badge.red { background: #fee2e2; color: #991b1b; }
        .h-badge.yellow { background: #fef9c3; color: #854d0e; }
        .h-badge.green { background: #dcfce7; color: #166534; }
        .h-badge.extracted { background: #faf5ff; color: #6b21a8; }

        .h-title { font-size: 18px; color: var(--text-main); }
        
        .view-btn { display: flex; align-items: center; gap: 6px; font-weight: 600; color: var(--primary); font-size: 14px; }

        .empty-history { height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 16px; }

        @media (max-width: 768px) {
          .history-card { flex-direction: column; align-items: flex-start; gap: 16px; }
          .h-actions { align-self: flex-end; }
        }
      `}</style>
        </div>
    );
}
