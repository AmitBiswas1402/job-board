"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full px-6 py-4 bg-transparent absolute top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="text-white font-bold text-2xl tracking-wide hidden sm:block">
            Job Board
          </span>
        </Link>

        {/* Login Button */}
        <Link href="/sign-in">
          <Button
            variant="ghost"
            className="border border-white text-white hover:bg-white hover:text-black transition cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
