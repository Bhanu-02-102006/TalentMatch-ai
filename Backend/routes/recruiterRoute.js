const express = require("express");
const router = express.Router();
const {
  registerRecruiter,
  loginRecruiter,
  getRecruiterProfile,
  updateRecruiterProfile
} = require("../controllers/recruiterController");

router.post("/register", registerRecruiter);
router.post("/login", loginRecruiter);
router.get("/profile/:id", getRecruiterProfile);
router.put("/profile/:id", updateRecruiterProfile);

module.exports = router;
