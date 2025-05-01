import { Schema, Document, models, model } from "mongoose";

// Define the Job Type (for TypeScript)
export interface IJob extends Document {
  title: string;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the Job Schema
const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Export the model (avoid recompiling issue in dev)
export const Job = models.Job || model<IJob>("Job", JobSchema);
