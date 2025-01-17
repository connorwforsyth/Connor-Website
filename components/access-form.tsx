"use client";

import { posthog } from "posthog-js";
import useMeasure from "react-use-measure";
import { FormEvent, useReducer, useMemo, useEffect } from "react";
import {
  LockClosedIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Spinner } from "./Spinner/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Import the server actions
import { verifyAccessCode, completeSignUp } from "@/server-actions/actions";

type FormStep = "password" | "name" | "email";

type FormState = {
  step: FormStep;
  success: boolean;
  password: string;
  name: string;
  email: string;
  error: string | null;
  loading: boolean;
  isLoggedIn: boolean;
  showError: boolean;
};

type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "NEXT_STEP" }
  | { type: "SET_SUCCESS"; success: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_LOGGED_IN"; isLoggedIn: boolean }
  | { type: "SET_SHOW_ERROR"; showError: boolean };

const initialState: FormState = {
  step: "password",
  success: false,
  password: "",
  name: "",
  email: "",
  error: null,
  loading: false,
  isLoggedIn: false,
  showError: false,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "NEXT_STEP":
      const steps: FormStep[] = ["password", "name", "email"];
      const currentIndex = steps.indexOf(state.step);
      return {
        ...state,
        step: steps[currentIndex + 1],
        error: null,
        showError: false,
        success: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.error, showError: true, success: false };
    case "SET_SUCCESS":
      return { ...state, success: action.success, showError: false };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_LOGGED_IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    case "SET_SHOW_ERROR":
      return { ...state, showError: action.showError };
    default:
      return state;
  }
};

