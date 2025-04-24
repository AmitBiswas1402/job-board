import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt=""
        />
        {user ? (
          <div className="flex items-center gap-3">
            <button className="bg-blue-500 text-slate-50 rounded-full px-3 py-2">
              <Link to={"/applications"}>Applied Jobs</Link>
            </button>
            <p className="font-light"> | </p>
            <p className="font-light max-sm:hidden">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600 cursor-pointer"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 cursor-pointer text-white sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default NavBar;
