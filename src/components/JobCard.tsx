const JobCard = ({ job }: { job: { title: string; description: string; tags: string[] } }) => (
    <li className="p-4 border rounded shadow">
      <h3 className="font-bold text-lg">{job.title}</h3>
      <p>{job.description}</p>
      <div className="flex gap-2 mt-2 flex-wrap">
        {job.tags.map((tag, index) => (
          <span key={index} className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
  
  export default JobCard;
  