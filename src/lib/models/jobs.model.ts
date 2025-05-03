import { Schema, Document, models, model } from "mongoose";

// Define the Job Type (for TypeScript)
export interface IJob extends Document {
  title: string;
  description: string;
  tags: string[];
  location: string;
  salary: string;
  experienceLevel: string;
  benefits: string[];
  company: string;
  postedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Job Schema
const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    benefits: { type: [String], default: [] },
    company: { type: String, required: true },
    postedDate: { type: Date, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Export the model (avoid recompiling issue in dev)
export const Job = models.Job || model<IJob>("Job", JobSchema);
