import React from "react";
import { Sparkles, LogOut } from "lucide-react";

export function Navbar({ user, recruiter, role, setRole, logout }) {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              TalentMatch<span className="text-indigo-400 font-medium text-sm ml-0.5">AI</span>
            </span>
          </div>

          {/* User details / Log out */}
          {(user || recruiter) ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium text-slate-200">
                  {user ? user.username : recruiter.recruiterName}
                </span>
                <span className="text-xs text-slate-400 capitalize">
                  {role} • {user ? `${user.totalJobsApplied || 0} applied` : `${recruiter.totalJobsPosted || 0} posted`}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800/80">
              <button
                onClick={() => { setRole("candidate"); logout(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  role === "candidate"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Candidate Mode
              </button>
              <button
                onClick={() => { setRole("recruiter"); logout(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  role === "recruiter"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/10"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Recruiter Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
