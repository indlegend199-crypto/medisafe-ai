"use client";

import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <div className={`app-layout ${isHome ? "home-layout" : "dashboard-layout"}`}>
            {!isHome && <Sidebar />}
            <div className="main-content-wrapper">
                {children}
            </div>

            <style jsx global>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
        }
        .dashboard-layout .main-content-wrapper {
          flex: 1;
          margin-left: 280px;
          background: #f8fafc;
        }
        
        @media (max-width: 992px) {
          .dashboard-layout .main-content-wrapper {
            margin-left: 0;
          }
        }

        /* Adjust internal containers for sidebar layout */
        .dashboard-layout .container {
          max-width: 100% !important;
          padding: 40px 60px !important;
        }

        @media (max-width: 1200px) {
          .dashboard-layout .container {
            padding: 40px 32px !important;
          }
        }
      `}</style>
        </div>
    );
}
