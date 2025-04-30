"use client";

import { useClerk, useUser, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl backdrop-blur-lg bg-white/10 py-3 px-8 rounded-2xl shadow-lg z-50">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-6">
          <h1 className="text-white text-2xl font-bold">JobBoard</h1>
        </div>

        {/* Center: Nav links */}
        <div className="flex items-center gap-6 mx-auto">
          <button className="text-white hover:text-gray-200 font-medium">Home</button>
          <button className="text-white hover:text-gray-200 font-medium">About</button>
          <button className="text-white hover:text-gray-200 font-medium">Contact</button>
        </div>

        {/* Right: Auth button */}
        <div>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="text-white bg-black hover:bg-gray-800 font-medium px-4 py-2 rounded-lg transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
