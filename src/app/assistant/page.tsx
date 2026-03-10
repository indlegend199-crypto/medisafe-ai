"use client";

import { useState, useRef, useEffect } from "react";
import {
    Brain, Send, Shield, Info, Sparkles, MessageSquare,
    Bot, User, AlertCircle, Bookmark, RefreshCcw, Lock as LockIcon,
    History, Search, Activity, Microscope, Pill, X, Sparkle
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
        setIsLoading(false);
    };

    const suggestedQueries = [
        "Can I take Paracetamol with Ibuprofen?",
        "What are the side effects of Metformin?",
        "Is Amoxicillin safe during pregnancy?",
        "How should I store Insulin?"
    ];

    return (
        <div className="flex flex-col h-screen -m-10">
            {/* Header */}
            <header className="px-10 py-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl shrink-0">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-grad-primary rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center text-white">
                            <Bot size={28} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-black text-white">MediSafe <span className="text-gradient">Assistant</span></h1>
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase rounded-md border border-primary/20 tracking-widest leading-none">V2.4 Cloud</span>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={12} className="text-amber-400" /> Powered by Clinical Intelligence
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Knowledge Engine</p>
                            <p className="text-xs font-black text-white uppercase">OpenFDA + RxNorm</p>
                        </div>
                        <div className="h-10 w-[1px] bg-white/5"></div>
                        <div className="flex items-center gap-3 bg-emerald-500/10 px-5 py-2.5 rounded-2xl border border-emerald-500/20 text-emerald-400">
                            <Shield size={16} />
                            <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat Body */}
            <main className="flex-1 overflow-hidden relative">
                <div ref={scrollRef} className="h-full overflow-y-auto max-w-7xl mx-auto px-10 py-10 space-y-10 pb-40">
                    <AnimatePresence>
                        {messages.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-3xl mx-auto"
                            >
                                <div className="w-24 h-24 bg-grad-dark rounded-[40px] shadow-2xl border border-white/5 flex items-center justify-center text-primary mb-10 relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                                    <MessageSquare size={48} className="relative z-10" />
                                </div>
                                <h2 className="text-5xl font-black text-white mb-6 tracking-tight">How can I assist your <span className="text-gradient">Health</span> today?</h2>
                                <p className="text-slate-500 font-bold mb-12 text-lg">Your clinical pharmacological assistant for medication safety and general wellness.</p>

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    {suggestedQueries.map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setInput(q)}
                                            className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px] text-left hover:border-primary/20 hover:bg-white/[0.04] transition-all group"
                                        >
                                            <p className="text-[9px] font-black text-slate-600 mb-2 group-hover:text-primary uppercase tracking-widest">Suggested Query</p>
                                            <p className="text-sm font-bold text-white leading-snug">{q}</p>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] lg:max-w-4xl flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-grad-primary text-white' : 'bg-grad-dark text-primary border border-white/10'}`}>
                                            {msg.role === 'user' ? <User size={22} /> : <Bot size={22} />}
                                        </div>
                                        <div className={`space-y-6 ${msg.role === 'user' ? 'items-end' : ''}`}>
                                            <div className={`p-8 rounded-[40px] shadow-xl border ${msg.role === 'user' ? 'bg-white/[0.04] border-white/10 text-white rounded-tr-none' : 'bg-grad-dark border-white/5 text-slate-200 rounded-tl-none'}`}>
                                                <p className="text-[15px] font-medium leading-relaxed">{msg.content}</p>
                                            </div>

                                            {msg.role === 'bot' && msg.sections && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2">
                                                    {msg.sections.map((sec, idx) => (
                                                        <div key={idx} className="card-premium !p-6 hover:border-primary/30 transition-all border border-white/5">
                                                            <h4 className="label-caps !text-[9px] mb-3 text-primary">{sec.title}</h4>
                                                            <p className="text-xs font-bold text-slate-400 leading-relaxed">{sec.content}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {msg.role === 'bot' && msg.disclaimer && (
                                                <div className="flex gap-4 bg-amber-500/5 p-5 rounded-3xl border border-amber-500/10 ml-2">
                                                    <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                                    <p className="text-[10px] font-black text-amber-500/80 uppercase tracking-wider leading-relaxed italic">{msg.disclaimer}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>

                    {isLoading && (
                        <div className="flex gap-6 animate-fade">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-sm">
                                <Bot size={22} className="text-primary animate-pulse" />
                            </div>
                            <div className="flex gap-2 items-center px-10 py-6 bg-white/[0.02] border border-white/5 rounded-[40px] rounded-tl-none shadow-sm">
                                {[0, 150, 300].map((delay) => (
                                    <div key={delay} className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }}></div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-bg-deep via-bg-deep to-transparent">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-grad-primary opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity rounded-[32px]"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                                        placeholder="Type clinical query here..."
                                        className="input-premium !h-[72px] !pl-10 !pr-20 !rounded-[32px] !bg-white/[0.02] border-white/5 focus:border-primary/50"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                                        <Search size={20} />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="w-[72px] h-[72px] bg-grad-primary text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    <Send size={24} />
                                </button>
                            </div>
                        </div>
                        <p className="text-center mt-6 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Institutional Grade Clinical Engine • Secured Session</p>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                .text-gradient {
                    background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div>
    );
}
