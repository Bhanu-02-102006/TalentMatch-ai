const express = require("express");
const connection = require("./config/db");
const resumeRoute = require("./routes/resumeRoute");
const jobRoute = require("./routes/jobpostingRoute");
const recruiterRoute = require("./routes/recruiterRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 
app.use("/api/jobs", jobRoute);
app.use("/api/recruiters", recruiterRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api", resumeRoute);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    connection();
});