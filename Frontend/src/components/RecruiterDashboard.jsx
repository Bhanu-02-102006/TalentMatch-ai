import React, { useState } from "react";
import { User, Briefcase, Building, PlusCircle, RefreshCw, AlertTriangle, ShieldCheck, MapPin, DollarSign, Trash2, Mail, Phone, ExternalLink, AlertCircle, Download } from "lucide-react";

function ApplicantActions({ applicantId, jobId, applicationStatus, loading, handleUpdateStatus }) {
  const [confirmType, setConfirmType] = useState(null);

  if (applicationStatus === "Accepted" || applicationStatus === "Rejected") {
    return null;
  }

  if (confirmType) {
    const isAccept = confirmType === "Accepted";
    return (
      <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-lg border border-slate-800 animate-fadeIn">
        <span className="text-[10px] text-slate-400 font-bold uppercase px-1">
          Confirm {isAccept ? "Accept" : "Reject"}?
        </span>
        <button
          disabled={loading}
          onClick={() => {
            handleUpdateStatus(applicantId, jobId, confirmType);
            setConfirmType(null);
          }}
          className={`px-2.5 py-1 rounded text-xs font-black cursor-pointer uppercase transition-all ${
            isAccept
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/10"
              : "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/10"
          }`}
        >
          Yes
        </button>
        <button
          disabled={loading}
          onClick={() => setConfirmType(null)}
          className="px-2.5 py-1 rounded text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-350 cursor-pointer uppercase transition-all"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-1.5">
      <button
        disabled={loading}
        onClick={() => setConfirmType("Accepted")}
        className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 hover:bg-emerald-900/30 hover:border-emerald-700/50"
      >
        Accept
      </button>
      <button
        disabled={loading}
        onClick={() => setConfirmType("Rejected")}
        className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-rose-950/40 text-rose-400 border border-rose-900/40 hover:bg-rose-900/30 hover:border-rose-700/50"
      >
        Reject
      </button>
    </div>
  );
}

export function RecruiterDashboard({
  recruiter,
  activeTab,
  setActiveTab,
  recruiterJobs,
  fetchRecruiterJobs,
  postedJobResult,
  loading,
  jobTitle,
  setJobTitle,
  jobLocation,
  setJobLocation,
  jobSalary,
  setJobSalary,
  jobType,
  setJobType,
  jobRequiredSkills,
  setJobRequiredSkills,
  jobDescription,
  setJobDescription,
  jobAdditionalInfo,
  setJobAdditionalInfo,
  companyName,
  setCompanyName,
  website,
  setWebsite,
  contactNumber,
  setContactNumber,
  recruiterLocation,
  setRecruiterLocation,
  industry,
  setIndustry,
  foundedIn,
  setFoundedIn,
  companySize,
  setCompanySize,
  companyDescription,
  setCompanyDescription,
  handleCreateJob,
  handleDeleteJob,
  handleUpdateRecruiterProfile,
  handleUpdateStatus
}) {
  const downloadResume = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to download resume:", err);
      window.open(url, "_blank");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      {/* Sidebar Controls */}
      <div className="lg:col-span-1 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-purple-950 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="font-bold text-lg text-slate-100">{recruiter.recruiterName}</h3>
          <span className="text-xs text-purple-400 bg-purple-950/60 border border-purple-900/50 px-2.5 py-0.5 rounded-full mt-1 inline-block">
            {recruiter.companyName}
          </span>
        </div>

        {/* Sidebar Navigation */}
        <div className="mt-6 space-y-1">
          <button
            onClick={() => {
              setActiveTab("dashboard");
              fetchRecruiterJobs(recruiter._id);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/10"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <Briefcase className="w-4.5 h-4.5" />
            Jobs & Applicants
          </button>
          <button
            onClick={() => setActiveTab("post")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "post"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/10"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <PlusCircle className="w-4.5 h-4.5" />
            Post a New Job
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/10"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <User className="w-4.5 h-4.5" />
            Recruiter Profile
          </button>
        </div>

        {/* Recruiter Counters */}
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-3 gap-2.5 text-center">
          <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
            <div className="text-xl font-black text-white">{recruiter.totalJobsPosted || 0}</div>
            <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Jobs</div>
          </div>
          <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
            <div className="text-xl font-black text-purple-400">
              {recruiterJobs.reduce((acc, job) => acc + (job.applicants?.length || 0), 0)}
            </div>
            <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Applicants</div>
          </div>
          <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
            <div className={`text-xl font-black ${recruiter.flags > 0 ? "text-red-400" : "text-slate-400"}`}>
              {recruiter.flags || 0}
            </div>
            <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Flags</div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="lg:col-span-3">
        {/* Tab 1: Post New Job */}
        {activeTab === "post" && (
          <div className="space-y-6">
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4">
                <PlusCircle className="w-5 h-5 text-purple-400" />
                Post a New Job
              </h3>

              <form onSubmit={handleCreateJob} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Senior Node.js Developer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="New York, NY or Remote"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Salary Range</label>
                  <input
                    type="text"
                    placeholder="$120k - $150k"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Job Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Required Skills (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Node.js, Express, MongoDB, REST API"
                    value={jobRequiredSkills}
                    onChange={(e) => setJobRequiredSkills(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Job Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about the responsibilities, deliverables, and role requirements..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  ></textarea>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Additional Info (Optional - e.g. benefits, equity)
                  </label>
                  <input
                    type="text"
                    placeholder="Unlimited PTO, medical insurance, 401(k)"
                    value={jobAdditionalInfo}
                    onChange={(e) => setJobAdditionalInfo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="sm:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/10 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin mx-auto" /> : "Publish Job Posting"}
                  </button>
                </div>
              </form>
            </div>

            {/* Display Fraud Analysis Results after Posting */}
            {postedJobResult && (
              <div className={`p-6 border rounded-2xl shadow-lg ${
                postedJobResult.fraudAnalysis.isFraud
                  ? "bg-red-950/30 border-red-900/50"
                  : "bg-emerald-950/30 border-emerald-900/50"
              }`}>
                <div className="flex items-start gap-4">
                  {postedJobResult.fraudAnalysis.isFraud ? (
                    <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-slate-200">
                      {postedJobResult.msg}
                    </h4>
                    <div className="text-xs text-slate-400">
                      <strong>Fraud Confidence:</strong> {(postedJobResult.fraudAnalysis.confidence * 100).toFixed(0)}%
                    </div>
                    {postedJobResult.fraudAnalysis.reason && (
                      <p className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mt-2">
                        <strong>AI Assessment:</strong> {postedJobResult.fraudAnalysis.reason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recruiter Dashboard: Jobs & Applicants */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-400" />
                Jobs & Applicants Dashboard
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Monitor all your active job postings and track candidate resumes, match scores, and missing skills.
              </p>
            </div>

            {recruiterJobs && recruiterJobs.length > 0 ? (
              <div className="space-y-6">
                {recruiterJobs.map((job, idx) => {
                  const isFlagged = job.isFlagged;
                  const cardStyle = isFlagged
                    ? "bg-red-950/20 border-red-900/40 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4"
                    : "bg-slate-900/40 border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4";
                  return (
                    <div key={idx} className={cardStyle}>
                      {/* Job Details Header */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800/60">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-extrabold text-lg text-slate-200">{job.title}</h4>
                            {isFlagged && (
                              <span className="text-red-400 bg-red-950/60 border-red-900/50 text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> Flagged by AI (Suspicious)
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Building className="w-3.5 h-3.5 text-slate-500" />
                              {job.company}
                            </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {job.location || "Remote"}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                            {job.salary || "N/A"}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 text-[10px]">
                            {job.jobType}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Applicants</span>
                          <span className="text-2xl font-black text-purple-400">{job.applicants?.length || 0}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          title="Delete Job"
                          className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-slate-800 hover:border-red-900/50 transition-all cursor-pointer mt-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {isFlagged && job.fraudReason && (
                      <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/30 p-3 rounded-xl">
                        <strong>AI Assessment Warning:</strong> {job.fraudReason}
                      </div>
                    )}

                    {/* Required Skills Badges */}
                    <div className="text-xs">
                      <span className="text-slate-500 font-bold block mb-1">Required Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.requiredSkills && job.requiredSkills.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800/80 text-[10px]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Applicants List */}
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">Applicants List</span>

                      {job.applicants && job.applicants.length > 0 ? (
                        <div className="space-y-3">
                          {job.applicants.map((applicant, aIdx) => {
                            const matchData = applicant.appliedJobs?.find(aj => {
                              const ajJobId = aj.jobId?._id || aj.jobId;
                              return ajJobId?.toString() === job._id?.toString();
                            });
                            const score = matchData ? matchData.matchScore : 0;
                            const missingSkills = matchData ? matchData.missingSkills : [];
                            const applicationStatus = matchData ? matchData.status : "Applied";

                            const scoreColor = score >= 60
                              ? "text-emerald-400 bg-emerald-950/40 border-emerald-900/50"
                              : "text-amber-400 bg-amber-950/40 border-amber-900/50";

                            const statusColor = applicationStatus === "Accepted"
                              ? "text-emerald-400 bg-emerald-950/40 border-emerald-900/50"
                              : applicationStatus === "Rejected"
                              ? "text-rose-400 bg-rose-950/40 border-rose-900/50"
                              : "text-blue-400 bg-blue-950/40 border-blue-900/50";

                            return (
                              <div key={aIdx} className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-slate-200">{applicant.username}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${scoreColor}`}>
                                      {score}% Match
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                                      {applicationStatus}
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                                    <span className="flex items-center gap-1">
                                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                                      {applicant.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                                      {applicant.phonenumber}
                                    </span>
                                  </div>

                                  {missingSkills && missingSkills.length > 0 && (
                                    <div className="text-[10px] text-slate-500">
                                      <span className="font-semibold block uppercase mb-1">Missing Skills:</span>
                                      <div className="flex flex-wrap gap-1">
                                        {missingSkills.map((ms, msIdx) => (
                                          <span key={msIdx} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[9px]">
                                            {ms}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 justify-end">
                                  {applicant.resumeId?.resumeUrl ? (
                                    <div className="flex flex-col items-end gap-1.5">
                                      <div className="flex gap-2">
                                        <a
                                          href={applicant.resumeId.resumeUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-purple-400 hover:text-purple-300 bg-purple-950/30 border border-purple-900/30 hover:border-purple-800/50 transition-all"
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
                                          View
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() => downloadResume(applicant.resumeId.resumeUrl, `${applicant.username}_resume.pdf`)}
                                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-purple-400 hover:text-purple-300 bg-purple-950/30 border border-purple-900/30 hover:border-purple-800/50 transition-all cursor-pointer"
                                        >
                                          <Download className="w-3.5 h-3.5" />
                                          Download
                                        </button>
                                      </div>
                                      <a
                                        href={applicant.resumeId.resumeUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[10px] text-purple-400/70 hover:text-purple-300 hover:underline max-w-[200px] truncate block"
                                        title={applicant.resumeId.resumeUrl}
                                      >
                                        {applicant.resumeId.resumeUrl}
                                      </a>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-slate-500 italic">No resume URL</span>
                                  )}

                                  <ApplicantActions
                                    applicantId={applicant._id}
                                    jobId={job._id}
                                    applicationStatus={applicationStatus}
                                    loading={loading}
                                    handleUpdateStatus={handleUpdateStatus}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-600 italic">No candidates have applied for this position yet.</p>
                      )}
                    </div>
                  </div>
                );
              })}
              </div>
            ) : (
              <div className="border border-slate-800 rounded-xl p-12 text-center bg-slate-900/10">
                <Briefcase className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <h4 className="font-semibold text-sm text-slate-400">No job postings created yet</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Select "Post a New Job" tab to publish job details and start matching candidates.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Recruiter Profile */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Edit profile form */}
            <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-purple-400" />
                Edit Company Profile
              </h3>

              <form onSubmit={handleUpdateRecruiterProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Company Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://acme.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Contact Number</label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Location</label>
                  <input
                    type="text"
                    value={recruiterLocation}
                    onChange={(e) => setRecruiterLocation(e.target.value)}
                    placeholder="San Francisco, CA or London, UK"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Software, Healthcare, Finance"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Founded In</label>
                    <input
                      type="number"
                      value={foundedIn}
                      onChange={(e) => setFoundedIn(e.target.value)}
                      placeholder="2018"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Company Size</label>
                    <select
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Company Description / Bio</label>
                  <textarea
                    rows={4}
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    placeholder="Tell us about your organization's mission, values, and work culture..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  ></textarea>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/10 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin mx-auto" /> : "Save Profile Changes"}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar stats/verification */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-200 mb-4 pb-2 border-b border-slate-800/60 uppercase tracking-wider">Account Overview</h4>
                <div className="space-y-4">
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Registered Email</span>
                    <span className="text-sm font-medium text-slate-200 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {recruiter.email}
                    </span>
                  </div>

                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Account Verification</span>
                    <span className="text-sm font-medium text-slate-200 flex items-center gap-2 mt-1">
                      {recruiter.verified ? (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Verified Recruiter</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-400">Self-Registered</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Total Jobs Posted</span>
                    <span className="text-sm font-medium text-slate-200 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      {recruiter.totalJobsPosted || 0} active postings
                    </span>
                  </div>

                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Total Flags</span>
                    <span className="text-sm font-medium text-slate-200 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      {recruiter.flags || 0} flag(s)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
