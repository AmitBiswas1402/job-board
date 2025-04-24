import { NavLink, Outlet, useNavigate } from "react-router";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="w-32 sm:w-40 cursor-pointer"
            src={assets.logo}
            alt="logo"
          />
          <div className="flex items-center gap-3">
            <p className="hidden sm:block">Welcome, Job Board</p>
            <div className="relative group">
              <img
                className="w-8 rounded-full cursor-pointer"
                src={assets.company_icon}
                alt="company"
              />
              {/* Hover Dropdown */}
              <div className="absolute hidden group-hover:block top-0 -left-10 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md text-sm shadow-md">
                  <li className="py-1 px-4 cursor-pointer hover:bg-gray-100">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flex Body */}
      <div className="flex flex-1 min-h-0 flex-col sm:flex-row">
        {/* Left Sidebar */}
        <div className="w-full sm:w-60 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-200">
          <ul className="flex flex-row sm:flex-col justify-around sm:items-start pt-4 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex flex-col sm:flex-row items-center p-2 sm:px-6 gap-1 sm:gap-2 w-full text-center ${
                  isActive ? "bg-blue-100 border-b-4 sm:border-b-0 sm:border-r-4 border-blue-500" : ""
                }`
              }
              to="/dashboard/add-job"
            >
              <img className="w-5" src={assets.add_icon} alt="add" />
              <p className="text-xs sm:text-base">Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex flex-col sm:flex-row items-center p-2 sm:px-6 gap-1 sm:gap-2 w-full text-center ${
                  isActive ? "bg-blue-100 border-b-4 sm:border-b-0 sm:border-r-4 border-blue-500" : ""
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <img className="w-5" src={assets.home_icon} alt="manage" />
              <p className="text-xs sm:text-base">Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex flex-col sm:flex-row items-center p-2 sm:px-6 gap-1 sm:gap-2 w-full text-center ${
                  isActive ? "bg-blue-100 border-b-4 sm:border-b-0 sm:border-r-4 border-blue-500" : ""
                }`
              }
              to="/dashboard/view-applications"
            >
              <img className="w-5" src={assets.person_icon} alt="view" />
              <p className="text-xs sm:text-base">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
