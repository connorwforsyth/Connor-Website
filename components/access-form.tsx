"use client";

import { posthog } from "posthog-js";
import useMeasure from "react-use-measure";
import { FormEvent, useReducer, useMemo } from "react";
import { LockClosedIcon, ExclamationTriangleIcon, CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Spinner } from "./Spinner/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
};

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string }
  | { type: 'NEXT_STEP' }
  | { type: 'SET_SUCCESS'; success: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_LOGGED_IN'; isLoggedIn: boolean };

const initialState: FormState = {
  step: "password",
  success: false,
  password: "",
  name: "",
  email: "",
  error: null,
  loading: false,
  isLoggedIn: false,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'NEXT_STEP':
      const steps: FormStep[] = ["password", "name", "email"];
      const currentIndex = steps.indexOf(state.step);
      return { ...state, step: steps[currentIndex + 1], error: null };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_SUCCESS':
      return { ...state, success: action.success };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_LOGGED_IN':
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

export default function AccessForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [ref, bounds] = useMeasure();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', loading: true });

    try {
      if (state.step === "password") {
        const formData = new FormData();
        formData.append('password', state.password);

        const result = await verifyAccessCode(formData);

        if (result.success) {
          // Simulate loading
          dispatch({ type: 'SET_ERROR', error: null });
          await new Promise(resolve => setTimeout(resolve, 1000));
          dispatch({ type: 'SET_SUCCESS', success: true });
          // Show success for 1 second
          await new Promise(resolve => setTimeout(resolve, 1000));
          dispatch({ type: 'NEXT_STEP' });
        } else {
          dispatch({ type: 'SET_ERROR', error: result.error || "Incorrect access code" });
        }
      } else if (state.step === "name") {
        dispatch({ type: 'NEXT_STEP' });
      } else if (state.step === "email") {
        await handleComplete();
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: "An unexpected error occurred" });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  const handleComplete = async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const formData = new FormData();
      formData.append('password', state.password);
      formData.append('name', state.name);
      formData.append('email', state.email);

      const result = await completeSignUp(formData);

      if (result.success) {
        posthog.identify(state.name, { email: state.email, name: state.name });
        dispatch({ type: 'SET_LOGGED_IN', isLoggedIn: true });
        router.refresh();
      } else {
        dispatch({ type: 'SET_ERROR', error: result.error || "Failed to complete sign up" });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: "An unexpected error occurred" });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  const renderStep = useMemo(() => {
    const inputProps = {
      className: "rounded-lg border border-zinc-500 bg-transparent p-2 px-3 dark:bg-zinc-800",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_FIELD', field: e.target.name as keyof FormState, value: e.target.value });
      }
    };

    switch (state.step) {
      case "password":
        return (
          <>
          <div className="flex flex-col gap-2">
           <div>
             <p>This project is protected due to confidentiality.</p>
             <p>
              If you do not have an access code, <Link className="underline" href="mailto:c@connorforsyth.co">
                reach out.
              </Link>
              </p>
           </div>
           
            <label className="flex flex-col gap-2">
              Access Code
              <motion.div
                key={state.error} // Add a key prop to force re-render when error changes
                animate={{
                  x: state.error ? [-5, 5, -5, 5, 0] : 0,
                  transition: {
                    duration: 0.10,
                    repeat: state.error ? 2 : 0,
                    repeatType: "reverse",
                    ease: "linear"
                  }
                }}
              >
                <input
                  {...inputProps}
                  name="password"
                  type="password"
                  value={state.password}
                  required
                  aria-label="Access Code"
                  className={`w-full rounded-lg border ${state.error ? 'border-red-500 ring-red-500 focus:outline-red-500' : 'border-zinc-500 focus:border-zinc-400 focus:ring-zinc-400'} bg-transparent p-2 px-3 dark:bg-zinc-800`}
                />
              </motion.div>
            </label>
            {state.success && (
              <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing
                opacity: { duration: 0.2 }
              }} className="success flex h-5 items-center gap-1 text-green-500 dark:text-green-400">
                <CheckIcon className="h-auto w-4" />
                <p>Access code verified</p>
              </motion.div>
            )}
          </div>
          </>
        );
      case "name":
        return (
          <>
          <div className="flex flex-col gap-2">
          <p>Please leave your name as it would be great to know who's visiting:</p>
          </div>
          <label className="flex flex-col gap-2">
            Your Name
            <input {...inputProps} type="text" name="name" value={state.name} aria-label="Your Name" />
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
            <input {...inputProps} type="email" name="email" value={state.email} aria-label="Your Email" />
          </label>
          </>
        );
    }
  }, [state]);

  return (
    <div className="flex flex-col mx-auto max-w-sm gap-4 mt-8 justify-center">
      <MotionConfig transition={{ duration: 0.8, type: "spring", bounce: 0 }}>
      <motion.div>
        <form
        ref={ref}
          onSubmit={handleSubmit}
          className="shadow-sm rounded-lg border border-zinc-500 dark:bg-neutral-900 p-4 flex flex-col gap-4 overflow-hidden"
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
              className="rounded-lg flex h-10 items-center justify-center bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-black sm:w-32"
              type="submit"
              disabled={state.loading}
            >
              {state.loading ? <Spinner color="gray" /> : state.step === "email" ? "Complete" : "Next"}
            </motion.button>
          )}
          </AnimatePresence>
         
        </form>
      </motion.div>
      </MotionConfig>
    </div>
  );
}
