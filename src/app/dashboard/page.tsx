"use client";

import { useState, useEffect } from "react";
import {
    Shield, Activity, Calendar, AlertCircle, Pill,
    ChevronRight, Brain, Clock, Plus, ArrowUpRight,
    User, CheckCircle, Info, X, Camera, Search, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
    const [safetyScore, setSafetyScore] = useState(85);
    const [vaultMeds, setVaultMeds] = useState<any[]>([]);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem("medisafe_vault");
        if (saved) setVaultMeds(JSON.parse(saved));

        const tourDone = localStorage.getItem("medisafe_tour_complete");
        if (!tourDone) {
            setTimeout(() => setShowOnboarding(true), 1500);
        }
    }, []);

    const completeTour = () => {
        localStorage.setItem("medisafe_tour_complete", "true");
        setShowOnboarding(false);
    };

    const onboardingSteps = [
        {
            title: "Welcome to MediSafe AI",
            desc: "Your intelligent assistant for medication safety. Let's take a quick look at how to protect your health.",
            icon: <Shield size={40} className="text-blue-600" />
        },
        {
            title: "Interaction Checker",
            desc: "The core of MediSafe. Enter 2-10 medicines to analyze complex physiological interactions and clinical risks.",
            icon: <Search size={40} className="text-blue-600" />,
            link: "/checker"
        },
        {
            title: "Prescription Scanner",
            desc: "No more manual typing. Use your camera to scan Rx images and extract medicine names and treatment logic instantly.",
            icon: <Camera size={40} className="text-blue-600" />,
            link: "/scanner"
        },
        {
            title: "Medication Vault",
            desc: "Save your daily meds here. We'll automatically monitor for new risks and help you generate reports for your doctor.",
            icon: <BookmarkIcon size={40} className="text-blue-600" />,
            link: "/vault"
        }
    ];

    return (
        <div className="dashboard-page">
            <main className="container main-content">
                <header className="dashboard-header animate-fade-in">
                    <div className="user-welcome">
                        <div className="avatar-med">AD</div>
                        <div>
                            <h1>Welcome back, Alex</h1>
                            <p className="subtitle">Your medication safety profile is looking secure today.</p>
                        </div>
                    </div>
                    <div className="header-disclaimer-top">
                        <Shield size={14} /> Educational medication safety portal
                    </div>
                </header>

                <div className="dashboard-grid">
                    {/* Left Column: Safety Index & Alerts */}
                    <div className="col-left">
                        <section className="card score-card animate-fade-in">
                            <div className="card-header">
                                <h3>Medication Safety Index</h3>
                                <Link href="/summary" className="view-link">Clinical Report <ArrowUpRight size={14} /></Link>
                            </div>

                            <div className="score-viz">
                                <div className="progress-ring">
                                    <svg viewBox="0 0 100 100">
                                        <circle className="bg" cx="50" cy="50" r="45" />
                                        <circle
                                            className="fg"
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            style={{ strokeDasharray: `${(safetyScore / 100) * 283}, 283` }}
                                        />
                                    </svg>
                                    <div className="score-content">
                                        <span className="number">{safetyScore}</span>
                                        <span className="label">Safe</span>
                                    </div>
                                </div>
                                <div className="score-details">
                                    <p>Your index reflects <strong>0 critical interactions</strong> across {vaultMeds.length} active medications.</p>
                                    <div className="status-badge secure">System Protected</div>
                                </div>
                            </div>
                        </section>

                        <section className="card alerts-card animate-fade-in">
                            <div className="card-header">
                                <h3>Smart Safety Alerts</h3>
                                <span className="alert-count">2 New</span>
                            </div>
                            <div className="alert-list">
                                <div className="alert-item warning">
                                    <AlertCircle size={20} />
                                    <div className="alert-text">
                                        <strong>Dietary Interaction Note</strong>
                                        <p>Recent data suggests avoiding grapefruit with Atorvastatin.</p>
                                    </div>
                                </div>
                                <div className="alert-item info">
                                    <Info size={20} />
                                    <div className="alert-text">
                                        <strong>System Update</strong>
                                        <p>New clinical reasoning data added for diabetic therapies.</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/alerts" className="btn-full-secondary">View All Alert History</Link>
                        </section>
                    </div>

                    {/* Middle Column: Schedule & Vault */}
                    <div className="col-mid">
                        <section className="card schedule-card animate-fade-in">
                            <div className="card-header">
                                <h3>Today's Schedule</h3>
                                <Clock size={18} className="text-slate-400" />
                            </div>
                            <div className="schedule-list">
                                <div className="sched-item">
                                    <div className="time">08:00 AM</div>
                                    <div className="med-box">
                                        <strong>Metformin</strong>
                                        <span>500mg • With Breakfast</span>
                                    </div>
                                    <div className="check-btn-dash"><CheckCircle size={18} /></div>
                                </div>
                                <div className="sched-item">
                                    <div className="time">09:00 PM</div>
                                    <div className="med-box">
                                        <strong>Atorvastatin</strong>
                                        <span>20mg • Before Sleep</span>
                                    </div>
                                    <div className="check-btn-dash inactive"></div>
                                </div>
                            </div>
                        </section>

                        <section className="card vault-summary-card animate-fade-in">
                            <div className="card-header">
                                <h3>Medication Vault</h3>
                                <Link href="/vault" className="view-link">Manage Vault <ChevronRight size={14} /></Link>
                            </div>
                            <div className="vault-preview">
                                {vaultMeds.length === 0 ? (
                                    <p className="empty-txt">No active medications saved to vault.</p>
                                ) : (
                                    vaultMeds.slice(0, 3).map((med, i) => (
                                        <div key={i} className="v-preview-item">
                                            <Pill size={16} />
                                            <span>{med.name}</span>
                                        </div>
                                    ))
                                )}
                                {vaultMeds.length > 3 && <div className="more-count">+{vaultMeds.length - 3} more</div>}
                            </div>
                            <Link href="/vault" className="add-quick-btn"><Plus size={16} /> Add Medicine</Link>
                        </section>
                    </div>

                    {/* Right Column: Quick Tools & History */}
                    <div className="col-right">
                        <section className="card tools-card animate-fade-in">
                            <h3>Quick Access Tools</h3>
                            <div className="tools-grid">
                                <Link href="/checker" className="tool-card-dash">
                                    <Shield size={24} />
                                    <span>Checker</span>
                                </Link>
                                <Link href="/scanner" className="tool-card-dash">
                                    <Camera size={24} />
                                    <span>Scan Rx</span>
                                </Link>
                                <Link href="/symptoms" className="tool-card-dash">
                                    <Activity size={24} />
                                    <span>Logs</span>
                                </Link>
                                <Link href="/summary" className="tool-card-dash">
                                    <FileTextIcon size={24} />
                                    <span>Report</span>
                                </Link>
                            </div>
                        </section>

                        <section className="card recent-activity animate-fade-in">
                            <h3>Recent System Activity</h3>
                            <div className="activity-timeline">
                                <div className="activity-item">
                                    <div className="act-icon"><Search size={14} /></div>
                                    <div className="act-txt">
                                        <p>Interaction check: <strong>Lisinopril + Metformin</strong></p>
                                        <span>Yesterday at 4:32 PM</span>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="act-icon"><Camera size={14} /></div>
                                    <div className="act-txt">
                                        <p>Prescription scanned successfully</p>
                                        <span>2 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="dashboard-disclaimer">
                    <Info size={16} />
                    <p>“This platform provides educational medication safety information and does not replace professional medical advice. Always consult a licensed doctor or pharmacist before making medical decisions.”</p>
                </div>
            </main>

            {/* Onboarding Overlay */}
            <AnimatePresence>
                {showOnboarding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="onboarding-overlay"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="onboarding-card card shadow-2xl"
                        >
                            <div className="o-header">
                                <div className="o-icon-box">{onboardingSteps[onboardingStep].icon}</div>
                                <button className="o-skip" onClick={completeTour}>Skip Tour</button>
                            </div>
                            <div className="o-content">
                                <h2>{onboardingSteps[onboardingStep].title}</h2>
                                <p>{onboardingSteps[onboardingStep].desc}</p>
                            </div>
                            <div className="o-footer">
                                <div className="o-dots">
                                    {onboardingSteps.map((_, i) => (
                                        <div key={i} className={`o-dot ${i === onboardingStep ? "active" : ""}`}></div>
                                    ))}
                                </div>
                                <div className="o-btns">
                                    {onboardingStep > 0 && (
                                        <button className="btn-secondary" onClick={() => setOnboardingStep(s => s - 1)}>Back</button>
                                    )}
                                    {onboardingStep < onboardingSteps.length - 1 ? (
                                        <button className="btn-primary" onClick={() => setOnboardingStep(s => s + 1)}>Next</button>
                                    ) : (
                                        <button className="btn-primary" onClick={completeTour}>Start Using MediSafe</button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .dashboard-page { background: #f8fafc; min-height: 100vh; }
        .main-content { padding-top: 60px; padding-bottom: 100px; }
        
        .dashboard-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px; }
        .user-welcome { display: flex; align-items: center; gap: 24px; }
        .avatar-med { width: 64px; height: 64px; background: var(--grad-primary); color: white; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.3); }
        .user-welcome h1 { font-size: 40px; font-weight: 900; color: var(--text-main); letter-spacing: -1px; margin-bottom: 4px; }
        .subtitle { color: var(--text-muted); font-size: 16px; font-weight: 500; }
        .header-disclaimer-top { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; color: var(--primary); background: var(--primary-light); padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(37, 99, 235, 0.1); }

        .dashboard-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr 360px; 
          gap: 32px; 
          margin-bottom: 60px;
        }

        .card { background: white; padding: 32px; border-radius: 32px; height: 100%; border: 1px solid #e2e8f0; display: flex; flex-direction: column; transition: all 0.3s; box-shadow: var(--shadow-sm); }
        .card:hover { box-shadow: var(--shadow-xl); border-color: rgba(37, 99, 235, 0.1); }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .card-header h3 { font-size: 18px; font-weight: 900; color: #0f172a; tracking-tight: -0.5px; }
        .view-link { font-size: 12px; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.05em; }

        /* Score Card */
        .score-card { background: white; }
        .score-viz { display: flex; align-items: center; gap: 40px; }
        .progress-ring { position: relative; width: 140px; height: 140px; }
        .progress-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .progress-ring circle { fill: transparent; stroke-width: 10; stroke-linecap: round; }
        .progress-ring circle.bg { stroke: #f1f5f9; }
        .progress-ring circle.fg { stroke: var(--success); transition: stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .score-content { position: absolute; top:0; left:0; width:100%; height:100%; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: rotate(0deg); }
        .score-content .number { font-size: 40px; font-weight: 900; color: #0f172a; line-height: 1; }
        .score-content .label { font-size: 12px; font-weight: 900; color: var(--success); text-transform: uppercase; margin-top: 6px; letter-spacing: 0.1em; }
        .score-details p { font-size: 15px; color: #64748b; margin-bottom: 16px; line-height: 1.6; }
        .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
        .status-badge.secure { background: #dcfce7; color: #166534; }

        /* Alerts Card */
        .alert-count { font-size: 11px; font-weight: 800; background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 999px; }
        .alert-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; flex: 1; }
        .alert-item { display: flex; gap: 16px; padding: 20px; border-radius: 20px; border: 1px solid #f1f5f9; align-items: flex-start; transition: all 0.2s; }
        .alert-item:hover { transform: scale(1.02); }
        .alert-item.warning { background: #fffbeb; color: #b45309; border-color: #fef3c7; }
        .alert-item.info { background: #f0f7ff; color: #1d4ed8; border-color: #dbeafe; }
        .alert-text strong { display: block; font-size: 14px; margin-bottom: 4px; font-weight: 900; }
        .alert-text p { font-size: 13px; opacity: 0.8; line-height: 1.5; }
        .btn-full-secondary { width: 100%; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; text-align: center; font-size: 13px; font-weight: 800; color: #64748b; transition: all 0.2s; }
        .btn-full-secondary:hover { background: white; border-color: var(--primary); color: var(--primary); }

        /* Schedule Card */
        .schedule-list { display: flex; flex-direction: column; gap: 16px; flex: 1; }
        .sched-item { display: flex; align-items: center; gap: 20px; padding: 20px; background: #f8fafc; border-radius: 24px; border: 1px solid #f1f5f9; transition: all 0.2s; }
        .sched-item:hover { background: white; box-shadow: var(--shadow-md); }
        .sched-item .time { font-size: 11px; font-weight: 900; color: #94a3b8; width: 64px; text-transform: uppercase; }
        .med-box { flex: 1; }
        .med-box strong { display: block; font-size: 15px; color: #0f172a; font-weight: 900; }
        .med-box span { font-size: 13px; color: #64748b; font-weight: 500; }
        .check-btn-dash { width: 36px; height: 36px; background: #22c55e; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px -2px rgba(34, 197, 94, 0.4); }
        .check-btn-dash.inactive { background: white; border: 2px dashed #e2e8f0; box-shadow: none; }

        /* Vault summary */
        .vault-preview { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px; flex: 1; }
        .v-preview-item { display: flex; align-items: center; gap: 8px; background: #f1f5f9; padding: 8px 16px; border-radius: 12px; font-size: 13px; font-weight: 800; color: #475569; border: 1px solid #e2e8f0; }
        .more-count { font-size: 12px; color: #94a3b8; font-weight: 800; align-self: center; margin-left: 4px; }
        .add-quick-btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; background: var(--grad-primary); color: white; border-radius: 16px; font-size: 14px; font-weight: 800; box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.3); transition: all 0.2s; }
        .add-quick-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 30px -8px rgba(37, 99, 235, 0.4); }

        /* Tools Card */
        .tools-card h3 { font-size: 18px; font-weight: 900; margin-bottom: 24px; tracking-tight: -0.5px; }
        .tools-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .tool-card-dash { background: white; border: 1px solid #e2e8f0; border-radius: 24px; padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 16px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .tool-card-dash:hover { border-color: var(--primary); background: #f0f7ff; transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .tool-card-dash span { font-size: 14px; font-weight: 800; color: #1e293b; }
        .tool-card-dash svg { color: var(--primary); }

        /* Activity timeline */
        .recent-activity h3 { font-size: 18px; font-weight: 900; margin-bottom: 24px; }
        .activity-timeline { display: flex; flex-direction: column; gap: 24px; }
        .activity-item { display: flex; gap: 16px; align-items: center; }
        .act-icon { width: 36px; height: 36px; background: #f1f5f9; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary); flex-shrink: 0; }
        .act-txt p { font-size: 14px; color: #334155; margin-bottom: 2px; line-height: 1.4; font-weight: 500; }
        .act-txt strong { color: #0f172a; font-weight: 800; }
        .act-txt span { font-size: 12px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; }

        .dashboard-disclaimer { margin-top: 80px; padding: 32px; background: white; border: 1px dashed #e2e8f0; border-radius: 24px; display: flex; gap: 20px; align-items: flex-start; }
        .dashboard-disclaimer p { font-size: 12px; color: #64748b; line-height: 1.8; font-weight: 500; }

        /* Onboarding Styles */
        .onboarding-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .onboarding-card { width: 100%; max-width: 520px; padding: 48px; background: white; border-radius: 48px; text-align: center; border: none; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5); }
        .o-header { display: flex; justify-content: center; align-items: center; margin-bottom: 40px; position: relative; }
        .o-icon-box { width: 100px; height: 100px; background: var(--primary-light); border-radius: 32px; display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .o-skip { font-size: 12px; font-weight: 900; color: #94a3b8; position: absolute; right: 0; top: 0; text-transform: uppercase; letter-spacing: 0.1em; }
        .o-content h2 { font-size: 32px; font-weight: 900; color: #0f172a; margin-bottom: 16px; letter-spacing: -1px; }
        .o-content p { font-size: 17px; color: #64748b; line-height: 1.7; margin-bottom: 48px; font-weight: 500; }
        .o-footer { display: flex; flex-direction: column; gap: 32px; }
        .o-dots { display: flex; justify-content: center; gap: 10px; }
        .o-dot { width: 10px; height: 10px; background: #e2e8f0; border-radius: 50%; transition: all 0.3s; }
        .o-dot.active { width: 32px; background: var(--primary); border-radius: 6px; }
        .o-btns { display: flex; gap: 16px; }
        .o-btns button { flex: 1; padding: 18px; font-weight: 900; border-radius: 18px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; }

        @media (max-width: 1400px) {
          .dashboard-grid { grid-template-columns: 1fr 1fr 320px; gap: 24px; }
        }
        @media (max-width: 1200px) {
          .dashboard-grid { grid-template-columns: 1fr 1fr; }
          .col-right { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        }
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .col-right { grid-template-columns: 1fr; grid-column: auto; }
          .dashboard-header { flex-direction: column; align-items: flex-start; gap: 24px; }
          .user-welcome h1 { font-size: 32px; }
        }
      `}</style>
        </div>
    );
}

// Icon helper
function BookmarkIcon({ size, className }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
    );
}

function FileTextIcon({ size, className }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    );
}
