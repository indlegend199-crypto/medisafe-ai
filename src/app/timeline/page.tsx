"use client";

import { useState, useEffect } from "react";
import {
    History as HistoryIcon, Search, Pill, Brain, AlertCircle,
    CheckCircle2, Plus, ArrowRight, Calendar, Filter, Download
} from "lucide-react";
import { motion } from "framer-motion";

export default function TimelinePage() {
    const [events, setEvents] = useState<any[]>([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        // Mock historical data
        const mockEvents = [
            {
                id: 1,
                date: "March 10, 2025",
                time: "10:45 AM",
                type: "scan",
                title: "Prescription Scanned",
                details: "Detected Metformin, Atorvastatin, and Lisinopril. No new interactions found.",
                icon: <Brain size={18} />,
                color: "blue"
            },
            {
                id: 2,
                date: "March 8, 2025",
                time: "02:15 PM",
                type: "vault",
                title: "Medicine Added to Vault",
                details: "Ibuprofen 400mg added to regular medication list.",
                icon: <Pill size={18} />,
                color: "green"
            },
            {
                id: 3,
                date: "March 8, 2025",
                time: "02:16 PM",
                type: "warning",
                title: "Interaction Warning Detected",
                details: "Critical interaction between Ibuprofen and Warfarin identified by safety engine.",
                icon: <AlertCircle size={18} />,
                color: "red"
            },
            {
                id: 4,
                date: "Feb 28, 2025",
                time: "09:00 AM",
                type: "symptom",
                title: "Symptom Logged",
                details: "Reported mild stomach discomfort. Severity: Low.",
                icon: <CheckCircle2 size={18} />,
                color: "yellow"
            },
            {
                id: 5,
                date: "Feb 15, 2025",
                time: "11:30 AM",
                type: "report",
                title: "Medical Report Generated",
                details: "Monthly safety summary exported for Dr. Sarah Jenkins.",
                icon: <Calendar size={18} />,
                color: "purple"
            }
        ];
        setEvents(mockEvents);
    }, []);

    const filteredEvents = filter === "all" ? events : events.filter(e => e.type === filter);

    return (
        <div className="timeline-page">
            <main className="container main-content">
                <header className="page-header">
                    <div className="header-badge">
                        <HistoryIcon size={16} /> Treatment History
                    </div>
                    <div className="header-flex">
                        <div>
                            <h1>Patient Medication Timeline</h1>
                            <p className="subtitle">A chronological record of your medication scans, changes, and safety alerts.</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn-secondary"><Download size={18} /> Export History</button>
                        </div>
                    </div>
                </header>

                <div className="timeline-controls card">
                    <div className="filter-group">
                        <Filter size={16} />
                        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Activities</button>
                        <button className={`filter-btn ${filter === 'scan' ? 'active' : ''}`} onClick={() => setFilter('scan')}>Scans</button>
                        <button className={`filter-btn ${filter === 'warning' ? 'active' : ''}`} onClick={() => setFilter('warning')}>Warnings</button>
                        <button className={`filter-btn ${filter === 'vault' ? 'active' : ''}`} onClick={() => setFilter('vault')}>Vault</button>
                    </div>
                    <div className="search-box">
                        <Search size={16} />
                        <input type="text" placeholder="Search history..." />
                    </div>
                </div>

                <div className="timeline-visual">
                    {filteredEvents.length === 0 ? (
                        <div className="empty-timeline card">
                            <HistoryIcon size={64} color="var(--border)" strokeWidth={1} />
                            <h3>No events found</h3>
                            <p>Try adjusting your filters or record your first medication activity.</p>
                        </div>
                    ) : (
                        <div className="timeline-list">
                            {filteredEvents.map((event, index) => (
                                <div key={event.id} className="timeline-item-wrapper">
                                    <div className="timeline-date-side">
                                        <span className="date-main">{event.date}</span>
                                        <span className="date-sub">{event.time}</span>
                                    </div>

                                    <div className={`timeline-node ${event.color}`}>
                                        {event.icon}
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="timeline-card card"
                                    >
                                        <div className="card-top">
                                            <span className={`type-badge ${event.color}`}>{event.type}</span>
                                            <h4 className="card-title">{event.title}</h4>
                                        </div>
                                        <p className="card-details">{event.details}</p>
                                        <div className="card-footer">
                                            <button className="btn-text">View Details <ArrowRight size={14} /></button>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
        .timeline-page { background: #f8fafc; min-height: 100vh; }
        .main-content { padding-top: 40px; padding-bottom: 80px; }
        
        .page-header { margin-bottom: 32px; }
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
        .header-flex { display: flex; justify-content: space-between; align-items: center; }
        .page-header h1 { font-size: 32px; font-weight: 800; color: var(--text-main); }
        .subtitle { color: var(--text-muted); font-size: 16px; }

        .timeline-controls { padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 48px; border-radius: 16px; border: 1px solid var(--border); }
        .filter-group { display: flex; align-items: center; gap: 8px; color: var(--text-muted); }
        .filter-btn { padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; transition: all 0.2s; }
        .filter-btn:hover { background: #f1f5f9; color: var(--primary); }
        .filter-btn.active { background: var(--primary); color: white; }

        .search-box { display: flex; align-items: center; gap: 10px; background: #f1f5f9; padding: 8px 16px; border-radius: 999px; width: 280px; }
        .search-box input { background: transparent; border: none; font-size: 13px; width: 100%; }

        .timeline-list { position: relative; padding-left: 200px; }
        .timeline-list::before { content: ''; position: absolute; left: 199px; top: 0; bottom: 0; width: 2px; background: #e2e8f0; }

        .timeline-item-wrapper { display: flex; position: relative; margin-bottom: 40px; align-items: flex-start; }
        
        .timeline-date-side { position: absolute; left: -200px; width: 160px; text-align: right; display: flex; flex-direction: column; top: 12px; }
        .date-main { font-size: 14px; font-weight: 800; color: var(--text-main); }
        .date-sub { font-size: 12px; color: var(--text-muted); font-weight: 600; }

        .timeline-node { width: 44px; height: 44px; border-radius: 50%; background: white; border: 4px solid #f8fafc; z-index: 10; display: flex; align-items: center; justify-content: center; position: absolute; left: -22px; margin-left: -20px; box-shadow: var(--shadow-sm); }
        .timeline-node.blue { color: #3b82f6; border-color: #dbeafe; }
        .timeline-node.green { color: #10b981; border-color: #d1fae5; }
        .timeline-node.red { color: #ef4444; border-color: #fee2e2; }
        .timeline-node.yellow { color: #f59e0b; border-color: #fef3c7; }
        .timeline-node.purple { color: #8b5cf6; border-color: #ede9fe; }

        .timeline-card { flex: 1; padding: 24px; margin-left: 40px; border-radius: 20px; background: white; border: 1px solid var(--border); transition: transform 0.2s; }
        .timeline-card:hover { transform: translateX(8px); border-color: var(--primary-light); }

        .card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .type-badge { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; }
        .type-badge.blue { background: #eff6ff; color: #1d4ed8; }
        .type-badge.green { background: #ecfdf5; color: #047857; }
        .type-badge.red { background: #fef2f2; color: #b91c1c; }
        .type-badge.yellow { background: #fffbeb; color: #b45309; }
        .type-badge.purple { background: #f5f3ff; color: #6d28d9; }

        .card-title { font-size: 16px; font-weight: 800; color: var(--text-main); }
        .card-details { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px; }

        .card-footer { border-top: 1px solid #f1f5f9; padding-top: 12px; }
        .btn-text { font-size: 12px; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 4px; }

        @media (max-width: 768px) {
          .timeline-list { padding-left: 40px; }
          .timeline-list::before { left: 40px; }
          .timeline-node { left: 18px; }
          .timeline-date-side { position: static; text-align: left; width: auto; margin-bottom: 12px; }
          .timeline-item-wrapper { flex-direction: column; }
          .timeline-card { margin-left: 0; width: 100%; margin-top: 20px; }
        }
      `}</style>
        </div>
    );
}
