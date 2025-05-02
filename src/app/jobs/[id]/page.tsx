import { notFound } from "next/navigation";

const getJobById = async (id: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // fallback for dev

  const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);

  if (!job) return notFound();

  return (
    <div className="min-h-fit mt-26 text-white p-6">
      <div className="w-full h-full bg-gray-900 rounded-lg p-10 overflow-y-auto">
        {/* Job Title */}
        <h2 className="text-4xl font-bold mb-4">{job.title}</h2>

        {/* Job Description */}
        <p className="text-xl text-purple-400 mb-6">{job.description}</p>

        {/* Job Requirements */}
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Requirements</h3>
          <p className="text-base mb-3 text-gray-400">{job.requirements}</p>
        </section>

        {/* Job Type */}
        <section className="mb-6">
          <h3 className="text-sm uppercase text-gray-500 mb-3">Type</h3>
          <p className="text-white">{job.type}</p>
        </section>

        {/* Job Tags */}
        <section className="mt-6">
          <h3 className="text-sm uppercase text-gray-500 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
