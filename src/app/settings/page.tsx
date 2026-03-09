"use client";

import { useState } from "react";
import {
    User, Bell, Shield, Eye, Database, HelpCircle,
    ChevronRight, Save, LogOut, Info, Settings, Trash2, RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [biometric, setBiometric] = useState(false);
    const [sharing, setSharing] = useState(false);
    const [activeSection, setActiveSection] = useState("account");
    const [showSuccess, setShowSuccess] = useState(false);

    const clearAllData = () => {
        if (confirm("DANGER: This will permanently delete all your medications, symptom logs, and history. This action cannot be undone. Are you sure?")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const resetOnboarding = () => {
        localStorage.removeItem("medisafe_tour_complete");
        alert("Onboarding guide has been reset. It will appear on your next dashboard visit.");
    };

    const handleSave = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="settings-page">
            <main className="container main-content">
                <header className="page-header">
                    <div className="header-badge">
                        <Settings size={16} /> Application Settings
                    </div>
                    <h1>Platform Preferences</h1>
                    <p className="subtitle">Manage your profile, data privacy, and medication safety monitoring settings.</p>
                </header>

                <div className="settings-grid">
                    <div className="settings-sidebar">
                        <div className="settings-nav">
                            <button
                                className={`settings-nav-item ${activeSection === "account" ? "active" : ""}`}
                                onClick={() => setActiveSection("account")}
                            >
                                <User size={18} /> Account Profile
                            </button>
                            <button
                                className={`settings-nav-item ${activeSection === "privacy" ? "active" : ""}`}
                                onClick={() => setActiveSection("privacy")}
                            >
                                <Shield size={18} /> Privacy & Security
                            </button>
                            <button
                                className={`settings-nav-item ${activeSection === "data" ? "active" : ""}`}
                                onClick={() => setActiveSection("data")}
                            >
                                <Database size={18} /> Data Management
                            </button>
                        </div>
                    </div>

                    <div className="settings-content">
                        {activeSection === "account" && (
                            <section className="settings-section card animate-fade-in">
                                <h3>Profile Information</h3>
                                <div className="profile-edit">
                                    <div className="avatar-large">AD</div>
                                    <div className="profile-fields">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" defaultValue="Alex Doe" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" defaultValue="alex.doe@example.com" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeSection === "privacy" && (
                            <section className="settings-section card animate-fade-in">
                                <h3>Security & Health Privacy</h3>
                                <div className="settings-list">
                                    <div className="setting-item">
                                        <div className="item-info">
                                            <strong>Anonymous Research Sharing</strong>
                                            <p>Allow anonymous sharing of interaction data to help researchers improve drug safety protocols.</p>
                                        </div>
                                        <label className="switch">
                                            <input type="checkbox" checked={sharing} onChange={(e) => setSharing(e.target.checked)} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="setting-item">
                                        <div className="item-info">
                                            <strong>Biometric Vault Unlock</strong>
                                            <p>Use FaceID or Fingerprint to secure your medication vault access.</p>
                                        </div>
                                        <label className="switch">
                                            <input type="checkbox" checked={biometric} onChange={(e) => setBiometric(e.target.checked)} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="setting-item">
                                        <div className="item-info">
                                            <strong>Safety Notifications</strong>
                                            <p>Receive push alerts for high-risk interaction warnings detected in your vault.</p>
                                        </div>
                                        <label className="switch">
                                            <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeSection === "data" && (
                            <section className="settings-section card animate-fade-in">
                                <h3>Health Data Management</h3>
                                <p className="section-desc">You have full control over your health data. All information is stored locally and can be exported or purged.</p>

                                <div className="data-actions-list">
                                    <div className="data-action-item">
                                        <div className="d-a-info">
                                            <strong>Reset Onboarding</strong>
                                            <p>Clear the "seen" status of the onboarding guide to view the instructions again.</p>
                                        </div>
                                        <button className="btn-secondary btn-sm" onClick={resetOnboarding}>
                                            <RotateCcw size={14} /> Reset Guide
                                        </button>
                                    </div>

                                    <div className="data-action-item danger-zone">
                                        <div className="d-a-info">
                                            <strong>Purge All Health Data</strong>
                                            <p>Permanently delete all medications, histories, and logs from this device.</p>
                                        </div>
                                        <button className="btn-danger-outline btn-sm" onClick={clearAllData}>
                                            <Trash2 size={14} /> Delete Everything
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}

                        <div className="page-actions">
                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="save-success"
                                    >
                                        Settings saved successfully
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            <div className="btn-group">
                                <button className="btn-secondary logout-btn">
                                    <LogOut size={18} /> Log Out
                                </button>
                                <button className="btn-primary" onClick={handleSave}>
                                    <Save size={18} /> Save Preferences
                                </button>
                            </div>
                        </div>

                        <div className="legal-disclaimer-box card">
                            <div className="d-header">
                                <Info size={18} color="var(--primary)" />
                                <strong>Platform Disclaimer</strong>
                            </div>
                            <p>“This platform provides educational medication safety information and does not replace professional medical advice. Always consult a licensed doctor or pharmacist before making medical decisions.”</p>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
        .settings-page { background: #f8fafc; min-height: 100vh; }
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

        .settings-grid { display: grid; grid-template-columns: 260px 1fr; gap: 40px; }
        
        .settings-nav { display: flex; flex-direction: column; gap: 4px; }
        .settings-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 14px;
          color: #64748b;
          font-weight: 700;
          font-size: 14px;
          text-align: left;
          transition: all 0.2s;
        }
        .settings-nav-item:hover { background: #f1f5f9; color: var(--text-main); }
        .settings-nav-item.active { background: white; color: var(--primary); box-shadow: var(--shadow-sm); border: 1px solid #e2e8f0; }

        .settings-content { display: flex; flex-direction: column; gap: 24px; }
        .settings-section { padding: 32px; background: white; border-radius: 24px; }
        .settings-section h3 { font-size: 18px; font-weight: 800; margin-bottom: 24px; color: #0f172a; }
        .section-desc { font-size: 14px; color: #64748b; margin-bottom: 32px; line-height: 1.6; }

        .profile-edit { display: flex; gap: 32px; align-items: flex-start; }
        .avatar-large {
          width: 80px; height: 80px; background: var(--primary); color: white;
          border-radius: 20px; display: flex; align-items: center; justify-content: center;
          font-size: 24px; font-weight: 800;
        }
        .profile-fields { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-size: 13px; font-weight: 700; color: #475569; }
        .form-group input { padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 500; }

        .settings-list { display: flex; flex-direction: column; gap: 8px; }
        .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid #f1f5f9; }
        .setting-item:last-child { border-bottom: none; }
        .item-info { flex: 1; padding-right: 40px; }
        .item-info strong { display: block; font-size: 15px; color: #1e293b; margin-bottom: 4px; font-weight: 700; }
        .item-info p { font-size: 13px; color: #64748b; line-height: 1.5; }

        .data-actions-list { display: flex; flex-direction: column; gap: 16px; }
        .data-action-item { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: #f8fafc; border-radius: 16px; }
        .d-a-info strong { display: block; font-size: 14px; color: #1e293b; margin-bottom: 4px; }
        .d-a-info p { font-size: 12px; color: #64748b; }
        .btn-sm { padding: 8px 16px; font-size: 12px; font-weight: 700; border-radius: 8px; display: flex; align-items: center; gap: 6px; }
        .btn-danger-outline { border: 1px solid #fee2e2; color: #ef4444; background: transparent; }
        .btn-danger-outline:hover { background: #fee2e2; }

        .danger-zone { border: 1px solid #fee2e2; background: #fff1f2; }

        .page-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; }
        .btn-group { display: flex; gap: 12px; }
        .save-success { font-size: 13px; color: var(--success); font-weight: 700; }
        
        .logout-btn { color: #64748b; font-weight: 700; }
        .logout-btn:hover { background: #f1f5f9; }

        .legal-disclaimer-box { background: #f0f7ff; border-color: var(--primary-light); margin-top: 40px; padding: 24px; border-radius: 20px; }
        .d-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: var(--primary); }
        .legal-disclaimer-box p { font-size: 13px; line-height: 1.6; color: #475569; font-weight: 500; }

        /* Toggle Switch */
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #e2e8f0; transition: .4s; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; }
        input:checked + .slider { background-color: var(--primary); }
        input:checked + .slider:before { transform: translateX(20px); }
        .slider.round { border-radius: 34px; }
        .slider.round:before { border-radius: 50%; }

        @media (max-width: 992px) {
          .settings-grid { grid-template-columns: 1fr; }
          .settings-sidebar { display: none; }
        }
      `}</style>
        </div>
    );
}
