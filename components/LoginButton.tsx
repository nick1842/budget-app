"use client";

import { supabase } from "@/lib/supabase";

export default function LoginButton() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <button
      onClick={signIn}
      className="bg-white text-black px-4 py-2 rounded"
    >
      Login with Google
    </button>
  );
}