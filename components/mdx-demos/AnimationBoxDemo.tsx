"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";

export function Box() {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div>
      <MotionConfig transition={{ bounce: 0.25, type: "spring" }}>
        <div className="flex h-6 items-center">
          <AnimatePresence mode="wait">
            {isVisible ? (
              <motion.button
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="flex rounded-lg bg-gradient-to-b from-yellow-200 via-yellow-200 to-yellow-300 p-8 shadow-inner shadow-yellow-300"
                exit={{ opacity: 0, x: 200 }}
                initial={{ opacity: 1, scale: 1, x: -200 }}
                onClick={toggleVisibility}
              />
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
    <button aria-label="Copy code snippet" onClick={copy} type="button">
      <AnimatePresence initial={false} mode="wait">
        {copied ? (
          <motion.span
            animate="visible"
            exit="hidden"
            initial="hidden"
            key="copy"
            variants={variants}
          >
            ✅
          </motion.span>
        ) : (
          <motion.span
            animate="visible"
            className="rounded-lg bg-neutral-600 px-3 py-2"
            exit="hidden"
            initial="hidden"
            key="checkmark"
            variants={variants}
          >
            🔗 Copy
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
