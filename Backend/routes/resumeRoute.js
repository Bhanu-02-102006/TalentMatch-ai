const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const extractSkills = require("../utils/skills");
const checkIsResume = require("../utils/resumeCheck");
const cloudinary = require("../utils/cloudinary");
const Resume = require("../models/resumeModel");
const User = require("../models/usermodel");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/extract-skills", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Resume file is required" });
    }

    const isPDF = req.file.mimetype === "application/pdf" || req.file.originalname.toLowerCase().endsWith(".pdf");
    if (!isPDF) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ msg: "Only resumes are accepted. Uploaded documents of other types are not allowed." });
    }

    const userId = req.body.userId;
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ msg: "User not found for the provided userId" });
      }
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    const isResume = await checkIsResume(resumeText);
    if (!isResume) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ msg: "Only resumes are accepted. Uploaded documents of other types are not allowed." });
    }

    const result = await extractSkills(resumeText);

    const cloudResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "resumes",
      resource_type: "auto",
    });

    const savedResume = await Resume.create({
      userId: userId || null,
      originalName: req.file.originalname,
      resumeUrl: cloudResult.secure_url,
      cloudinaryPublicId: cloudResult.public_id,
      skills: result.skills,
    });

    if (user) {
      user.resumeId = savedResume._id;
      user.skills = result.skills;
      await user.save();
    }

    fs.unlinkSync(req.file.path);

    res.json({
      msg: "Resume uploaded, stored in Cloudinary, and skills saved",
      resume: savedResume,
      userUpdated: !!user,
      skills: result.skills
    });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;