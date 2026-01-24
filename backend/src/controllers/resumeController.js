import OpenAI from "openai";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");


export const analyzeResume = async (req, res) => {
    try {
    
        const openai = new OpenAI({
            apiKey:process.env.OPENAI_API_KEY,
        });
    // console.log("FILES RECEIVED:", req.files);

    if (!req.files || req.files.length === 0) {
    return res.status(400).json({
        success: false,
        message: "No file uploaded",
    });
    }

    const file = req.files[0];

    if (!file.buffer) {
      return res.status(400).json({
        success: false,
        message: "File buffer missing",
      });
    }

    // 🔹 Parse PDF
    const data = await pdf(file.buffer);
    const resumeText = data.text;
    
    const role=req.body.role || "Software Engineer";

    // 🔹 SEND TO OPENAI
const prompt = `
You are an expert technical recruiter and resume reviewer.

Target Job Role: ${role}

Analyze the following resume specifically for the above role and return STRICT JSON in this format:

{
  "score": number (0-100),
  "strengths": [list of strengths relevant to this role],
  "improvements": [list of role-specific improvement suggestions],
  "missingSkills": [important missing technical skills for this role],
  "atsTips": [tips to improve ATS score for this role],
  "summary": "short professional evaluation focused on this role"
}

Resume Text:
${resumeText.slice(0, 4000)}
`;


    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",   // fast & cheap
      messages: [
        { role: "system", content: "You are a professional resume reviewer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    });

    const aiResponse = completion.choices[0].message.content;

    // 🔹 Parse AI JSON safely
let feedback;
try {
  // 🔥 Clean markdown fences if present
  let clean = aiResponse.trim();

  if (clean.startsWith("```")) {
    clean = clean.replace(/```json/g, "");
    clean = clean.replace(/```/g, "");
    clean = clean.trim();
  }

  feedback = JSON.parse(clean);

} catch (err) {
  console.error("AI JSON PARSE ERROR RAW:", aiResponse);
  return res.status(500).json({
    success: false,
    message: "AI response parsing failed",
  });
}


    res.json({
      success: true,
      feedback,
    });

  } catch (error) {
    console.error("RESUME AI ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Resume analysis failed",
      error: error.message,
    });
  }
};
