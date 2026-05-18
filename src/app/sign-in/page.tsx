"use client";
import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6">
        <SignIn 
          routing="hash"
          afterSignInUrl="/select-role"
        />
      </div>
    </main>
  );
}
