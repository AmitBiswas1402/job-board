import { connectDB } from "@/lib/db";
import { Job } from "@/lib/models/jobs.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const jobs = await Job.find(); // fetch all jobs

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      description,
      tags,
      location,
      salary,
      experienceLevel,
      benefits,
      company,
      postedDate,
    } = body;

    if (
      !title ||
      !description ||
      !tags ||
      !location ||
      !salary ||
      !experienceLevel ||
      !company ||
      !postedDate
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newJob = await Job.create({
      title,
      description,
      tags: tags || [],
      location,
      salary,
      experienceLevel,
      benefits: benefits || [],
      company,
      postedDate,
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Failed to create job" },
      { status: 500 }
    );
  }
}
