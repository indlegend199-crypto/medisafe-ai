"use client";

import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <div className={`app-layout ${isHome ? "home-layout" : "dashboard-layout"} bg-bg-deep text-white selection:bg-primary/30 min-h-screen overflow-x-hidden`}>
            {!isHome && <Sidebar />}
            
            <main className={`main-content-wrapper relative flex-1 ${!isHome ? 'p-10 lg:p-16' : ''}`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative z-10 h-full"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>

                {/* Background Noise/Texture */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                {/* Secondary Mesh Gradient */}
                <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] -z-10 rounded-full"></div>
            </main>

            <style jsx global>{`
                .app-layout {
                    display: flex;
                    background: #050a14;
                }
                
                .dashboard-layout .main-content-wrapper {
                    background: transparent;
                }

                @media (min-width: 1024px) {
                    .dashboard-layout .main-content-wrapper {
                        /* Match Sidebar.tsx width */
                        max-width: calc(100% - 320px);
                    }
                }

                /* Custom Scrollbar for the whole app */
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(37, 99, 235, 0.2);
                }

                /* Ensure containers inside dashboard don't have old margins/padding */
                .dashboard-layout .container {
                    max-width: 100% !important;
                    padding: 0 !important;
                }
            `}</style>
        </div>
    );
}
