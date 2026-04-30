import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { fetchChatReply } from "../services/api.js";
import { trackEvent } from "../services/googleAnalytics.js";

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Hi, I am the VoteVerse assistant. Ask me about voter registration, verification, voting day, results, or election timelines."
  }
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const nextId = useRef(2);

  const sendMessage = async (event) => {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isSending) return;

    const userMessage = { id: nextId.current++, role: "user", text: trimmedInput };
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setIsSending(true);

    const reply = await fetchChatReply(trimmedInput);
    trackEvent("chat_message_sent", { module_name: "AI Chat" });
    const assistantMessage = { id: nextId.current++, role: "assistant", text: reply };
    setMessages((currentMessages) => [...currentMessages, assistantMessage]);
    setIsSending(false);
  };

  return (
    <section className="page narrow-page">
      <div className="module-header">
        <span className="module-kicker">AI Chat Assistant</span>
        <h1>Ask election-process questions</h1>
        <p>Keyword-based mock AI for the MVP, using structured JSON responses.</p>
      </div>

      <div className="chat-shell">
        <div className="chat-messages" aria-live="polite">
          {messages.map((message) => (
            <div className={`message-row ${message.role}`} key={message.id}>
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}
          {isSending && (
            <div className="message-row assistant">
              <div className="message-bubble typing">Thinking...</div>
            </div>
          )}
        </div>

        <form className="chat-form" onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Try: How do I register to vote?"
            aria-label="Message"
          />
          <button className="button button-primary" type="submit" disabled={isSending}>
            <Send size={18} aria-hidden="true" />
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
