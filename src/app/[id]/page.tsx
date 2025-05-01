"use client";
import { posts } from "@/constants";

// You could get `jobId` from URL params or props in your real app
const selectedJob = posts[0]; // For now, just hardcoded

export default function JobDetail() {
  if (!selectedJob) return null;

  return (
    <div className="min-h-fit mt-26 text-white p-6">
      <div className="w-full h-full bg-gray-900 rounded-lg p-10 overflow-y-auto">
        <h2 className="text-4xl font-bold mb-4">{selectedJob.title}</h2>
        <p className="text-xl text-purple-400 mb-6">{selectedJob.description}</p>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {selectedJob.responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Requirements</h3>
          <p className="text-base mb-3 text-gray-400">
            Experience: {selectedJob.requirements.experience}
          </p>
          <div className="flex flex-wrap gap-3">
            {selectedJob.requirements.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-purple-700 text-sm font-medium px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-sm uppercase text-gray-500 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selectedJob.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
