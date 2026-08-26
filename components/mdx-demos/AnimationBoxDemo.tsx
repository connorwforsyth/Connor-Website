"use client";

import { useState } from "react";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";

export function Box() {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div>
      <MotionConfig transition={{ type: "spring", bounce: 0.25 }}>
        <div className="h-6 flex items-center">
          <AnimatePresence mode="wait">
            {isVisible ? (
              <motion.button
                onClick={toggleVisibility}
                initial={{ x: -200, opacity: 1, scale: 1 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 200, opacity: 0 }}
                className="from-yellow-200 via-yellow-200 shadow-inner shadow-yellow-300 to-yellow-300 bg-gradient-to-b flex p-8 rounded-lg"
              ></motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </div>
  );
}

export function Copy() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <button aria-label="Copy code snippet" onClick={copy}>
      <AnimatePresence mode="wait" initial={false}>
        {!copied ? (
          <motion.span
            key="checkmark"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="px-3 py-2 bg-neutral-600 rounded-lg"
          >
            🔗 Copy
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            ✅
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
