"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuMessageCircle, LuX, LuSend } from "react-icons/lu";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
type TypingIndicator = { id: string; role: "typing" };

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [messages, setMessages] = useState<(Message | TypingIndicator)[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show the welcome bubble on scroll
  useEffect(() => {
    const handleScroll = () => {
      const hasBeenShown = sessionStorage.getItem("chatBubbleShown") === "true";
      if (window.scrollY > 200 && !hasBeenShown) {
        setIsBubbleVisible(true);
        sessionStorage.setItem("chatBubbleShown", "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSendMessage = async (messageContent?: string) => {
    const content = (messageContent || inputValue).trim();
    if (!content) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    const typingIndicator: TypingIndicator = {
      id: "typing-indicator",
      role: "typing",
    };

    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, typingIndicator]);

    if (!messageContent) {
      setInputValue("");
    }

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("API response not ok");
      const data = await response.json();
      const botMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "typing-indicator"),
        botMessage,
      ]);
    } catch (error) {
      console.error("Failed to get bot reply:", error);
      const errorReply: Message = {
        id: "error-message",
        role: "assistant",
        content:
          "I seem to be having trouble connecting. Please try again in a moment.",
      };
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "typing-indicator"),
        errorReply,
      ]);
    }
  };

  const startChat = () => {
    setIsOpen(true);
    setIsBubbleVisible(false); // Hide bubble on interaction
    if (messages.length === 0) {
      setMessages([
        {
          id: "initial",
          role: "assistant",
          content: "<p>Hi! What can I help you with today?</p>",
        },
      ]);
    }
  };

  const handleCloseBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBubbleVisible(false);
  };

  const initialButtons = [
    "Tell me about your services",
    "How does pricing work?",
    "I have another question.",
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 z-50 flex h-[500px] w-[400px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border bg-[#E0E7FF] p-4">
              <h3 className="font-heading">Atlas | Digital Assistant</h3>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <LuX className="h-5 w-5 text-text-muted" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-background p-4">
              {messages.map((m) => {
                if (m.role === "typing") {
                  return (
                    <div key={m.id} className="mb-4 flex justify-start">
                      <div className="rounded-2xl bg-accent px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-accent-foreground/50 [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-accent-foreground/50 [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-accent-foreground/50" />
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={m.id}
                    className={`mb-4 flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`prose prose-sm prose-invert max-w-[80%] rounded-2xl px-4 py-2.5 prose-p:mb-3 ${
                        m.role === "user"
                          ? "bg-surface text-foreground"
                          : "bg-accent text-accent-foreground"
                      }`}
                      dangerouslySetInnerHTML={{ __html: m.content }}
                    />
                  </div>
                );
              })}
              {messages.length === 1 && messages[0].id === "initial" && (
                <div className="mt-2 flex flex-col items-start space-y-2">
                  {initialButtons.map((label) => (
                    <button
                      key={label}
                      onClick={() => handleSendMessage(label)}
                      className="rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:bg-surface"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="border-t border-border bg-[#E0E7FF] p-4"
            >
              <div className="relative">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full rounded-full border border-border bg-surface py-2 pl-4 pr-10 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-2 flex items-center"
                  aria-label="Send message"
                >
                  <LuSend className="h-5 w-5 text-text-muted" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isBubbleVisible && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
              className="chat-bubble relative w-max rounded-lg bg-surface shadow-xl"
            >
              <button
                onClick={handleCloseBubble}
                aria-label="Close welcome message"
                className="absolute -right-2 -top-2 z-10 rounded-full bg-background p-1 text-text-muted ring-1 ring-border transition-colors hover:text-text-heading"
              >
                <LuX className="h-4 w-4" />
              </button>
              <div className="px-4 py-3">
                <p className="whitespace-nowrap text-sm text-foreground">
                  👋 Got any questions? I'm happy to help.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={startChat}
          className="relative z-50 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
          aria-label="Open chat"
        >
          <LuMessageCircle className="h-8 w-8" />
        </button>
      </div>
    </>
  );
}
