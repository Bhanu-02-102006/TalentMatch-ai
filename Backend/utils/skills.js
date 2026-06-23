const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function extractSkills(resumeText) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `
Extract only skills from this resume.

Return ONLY raw JSON.
Do not use markdown.
Do not use triple backticks.

Format:
{
  "skills": []
}

Resume:
${resumeText}
`
      }
    ],
    temperature: 0,
  });

  const output = completion.choices[0].message.content;
  const cleanOutput = output
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanOutput);
}
module.exports = extractSkills;