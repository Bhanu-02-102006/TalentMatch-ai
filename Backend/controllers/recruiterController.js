const Recruiter = require("../models/recruiter");
const { hashPassword, comparePassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register a new Recruiter
exports.registerRecruiter = async (req, res) => {
  try {
    const { recruiterName, companyName, email, password, website } = req.body;

    if (!recruiterName || !companyName || !email || !password) {
      return res.status(400).json({ msg: "Please enter all required fields" });
    }

    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ msg: "Recruiter with this email already exists" });
    }

    const hashedPassword = hashPassword(password);

    const recruiter = await Recruiter.create({
      recruiterName,
      companyName,
      email,
      password: hashedPassword,
      website
    });

    const recruiterResponse = recruiter.toObject();
    delete recruiterResponse.password;

    const token = jwt.sign(
      { id: recruiter._id, role: "recruiter" },
      process.env.JWT_SECRET || "super_secret_skillmatch_key_change_in_production",
      { expiresIn: "30d" }
    );

    res.status(201).json({
      msg: "Recruiter registered successfully",
      recruiter: recruiterResponse,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login Recruiter
exports.loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter email and password" });
    }

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (recruiter.isBanned) {
      return res.status(403).json({ msg: "This recruiter account has been banned due to policy violations" });
    }

    const isMatch = comparePassword(password, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const recruiterResponse = recruiter.toObject();
    delete recruiterResponse.password;

    const token = jwt.sign(
      { id: recruiter._id, role: "recruiter" },
      process.env.JWT_SECRET || "super_secret_skillmatch_key_change_in_production",
      { expiresIn: "30d" }
    );

    res.json({
      msg: "Logged in successfully",
      recruiter: recruiterResponse,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Recruiter Profile
exports.getRecruiterProfile = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id).select("-password");
    if (!recruiter) {
      return res.status(404).json({ msg: "Recruiter profile not found" });
    }

    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Recruiter Profile
exports.updateRecruiterProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      website,
      companyDescription,
      location,
      contactNumber,
      industry,
      foundedIn,
      companySize
    } = req.body;

    const recruiter = await Recruiter.findById(id);
    if (!recruiter) {
      return res.status(404).json({ msg: "Recruiter not found" });
    }

    if (companyName !== undefined) recruiter.companyName = companyName;
    if (website !== undefined) recruiter.website = website;
    if (companyDescription !== undefined) recruiter.companyDescription = companyDescription;
    if (location !== undefined) recruiter.location = location;
    if (contactNumber !== undefined) recruiter.contactNumber = contactNumber;
    if (industry !== undefined) recruiter.industry = industry;
    if (foundedIn !== undefined) recruiter.foundedIn = foundedIn;
    if (companySize !== undefined) recruiter.companySize = companySize;

    await recruiter.save();

    const recruiterResponse = recruiter.toObject();
    delete recruiterResponse.password;

    res.json({
      msg: "Profile updated successfully",
      recruiter: recruiterResponse
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
