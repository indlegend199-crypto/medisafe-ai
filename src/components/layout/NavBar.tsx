"use client";

import Link from "next/link";
import { Shield, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar glass-morphism">
      <div className="navbar-container container">
        <Link href="/" className="logo">
          <Shield className="logo-icon" size={32} />
          <span className="logo-text">MediSafe <span className="logo-accent">AI</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="landing-nav">
          <Link href="#features" className="nav-link">Features</Link>
          <Link href="#safety" className="nav-link">Safety Index</Link>
          <Link href="/dashboard" className="btn-primary dashboard-cta">
            <LayoutDashboard size={18} /> Open Platform
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="mobile-nav animate-fade-in">
          <Link href="#features" className="mobile-link" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="#safety" className="mobile-link" onClick={() => setIsOpen(false)}>Safety Index</Link>
          <Link href="/dashboard" className="mobile-link primary" onClick={() => setIsOpen(false)}>Open Platform</Link>
        </div>
      )}

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: 80px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .logo-icon { color: var(--primary); }
        .logo-text { font-size: 24px; font-weight: 800; color: var(--text-main); }
        .logo-accent { color: var(--primary); }

        .landing-nav { display: flex; align-items: center; gap: 32px; }
        .nav-link { color: var(--text-muted); font-weight: 600; font-size: 15px; }
        .nav-link:hover { color: var(--primary); }
        
        .dashboard-cta { padding: 10px 24px; border-radius: 999px; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; box-shadow: var(--shadow-md); }

        .mobile-toggle { display: none; }
        .mobile-nav { display: none; }

        @media (max-width: 768px) {
          .landing-nav { display: none; }
          .mobile-toggle { display: block; }
          .mobile-nav {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .mobile-link { padding: 16px; font-weight: 600; font-size: 16px; border-bottom: 1px solid #f1f5f9; color: var(--text-main); }
          .mobile-link.primary { color: var(--primary); font-weight: 700; }
        }
      `}</style>
    </nav>
  );
}
