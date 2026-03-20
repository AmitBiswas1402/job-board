"use client";

import { useState } from "react";
import { addToCart } from "@/actions/cart.action";
import { useRouter } from "next/navigation";

interface AddToCartProps {
  menuItemId: number;
  restaurantId: number;
  itemName: string;
  itemPrice: number;
  quantity?: number;
  onSuccess?: () => void;
}

export function AddToCart({
  menuItemId,
  restaurantId,
  itemName,
  itemPrice,
  onSuccess,
}: AddToCartProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const result = await addToCart(menuItemId, restaurantId);

      if (!result.success) {
        if (result.requiresAuth) {
          router.push(`/sign-in?redirect_url=${window.location.pathname}`);
        }
        alert(result.message);
        return;
      }

      setQuantity((prev) => prev + 1);
      onSuccess?.();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async () => {
    if (quantity <= 0) return;
    setQuantity((prev) => prev - 1);
  };

  const handleIncrease = async () => {
    setLoading(true);
    try {
      const result = await addToCart(menuItemId, restaurantId);
      if (result.success) {
        setQuantity((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  if (quantity === 0) {
    return (
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition font-medium"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    );
  }

  return (
    <div className="flex items-center border rounded-lg overflow-hidden bg-white">
      <button
        onClick={handleDecrease}
        disabled={loading}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 transition"
      >
        −
      </button>
      <span className="px-4 py-1 font-semibold text-gray-900 min-w-12 text-center">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={loading}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 transition"
      >
        +
      </button>
    </div>
  );
}
