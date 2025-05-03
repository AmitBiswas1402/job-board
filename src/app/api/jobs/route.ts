import { connectDB } from "@/lib/db";
import { Job } from "@/lib/models/jobs.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() { // Fetch all jobs
  try {
    await connectDB();
    const jobs = await Job.find().sort({ createdAt: -1 });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) { // Create a new job
  try {
    await connectDB();
    const body = await req.json();
    console.log("Received Body:", body)
    const { title, description, tags } = body;

    // Basic validation
    if (!title || !description || !tags) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newJob = await Job.create({
      title,
      description,
      tags: tags || [],
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create job" }, { status: 500 });
  }
}
