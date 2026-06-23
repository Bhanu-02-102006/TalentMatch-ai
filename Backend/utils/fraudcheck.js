const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function checkJobFraud(description, additionalInfo = "") {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `
Analyze this job post and check whether it is fake/fraud or genuine.

Check for:
- Asking money or registration fee
- Asking OTP/password/bank details
- Unrealistic salary
- Suspicious contact details
- No company details
- Fake interview process
- Scam words
- Too-good-to-be-true offer

Return ONLY raw JSON. No markdown. No backticks.

Format:
{
  "isFraud": false,
  "reason": "",
  "confidence": 0
}

Job Description:
${description}

Additional Info:
${additionalInfo}
`
      }
    ],
    temperature: 0
  });

  const output = completion.choices[0].message.content;

  const cleanOutput = output
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanOutput);
}

module.exports = checkJobFraud;