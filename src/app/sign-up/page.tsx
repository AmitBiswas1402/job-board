"use client";
import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6">
        <SignUp 
          routing="hash" 
          unsafeMetadata={{ skipEmailVerification: true }}
          afterSignUpUrl="/select-role"
        />
      </div>
    </main>
  );
}
