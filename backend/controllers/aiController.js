import { GoogleGenAI } from "@google/genai";

export const generateTaskDescription = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Write a short, clear task description for this task: "${title.trim()}". Return only the description.`,
    });

    res.status(200).json({
      description: response.text,
    });
  } catch (error) {
    console.error("AI generation error:", error);

    res.status(500).json({
      message: "Failed to generate task description",
    });
  }
};