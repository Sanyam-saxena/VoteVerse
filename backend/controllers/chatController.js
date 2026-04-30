import chatResponses from "../../frontend/src/data/chatResponses.json" with { type: "json" };

// Mock AI logic for MVP. Keyword groups are maintained in JSON so responses stay editable without code changes.
export function createChatReply(request, response) {
  const rawMessage = request.body?.message;

  if (typeof rawMessage !== "string" || !rawMessage.trim()) {
    response.status(400).json({ error: "Message is required" });
    return;
  }

  if (rawMessage.length > 500) {
    response.status(400).json({ error: "Message must be 500 characters or fewer" });
    return;
  }

  const message = rawMessage.trim().toLowerCase();
  const match = chatResponses.responses.find((item) =>
    item.keywords.some((keyword) => message.includes(keyword))
  );

  response.json({ reply: match?.reply || chatResponses.fallbackReply });
}
