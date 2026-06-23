const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  recruiterName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  website: { type: String },
  companyDescription: { type: String },
  location: { type: String },
  contactNumber: { type: String },
  industry: { type: String },
  foundedIn: { type: Number },
  companySize: { type: String },
  verified: { type: Boolean, default: false },
  role: { type: String, default: "recruiter" },
  // no of flags count
  flags: { type: Number, default: 0 },
  // is baned
  isBanned: { type: Boolean, default: false },
  totalJobsPosted: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Recruiter", recruiterSchema);