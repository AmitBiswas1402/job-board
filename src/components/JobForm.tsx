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
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...initialData,
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
    });

    // Reset if not in edit mode
    if (!initialData) {
      setTitle("");
      setDescription("");
      setTags("");
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
        placeholder="List all the job requirements, experience required, good to have technologies, job duration time etc."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
