"use client";

import { useState, useRef, useEffect } from "react";
import {
    Brain, Send, Shield, Info, Sparkles, MessageSquare,
    Bot, User, AlertCircle, Bookmark, RefreshCcw, Lock as LockIcon,
    History, Search, Activity, Microscope, Pill, X, Sparkle, Zap, Terminal, Command
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { askAIAssistant } from "@/lib/gemini";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
    sections?: { title: string; content: string }[];
    disclaimer?: string;
    timestamp: Date;
}

export default function AssistantPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const result = await askAIAssistant(input);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: result.answer || "I'm sorry, I couldn't process that request.",
                sections: result.sections,
                disclaimer: result.disclaimer,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestedQueries = [
        "Can I take Paracetamol with Ibuprofen?",
        "What are the side effects of Metformin?",
        "Is Amoxicillin safe during pregnancy?",
        "How should I store Insulin?"
    ];

    return (
        <div className="flex flex-col h-screen -m-10 relative overflow-hidden">
            {/* Premium Gradient Top Shell */}
            <div className="dashboard-shell"></div>

            {/* Header */}
            <header className="px-10 py-8 border-b border-white/5 bg-white/[0.02] backdrop-blur-3xl shrink-0 relative z-20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-grad-primary rounded-[28px] shadow-2xl shadow-primary/30 flex items-center justify-center text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                            <Bot size={32} className="relative z-10" />
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-black text-white tracking-tighter">Clinical <span className="text-gradient">Assistant</span></h1>
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-black uppercase rounded-lg border border-primary/20 tracking-widest leading-none">Neural V2.4</span>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Zap size={12} className="text-amber-400" /> Real-time Pharmaceutical Reasoning Enabled
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-10">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Knowledge Cluster</p>
                            <div className="flex items-center gap-2 justify-end">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <p className="text-xs font-black text-white uppercase tracking-tighter">OpenFDA + RxNorm Global</p>
                            </div>
                        </div>
                        <div className="h-12 w-[1px] bg-white/5"></div>
                        <div className="flex items-center gap-4 bg-emerald-500/10 px-6 py-3 rounded-2xl border border-emerald-500/20 text-emerald-400 shadow-lg">
                            <Shield size={18} />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-widest">Quantum Encryption</span>
                                <span className="text-[7px] font-bold uppercase opacity-60">AES-256 Symmetric</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat Body */}
            <main className="flex-1 overflow-hidden relative z-10">
                <div ref={scrollRef} className="h-full overflow-y-auto max-w-7xl mx-auto px-10 py-12 space-y-12 pb-48 scroll-smooth custom-scrollbar">
                    <AnimatePresence>
                        {messages.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-4xl mx-auto"
                            >
                                <div className="w-32 h-32 bg-grad-dark rounded-[48px] shadow-2xl border border-white/5 flex items-center justify-center text-primary mb-12 relative group">
                                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                    <Terminal size={56} className="relative z-10" />
                                </div>
                                <h2 className="text-6xl font-black text-white mb-8 tracking-tighter">Initialize Clinical <span className="text-gradient italic">Dialogue</span></h2>
                                <p className="text-slate-500 font-bold mb-16 text-xl max-w-2xl mx-auto leading-relaxed">Secure pharmaceutical intelligence node for automated medication safety reasoning and clinical data synthesis.</p>

                                <div className="grid grid-cols-2 gap-6 w-full">
                                    {suggestedQueries.map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setInput(q)}
                                            className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] text-left hover:border-primary/40 hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity">
                                                <Command size={80} />
                                            </div>
                                            <p className="text-[10px] font-black text-slate-600 mb-3 group-hover:text-primary uppercase tracking-[0.3em] transition-colors">Neural Suggestion {idx + 1}</p>
                                            <p className="text-lg font-black text-white leading-tight tracking-tight">{q}</p>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] lg:max-w-5xl flex gap-8 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl ${msg.role === 'user' ? 'bg-grad-primary text-white' : 'bg-grad-dark text-primary border border-white/10'}`}>
                                            {msg.role === 'user' ? <User size={26} /> : <Bot size={26} />}
                                        </div>
                                        <div className={`space-y-8 ${msg.role === 'user' ? 'items-end' : ''} flex-1`}>
                                            <div className={`p-10 rounded-[48px] shadow-2xl border backdrop-blur-3xl transition-all duration-500 ${msg.role === 'user' ? 'bg-white/[0.05] border-white/10 text-white rounded-tr-none' : 'bg-white/[0.02] border-white/5 text-slate-200 rounded-tl-none hover:border-white/10'}`}>
                                                <p className="text-lg font-bold leading-relaxed tracking-tight">{msg.content}</p>
                                            </div>

                                            {msg.role === 'bot' && msg.sections && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-4">
                                                    {msg.sections.map((sec, idx) => (
                                                        <div key={idx} className="card-premium !bg-white/[0.02] !p-8 border-white/5 hover:border-primary/40 transition-all duration-500 group/sec">
                                                            <div className="flex items-center gap-3 mb-5">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-lg shadow-primary"></div>
                                                                <h4 className="label-caps !text-[11px] !m-0 !text-primary tracking-[0.3em]">{sec.title}</h4>
                                                            </div>
                                                            <p className="text-[13px] font-bold text-slate-400 leading-relaxed italic border-l border-white/10 pl-6 group-hover/sec:border-primary/30 transition-colors">"{sec.content}"</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {msg.role === 'bot' && msg.disclaimer && (
                                                <div className="flex gap-6 bg-amber-500/5 p-8 rounded-[40px] border border-amber-500/10 ml-4 group/alert">
                                                    <AlertCircle size={24} className="text-amber-500 shrink-0 mt-1 animate-pulse" />
                                                    <p className="text-[11px] font-black text-amber-500/70 uppercase tracking-widest leading-relaxed italic">{msg.disclaimer}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>

                    {isLoading && (
                        <div className="flex gap-8 animate-fade ml-2">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                                <Bot size={26} className="text-primary animate-pulse" />
                            </div>
                            <div className="flex gap-3 items-center px-12 py-8 bg-white/[0.03] border border-white/5 rounded-[48px] rounded-tl-none shadow-2xl backdrop-blur-xl">
                                {[0, 150, 300].map((delay) => (
                                    <div key={delay} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }}></div>
                                ))}
                                <span className="ml-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Synthesizing Reasoning Path</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-bg-deep via-bg-deep to-transparent pointer-events-none">
                    <div className="max-w-5xl mx-auto pointer-events-auto">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-grad-primary opacity-0 group-focus-within:opacity-10 blur-3xl transition-opacity rounded-[48px]"></div>
                            <div className="relative flex items-center gap-6">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                                        placeholder="Enter clinical interrogation protocol..."
                                        className="input-premium !h-20 !pl-12 !pr-24 !rounded-[40px] !bg-white/[0.03] border-white/5 focus:border-primary/50 text-lg"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                                        {/* Optional Icon Space */}
                                    </div>
                                </div>
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="w-20 h-20 bg-grad-primary text-white rounded-[40px] flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                                >
                                    <Send size={28} />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-8 px-10">
                             <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">Proprietary Clinical Reasoning Matrix • Session Encrypted</p>
                             <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-700">
                                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></div> Latency: 42ms</span>
                                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div> Nodes: Stable</span>
                             </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(37, 99, 235, 0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(37, 99, 235, 0.2); }
            `}</style>
        </div>
    );
}
