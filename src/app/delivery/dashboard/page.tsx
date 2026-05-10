import React from "react";
import { SignOutButton } from "@clerk/nextjs";

export default function DeliveryDashboard() {
  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Delivery Dashboard</h1>
        <SignOutButton>
          <button className="py-1 px-3 border rounded">Sign out</button>
        </SignOutButton>
      </div>
      <section className="mt-6">View assigned deliveries (placeholder)</section>
    </main>
  );
}
