"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Shield, Brain, Pill, History, AlertCircle,
    FileText, Activity, LayoutDashboard, Settings, Menu, X
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Medication Vault", href: "/vault", icon: <Pill size={20} /> },
        { name: "Interaction Checker", href: "/checker", icon: <Shield size={20} /> },
        { name: "Prescription Scanner", href: "/scanner", icon: <Brain size={20} /> },
        { name: "Medication Timeline", href: "/timeline", icon: <History size={20} /> },
        { name: "Safety Alerts", href: "/alerts", icon: <AlertCircle size={20} /> },
        { name: "Doctor Reports", href: "/summary", icon: <FileText size={20} /> },
        { name: "Settings", href: "/settings", icon: <Settings size={20} /> },
    ];

    if (pathname === "/") return null;

    return (
        <>
            <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    <Link href="/" className="logo">
                        <Shield className="logo-icon" size={28} />
                        <span className="logo-text">MediSafe <span className="logo-accent">AI</span></span>
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${pathname === item.href ? "active" : ""}`}
                        >
                            {item.icon}
                            <span className="nav-text">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">AD</div>
                        <div className="user-details">
                            <span className="user-name">Alex Doe</span>
                            <span className="user-role">Patient Profile</span>
                        </div>
                    </div>
                    <p className="disclaimer-mini">Educational use only. Not medical advice.</p>
                </div>
            </aside>

            <style jsx>{`
        .sidebar {
          width: 280px;
          height: 100vh;
          background: white;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar.closed {
          transform: translateX(-100%);
        }
        
        .sidebar-header {
          padding: 32px 24px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-icon { color: var(--primary); }
        .logo-text { font-size: 20px; font-weight: 800; color: var(--text-main); }
        .logo-accent { color: var(--primary); }

        .sidebar-nav {
          flex: 1;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 15px;
          transition: all 0.2s;
        }
        .nav-item:hover {
          background: #f1f5f9;
          color: var(--primary);
        }
        .nav-item.active {
          background: var(--primary-light);
          color: var(--primary);
        }

        .sidebar-footer {
          padding: 24px;
          border-top: 1px solid var(--border);
          background: #f8fafc;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
        }
        .user-details {
          display: flex;
          flex-direction: column;
        }
        .user-name { font-size: 14px; font-weight: 700; color: var(--text-main); }
        .user-role { font-size: 11px; color: var(--text-muted); font-weight: 600; }

        .sidebar-toggle {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 1000;
          background: white;
          border: 1px solid var(--border);
          padding: 8px;
          border-radius: 8px;
          display: none;
        }

        .disclaimer-mini {
          font-size: 10px;
          color: var(--text-muted);
          line-height: 1.4;
          opacity: 0.8;
        }

        @media (max-width: 992px) {
          .sidebar-toggle { display: block; }
          .sidebar.closed { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); box-shadow: 20px 0 50px rgba(0,0,0,0.1); }
        }
      `}</style>
        </>
    );
}
