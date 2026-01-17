// import OpenAI from "openai";
// import AppError from "../utils/AppError.js";
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// export const evaluateAnswerWithAI = async ({
//   role,
//   topic,
//   question,
//   answer
// }) => {
//   const prompt = `
// You are a professional technical interviewer evaluating fresher-level candidates (0–2 years experience).

// Evaluate the following interview answer.

// Role: ${role}
// Topic: ${topic}
// Question: ${question}
// Candidate Answer: ${answer}

// Rules:
// 1. Assume the candidate is a fresher.
// 2. Use simple and encouraging language.
// 3. Do NOT use advanced jargon.
// 4. Do NOT mention system design or architecture.
// 5. Be concise and clear.
// 6. Return ONLY valid JSON.
// 7. Do NOT add explanations outside JSON.

// Return the response strictly in the following JSON format:

// {
//   "score": number (0 to 10),
//   "strengths": [string],
//   "improvements": [string],
//   "improvedAnswer": string,
//   "followUpQuestion": string
// }
// `;

//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.2
//   });

//   return response.choices[0].message.content;
// };

// import OpenAI from "openai";
// import AppError from "../utils/AppError.js";

// export const evaluateAnswerWithAI = async (prompt) => {
//   // Initialize INSIDE function (important)
//   if (!process.env.OPENAI_API_KEY) {
//     throw new AppError(
//       "AI service is not configured. Please try again later.",
//       503
//     );
//   }

//   const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
//   });

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }]
//     });

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("AI API ERROR:", error);
//     throw new AppError(
//       "AI service temporarily unavailable. Please try again.",
//       503
//     );
//   }
// };


import OpenAI from "openai";
import AppError from "../utils/AppError.js";

let openaiClient = null;

/**
 * Lazily create OpenAI client AFTER env variables are loaded
 */
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new AppError("OpenAI API key not configured", 500);
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  return openaiClient;
};

export const evaluateAnswerWithAI = async ({
  role,
  topic,
  question,
  answer
}) => {
  try {
    const client = getOpenAIClient();

    const prompt = `
You are a professional technical interviewer evaluating fresher-level candidates (0–2 years experience).

Evaluate the following interview answer.

Role: ${role}
Topic: ${topic}
Question: ${question}
Candidate Answer: ${answer}

Rules:
1. Assume the candidate is a fresher.
2. Use simple and encouraging language.
3. Do NOT use advanced jargon.
4. Do NOT mention system design or architecture.
5. Be concise and clear.
6. Return ONLY valid JSON.
7. Do NOT add explanations outside JSON.

Return the response strictly in the following JSON format:

{
  "score": number (0 to 10),
  "strengths": [string],
  "improvements": [string],
  "improvedAnswer": string,
  "followUpQuestion": string
}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: String(prompt)
        }
      ],
      temperature: 0.2
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI API ERROR:", error);
    throw new AppError(
      "AI service temporarily unavailable. Please try again.",
      503
    );
  }
};