export default function AccessForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [ref, bounds] = useMeasure();
  const router = useRouter();

  useEffect(() => {
    if (state.showError) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_SHOW_ERROR", showError: false });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.showError]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", loading: true });
    dispatch({ type: "SET_ERROR", error: null });
    dispatch({ type: "SET_SHOW_ERROR", showError: false });
    dispatch({ type: "SET_SUCCESS", success: false });

    try {
      if (state.step === "password") {
        const formData = new FormData();
        formData.append("password", state.password);

        const result = await verifyAccessCode(formData);

        if (result.success) {
          // Simulate loading
          await new Promise((resolve) => setTimeout(resolve, 1000));
          dispatch({ type: "SET_SHOW_ERROR", showError: false });
          dispatch({ type: "SET_ERROR", error: null });
          dispatch({ type: "SET_LOADING", loading: false });

          dispatch({ type: "SET_SUCCESS", success: true });
          // Show success for 1 second
          await new Promise((resolve) => setTimeout(resolve, 1000));
          dispatch({ type: "NEXT_STEP" });
        } else {
          dispatch({
            type: "SET_ERROR",
            error: result.error || "Incorrect access code",
          });
        }
      } else if (state.step === "name") {
        dispatch({ type: "NEXT_STEP" });
      } else if (state.step === "email") {
        await handleComplete();
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: "An unexpected error occurred" });
    } finally {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  };

  const handleComplete = async () => {
    dispatch({ type: "SET_LOADING", loading: true });
    try {
      const formData = new FormData();
      formData.append("password", state.password);
      formData.append("name", state.name);
      formData.append("email", state.email);

      const result = await completeSignUp(formData);

      if (result.success) {
        posthog.identify(state.name, { email: state.email, name: state.name });
        dispatch({ type: "SET_LOGGED_IN", isLoggedIn: true });
        router.refresh();
      } else {
        dispatch({
          type: "SET_ERROR",
          error: result.error || "Failed to complete sign up",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: "An unexpected error occurred" });
    } finally {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  };

  const renderStep = useMemo(() => {
    const inputProps = {
      className:
        "rounded-lg border border-zinc-500 bg-transparent p-2 px-3 dark:bg-zinc-800",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
          type: "SET_FIELD",
          field: e.target.name as keyof FormState,
          value: e.target.value,
        });
      },
    };

    switch (state.step) {
      case "password":
        return (
          <>
            <div className="flex flex-col gap-1">
              <p>This project is protected.</p>
              <p>
                If you do not have an access code,{" "}
                <Link className="underline" href="mailto:c@connorforsyth.co">
                  reach out.
                </Link>
              </p>

              <label className="mt-4 flex flex-col gap-2">
                Access Code
                <motion.div
                  key={state.error} // Add a key prop to force re-render when error changes
                  animate={{
                    x: state.error ? [-5, 5, -5, 5, 0] : 0,
                    transition: {
                      duration: 0.1,
                      repeat: state.error ? 2 : 0,
                      repeatType: "reverse",
                      ease: "linear",
                    },
                  }}
                >
                  <input
                    {...inputProps}
                    name="password"
                    type="password"
                    value={state.password}
                    required
                    aria-label="Access Code"
                    className={`w-full rounded-lg border ${state.error ? "border-red-500 ring-red-500 focus:outline-red-500" : "border-zinc-500 focus:border-zinc-400 focus:ring-zinc-400"} bg-transparent p-2 px-3 dark:bg-zinc-800`}
                  />
                </motion.div>
              </label>
            </div>
          </>
        );
      case "name":
        return (
          <>
            <div className="flex flex-col gap-2">
              <p>
                Please leave your name as it would be great to know who's
                visiting:
              </p>
            </div>
            <label className="flex flex-col gap-2">
              Your Name
              <input
                {...inputProps}
                type="text"
                name="name"
                value={state.name}
                aria-label="Your Name"
              />
            </label>
          </>
        );
      case "email":
        return (
          <>
            <div className="flex flex-col gap-2">
              <p>Hey {state.name} 👋</p>
              <p>Please leave your email below:</p>
            </div>
            <label className="flex flex-col gap-2">
              Your Email
              <input
                {...inputProps}
                type="email"
                name="email"
                value={state.email}
                aria-label="Your Email"
              />
            </label>
          </>
        );
    }
  }, [state]);

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-center gap-4">
      <MotionConfig transition={{ duration: 0.8, type: "spring", bounce: 0 }}>
        <motion.div>
          <form
            ref={ref}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 overflow-hidden rounded-lg border border-zinc-500 p-4 shadow-sm dark:bg-neutral-900"
          >
            <div className="flex gap-2">
              <LockClosedIcon className="h-auto w-6" />
              <h3 className="font-medium">Protected Project</h3>
            </div>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                layout
                key={state.step}
                initial={{ x: "110%", opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ x: "-110%", opacity: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0 }}
                className="flex flex-col gap-4"
              >
                {renderStep}
              </motion.div>
              {state.step && (
                <motion.button
                  layout
                  className={cn(
                    `flex h-10 items-center justify-center overflow-hidden rounded-lg bg-zinc-900 text-zinc-50 transition-all dark:bg-zinc-50 dark:text-black
                ${state.step === "password" && state.success && "bg-green-500 text-green-900 dark:bg-green-400 dark:text-green-900"}
                ${state.showError && "bg-red-500 dark:bg-red-500 dark:text-white"}`,
                  )}
                  type="submit"
                  disabled={state.loading}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {renderButtonContent(state)}
                  </AnimatePresence>
                </motion.button>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </MotionConfig>
    </div>
  );
}

const renderButtonContent = (state: FormState) => {
  const commonMotionProps = {
    initial: { y: "-110%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "110%", opacity: 0 },
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
      opacity: { duration: 0.2 },
    },
  };

  if (state.loading) {
    return <Spinner color="gray" />;
  }

  if (state.step === "password") {
    if (state.success) {
      return (
        <motion.div
          key={`success-${state.success}`}
          {...commonMotionProps}
          className="flex items-center gap-2"
        >
          <CheckIcon className="h-auto w-4" />
          Access code verified
        </motion.div>
      );
    }
    if (state.showError) {
      return (
        <motion.div
          key={`error-${state.showError}`}
          {...commonMotionProps}
          className="flex items-center gap-2"
        >
          <ExclamationTriangleIcon className="h-auto w-4" />
          Incorrect access code
        </motion.div>
      );
    }
  }

  return (
    <motion.div key={state.step} {...commonMotionProps}>
      {state.step === "email" ? "Complete" : "Next"}
    </motion.div>
  );
};
