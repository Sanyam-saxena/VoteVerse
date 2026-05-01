import chatResponses from "../data/chatResponses.json";
import quizQuestions from "../data/quizQuestions.json";
import scenarios from "../data/scenarios.json";
import simulatorSteps from "../data/simulatorSteps.json";
import timelineSteps from "../data/timelineSteps.json";

const fallbackData = {
  "chat-responses": chatResponses,
  "quiz-questions": quizQuestions,
  scenarios,
  "simulator-steps": simulatorSteps,
  "timeline-steps": timelineSteps
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export async function fetchElectionData(resource: string): Promise<any> {

  try {
    const response = await fetch(`${API_BASE_URL}/${resource}`);
    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    const json = await response.json();
    return json.data;

  } catch (error) {
    return fallbackData[resource];
  }
}

export async function fetchChatReply(message: string): Promise<string> {

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    const data = await response.json();
    return data.reply;
  } catch (error) {
    return getLocalChatReply(message);
  }
}

// MVP mock AI uses public election-process concepts from ECI, NVSP, and data.gov.in style datasets.
function getLocalChatReply(message: string): string {

  const normalizedMessage = message.toLowerCase();
  const match = chatResponses.responses.find((item) =>
    item.keywords.some((keyword) => normalizedMessage.includes(keyword))
  );

  return match?.reply || chatResponses.fallbackReply;
}
