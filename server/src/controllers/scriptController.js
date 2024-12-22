import { Script } from "../models/Script.js";
import { generateScriptWithAI } from "../services/aiService.js";

export async function generateScript(req, res) {
  try {
    const { prompt, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    if (!language) {
      return res.status(400).json({ error: "Language is required" });
    }

    const generatedScript = await generateScriptWithAI(prompt, language);

    res.status(200).json({ script: generatedScript });
  } catch (error) {
    console.error("Error generating script:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while generating the script" });
  }
}

export async function saveScript(req, res) {
  try {
    const { prompt, script, language, date } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newScript = new Script({
      userId: req.userId,
      prompt,
      script: JSON.stringify(script),
      language,
      date,
    });

    await newScript.save();

    res
      .status(201)
      .json({ message: "Script saved successfully", script: newScript });
  } catch (error) {
    console.error("Error saving script:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while saving the script" });
  }
}

export async function getScripts(req, res) {
  try {
    const scripts = await Script.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json(scripts);
  } catch (error) {
    console.error("Error fetching scripts:", error.message);
    res.status(500).json({ error: "Failed to fetch scripts" });
  }
}
