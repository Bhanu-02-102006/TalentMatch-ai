const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function checkIsResume(text) {
  if (!text || text.trim().length < 50) {
    return false;
  }
  
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `
Analyze the following document text and determine if it represents a professional resume, CV, or candidate profile.
Examples of resumes typically contain sections like contact information, professional experience, work history, education, skills, projects, certifications, etc.

Return ONLY raw JSON. No markdown. No backticks.

Format:
{
  "isResume": true
}

Document Text:
${text}
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

    const parsed = JSON.parse(cleanOutput);
    return !!parsed.isResume;
  } catch (e) {
    console.error("Error validating resume content:", e.message);
    // If validation fails due to API limit or error, we do a simple fallback keyword check as backup
    const keywords = ["experience", "education", "skills", "projects", "employment", "work history", "resume", "curriculum vitae", "cv"];
    const textLower = text.toLowerCase();
    const matches = keywords.filter(keyword => textLower.includes(keyword));
    return matches.length >= 3;
  }
}

module.exports = checkIsResume;
