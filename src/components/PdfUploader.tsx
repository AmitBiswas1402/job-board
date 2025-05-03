"use client";

import { useState } from "react";

const PdfUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`✅ Uploaded: ${data.filename}`);
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  return (
    <div className="p-4 border rounded w-fit">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-purple-600 text-white px-4 py-1 rounded"
      >
        Upload PDF
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default PdfUploader;
