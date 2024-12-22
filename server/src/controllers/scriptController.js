import { generateScriptWithAI } from "../services/aiService.js";

export async function generateScript(req, res) {
  try {
    const { prompt, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const script = await generateScriptWithAI(prompt, language);
    res.json({ script });
  } catch (error) {
    console.error("Error generating script:", error);
    res.status(500).json({ error: "Failed to generate script" });
  }
}

export async function getScripts(req, res) {
  try {
    const scripts = [];
    res.json(scripts);
  } catch (error) {
    console.error("Error fetching scripts:", error);
    res.status(500).json({ error: "Failed to fetch scripts" });
  }
}
