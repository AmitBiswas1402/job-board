import {
  pgTable,
  integer,
  varchar,
  decimal,
  timestamp,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

/* =========================================================
   ENUMS
========================================================= */

export const restaurantTypeEnum = pgEnum("restaurant_type", [
  "veg",
  "non-veg",
  "both",
]);

export const userRoleEnum = pgEnum("user_role", [
  "customer",
  "restaurant_owner",
]);

/* =========================================================
   USERS TABLE
========================================================= */

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  role: userRoleEnum("role").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================================================
   CATEGORIES TABLE
========================================================= */

export const categoriesTable = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================================================
   RESTAURANTS TABLE
========================================================= */

export const restaurantsTable = pgTable("restaurants", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),

  image: varchar("image", { length: 500 }),

  type: restaurantTypeEnum("type").notNull(),

  rating: decimal("rating", {
    precision: 2,
    scale: 1,
  }).notNull(),

  ownerId: integer("owner_id").references(() => usersTable.id, {
    onDelete: "set null",
  }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================================================
   MANY-TO-MANY: RESTAURANT ↔ CATEGORY
========================================================= */

export const restaurantCategoriesTable = pgTable(
  "restaurant_categories",
  {
    restaurantId: integer("restaurant_id")
      .notNull()
      .references(() => restaurantsTable.id, { onDelete: "cascade" }),

    categoryId: integer("category_id")
      .notNull()
      .references(() => categoriesTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.restaurantId, table.categoryId],
    }),
  })
);

/* =========================================================
   MENU ITEMS TABLE
========================================================= */

export const menuItemsTable = pgTable("menu_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  restaurantId: integer("restaurant_id")
    .notNull()
    .references(() => restaurantsTable.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 255 }).notNull(),

  price: integer("price").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================================================
   RELATIONS
========================================================= */

export const usersRelations = relations(usersTable, ({ many }) => ({
  restaurants: many(restaurantsTable),
}));

export const restaurantsRelations = relations(
  restaurantsTable,
  ({ many, one }) => ({
    owner: one(usersTable, {
      fields: [restaurantsTable.ownerId],
      references: [usersTable.id],
    }),

    categories: many(restaurantCategoriesTable),

    menuItems: many(menuItemsTable),
  })
);

export const categoriesRelations = relations(
  categoriesTable,
  ({ many }) => ({
    restaurants: many(restaurantCategoriesTable),
  })
);

export const restaurantCategoriesRelations = relations(
  restaurantCategoriesTable,
  ({ one }) => ({
    restaurant: one(restaurantsTable, {
      fields: [restaurantCategoriesTable.restaurantId],
      references: [restaurantsTable.id],
    }),

    category: one(categoriesTable, {
      fields: [restaurantCategoriesTable.categoryId],
      references: [categoriesTable.id],
    }),
  })
);

export const menuItemsRelations = relations(
  menuItemsTable,
  ({ one }) => ({
    restaurant: one(restaurantsTable, {
      fields: [menuItemsTable.restaurantId],
      references: [restaurantsTable.id],
    }),
  })
);