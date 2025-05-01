"use client";

import { useState } from "react";

const JobForm = ({ onSubmit }: { onSubmit: (job: Job) => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [requirements, setRequirements] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      tags: tags.split(",").map(tag => tag.trim()),
    });

    setTitle("");
    setDescription("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Job Description (define about the role and responsibilities)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Job Requirements (mention YOE and all requirements)"
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-purple-600 cursor-pointer text-white px-4 py-2 rounded">
        Post Job
      </button>
    </form>
  );
};

export type Job = {
  title: string;
  description: string;
  tags: string[];
};

export default JobForm;
