const User = require("../models/usermodel");
const Job = require("../models/job");
const Recruiter = require("../models/recruiter");
const { hashPassword, comparePassword } = require("../utils/hash");
const analyzeSkillGap = require("../utils/skillGap");
const { sendEmail } = require("../utils/email");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, phonenumber, skills } = req.body;

    if (!username || !email || !password || !phonenumber) {
      return res.status(400).json({ msg: "Please enter all required fields" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: "User with this email already exists" });
    }

    const phoneExists = await User.findOne({ phonenumber });
    if (phoneExists) {
      return res.status(400).json({ msg: "User with this phone number already exists" });
    }

    const hashedPassword = hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phonenumber,
      skills: skills || []
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = jwt.sign(
      { id: user._id, role: "candidate" },
      process.env.JWT_SECRET || "super_secret_skillmatch_key_change_in_production",
      { expiresIn: "30d" }
    );

    res.status(201).json({
      msg: "User registered successfully",
      user: userResponse,
      token
    });
  } catch (err) {
    console.error("❌ REGISTRATION CRASH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = jwt.sign(
      { id: user._id, role: "candidate" },
      process.env.JWT_SECRET || "super_secret_skillmatch_key_change_in_production",
      { expiresIn: "30d" }
    );

    res.json({
      msg: "Logged in successfully",
      user: userResponse,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User Profile (populated)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("resumeId")
      .populate("appliedJobs.jobId");

    if (!user) {
      return res.status(404).json({ msg: "User profile not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Explicitly Apply to a Job
exports.applyToJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({ msg: "User ID and Job ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    if (job.isFlagged) {
      return res.status(400).json({ msg: "Cannot apply to a flagged/suspicious job" });
    }

    // Check if already applied
    const alreadyApplied = user.appliedJobs.some(app => app.jobId.toString() === jobId);
    if (alreadyApplied) {
      return res.status(400).json({ msg: "You have already applied for this job" });
    }

    // Calculate match score and missing skills via LLM
    const userSkills = user.skills || [];
    const jobSkills = job.requiredSkills || [];

    let aiResult;
    try {
      aiResult = await analyzeSkillGap(userSkills, jobSkills);
    } catch (aiErr) {
      return res.status(500).json({ msg: "AI skill gap analysis failed", error: aiErr.message });
    }

    const { matchScore, missingSkills } = aiResult;

    // Enforce match score threshold >= 60
    if (matchScore < 60) {
      return res.status(400).json({
        msg: `Application unsuccessful: Your skill match score is ${matchScore}%, which is below the required 60% threshold.`,
        matchScore,
        missingSkills
      });
    }

    // Update User applied jobs
    user.appliedJobs.push({
      jobId,
      matchScore,
      missingSkills,
      status: "Under Review"
    });

    // Update Job applicants list
    job.applicants.push(userId);

    await user.save();
    await job.save();

    // Fetch Recruiter to get contact details
    const recruiter = await Recruiter.findById(job.recruiterId);

    // Send emails asynchronously
    if (recruiter) {
      // Email to User
      sendEmail({
        to: user.email,
        subject: `Application Submitted Successfully - ${job.title}`,
        text: `Hi ${user.username},\n\nCongratulations! Your application for "${job.title}" at "${job.company}" was submitted successfully. \n\nGood luck!`,
      });

      // Email to Recruiter
      sendEmail({
        to: recruiter.email,
        subject: `New Job Application for ${job.title} - ${user.username}`,
        text: `Hi ${recruiter.recruiterName},\n\nA new candidate, ${user.username}, has successfully applied for "${job.title}".\n\nCandidate Skills: ${userSkills.join(", ") || "None"}\nMatching Score: ${matchScore}%\nMissing Skills: ${missingSkills.join(", ") || "None"}\n\nCandidate Email: ${user.email}\nCandidate Phone: ${user.phonenumber}\n\nPlease check your recruiter portal to review their profile.`,
      });
    }

    res.json({
      msg: "Applied to job successfully",
      matchScore,
      missingSkills
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Application Status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { userId, jobId, status } = req.body;

    if (!userId || !jobId || !status) {
      return res.status(400).json({ msg: "User ID, Job ID, and status are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const application = user.appliedJobs.find(
      (app) => app.jobId.toString() === jobId.toString()
    );

    if (!application) {
      return res.status(404).json({ msg: "Job application not found for this candidate" });
    }

    application.status = status;
    await user.save();

    if (status === "Accepted") {
      try {
        const job = await Job.findById(jobId);
        const jobTitle = job ? job.title : "Job Position";
        const companyName = job ? job.company : "the company";
        
        await sendEmail({
          to: user.email,
          subject: `Congratulations! You have been selected for ${jobTitle}`,
          text: `Hi ${user.username},\n\nCongratulations! Your application for "${jobTitle}" at "${companyName}" has been accepted.\n\nYou have been selected for this role. The recruiter will be in touch with you shortly.\n\nBest regards,\nSkillMatch AI Team`
        });
      } catch (emailErr) {
        console.error("Error sending selection email notification:", emailErr.message);
      }
    }

    res.json({
      msg: "Application status updated successfully",
      appliedJobs: user.appliedJobs
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
