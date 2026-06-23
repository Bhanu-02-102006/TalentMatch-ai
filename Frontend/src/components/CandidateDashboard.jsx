import React from "react";
import { User, FileText, Sparkles, Briefcase, Mail, Phone, Upload, RefreshCw, ExternalLink, AlertTriangle, Building, DollarSign, Check, MapPin } from "lucide-react";

export function CandidateDashboard({
  user,
  activeTab,
  setActiveTab,
  recommendedJobs,
  fetchingRecommendations,
  uploadProgress,
  loading,
  fetchRecommendations,
  handleResumeUpload,
  handleApplyJob
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      {/* Sidebar Controls */}
      <div className="lg:col-span-1 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="font-bold text-lg text-slate-100">{user.username}</h3>
          <span className="text-xs text-indigo-400 bg-indigo-950/60 border border-indigo-900/50 px-2.5 py-0.5 rounded-full mt-1 inline-block">
            Candidate Profile
          </span>
        </div>

        {/* Sidebar Navigation */}
        <div className="mt-6 space-y-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <FileText className="w-4.5 h-4.5" />
            Profile & Resume
          </button>
          <button
            onClick={() => {
              setActiveTab("jobs");
              fetchRecommendations(user._id, user.skills);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "jobs"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <Sparkles className="w-4.5 h-4.5" />
            AI Job Recommendations
          </button>
          <button
            onClick={() => setActiveTab("applied")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "applied"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <Briefcase className="w-4.5 h-4.5" />
            Applied Jobs ({user.totalJobsApplied || 0})
          </button>
        </div>

        {/* Profile Counters */}
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
            <div className="text-2xl font-black text-white">{user.skills ? user.skills.length : 0}</div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Skills Map</div>
          </div>
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
            <div className="text-2xl font-black text-indigo-400">{user.totalJobsApplied || 0}</div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Jobs Applied</div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="lg:col-span-3">
        {/* Tab 1: Profile & Resume */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Bio Card */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-indigo-400" />
                Contact details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Email address</span>
                  <span className="text-sm font-medium text-slate-200 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {user.email}
                  </span>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Phone number</span>
                  <span className="text-sm font-medium text-slate-200 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {user.phonenumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Resume Upload / Skill display Card */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    Resume & Skills
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload a PDF resume to parse and extract your skills automatically.
                  </p>
                </div>

                {/* Upload Button wrapper */}
                <label className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 cursor-pointer disabled:opacity-50">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    disabled={uploadProgress}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {uploadProgress ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  {uploadProgress ? "Extracting..." : "Upload PDF Resume"}
                </label>
              </div>

              {/* Resume State */}
              {user.resumeId ? (
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-indigo-950/70 border border-indigo-900/50">
                      <FileText className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-200">{user.resumeId.originalName}</h4>
                      <span className="text-[10px] text-slate-500">Uploaded via TalentMatch AI</span>
                    </div>
                  </div>
                  <a
                    href={user.resumeId.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Document
                  </a>
                </div>
              ) : (
                <div className="border border-dashed border-slate-800 rounded-xl p-8 text-center bg-slate-950/20">
                  <Upload className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-sm text-slate-400">No Resume Uploaded</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto mt-1">
                    Upload a resume in PDF format to parse and dynamically map your skills for scoring.
                  </p>
                </div>
              )}

              {/* Skills pills */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Extracted Skills mapping</h4>
                {user.skills && user.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 italic">No skills listed yet. Please upload your resume.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Job Recommendations */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  AI Recommended Jobs
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ranked dynamically by matching score against your resume profile skills.
                </p>
              </div>
              {user.resumeId && (
                <button
                  onClick={() => fetchRecommendations(user._id, user.skills)}
                  disabled={fetchingRecommendations}
                  className="p-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${fetchingRecommendations ? "animate-spin" : ""}`} />
                </button>
              )}
            </div>

            {!user.resumeId ? (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center shadow-xl backdrop-blur-sm bg-slate-900/10">
                <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                <h4 className="font-bold text-base text-slate-200">Resume Upload Required</h4>
                <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  You need to upload your resume to apply for jobs. Please head over to the <strong>Profile & Resume</strong> tab, upload your PDF resume, and our system will extract your skills automatically.
                </p>
                <button
                  onClick={() => setActiveTab("profile")}
                  className="mt-6 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 cursor-pointer"
                >
                  Go to Profile & Resume
                </button>
              </div>
            ) : fetchingRecommendations ? (
              <div className="py-20 text-center">
                <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-3" />
                <p className="text-sm text-slate-500">Querying matched job postings and parsing scores...</p>
              </div>
            ) : recommendedJobs.length > 0 ? (
              <div className="space-y-4">
                {recommendedJobs.map((recJob, i) => {
                  const isFlagged = recJob.isFlagged;
                  const alreadyApplied = user.appliedJobs?.some(app => {
                    const appJobId = app.jobId?._id || app.jobId;
                    return appJobId?.toString() === recJob.jobId?.toString();
                  });
                  const scoreColor =
                    recJob.matchScore >= 60
                      ? "text-emerald-400 bg-emerald-950/60 border-emerald-900/50"
                      : "text-amber-400 bg-amber-950/60 border-amber-900/50";

                  const cardStyle = isFlagged
                    ? "bg-red-950/20 border-red-900/40 text-red-200"
                    : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700/80";

                  return (
                    <div
                      key={i}
                      className={`border rounded-2xl p-6 shadow-md transition-all backdrop-blur-sm flex flex-col md:flex-row justify-between gap-6 ${cardStyle}`}
                    >
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-lg text-slate-200">{recJob.title}</h4>
                          {isFlagged ? (
                            <span className="text-red-400 bg-red-950/60 border-red-900/50 text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Flagged / Suspicious
                            </span>
                          ) : (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${scoreColor}`}>
                              {recJob.matchScore}% Match
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-slate-500" />
                            {recJob.company}
                          </span>
                          {recJob.salary && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                              {recJob.salary}
                            </span>
                          )}
                        </div>

                        {recJob.description && (
                          <div className="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                            <span className="font-bold text-slate-400 block mb-1">Job Description:</span>
                            <p className="whitespace-pre-line leading-relaxed">{recJob.description}</p>
                            {recJob.additionalInfo && (
                              <div className="mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                                <strong>Additional Info:</strong> {recJob.additionalInfo}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Fraud Reason */}
                        {isFlagged && recJob.fraudReason && (
                          <div className="text-sm text-red-400 bg-red-950/40 border border-red-900/30 p-3 rounded-xl">
                            <strong>Reason:</strong> {recJob.fraudReason}
                          </div>
                        )}

                        {/* Missing Skills */}
                        {!isFlagged && (
                          recJob.missingSkills && recJob.missingSkills.length > 0 ? (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">Missing Skills:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {recJob.missingSkills.map((ms, k) => (
                                  <button
                                    key={k}
                                    onClick={() => {
                                      window.dispatchEvent(
                                        new CustomEvent("open-chatbot", {
                                          detail: {
                                            skill: ms,
                                            targetRole: recJob.title
                                          }
                                        })
                                      );
                                    }}
                                    title={`Ask SkillMatch AI how to learn ${ms}`}
                                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-red-950/40 border border-red-900/50 text-red-300 hover:bg-indigo-950/80 hover:border-indigo-500/50 hover:text-indigo-200 transition-all cursor-pointer flex items-center gap-1"
                                  >
                                    <span>{ms}</span>
                                    <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs text-emerald-400">
                              <Check className="w-4 h-4" />
                              <span>You have all required skills!</span>
                            </div>
                          )
                        )}
                      </div>

                      <div className="flex flex-col justify-between items-end gap-4 shrink-0">
                        <span className="text-[10px] text-slate-500">ID: {recJob.jobId}</span>
                        <button
                          onClick={() => !isFlagged && !alreadyApplied && handleApplyJob(recJob.jobId)}
                          disabled={loading || !user.resumeId || isFlagged || alreadyApplied || recJob.matchScore < 60}
                          className={`w-full md:w-auto px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                            isFlagged
                              ? "bg-red-950/30 text-red-400 border border-red-900/30 cursor-not-allowed"
                              : !user.resumeId
                              ? "bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed"
                              : alreadyApplied
                              ? "bg-emerald-950/30 text-emerald-400 border border-emerald-900/30 cursor-not-allowed"
                              : recJob.matchScore >= 60
                              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10 hover:shadow-indigo-600/20"
                              : "bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed"
                          }`}
                        >
                          {isFlagged
                            ? "Flagged (Suspicious)"
                            : !user.resumeId
                            ? "Upload Resume"
                            : alreadyApplied
                            ? "Applied"
                            : recJob.matchScore >= 60
                            ? "Apply Now"
                            : "Locked (Score < 60%)"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border border-slate-800 rounded-xl p-12 text-center bg-slate-900/10">
                <Briefcase className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <h4 className="font-semibold text-sm text-slate-400">No matching jobs found</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Try adding more skills to your profile or wait for recruiters to post new jobs.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Applied Jobs */}
        {activeTab === "applied" && (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                Your Applications Dashboard
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Check status and review matching scores on job applications.
              </p>
            </div>

            {user.appliedJobs && user.appliedJobs.length > 0 ? (
              <div className="space-y-4">
                {user.appliedJobs.map((app, i) => {
                  const statusColors = {
                    "Under Review": "text-blue-400 bg-blue-950/60 border-blue-900/50",
                    "Rejected": "text-red-400 bg-red-950/60 border-red-900/50",
                    "Accepted": "text-emerald-400 bg-emerald-950/60 border-emerald-900/50"
                  };
                  const statusColor = statusColors[app.status] || "text-slate-400 bg-slate-950 border-slate-800";

                  const isFlagged = app.jobId?.isFlagged;
                  const cardStyle = isFlagged
                    ? "bg-red-950/20 border-red-900/40 rounded-2xl p-6 shadow-md backdrop-blur-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    : "bg-slate-900/40 border-slate-800/80 rounded-2xl p-6 shadow-md backdrop-blur-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6";

                  return (
                    <div key={i} className={cardStyle}>
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-bold text-base text-slate-200">
                            {app.jobId ? app.jobId.title : `Job ID: ${app.jobId}`}
                          </h4>
                          {isFlagged && (
                            <span className="text-red-400 bg-red-950/60 border-red-900/50 text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Flagged / Suspicious
                            </span>
                          )}
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                            {app.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-slate-500" />
                            {app.jobId ? app.jobId.company : "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {app.jobId ? app.jobId.location || "Remote" : "N/A"}
                          </span>
                        </div>

                        {isFlagged && app.jobId?.fraudReason && (
                          <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/30 p-3 rounded-xl mt-2">
                            <strong>Suspicious Warning:</strong> {app.jobId.fraudReason}
                          </div>
                        )}

                        {app.jobId?.description && (
                          <div className="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 mt-2">
                            <span className="font-bold text-slate-400 block mb-1">Job Description:</span>
                            <p className="whitespace-pre-line leading-relaxed">{app.jobId.description}</p>
                            {app.jobId.additionalInfo && (
                              <div className="mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                                <strong>Additional Info:</strong> {app.jobId.additionalInfo}
                              </div>
                            )}
                          </div>
                        )}

                        {app.missingSkills && app.missingSkills.length > 0 && (
                          <div className="text-[10px] text-slate-500">
                            <span className="font-semibold block uppercase mb-1">Missing skills at application:</span>
                            <div className="flex flex-wrap gap-1">
                              {app.missingSkills.map((m, k) => (
                                <span key={k} className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 text-[9px]">
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold mb-1">Matching score</span>
                        <div className="text-2xl font-black text-slate-100">{app.matchScore}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border border-slate-800 rounded-xl p-12 text-center bg-slate-900/10">
                <Briefcase className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <h4 className="font-semibold text-sm text-slate-400">No applied jobs yet</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Select "AI Job Recommendations" tab to find matched jobs and apply.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
