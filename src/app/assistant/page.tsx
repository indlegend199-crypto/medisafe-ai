"use client";

import { useState, useRef, useEffect } from "react";
import {
    Brain, Send, Shield, Info, Sparkles, MessageSquare,
    Bot, User, AlertCircle, Bookmark, RefreshCcw, Lock as LockIcon,
    History, Search, Activity, Microscope, Pill
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
        <div className="assistant-page flex flex-col h-screen bg-slate-50/50">
            <header className="bg-white border-b border-slate-100 px-10 py-6 shrink-0">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-primary rounded-[20px] shadow-lg shadow-primary/20 flex items-center justify-center text-white">
                            <Bot size={28} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-black text-slate-900">MediSafe <span className="text-primary italic">Assistant</span></h1>
                                <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-black uppercase rounded-md border border-primary/10 tracking-widest">Active</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={12} className="text-amber-400" /> Powered by Clinical AI Intelligence
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-10">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Data Source</p>
                            <p className="text-xs font-black text-slate-900 uppercase">OpenFDA & NIH RxNorm</p>
                        </div>
                        <div className="h-10 w-[1px] bg-slate-100"></div>
                        <div className="flex items-center gap-3 bg-emerald-50 px-5 py-2.5 rounded-2xl border border-emerald-100">
                            <Shield size={16} className="text-emerald-500" />
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Encrypted Session</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-hidden relative">
                <div ref={scrollRef} className="h-full overflow-y-auto max-w-7xl mx-auto px-10 py-10 space-y-12 pb-32">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-2xl mx-auto">
                            <div className="w-24 h-24 bg-white rounded-[40px] shadow-xl border border-slate-100 flex items-center justify-center text-primary/20 mb-10">
                                <MessageSquare size={48} />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 mb-6">How can I assist your <span className="text-primary italic">Health</span> today?</h2>
                            <p className="text-slate-400 font-bold mb-12">Ask anything about drug interactions, side effects, or general medication safety guidelines.</p>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                {suggestedQueries.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setInput(q)}
                                        className="p-6 bg-white border border-slate-100 rounded-[32px] text-left hover:border-primary/20 hover:shadow-lg transition-all group"
                                    >
                                        <p className="text-xs font-bold text-slate-400 mb-2 group-hover:text-primary capitalize">Medicine Query</p>
                                        <p className="text-sm font-black text-slate-700 leading-snug">{q}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] lg:max-w-3xl flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white text-slate-800 border border-slate-100'}`}>
                                    {msg.role === 'user' ? <User size={24} /> : <Bot size={24} />}
                                </div>
                                <div className={`space-y-6 ${msg.role === 'user' ? 'items-end' : ''}`}>
                                    <div className={`p-8 rounded-[40px] shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                                        <p className={`text-base font-bold leading-relaxed ${msg.role === 'user' ? '' : 'text-slate-800'}`}>{msg.content}</p>
                                    </div>

                                    {msg.role === 'bot' && msg.sections && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2">
                                            {msg.sections.map((sec, idx) => (
                                                <div key={idx} className="bg-white/50 backdrop-blur-md border border-slate-100 p-6 rounded-[32px] hover:border-primary/20 transition-all">
                                                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-3">{sec.title}</h4>
                                                    <p className="text-xs font-bold text-slate-600 leading-relaxed">{sec.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {msg.role === 'bot' && msg.disclaimer && (
                                        <div className="flex gap-3 bg-amber-500/5 p-5 rounded-3xl border border-amber-500/10 ml-2">
                                            <AlertCircle size={16} className="text-amber-500 shrink-0" />
                                            <p className="text-[10px] font-black text-amber-600/80 uppercase tracking-wider leading-relaxed italic">{msg.disclaimer}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm animate-pulse">
                                <Bot size={24} className="text-slate-300" />
                            </div>
                            <div className="flex gap-2 items-center p-8 bg-white border border-slate-100 rounded-[40px] rounded-tl-none shadow-sm">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-50/90 to-transparent pointer-events-none">
                    <div className="max-w-5xl mx-auto flex gap-4 pointer-events-auto">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask MediSafe AI about medications..."
                                className="w-full h-[72px] bg-white border-2 border-slate-200 rounded-[32px] px-10 pr-20 font-bold text-slate-800 focus:border-primary/30 focus:ring-4 ring-primary/5 transition-all shadow-xl shadow-slate-200/50"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="w-14 h-14 bg-primary text-white rounded-[24px] flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
