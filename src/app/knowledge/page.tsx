"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Search, Info, AlertTriangle, Wine, Utensils, ClipboardList, ChevronRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const MEDICINE_DATA = [
    {
        name: "Metformin",
        class: "Biguanide",
        use: "Type 2 Diabetes mellitus",
        dosage: "500mg to 2000mg daily",
        sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste"],
        warnings: ["Lactic acidosis (rare but serious)", "Kidney function monitoring required"],
        food: "Take with meals to reduce stomach side effects.",
        alcohol: "Avoid excessive alcohol as it increases risk of lactic acidosis.",
        explanation: "Metformin is commonly used to control blood sugar in people with type 2 diabetes. It works by reducing glucose production in the liver and helping the body use insulin better."
    },
    {
        name: "Atorvastatin",
        class: "HMG-CoA Reductase Inhibitor (Statin)",
        use: "High cholesterol, Heart disease prevention",
        dosage: "10mg to 80mg daily",
        sideEffects: ["Muscle pain", "Joint pain", "Diarrhea", "Liver enzyme changes"],
        warnings: ["Unexplained muscle pain or weakness", "Dark colored urine"],
        food: "Can be taken with or without food.",
        alcohol: "Limit alcohol; high intake may increase risk of liver side effects.",
        explanation: "Atorvastatin helps lower 'bad' cholesterol (LDL) and fats (triglycerides) while raising 'good' cholesterol (HDL) in the blood. This reduces the risk of heart attack and stroke."
    },
    {
        name: "Lisinopril",
        class: "ACE Inhibitor",
        use: "High blood pressure (Hypertension), Heart failure",
        dosage: "5mg to 40mg daily",
        sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue"],
        warnings: ["Swelling of face/lips/tongue (Angioedema)", "High potassium levels"],
        food: "Take at the same time each day, with or without food.",
        alcohol: "Alcohol can increase the blood pressure-lowering effect, causing dizziness.",
        explanation: "Lisinopril relaxes blood vessels so blood can flow more easily, which lowers blood pressure and makes it easier for the heart to pump."
    }
];

export default function KnowledgePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMed, setSelectedMed] = useState<any>(null);

    const filteredMeds = MEDICINE_DATA.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="knowledge-page">
            <NavBar />

            <main className="container main-content">
                <header className="page-header">
                    <div className="header-badge">
                        <BookOpen size={16} /> Medicine Knowledge Base
                    </div>
                    <h1>Medicine Knowledge Cards</h1>
                    <p className="subtitle">Simple, easy-to-understand guides for common prescriptions.</p>
                </header>

                <section className="search-section">
                    <div className="search-bar">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search for a medicine (e.g. Metformin)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </section>

                <div className="knowledge-layout">
                    <div className="med-list">
                        {filteredMeds.map((med, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 5 }}
                                className={`med-list-item ${selectedMed?.name === med.name ? 'active' : ''}`}
                                onClick={() => setSelectedMed(med)}
                            >
                                <div>
                                    <h4>{med.name}</h4>
                                    <span>{med.class}</span>
                                </div>
                                <ChevronRight size={18} />
                            </motion.div>
                        ))}
                        {filteredMeds.length === 0 && (
                            <div className="no-results">No medicines found matching your search.</div>
                        )}
                    </div>

                    <div className="med-detail-view">
                        {selectedMed ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={selectedMed.name}
                                className="card med-detail-card"
                            >
                                <div className="detail-header">
                                    <div className="title-area">
                                        <h2>{selectedMed.name}</h2>
                                        <span className="class-badge">{selectedMed.class}</span>
                                    </div>
                                    <div className="explanation-box">
                                        <p>{selectedMed.explanation}</p>
                                    </div>
                                </div>

                                <div className="info-grid">
                                    <div className="info-item">
                                        <h5><ClipboardList size={18} /> Medical Use</h5>
                                        <p>{selectedMed.use}</p>
                                    </div>
                                    <div className="info-item">
                                        <h5><Info size={18} /> Typical Dosage</h5>
                                        <p>{selectedMed.dosage}</p>
                                    </div>
                                    <div className="info-item full-width">
                                        <h5><AlertTriangle size={18} /> Side Effects & Warnings</h5>
                                        <div className="warn-grid">
                                            <div className="warn-list">
                                                <strong>Common:</strong>
                                                <ul>{selectedMed.sideEffects.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                                            </div>
                                            <div className="warn-list serious">
                                                <strong>Serious Warning Signs:</strong>
                                                <ul>{selectedMed.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}</ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <h5><Utensils size={18} /> Food Interaction</h5>
                                        <p>{selectedMed.food}</p>
                                    </div>
                                    <div className="info-item">
                                        <h5><Wine size={18} /> Alcohol Interaction</h5>
                                        <p>{selectedMed.alcohol}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="empty-detail card">
                                <BookOpen size={48} strokeWidth={1} color="var(--border)" />
                                <h3>Select a Medicine</h3>
                                <p>Choose a medication from the list to view detailed safety information and explanations.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />

            <style jsx>{`
        .knowledge-page { background: var(--background); min-height: 100vh; }
        .main-content { padding-top: 60px; padding-bottom: 100px; }
        .page-header { text-align: center; margin-bottom: 40px; }
        
        .search-section { max-width: 600px; margin: 0 auto 48px; }
        .search-bar { 
          display: flex; align-items: center; gap: 12px; 
          background: white; border: 1px solid var(--border);
          padding: 12px 20px; border-radius: 999px;
          box-shadow: var(--shadow-sm);
        }
        .search-bar input { border: none; flex: 1; font-size: 16px; padding: 0; box-shadow: none; }

        .knowledge-layout { display: grid; grid-template-columns: 300px 1fr; gap: 32px; }
        
        .med-list { display: flex; flex-direction: column; gap: 10px; }
        .med-list-item { 
          padding: 16px; background: white; border: 1px solid var(--border);
          border-radius: var(--radius-md); cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          transition: all 0.2s ease;
        }
        .med-list-item:hover { border-color: var(--primary); background: var(--primary-light); }
        .med-list-item.active { border-color: var(--primary); border-left: 4px solid var(--primary); background: #eff6ff; }
        .med-list-item h4 { font-size: 16px; margin-bottom: 4px; }
        .med-list-item span { font-size: 12px; color: var(--text-muted); }

        .med-detail-card { padding: 40px; }
        .detail-header { margin-bottom: 32px; border-bottom: 1px solid var(--border); padding-bottom: 32px; }
        .title-area { display: flex; align-items: baseline; gap: 16px; margin-bottom: 16px; }
        .class-badge { background: var(--primary-light); color: var(--primary); padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; }
        
        .explanation-box { background: #f1f5f9; padding: 20px; border-radius: var(--radius-md); font-size: 16px; color: var(--text-main); line-height: 1.6; }

        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .info-item h5 { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: var(--primary); }
        .info-item p { font-size: 15px; color: var(--text-muted); line-height: 1.5; }
        .full-width { grid-column: span 2; }

        .warn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; background: #fff; border-radius: 8px; }
        .warn-list strong { display: block; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; color: var(--text-main); }
        .warn-list ul { padding-left: 18px; color: var(--text-muted); font-size: 14px; }
        .serious strong { color: var(--danger); }
        .serious ul { color: #991b1b; }

        .empty-detail { height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 16px; }

        @media (max-width: 992px) {
          .knowledge-layout { grid-template-columns: 1fr; }
          .med-list { flex-direction: row; overflow-x: auto; padding-bottom: 10px; }
          .med-list-item { min-width: 200px; flex-shrink: 0; }
          .info-grid { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
        }
      `}</style>
        </div>
    );
}
