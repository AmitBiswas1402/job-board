"use client";

import { useState } from "react";
import Form from "next/form";
import SearchReset from "./SearchReset";
import { FaSearch } from "react-icons/fa";

const SearchForm = ({ query }: { query: string }) => {
  const [inputValue, setInputValue] = useState(query || "");

  return (
    <Form action="/" scroll={false} className="flex items-center justify-center mt-6">
      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md w-full max-w-md">
        <input
          name="query"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search..."
          className="flex-1 outline-none bg-transparent text-black placeholder-gray-400"
        />

        {inputValue && <SearchReset setInputValue={setInputValue} />}

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white rounded-full p-2 transition cursor-pointer"
        >
          <FaSearch />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
