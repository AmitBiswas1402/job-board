"use client";

import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl backdrop-blur-lg bg-white/10 py-3 px-8 rounded-2xl shadow-lg z-50">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <h1 className="text-white text-2xl font-bold">
              Job Board
              <Image
                src="/navbar.png"
                alt="Logo"
                className="inline-block ml-2 mb-1.5"
                height={25}
                width={25}
              />
            </h1>
          </Link>
        </div>

        {/* Center: Sign In */}
        <div className="flex-1 flex justify-center">
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

        {/* Right: Dashboard Button */}
        <div>
          <Link href="/dashboard/employer">
            <button className="text-white bg-purple-600 hover:bg-purple-700 font-medium px-4 py-2 rounded-lg transition-all">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
