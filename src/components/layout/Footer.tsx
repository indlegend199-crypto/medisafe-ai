import Link from "next/link";
import { Shield, Twitter, Linkedin, Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Shield className="logo-icon" size={28} />
              <span className="logo-text">MediSafe <span className="logo-accent">AI</span></span>
            </Link>
            <p className="brand-desc">Advancing patient safety through intelligent clinical reasoning and proactive monitoring.</p>
            <div className="social-links">
              <a href="#"><Twitter size={18} /></a>
              <a href="#"><Linkedin size={18} /></a>
              <a href="#"><Github size={18} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Platform</h4>
            <Link href="/checker">Interaction Checker</Link>
            <Link href="/scanner">Prescription Scanner</Link>
            <Link href="/dashboard">Patient Dashboard</Link>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <Link href="#">Safety Standards</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Use</Link>
          </div>

          <div className="footer-disclaimer-card">
            <div className="d-title">Clinical Disclaimer</div>
            <p>This platform provides educational information and does not replace professional medical advice. Always consult a licensed physician or pharmacist before making medical decisions.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MediSafe AI. Built with <Heart size={14} className="heart" /> for patient safety.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          padding: 80px 0 40px;
          color: #64748b;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 2fr;
          gap: 60px;
          margin-bottom: 80px;
        }
        
        .logo { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; text-decoration: none; }
        .logo-icon { color: var(--primary); }
        .logo-text { font-size: 20px; font-weight: 800; color: #0f172a; }
        .logo-accent { color: var(--primary); }
        
        .brand-desc { font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
        .social-links { display: flex; gap: 16px; }
        .social-links a { color: #94a3b8; transition: color 0.2s; }
        .social-links a:hover { color: var(--primary); }

        .footer-links { display: flex; flex-direction: column; gap: 12px; }
        .footer-links h4 { font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .footer-links a { font-size: 14px; color: #64748b; text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--primary); }

        .footer-disclaimer-card { background: white; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; }
        .d-title { font-size: 13px; font-weight: 800; color: #ef4444; margin-bottom: 12px; text-transform: uppercase; }
        .footer-disclaimer-card p { font-size: 13px; line-height: 1.6; color: #64748b; }

        .footer-bottom { border-top: 1px solid #e2e8f0; pt: 40px; text-align: center; font-size: 14px; }
        .heart { color: #ef4444; display: inline; vertical-align: middle; }

        @media (max-width: 992px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
