import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Request, Response } from "express";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const roadmapSchema = z.object({
  age: z.number().min(18, "Must be at least 18 to vote"),
  state: z.string().min(2, "State name is required"),
  interest: z.enum(["registration", "verification", "voting-day", "all"])
});

/**
 * Generates a personalized election roadmap using Google Gemini AI.
 * This demonstrates advanced integration of Google Generative AI for tailored educational content.
 * 
 * @param request - Express Request containing user age, state, and interest
 * @param response - Express Response with the generated markdown roadmap
 */
export async function generatePersonalizedRoadmap(request: Request, response: Response) {
  try {
    const validated = roadmapSchema.safeParse(request.body);
    if (!validated.success) {
      return response.status(400).json({ error: validated.error.issues[0]?.message });
    }

    const { age, state, interest } = validated.data;

    const prompt = `
      Create a personalized voting roadmap for a ${age}-year-old resident of ${state}, India.
      The focus should be on: ${interest}.
      Provide a step-by-step guide with milestones, specific portals like NVSP, and important deadlines.
      Use a encouraging and clear tone. Format as structured Markdown.
    `;

    const result = await model.generateContent(prompt);
    const roadmap = result.response.text();

    response.json({ roadmap });
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
    response.status(500).json({ error: "Could not generate roadmap at this time." });
  }
}
