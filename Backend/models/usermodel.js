  const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume"
    },
    skills: [String],
    phonenumber: { type: String ,required: true, unique: true},
    appliedJobs:[{
        jobId: {type: mongoose.Schema.Types.ObjectId, ref: "Job"},
        matchScore: {type: Number, default: 0},
        status: {
          type: String,
          enum: ["Under Review", "Accepted", "Rejected"],
          default: "Under Review"
        },
        missingSkills: [String]
    }],
    totalJobsApplied: { type: Number, default: 0 }
  }, { timestamps: true });

  userSchema.pre("save", function (next) {
    if (this.isModified("appliedJobs")) {
      this.totalJobsApplied = this.appliedJobs.length;
    }
  });

  module.exports = mongoose.model("User", userSchema);