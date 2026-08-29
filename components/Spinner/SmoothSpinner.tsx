"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Spinner } from "./Spinner";
import styles from "./spinner.module.css";

const buttonCopy = {
  idle: "Send me a login link",
  loading: <Spinner color="rgba(255, 255, 255, 0.65)" size={16} />,
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
        type="button"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            initial={{ opacity: 0, y: -25 }}
            key={buttonState}
            transition={{ bounce: 0, duration: 0.3, type: "spring" }}
          >
            {buttonCopy[buttonState]}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
