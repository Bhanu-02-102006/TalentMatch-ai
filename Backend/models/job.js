const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true
  },

  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  description: { type: String, required: true },
  additionalInfo: String,
  requiredSkills: [String],

  salary: String,

  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship"],
    default: "Full-time"
  },

  // Users who applied
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  isFlagged: {
    type: Boolean,
    default: false
  },
  fraudReason: String,
  fraudConfidence: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);