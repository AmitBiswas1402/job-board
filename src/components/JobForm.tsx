"use client";

import { useState } from "react";

interface JobFormProps {
  onSubmit: (job: { title: string; requirements: string; tags: string[] }) => void;
}

const JobForm = ({ onSubmit }: JobFormProps) => {
  const [title, setTitle] = useState("");
  const [requirements, setRequirements] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = tags.split(",").map((tag) => tag.trim());

    onSubmit({
      title,
      requirements,
      tags: tagArray,
    });

    setTitle("");
    setRequirements("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job title"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        placeholder="Job requirements"
        required
        className="w-full p-2 border rounded"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Comma-separated tags"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
        Post Job
      </button>
    </form>
  );
};

export default JobForm;
