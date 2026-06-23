import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Auth } from "./components/Auth";
import { CandidateDashboard } from "./components/CandidateDashboard";
import { RecruiterDashboard } from "./components/RecruiterDashboard";
import { ChatbotWidget } from "./components/ChatbotWidget";

const API_BASE = "https://talentmatch-ai-backend.onrender.com/api";

function App() {
  // Global States
  const [role, setRole] = useState("candidate"); // "candidate" or "recruiter"
  const [user, setUser] = useState(null); // Logged-in Candidate
  const [recruiter, setRecruiter] = useState(null); // Logged-in Recruiter
  
  // Navigation & Sub-states
  const [activeTab, setActiveTab] = useState("profile"); // candidate: profile, jobs, applied | recruiter: dashboard, post, profile
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  
  // Auth Form Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  
  const [recruiterName, setRecruiterName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");

  // Functional/UI States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  // Candidate Features
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [fetchingRecommendations, setFetchingRecommendations] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  
  // Recruiter Features
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobAdditionalInfo, setJobAdditionalInfo] = useState("");
  const [jobRequiredSkills, setJobRequiredSkills] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [postedJobResult, setPostedJobResult] = useState(null);

  // Recruiter Dashboard States
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [companyDescription, setCompanyDescription] = useState("");
  const [recruiterLocation, setRecruiterLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [foundedIn, setFoundedIn] = useState("");
  const [companySize, setCompanySize] = useState("");

  // Persistent login on load/refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const verifyToken = async () => {
        try {
          const res = await fetch(`${API_BASE}/auth/me`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.role === "candidate") {
              setUser(data.user);
              setRole("candidate");
              setActiveTab("profile");
              if (data.user.skills) {
                fetchRecommendations(data.user._id, data.user.skills);
              }
            } else if (data.role === "recruiter") {
              setRecruiter(data.recruiter);
              setRole("recruiter");
              setActiveTab("dashboard");
            }
          } else {
            localStorage.removeItem("token");
          }
        } catch (err) {
          console.error("Token verification error:", err);
        }
      };
      verifyToken();
    }
  }, []);

  // Clear messages on view changes
  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
  }, [role, authMode, activeTab]);

  // Synchronize Recruiter Profile Form Data and fetch jobs
  useEffect(() => {
    if (recruiter) {
      setRecruiterName(recruiter.recruiterName || "");
      setCompanyName(recruiter.companyName || "");
      setWebsite(recruiter.website || "");
      setCompanyDescription(recruiter.companyDescription || "");
      setRecruiterLocation(recruiter.location || "");
      setContactNumber(recruiter.contactNumber || "");
      setIndustry(recruiter.industry || "");
      setFoundedIn(recruiter.foundedIn || "");
      setCompanySize(recruiter.companySize || "");
      fetchRecruiterJobs(recruiter._id);
    }
  }, [recruiter]);

  // Load profile from DB
  const refreshUserProfile = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/users/profile/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error("Failed to refresh user profile:", err);
    }
  };

  const refreshRecruiterProfile = async (recruiterId) => {
    try {
      const res = await fetch(`${API_BASE}/recruiters/profile/${recruiterId}`);
      if (res.ok) {
        const data = await res.json();
        setRecruiter(data);
      }
    } catch (err) {
      console.error("Failed to refresh recruiter profile:", err);
    }
  };

  // Trigger recommendation list
  const fetchRecommendations = async (userId, userSkills) => {
    if (!user?.resumeId) {
      setRecommendedJobs([]);
      return;
    }
    setFetchingRecommendations(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/jobs/recommend-jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userSkills: userSkills || []
        })
      });
      const data = await res.json();
      if (res.ok) {
        setRecommendedJobs(data.jobs || []);
        await refreshUserProfile(userId);
      } else {
        setErrorMsg(data.msg || "Failed to fetch recommendations");
      }
    } catch (err) {
      setErrorMsg("Network error fetching recommendations");
    } finally {
      setFetchingRecommendations(false);
    }
  };

  // Auth Submissions
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const isCandidate = role === "candidate";
    const endpoint = isCandidate
      ? `${API_BASE}/users/${authMode}`
      : `${API_BASE}/recruiters/${authMode}`;

    const bodyData = isCandidate
      ? (authMode === "register"
          ? { username, email, password, phonenumber, skills: [] }
          : { email, password })
      : (authMode === "register"
          ? { recruiterName, companyName, email, password, website }
          : { email, password });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.msg || "Authentication failed");
      }

      setSuccessMsg(data.msg || "Success!");
      
      if (isCandidate) {
        if (authMode === "login" || data.user) {
          const loggedUser = data.user;
          setUser(loggedUser);
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          await refreshUserProfile(loggedUser._id);
          setActiveTab("profile");
        } else {
          setAuthMode("login");
        }
      } else {
        if (authMode === "login" || data.recruiter) {
          const loggedRecruiter = data.recruiter;
          setRecruiter(loggedRecruiter);
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          await refreshRecruiterProfile(loggedRecruiter._id);
          setActiveTab("dashboard");
        } else {
          setAuthMode("login");
        }
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resume Upload Handler
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadProgress(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("resume", file);
    if (user) {
      formData.append("userId", user._id);
    }

    try {
      const res = await fetch(`${API_BASE}/extract-skills`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to upload and extract skills");
      }

      setSuccessMsg("Resume uploaded and skills successfully updated!");
      if (user) {
        await refreshUserProfile(user._id);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setUploadProgress(false);
    }
  };

  // Apply to Job
  const handleApplyJob = async (jobId) => {
    if (!user) return;
    if (!user.resumeId) {
      setErrorMsg("Please upload your resume in the 'Profile & Resume' tab to apply for jobs.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${API_BASE}/users/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          jobId
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to apply for job");
      }

      setSuccessMsg(data.msg || "Application submitted successfully!");
      await refreshUserProfile(user._id);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Post Job
  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!recruiter) return;
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    setPostedJobResult(null);

    const requiredSkillsArr = jobRequiredSkills.split(",").map(s => s.trim()).filter(Boolean);

    try {
      const res = await fetch(`${API_BASE}/jobs/create-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recruiterId: recruiter._id,
          title: jobTitle,
          location: jobLocation,
          company: recruiter.companyName,
          description: jobDescription,
          additionalInfo: jobAdditionalInfo,
          requiredSkills: requiredSkillsArr,
          salary: jobSalary,
          jobType
        })
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to post job");
      }

      setPostedJobResult(data);
      setSuccessMsg(data.msg || "Job posted successfully!");
      
      setJobTitle("");
      setJobLocation("");
      setJobDescription("");
      setJobAdditionalInfo("");
      setJobRequiredSkills("");
      setJobSalary("");
      
      await refreshRecruiterProfile(recruiter._id);
      await fetchRecruiterJobs(recruiter._id);
      setActiveTab("dashboard");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecruiterJobs = async (recruiterId) => {
    if (!recruiterId) return;
    try {
      const res = await fetch(`${API_BASE}/jobs/recruiter/${recruiterId}`);
      if (res.ok) {
        const data = await res.json();
        setRecruiterJobs(data || []);
      }
    } catch (err) {
      console.error("Failed to fetch recruiter jobs:", err);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch(`${API_BASE}/jobs/delete-job/${jobId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Failed to delete job");
      }
      setSuccessMsg("Job deleted successfully!");
      if (recruiter) {
        await refreshRecruiterProfile(recruiter._id);
        await fetchRecruiterJobs(recruiter._id);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (userId, jobId, newStatus) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch(`${API_BASE}/users/application-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, jobId, status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Failed to update application status");
      }
      setSuccessMsg(`Application status updated to "${newStatus}" successfully!`);
      if (recruiter) {
        await fetchRecruiterJobs(recruiter._id);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecruiterProfile = async (e) => {
    e.preventDefault();
    if (!recruiter) return;
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch(`${API_BASE}/recruiters/profile/${recruiter._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          website,
          companyDescription,
          location: recruiterLocation,
          contactNumber,
          industry,
          foundedIn: foundedIn ? Number(foundedIn) : null,
          companySize
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Failed to update profile");
      }
      setSuccessMsg("Profile updated successfully!");
      setRecruiter(data.recruiter);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRecruiter(null);
    setEmail("");
    setPassword("");
    setUsername("");
    setPhonenumber("");
    setRecruiterName("");
    setCompanyName("");
    setWebsite("");
    setRecommendedJobs([]);
    setPostedJobResult(null);
    
    setRecruiterJobs([]);
    setCompanyDescription("");
    setRecruiterLocation("");
    setContactNumber("");
    setIndustry("");
    setFoundedIn("");
    setCompanySize("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/15 blur-[150px] pointer-events-none"></div>

      {/* Navbar */}
      <Navbar user={user} recruiter={recruiter} role={role} setRole={setRole} logout={logout} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col justify-center">
        {/* Error / Success Notifications */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl border border-red-900/50 bg-red-950/40 text-red-200 flex items-start gap-3 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm">Error Occurred</h4>
              <p className="text-xs text-red-300 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl border border-emerald-900/50 bg-emerald-950/40 text-emerald-200 flex items-start gap-3 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm">Success</h4>
              <p className="text-xs text-emerald-300 mt-0.5">{successMsg}</p>
            </div>
          </div>
        )}

        {/* 1. AUTHENTICATION SECTION (If not logged in) */}
        {!user && !recruiter && (
          <Auth
            role={role}
            authMode={authMode}
            setAuthMode={setAuthMode}
            loading={loading}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            phonenumber={phonenumber}
            setPhonenumber={setPhonenumber}
            recruiterName={recruiterName}
            setRecruiterName={setRecruiterName}
            companyName={companyName}
            setCompanyName={setCompanyName}
            website={website}
            setWebsite={setWebsite}
            handleAuthSubmit={handleAuthSubmit}
          />
        )}

        {/* 2. CANDIDATE DASHBOARD */}
        {user && (
          <CandidateDashboard
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            recommendedJobs={recommendedJobs}
            fetchingRecommendations={fetchingRecommendations}
            uploadProgress={uploadProgress}
            loading={loading}
            fetchRecommendations={fetchRecommendations}
            handleResumeUpload={handleResumeUpload}
            handleApplyJob={handleApplyJob}
          />
        )}

        {/* 3. RECRUITER DASHBOARD */}
        {recruiter && (
          <RecruiterDashboard
            recruiter={recruiter}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            recruiterJobs={recruiterJobs}
            fetchRecruiterJobs={fetchRecruiterJobs}
            postedJobResult={postedJobResult}
            loading={loading}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            jobLocation={jobLocation}
            setJobLocation={setJobLocation}
            jobSalary={jobSalary}
            setJobSalary={setJobSalary}
            jobType={jobType}
            setJobType={setJobType}
            jobRequiredSkills={jobRequiredSkills}
            setJobRequiredSkills={setJobRequiredSkills}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            jobAdditionalInfo={jobAdditionalInfo}
            setJobAdditionalInfo={setJobAdditionalInfo}
            companyName={companyName}
            setCompanyName={setCompanyName}
            website={website}
            setWebsite={setWebsite}
            contactNumber={contactNumber}
            setContactNumber={setContactNumber}
            recruiterLocation={recruiterLocation}
            setRecruiterLocation={setRecruiterLocation}
            industry={industry}
            setIndustry={setIndustry}
            foundedIn={foundedIn}
            setFoundedIn={setFoundedIn}
            companySize={companySize}
            setCompanySize={setCompanySize}
            companyDescription={companyDescription}
            setCompanyDescription={setCompanyDescription}
            handleCreateJob={handleCreateJob}
            handleDeleteJob={handleDeleteJob}
            handleUpdateRecruiterProfile={handleUpdateRecruiterProfile}
            handleUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600 mt-20">
        <p>© 2026 TalentMatch AI. Advanced AI-driven skill mapping and candidate matching.</p>
      </footer>

      {/* Chatbot Widget for Candidates */}
      <ChatbotWidget user={user} role={role} />
    </div>
  );
}

export default App;
