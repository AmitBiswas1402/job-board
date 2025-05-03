import { connectDB } from "@/lib/db";
import { Job } from "@/lib/models/jobs.model";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET job by ID
type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const job = await Job.findById(params.id);

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return NextResponse.json(
      { message: "Error fetching job" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE job by ID
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const body = await req.json();
    const updatedJob = await Job.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ message: "Failed to update job" }, { status: 500 });
  }
}

// ✅ DELETE job by ID
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const deletedJob = await Job.findByIdAndDelete(params.id);
    if (!deletedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Job deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ message: "Failed to delete job" }, { status: 500 });
  }
}
