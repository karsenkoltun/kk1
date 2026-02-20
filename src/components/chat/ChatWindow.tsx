"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { SendIcon, LoaderIcon, Sparkles, User, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Quick prompt suggestions ─── */

const QUICK_PROMPTS = [
  {
    label: "First-time buyer",
    prompt: "I'm a first-time home buyer in Kelowna. Where do I start?",
  },
  {
    label: "Sell my home",
    prompt: "I'm thinking about selling my home. What does the process look like?",
  },
  {
    label: "Kelowna areas",
    prompt: "What are the best neighborhoods in Kelowna for families?",
  },
  {
    label: "Talk to Karsen",
    prompt: "I'd like to connect with Karsen. How can I reach him?",
  },
];

/* ── Auto-resize textarea hook ─── */

function useAutoResizeTextarea(minHeight: number, maxHeight: number) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = ref.current;
      if (!textarea) return;
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  return { ref, adjustHeight };
}

/* ── Extract text from UIMessage parts ─── */

function getMessageText(message: { parts?: Array<{ type: string; text?: string }>; content?: string }): string {
  // AI SDK v6 uses parts array
  if (message.parts) {
    return message.parts
      .filter((p) => p.type === "text" && p.text)
      .map((p) => p.text)
      .join("");
  }
  // Fallback to content
  if (typeof message.content === "string") return message.content;
  return "";
}

/* ── Message bubble ─── */

function MessageBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";

  return (
    <motion.div
      className={cn("flex gap-3 px-4 py-3", isUser && "flex-row-reverse")}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-accent/20 text-accent"
            : "bg-warm/20 text-warm"
        )}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : (
          <Sparkles className="h-3.5 w-3.5" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-accent/15 text-text-primary rounded-br-md"
            : "bg-background-secondary/80 text-text-primary border border-border rounded-bl-md"
        )}
      >
        {content.split("\n").map((line, i) => (
          <p key={i} className={cn(i > 0 && "mt-2")}>
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Typing indicator ─── */

function TypingIndicator() {
  return (
    <motion.div
      className="flex gap-3 px-4 py-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
    >
      <div className="bg-warm/20 text-warm flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div className="bg-background-secondary/80 border border-border flex items-center gap-1.5 rounded-2xl rounded-bl-md px-4 py-3">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="bg-warm h-1.5 w-1.5 rounded-full"
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [0.85, 1.1, 0.85],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: dot * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── ChatWindow component ─── */

interface ChatWindowProps {
  isExpanded: boolean;
  onClose: () => void;
  onToggleExpand: () => void;
}

export default function ChatWindow({
  isExpanded,
  onClose,
  onToggleExpand,
}: ChatWindowProps) {
  const { messages, sendMessage, status, error } = useChat({
    onError: (err) => {
      console.error("[Chat error]", err);
    },
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: textareaRef, adjustHeight } = useAutoResizeTextarea(44, 120);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isBusy = status === "submitted" || status === "streaming";

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  /* Handle quick prompt click */
  const handleQuickPrompt = (prompt: string) => {
    setHasInteracted(true);
    sendMessage({ text: prompt });
  };

  /* Handle send */
  const handleSend = () => {
    const text = input.trim();
    if (!text || isBusy) return;
    setHasInteracted(true);
    setInput("");
    adjustHeight(true);
    sendMessage({ text });
  };

  /* Handle Enter key (submit) and Shift+Enter (newline) */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showWelcome = messages.length === 0 && !hasInteracted;

  /* Show typing indicator when waiting for first assistant token */
  const showTyping =
    isBusy &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* ── Header ─── */}
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-warm/20 flex h-8 w-8 items-center justify-center rounded-full">
            <Sparkles className="text-warm h-4 w-4" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium">
              Karsen&apos;s Assistant
            </p>
            <p className="text-text-muted text-xs">Kelowna Real Estate</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Expand/collapse button (desktop only) */}
          <button
            onClick={onToggleExpand}
            className="text-text-secondary hover:text-text-primary hidden rounded-lg p-2 transition-colors md:flex"
            aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
          >
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>
          {/* Close button */}
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary rounded-lg p-2 transition-colors"
            aria-label="Close chat"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Messages area ─── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth py-2"
      >
        {/* Welcome state */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              className="flex flex-col items-center justify-center px-6 py-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-warm/10 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                <Sparkles className="text-warm h-7 w-7" />
              </div>
              <h3
                className="text-text-primary mb-1.5 text-lg font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Welcome!
              </h3>
              <p className="text-text-secondary mb-6 max-w-xs text-sm leading-relaxed">
                I&apos;m here to help with anything Kelowna real estate. Ask me
                a question or pick a topic below.
              </p>

              {/* Quick prompts */}
              <div className="flex flex-wrap justify-center gap-2">
                {QUICK_PROMPTS.map((qp) => (
                  <button
                    key={qp.label}
                    onClick={() => handleQuickPrompt(qp.prompt)}
                    className="border-border hover:border-accent/40 hover:bg-accent/5 text-text-secondary hover:text-text-primary rounded-full border px-3.5 py-1.5 text-xs transition-all"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            role={m.role as "user" | "assistant"}
            content={getMessageText(m as Parameters<typeof getMessageText>[0])}
          />
        ))}

        {/* Error message */}
        {error && (
          <div className="mx-4 my-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-xs text-red-400">
            Something went wrong. Please try again.
          </div>
        )}

        {/* Typing indicator */}
        <AnimatePresence>{showTyping && <TypingIndicator />}</AnimatePresence>
      </div>

      {/* ── Input area ─── */}
      <div className="border-border border-t px-3 py-3">
        <div className="bg-background-secondary/50 border-border flex items-end gap-2 rounded-xl border px-3 py-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Kelowna real estate..."
            rows={1}
            className={cn(
              "text-text-primary placeholder:text-text-muted flex-1 resize-none bg-transparent text-sm leading-relaxed",
              "focus:outline-none",
              "max-h-[120px]"
            )}
            style={{ height: "44px" }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isBusy || !input.trim()}
            className={cn(
              "mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
              input.trim()
                ? "bg-accent text-background shadow-sm hover:bg-accent-hover"
                : "text-text-muted"
            )}
            aria-label="Send message"
          >
            {isBusy ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="text-text-muted mt-1.5 text-center text-[10px]">
          AI assistant. Not a licensed professional. Always verify important
          details.
        </p>
      </div>
    </div>
  );
}
