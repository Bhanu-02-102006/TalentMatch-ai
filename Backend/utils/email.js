const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === "true", 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  console.log("Nodemailer SMTP Transporter configured.");
} else {
  console.log("Nodemailer SMTP credentials missing. Running in mock console-log mode.");
}

/**
 * Helper to send email to user/recruiter.
 * @param {Object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} options.text
 * @param {string} options.html
 */
async function sendEmail({ to, subject, text, html }) {
  const fromEmail = process.env.SMTP_FROM || "noreply@talentmatch.com";
  
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"TalentMatch" <${fromEmail}>`,
        to,
        subject,
        text,
        html,
      });
      console.log(`Email successfully sent to ${to}. Message ID: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error.message);
    }
  } else {
    console.log(`\n==================================================`);
    console.log(`[MOCK EMAIL SENT]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${text}`);
    console.log(`==================================================\n`);
  }
}

module.exports = {
  sendEmail
};
