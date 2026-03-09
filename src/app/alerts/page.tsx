"use client";

import { useState, useEffect } from "react";
import {
    AlertCircle, AlertTriangle, Info, Bell, Trash2,
    ChevronRight, ArrowRight, Shield, Pill, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        // Generate mock alerts based on vault and symptoms
        const meds = JSON.parse(localStorage.getItem("medisafe_vault") || "[]");
        const symps = JSON.parse(localStorage.getItem("medisafe_symptoms") || "[]");

        let combinedAlerts = [];

        // 1. Interaction Alerts
        const hasWarfarin = meds.some((m: any) => m.name.toLowerCase().includes("warfarin"));
        const hasIbuprofen = meds.some((m: any) => m.name.toLowerCase().includes("ibuprofen"));

        if (hasWarfarin && hasIbuprofen) {
            combinedAlerts.push({
                id: '1',
                type: "Interaction",
                title: "Critical Interaction Detected",
                msg: "Warfarin and Ibuprofen found in your vault. This combination significantly increases bleeding risk.",
                severity: "critical",
                date: "Today, 10:30 AM",
                link: "/checker"
            });
        }

        // 2. Dosage Alerts
        meds.forEach((m: any) => {
            if (m.name.toLowerCase().includes("ibuprofen") && parseInt(m.dosage) > 800) {
                combinedAlerts.push({
                    id: '2',
                    type: "Dosage",
                    title: "High Dosage Warning",
                    msg: `${m.name} dose (${m.dosage}) exceeds the standard safety threshold for chronic use.`,
                    severity: "warning",
                    date: "Yesterday",
                    link: "/vault"
                });
            }
        });

        // 3. Symptom Alerts
        if (symps.length > 0) {
            combinedAlerts.push({
                id: '3',
                type: "Symptom",
                title: "Side Effect Monitoring",
                msg: `Recent log of "${symps[0].name}" may be related to your medication. Monitor closely.`,
                severity: "info",
                date: "2 days ago",
                link: "/symptoms"
            });
        }

        // 4. Default mock alerts
        combinedAlerts.push({
            id: '4',
            type: "System",
            title: "Clinical Database Updated",
            msg: "New interaction data for antihypertensives has been added to the safety engine.",
            severity: "info",
            date: "3 days ago",
            link: "/knowledge"
        });

        setAlerts(combinedAlerts);
    }, []);

    const removeAlert = (id: string) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    return (
        <div className="alerts-page">
            <main className="container main-content">
                <header className="page-header">
                    <div className="header-badge">
                        <Bell size={16} /> Safety Notifications
                    </div>
                    <h1>Medical Safety Alerts</h1>
                    <p className="subtitle">Real-time alerts regarding drug interactions, dosage safety, and symptom correlations.</p>
                </header>

                <section className="alerts-container">
                    <div className="alerts-stats card">
                        <div className="stat">
                            <span className="s-val">{alerts.filter(a => a.severity === 'critical').length}</span>
                            <span className="s-label">Critical</span>
                        </div>
                        <div className="stat">
                            <span className="s-val">{alerts.filter(a => a.severity === 'warning').length}</span>
                            <span className="s-label">Warning</span>
                        </div>
                        <div className="stat">
                            <span className="s-val">{alerts.filter(a => a.severity === 'info').length}</span>
                            <span className="s-label">Info</span>
                        </div>
                    </div>

                    <div className="alerts-list">
                        <AnimatePresence>
                            {alerts.length === 0 ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="empty-state card">
                                    <Shield size={64} strokeWidth={1} color="var(--success)" />
                                    <h3>Your safety profile is secure</h3>
                                    <p>No active alerts detected for your current medication profile.</p>
                                </motion.div>
                            ) : (
                                alerts.map((alert) => (
                                    <motion.div
                                        key={alert.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={`alert-card ${alert.severity}`}
                                    >
                                        <div className="alert-icon">
                                            {alert.severity === 'critical' ? <AlertCircle size={24} /> :
                                                alert.severity === 'warning' ? <AlertTriangle size={24} /> :
                                                    alert.type === 'Symptom' ? <Activity size={24} /> :
                                                        <Info size={24} />}
                                        </div>

                                        <div className="alert-body">
                                            <div className="alert-meta">
                                                <span className="alert-type">{alert.type} Alert</span>
                                                <span className="alert-date">{alert.date}</span>
                                            </div>
                                            <h3 className="alert-title">{alert.title}</h3>
                                            <p className="alert-msg">{alert.msg}</p>

                                            <div className="alert-actions">
                                                <Link href={alert.link} className="action-link">
                                                    Take Action <ArrowRight size={14} />
                                                </Link>
                                                <button className="dismiss-btn" onClick={() => removeAlert(alert.id)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                <div className="disclaimer-mini-box card">
                    <p><strong>Clinical Disclaimer:</strong> These alerts are generated by an AI reasoning engine. Always verify critical alerts with a healthcare professional before changing your medication regimen.</p>
                </div>
            </main>

            <style jsx>{`
        .alerts-page { background: #f8fafc; min-height: 100vh; }
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
        .page-header h1 { font-size: 32px; font-weight: 800; color: var(--text-main); }
        .subtitle { color: var(--text-muted); font-size: 16px; }

        .alerts-stats { 
          display: flex; gap: 40px; padding: 24px 40px; margin-bottom: 32px; 
          background: white; border-radius: 20px; box-shadow: var(--shadow-sm);
        }
        .stat { display: flex; flex-direction: column; }
        .s-val { font-size: 24px; font-weight: 800; color: var(--text-main); }
        .s-label { font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }

        .alerts-list { display: flex; flex-direction: column; gap: 16px; }
        .alert-card {
          background: white; padding: 24px; border-radius: 20px; border: 1px solid var(--border);
          display: flex; gap: 24px; transition: transform 0.2s;
        }
        .alert-card:hover { transform: translateX(4px); }
        
        .alert-icon {
          width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .alert-card.critical { border-left: 6px solid var(--danger); }
        .alert-card.critical .alert-icon { background: #fee2e2; color: var(--danger); }
        .alert-card.warning { border-left: 6px solid var(--warning); }
        .alert-card.warning .alert-icon { background: #fffbeb; color: var(--warning); }
        .alert-card.info { border-left: 6px solid var(--primary); }
        .alert-card.info .alert-icon { background: #eff6ff; color: var(--primary); }

        .alert-body { flex: 1; }
        .alert-meta { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .alert-type { font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); }
        .alert-date { font-size: 11px; color: var(--text-muted); }
        .alert-title { font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 6px; }
        .alert-msg { font-size: 14px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; }

        .alert-actions { display: flex; justify-content: space-between; align-items: center; }
        .action-link { font-size: 13px; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 4px; }
        .dismiss-btn { color: var(--text-muted); padding: 8px; border-radius: 8px; }
        .dismiss-btn:hover { background: #f1f5f9; color: var(--danger); }

        .empty-state { text-align: center; padding: 80px 40px; color: var(--text-muted); }
        .empty-state h3 { margin-top: 20px; color: var(--text-main); }

        .disclaimer-mini-box { margin-top: 48px; background: #f1f5f9; border-color: var(--border); }
        .disclaimer-mini-box p { font-size: 12px; line-height: 1.6; color: var(--text-muted); text-align: center; }
      `}</style>
        </div>
    );
}
