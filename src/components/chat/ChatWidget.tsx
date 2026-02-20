"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "./ChatWindow";

/* ═══════════════════════════════════════════════════════════════
   ChatWidget
   Floating chat bubble (bottom-right) that expands into a panel.
   - Desktop: expands to a 400x600 panel, with option to go large.
   - Mobile: expands to full-screen overlay.
   ═══════════════════════════════════════════════════════════════ */

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  /* Detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Lock body scroll on mobile when chat is open */
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasBeenOpened(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {/* ── Floating bubble ─── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={handleOpen}
            className={cn(
              "fixed right-5 bottom-5 z-50",
              "flex h-14 w-14 items-center justify-center rounded-full",
              "bg-accent text-background shadow-lg",
              "hover:bg-accent-hover hover:shadow-xl",
              "transition-shadow duration-300",
              "glow-blue"
            )}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />

            {/* Pulse ring (only before first open) */}
            {!hasBeenOpened && (
              <span className="absolute inset-0 rounded-full animate-ping bg-accent/30" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (mobile only) */}
            {isMobile && (
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              />
            )}

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Chat with Karsen's Assistant"
              className={cn(
                "fixed z-50 flex flex-col overflow-hidden",
                "bg-background border-border border",
                "shadow-2xl",

                /* Mobile: full screen */
                isMobile && "inset-0 rounded-none",

                /* Desktop: floating panel */
                !isMobile && !isExpanded &&
                  "right-5 bottom-5 h-[min(600px,85vh)] w-[400px] rounded-2xl",

                /* Desktop expanded: larger panel */
                !isMobile && isExpanded &&
                  "right-5 bottom-5 h-[min(750px,90vh)] w-[min(700px,50vw)] rounded-2xl"
              )}
              initial={
                isMobile
                  ? { y: "100%" }
                  : { scale: 0.9, opacity: 0, y: 20 }
              }
              animate={
                isMobile
                  ? { y: 0 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              exit={
                isMobile
                  ? { y: "100%" }
                  : { scale: 0.9, opacity: 0, y: 20 }
              }
              transition={
                isMobile
                  ? { type: "spring", stiffness: 300, damping: 30 }
                  : { type: "spring", stiffness: 400, damping: 25 }
              }
              layout
            >
              <ChatWindow
                isExpanded={isExpanded}
                onClose={handleClose}
                onToggleExpand={handleToggleExpand}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
