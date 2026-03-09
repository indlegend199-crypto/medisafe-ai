"use client";

import { useState, useEffect } from "react";
import {
    FileText, Printer, Download, Share2, Shield,
    Pill, Activity, AlertCircle, Clock, Calendar
} from "lucide-react";
import { motion } from "framer-motion";

export default function SummaryPage() {
    const [vault, setVault] = useState<any[]>([]);
    const [symptoms, setSymptoms] = useState<any[]>([]);
    const [reportDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const savedVault = JSON.parse(localStorage.getItem("medisafe_vault") || "[]");
        const savedSymptoms = JSON.parse(localStorage.getItem("medisafe_symptoms") || "[]");
        setVault(savedVault);
        setSymptoms(savedSymptoms);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="summary-page">
            <main className="container main-content no-print">
                <header className="page-header">
                    <div className="header-badge">
                        <FileText size={16} /> Clinical Reporting
                    </div>
                    <div className="header-flex">
                        <div>
                            <h1>Doctor Visit Summary</h1>
                            <p className="subtitle">Export your current medication list and safety history for your healthcare provider.</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn-secondary" onClick={handlePrint}><Printer size={18} /> Print Document</button>
                            <button className="btn-primary"><Download size={18} /> Download PDF</button>
                        </div>
                    </div>
                </header>
            </main>

            <div className="report-preview-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="medical-report card"
                >
                    {/* Report Header */}
                    <div className="report-header">
                        <div className="rep-left">
                            <div className="rep-logo">
                                <Shield className="icon" size={32} />
                                <div>
                                    <h2>MediSafe AI</h2>
                                    <span>Advanced Medication Safety Portal</span>
                                </div>
                            </div>
                        </div>
                        <div className="rep-right">
                            <div className="rep-meta">
                                <span><strong>Report ID:</strong> MS-2025-0310</span>
                                <span><strong>Generated On:</strong> {reportDate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-title-section">
                        <h1>Patient Medication Safety Summary</h1>
                        <p>This report contains the patient's self-reported medication profile and AI-analyzed interaction risks.</p>
                    </div>

                    <div className="report-body">
                        {/* Patient Info Section */}
                        <div className="report-section">
                            <h3 className="section-title"><Activity size={18} /> Patient Profile</h3>
                            <div className="profile-grid">
                                <div className="p-field"><span>Name:</span> <strong>Alex Doe</strong></div>
                                <div className="p-field"><span>Date of Birth:</span> <strong>12/05/1985</strong></div>
                                <div className="p-field"><span>Blood Type:</span> <strong>A+</strong></div>
                                <div className="p-field"><span>Primary Physician:</span> <strong>Dr. Sarah Jenkins</strong></div>
                            </div>
                        </div>

                        {/* active Medications */}
                        <div className="report-section">
                            <h3 className="section-title"><Pill size={18} /> Active Medications ({vault.length})</h3>
                            <table className="med-table">
                                <thead>
                                    <tr>
                                        <th>Medicine Name</th>
                                        <th>Dosage</th>
                                        <th>Frequency</th>
                                        <th>Timing</th>
                                        <th>Purpose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vault.length > 0 ? vault.map((m, i) => (
                                        <tr key={i}>
                                            <td><strong>{m.name}</strong></td>
                                            <td>{m.dosage}</td>
                                            <td>{m.frequency}</td>
                                            <td>{m.timing}</td>
                                            <td>{m.purpose}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={5} className="empty-row">No medications in vault.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Safety Alerts */}
                        <div className="report-section">
                            <h3 className="section-title"><AlertCircle size={18} /> AI Safety Assessment</h3>
                            <div className="safety-alert-box high">
                                <strong>Potential Interaction Detected:</strong>
                                <p>Analysis indicates a potential high-risk interaction between <strong>Warfarin</strong> and <strong>Ibuprofen</strong> currently in the vault. This combination may increase bleeding propensity.</p>
                            </div>
                        </div>

                        {/* Recent symptoms */}
                        <div className="report-section">
                            <h3 className="section-title"><Clock size={16} /> Recent Symptom History</h3>
                            <div className="symptom-grid-rep">
                                {symptoms.length > 0 ? symptoms.slice(0, 4).map((s, i) => (
                                    <div key={i} className="symp-rep-card">
                                        <div className="s-date">{s.date}</div>
                                        <div className="s-name">{s.name}</div>
                                        <div className="s-sev">Severity: {s.severity}</div>
                                    </div>
                                )) : <p className="empty-text-mini">No symptoms logged in the last 30 days.</p>}
                            </div>
                        </div>
                    </div>

                    <div className="report-footer">
                        <div className="disclaimer-full">
                            <h4>Legal Disclaimer</h4>
                            <p>This report is for informational purposes only. The interaction analysis is performed by an AI system based on user-provided data and medical databases. It does NOT constitute medical advice. A licensed physician or pharmacist must review all medications and the clinical relevance of any identified interactions before making treatment decisions.</p>
                        </div>
                        <div className="signatures">
                            <div className="sig-line"><span>Patient Signature</span></div>
                            <div className="sig-line"><span>Physician Signature</span></div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
        .summary-page { background: #f1f5f9; min-height: 100vh; padding-bottom: 80px; }
        .main-content { padding-top: 40px; padding-bottom: 32px; }
        
        .page-header { margin-bottom: 0; }
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

        .report-preview-container { display: flex; justify-content: center; padding: 20px; }
        
        .medical-report {
            width: 850px;
            background: white;
            padding: 60px;
            border-radius: 4px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            color: #1e293b;
        }

        .report-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 32px; margin-bottom: 40px; }
        .rep-logo { display: flex; align-items: center; gap: 16px; }
        .rep-logo .icon { color: var(--primary); }
        .rep-logo h2 { font-size: 24px; font-weight: 800; color: var(--text-main); line-height: 1; margin-bottom: 4px; }
        .rep-logo span { font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }

        .rep-meta { display: flex; flex-direction: column; text-align: right; gap: 4px; font-size: 13px; color: var(--text-muted); }

        .report-title-section { text-align: center; margin-bottom: 48px; }
        .report-title-section h1 { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; display: inline-block; padding-bottom: 8px; }
        .report-title-section p { font-size: 14px; color: var(--text-muted); }

        .report-section { margin-bottom: 40px; }
        .section-title { font-size: 16px; font-weight: 800; display: flex; align-items: center; gap: 10px; color: #0f172a; margin-bottom: 20px; border-left: 4px solid var(--primary); padding-left: 12px; }

        .profile-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; background: #f8fafc; padding: 24px; border-radius: 12px; }
        .p-field { font-size: 14px; }
        .p-field span { color: var(--text-muted); margin-right: 8px; }

        .med-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        .med-table th { text-align: left; padding: 12px; background: #f1f5f9; font-size: 11px; text-transform: uppercase; font-weight: 800; color: #64748b; }
        .med-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .empty-row { text-align: center; color: var(--text-muted); font-style: italic; padding: 32px; }

        .safety-alert-box { padding: 20px; border-radius: 12px; border: 1px solid; margin-top: 12px; }
        .safety-alert-box.high { background: #fef2f2; border-color: #fecaca; color: #991b1b; }
        .safety-alert-box strong { display: block; margin-bottom: 6px; font-size: 15px; }
        .safety-alert-box p { font-size: 14px; line-height: 1.5; }

        .symptom-grid-rep { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .symp-rep-card { border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; }
        .s-date { font-size: 10px; color: var(--text-muted); font-weight: 700; }
        .s-name { font-size: 14px; font-weight: 700; color: var(--text-main); }
        .s-sev { font-size: 12px; color: var(--text-muted); }

        .report-footer { margin-top: 60px; border-top: 2px solid #e2e8f0; padding-top: 40px; }
        .disclaimer-full { background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 48px; }
        .disclaimer-full h4 { font-size: 14px; font-weight: 800; margin-bottom: 12px; color: #0f172a; }
        .disclaimer-full p { font-size: 12px; line-height: 1.6; color: #64748b; }

        .signatures { display: flex; justify-content: space-between; }
        .sig-line { width: 40%; border-top: 1px solid #94a3b8; padding-top: 8px; text-align: center; }
        .sig-line span { font-size: 12px; color: #64748b; font-weight: 600; }

        @media print {
            .no-print { display: none !important; }
            .summary-page { background: white; padding: 0; }
            .report-preview-container { padding: 0; }
            .medical-report { width: 100%; box-shadow: none; padding: 0; }
            .app-layout { display: block !important; }
            .sidebar { display: none !important; }
            .main-content-wrapper { margin: 0 !important; padding: 0 !important; }
        }
      `}</style>
        </div>
    );
}
