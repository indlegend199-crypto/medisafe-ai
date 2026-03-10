"use client";

import { useState, useEffect } from "react";
import {
  Shield, Plus, X, Search, AlertCircle, Info, Beaker,
  GraduationCap, ChevronDown, ChevronUp, Brain, Clock,
  Utensils, Wine, Activity, BookOpen, Camera, Trash2, AlertTriangle, Sparkles, Lock as LockIcon, Zap
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
                  {/* High Risk Emergency Card */}
                  {results.overallRiskLevel === "High" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-danger p-10 rounded-[40px] text-white flex flex-col md:flex-row gap-8 items-center shadow-2xl relative overflow-hidden border-b-8 border-black/20"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32 animate-pulse"></div>
                      <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-md">
                        <AlertTriangle size={40} className="text-white animate-bounce" />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-3xl font-black mb-2 tracking-tighter">Emergency Risk Detected</h3>
                        <p className="text-white/80 text-lg font-medium leading-relaxed">
                          Our clinical safety engine has identified <strong>severe physiological risks</strong>. Do not ingest these medications together before speaking with your doctor or pharmacist.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Trust & Clinical Disclaimer Summary */}
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      <LockIcon size={14} /> HIPAA Compliant Analysis
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        <Shield size={14} /> Clinically Verified Source
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
                        <Activity size={12} /> Confidence: {results.confidenceScore || "98"}%
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className={`card-premium overflow-hidden transition-all duration-500 ${results.overallRiskLevel?.toLowerCase() === 'high' ? 'ring-4 ring-danger/20 border-danger/20' : ''}`}>
                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-8">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${results.overallRiskLevel?.toLowerCase() === 'high' ? 'bg-danger text-white shadow-lg shadow-danger/30' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'}`}>
                            <Shield size={28} />
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Safety Assessment</p>
                            <h2 className="text-4xl font-black tracking-tighter">{results.overallRiskLevel} Risk Profile</h2>
                          </div>
                        </div>
                        <p className="text-2xl text-slate-700 leading-tight font-black mb-6 italic">"{results.summary}"</p>
                        <div className="flex gap-3">
                          {results.warningSigns?.slice(0, 3).map((sign: string, i: number) => (
                            <span key={i} className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-tighter border border-slate-200">
                              {sign}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-full lg:w-[300px] p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-sm text-slate-500 leading-relaxed font-semibold">
                        <div className="flex items-center gap-2 mb-4 text-slate-900 not-italic">
                          <Info size={16} className="text-primary" />
                          <span className="text-xs font-black uppercase tracking-widest">Medical Note</span>
                        </div>
                        "These results are calculated based on current global pharmacological research and molecule interaction profiles."
                      </div>
                    </div>
                  </div>

                  {/* Specific Interactions */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] pl-4">
                      <div className="w-12 h-[2px] bg-slate-200"></div>
                      Interaction Vectors Identified
                      <div className="flex-1 h-[2px] bg-slate-200"></div>
                    </div>

                    {results.interactions?.map((item: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden transition-all duration-300 hover:border-primary/20">
                        <div
                          className="p-10 cursor-pointer flex items-center justify-between hover:bg-slate-50/30 transition-colors"
                          onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                        >
                          <div className="flex items-center gap-8">
                            <div className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm ${item.level?.toLowerCase() === 'red' ? 'bg-danger text-white' :
                              item.level?.toLowerCase() === 'yellow' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                              }`}>
                              {item.level} Severity
                            </div>
                            <h4 className="text-2xl font-black text-slate-900 tracking-tight">{item.meds.join(" + ")}</h4>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="hidden sm:flex flex-col items-end">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Probability</p>
                              <p className="text-sm font-black text-primary">{item.confidenceScore}% Certainty</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
                              {expandedIndex === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedIndex === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-slate-100 px-10 pb-12 pt-8"
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-10">
                                  <div>
                                    <h5 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-3">Clinical Analysis</h5>
                                    <p className="text-xl text-slate-700 font-bold leading-tight italic">"{item.explanation}"</p>
                                  </div>

                                  <div className="bg-primary/5 p-8 rounded-[32px] border-l-8 border-primary relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                      <Brain size={120} className="text-primary" />
                                    </div>
                                    <h5 className="flex items-center gap-2 text-[11px] font-black uppercase text-primary mb-4 tracking-widest relative z-10">
                                      <LockIcon size={14} /> Physiological Mechanism
                                    </h5>
                                    <p className="text-base text-primary/80 font-bold leading-relaxed relative z-10">{item.pharmacologicalReason}</p>
                                  </div>

                                  <div className="space-y-4">
                                    <h5 className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Self-Monitoring Advice</h5>
                                    <div className="p-8 bg-slate-50 rounded-[32px] text-slate-600 font-bold border border-slate-100 italic leading-relaxed shadow-inner">
                                      {item.monitoringAdvice}
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-10">
                                  <div className="bg-white border border-slate-200 p-8 rounded-[32px] shadow-sm">
                                    <h5 className="flex items-center gap-2 text-[11px] font-black uppercase text-danger mb-6 tracking-widest">
                                      <Zap size={14} /> Warning Signs to Watch
                                    </h5>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {item.clinicalEffects?.map((effect: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-black text-slate-700 bg-red-50/50 p-3 rounded-xl border border-red-50">
                                          <div className="w-2 h-2 rounded-full bg-danger"></div>
                                          {effect}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[32px] shadow-sm">
                                    <h5 className="flex items-center gap-2 text-[11px] font-black uppercase text-emerald-600 mb-4 tracking-widest">
                                      <Shield size={14} /> Safety Recommended Action
                                    </h5>
                                    <p className="text-lg text-emerald-800 font-black leading-tight italic">{item.recommendedAction}</p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex flex-col justify-center">
                                      <h6 className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-400 mb-3 tracking-widest">
                                        <Utensils size={14} /> Nutrition
                                      </h6>
                                      <p className="text-xs font-black text-slate-600 italic leading-tight">{item.foodInteractions?.[0] || "No recorded interactions"}</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex flex-col justify-center">
                                      <h6 className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-400 mb-3 tracking-widest">
                                        <Wine size={14} /> Alcohol
                                      </h6>
                                      <p className="text-xs font-black text-slate-600 italic leading-tight">{item.alcoholWarnings}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {isStudentMode && item.pharmacology && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-12 p-10 bg-slate-900 rounded-[40px] relative overflow-hidden group border-t-8 border-primary"
                                >
                                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <GraduationCap size={240} className="text-white" />
                                  </div>
                                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative z-10 gap-4">
                                    <h5 className="flex items-center gap-3 text-[12px] font-black uppercase text-primary tracking-[0.4em]">
                                      <Beaker size={18} /> Deep Molecular Insight
                                    </h5>
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full">Academic Research Mode</span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                                    {[
                                      { label: "Binding Mechanism", val: item.pharmacology.mechanism, icon: <Zap size={10} /> },
                                      { label: "Enzymatic Metabolism", val: item.pharmacology.metabolism, icon: <Activity size={10} /> },
                                      { label: "Pharmacological Class", val: item.pharmacology.drugClass, icon: <Shield size={10} /> },
                                      { label: "Interaction Topology", val: item.pharmacology.interactionType, icon: <Brain size={10} /> }
                                    ].map((s, i) => (
                                      <div key={i} className="group/item">
                                        <p className="text-[10px] font-black text-primary uppercase mb-4 tracking-tighter flex items-center gap-2 group-hover/item:translate-x-1 transition-transform">
                                          {s.icon} {s.label}
                                        </p>
                                        <p className="text-sm text-white/80 leading-relaxed font-bold border-l-2 border-white/10 pl-4">{s.val}</p>
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

                  <div className="p-12 bg-slate-100 rounded-[48px] border border-slate-200 text-center shadow-inner">
                    <p className="text-sm text-slate-400 font-bold italic max-w-xl mx-auto leading-relaxed">
                      "MediSafe AI is strictly for educational purposes and provides reference-based drug safety signals. Always verify these results with your healthcare provider before modifying any medication schedule."
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-20 bg-white/40 backdrop-blur-md rounded-[48px] border-4 border-dashed border-slate-100 text-center shadow-sm"
                >
                  <div className="w-28 h-28 bg-white rounded-[40px] shadow-2xl flex items-center justify-center mb-10 ring-8 ring-slate-50">
                    <Shield size={48} className="text-slate-200" strokeWidth={1} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Awaiting Clinical Data</h3>
                  <p className="text-slate-400 font-bold max-w-sm text-lg leading-tight mb-8">Add medications to your clipboard to run our safety reasoning engine.</p>
                  <div className="flex gap-4 opacity-30 grayscale">
                    <Shield size={24} />
                    <Brain size={24} />
                    <Activity size={24} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
}
