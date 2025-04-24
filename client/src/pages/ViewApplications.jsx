import { useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null); // Track which row menu is open

  const handleMenuToggle = (index) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null); // Close if already open
    } else {
      setOpenMenuIndex(index); // Open the clicked one
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {viewApplicationsPageData.map((applicants, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>

                <td className="py-2 px-4 border-b text-center flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                    src={applicants.imgSrc}
                    alt=""
                  />
                  <span>{applicants.name}</span>
                </td>

                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicants.jobTitle}
                </td>

                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicants.location}
                </td>

                <td className="py-2 px-4 border-b">
                  <a
                    href="#"
                    target="_blank"
                    className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>

                <td className="py-2 px-4 border-b relative">
                  <div className="relative inline-block text-left">
                    {/* Dots Button */}
                    <button
                      onClick={() => handleMenuToggle(index)}
                      className="text-gray-500 text-2xl px-2"
                    >
                      ...
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuIndex === index && (
                      <div className="z-10 absolute right-0 md:left-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded shadow">
                        <button className="block w-full text-blue-500 text-left px-4 py-2 hover:bg-blue-600 hover:text-white">
                          Accept
                        </button>
                        <button className="block w-full text-red-500 text-left px-4 py-2 hover:bg-red-600 hover:text-white">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
