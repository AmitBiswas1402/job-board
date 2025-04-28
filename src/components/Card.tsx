import Image from "next/image";
import Link from "next/link";

type CardProps = {
  post: {
    _id: number;
    views: number;
    author: {
      _id: number;
      name: string;
    };
    description: string;
    title: string;
    image: string;
    category: string;
  };
};

const Card = ({ post }: CardProps) => {
  const {
    _id,
    author: { _id: authId, name },
    description,
    title,
    image,
  } = post;

  return (
    <li className="border-2 border-gray-300 rounded-lg w-full p-5 shadow-md hover:shadow-lg transition flex flex-col gap-4 bg-black">
      {/* Top section - author info */}
      <div className="flex items-center gap-3">
        <Link href={`/user/${authId}`}>
          <Image
            src="https://images.unsplash.com/photo-1745586079512-1ef958860fda?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="author"
            width={80}
            height={68}
            className="rounded-full object-cover"
          />
        </Link>
        <Link href={`/user/${authId}`}>
          <p className="text-md font-semibold text-slate-50 break-words">{name}</p>
        </Link>
      </div>

      {/* Title */}
      <Link href={`/card/${_id}`}>
        <p className="text-2xl font-bold break-words text-slate-50 hover:underline">{title}</p>
      </Link>

      {/* Main post image */}
      <Link href={`/startup/${_id}`}>
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="rounded-lg object-cover w-full h-auto"
        />
      </Link>

      {/* Description */}
      <p className="text-sm text-gray-700 break-words">{description}</p>
    </li>
  );
};

export default Card;
