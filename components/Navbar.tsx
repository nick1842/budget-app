"use client";

import LoginButton from "./LoginButton";

export default function Navbar() {
  return (
    <div className="p-4 flex justify-between bg-black text-white">
      <h1>My App</h1>
      <LoginButton />
    </div>
  );
}