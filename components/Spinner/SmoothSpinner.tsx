"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "./Spinner";
import styles from "./spinner.module.css";

const buttonCopy = {
  idle: "Send me a login link",
  loading: <Spinner size={16} color="rgba(255, 255, 255, 0.65)" />,
  success: "Login link sent!",
};

export default function SmoothButton() {
  const [buttonState, setButtonState] = useState("idle");

  return (
    <div className={styles[""]}>
      <button
        className={styles["blue-button"]}
        disabled={buttonState !== "idle"}
        onClick={() => {
          // This code is just a placeholder
          setButtonState("loading");

          setTimeout(() => {
            setButtonState("success");
          }, 1750);

          setTimeout(() => {
            setButtonState("idle");
          }, 3500);
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span 
          transition={{type: "spring", duration: 0.3, bounce: 0}}
          key={buttonState}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          >
            {buttonCopy[buttonState]}</motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
};