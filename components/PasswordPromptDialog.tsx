"use client";

import { useState } from "react";

export default function PasswordPromptDialog() {
  const [password, setPassword] = useState<string>("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const request = await fetch(`api/protect`, {
      body: JSON.stringify({
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
    });

    if (request.status !== 200)
      return setPasswordIncorrect(true), setLoading(false);
    else window.location.reload();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (passwordIncorrect) setPasswordIncorrect(false);
    setPassword(e.target.value);
  };

  return (
    <div>
      <div>
        <button type="button" onClick={() => window.location.assign("/")}>
          X
        </button>
        <div>
          <h3>Password required</h3>
          <p>
            Due to NDA, i&apos;m not able to publicly display my work. If you
            want to read my case studies, please enter the provided password.
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            <label>Password</label>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
              />
              <button type="submit" disabled={loading}>
                {loading ? "..." : "Submit"}
              </button>
            </div>
            <div
              style={{ visibility: passwordIncorrect ? "visible" : "hidden" }}
            >
              Password Incorrect
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
