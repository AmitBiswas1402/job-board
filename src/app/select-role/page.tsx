"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { updateUserRole } from "./actions";

const roles = [
  { id: "USER", label: "Customer", desc: "Browse & order food" },
  { id: "OWNER", label: "Restaurant Owner", desc: "Manage restaurant" },
  { id: "DELIVERY_BOY", label: "Delivery Partner", desc: "Deliver orders" },
];

export default function SelectRolePage() {
  const router = useRouter();
  const authData = useAuth();
  const { userId, isLoaded } = authData;
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  React.useEffect(() => {
    console.log("useAuth data:", authData);
  }, [authData]);

  async function choose(role: string) {
    console.log("Choosing role:", role, "with userId:", userId);
    setLoading(true);
    setSelected(role);
    try {
      const result = await updateUserRole(role, userId!);
      if (result.ok) {
        const target = 
          role === "OWNER" 
            ? "/owner/dashboard" 
            : role === "DELIVERY_BOY" 
            ? "/delivery/dashboard" 
            : "/customer/dashboard";
        router.push(target);
      } else {
        setLoading(false);
        setSelected(null);
        alert("Failed to set role");
      }
    } catch (err) {
      setLoading(false);
      setSelected(null);
      alert("Error");
    }
  }

  if (!isLoaded) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-2xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Role</h1>
          <p className="text-slate-600">Select how you'd like to use Food Delivery</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((r) => (
            <button
              key={r.id}
              className={`p-6 rounded-lg border-2 transition-all ${
                selected === r.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              } ${loading && selected !== r.id ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => choose(r.id)}
              disabled={loading}
            >
              <h2 className="font-semibold text-lg mb-2">{r.label}</h2>
              <p className="text-sm text-slate-600 mb-4">{r.desc}</p>
              {loading && selected === r.id && (
                <div className="text-sm text-blue-600 font-medium">
                  Setting up...
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
