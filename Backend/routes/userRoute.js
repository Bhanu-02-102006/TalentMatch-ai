const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  applyToJob,
  updateApplicationStatus
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", getUserProfile);
router.post("/apply", applyToJob);
router.put("/application-status", updateApplicationStatus);

module.exports = router;
