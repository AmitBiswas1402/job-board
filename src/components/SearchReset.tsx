"use client";

import { RxCross2 } from "react-icons/rx";

const SearchReset = ({ setInputValue }: { setInputValue: (value: string) => void }) => {
  const reset = () => {
    const form = document.querySelector("form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
    setInputValue(""); // Also reset React state
  };

  return (
    <button type="button" onClick={reset} className="bg-black hover:bg-gray-800 rounded-full p-2 text-white transition">
      <RxCross2 />
    </button>
  );
};

export default SearchReset;
