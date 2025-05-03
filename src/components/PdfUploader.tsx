"use client";

import { useRef, useState } from "react";

const PdfUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("❌ Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`✅ Uploaded: ${data.filename}`);
      setUploadUrl(data.url); // you must return the file URL from your upload API
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  return (
    <div className="p-4 border rounded w-fit bg-purple-400 text-black">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <div className="flex gap-4">
        <button
          onClick={() => inputRef.current?.click()}
          className="bg-gray-300 px-4 py-1 rounded"
        >
          Choose File
        </button>
        <button
          onClick={handleUpload}
          className="bg-purple-600 text-white px-4 py-1 rounded"
        >
          Upload PDF
        </button>
      </div>

      {message && <p className="mt-2">{message}</p>}

      {uploadUrl && (
        <div className="mt-4">
          <p className="font-medium">Preview:</p>
          <a
            href={uploadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Uploaded PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
