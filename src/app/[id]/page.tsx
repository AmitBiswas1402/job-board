"use client";
import JobCard from "@/components/Card";
import { posts } from "@/constants";
import { useState } from "react";

export default function JobBoard() {
  const [selectedJob, setSelectedJob] = useState(posts[0]);

  return (
    <div className="flex h-screen mt-22 bg-black text-white gap-6">
      {/* Left Panel: Job List */}
      <ul className="w-1/2 overflow-auto space-y-4">
        {posts.map((post) => (
          <div key={post._id} onClick={() => setSelectedJob(post)} className="cursor-pointer">
            <JobCard post={post} selected={selectedJob?._id === post._id} />
          </div>
        ))}
      </ul>

      {/* Right Panel: Job Details */}
      <div className="w-1/2 bg-gray-900 rounded-lg p-6 overflow-y-auto">
        {selectedJob && (
          <div>
            <h2 className="text-3xl font-bold mb-2">{selectedJob.title}</h2>
            <p className="text-lg text-purple-400 mb-4">{selectedJob.description}</p>

            <section className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {selectedJob.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Requirements</h3>
              <p className="text-sm mb-2 text-gray-400">Experience: {selectedJob.requirements.experience}</p>
              <div className="flex flex-wrap gap-2">
                {selectedJob.requirements.skills.map((skill, idx) => (
                  <span key={idx} className="bg-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-4">
              <h3 className="text-sm uppercase text-gray-500 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
