const User = require("../models/usermodel");
const Recruiter = require("../models/recruiter");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Token is missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "super_secret_skillmatch_key_change_in_production"
      );
    } catch (jwtErr) {
      return res.status(401).json({ msg: "Token is not valid or has expired" });
    }

    const { id, role } = decoded;

    if (role === "candidate") {
      const user = await User.findById(id)
        .select("-password")
        .populate("resumeId")
        .populate("appliedJobs.jobId");
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.json({ role: "candidate", user });
    } else if (role === "recruiter") {
      const recruiter = await Recruiter.findById(id).select("-password");
      if (!recruiter) {
        return res.status(404).json({ msg: "Recruiter not found" });
      }
      return res.json({ role: "recruiter", recruiter });
    } else {
      return res.status(400).json({ msg: "Invalid token role" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

