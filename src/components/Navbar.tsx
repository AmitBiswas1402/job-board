"use client";

import { useClerk, useUser, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser(); // Get sign-in state

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl backdrop-blur-lg bg-gradient-to-r from-purple-500/60 via-pink-500/60 to-red-500/60 py-3 px-6 rounded-2xl shadow-lg z-50">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Navbar</h1>

        <div className="flex items-center gap-6">
          <button className="text-white hover:text-gray-200 font-medium">
            Home
          </button>
          <button className="text-white hover:text-gray-200 font-medium">
            About
          </button>
          <button className="text-white hover:text-gray-200 font-medium">
            Contact
          </button>

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
