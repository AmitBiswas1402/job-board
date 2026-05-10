"use client";
import { useRouter } from "next/navigation";
import React from "react";

const roles = [
  { id: "USER", label: "Customer" },
  { id: "OWNER", label: "Owner" },
  { id: "DELIVERY_BOY", label: "Delivery" },
];

export default function SelectRolePage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function choose(role: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        const target = role === "OWNER" ? "/owner/dashboard" : role === "DELIVERY_BOY" ? "/delivery/dashboard" : "/customer/dashboard";
        router.push(target);
      } else {
        setLoading(false);
        alert("Failed to set role");
      }
    } catch (err) {
      setLoading(false);
      alert("Error");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded">
        <h1 className="text-2xl font-semibold mb-4">Choose your role</h1>
        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r.id}
              className="w-full py-2 px-4 bg-slate-800 text-white rounded"
              onClick={() => choose(r.id)}
              disabled={loading}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
