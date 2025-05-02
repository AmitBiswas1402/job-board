import { useState } from "react";

const JobForm = ({
  onSubmit,
  initialData,
}: {
  onSubmit: (job: Job) => void;
  initialData?: Job;
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [requirements, setRequirements] = useState(
    initialData?.requirements || ""
  );
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [type, setType] = useState<Job["type"]>(
    initialData?.type || "full-time"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...initialData,
      title,
      description,
      requirements,
      tags: tags.split(",").map((tag) => tag.trim()),
      type,
    });

    // Reset if not in edit mode
    if (!initialData) {
      setTitle("");
      setDescription("");
      setRequirements("");
      setTags("");
      setType("full-time");
    }
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
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Job Requirements"
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
      <select
        value={type}
        onChange={(e) => setType(e.target.value as Job["type"])}
        className="w-full p-2 border rounded"
      >
        <option value="full-time">Full-Time</option>
        <option value="intern">Intern</option>
        <option value="contractual">Contractual</option>
      </select>

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        {initialData ? "Update Job" : "Post Job"}
      </button>
    </form>
  );
};

export default JobForm;
