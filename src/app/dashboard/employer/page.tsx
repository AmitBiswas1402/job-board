"use client";

import { useEffect, useState } from "react";
import JobForm from "@/components/JobForm";

type Job = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
};

const DashboardPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Fetch all jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  // Handle adding job
  const handleAddJob = async (job: Omit<Job, "_id">) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...job,
          tags: job.tags ?? [],
        }),
      });

      const newJob = await res.json();
      setJobs((prev) => [...prev, newJob]);
    } catch (err) {
      console.error("Failed to create job:", err);
    }
  };

  // Handle deleting job
  const handleDeleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 mt-28 mb-20">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
      <JobForm onSubmit={handleAddJob} />

      <h2 className="text-2xl font-semibold mt-10 mb-4">All Jobs</h2>
      <ul className="grid md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <li key={job._id} className="relative p-4 border rounded shadow">
            <button
              onClick={() => handleDeleteJob(job._id)}
              className="absolute cursor-pointer top-2 right-2 text-red-600 hover:text-red-800 text-xl"
              aria-label="Delete Job"
            >
              ❌
            </button>
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="mt-1">{job.description}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {(job.tags || []).map((tag) => (
                <span
                  key={`${job._id}-${tag}`} // Ensures unique key
                  className="bg-purple-600 text-white text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default DashboardPage;
