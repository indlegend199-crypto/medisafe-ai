"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Clock, CheckCircle2, Circle, AlertCircle, Calendar, ChevronRight, Trophy, Flame } from "lucide-react";
import { motion } from "framer-motion";

interface ScheduleItem {
    id: string;
    medName: string;
    dosage: string;
    time: string;
    taken: boolean;
}

export default function SchedulePage() {
    const [todaySchedule, setTodaySchedule] = useState<ScheduleItem[]>([]);
    const [streak, setStreak] = useState(5);
    const [vaultMeds, setVaultMeds] = useState<any[]>([]);

    useEffect(() => {
        const savedVault = localStorage.getItem("medisafe_vault");
        if (savedVault) {
            const parsed = JSON.parse(savedVault);
            setVaultMeds(parsed);

            // Auto-generate schedule based on vault
            const schedule: ScheduleItem[] = [];
            parsed.forEach((m: any) => {
                const times = m.frequency === "Twice Daily" ? ["08:00 AM", "08:00 PM"] : ["09:00 AM"];
                times.forEach((t, i) => {
                    schedule.push({
                        id: `${m.id}-${i}`,
                        medName: m.name,
                        dosage: m.dosage,
                        time: t,
                        taken: false
                    });
                });
            });
            setTodaySchedule(schedule);
        }
    }, []);

    const toggleTaken = (id: string) => {
        setTodaySchedule(prev => prev.map(item =>
            item.id === id ? { ...item, taken: !item.taken } : item
        ));
    };

    const takenCount = todaySchedule.filter(s => s.taken).length;
    const progress = todaySchedule.length > 0 ? (takenCount / todaySchedule.length) * 100 : 0;

    return (
        <div className="schedule-page">
            <NavBar />

            <main className="container main-content">
                <header className="page-header">
                    <div className="header-badge">
                        <Clock size={16} /> Daily Medication Schedule
                    </div>
                    <div className="header-flex">
                        <div>
                            <h1>Today's Adherence</h1>
                            <p className="subtitle">Track your daily doses and maintain your healthy streak.</p>
                        </div>
                        <div className="streak-badge">
                            <Flame size={20} color="#ff4500" />
                            <span>{streak} Day Streak</span>
                        </div>
                    </div>
                </header>

                <section className="progress-section card">
                    <div className="progress-info">
                        <h3>{Math.round(progress)}% Completed</h3>
                        <span>{takenCount} of {todaySchedule.length} doses taken</span>
                    </div>
                    <div className="progress-bar-bg">
                        <motion.div
                            className="progress-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </section>

                <div className="schedule-container">
                    <div className="time-line">
                        {todaySchedule.length === 0 ? (
                            <div className="empty-schedule card">
                                <AlertCircle size={48} color="var(--border)" />
                                <p>No medications in your vault. Add medicines to see your schedule.</p>
                            </div>
                        ) : (
                            todaySchedule.sort((a, b) => a.time.localeCompare(b.time)).map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileTap={{ scale: 0.98 }}
                                    className={`schedule-card card ${item.taken ? 'taken' : ''}`}
                                    onClick={() => toggleTaken(item.id)}
                                >
                                    <div className="s-time">{item.time}</div>
                                    <div className="s-info">
                                        <h4>{item.medName}</h4>
                                        <span>{item.dosage}</span>
                                    </div>
                                    <div className="s-status">
                                        {item.taken ? (
                                            <CheckCircle2 size={28} color="var(--success)" fill="#dcfce7" />
                                        ) : (
                                            <Circle size={28} color="#e2e8f0" />
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    <aside className="schedule-sidebar">
                        <div className="card achievement-card">
                            <Trophy size={32} color="#fbbf24" />
                            <h4>Health Milestone</h4>
                            <p>You've taken 95% of your doses this week. Keep it up!</p>
                        </div>

                        <div className="card reminder-settings">
                            <h4>Notifications</h4>
                            <p className="small-text">Dose reminders are sent to your device 15 minutes before scheduled time.</p>
                            <button className="btn-secondary small-btn">Adjust Timings</button>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />

            <style jsx>{`
        .schedule-page { background: var(--background); min-height: 100vh; }
        .main-content { padding-top: 60px; padding-bottom: 100px; }
        .page-header { margin-bottom: 32px; }
        .header-flex { display: flex; justify-content: space-between; align-items: center; }
        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #eff6ff;
          color: #2563eb;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .streak-badge { 
          display: flex; align-items: center; gap: 8px; 
          background: #fff; border: 1px solid #fee2e2; 
          padding: 10px 16px; border-radius: 999px;
          font-weight: 700; color: #ff4500;
          box-shadow: var(--shadow-sm);
        }

        .progress-section { margin-bottom: 40px; }
        .progress-info { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; }
        .progress-info h3 { font-size: 24px; color: var(--primary); }
        .progress-info span { color: var(--text-muted); font-size: 14px; font-weight: 600; }
        .progress-bar-bg { height: 12px; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: var(--primary); border-radius: 999px; }

        .schedule-container { display: grid; grid-template-columns: 1fr 300px; gap: 40px; }
        .time-line { display: flex; flex-direction: column; gap: 16px; }
        
        .schedule-card { 
          display: flex; align-items: center; gap: 24px; cursor: pointer;
          transition: all 0.2s ease; border-left: 4px solid var(--primary);
        }
        .schedule-card:hover { border-color: var(--primary-hover); transform: translateX(5px); }
        .schedule-card.taken { background: #f8fafc; opacity: 0.8; border-color: var(--success); }
        .schedule-card.taken h4 { text-decoration: line-through; color: var(--text-muted); }
        
        .s-time { font-weight: 800; color: var(--primary); font-size: 15px; width: 80px; }
        .s-info { flex: 1; }
        .s-info h4 { font-size: 18px; margin-bottom: 2px; }
        .s-info span { font-size: 14px; color: var(--text-muted); font-weight: 500; }

        .schedule-sidebar { display: flex; flex-direction: column; gap: 24px; }
        .achievement-card { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .achievement-card p { font-size: 13px; color: var(--text-muted); }
        
        .reminder-settings h4 { margin-bottom: 12px; font-size: 16px; }
        .small-text { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.4; }
        .small-btn { padding: 8px 16px; font-size: 13px; }

        .empty-schedule { text-align: center; padding: 60px; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 16px; }

        @media (max-width: 900px) {
          .schedule-container { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
}
