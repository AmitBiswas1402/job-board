"use server";

import { db } from "@/db";
import {
  cartsTable,
  cartItemsTable,
  menuItemsTable,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function addToCart(menuItemId: number, restaurantId: number) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        requiresAuth: true,
        message: "Please sign in to add items to cart",
      };
    }

    // Get or create cart for this user and restaurant
    let cart = await db.query.cartsTable.findFirst({
      where: and(
        eq(cartsTable.userId, userId),
        eq(cartsTable.restaurantId, restaurantId)
      ),
    });

    if (!cart) {
      const newCart = await db
        .insert(cartsTable)
        .values({
          userId,
          restaurantId,
        })
        .returning();

      cart = newCart[0];
    }

    // Check if item already exists in cart
    const existingItem = await db.query.cartItemsTable.findFirst({
      where: and(
        eq(cartItemsTable.cartId, cart.id),
        eq(cartItemsTable.menuItemId, menuItemId)
      ),
    });

    if (existingItem) {
      // Increment quantity
      await db
        .update(cartItemsTable)
        .set({
          quantity: existingItem.quantity + 1,
          updatedAt: new Date(),
        })
        .where(eq(cartItemsTable.id, existingItem.id));
    } else {
      // Add new item to cart
      await db.insert(cartItemsTable).values({
        cartId: cart.id,
        menuItemId,
        quantity: 1,
      });
    }

    return {
      success: true,
      requiresAuth: false,
      message: "Item added to cart",
      cartId: cart.id,
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      requiresAuth: false,
      message:
        error instanceof Error ? error.message : "Failed to add item to cart",
    };
  }
}

export async function removeFromCart(cartItemId: number) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        requiresAuth: true,
        message: "Please sign in to manage your cart",
      };
    }

    // Get the cart item
    const cartItem = await db.query.cartItemsTable.findFirst({
      where: eq(cartItemsTable.id, cartItemId),
      with: {
        cart: true,
      },
    });

    if (!cartItem) {
      return {
        success: false,
        requiresAuth: false,
        message: "Cart item not found",
      };
    }

    if (cartItem.cart.userId !== userId) {
      return {
        success: false,
        requiresAuth: false,
        message: "Unauthorized",
      };
    }

    if (cartItem.quantity > 1) {
      // Decrement quantity
      await db
        .update(cartItemsTable)
        .set({
          quantity: cartItem.quantity - 1,
          updatedAt: new Date(),
        })
        .where(eq(cartItemsTable.id, cartItemId));
    } else {
      // Remove item from cart
      await db
        .delete(cartItemsTable)
        .where(eq(cartItemsTable.id, cartItemId));
    }

    return {
      success: true,
      requiresAuth: false,
      message: "Item removed from cart",
    };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return {
      success: false,
      requiresAuth: false,
      message:
        error instanceof Error ? error.message : "Failed to remove item from cart",
    };
  }
}

export async function getCart(restaurantId: number) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        cartId: null,
        items: [],
        authenticated: false,
      };
    }

    const cart = await db.query.cartsTable.findFirst({
      where: and(
        eq(cartsTable.userId, userId),
        eq(cartsTable.restaurantId, restaurantId)
      ),
      with: {
        items: {
          with: {
            menuItem: true,
          },
        },
      },
    });

    if (!cart) {
      return {
        cartId: null,
        items: [],
        authenticated: true,
      };
    }

    return {
      cartId: cart.id,
      items: cart.items.map((item) => ({
        id: item.id,
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        menuItem: item.menuItem,
      })),
      authenticated: true,
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      cartId: null,
      items: [],
      authenticated: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch cart",
    };
  }
}

export async function clearCart(cartId: number) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        requiresAuth: true,
        message: "Please sign in to manage your cart",
      };
    }

    // Verify cart belongs to user
    const cart = await db.query.cartsTable.findFirst({
      where: eq(cartsTable.id, cartId),
    });

    if (!cart) {
      return {
        success: false,
        requiresAuth: false,
        message: "Cart not found",
      };
    }

    if (cart.userId !== userId) {
      return {
        success: false,
        requiresAuth: false,
        message: "Unauthorized",
      };
    }

    await db.delete(cartItemsTable).where(eq(cartItemsTable.cartId, cartId));

    return {
      success: true,
      requiresAuth: false,
      message: "Cart cleared",
    };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return {
      success: false,
      requiresAuth: false,
      message:
        error instanceof Error ? error.message : "Failed to clear cart",
    };
  }
}