import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Request, Response } from "express";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const chatSchema = z.object({
  message: z.string().trim().min(1, "Message is required").max(500, "Message is too long")
});

const SYSTEM_PROMPT = `
You are the VoteVerse AI Assistant, an expert in election processes, voter registration, and civic education.
Your goal is to provide accurate, non-partisan, and engaging information about voting.
If asked about topics outside of elections or civic education, politely steer the conversation back to VoteVerse's mission.
Keep responses concise and easy to understand for a general audience.
`;

export async function createChatReply(request: Request, response: Response) {
  try {
    const validated = chatSchema.safeParse(request.body);
    
    if (!validated.success) {
      console.error("Validation Error:", JSON.stringify(validated.error, null, 2));
      return response.status(400).json({ 
        error: validated.error.issues[0]?.message || "Invalid request" 
      });
    }



    const { message } = validated.data;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I am the VoteVerse AI Assistant, ready to help with election-related questions." }] }
      ]
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    response.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    response.status(500).json({ error: "Failed to generate AI response. Please try again later." });
  }
}


