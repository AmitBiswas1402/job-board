import React from "react";
import { SignOutButton } from "@clerk/nextjs";

export default function CustomerDashboard() {
  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Customer Dashboard</h1>
        <SignOutButton>
          <button className="py-1 px-3 border rounded">Sign out</button>
        </SignOutButton>
      </div>
      <section className="mt-6">Browse restaurants and place orders (placeholder)</section>
    </main>
  );
}
