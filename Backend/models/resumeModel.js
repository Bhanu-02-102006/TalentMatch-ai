const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  originalName: {
    type: String,
    required: true,
  },

  resumeUrl: {
    type: String,
    required: true,
  },

  cloudinaryPublicId: {
    type: String,
    required: true,
  },

  skills: [
    {
      type: String,
    },
  ]
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);