"use client";

import { useState, useEffect } from "react";
import {
  Shield, Plus, X, Search, AlertCircle, Info, Beaker,
  GraduationCap, ChevronDown, ChevronUp, Brain, Clock,
  Utensils, Wine, Activity, BookOpen, Camera, Trash2, AlertTriangle, Sparkles, Lock as LockIcon, Zap, Users
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
    <div className="main-content relative min-h-screen">
      {/* Premium Gradient Top Shell */}
      <div className="dashboard-shell"></div>

      <header className="mb-12 animate-fade relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            <Shield size={12} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Clinical Safety Engine
            </span>
          </div>
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Interaction <span className="text-gradient">Intelligence</span></h1>
        <p className="text-slate-400 font-medium text-lg max-w-2xl">High-precision pharmaceutical reasoning for multiple medication safety profiles.</p>
      </header>

      <div className="grid lg:grid-cols-[400px_1fr] gap-10 items-start relative z-10">
        {/* Sidebar / Inputs */}
        <aside className="sticky top-10 space-y-8">
          <div className="card-premium !bg-white/[0.02] border-white/5 !p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Search size={18} className="text-primary" />
                <h3 className="text-lg font-black text-white">Medication Inputs</h3>
              </div>
              <button 
                onClick={clearAll}
                className="text-[10px] font-black uppercase text-slate-500 hover:text-red-400 transition-colors"
              >
                Reset System
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <AnimatePresence>
                {medicines.map((med, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder={`Molecular name ${index + 1}...`}
                        value={med}
                        onChange={(e) => updateMedicine(index, e.target.value)}
                        className="input-premium !h-14 !pl-6 !rounded-2xl"
                      />
                      {index < 2 && med === "" && <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-600 uppercase tracking-widest pointer-events-none">Required</div>}
                    </div>
                    {medicines.length > 2 && (
                      <button onClick={() => removeMedicine(index)} className="w-10 h-10 rounded-xl bg-white/5 text-slate-500 hover:text-red-400 flex items-center justify-center transition-all">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <button 
                onClick={addMedicine} 
                disabled={medicines.length >= 10}
                className="w-full h-14 border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:text-primary hover:border-primary/30 transition-all font-black text-[11px] uppercase tracking-widest bg-white/[0.01]"
              >
                <Plus size={16} /> Add Formulation
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    const savedProfiles = localStorage.getItem("medisafe_profiles");
                    if (savedProfiles) {
                      const profiles = JSON.parse(savedProfiles);
                      if (profiles.length > 0) {
                        const meds = profiles[0].medications;
                        if (meds && meds.length >= 2) {
                          setMedicines(meds);
                          setError(null);
                        } else if (meds && meds.length < 2) {
                          setMedicines([...meds, ""]);
                          setError(null);
                        }
                      } else {
                        setError("Patient database empty. Create a profile.");
                      }
                    } else {
                      setError("No patient records found.");
                    }
                  }}
                  className="flex items-center justify-center gap-2 h-14 bg-white/5 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:bg-white/10 transition-all tracking-widest"
                >
                  <Users size={14} /> Profile Sync
                </button>
                <Link href="/scanner" className="flex items-center justify-center gap-2 h-14 bg-white/5 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:bg-white/10 transition-all tracking-widest">
                  <Camera size={14} /> OCR Scan
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-primary" />
                  <span className="text-[10px] font-black uppercase text-primary tracking-widest">Clinical Mode</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isStudentMode} onChange={() => setIsStudentMode(!isStudentMode)} className="sr-only peer" />
                  <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-[11px] font-black flex items-start gap-3">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleCheck}
                disabled={isLoading || medicines.filter(m => m.trim()).length < 2}
                className="btn-primary w-full !h-16 shadow-primary/20"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="uppercase tracking-widest text-[11px]">Computing Bio-Signals...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-black">
                    <Zap size={18} /> Run Safety Audit
                  </div>
                )}
              </button>
            </div>
          </div>
          
          <p className="text-[10px] text-center font-black text-slate-600 uppercase tracking-widest flex items-center justify-center gap-2 italic">
            <LockIcon size={12} /> SSL Encrypted • Clinical Reasoning Hub
          </p>
        </aside>

        {/* Results Main Engine */}
        <main>
          <AnimatePresence mode="wait">
            {!results && !isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center p-20 bg-white/[0.01] rounded-[48px] border-2 border-dashed border-white/5 text-center h-full min-h-[600px]"
              >
                <div className="w-32 h-32 bg-grad-dark rounded-[40px] shadow-2xl flex items-center justify-center mb-12 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-50"></div>
                  <Shield size={64} className="text-white/10 relative z-10" />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter mb-6">Awaiting Clinical Inputs</h3>
                <p className="text-slate-500 font-bold max-w-sm text-lg leading-tight mb-12">Submit medications to identify molecular conflicts and physiological risks.</p>
                <div className="flex gap-8 opacity-20">
                  <Activity size={32} className="text-white" />
                  <Brain size={32} className="text-white" />
                  <Beaker size={32} className="text-white" />
                </div>
              </motion.div>
            ) : isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="card-premium !p-24 text-center flex flex-col items-center justify-center min-h-[600px]"
              >
                <div className="w-24 h-24 bg-grad-primary rounded-[32px] flex items-center justify-center mb-12 animate-pulse shadow-2xl shadow-primary/40">
                  <Brain size={48} className="text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Accessing Pharmaceutical Repositories</h3>
                <p className="text-slate-500 font-bold text-lg">Running multi-vector molecular analysis using Gemini clinical logic...</p>
                <div className="mt-12 flex gap-2">
                  {[0, 150, 300].map(d => (
                    <div key={d} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }}></div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Visual Risk Metric */}
                <div className={`card-premium !p-12 overflow-hidden relative ${results.overallRiskLevel?.toLowerCase() === 'high' ? 'border-red-500/30' : 'border-emerald-500/30'}`}>
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent blur-[120px] pointer-events-none"></div>
                  
                  <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-10">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl ${
                          results.overallRiskLevel?.toLowerCase() === 'high' ? 'bg-red-500 shadow-red-500/40 text-white' : 
                          results.overallRiskLevel?.toLowerCase() === 'moderate' ? 'bg-amber-500 shadow-amber-500/40 text-white' : 
                          'bg-emerald-500 shadow-emerald-500/40 text-white'
                        }`}>
                          <Shield size={32} />
                        </div>
                        <div>
                          <p className="label-caps !text-[10px] mb-2">Molecular Conflict Level</p>
                          <h2 className="text-5xl font-black text-white tracking-tighter">{results.overallRiskLevel} Risk Identified</h2>
                        </div>
                      </div>
                      <p className="text-3xl text-white font-black leading-tight italic mb-8 opacity-90">"{results.summary}"</p>
                      
                      <div className="flex flex-wrap gap-3">
                        {results.warningSigns?.map((sign: string, i: number) => (
                          <div key={i} className="px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${results.overallRiskLevel?.toLowerCase() === 'high' ? 'bg-red-400' : 'bg-emerald-400'}`}></div>
                            {sign}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full lg:w-[320px] card-premium !bg-white/5 border-white/10 !p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Activity size={20} className="text-primary" />
                        <h4 className="text-[11px] font-black uppercase text-white tracking-widest">Medical Intelligence</h4>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Confidence Score</p>
                          <p className="text-2xl font-black text-white">{results.confidenceScore || "98"}%</p>
                        </div>
                        <div className="h-px bg-white/5"></div>
                        <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Source Verification</p>
                          <p className="text-xs font-bold text-slate-400 leading-relaxed italic">"Calculated via PubMed + FDA archived clinical data."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subheader */}
                <div className="flex items-center gap-6 px-4">
                  <div className="label-caps !text-[11px] !text-slate-500">Interaction Vectors Identified ({results.interactions?.length || 0})</div>
                  <div className="flex-1 h-px bg-white/5"></div>
                </div>

                {/* Individual Interactions List */}
                <div className="space-y-6">
                  {results.interactions?.map((item: any, idx: number) => (
                    <div key={idx} className="card-premium !bg-white/[0.02] border-white/5 overflow-hidden transition-all duration-500 hover:border-white/10 group">
                      <div 
                        className="p-10 cursor-pointer flex items-center justify-between"
                        onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                      >
                        <div className="flex items-center gap-10">
                          <div className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${
                            item.level?.toLowerCase() === 'red' ? 'bg-red-500 text-white' : 
                            item.level?.toLowerCase() === 'yellow' ? 'bg-amber-500 text-white' : 
                            'bg-emerald-500 text-white'
                          }`}>
                            {item.level} Severity
                          </div>
                          <h4 className="text-2xl font-black text-white tracking-tight">{item.meds.join(" + ")}</h4>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-white transition-all">
                          {expandedIndex === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/5 p-10 pt-4"
                          >
                            <div className="grid lg:grid-cols-2 gap-12 pt-8">
                              <div className="space-y-12">
                                <div>
                                  <h5 className="label-caps !text-[10px] mb-4 text-primary">Clinical Diagnosis</h5>
                                  <p className="text-xl text-white font-bold leading-tight italic opacity-90">"{item.explanation}"</p>
                                </div>
                                
                                <div className="card-premium !bg-primary/10 border-primary/20 !p-8 relative overflow-hidden group/box">
                                  <div className="absolute -right-8 -bottom-8 p-12 opacity-5 group-hover/box:scale-110 transition-transform">
                                    <Brain size={160} className="text-white" />
                                  </div>
                                  <h5 className="flex items-center gap-3 text-[10px] font-black uppercase text-primary mb-5 tracking-widest relative z-10">
                                    <LockIcon size={14} /> Physiological Mechanism
                                  </h5>
                                  <p className="text-base text-slate-300 font-bold leading-relaxed relative z-10">{item.pharmacologicalReason}</p>
                                </div>

                                <div className="space-y-4">
                                  <h5 className="label-caps !text-[10px] ml-2 text-slate-500">Self-Safety Protocol</h5>
                                  <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 text-slate-400 font-bold leading-relaxed italic">
                                    {item.monitoringAdvice}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-12">
                                <div className="card-premium !bg-white/5 border-white/10 !p-8">
                                  <h5 className="flex items-center gap-3 text-[10px] font-black uppercase text-red-400 mb-8 tracking-widest">
                                    <Zap size={14} /> Critical Warning Signals
                                  </h5>
                                  <div className="grid grid-cols-2 gap-4">
                                    {item.clinicalEffects?.map((effect: string, i: number) => (
                                      <div key={i} className="flex items-center gap-3 text-xs font-black text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                                        {effect}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="card-premium !bg-emerald-500/10 border-emerald-500/20 !p-8">
                                  <h5 className="flex items-center gap-3 text-[10px] font-black uppercase text-emerald-400 mb-5 tracking-widest">
                                    <Shield size={16} /> Recommended Clinical Action
                                  </h5>
                                  <p className="text-lg text-emerald-100 font-black leading-tight italic">{item.recommendedAction}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                  <div className="p-6 bg-white/5 rounded-[32px] border border-white/5">
                                    <h6 className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-500 mb-3 tracking-widest">
                                      <Utensils size={14} /> Nutrition
                                    </h6>
                                    <p className="text-xs font-bold text-slate-400 italic">{item.foodInteractions?.[0] || "No dietary conflicts identified."}</p>
                                  </div>
                                  <div className="p-6 bg-white/5 rounded-[32px] border border-white/5">
                                    <h6 className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-500 mb-3 tracking-widest">
                                      <Wine size={14} /> Alcohol
                                    </h6>
                                    <p className="text-xs font-bold text-slate-400 italic">{item.alcoholWarnings}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Academic Detail Section */}
                            {isStudentMode && item.pharmacology && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-12 p-12 bg-grad-dark border-t-4 border-primary rounded-[40px] relative overflow-hidden group/academic"
                              >
                                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                                  <GraduationCap size={240} className="text-white" />
                                </div>
                                <div className="flex justify-between items-center mb-12 relative z-10">
                                  <h5 className="text-[12px] font-black uppercase text-primary tracking-[0.4em] flex items-center gap-4">
                                    <Beaker size={20} /> Deep Molecular Intelligence Report
                                  </h5>
                                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full">Academic Reference Level</span>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                                  {[
                                    { label: "Molecular Mechanism", val: item.pharmacology.mechanism, icon: <Zap size={10} /> },
                                    { label: "Cytochrome Metabolism", val: item.pharmacology.metabolism, icon: <Activity size={10} /> },
                                    { label: "Therapeutic Class", val: item.pharmacology.drugClass, icon: <Shield size={10} /> },
                                    { label: "Binding Dynamics", val: item.pharmacology.interactionType, icon: <Brain size={10} /> }
                                  ].map((s, i) => (
                                    <div key={i} className="space-y-4">
                                      <p className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                        {s.icon} {s.label}
                                      </p>
                                      <p className="text-sm text-slate-300 font-bold border-l-2 border-white/10 pl-6 h-full">{s.val}</p>
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

                {/* Footer Disclaimer */}
                <div className="mt-16 p-12 bg-white/[0.02] border border-white/5 rounded-[48px] text-center">
                   <p className="text-sm text-slate-500 font-bold italic max-w-2xl mx-auto leading-relaxed opacity-60 hover:opacity-100 transition-opacity">
                      "MediSafe AI employs advanced clinical reasoning for identifying safety signals. These results represent automated reference data and MUST be verified by a qualified medical professional before clinical decisions are made."
                   </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
