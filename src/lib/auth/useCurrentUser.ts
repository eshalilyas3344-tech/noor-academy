"use client";

import { useEffect, useState } from "react";

export interface CurrentUser {
  id: string;
  email: string;
  role: "student" | "teacher" | "parent" | "admin";
  fullName: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void fetch("/api/auth/me")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load account information.");
        return data.user as CurrentUser;
      })
      .then((currentUser) => { if (active) setUser(currentUser); })
      .catch((requestError: Error) => { if (active) setError(requestError.message); });
    return () => { active = false; };
  }, []);

  return { user, error };
}
