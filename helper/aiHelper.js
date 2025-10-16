const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Predict next set of questions
async function predictNextQuestions(progress, answeredQuestions, topic, count = 5) {
    const prompt = `
You are an AI tutor. 
Topic: ${topic}
User difficulty: ${progress.currentDifficulty}
User answered question IDs: ${answeredQuestions.join(", ")}
Generate ${count} multiple choice questions (4 options each) for the user.
Return JSON array in this format:

[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A",
    "difficulty": 3,
    "skillTag": "javascript"
  },
  ...
]
`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return JSON.parse(response.text); // Returns an array of questions
}

// Predict career based on skill scores
async function predictCareer(skillScores) {
    const prompt = `
You are a career guidance AI.
User skill scores: ${JSON.stringify(skillScores)}
Suggest top 3 suitable career paths with reasoning.
Provide output in JSON like:
{
  "careerPaths": [
    {"career": "Frontend Developer", "reason": "Strong in JavaScript and React"},
    {"career": "Data Analyst", "reason": "Good accuracy in SQL and Data skills"}
  ]
}
`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return JSON.parse(response.text);
}

module.exports = { predictNextQuestions, predictCareer };
