"use client";

import { useSearchParams } from "next/navigation";
import SearchForm from "./SearchForm";
import Card from "./Card";
import { posts } from "@/constants/index";

export default function Hero() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  // Filter posts based on title
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query)
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
          <a
            href="#"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition"
          >
            Upload Your Resume
          </a>
        </div>
      </section>

      <section className="mt-10 px-4">
        <SearchForm query={query} />
        <div className="font-semibold my-4">
          {query ? (
            `Searching for "${query}"...`
          ) : (
            <div>
              <span className="text-gray-500">
                Search by job roles specifically
              </span>
            </div>
          )}
        </div>

        {filteredPosts.length > 0 ? (
          <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
            {filteredPosts.map((post) => (
              <Card key={post._id} post={post} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </section>
    </div>
  );
}
