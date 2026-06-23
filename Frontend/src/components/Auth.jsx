import React from "react";
import { User, Mail, Lock, Phone, Link2, Building, ArrowRight, RefreshCw, Sparkles } from "lucide-react";

export function Auth({
  role,
  authMode,
  setAuthMode,
  loading,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  phonenumber,
  setPhonenumber,
  recruiterName,
  setRecruiterName,
  companyName,
  setCompanyName,
  website,
  setWebsite,
  handleAuthSubmit
}) {
  return (
    <div className="max-w-md w-full mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
          {role === "candidate" ? "Accelerate Your Career" : "Find Vetted Talents"}
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          {role === "candidate"
            ? "Upload your resume, get AI skill mapping, and match instantly to roles."
            : "Post jobs, leverage automatic fraud filtering, and review match scores."}
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <div className="flex border-b border-slate-800 pb-4 mb-6">
          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`flex-1 text-center pb-2 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
              authMode === "login"
                ? role === "candidate"
                  ? "border-indigo-500 text-white"
                  : "border-purple-500 text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("register")}
            className={`flex-1 text-center pb-2 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
              authMode === "register"
                ? role === "candidate"
                  ? "border-indigo-500 text-white"
                  : "border-purple-500 text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {authMode === "register" && role === "candidate" && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          )}

          {authMode === "register" && role === "recruiter" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Recruiter Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Sarah Jenkins"
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Acme Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                  role === "candidate" ? "focus:border-indigo-500 focus:ring-indigo-500" : "focus:border-purple-500 focus:ring-purple-500"
                }`}
              />
            </div>
          </div>

          {authMode === "register" && role === "candidate" && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          )}

          {authMode === "register" && role === "recruiter" && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Website URL</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="https://acme.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                  role === "candidate" ? "focus:border-indigo-500 focus:ring-indigo-500" : "focus:border-purple-500 focus:ring-purple-500"
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm text-white shadow-lg cursor-pointer transition-all ${
              role === "candidate"
                ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/10 hover:shadow-indigo-600/20"
                : "bg-purple-600 hover:bg-purple-500 shadow-purple-600/10 hover:shadow-purple-600/20"
            } disabled:opacity-55`}
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : authMode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
