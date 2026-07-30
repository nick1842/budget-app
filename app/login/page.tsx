"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: "http://localhost:3004/dashboard",
  },
});
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <button onClick={login}>
        Sign in with Google
      </button>
    </div>
  );
}