"use client";

import { CheckIcon, LockKeyIcon, WarningIcon } from "@phosphor-icons/react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { posthog } from "posthog-js";
import {
  type ChangeEvent,
  type FormEvent,
  Suspense,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
// Import the server actions
import { completeSignUp, verifyAccessCode } from "@/server-actions/actions";

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
  email: "",
  error: null,
  isLoggedIn: false,
  loading: false,
  name: "",
  password: "",
  showError: false,
  step: "password",
  success: false,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "NEXT_STEP": {
      const steps: FormStep[] = ["password", "name", "email"];
      const currentIndex = steps.indexOf(state.step);
      return {
        ...state,
        error: null,
        showError: false,
        step: steps[currentIndex + 1],
        success: false,
      };
    }
    case "SET_ERROR":
      return { ...state, error: action.error, showError: true, success: false };
    case "SET_SUCCESS":
      return { ...state, showError: false, success: action.success };
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

// useSearchParams requires a Suspense boundary, isolated here so it can't
// force the rest of the form into a fallback state.
const AutoSubmitFromUrl = ({ onCode }: { onCode: (code: string) => void }) => {
  const searchParams = useSearchParams();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }
    const code = searchParams.get("code");
    if (!code) {
      return;
    }

    hasRun.current = true;
    onCode(code);
  }, [searchParams, onCode]);

  return null;
};

