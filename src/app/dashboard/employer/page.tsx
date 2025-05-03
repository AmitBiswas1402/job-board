"use client";

import { useEffect, useState } from "react";
import JobForm from "@/components/JobForm";
import { v4 as uuidv4 } from "uuid";

type Job = {
  _id: string;
  title: string;
  requirements: string;
  tags: string[];
};

const DashboardPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

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

  const handleAddJob = async (job: Omit<Job, "_id">) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      if (!res.ok) throw new Error("Failed to create job");

      const createdJob = await res.json();
      const jobWithId = { ...createdJob, _id: createdJob._id || uuidv4() };

      setJobs((prevJobs) => [...prevJobs, jobWithId]);
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6 mt-28 mb-20">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
      <JobForm onSubmit={handleAddJob} />
  
      <h2 className="text-2xl font-semibold mt-10 mb-4">All Jobs</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="relative p-6 border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <button
              onClick={() => handleDeleteJob(job._id)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-xl"
              aria-label="Delete Job"
            >
              ❌
            </button>
  
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{job.title}</h3>
  
            <div className="mb-3">
              <h4 className="font-semibold text-gray-700">Requirements:</h4>
              <p className="text-sm text-slate-100 mt-1">{job.requirements}</p>
            </div>
  
            {job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {job.tags.map((tag, index) => (
                  <span
                    key={`${job._id}-${index}`}
                    className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
  
};

export default DashboardPage;
