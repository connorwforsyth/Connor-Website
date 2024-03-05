"use client";
import { login } from "@/server-actions/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function PasswordForm() {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);
  return (
    <>
      <style jsx>{`
        .error {
          animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes shake {
          10%,
          90% {
            transform: translatex(-1px);
          }

          20%,
          80% {
            transform: translatex(2px);
          }

          30%,
          50%,
          70% {
            transform: translatex(-4px);
          }

          40%,
          60% {
            transform: translatex(4px);
          }
        }
      `}</style>
      <div className="mx-auto mt-4 max-w-2xl">
        <form action={formAction} className="flex max-w-sm flex-col gap-4">
          <label className="flex flex-col gap-2">
            Name
            <input
              className="rounded-lg border border-zinc-500 bg-transparent p-2 px-3"
              type="text"
              name="name"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            Email
            <input
              className="rounded-lg border border-zinc-500 bg-transparent p-2 px-3"
              type="email"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              Access Code
              {state?.error && (
                <div className="error flex gap-1 text-red-500 dark:text-red-400">
                  <ExclamationCircleIcon className="text-medium h-auto w-5" />
                  <p className="">{state.error}</p>
                </div>
              )}
            </div>
            <input
              className="rounded-lg border border-zinc-500 bg-transparent p-2 px-3"
              name="password"
              type="password"
              required
            />
          </label>
          <button
            className="rounded-lg bg-zinc-900 p-3 text-zinc-50 dark:bg-zinc-50 dark:text-black sm:w-32"
            type="submit"
          >
            Submit
          </button>
          <small className="tex-sm">
            Access codes are only available by contacting me directly. If you
            wish to gain access, please{" "}
            <Link className="underline" href="mailto:c@connorforsyth.co">
              reach out.
            </Link>
          </small>
        </form>
      </div>
    </>
  );
}
