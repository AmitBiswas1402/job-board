const JobCard = ({
  job,
  onDelete,
}: {
  job: {
    _id: string;
    title: string;
    description: string;
    requirements: string;
    tags: string[];
    type: string;
  };
  onDelete?: (id: string) => void;
}) => (
  <li className="p-4 border rounded shadow">
    <h3 className="font-bold text-lg">{job.title}</h3>
    <p className="mt-1">{job.description}</p>
    <p className="mt-1 text-sm text-gray-700">
      <strong>Requirements:</strong> {job.requirements}
    </p>
    <p className="mt-1 text-sm text-gray-700">
      <strong>Type:</strong> {job.type}
    </p>
    <div className="flex gap-2 mt-2 flex-wrap">
      {job.tags.map((tag, index) => (
        <span
          key={index}
          className="bg-purple-600 text-white text-xs px-2 py-1 rounded"
        >
          {tag}
        </span>
      ))}
    </div>

    {onDelete && (
      <button
        onClick={() => onDelete(job._id)}
        className="mt-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    )}
  </li>
);

export default JobCard;
