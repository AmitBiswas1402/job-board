import { Schema, Document, models, model } from "mongoose";

// Define the Job Type (for TypeScript)
export interface IJob extends Document {
  title: string;
  description: string;
  requirements: string;
  tags: string[];
  type: "intern" | "full-time" | "contractual";
  createdAt: Date;
  updatedAt: Date;
}

// Define the Job Schema
const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    tags: { type: [String], default: [] },
    type: {
      type: String,
      enum: ["intern", "full-time", "contractual"],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Export the model (avoid recompiling issue in dev)
export const Job = models.Job || model<IJob>("Job", JobSchema);
