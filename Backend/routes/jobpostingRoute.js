const express = require("express");
const router = express.Router();

const {
  createJob,
  recommendJobs,
  checkFraudByJobId,
  getJobsByRecruiter,
  deleteJob
} = require("../controllers/jobController");

router.post("/create-job", createJob);
router.post("/recommend-jobs", recommendJobs);
router.post("/check-fraud", checkFraudByJobId);
router.get("/recruiter/:recruiterId", getJobsByRecruiter);
router.delete("/delete-job/:jobId", deleteJob);

module.exports = router;