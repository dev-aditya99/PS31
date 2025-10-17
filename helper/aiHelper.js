const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Utility: Safely parse JSON from AI response
function safeJSONParse(str) {
  try {
    // Remove Markdown formatting if present
    const cleaned = str
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Find JSON array/object inside messy text
    const jsonStart = cleaned.indexOf("[");
    const jsonEnd = cleaned.lastIndexOf("]");
    const jsonText = cleaned.slice(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonText);
  } catch (err) {
    console.error("❌ Failed to parse AI JSON:", err.message);
    return [];
  }
}

// Adaptive Question Generator
async function predictNextQuestion(progress, recentResponses, topic, count = 5) {
  const formattedResponses = recentResponses.map(r => ({
    question: r.questionText,
    selectedOption: r.selectedOption,
    correctAnswer: r.correctAnswer,
    correct: r.correct,
    difficulty: r.difficulty || progress.currentDifficulty
  }));

  const prompt = `
You are an adaptive AI tutor.
Topic: ${topic}
User's current difficulty: ${progress.currentDifficulty}
Here are the last ${recentResponses.length} questions and their answers:
${JSON.stringify(formattedResponses, null, 2)}

Based on this performance:
- If accuracy is high, increase difficulty slightly.
- If accuracy is low, reduce complexity.
- Focus on improving weak areas (based on wrong answers).
Generate ${count} multiple choice questions in pure JSON array format only:
[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A",
    "difficulty": 1-5,
    "skillTag": "relatedSkill"
  }
]
Do not include any markdown, explanations, or text outside the JSON array.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  const text = response.response?.text() || response.text || "";
  return safeJSONParse(text);
}

// Career Prediction Helper
async function predictCareer(skillScores) {
  const prompt = `
You are a career guidance AI.
User skill scores: ${JSON.stringify(skillScores, null, 2)}

1. Suggest top 3 career paths with reasoning.
2. Assign a confidence score (0-1) for each.
3. Mention skill gaps to improve.
Return pure JSON only like this (no markdown):
{
  "careerPaths": [
    {
      "career": "Frontend Developer",
      "confidence": 0.9,
      "reason": "Excellent in JavaScript and UI frameworks",
      "skillGaps": ["TypeScript", "Testing"]
    }
  ]
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  const text = response.response?.text() || response.text || "";
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Career AI parse error:", text);
    return { careerPaths: [] };
  }
}

module.exports = { predictNextQuestion, predictCareer };
