"use client";

import { useState } from "react";

const JobCard = ({
  job,
}: {
  job: {
    _id: string;
    title: string;
    description: string;
    tags: string[];
  };
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file before uploading.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setUploadSuccess(true);
        setSelectedFile(null);
      } else {
        const error = await res.json();
        alert("Upload failed: " + error.error);
      }
    } catch {
      alert("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <li className="relative p-6 border rounded-lg shadow bg-white space-y-4">
      <h3 className="font-bold text-xl text-purple-700">{job.title}</h3>
      <p className="mt-2 text-slate-50">{job.description}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {job.tags.map((tag) => (
          <span
            key={`${job._id}-${tag}`}
            className="bg-purple-600 text-white text-xs px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* File upload section */}
      <div className="mt-4 space-y-2">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block text-sm"
        />
        <button
          onClick={handleUpload}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {uploading ? "Uploading..." : "Apply with Resume"}
        </button>
        {uploadSuccess && (
          <p className="text-green-600 text-sm">✅ Resume uploaded successfully!</p>
        )}
      </div>
    </li>
  );
};

export default JobCard;
