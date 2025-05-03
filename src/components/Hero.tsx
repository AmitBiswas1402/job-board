"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import Card from "./Card";

export default function Hero() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs", { cache: "no-store" });
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job: any) =>
    job.title.toLowerCase().includes(query)
  );

  return (
    <div className="pt-40">
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-20 text-white text-center rounded-b-2xl shadow-lg">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          Welcome to Our Website
        </h1>
        <h3 className="text-lg sm:text-xl font-light max-w-3xl mx-auto mb-8">
          Your one-stop destination for amazing opportunities. Start your
          journey today!
        </h3>

        <div className="mt-6">
          <SearchForm query={query} />
        </div>
      </section>

      <section className="mt-10 px-4">
        <div className="font-semibold my-4">
          {query ? (
            `Searching for "${query}"...`
          ) : (
            <span className="text-gray-500">
              Search by job roles specifically
            </span>
          )}
        </div>

        {filteredJobs.length > 0 ? (
          <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
            {filteredJobs.map((job: any) => (
              <Card key={job._id} post={job} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </section>
    </div>
  );
}
