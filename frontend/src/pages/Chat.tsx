import { FormEvent, memo, useRef, useState } from "react";
import { Send } from "lucide-react";
import { fetchChatReply } from "../services/api";
import { trackEvent } from "../services/googleAnalytics";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

// Efficiency: Memoize message bubbles to prevent unnecessary re-renders in long lists
const ChatMessage = memo(({ message }: { message: Message }) => (
  <div className={`message-row ${message.role}`}>
    <div className="message-bubble">{message.text}</div>
  </div>
));

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi, I am the VoteVerse AI. Ask me anything about elections, registration, or the voting process!"
  }
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const nextId = useRef(2);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isSending) return;

    const userMessage: Message = { id: nextId.current++, role: "user", text: trimmedInput };
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const reply = await fetchChatReply(trimmedInput);
      trackEvent("chat_message_sent", { module_name: "AI Chat" });
      const assistantMessage: Message = { id: nextId.current++, role: "assistant", text: reply };
      setMessages((currentMessages) => [...currentMessages, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="page narrow-page">
      <div className="module-header">
        <span className="module-kicker">AI Chat Assistant</span>
        <h1>Ask election-process questions</h1>
        <p>Powered by Google Gemini for accurate and engaging election education.</p>
      </div>

      <div className="chat-shell">
        <div className="chat-messages" aria-live="polite" aria-relevant="additions">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
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
