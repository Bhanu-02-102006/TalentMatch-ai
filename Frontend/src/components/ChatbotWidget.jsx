import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, RefreshCw, Sparkles, SendHorizontal, Maximize2, Minimize2 } from "lucide-react";

export function ChatbotWidget({ user, role }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm SkillMatch AI.\n\nI can help you with:\n• Career Guidance\n• Learning Roadmaps\n• Skill Development\n• Certifications\n• Interview Preparation\n\nWhat would you like help with today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Track messages in a ref to avoid stale closures in event listeners and callbacks
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const triggerSkillGapChat = async (skill, targetRole) => {
    const userMsg = { role: "user", content: `I need help learning the skill "${skill}" for the role "${targetRole}".` };
    const updatedMessages = [...messagesRef.current, userMsg];
    
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:10000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          mode: "skill_gap",
          skill: skill,
          role: targetRole
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prevMsgs) => [...prevMsgs, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prevMsgs) => [
          ...prevMsgs,
          { role: "assistant", content: "Sorry, I am facing an issue connecting to the AI server. Please try again." }
        ]);
      }
    } catch (err) {
      setMessages((prevMsgs) => [
        ...prevMsgs,
        { role: "assistant", content: "Network error. Make sure the chatbot API service is running." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Add custom event listener for external chatbot triggers (e.g. from Skill Gap Analysis)
  useEffect(() => {
    if (role !== "candidate" || !user) return;

    const handleOpenChatbot = (e) => {
      const { skill, targetRole } = e.detail || {};
      setIsOpen(true);
      if (skill) {
        triggerSkillGapChat(skill, targetRole || "Software Engineer");
      }
    };

    window.addEventListener("open-chatbot", handleOpenChatbot);
    return () => {
      window.removeEventListener("open-chatbot", handleOpenChatbot);
    };
  }, [role, user]);

  // If user is not candidate, do not render
  if (role !== "candidate" || !user) {
    return null;
  }

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setInput("");

    const updatedMessages = [...messagesRef.current, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:10000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          mode: "general"
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prevMsgs) => [...prevMsgs, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prevMsgs) => [
          ...prevMsgs,
          { role: "assistant", content: "Sorry, I am facing an issue connecting to the AI server. Please try again." }
        ]);
      }
    } catch (err) {
      setMessages((prevMsgs) => [
        ...prevMsgs,
        { role: "assistant", content: "Network error. Make sure the chatbot API service is running." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm SkillMatch AI.\n\nI can help you with:\n• Career Guidance\n• Learning Roadmaps\n• Skill Development\n• Certifications\n• Interview Preparation\n\nWhat would you like help with today?"
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 cursor-pointer transition-all hover:scale-110 active:scale-95 animate-pulse"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className={`bg-slate-900/95 border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col backdrop-blur-md overflow-hidden animate-in slide-in-from-bottom-6 duration-300 transition-all ${
          isMaximized
            ? "w-[90vw] sm:w-[750px] md:w-[900px] h-[80vh] max-h-[750px]"
            : "w-[380px] sm:w-[400px] h-[500px]"
        }`}>
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border-b border-indigo-900/50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-900 border border-indigo-500/30 flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                  SkillMatch AI
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h4>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Career & Skills Guide</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                title="Reset Chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-950/40 transition-all cursor-pointer border-0 bg-transparent"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                title={isMaximized ? "Collapse Chat (↙️)" : "Expand Chat (↗️)"}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-950/40 transition-all cursor-pointer border-0 bg-transparent"
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-950/40 transition-all cursor-pointer border-0 bg-transparent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              return (
                <div key={idx} className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-950/60 border border-indigo-900/50 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-indigo-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      isUser
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/10"
                        : "bg-slate-950/80 border border-slate-800/80 text-slate-200 rounded-tl-none whitespace-pre-line"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-indigo-950/60 border border-indigo-900/50 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
                </div>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 rounded-tl-none flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce duration-1000"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce duration-1000 delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce duration-1000 delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950/60 border-t border-slate-800/60 flex gap-2 items-center shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about careers, roadmaps, skills..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all cursor-pointer shadow-md shadow-indigo-600/10 shrink-0 border-0"
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
