"use client";

import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

const SearchReset = ({ setInputValue }: { setInputValue: (value: string) => void }) => {
  const router = useRouter();

  const reset = () => {
    const form = document.querySelector("form") as HTMLFormElement;
    if (form) {
      form.reset();  // Reset the form inputs
    }
    setInputValue(""); // Also reset React state
    
    // Redirect to homepage
    router.push("/");  // This will take the user to the homepage
  };

  return (
    <button type="button" onClick={reset} className="bg-black hover:bg-gray-800 rounded-full p-2 text-white transition">
      <RxCross2 />
    </button>
  );
};

export default SearchReset;
