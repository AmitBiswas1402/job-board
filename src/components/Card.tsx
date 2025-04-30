import Link from "next/link";

type JobAspects = {
  post: {
    _id: number;
    title: string;
    description: string;
    tags: string[];
  };
};

const JobCard = (props: JobAspects) => {
  const { post } = props;
  const { _id, description, title, tags } = post;

  return (
    <Link href={`/${_id}`}>
      <li className="border-2 border-gray-300 rounded-lg w-full p-5 shadow-md hover:shadow-lg transition flex flex-col gap-4 bg-black">
        {/* Title */}
        <p className="text-2xl font-bold break-words text-slate-50 hover:underline">
          {title}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-700 break-words">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-700 text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </li>
    </Link>
  );
};

export default JobCard;
