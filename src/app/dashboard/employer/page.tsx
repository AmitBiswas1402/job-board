"use client";

import JobCard from "@/components/JobCard";
import JobForm from "@/components/JobForm";
import { useState } from "react";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleAddJob = (newJob: Job) => {
    setJobs((prev) => [...prev, newJob]);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 mt-26">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>

      <JobForm onSubmit={handleAddJob} />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Posted Jobs</h2>
      {jobs.length > 0 ? (
        <ul className="grid md:grid-cols-2 gap-4">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </ul>
      ) : (
        <p>No jobs posted yet.</p>
      )}
    </main>
  );
}