export default function AccessForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.showError) {
      const timer = setTimeout(() => {
        dispatch({ showError: false, type: "SET_SHOW_ERROR" });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.showError]);

  const submitPassword = async (password: string) => {
    dispatch({ loading: true, type: "SET_LOADING" });
    dispatch({ error: null, type: "SET_ERROR" });
    dispatch({ showError: false, type: "SET_SHOW_ERROR" });
    dispatch({ success: false, type: "SET_SUCCESS" });

    try {
      const formData = new FormData();
      formData.append("password", password);

      const result = await verifyAccessCode(formData);

      if (result.success) {
        posthog.capture("access_code_verified");
        // Simulate loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch({ showError: false, type: "SET_SHOW_ERROR" });
        dispatch({ error: null, type: "SET_ERROR" });
        dispatch({ loading: false, type: "SET_LOADING" });

        dispatch({ success: true, type: "SET_SUCCESS" });
        // Show success for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch({ type: "NEXT_STEP" });
      } else {
        posthog.capture("access_code_rejected", {
          reason: result.error ?? "Incorrect access code",
        });
        dispatch({
          error: result.error || "Incorrect access code",
          type: "SET_ERROR",
        });
      }
    } catch {
      dispatch({ error: "An unexpected error occurred", type: "SET_ERROR" });
    } finally {
      dispatch({ loading: false, type: "SET_LOADING" });
    }
  };

  const handleCodeFromUrl = (code: string) => {
    dispatch({ field: "password", type: "SET_FIELD", value: code });
    submitPassword(code);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (state.step === "password") {
        await submitPassword(state.password);
      } else if (state.step === "name") {
        dispatch({ loading: true, type: "SET_LOADING" });
        dispatch({ type: "NEXT_STEP" });
      } else if (state.step === "email") {
        await handleComplete();
      }
    } catch {
      dispatch({ error: "An unexpected error occurred", type: "SET_ERROR" });
    } finally {
      dispatch({ loading: false, type: "SET_LOADING" });
    }
  };

  const handleComplete = async () => {
    dispatch({ loading: true, type: "SET_LOADING" });
    try {
      const formData = new FormData();
      formData.append("password", state.password);
      formData.append("name", state.name);
      formData.append("email", state.email);

      const result = await completeSignUp(formData);

      if (result.success) {
        posthog.identify(state.name, { email: state.email, name: state.name });
        posthog.capture("access_granted");
        dispatch({ isLoggedIn: true, type: "SET_LOGGED_IN" });
        router.refresh();
      } else {
        posthog.capture("access_signup_failed", {
          reason: result.error ?? "Failed to complete sign up",
        });
        dispatch({
          error: result.error || "Failed to complete sign up",
          type: "SET_ERROR",
        });
      }
    } catch {
      dispatch({ error: "An unexpected error occurred", type: "SET_ERROR" });
    } finally {
      dispatch({ loading: false, type: "SET_LOADING" });
    }
  };

  const renderStep = useMemo(() => {
    const inputProps = {
      className:
        "rounded-lg border border-border bg-transparent p-2 px-3 dark:bg-muted",
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
          field: e.target.name as keyof FormState,
          type: "SET_FIELD",
          value: e.target.value,
        });
      },
    };

    switch (state.step) {
      case "password":
        return (
          <div className="flex flex-col gap-1">
            <p>This project is protected.</p>
            <p>
              If you do not have an access code,{" "}
              <Link className="underline" href="mailto:c@connorforsyth.co">
                reach out.
              </Link>
            </p>

            <Field
              className="mt-4 flex flex-col gap-2"
              data-invalid={Boolean(state.error)}
            >
              <FieldLabel htmlFor="access-code">Access Code</FieldLabel>
              <motion.div
                animate={{
                  transition: {
                    duration: 0.1,
                    ease: "linear",
                    repeat: state.error ? 2 : 0,
                    repeatType: "reverse",
                  },
                  x: state.error ? [-5, 5, -5, 5, 0] : 0,
                }}
                key={state.error} // Add a key prop to force re-render when error changes
              >
                <Input
                  {...inputProps}
                  aria-describedby={
                    state.error ? "access-code-error" : undefined
                  }
                  aria-invalid={Boolean(state.error)}
                  className={`w-full rounded-lg border ${state.error ? "border-destructive ring-destructive focus:outline-destructive" : "border-border focus:border-border focus:ring-ring"} bg-transparent p-2 px-3 dark:bg-muted`}
                  id="access-code"
                  name="password"
                  required
                  type="password"
                  value={state.password}
                />
              </motion.div>
              {state.error && (
                <p
                  className="text-destructive text-sm"
                  id="access-code-error"
                  role="alert"
                >
                  {state.error}
                </p>
              )}
            </Field>
          </div>
        );
      case "name":
        return (
          <>
            <div className="flex flex-col gap-2">
              <p>Leave your name so I know who's visiting:</p>
            </div>
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="access-name">Your Name</FieldLabel>
              <Input
                {...inputProps}
                autoComplete="name"
                id="access-name"
                name="name"
                required
                type="text"
                value={state.name}
              />
            </Field>
          </>
        );
      case "email":
        return (
          <>
            <div className="flex flex-col gap-2">
              <p>Hey {state.name} 👋</p>
              <p>Please leave your email below:</p>
            </div>
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="access-email">Your Email</FieldLabel>
              <Input
                {...inputProps}
                autoComplete="email"
                id="access-email"
                name="email"
                required
                type="email"
                value={state.email}
              />
            </Field>
          </>
        );
      default:
        return null;
    }
  }, [state]);

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-center gap-4">
      <Suspense fallback={null}>
        <AutoSubmitFromUrl onCode={handleCodeFromUrl} />
      </Suspense>
      <MotionConfig transition={{ bounce: 0, duration: 0.8, type: "spring" }}>
        <motion.div>
          <form
            className="flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-card p-4 shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2">
              <LockKeyIcon className="h-auto w-6" />
              <h3 className="font-medium">Protected project</h3>
            </div>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-4"
                exit={{ opacity: 0, x: "-110%" }}
                initial={{ opacity: 0, x: "110%" }}
                key={state.step}
                layout
                transition={{ bounce: 0, duration: 0.5, type: "spring" }}
              >
                {renderStep}
              </motion.div>
              {state.step && (
                <motion.div layout>
                  <Button
                    aria-live="polite"
                    className={cn(
                      `flex h-10 w-full items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground transition-all ${state.step === "password" && state.success && "bg-success text-success-foreground"}`,
                      state.showError &&
                        "bg-destructive text-destructive-foreground"
                    )}
                    disabled={state.loading}
                    type="submit"
                  >
                    <AnimatePresence initial={false} mode="wait">
                      {renderButtonContent(state)}
                    </AnimatePresence>
                  </Button>
                </motion.div>
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
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "110%" },
    initial: { opacity: 0, y: "-110%" },
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
      opacity: { duration: 0.2 },
    },
  };

  if (state.loading) {
    return <Spinner data-icon="inline-start" />;
  }

  if (state.step === "password") {
    if (state.success) {
      return (
        <motion.div
          key={`success-${state.success}`}
          {...commonMotionProps}
          className="flex items-center gap-2"
        >
          <CheckIcon data-icon="inline-start" />
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
          <WarningIcon data-icon="inline-start" />
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
