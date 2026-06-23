const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function analyzeSkillGap(userSkills, jobSkills) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `
Compare user skills with job required skills.

Return ONLY raw JSON. No markdown.

Format:
{
  "matchScore": 0,
  "missingSkills": []
}

Rules:
- matchScore should be from 0 to 100
- missingSkills should be array of skills required by job but missing in user skills

User Skills:
${JSON.stringify(userSkills)}

Job Required Skills:
${JSON.stringify(jobSkills)}
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

module.exports = analyzeSkillGap;