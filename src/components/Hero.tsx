"use client";

import { useSearchParams } from "next/navigation";
import SearchForm from "./SearchForm";
import Card from "./Card";
import { auth } from "@clerk/nextjs/server";

export default function Hero() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const posts = [
    {
      _id: 1,
      author: {
        _id: 1,
        name: "John Doe",
      },
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      title: "Random 1",
      image:
        "https://images.unsplash.com/vector-1744686624430-d6865f9ab557?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      _id: 2,
      author: {
        _id: 2,
        name: "Jane Smith",
      },
      description: "Sed do eiusmod tempor incididunt ut labore et dolore.",
      title: "Random 2",
      image: ""
    }
  ];

  return (
    <div className="pt-24">
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-20 text-white text-center rounded-b-2xl shadow-lg">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to Our Website
        </h2>
        <p className="text-xl sm:text-2xl font-light max-w-3xl mx-auto mb-8">
          Your one-stop destination for amazing opportunities. Start your
          journey today!
        </p>
        <SearchForm query={query || ""} />
      </section>

      <section>
        <p className="font-semibold">
          {query ? `Searching for "${query}"...` : "All at here"}
        </p>

        <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
          {posts?.length > 0 ? (
            posts.map((post: Card, index: number) => (
              <Card key={post._id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </ul>
      </section>
    </div>
  );
}
