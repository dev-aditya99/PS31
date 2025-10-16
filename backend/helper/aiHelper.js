const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Predict next question
async function predictNextQuestion(progress, answeredQuestions) {
    const prompt = `
    You are an AI tutor. 
    User difficulty: ${progress.currentDifficulty}
    User answered questions IDs: ${answeredQuestions.join(", ")}
    Suggest the next question text with 4 options and mark the correct answer in JSON format like:
    {
      "question": "question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "difficulty": 3 // 1(very easy),2(easy),3(medium),4(hard),(very hard) ,
      "skillTag": "javascript"
    }
    `;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });
    return JSON.parse(response.text);
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

module.exports = { predictNextQuestion, predictCareer };
