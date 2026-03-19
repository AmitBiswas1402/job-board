import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-6 bg-black px-10 py-6">
      {/* Brand */}
      <Link href={"/"}>
        <h1 className="text-2xl font-extrabold text-white shrink-0">Food</h1>
      </Link>

      {/* Location selector */}
      {/* <div className="flex items-center gap-2 border border-gray-700 rounded-lg px-4 py-2 max-w-xs w-full cursor-pointer hover:border-gray-500 transition-colors">
        <MapPin className="h-5 w-5 text-white shrink-0" />
        <span className="text-gray-400 text-sm truncate">
          Enter your delivery location
        </span>
        <ChevronDown className="h-4 w-4 text-white shrink-0 ml-auto" />
      </div> */}

      {/* Search bar */}
      {/* <div className="flex items-center gap-2 border border-gray-700 rounded-lg px-4 py-2 flex-1 max-w-xl hover:border-gray-500 transition-colors">
        <Search className="h-5 w-5 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search for restaurant, item or more"
          className="bg-transparent text-white text-sm placeholder-gray-400 outline-none w-full"
        />
      </div> */}

      {/* Spacer */}
      <div className="ml-auto" />

      {/* User icon placeholder (re-add Clerk later with fresh keys) */}
      <div className="shrink-0 text-white cursor-pointer hover:text-gray-300 transition-colors">
        <UserButton />
      </div>
    </nav>
  );
};
export default Navbar;
