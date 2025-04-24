import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDB from "./db/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Job Board API");
});
app.post('/webhooks', clerkWebhooks);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});

export default app;

