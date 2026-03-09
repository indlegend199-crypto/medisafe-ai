"use client";

import { useState, useEffect } from "react";
import {
  Shield, Plus, X, Search, AlertCircle, Info, Beaker,
  GraduationCap, ChevronDown, ChevronUp, Brain, Clock,
  Utensils, Wine, Activity, BookOpen, Camera, Trash2, AlertTriangle, Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeInteractions } from "@/lib/gemini";

export default function CheckerPage() {
  const [medicines, setMedicines] = useState<string[]>(["", ""]);
  const [isStudentMode, setIsStudentMode] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addMedicine = () => {
    if (medicines.length < 10) {
      setMedicines([...medicines, ""]);
      setError(null);
    }
  };

  const removeMedicine = (index: number) => {
    const newMeds = medicines.filter((_, i) => i !== index);
    setMedicines(newMeds.length >= 2 ? newMeds : [...newMeds, ""]);
    setError(null);
  };

  const updateMedicine = (index: number, value: string) => {
    const newMeds = [...medicines];
    newMeds[index] = value;
    setMedicines(newMeds);
    setError(null);
  };

  const handleCheck = async () => {
    const trimmed = medicines.map(m => m.trim());
    const filteredMeds = trimmed.filter(m => m.length > 0);

    if (filteredMeds.length < 2) {
      setError("Please enter at least 2 medicine names to perform a safety check.");
      return;
    }

    const uniqueMeds = new Set(filteredMeds.map(m => m.toLowerCase()));
    if (uniqueMeds.size !== filteredMeds.length) {
      setError("Duplicate medicines detected. Please remove duplicates for a clear analysis.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeInteractions(filteredMeds, isStudentMode);
      setResults(data);
      setExpandedIndex(0);
    } catch (err: any) {
      setError("Molecular analysis failed. This could be due to an unrecognized medicine name or network error.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setMedicines(["", ""]);
    setResults(null);
    setError(null);
  };

  return (
    <div className="checker-page pb-20 pt-10">
      <main className="container max-w-6xl">
        <header className="page-header mb-12 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <Shield size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full">
              Clinical Safety Engine
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-4">Drug Interaction <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-slate-500 text-lg max-w-2xl">Identify potential risks between multiple prescription and over-the-counter medications using pharmaceutical-grade reasoning.</p>
        </header>

        <div className="checker-grid lg:grid-cols-[400px_1fr] grid gap-10">
          {/* Input Section */}
          <section className="input-section sticky top-10">
            <div className="card glass-morphism border-white/40 shadow-xl rounded-[32px] p-8">
              <div className="section-title flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-slate-900">
                  <Search size={20} />
                  <h3 className="font-black text-lg">Medication List</h3>
                </div>
                <button className="text-xs font-bold text-slate-400 hover:text-danger underline" onClick={clearAll}>Clear All</button>
              </div>

              <div className="med-inputs space-y-3 mb-8">
                {medicines.map((med, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">{index + 1}</span>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="e.g. Ibuprofen"
                        value={med}
                        onChange={(e) => updateMedicine(index, e.target.value)}
                        className="w-full bg-white/50 border-slate-200 focus:bg-white text-sm font-semibold rounded-2xl"
                      />
                    </div>
                    {medicines.length > 2 && (
                      <button onClick={() => removeMedicine(index)} className="p-2 text-slate-300 hover:text-danger transition-colors">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-danger/5 border border-danger/10 text-danger p-4 rounded-2xl text-xs font-bold mb-6 flex items-start gap-2"
                  >
                    <AlertTriangle size={14} className="shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <button onClick={addMedicine} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2" disabled={medicines.length >= 10}>
                  <Plus size={16} /> Add Medicine (Up to 10)
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const saved = localStorage.getItem("medisafe_vault");
                      if (saved) {
                        const vault = JSON.parse(saved);
                        const names = vault.map((m: any) => m.name);
                        if (names.length > 0) {
                          setMedicines(names.length >= 2 ? names : [...names, ""]);
                          setError(null);
                        } else {
                          setError("Your vault is empty. Add medicines in the Vault tab first.");
                        }
                      } else {
                        setError("No vault data found. Create your profile in the Vault tab.");
                      }
                    }}
                    className="flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-slate-100 italic transition-all"
                  >
                    <BookOpen size={14} /> From Vault
                  </button>
                  <Link href="/scanner" className="flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-slate-100 italic transition-all">
                    <Camera size={14} /> Scan Rx
                  </Link>
                </div>

                <div className="bg-slate-900/5 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-slate-600" />
                    <span className="text-[10px] font-black uppercase text-slate-600">Clinical Student Mode</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={isStudentMode} onChange={() => setIsStudentMode(!isStudentMode)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <button
                  onClick={handleCheck}
                  disabled={isLoading || medicines.filter(m => m.trim()).length < 2}
                  className="btn-primary w-full py-5 rounded-[20px] shadow-2xl disabled:opacity-50 disabled:shadow-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing Molecular Data...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} />
                      <span>Check Interactions</span>
                    </div>
                  )}
                </button>

                <p className="text-[10px] text-center font-bold text-slate-400 flex items-center justify-center gap-1 italic">
                  <Info size={10} /> Powered by MediSafe AI Patient Safety Protocols
                </p>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="results-section">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-[40px] border border-slate-100 p-20 text-center shadow-xl"
                >
                  <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Brain size={40} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Cross-Referencing Profiles</h3>
                  <p className="text-slate-400 font-medium">Querying global clinical drug interaction databases...</p>
                </motion.div>
              ) : results ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* High Risk Warning Overlay if needed */}
                  {results.overallRiskLevel === "High" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-danger p-8 rounded-[32px] text-white flex gap-6 items-center shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                        <AlertCircle size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black mb-1">Severe Risk Detected</h3>
                        <p className="text-white/80 text-sm font-medium">Critical safety warnings identified. Consult your physician immediately.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Summary Card */}
                  <div className={`card overflow-hidden shadow-2xl rounded-[40px] border-none ${results.overallRiskLevel?.toLowerCase() === 'high' ? 'bg-danger/5 ring-4 ring-danger/10' : 'bg-white'}`}>
                    <div className="p-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${results.overallRiskLevel?.toLowerCase() === 'high' ? 'bg-danger text-white' : 'bg-emerald-500 text-white'}`}>
                            <Shield size={24} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Aggregated Safety Profile</p>
                            <h2 className="text-3xl font-black tracking-tighter">{results.overallRiskLevel} Risk</h2>
                          </div>
                        </div>
                        <div className="bg-slate-100 px-4 py-2 rounded-2xl text-[10px] font-black text-slate-500">
                          AI Sourced: {results.source || "MediSafe AI"}
                        </div>
                      </div>
                      <p className="text-slate-600 text-lg leading-relaxed font-medium italic">"{results.summary}"</p>
                    </div>
                  </div>

                  {/* Treatment Explainer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.treatmentExplanations?.map((exp: any, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <h4 className="font-black text-slate-900 text-xl tracking-tight">{exp.name}</h4>
                          <span className="bg-primary/5 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase italic">{exp.condition}</span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                              <Sparkles size={14} className="text-primary/60" />
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed italic"><span className="text-slate-800 font-bold block mb-1">Mechanism of Action</span> {exp.howItWorks}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 text-[10px] font-black text-slate-400 uppercase">
                            <Clock size={12} /> Optimization: {exp.timing}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Specific Interactions */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest pl-4">
                      <div className="w-10 h-[1px] bg-slate-200"></div>
                      Detected Interaction Patterns
                      <div className="flex-1 h-[1px] bg-slate-200"></div>
                    </div>

                    {results.interactions?.map((item: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-[32px] border border-slate-100 shadow-lg overflow-hidden transition-all duration-300">
                        <div
                          className="p-8 cursor-pointer flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                          onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                        >
                          <div className="flex items-center gap-6">
                            <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter ${item.level?.toLowerCase() === 'red' ? 'bg-danger text-white' :
                              item.level?.toLowerCase() === 'yellow' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                              }`}>
                              {item.level} Severity
                            </div>
                            <h4 className="text-xl font-black text-slate-900 tracking-tight">{item.meds.join(" + ")}</h4>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase italic">Conf: {item.confidenceScore}%</span>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                              {expandedIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedIndex === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-slate-100 px-8 pb-10 pt-6"
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-8">
                                  <div>
                                    <h5 className="text-[10px] font-black uppercase text-slate-400 mb-2">AI Summary</h5>
                                    <p className="text-slate-700 text-lg font-medium italic">"{item.explanation}"</p>
                                  </div>

                                  <div className="bg-primary/5 p-6 rounded-3xl border-l-4 border-primary">
                                    <h5 className="flex items-center gap-2 text-[10px] font-black uppercase text-primary mb-3">
                                      <Brain size={14} /> Medical Reasoning
                                    </h5>
                                    <p className="text-sm text-primary/80 leading-relaxed font-semibold">{item.pharmacologicalReason}</p>
                                  </div>

                                  <div className="space-y-4">
                                    <h5 className="text-[10px] font-black uppercase text-slate-400">Monitoring Guidance</h5>
                                    <div className="p-6 bg-slate-50 rounded-2xl text-slate-600 text-sm font-medium border border-slate-100 italic leading-relaxed">
                                      {item.monitoringAdvice}
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-8">
                                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                                    <h5 className="flex items-center gap-2 text-[10px] font-black uppercase text-danger mb-4">
                                      <AlertCircle size={14} /> Clinical Effects
                                    </h5>
                                    <ul className="space-y-2">
                                      {item.clinicalEffects?.map((effect: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                          <div className="w-1.5 h-1.5 rounded-full bg-danger"></div>
                                          {effect}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl">
                                    <h5 className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 mb-3">
                                      <Shield size={14} /> Safety Recommendation
                                    </h5>
                                    <p className="text-sm text-emerald-700 font-black leading-relaxed italic">{item.recommendedAction}</p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                      <h6 className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <Utensils size={12} /> Food
                                      </h6>
                                      <p className="text-[10px] font-bold text-slate-600 italic leading-tight">{item.foodInteractions?.[0] || "None known"}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                      <h6 className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <Wine size={12} /> Alcohol
                                      </h6>
                                      <p className="text-[10px] font-bold text-slate-600 italic leading-tight">{item.alcoholWarnings}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {isStudentMode && item.pharmacology && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="mt-10 p-8 bg-slate-900 rounded-3xl relative overflow-hidden group"
                                >
                                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <GraduationCap size={160} className="text-white" />
                                  </div>
                                  <h5 className="flex items-center gap-2 text-[10px] font-black uppercase text-primary mb-6 tracking-widest relative z-10">
                                    <Beaker size={14} /> Pharma Pro Insight layer
                                  </h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                                    {[
                                      { label: "Mechanism", val: item.pharmacology.mechanism },
                                      { label: "Metabolism", val: item.pharmacology.metabolism },
                                      { label: "Drug Class", val: item.pharmacology.drugClass },
                                      { label: "Type", val: item.pharmacology.interactionType }
                                    ].map((s, i) => (
                                      <div key={i}>
                                        <p className="text-[9px] font-black text-white/40 uppercase mb-2 tracking-tighter">{s.label}</p>
                                        <p className="text-xs text-white leading-relaxed font-medium">{s.val}</p>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 text-center">
                    <p className="text-xs text-slate-400 font-bold italic max-w-lg mx-auto leading-relaxed">
                      “The information provided is for educational reference. MediSafe AI does not replace clinical consultation. Always follow your doctor's specific verbal and written instructions.”
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-20 bg-white/40 backdrop-blur-sm rounded-[40px] border-2 border-dashed border-slate-200 text-center"
                >
                  <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-8">
                    <Shield size={40} className="text-slate-200" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-4">Awaiting Analysis</h3>
                  <p className="text-slate-400 font-medium max-w-sm">Enter at least 2 medications to launch the safety engine and identify potential risk vectors.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
}
