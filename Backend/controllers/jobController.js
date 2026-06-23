const Job = require("../models/job");
const Recruiter = require("../models/recruiter");
const User = require("../models/usermodel");
const checkJobFraud = require("../utils/fraudcheck");

exports.createJob = async (req, res) => {
  try {
    const {
      recruiterId,
      title,
      company,
      location,
      description,
      additionalInfo,
      requiredSkills,
      salary,
      jobType
    } = req.body;

    const recruiter = await Recruiter.findById(recruiterId);

    if (!recruiter) {
      return res.status(404).json({ msg: "Recruiter not found" });
    }

    if (recruiter.isBanned || (recruiter.flags || 0) >= 5) {
      return res.status(403).json({ msg: "Recruiter has reached the limit of 5 flags due to policy violations. Job posting is disabled." });
    }

    const aiResult = await checkJobFraud(description, additionalInfo);

    const job = await Job.create({
      recruiterId,
      title,
      company,
      location,
      description,
      additionalInfo,
      requiredSkills,
      salary,
      jobType,
      isFlagged: aiResult.isFraud,
      fraudReason: aiResult.reason,
      fraudConfidence: aiResult.confidence
    });

    recruiter.totalJobsPosted = (recruiter.totalJobsPosted || 0) + 1;

    if (aiResult.isFraud) {
      recruiter.flags += 1;

      if (recruiter.flags >= 5) recruiter.isBanned = true;
    }

    await recruiter.save();

    res.status(201).json({
      msg: aiResult.isFraud ? "Job posted but flagged as suspicious" : "Job posted successfully",
      job,
      fraudAnalysis: aiResult
    });

  } catch (err) {
    console.error("❌ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.recommendJobs = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const userSkills = req.body.userSkills || user.skills || [];
    const jobs = await Job.find({ isFlagged: false });

    const analyzedJobs = jobs.map(job => {
      const userSet = new Set(userSkills.map(s => s.toLowerCase()));

      const matchedSkills = job.requiredSkills.filter(skill =>
        userSet.has(skill.toLowerCase())
      );

      const missingSkills = job.requiredSkills.filter(skill =>
        !userSet.has(skill.toLowerCase())
      );

      const matchScore = job.requiredSkills.length
        ? Math.round((matchedSkills.length / job.requiredSkills.length) * 100)
        : 0;

      return {
        jobId: job._id,
        title: job.title,
        company: job.company,
        description: job.description,
        additionalInfo: job.additionalInfo,
        salary: job.salary,
        matchScore,
        missingSkills,
        isFlagged: job.isFlagged,
        fraudReason: job.fraudReason
      };
    });

    analyzedJobs.sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;

      const salaryA = Number(String(a.salary).replace(/\D/g, "")) || 0;
      const salaryB = Number(String(b.salary).replace(/\D/g, "")) || 0;

      return salaryB - salaryA;
    });
    
    res.json({
      msg: "Jobs recommended successfully",
      jobs: analyzedJobs
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.checkFraudByJobId = async (req, res) => {
  try {
    const { recruiterId, jobId } = req.body;

    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ msg: "Recruiter not found" });
    }

    if (recruiter.isBanned) {
      return res.status(403).json({ msg: "Recruiter is already banned" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    if (job.recruiterId.toString() !== recruiterId) {
      return res.status(403).json({ msg: "This job does not belong to this recruiter" });
    }

    const aiResult = await checkJobFraud(
      job.description,
      job.additionalInfo
    );

    job.isFlagged = aiResult.isFraud;
    job.fraudReason = aiResult.reason;
    job.fraudConfidence = aiResult.confidence;

    if (aiResult.isFraud) {
      recruiter.flags += 1;

      if (recruiter.flags >= 5) {
        recruiter.isBanned = true;
      }

      await recruiter.save();
    }

    await job.save();

    res.json({
      msg: aiResult.isFraud
        ? "Job flagged as suspicious"
        : "Job is genuine",
      fraudAnalysis: aiResult,
      job,
      recruiterFlags: recruiter.flags,
      recruiterBanned: recruiter.isBanned
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all jobs posted by a recruiter
exports.getJobsByRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const jobs = await Job.find({ recruiterId }).populate({
      path: "applicants",
      populate: {
        path: "resumeId"
      }
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a job posting
exports.deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    const recruiterId = job.recruiterId;
    await Job.findByIdAndDelete(jobId);

    // Decrement the total jobs posted count for the recruiter
    const recruiter = await Recruiter.findById(recruiterId);
    if (recruiter) {
      recruiter.totalJobsPosted = Math.max(0, (recruiter.totalJobsPosted || 0) - 1);
      await recruiter.save();
    }

    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};