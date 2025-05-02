import { connectDB } from "@/lib/db";
import { Job } from "@/lib/models/jobs.model";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) { // see the job details
  try {
    await connectDB();
    const job = await Job.findById(params.id);
    if (!job) return NextResponse.json({ message: "Job not found" }, { status: 404 });
    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching job" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) { // update the job
  try {
    await connectDB();
    const body = await req.json();
    const updatedJob = await Job.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error(error);   
    return NextResponse.json({ message: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) { // delete the job
  try {
    await connectDB();
    await Job.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Job deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete job" }, { status: 500 });
  }
}
