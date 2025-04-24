import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form className="container mx-auto p-4 flex flex-col gap-4">
      {/* Job Title */}
      <div className="w-full">
        <p className="mb-2 font-semibold">Job Title</p>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="w-full max-w-md px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-400"
        />
      </div>

      {/* Job Description */}
      <div className="w-full max-w-lg">
        <p className="mb-2 font-semibold">Job Description</p>
        <div ref={editorRef} className="max-w-3xl"></div>
      </div>

      {/* Select Fields (flexible on small screens) */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full">
        {/* Job Category */}
        <div className="w-full sm:w-60">
          <p className="mb-2 font-semibold">Job Category</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-400"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Job Location */}
        <div className="w-full sm:w-60">
          <p className="mb-2 font-semibold">Job Location</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-400"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Job Level */}
        <div className="w-full sm:w-60">
          <p className="mb-2 font-semibold">Job Level</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-400"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>

        {/* Salary */}
        <div className="w-full sm:w-60">
          <p className="mb-2 font-semibold">Salary</p>
          <input
            type="number"
            placeholder="Enter Salary"
            min={0}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-blue-400"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full sm:w-40 py-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer transition-all"
      >
        ADD
      </button>
    </form>
  );
};

export default AddJob;
